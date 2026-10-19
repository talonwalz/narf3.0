import { pageMetadata } from "@/lib/metadata";
import Button from "@/components/Button";
import Eyebrow from "@/components/Eyebrow";
import FaqAccordion from "@/components/FaqAccordion";
import Badge from "@/components/stemwave/Badge";
import PhotoSlot from "@/components/stemwave/PhotoSlot";
import StemWaveLeadForm from "@/components/stemwave/StemWaveLeadForm";
import { site } from "@/lib/site";
import {
  campaignBullets,
  campaignSteps,
  stemwaveConditions,
  stemwaveFaq,
  stemwaveImages,
  stemwaveOffer,
} from "@/lib/stemwave";

// Ad/social/QR landing page. /services/stemwave is the page meant for search.
export const metadata = pageMetadata({
  title: "StemWave Therapy — Book a Consultation | NARF",
  absoluteTitle: true,
  description:
    "See if StemWave® acoustic wave therapy is right for you. Book a consultation at Northern Arizona Rehabilitation & Fitness in Cottonwood, AZ.",
  noindex: true,
});

const bodyCls = "text-[17px] leading-[1.6] text-muted";

export default function StemWaveCampaign() {
  return (
    <>
      {/* Hero + lead form */}
      <section className="bg-deep pb-[clamp(48px,6vw,96px)] pt-[clamp(40px,6vw,88px)] text-white">
        <div className="wrap grid-fit-440 items-center gap-[clamp(36px,5vw,64px)]">
          <div className="flex flex-col gap-[22px]">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge className="px-3 py-1.5 text-[13px]">New at NARF</Badge>
              <span className="text-sm font-semibold text-deep-tint-2">
                StemWave® acoustic wave therapy
              </span>
            </div>
            <h1 className="h1 text-[clamp(42px,6vw,76px)]">
              Stubborn pain? There’s a new way forward.
            </h1>
            <p className="max-w-[540px] text-pretty text-[clamp(17px,1.5vw,20px)] leading-[1.55] text-deep-tint">
              StemWave uses focused acoustic waves to stimulate your body’s
              natural healing response — a non-invasive, drug-free option for
              pain that hasn’t responded to other care.
            </p>
            <ul className="flex flex-wrap gap-x-[22px] gap-y-2.5 text-[15px]">
              {campaignBullets.map((b) => (
                <li key={b} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-orange-soft" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div
            id="book"
            className="scroll-mt-[90px] rounded-3xl bg-white p-[clamp(22px,3vw,34px)] text-ink shadow-form"
          >
            <StemWaveLeadForm />
          </div>
        </div>
      </section>

      {/* What is StemWave */}
      <section className="section-y">
        <div className="wrap grid-fit-420 items-center gap-split">
          <PhotoSlot
            src={stemwaveImages.device}
            alt="StemWave device in use at NARF"
            label="Photo: StemWave device in use at NARF"
            sizes="(min-width: 980px) 540px, 100vw"
            className="aspect-[4/3] rounded-[22px]"
          />
          <div className="flex flex-col gap-4">
            <Eyebrow>What is StemWave?</Eyebrow>
            <h2 className="h2">Sound waves that wake up healing.</h2>
            <p className={bodyCls}>
              StemWave is an FDA-listed device that delivers focused acoustic
              waves into injured or painful tissue. That gentle mechanical
              stimulation can increase blood flow, calm inflammation and
              kick-start the body’s own repair process.
            </p>
            <p className={bodyCls}>
              At NARF, it’s not a stand-alone gadget — it’s one more tool your
              physical therapist can add to your plan, alongside our gym, pool
              and hands-on care.
            </p>
          </div>
        </div>
      </section>

      {/* Commonly used for */}
      <section className="section-y bg-white">
        <div className="wrap">
          <h2 className="h2 mb-3">Commonly used for</h2>
          <p className="mb-9 max-w-[620px] text-[17px] leading-[1.55] text-muted">
            Especially chronic tendon, ligament and soft-tissue pain that
            hasn’t improved with rest or traditional care.
          </p>
          <div className="grid-fill-260 gap-3.5">
            {stemwaveConditions.map((c) => (
              <div
                key={c.name}
                className="flex flex-col gap-1.5 rounded-[18px] bg-sand px-6 py-[22px]"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.1em] text-teal">
                  {c.area}
                </div>
                <h3 className="text-[19px] font-semibold">{c.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-y bg-deep text-white">
        <div className="wrap">
          <Eyebrow tone="dark" className="mb-3">
            How it works
          </Eyebrow>
          <h2 className="h2 mb-11">Quick sessions, built into your plan.</h2>
          <ol className="grid-fit-260 gap-[clamp(24px,4vw,40px)]">
            {campaignSteps.map((s, i) => (
              <li
                key={s.title}
                className="flex flex-col gap-2.5 border-t border-deep-tint/25 pt-[22px]"
              >
                <div className="font-display text-[52px] leading-none text-orange-soft">
                  {i + 1}
                </div>
                <h3 className="text-xl font-semibold">{s.title}</h3>
                <p className="leading-[1.55] text-deep-tint">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-y">
        <div className="mx-auto max-w-[880px] px-[clamp(20px,4vw,40px)]">
          <h2 className="h2 mb-6">Questions we hear a lot</h2>
          <div className="border-b border-sand-line">
            <FaqAccordion items={stemwaveFaq} />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-teal py-[clamp(56px,7vw,96px)] text-white">
        <div className="wrap flex flex-wrap items-center justify-between gap-7">
          <div className="max-w-[620px]">
            <h2 className="mb-2.5 font-display text-[clamp(32px,3.8vw,46px)] leading-[1.08]">
              Ready to find out if StemWave can help?
            </h2>
            <p className="text-lg text-teal-tint">
              {site.address.street}, {site.address.city} · Tue–Fri 7AM–6PM
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="#book"
              className="inline-flex min-h-[50px] items-center rounded-full bg-white px-[26px] font-semibold text-deep transition-colors hover:bg-deep-tint"
            >
              {stemwaveOffer.cta}
            </a>
            <Button href={site.phoneHref} variant="outline-light">
              {site.phone}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
