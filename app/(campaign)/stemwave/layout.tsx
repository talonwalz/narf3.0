import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { stemwaveDisclaimer, stemwaveOffer } from "@/lib/stemwave";

// Campaign chrome: logo + call button only, no site nav, so ad/QR visitors
// stay focused on booking.
export default function CampaignLayout({ children }: LayoutProps<"/stemwave">) {
  return (
    <>
      <header className="sticky top-0 z-30 border-b border-sand-line bg-white">
        <div className="wrap flex items-center gap-4 py-2.5">
          <Link href="/" className="block flex-none">
            <Image
              src="/images/logoIcon.png"
              alt="Northern Arizona Rehabilitation and Fitness"
              width={900}
              height={270}
              preload
              sizes="170px"
              className="block h-[clamp(38px,4vw,50px)] w-auto"
            />
          </Link>
          <span className="flex-1" />
          <a
            href={site.phoneHref}
            className="inline-flex min-h-11 items-center whitespace-nowrap rounded-full border-[1.5px] border-deep px-[18px] font-semibold text-deep transition-colors hover:bg-deep hover:text-white"
          >
            Call {site.phone}
          </a>
        </div>
      </header>

      <main>{children}</main>

      <footer className="bg-deep text-[13px] text-deep-tint max-[860px]:pb-[72px]">
        <div className="wrap flex flex-wrap items-center gap-x-6 gap-y-3 py-6">
          <span>© 2026 {site.legalName}</span>
          <span className="flex-1" />
          <Link href="/" className="text-white hover:underline">
            Visit our full website
          </Link>
        </div>
        <p className="wrap pb-5 text-xs leading-normal text-deep-tint-2">
          {stemwaveDisclaimer}
        </p>
      </footer>

      {/* Mobile action bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1.4fr] gap-2.5 border-t border-sand-line bg-white px-3.5 py-2.5 shadow-bar min-[860px]:hidden">
        <a
          href={site.phoneHref}
          className="flex min-h-12 items-center justify-center rounded-full border-[1.5px] border-deep font-semibold text-deep"
        >
          Call
        </a>
        <a
          href="#book"
          className="flex min-h-12 items-center justify-center rounded-full bg-orange font-semibold text-white"
        >
          {stemwaveOffer.ctaShort}
        </a>
      </div>
    </>
  );
}
