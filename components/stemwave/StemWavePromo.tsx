import Button from "@/components/Button";
import { STEMWAVE_BOOK_HREF } from "@/lib/stemwave";
import Badge from "./Badge";

// Home page banner, placed directly after the hero.
export default function StemWavePromo() {
  return (
    <section className="pb-[clamp(56px,7vw,88px)]">
      <div className="wrap">
        <div className="grid-fit-360 items-center gap-6 rounded-3xl bg-deep p-[clamp(24px,3.5vw,40px)] text-white">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge>New</Badge>
              <span className="text-sm font-semibold text-deep-tint-2">
                StemWave® acoustic wave therapy
              </span>
            </div>
            <h2 className="font-display text-[clamp(28px,3.2vw,40px)] leading-[1.08]">
              Stubborn tendon or joint pain? Meet StemWave.
            </h2>
            <p className="max-w-[520px] leading-[1.55] text-deep-tint">
              A non-invasive, drug-free treatment that uses focused acoustic
              waves to stimulate healing — now available at NARF.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 min-[800px]:justify-end">
            <Button href={STEMWAVE_BOOK_HREF} className="px-6">
              Book a consultation
            </Button>
            <Button
              href="/services/stemwave"
              variant="outline-light"
              className="px-[22px]"
            >
              Learn more
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
