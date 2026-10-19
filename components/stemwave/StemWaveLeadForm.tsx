"use client";

import emailjs from "@emailjs/browser";
import { useState, type FormEvent } from "react";
import { emailjsConfig, site } from "@/lib/site";
import { painAreas, stemwaveOffer } from "@/lib/stemwave";

type Status = "idle" | "sending" | "sent" | "error";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

const labelCls = "flex flex-col gap-1.5 text-sm font-semibold";
const inputCls =
  "min-h-[50px] rounded-xl border border-field-line bg-field px-3.5 text-base font-normal text-ink placeholder:text-muted-2/70";

export default function StemWaveLeadForm() {
  const [area, setArea] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    // Honeypot: real visitors never see or fill this field.
    if (data.get("website")) {
      setStatus("sent");
      return;
    }

    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const query = new URLSearchParams(window.location.search);
    const utm = UTM_KEYS.filter((k) => query.get(k)).map(
      (k) => `${k}: ${query.get(k)}`,
    );

    setStatus("sending");
    try {
      // Reuses the main contact form's EmailJS template and its variables.
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          first: name,
          last: "",
          email: email || "(not provided)",
          "phone number": phone,
          subject: `StemWave consultation request — ${name}`,
          message: [
            `Pain area: ${area ?? "Not specified"}`,
            "Source: stemwave-campaign",
            ...utm,
          ].join("\n"),
        },
        { publicKey: emailjsConfig.publicKey },
      );
      setStatus("sent");
      window.gtag?.("event", "generate_lead", { form: "stemwave-campaign" });
      window.fbq?.("track", "Lead");
    } catch (err) {
      console.error("StemWave lead form failed to send", err);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-3 px-1 py-8 text-center"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-deep-tint text-[26px] text-deep">
          ✓
        </div>
        <div className="font-display text-[30px]">You’re on the list</div>
        <p className="max-w-[320px] leading-[1.55] text-muted">
          We’ll call you within 1 business day to set up your StemWave
          consultation.
        </p>
        <button
          type="button"
          onClick={() => {
            setArea(null);
            setStatus("idle");
          }}
          className="mt-1.5 min-h-11 rounded-full border-[1.5px] border-ink bg-white px-[18px] text-[15px] font-semibold"
        >
          Back
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3.5">
      {stemwaveOffer.show && (
        <div className="rounded-[14px] border border-offer-line bg-offer-bg px-3.5 py-3 text-[15px] font-semibold text-orange-hover">
          {stemwaveOffer.text}
        </div>
      )}
      <h2 className="font-display text-[30px] leading-[1.1]">
        See if StemWave is right for you
      </h2>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 text-sm font-semibold">Where’s the pain?</legend>
        <div className="flex flex-wrap gap-2">
          {painAreas.map((a) => {
            const on = a === area;
            return (
              <button
                key={a}
                type="button"
                aria-pressed={on}
                onClick={() => setArea(on ? null : a)}
                className={`min-h-10 rounded-full border px-3.5 text-sm transition-colors ${
                  on
                    ? "border-deep bg-deep font-semibold text-white"
                    : "border-field-line bg-field font-medium text-ink hover:border-teal"
                }`}
              >
                {a}
              </button>
            );
          })}
        </div>
      </fieldset>

      <label className={labelCls}>
        Full name
        <input
          name="name"
          required
          autoComplete="name"
          placeholder="Jane Doe"
          className={inputCls}
        />
      </label>
      <div className="grid-fit-170 gap-3.5">
        <label className={labelCls}>
          Phone
          <input
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="(928) 555-0123"
            className={inputCls}
          />
        </label>
        <label className={labelCls}>
          <span>
            Email <span className="font-normal text-muted-2">(optional)</span>
          </span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@email.com"
            className={inputCls}
          />
        </label>
      </div>

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
          Sorry, that didn’t send. Please try again, or call us at{" "}
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
        {sending ? "Sending…" : stemwaveOffer.cta}
      </button>
      <p className="text-[13px] leading-normal text-muted-2">
        We’ll call you within 1 business day to schedule. Tue–Fri, 7AM–6PM.
      </p>
    </form>
  );
}
