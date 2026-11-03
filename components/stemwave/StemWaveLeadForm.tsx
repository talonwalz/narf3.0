"use client";

import { useState, type FormEvent } from "react";
import Turnstile from "@/components/Turnstile";
import { submitForm } from "@/lib/contact";
import { site } from "@/lib/site";
import { painAreas, stemwaveOffer } from "@/lib/stemwave";

type Status = "idle" | "sending" | "sent" | "error";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

const labelCls = "flex flex-col gap-1.5 text-sm font-semibold";
const inputCls =
  "min-h-[50px] rounded-xl border border-field-line bg-field px-3.5 text-base font-normal text-ink placeholder:text-muted-2/70";

export default function StemWaveLeadForm() {
  const [area, setArea] = useState<string | null>(null);
  const [areaMissing, setAreaMissing] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [token, setToken] = useState<string | null>(null);
  const [captchaKey, setCaptchaKey] = useState(0);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!token) return;
    // The pain area pills are buttons, so the browser can't enforce this one.
    if (!area) {
      setAreaMissing(true);
      return;
    }
    const form = e.currentTarget;

    setStatus("sending");
    try {
      await submitForm("stemwave", token, {
        ...Object.fromEntries(new FormData(form)),
        painArea: area,
        utm: Object.fromEntries(new URLSearchParams(window.location.search)),
      });
      setToken(null);
      setStatus("sent");
      window.gtag?.("event", "generate_lead", { form: "stemwave-campaign" });
      window.fbq?.("track", "Lead");
    } catch (err) {
      console.error("StemWave lead form failed to send", err);
      // The token was used up by this attempt, so get a fresh one.
      setToken(null);
      setCaptchaKey((k) => k + 1);
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
          We’ll call you within 1–2 business days to set up your StemWave
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
                onClick={() => {
                  setArea(on ? null : a);
                  setAreaMissing(false);
                }}
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
        {areaMissing && (
          <p role="alert" className="text-sm font-semibold text-orange-hover">
            Please choose where the pain is.
          </p>
        )}
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
      </div>

      {/* Honeypot */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <Turnstile onToken={setToken} passed={!!token} resetKey={captchaKey} />

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
        disabled={sending || !token}
        className="min-h-[54px] rounded-full bg-orange text-[17px] font-semibold text-white transition-colors hover:bg-orange-hover disabled:cursor-not-allowed disabled:opacity-70"
      >
        {sending ? "Sending…" : stemwaveOffer.cta}
      </button>
      <p className="text-[13px] leading-normal text-muted-2">
        We’ll call you within 1–2 business days to schedule. Tue–Fri, 7AM–6PM.
      </p>
    </form>
  );
}
