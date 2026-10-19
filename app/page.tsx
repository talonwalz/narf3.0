import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import Eyebrow from "@/components/Eyebrow";
import Photo from "@/components/Photo";
import SectionHeading from "@/components/SectionHeading";
import { AREA_SLUGS, BODY_AREAS, CONDITIONS } from "@/lib/conditions";
import { site } from "@/lib/site";
import { testimonials } from "@/lib/testimonials";

const treat = [
  { name: "Back Pain & Sciatica", description: "Discomfort anywhere on the spine or back, or pain that radiates along the path of the sciatic nerve." },
  { name: "Balance & Gait Disorders", description: "Abnormal movements that impact the way you walk and run, and can become exacerbated with age." },
  { name: "Post-Surgical Rehab", description: "Rebuild lost muscle, retrain everything affected by surgery, and help control post-surgical pain." },
  { name: "Arthritis", description: "Joint inflammation causing pain and stiffness that can worsen with age." },
  { name: "General Weakness", description: "Difficulty moving part of your body properly, which can quickly lead to more serious injuries." },
];

const steps = [
  { title: "Get your forms", text: "Download and complete the new patient packet before you come — or arrive 10–15 minutes early to fill it out here." },
  { title: "Comprehensive exam", text: "Your first visit includes a full initial examination with a licensed physical therapist." },
  { title: "Your individualized plan", text: "A treatment plan built around you, performed safely and correctly under close supervision." },
];

const spaces = [
  { title: "Our gym", image: "/images/gymImg.jpeg", alt: "NARF therapy gym", text: "Many different machines and fitness equipment — whatever is needed to get you back to a higher quality of life." },
  { title: "Our pool", image: "/images/poolImg.jpg", alt: "NARF aquatic therapy pool", text: "For some, aquatic therapy can be a whole lot more beneficial to a better recovery." },
];

const teamTeaser = [
  { name: "Tarrin Walz, PT, MS", role: "Physical Therapist & Owner", image: "/images/TarrinNew.jpg", alt: "Tarrin Walz" },
  { name: "Amy Shantz, PT, DPT", role: "Physical Therapist", image: "/images/AmyNew.jpg", alt: "Amy Shantz" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="section-b pt-[clamp(36px,6vw,88px)]">
        <div className="wrap grid-fit-440 items-center gap-[clamp(36px,5vw,64px)]">
          <div className="flex flex-col gap-[22px]">
            <Eyebrow>Physical therapy · Cottonwood, Arizona</Eyebrow>
            <h1 className="h1 text-[clamp(42px,6vw,74px)]">
              Empowering our community, one person at a time.
            </h1>
            <p className="lead max-w-[520px] text-pretty">
              Skilled, hands-on therapy that restores normal movement and
              quality of life — in our gym, in our pool, and with a plan built
              around you.
            </p>
            <div className="flex flex-col gap-3 rounded-[18px] border border-sand-line bg-white px-5 py-[18px]">
              <div className="text-[15px] font-semibold">Where does it hurt?</div>
              <div className="flex flex-wrap gap-2">
                {BODY_AREAS.map((a) => (
                  <Link
                    key={a.label}
                    href={`/services?area=${AREA_SLUGS[a.category]}`}
                    className="rounded-full border border-sand-line bg-sand px-[15px] py-[9px] text-[15px] text-ink transition-colors hover:border-teal hover:text-teal"
                  >
                    {a.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href="/contact">Request Appointment</Button>
              <Button href={site.phoneHref} variant="outline">
                Call {site.phone}
              </Button>
            </div>
          </div>

          <div className="relative">
            <Photo
              src="/images/narfBuilding.jpeg"
              alt="The Northern Arizona Rehabilitation and Fitness building in Cottonwood"
              sizes="(min-width: 1000px) 560px, 100vw"
              className="aspect-[5/4] rounded-3xl"
              preload
            />
            <div className="absolute -bottom-[22px] left-3 flex items-center gap-3 rounded-2xl bg-white px-[18px] py-3.5 shadow-float">
              <span className="h-2.5 w-2.5 flex-none rounded-full bg-orange-bright" />
              <div className="text-sm leading-[1.35]">
                <b>Open Tuesday – Friday</b>
                <br />
                <span className="text-muted-2">7AM – 6PM · Closed Sat – Mon</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What we treat */}
      <section className="section-y bg-white">
        <div className="wrap">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
            <SectionHeading
              className="max-w-[560px]"
              title="What we treat"
              description="We’ve seen and treated almost everything. Here are some of the most common reasons patients come to us."
            />
            <Link href="/services" className="text-link">
              See all conditions →
            </Link>
          </div>
          <div className="grid-fit-300 gap-4">
            {treat.map((t) => (
              <Link
                key={t.name}
                href="/services"
                className="flex flex-col gap-2.5 rounded-[18px] bg-sand p-7 text-ink transition-colors hover:bg-sand-2"
              >
                <Image
                  src="/images/circle.jpg"
                  alt=""
                  width={102}
                  height={91}
                  className="h-[38px] w-[38px] object-contain mix-blend-multiply"
                />
                <h3 className="mt-1.5 text-[21px] font-semibold">{t.name}</h3>
                <p className="text-[15px] leading-[1.55] text-muted">
                  {t.description}
                </p>
              </Link>
            ))}
            <Link
              href="/services"
              className="flex min-h-[200px] flex-col justify-between gap-6 rounded-[18px] bg-teal p-7 text-white transition-colors hover:bg-teal-dark"
            >
              <div className="font-display text-[30px] leading-[1.1]">
                Plus neck, shoulder, hip, knee, sports &amp; work injuries.
              </div>
              <div className="font-semibold">
                View all {CONDITIONS.length} conditions →
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Your first visit */}
      <section className="section-y bg-deep text-white">
        <div className="wrap">
          <SectionHeading
            eyebrow="Your first visit"
            eyebrowTone="dark"
            title="Getting started is simple."
            className="mb-11"
          />
          <ol className="grid-fit-280 gap-[clamp(24px,4vw,48px)]">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className="flex flex-col gap-2.5 border-t border-deep-tint/25 pt-[22px]"
              >
                <div className="font-display text-[52px] leading-none text-orange-soft">
                  {i + 1}
                </div>
                <h3 className="text-[21px] font-semibold">{s.title}</h3>
                <p className="leading-[1.55] text-deep-tint">{s.text}</p>
              </li>
            ))}
          </ol>
          <Button href="/patient-info" variant="light" className="mt-11">
            New patient info &amp; forms
          </Button>
        </div>
      </section>

      {/* Gym & pool */}
      <section className="section-y">
        <div className="wrap">
          <SectionHeading
            title="Exceptional treatment in both our gym and pool."
            description="Two very different environments, so your therapy can match exactly what your body needs."
            className="mb-9"
          />
          <div className="grid-fit-420 gap-5">
            {spaces.map((s) => (
              <Link
                key={s.title}
                href="/facilities"
                className="group flex flex-col gap-2 text-ink"
              >
                <Photo
                  src={s.image}
                  alt={s.alt}
                  sizes="(min-width: 960px) 560px, 100vw"
                  className="mb-2 aspect-[3/2] rounded-[20px]"
                />
                <h3 className="text-[22px] font-semibold group-hover:text-teal-dark">
                  {s.title}
                </h3>
                <p className="leading-[1.55] text-muted">{s.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-y bg-sand-2">
        <div className="wrap">
          <h2 className="h2 mb-9">What our patients say</h2>
          <div className="grid-fit-300 gap-4">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="flex flex-col justify-between gap-[18px] rounded-[18px] bg-white p-7"
              >
                <blockquote className="font-display text-[22px] leading-[1.3] text-ink">
                  “{t.quote}”
                </blockquote>
                <figcaption className="font-semibold text-teal">
                  — {t.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Team teaser */}
      <section className="section-y">
        <div className="wrap grid-fit-400 items-center gap-split">
          <div className="flex flex-col gap-4">
            <h2 className="h2">The humans behind the exceptional care.</h2>
            <p className="text-[17px] leading-[1.55] text-muted">
              All of our physical therapists are licensed by the State of
              Arizona and are actively involved in your program throughout the
              course of treatment.
            </p>
            <Link href="/team" className="text-link self-start">
              Meet our team →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {teamTeaser.map((p) => (
              <div key={p.name}>
                <Photo
                  src={p.image}
                  alt={p.alt}
                  sizes="(min-width: 900px) 270px, 50vw"
                  className="aspect-[4/5] rounded-[18px]"
                  imgClassName="object-top"
                />
                <div className="mt-3 font-semibold">{p.name}</div>
                <div className="text-sm text-muted-2">{p.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="When it comes to physical therapy, you have a choice."
        subtitle="We truly appreciate you choosing us."
      >
        <Button href="/contact" variant="light" className="px-[26px]">
          Request Appointment
        </Button>
        <Button href={site.phoneHref} variant="outline-light">
          {site.phone}
        </Button>
      </CtaBand>
    </>
  );
}
