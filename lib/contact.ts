import type { ChangeEvent } from "react";

// Contact form subjects, shared by the form and the server route that validates it.
// `value` is what the EmailJS template receives (same strings as the old site).
export const SUBJECTS = [
  {
    slug: "appointment",
    label: "Schedule an appointment",
    value: "Schedule an Appointment",
    hint: "Tell us a little about what’s going on and which days work best (Tue–Fri).",
  },
  {
    slug: "insurance",
    label: "Insurance question",
    value: "Insurance Question",
    hint: "Which insurance plan do you have, and what would you like to know?",
  },
  {
    slug: "employment",
    label: "Employment",
    value: "Employment Opportunities",
    hint: "Which role are you interested in? Tell us about yourself.",
  },
] as const;

export type FormName = "contact" | "stemwave";

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// US numbers: 10 digits, or 11 with a leading 1. Area codes and exchanges
// can't start with 0 or 1. Common punctuation is fine, letters are not.
export function isValidPhone(value: string) {
  if (!/^[\d\s().+-]+$/.test(value)) return false;
  return /^1?[2-9]\d{2}[2-9]\d{6}$/.test(value.replace(/\D/g, ""));
}

// Formats as (928) 555-0123 so far as digits allow. Punctuation only appears
// once a digit follows it, so backspacing never gets stuck on a separator.
export function formatPhone(value: string) {
  const d = value.replace(/\D/g, "").replace(/^1/, "").slice(0, 10);
  if (d.length <= 3) return d && `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

// onChange for phone inputs: formats while typing and keeps the caret after the
// same digit.
export function onPhoneChange(e: ChangeEvent<HTMLInputElement>) {
  const input = e.currentTarget;
  const raw = input.value;
  const beforeCaret = raw.slice(0, input.selectionStart ?? raw.length);
  const leadingOne = raw.replace(/\D/g, "").startsWith("1") ? 1 : 0;
  const digitsBefore = Math.max(beforeCaret.replace(/\D/g, "").length - leadingOne, 0);

  const formatted = formatPhone(raw);
  input.value = formatted;
  if (document.activeElement === input) {
    let caret = 0;
    for (let seen = 0; seen < digitsBefore && caret < formatted.length; caret++) {
      if (/\d/.test(formatted[caret])) seen++;
    }
    input.setSelectionRange(caret, caret);
  }
}

// Posts a form to /api/contact. Resolves on success, throws otherwise.
export async function submitForm(
  form: FormName,
  token: string,
  fields: Record<string, unknown>,
) {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ form, token, fields }),
  });
  if (!res.ok) throw new Error(`Form submit failed (${res.status})`);
}
