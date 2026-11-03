"use client";

import { useState, type FormEvent } from "react";
import { isValidEmail, isValidPhone } from "@/lib/contact";

type FieldEl = HTMLInputElement | HTMLTextAreaElement;

const isFieldEl = (el: unknown): el is FieldEl =>
  el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement;

// Inline validation for a form. `required` maps each validated field's name to
// the message shown when it's empty; other fields (honeypot, hidden) are ignored.
export function useFieldErrors(required: Record<string, string>) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  function problem(el: FieldEl) {
    if (!el.value.trim()) return required[el.name];
    if (el.type === "email" && !isValidEmail(el.value.trim())) {
      return "Please enter a valid email address.";
    }
    if (el.type === "tel" && !isValidPhone(el.value)) {
      return "Please enter a valid phone number.";
    }
    return "";
  }

  const setError = (name: string, message: string) =>
    setErrors((prev) => ({ ...prev, [name]: message }));

  return {
    errors,
    // `noValidate` swaps the browser's popups for the messages under each field.
    formProps: {
      noValidate: true,
      // Tabbing past an empty field isn't flagged; that waits for submit.
      onBlur(e: FormEvent<HTMLFormElement>) {
        const el = e.target;
        if (isFieldEl(el) && el.name in required && el.value.trim()) {
          setError(el.name, problem(el));
        }
      },
      // Once a field shows an error, clear it as soon as it's fixed.
      onChange(e: FormEvent<HTMLFormElement>) {
        const el = e.target;
        if (isFieldEl(el) && errors[el.name]) setError(el.name, problem(el));
      },
    },
    invalid: (name: string) => (errors[name] ? true : undefined),
    // Checks every field, shows all messages and focuses the first bad field.
    validate(form: HTMLFormElement) {
      const els = Array.from(form.elements)
        .filter(isFieldEl)
        .filter((el) => el.name in required);
      const found = Object.fromEntries(els.map((el) => [el.name, problem(el)]));
      setErrors(found);
      els.find((el) => found[el.name])?.focus();
      return els.every((el) => !found[el.name]);
    },
  };
}

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="text-sm font-semibold text-orange-hover">
      {message}
    </p>
  );
}
