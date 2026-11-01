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
