import Link from "next/link";
import { stemwaveImages } from "@/lib/stemwave";
import Badge from "./Badge";
import PhotoSlot from "./PhotoSlot";

// Featured card on /services, between the condition grid and "How we treat".
export default function StemWaveFeatureCard() {
  return (
    <section className="section-b">
      <div className="wrap">
        <Link
          href="/services/stemwave"
          className="group grid-fit-380 overflow-hidden rounded-3xl bg-deep text-white"
        >
          <div className="flex flex-col justify-center gap-3.5 p-[clamp(26px,4vw,48px)]">
            <div>
              <Badge>New service</Badge>
            </div>
            <h2 className="font-display text-[clamp(30px,3.6vw,44px)] leading-[1.05]">
              StemWave® therapy
            </h2>
            <p className="max-w-[480px] leading-[1.6] text-deep-tint">
              Focused acoustic waves for plantar fasciitis, tendon pain, tennis
              elbow and other stubborn soft-tissue problems — non-invasive and
              drug-free.
            </p>
            <div className="font-semibold group-hover:underline">
              Learn about StemWave →
            </div>
          </div>
          <PhotoSlot
            src={stemwaveImages.servicesCard}
            alt="StemWave device at NARF"
            label="photo: StemWave device"
            sizes="(min-width: 860px) 560px, 100vw"
            className="h-full min-h-[260px]"
            dark
          />
        </Link>
      </div>
    </section>
  );
}
