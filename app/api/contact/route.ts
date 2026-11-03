import { NextResponse } from "next/server";
import { SUBJECTS, isValidEmail, isValidPhone } from "@/lib/contact";
import { painAreas } from "@/lib/stemwave";

const SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const EMAILJS_URL = "https://api.emailjs.com/api/v1.0/email/send";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

type Fields = Record<string, unknown>;
type TemplateParams = Record<string, string>;

const fail = (status: number, error: string) =>
  NextResponse.json({ error }, { status });

function text(value: unknown, max = 200) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

// Single-line values, so a field can't smuggle extra lines into the email.
function line(value: unknown, max = 200) {
  return text(value, max).replace(/\s+/g, " ");
}

// Each builder returns the EmailJS template variables, or null if invalid.
// Variable names match the template used by the old narf2.0 form.
function contactParams(f: Fields): TemplateParams | null {
  const first = line(f.first, 100);
  const last = line(f.last, 100);
  const email = line(f.email);
  const phone = line(f.phone, 40);
  const subject = SUBJECTS.find((s) => s.value === f.subject)?.value;
  const message = text(f.message, 5000);
  if (!first || !last || !isValidPhone(phone) || !isValidEmail(email) || !subject || !message) return null;
  return {
    first,
    last,
    email,
    "phone number": phone,
    subject,
    message,
  };
}

function stemwaveParams(f: Fields): TemplateParams | null {
  const name = line(f.name, 200);
  const phone = line(f.phone, 40);
  const email = line(f.email);
  const painArea = painAreas.find((a) => a === f.painArea);
  if (!name || !isValidPhone(phone) || !isValidEmail(email) || !painArea) return null;

  const utm = (f.utm ?? {}) as Fields;
  return {
    first: name,
    last: "",
    email,
    "phone number": phone,
    subject: `StemWave consultation request — ${name}`,
    message: [
      `Pain area: ${painArea}`,
      "Source: stemwave-campaign",
      ...UTM_KEYS.filter((k) => line(utm[k])).map((k) => `${k}: ${line(utm[k])}`),
    ].join("\n"),
  };
}

async function passesTurnstile(token: string, secret: string, ip: string | null) {
  const res = await fetch(SITEVERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret,
      response: token,
      ...(ip ? { remoteip: ip } : {}),
    }),
  });
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}

export async function POST(request: Request) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;
  if (!secret || !privateKey) {
    console.error("Contact form: TURNSTILE_SECRET_KEY or EMAILJS_PRIVATE_KEY is not set");
    return fail(500, "not_configured");
  }

  let body: { form?: unknown; token?: unknown; fields?: Fields };
  try {
    body = await request.json();
  } catch {
    return fail(400, "invalid_request");
  }
  const fields = body.fields ?? {};

  const token = typeof body.token === "string" ? body.token : "";
  if (!token || token.length > 2048) return fail(403, "captcha_failed");

  // Honeypot: real visitors never fill this field, so pretend it worked.
  if (text(fields.website)) return NextResponse.json({ ok: true });

  const params =
    body.form === "contact"
      ? contactParams(fields)
      : body.form === "stemwave"
        ? stemwaveParams(fields)
        : null;
  if (!params) return fail(400, "invalid_fields");

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? null;
  try {
    if (!(await passesTurnstile(token, secret, ip))) {
      return fail(403, "captcha_failed");
    }

    const sent = await fetch(EMAILJS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: process.env.EMAILJS_SERVICE_ID ?? "gmail",
        template_id: process.env.EMAILJS_TEMPLATE_ID ?? "template_7nlu4to",
        user_id: process.env.EMAILJS_PUBLIC_KEY ?? "user_xEWI2orbMXf48SBIwv08s",
        accessToken: privateKey,
        template_params: params,
      }),
    });
    if (!sent.ok) {
      console.error("EmailJS rejected the send", sent.status, await sent.text());
      return fail(502, "send_failed");
    }
  } catch (err) {
    console.error("Contact form request failed", err);
    return fail(502, "send_failed");
  }

  return NextResponse.json({ ok: true });
}
