/**
 * Minimal in-memory, per-key sliding-window rate limiter.
 * First line of defense against form spam / endpoint abuse. It is per-process
 * (resets on restart) — a durable limiter (Redis / n8n) can be layered later,
 * but this already blocks the common flood case at near-zero cost.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5; // per key per window

export type RateLimitResult = { ok: true } | { ok: false; retryAfter: number };

export function rateLimit(key: string): RateLimitResult {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    pruneOccasionally(now);
    return { ok: true };
  }

  if (bucket.count >= MAX_REQUESTS) {
    return { ok: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  }

  bucket.count += 1;
  return { ok: true };
}

// Keep the Map from growing unbounded over a long-running process.
let lastPrune = 0;
function pruneOccasionally(now: number): void {
  if (now - lastPrune < WINDOW_MS) return;
  lastPrune = now;
  buckets.forEach((bucket, key) => {
    if (now > bucket.resetAt) buckets.delete(key);
  });
}
