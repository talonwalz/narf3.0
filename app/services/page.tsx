import type { Metadata } from "next";
import Button from "@/components/Button";
import ConditionFilter from "@/components/ConditionFilter";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services & Conditions We Treat",
  description:
    "Physical therapy for back, neck, shoulder, hip, knee, foot and ankle pain, post-surgical rehab, sports and work injuries, balance disorders and more — in our gym and pool in Cottonwood, AZ.",
};

const titleCls = "text-[21px] font-semibold";
const textCls = "leading-[1.55] text-muted";

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="What we treat, and how we treat it."
        titleClassName="max-w-[800px]"
        lead="We specialize in injuries to the spine, shoulder, elbow, wrist and hand, hip, knee, and foot and ankle — for athletes and non-athletes alike, ages 5 to 100."
      />

      <section className="section-b">
        <div className="wrap">
          <ConditionFilter />
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-[18px] bg-sand-2 px-7 py-6">
            <div>
              <div className="text-[19px] font-semibold">
                Don’t see your condition?
              </div>
              <div className="mt-1 text-muted">
                Give us a call — chances are we’ve treated it.
              </div>
            </div>
            <Button href={site.phoneHref} variant="outline" size="sm">
              Call {site.phone}
            </Button>
          </div>
        </div>
      </section>

      <section className="section-y bg-white">
        <div className="wrap">
          <h2 className="h2 mb-10">How we treat</h2>
          <div className="grid-fit-320 gap-6">
            <div className="flex flex-col gap-3.5">
              <Photo
                src="/images/gymImg.jpeg"
                alt="Therapy gym"
                sizes="(min-width: 1080px) 360px, 100vw"
                className="aspect-[4/3] rounded-[18px]"
              />
              <h3 className={titleCls}>Gym-based therapy</h3>
              <p className={textCls}>
                Strength, mobility and conditioning on a full floor of machines
                and fitness equipment.
              </p>
            </div>
            <div className="flex flex-col gap-3.5">
              <Photo
                src="/images/poolImg.jpg"
                alt="Aquatic therapy pool"
                sizes="(min-width: 1080px) 360px, 100vw"
                className="aspect-[4/3] rounded-[18px]"
              />
              <h3 className={titleCls}>Aquatic therapy</h3>
              <p className={textCls}>
                Lower-impact movement in our pool — often a better path to
                recovery for joints and post-surgical patients.
              </p>
            </div>
            <div className="flex flex-col gap-3.5">
              <div className="flex aspect-[4/3] w-full flex-col justify-end rounded-[18px] bg-deep p-7 text-white">
                <div className="font-display text-[30px] leading-[1.1]">
                  Licensed PTs, involved every visit.
                </div>
              </div>
              <h3 className={titleCls}>An individualized plan</h3>
              <p className={textCls}>
                A comprehensive initial exam, then a plan built for you and
                performed under close supervision.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand title="Ready to get back to moving?">
        <Button href="/contact" variant="light" className="px-[26px]">
          Request Appointment
        </Button>
        <Button href="/patient-info" variant="outline-light">
          New patient info
        </Button>
      </CtaBand>
    </>
  );
}
