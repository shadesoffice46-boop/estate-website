import { NextResponse, type NextRequest } from "next/server";
import { createHash } from "crypto";
import { validateInquiry } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";

/**
 * POST /api/inquiry
 *
 * Receives a website inquiry and forwards it to the n8n webhook server-side.
 * Security model:
 *  - The n8n URL + shared secret live in server-only env vars (never shipped
 *    to the browser, never committed to the repo).
 *  - Input is validated and length-capped; oversized payloads are rejected.
 *  - Per-IP rate limiting blocks floods.
 *  - A honeypot field traps naive bots.
 *  - Error responses are generic; details stay in the server log only.
 */

const MAX_BODY_BYTES = 10_000;

export async function POST(req: NextRequest) {
  // 1) Rate limit by client IP (first, cheap, before any parsing).
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const limit = rateLimit(ip);
  if (!limit.ok) {
    return NextResponse.json(
      { success: false, error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  // 2) Reject oversized payloads early.
  const declaredLength = Number(req.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { success: false, error: "payload_too_large" },
      { status: 413 },
    );
  }

  // 3) Parse JSON safely.
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "invalid_request" },
      { status: 400 },
    );
  }

  // 4) Honeypot: a real user never fills "company". Pretend success so bots
  //    don't learn the field is a trap — but do not forward anything.
  if (
    raw &&
    typeof raw === "object" &&
    typeof (raw as Record<string, unknown>).company === "string" &&
    ((raw as Record<string, unknown>).company as string).length > 0
  ) {
    return NextResponse.json({ success: true });
  }

  // 5) Validate.
  const result = validateInquiry(raw);
  if (!result.ok) {
    return NextResponse.json(
      { success: false, error: "validation", fields: result.errors },
      { status: 422 },
    );
  }

  // 6) Forward to n8n (server-side only).
  const webhookUrl = process.env.N8N_INQUIRY_WEBHOOK_URL;
  const webhookSecret = process.env.N8N_WEBHOOK_SECRET;

  if (!webhookUrl) {
    // Fail honestly instead of pretending the message was sent.
    console.error("[inquiry] N8N_INQUIRY_WEBHOOK_URL is not configured");
    return NextResponse.json(
      { success: false, error: "service_unavailable" },
      { status: 503 },
    );
  }

  try {
    const upstream = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(webhookSecret ? { "x-webhook-secret": webhookSecret } : {}),
      },
      body: JSON.stringify({
        name: result.data.name,
        email: result.data.email,
        message: result.data.message,
        // Honeypot is forwarded so n8n can apply its own check too (defense in depth).
        company: "",
        meta: {
          userAgent: req.headers.get("user-agent") ?? null,
          submittedAt: new Date().toISOString(),
          // Raw IP never leaves the server — only a salted hash for abuse stats.
          ipHash:
            ip === "unknown"
              ? null
              : createHash("sha256")
                  .update(ip + (process.env.IP_HASH_SALT ?? ""))
                  .digest("hex"),
        },
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!upstream.ok) {
      console.error("[inquiry] n8n responded with status", upstream.status);
      return NextResponse.json(
        { success: false, error: "upstream_error" },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[inquiry] failed to reach n8n:", err);
    return NextResponse.json(
      { success: false, error: "upstream_error" },
      { status: 502 },
    );
  }
}

// Anything other than POST is not allowed.
export async function GET() {
  return NextResponse.json(
    { success: false, error: "method_not_allowed" },
    { status: 405, headers: { Allow: "POST" } },
  );
}
