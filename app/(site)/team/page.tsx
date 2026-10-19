import { pageMetadata } from "@/lib/metadata";
import Button from "@/components/Button";
import Eyebrow from "@/components/Eyebrow";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import { founder, team } from "@/lib/team";

export const metadata = pageMetadata({
  title: "Our Physical Therapists & Team",
  description:
    "Meet the licensed physical therapists and staff at Northern Arizona Rehabilitation & Fitness, serving Cottonwood, AZ since 2000.",
});

export default function Team() {
  return (
    <>
      <PageHero
        eyebrow="Our team"
        title="The humans behind the exceptional care."
        className="pb-[clamp(36px,5vw,56px)]"
      />

      {/* Founder */}
      <section className="section-b">
        <div className="wrap grid-fit-380 items-start gap-split">
          <Photo
            src={founder.image}
            alt={founder.name}
            sizes="(min-width: 900px) 540px, 100vw"
            className="aspect-[4/5] rounded-3xl"
            imgClassName="object-top"
            preload
          />
          <div className="flex flex-col gap-[18px] pt-[clamp(0px,2vw,24px)]">
            <Eyebrow tone="orange">{founder.eyebrow}</Eyebrow>
            <h2 className="font-display text-[clamp(36px,4vw,52px)] leading-[1.02]">
              {founder.name}
            </h2>
            <div className="-mt-2 text-lg font-semibold text-teal">
              {founder.role}
            </div>
            {founder.bio.map((p) => (
              <p key={p} className="text-[17px] leading-[1.65] text-ink-2">
                {p}
              </p>
            ))}
            <ul className="flex flex-wrap gap-2">
              {founder.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-sand-line bg-white px-3.5 py-[7px] text-sm"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Therapists & staff */}
      <section className="section-y bg-white">
        <div className="wrap">
          <h2 className="h2 mb-9">Our therapists &amp; staff</h2>
          <div className="grid-fill-260 gap-6">
            {team.map((m, i) => (
              <div key={i} className="flex flex-col gap-2.5">
                {m.image ? (
                  <Photo
                    src={m.image}
                    alt={m.name}
                    sizes="(min-width: 600px) 360px, 100vw"
                    className="aspect-[4/5] rounded-[18px]"
                    imgClassName="object-top"
                  />
                ) : (
                  <div className="flex aspect-[4/5] w-full items-center justify-center rounded-[18px] bg-[repeating-linear-gradient(135deg,#f3eee5_0_10px,#ece5d8_10px_20px)] p-5 text-center font-mono text-xs text-placeholder">
                    {m.placeholderLabel}
                  </div>
                )}
                <h3
                  className={`mt-1 text-xl font-semibold ${m.placeholder ? "text-placeholder" : ""}`}
                >
                  {m.name}
                </h3>
                <div
                  className={`text-[15px] ${m.placeholder ? "text-placeholder" : "font-semibold text-teal"}`}
                >
                  {m.role}
                </div>
                {m.bio && (
                  <p className="text-[15px] leading-[1.55] text-muted">
                    {m.bio}
                  </p>
                )}
                {!m.bio && m.contentNeeded && (
                  <div className="rounded-xl border-[1.5px] border-dashed border-placeholder-line bg-field p-3 text-sm text-placeholder">
                    {m.contentNeeded}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-y">
        <div className="mx-auto flex max-w-[880px] flex-col gap-5 px-[clamp(20px,4vw,40px)]">
          <Eyebrow>Our mission</Eyebrow>
          <p className="pull-quote">
            “We promise to listen, understand and genuinely care about you and
            your condition — in a friendly, fun and compassionate atmosphere.”
          </p>
        </div>
      </section>

      {/* Careers */}
      <section className="section-b">
        <div className="wrap">
          <div className="grid-fit-380 overflow-hidden rounded-3xl bg-deep text-white">
            <Photo
              src="/images/gymImg.jpeg"
              alt=""
              sizes="(min-width: 860px) 560px, 100vw"
              className="h-full min-h-60"
            />
            <div className="flex flex-col justify-center gap-4 p-[clamp(28px,4vw,52px)]">
              <h2 className="font-display text-[clamp(32px,3.6vw,44px)] leading-[1.05]">
                Join team NARF
              </h2>
              <p className="text-[17px] leading-[1.6] text-deep-tint">
                An enjoyable family atmosphere and rewarding work environment
                where you can reach your individual aspirations and goals.
              </p>
              <Button
                href="/contact?subject=employment"
                variant="light"
                className="self-start"
              >
                Ask about openings
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
