import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/Button";
import ContactForm from "@/components/ContactForm";
import { HoursTable, OpenStatus } from "@/components/OpenStatus";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Request an Appointment",
  description:
    "Request a physical therapy appointment, ask an insurance question, or get directions to NARF at 480 S. Willard St, Cottonwood, AZ. Open Tuesday–Friday, 7AM–6PM.",
};

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="How can we help?"
        lead="Request an appointment, ask a question about insurance, or ask about employment opportunities."
      />

      <section className="section-b">
        <div className="wrap grid-fit-400 items-start gap-5">
          <div className="rounded-[22px] border border-sand-line-2 bg-white p-[clamp(22px,3vw,36px)]">
            <ContactForm />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-[18px] rounded-[22px] bg-deep p-[clamp(22px,3vw,32px)] text-white">
              <OpenStatus />
              <address className="font-display text-[28px] not-italic leading-[1.15]">
                {site.address.street}.
                <br />
                {site.address.city}, {site.address.state} {site.address.zip}
              </address>
              <div className="flex flex-wrap gap-2.5">
                <Button href={site.phoneHref} variant="light" size="sm">
                  Call {site.phone}
                </Button>
                <Button href={site.mapsUrl} variant="outline-light" size="sm">
                  Directions
                </Button>
              </div>
              <HoursTable />
            </div>

            <div className="overflow-hidden rounded-[22px] border border-sand-line-2 bg-sand-2">
              <iframe
                title="Map to NARF"
                src={site.mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-60 w-full border-0"
              />
            </div>

            {/* TODO(clinic): confirm parking copy. */}
            <div className="flex items-center gap-3.5 rounded-[22px] border border-sand-line-2 bg-white p-3">
              <Image
                src="/images/narfBuilding.jpeg"
                alt="NARF building"
                width={220}
                height={160}
                className="h-20 w-[110px] flex-none rounded-xl object-cover"
              />
              <div className="text-[15px] leading-[1.45]">
                <b>Look for the stone columns.</b>
                <br />
                <span className="text-muted-2">Parking is right out front.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
