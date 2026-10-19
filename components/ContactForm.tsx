"use client";

import emailjs from "@emailjs/browser";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, type FormEvent } from "react";
import { emailjsConfig, site } from "@/lib/site";

// `value` is what the EmailJS template receives (same strings as the old site).
const SUBJECTS = [
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

type Status = "idle" | "sending" | "sent" | "error";

const labelCls = "flex flex-col gap-1.5 text-sm font-semibold";
const inputCls =
  "min-h-[50px] rounded-xl border border-field-line bg-field px-3.5 text-base font-normal text-ink placeholder:text-muted-2/70";

function Form({ initialSubject }: { initialSubject: number }) {
  const [subject, setSubject] = useState(initialSubject);
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    // Honeypot: real visitors never see or fill this field.
    if (new FormData(form).get("website")) {
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      await emailjs.sendForm(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        form,
        { publicKey: emailjsConfig.publicKey },
      );
      setStatus("sent");
    } catch (err) {
      console.error("Contact form failed to send", err);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        className="flex flex-col items-center gap-3 px-2 py-10 text-center"
        role="status"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-deep-tint text-[26px] text-deep">
          ✓
        </div>
        <div className="font-display text-[32px]">Message sent</div>
        <p className="max-w-[340px] leading-[1.55] text-muted">
          Thanks! We’ll get back to you within 1–2 business days. Need us
          sooner? Call {site.phone}.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 min-h-11 rounded-full border-[1.5px] border-ink bg-white px-[18px] text-[15px] font-semibold"
        >
          Send another
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 text-[15px] font-semibold">
          What’s this about?
        </legend>
        <div className="flex flex-wrap gap-2">
          {SUBJECTS.map((s, i) => {
            const on = i === subject;
            return (
              <button
                key={s.slug}
                type="button"
                aria-pressed={on}
                onClick={() => setSubject(i)}
                className={`min-h-11 rounded-full border px-4 text-[15px] transition-colors ${
                  on
                    ? "border-deep bg-deep font-semibold text-white"
                    : "border-field-line bg-white font-medium text-ink hover:border-teal"
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>
        <input type="hidden" name="subject" value={SUBJECTS[subject].value} />
      </fieldset>

      {/* Field names match the existing EmailJS template variables. */}
      <div className="grid-fit-180 gap-4">
        <label className={labelCls}>
          First name
          <input
            name="first"
            required
            autoComplete="given-name"
            placeholder="Jane"
            className={inputCls}
          />
        </label>
        <label className={labelCls}>
          Last name
          <input
            name="last"
            required
            autoComplete="family-name"
            placeholder="Doe"
            className={inputCls}
          />
        </label>
      </div>
      <label className={labelCls}>
        Email
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@email.com"
          className={inputCls}
        />
      </label>
      <label className={labelCls}>
        Phone
        <input
          name="phone number"
          type="tel"
          required
          autoComplete="tel"
          placeholder="(928) 555-0123"
          className={inputCls}
        />
      </label>
      <label className={labelCls}>
        Message
        <textarea
          name="message"
          rows={4}
          placeholder={SUBJECTS[subject].hint}
          className={`${inputCls} resize-y py-3`}
        />
      </label>

      {/* Honeypot */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === "error" && (
        <div
          role="alert"
          className="rounded-xl border border-orange/40 bg-orange/10 px-3.5 py-3 text-[15px] text-orange-hover"
        >
          Sorry, your message didn’t send. Please try again, or call us at{" "}
          <a href={site.phoneHref} className="font-semibold underline">
            {site.phone}
          </a>
          .
        </div>
      )}

      <button
        type="submit"
        disabled={sending}
        className="min-h-[54px] rounded-full bg-orange text-[17px] font-semibold text-white transition-colors hover:bg-orange-hover disabled:cursor-not-allowed disabled:opacity-70"
      >
        {sending ? "Sending…" : "Send message"}
      </button>
      <p className="text-[13px] leading-normal text-muted-2">
        By sending, you consent to Northern Arizona Rehab &amp; Fitness storing
        and processing the information above. We reply within 1–2 business
        days.
      </p>
    </form>
  );
}

function FormFromQuery() {
  // /contact?subject=employment (etc.) preselects the subject pill.
  const param = useSearchParams().get("subject");
  const index = SUBJECTS.findIndex((s) => s.slug === param);
  return <Form initialSubject={Math.max(index, 0)} />;
}

export default function ContactForm() {
  return (
    <Suspense fallback={<Form initialSubject={0} />}>
      <FormFromQuery />
    </Suspense>
  );
}
