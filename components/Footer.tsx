import Image from "next/image";
import Link from "next/link";
import { navLinks, site } from "@/lib/site";

const headingCls = "mb-1 font-semibold text-white";

export default function Footer() {
  return (
    // Bottom padding below the nav breakpoint keeps content clear of MobileActionBar.
    <footer className="bg-deep text-[15px] leading-[1.55] text-deep-tint max-nav:pb-[72px]">
      <div className="wrap grid-fit-210 gap-9 pb-7 pt-[clamp(48px,6vw,72px)]">
        <div className="flex flex-col gap-4">
          <div className="self-start rounded-xl bg-white px-3.5 py-2.5">
            <Image
              src="/images/logoIcon.png"
              alt="NARF"
              width={900}
              height={270}
              sizes="150px"
              className="block h-11 w-auto"
            />
          </div>
          <p className="max-w-[260px]">
            Empowering our community one person at a time — since 2000.
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className={headingCls}>Visit</div>
          <span>
            {site.address.street}.
            <br />
            {site.address.city}, {site.address.state} {site.address.zip}
          </span>
          <a href={site.phoneHref} className="font-semibold text-white">
            {site.phone}
          </a>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className={headingCls}>Hours</div>
          <span>
            Tuesday – Friday
            <br />
            7AM – 6PM
          </span>
          <span className="text-closed">Closed Saturday – Monday</span>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className={headingCls}>Explore</div>
          {navLinks.slice(1).map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-white">
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="wrap flex flex-wrap items-center gap-4 border-t border-deep-tint/[0.18] pb-7 pt-5 text-[13px]">
        <span>© 2026 {site.legalName}</span>
        <span className="flex-1" />
        <a
          href={site.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:underline"
        >
          Facebook
        </a>
        <a
          href={site.googleReviews}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:underline"
        >
          Google Reviews
        </a>
      </div>
    </footer>
  );
}
