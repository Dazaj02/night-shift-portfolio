"use client";

import { useRef, useState, type FormEvent } from "react";
import { CutButton } from "@/components/ui/CutButton";

interface ContactFormProps {
  email: string;
  subject: string;
  labels: {
    name: string;
    email: string;
    message: string;
    submit: string;
    hint: string;
    errorRequired: string;
    errorEmail: string;
    success: string;
  };
}

type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function ContactForm({ email, subject, labels }: ContactFormProps) {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const from = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const next: Errors = {};
    if (!name) next.name = labels.errorRequired;
    if (!from) next.email = labels.errorRequired;
    else if (!EMAIL_RE.test(from)) next.email = labels.errorEmail;
    if (!message) next.message = labels.errorRequired;

    setErrors(next);
    setSent(false);
    const firstInvalid = (["name", "email", "message"] as const).find((f) => next[f]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    const body = `${message}\n\n— ${name} (${from})`;
    setSent(true);
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  const fieldClass = (f: Field) =>
    `block w-full min-h-12 border bg-panel px-4 py-3 text-ink placeholder:text-ink-faint transition-colors duration-200 focus:border-accent ${errors[f] ? "border-alert" : "border-line hover:border-ink-faint"}`;

  const labelClass =
    "mb-2 block font-display text-sm font-semibold uppercase tracking-[0.06em] text-ink";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-6">
      <div>
        <label htmlFor="cf-name" className={labelClass}>
          {labels.name}
        </label>
        <input
          id="cf-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "cf-name-error" : undefined}
          className={fieldClass("name")}
        />
        {errors.name && (
          <p id="cf-name-error" className="mt-2 text-sm text-alert">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="cf-email" className={labelClass}>
          {labels.email}
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "cf-email-error" : undefined}
          className={fieldClass("email")}
        />
        {errors.email && (
          <p id="cf-email-error" className="mt-2 text-sm text-alert">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="cf-message" className={labelClass}>
          {labels.message}
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={6}
          required
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "cf-message-error" : undefined}
          className={`${fieldClass("message")} resize-y`}
        />
        {errors.message && (
          <p id="cf-message-error" className="mt-2 text-sm text-alert">
            {errors.message}
          </p>
        )}
      </div>

      <div className="flex flex-col items-start gap-4">
        <CutButton type="submit" variant="primary" icon="mail">
          {labels.submit}
        </CutButton>
        <p className="max-w-[52ch] text-sm text-ink-dim">{labels.hint}</p>
        <p role="status" aria-live="polite" className="min-h-6 text-sm font-medium text-cyan">
          {sent ? labels.success : ""}
        </p>
      </div>
    </form>
  );
}
