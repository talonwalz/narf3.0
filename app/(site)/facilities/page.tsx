import { pageMetadata } from "@/lib/metadata";
import Button from "@/components/Button";
import Eyebrow from "@/components/Eyebrow";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";

export const metadata = pageMetadata({
  title: "Therapy Gym & Aquatic Pool",
  description:
    "Tour the NARF clinic in Cottonwood, AZ — a fully equipped therapy gym and an aquatic therapy pool under one roof.",
});

const copyCls = "text-[17px] leading-[1.6] text-muted";

export default function Facilities() {
  return (
    <>
      <PageHero
        eyebrow="Our clinic"
        title="A gym and a pool, under one roof."
        titleClassName="max-w-[860px]"
        className="pb-[clamp(32px,4vw,48px)]"
      />

      <section className="section-b">
        <div className="wrap">
          <video
            src="/videos/NarfClinic.mp4"
            poster="/images/narfBuilding.jpeg"
            muted
            loop
            autoPlay
            playsInline
            controls
            preload="metadata"
            aria-label="Video tour of the NARF clinic"
            className="block aspect-video w-full rounded-3xl bg-deep object-cover"
          />
        </div>
      </section>

      <section className="section-y bg-white">
        <div className="wrap grid-fit-420 items-center gap-split">
          <Photo
            src="/images/gymImg.jpeg"
            alt="Therapy gym"
            sizes="(min-width: 980px) 540px, 100vw"
            className="aspect-[4/3] rounded-[22px]"
          />
          <div className="flex flex-col gap-4">
            <Eyebrow tone="orange">The gym</Eyebrow>
            <h2 className="h2">Equipment for every stage of recovery.</h2>
            <p className={copyCls}>
              We offer many different machines and fitness equipment to ensure
              we have whatever is needed to get you back to a higher quality of
              life — from your first session to your last.
            </p>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="wrap grid-fit-420 items-center gap-split">
          <div className="flex flex-col gap-4">
            <Eyebrow tone="orange">The pool</Eyebrow>
            <h2 className="h2">Aquatic therapy, gentler on your joints.</h2>
            <p className={copyCls}>
              For some, aquatic therapy can be a whole lot more beneficial to a
              better recovery. Water supports your body so you can move sooner,
              with less pain.
            </p>
          </div>
          <Photo
            src="/images/poolImg.jpg"
            alt="Aquatic therapy pool"
            sizes="(min-width: 980px) 540px, 100vw"
            className="aspect-[4/3] rounded-[22px]"
          />
        </div>
      </section>

      <section className="section-y bg-deep text-white">
        <div className="mx-auto flex max-w-[880px] flex-col gap-5 px-[clamp(20px,4vw,40px)]">
          <Eyebrow tone="dark">Our mission</Eyebrow>
          <p className="pull-quote">
            To promote, enhance, and facilitate the quality of life and the
            recovery of normal movement for our patients through skilled
            therapeutic intervention.
          </p>
          <Button href="/contact" variant="light" className="mt-2 self-start">
            Request Appointment
          </Button>
        </div>
      </section>
    </>
  );
}
