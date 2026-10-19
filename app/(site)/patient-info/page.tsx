import { pageMetadata } from "@/lib/metadata";
import Button from "@/components/Button";
import Eyebrow from "@/components/Eyebrow";
import FaqAccordion from "@/components/FaqAccordion";
import Photo from "@/components/Photo";
import { faq } from "@/lib/faq";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "New Patient Info & Forms",
  description:
    "Everything you need before your first physical therapy visit at NARF in Cottonwood, AZ: downloadable new patient forms, what to bring, what to expect, and common questions.",
});

// TODO(clinic): "Bring the essentials" and "Dress to move" copy is new — confirm.
const steps = [
  { n: 2, title: "Bring the essentials", text: "Your completed forms, photo ID, insurance card, and any referral or prescription from your doctor." },
  { n: 3, title: "Arrive a few minutes early", text: "If you’re completing forms at our office, plan to arrive 10–15 minutes before your appointment." },
  { n: 4, title: "Dress to move", text: "Wear comfortable clothes you can exercise in — and bring a swimsuit if your plan includes the pool." },
];

const expect = [
  { title: "A comprehensive initial exam", text: "We listen, understand, and get to know you and your condition." },
  { title: "An individualized treatment plan", text: "Safe, effective and creative treatment — in the gym, the pool, or both." },
  { title: "Close supervision, every visit", text: "Your licensed physical therapist stays actively involved throughout your care." },
];

const downloadCls =
  "flex min-h-14 items-center justify-between rounded-[14px] px-5 font-semibold transition-colors";

export default function PatientInfo() {
  return (
    <>
      <section className="pb-[clamp(36px,5vw,56px)] pt-[clamp(40px,6vw,80px)]">
        <div className="wrap grid-fit-420 items-end gap-[clamp(28px,5vw,64px)]">
          <div className="flex flex-col gap-4">
            <Eyebrow>New patients</Eyebrow>
            <h1 className="h1">Everything you need before your first visit.</h1>
          </div>
          <p className="lead">
            To help expedite your first visit, please download, print and
            complete our forms and bring them with you. Questions? Give us a
            call at{" "}
            <a href={site.phoneHref} className="text-link">
              {site.phone}
            </a>
            .
          </p>
        </div>
      </section>

      {/* Checklist */}
      <section className="section-b">
        <div className="wrap grid-fit-340 gap-4">
          <div className="row-span-2 flex flex-col gap-3.5 rounded-[20px] bg-deep p-[clamp(24px,3vw,36px)] text-white">
            <div className="font-display text-[56px] leading-none text-orange-soft">
              1
            </div>
            <h2 className="text-2xl font-semibold">
              Download &amp; complete your forms
            </h2>
            <p className="leading-[1.55] text-deep-tint">
              Print them at home and bring them to your appointment.
            </p>
            <div className="mt-auto flex flex-col gap-2.5 pt-3">
              <a
                href="/docs/NewPatientPacket.pdf"
                target="_blank"
                rel="noopener"
                className={`${downloadCls} bg-white text-deep hover:bg-deep-tint`}
              >
                New Patient Packet
                <span className="text-[13px] font-medium text-muted-2">
                  PDF ↓
                </span>
              </a>
              <a
                href="/docs/Patientforms.pdf"
                target="_blank"
                rel="noopener"
                className={`${downloadCls} border border-white/25 bg-white/10 text-white hover:bg-white/20`}
              >
                Patient Forms
                <span className="text-[13px] font-medium text-deep-tint">
                  PDF ↓
                </span>
              </a>
            </div>
          </div>
          {steps.map((s) => (
            <div
              key={s.n}
              className="flex gap-[18px] rounded-[20px] border border-sand-line-2 bg-white p-[clamp(22px,3vw,30px)]"
            >
              <div className="flex-none font-display text-[40px] leading-none text-orange">
                {s.n}
              </div>
              <div className="flex flex-col gap-1.5">
                <h2 className="text-xl font-semibold">{s.title}</h2>
                <p className="leading-[1.55] text-muted">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What to expect */}
      <section className="section-y bg-white">
        <div className="wrap grid-fit-420 items-center gap-split">
          <Photo
            src="/images/gymImg.jpeg"
            alt="Therapy gym"
            sizes="(min-width: 980px) 540px, 100vw"
            className="aspect-[4/3] rounded-[22px]"
          />
          <div className="flex flex-col gap-[22px]">
            <h2 className="h2">What to expect</h2>
            <div className="flex flex-col gap-[18px]">
              {expect.map((e) => (
                <div key={e.title} className="border-t border-sand-line pt-4">
                  <h3 className="text-lg font-semibold">{e.title}</h3>
                  <p className="mt-1 leading-[1.55] text-muted">{e.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Insurance & FAQ */}
      <section className="section-y">
        <div className="wrap grid-fit-380 items-start gap-split">
          <div className="flex flex-col gap-4">
            <h2 className="h2">Insurance &amp; billing</h2>
            <p className="text-[17px] leading-[1.55] text-muted">
              Not sure about your coverage? Send us an insurance question and
              our front desk will follow up within 1–2 business days.
            </p>
            {/* TODO(clinic): replace with the list of accepted insurance plans. */}
            <div className="rounded-2xl border-[1.5px] border-dashed border-placeholder-line bg-field p-5 text-sm text-placeholder">
              Content needed: list of accepted insurance plans (logos or
              names).
            </div>
            <Button
              href="/contact?subject=insurance"
              variant="outline"
              size="sm"
              className="self-start"
            >
              Ask an insurance question
            </Button>
          </div>
          <div>
            <h2 className="h2 mb-5">Common questions</h2>
            <FaqAccordion items={faq} />
          </div>
        </div>
      </section>
    </>
  );
}
