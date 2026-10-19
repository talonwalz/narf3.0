import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import Button from "@/components/Button";
import Eyebrow from "@/components/Eyebrow";
import Badge from "@/components/stemwave/Badge";
import PhotoSlot from "@/components/stemwave/PhotoSlot";
import { site } from "@/lib/site";
import {
  STEMWAVE_BOOK_HREF,
  benefits,
  serviceSteps,
  stemwaveConditions,
  stemwaveImages,
} from "@/lib/stemwave";

export const metadata = pageMetadata({
  title: "StemWave Therapy in Cottonwood, AZ | Northern Arizona Rehab & Fitness",
  absoluteTitle: true,
  description:
    "StemWave® acoustic wave therapy at NARF in Cottonwood, AZ — a non-invasive, drug-free option for stubborn tendon, ligament and soft-tissue pain, delivered by your physical therapist.",
});

const bodyCls = "text-[17px] leading-[1.6] text-muted";

export default function StemWaveService() {
  return (
    <>
      {/* Hero */}
      <section className="pb-[clamp(56px,7vw,96px)] pt-[clamp(32px,5vw,64px)]">
        <div className="wrap">
          <nav
            aria-label="Breadcrumb"
            className="mb-7 flex gap-2 text-sm text-muted-2"
          >
            <Link href="/services" className="text-teal hover:text-teal-link">
              Services
            </Link>
            <span aria-hidden>/</span>
            <span aria-current="page">StemWave therapy</span>
          </nav>
          <div className="grid-fit-440 items-center gap-[clamp(36px,5vw,64px)]">
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2.5">
                <Badge tone="orange">New</Badge>
                <Eyebrow>Our services</Eyebrow>
              </div>
              <h1 className="h1">StemWave® therapy</h1>
              <p className="lead max-w-[540px]">
                A non-invasive, drug-free acoustic wave treatment for stubborn
                tendon, ligament and soft-tissue pain — delivered by your
                physical therapist as part of your plan.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button href={STEMWAVE_BOOK_HREF}>Book a consultation</Button>
                <Button href={site.phoneHref} variant="outline">
                  Call {site.phone}
                </Button>
              </div>
            </div>
            <PhotoSlot
              src={stemwaveImages.serviceHero}
              alt="StemWave treatment at NARF"
              label="Photo: StemWave device / treatment at NARF"
              sizes="(min-width: 1000px) 560px, 100vw"
              className="aspect-[5/4] rounded-3xl"
              preload
            />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white py-[clamp(48px,6vw,80px)]">
        <div className="wrap grid-fit-240 gap-4">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="flex flex-col gap-2 rounded-[18px] bg-sand p-6"
            >
              <h2 className="text-xl font-semibold">{b.title}</h2>
              <p className="text-[15px] leading-[1.55] text-muted">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="section-y">
        <div className="wrap grid-fit-400 items-start gap-split">
          <div className="flex flex-col gap-4">
            <h2 className="h2">How it works</h2>
            <p className={bodyCls}>
              StemWave is an FDA-listed device that sends focused acoustic waves
              into the affected tissue. That mechanical stimulation can increase
              local blood flow, calm inflammation and trigger the body’s own
              repair signals.
            </p>
            <p className={bodyCls}>
              We combine it with the exercise and hands-on care you already get
              at NARF, so you’re not just treating pain — you’re rebuilding
              strength.
            </p>
          </div>
          <ol className="flex flex-col">
            {serviceSteps.map((s, i) => (
              <li
                key={s.title}
                className="flex gap-[18px] border-t border-sand-line py-[18px]"
              >
                <div className="w-7 flex-none font-display text-[34px] leading-none text-orange">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                  <p className="mt-1 leading-[1.55] text-muted">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Conditions */}
      <section className="section-y bg-white">
        <div className="wrap">
          <h2 className="h2 mb-8">Conditions we may treat with StemWave</h2>
          <ul className="flex flex-wrap gap-2.5">
            {stemwaveConditions.map((c) => (
              <li
                key={c.short}
                className="rounded-full border border-sand-line bg-sand px-[18px] py-3"
              >
                {c.short}
              </li>
            ))}
          </ul>
          <p className="mt-7 max-w-[680px] text-[15px] leading-[1.55] text-muted-2">
            StemWave isn’t right for everyone. Your therapist will review your
            history and tell you honestly whether it’s likely to help.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-deep py-[clamp(48px,6vw,80px)] text-white">
        <div className="wrap flex flex-wrap items-center justify-between gap-6">
          <div className="max-w-[620px]">
            <h2 className="mb-2 font-display text-[clamp(30px,3.6vw,44px)] leading-[1.08]">
              Wondering if you’re a candidate?
            </h2>
            <p className="text-[17px] text-deep-tint">
              Questions about pricing and packages? Give us a call.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={STEMWAVE_BOOK_HREF} variant="light" className="px-[26px]">
              Book a consultation
            </Button>
            <Button href="/services" variant="outline-light">
              All services
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
