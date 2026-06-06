/**
 * Server-side validation for the inquiry form.
 * Hand-rolled (no external dependency) to keep the supply chain minimal.
 * Never trust client input — every field is checked and length-capped here.
 */

export type InquiryInput = {
  name: string;
  email: string;
  message: string;
};

export type ValidationResult =
  | { ok: true; data: InquiryInput }
  | { ok: false; errors: Record<string, string> };

// Pragmatic email shape check (full RFC validation is neither needed nor wise).
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const LIMITS = {
  name: 100,
  email: 200,
  message: 2000,
} as const;

export function validateInquiry(raw: unknown): ValidationResult {
  const errors: Record<string, string> = {};
  const obj = (raw ?? {}) as Record<string, unknown>;

  const name = typeof obj.name === "string" ? obj.name.trim() : "";
  const email = typeof obj.email === "string" ? obj.email.trim() : "";
  const message = typeof obj.message === "string" ? obj.message.trim() : "";

  if (name.length < 1) errors.name = "Please enter your name.";
  else if (name.length > LIMITS.name) errors.name = "Name is too long.";

  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  else if (email.length > LIMITS.email) errors.email = "Email is too long.";

  if (message.length < 5) errors.message = "Please add a little more detail.";
  else if (message.length > LIMITS.message)
    errors.message = `Message is too long (${LIMITS.message} characters max).`;

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, data: { name, email, message } };
}
