"use client";

import { useState, type FormEvent } from "react";
import { Send, Check, Loader2 } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";
type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

const inputBase =
  "w-full rounded-xl border border-blue/15 bg-white px-4 py-3 text-[0.95rem] text-ink " +
  "placeholder:text-ink/40 outline-none transition-colors duration-200 " +
  "focus:border-brown focus:ring-2 focus:ring-brown/20";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverMessage, setServerMessage] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});
    setServerMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
      company: String(data.get("company") ?? ""), // honeypot
    };

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
        return;
      }

      const body = await res.json().catch(() => ({}));

      if (res.status === 422 && body.fields) {
        setErrors(body.fields as FieldErrors);
        setStatus("error");
        setServerMessage("Please check the highlighted fields.");
        return;
      }

      if (res.status === 429) {
        setStatus("error");
        setServerMessage("Too many attempts. Please try again in a few minutes.");
        return;
      }

      setStatus("error");
      setServerMessage(
        "We couldn't send your message right now. Please try again shortly or email us directly.",
      );
    } catch {
      setStatus("error");
      setServerMessage(
        "Network error. Please check your connection and try again.",
      );
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center justify-center rounded-2xl bg-white p-10 text-center shadow-card"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-blue/10 text-blue">
          <Check size={28} strokeWidth={2.5} />
        </span>
        <h3 className="mt-5 text-xl font-bold text-blue">Message received</h3>
        <p className="mt-2 max-w-sm text-[0.95rem] leading-relaxed text-ink/70">
          Thanks for reaching out. You&apos;ll hear back from us shortly with an
          answer to your question.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-brown transition-colors hover:text-blue"
        >
          Send another message
        </button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl bg-white p-6 shadow-card sm:p-8"
    >
      {/* Honeypot — visually hidden, off-screen, not announced to humans. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company (leave blank)</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block text-sm font-medium text-ink"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={100}
            autoComplete="name"
            placeholder="Jane Doe"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputBase}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-sm text-[#b3261e]">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-medium text-ink"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            inputMode="email"
            placeholder="jane@email.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputBase}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-sm text-[#b3261e]">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <label
          htmlFor="message"
          className="mb-1.5 block text-sm font-medium text-ink"
        >
          Your question
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={2000}
          placeholder="Tell us what you're looking for, your budget, and your timeline."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${inputBase} resize-y`}
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-sm text-[#b3261e]">
            {errors.message}
          </p>
        )}
      </div>

      {status === "error" && serverMessage && (
        <p role="alert" className="mt-4 text-sm font-medium text-[#b3261e]">
          {serverMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue px-7 py-3.5 text-[0.95rem] font-semibold text-white shadow-card transition-all duration-300 ease-out-quart hover:bg-blue-accent hover:shadow-card-hover hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-accent focus-visible:ring-offset-2 disabled:translate-y-0 disabled:opacity-60 sm:w-auto"
      >
        {submitting ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send size={17} />
            Send inquiry
          </>
        )}
      </button>

      <p className="mt-4 text-xs leading-relaxed text-ink/50">
        We use your details only to answer your inquiry. No spam, ever.
      </p>
    </form>
  );
}
