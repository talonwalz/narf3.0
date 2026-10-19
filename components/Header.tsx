"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks, site } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <div className="sticky top-0 z-30">
      {/* Utility bar (desktop only) */}
      <div className="hidden bg-deep text-[13px] text-deep-tint nav:block">
        <div className="wrap flex items-center gap-7 py-2">
          <span>{site.address.oneLine}</span>
          <span>{site.hoursShort}</span>
          <span className="flex-1" />
          <a href={site.phoneHref} className="font-semibold text-white">
            Call {site.phone}
          </a>
        </div>
      </div>

      <header className="border-b border-sand-line bg-white/[0.97]">
        <div className="wrap flex items-center gap-6 py-2.5">
          <Link
            href="/"
            className="block flex-none"
            onClick={() => setMenuOpen(false)}
          >
            <Image
              src="/images/logoIcon.png"
              alt="Northern Arizona Rehabilitation and Fitness"
              width={900}
              height={270}
              preload
              sizes="180px"
              className="block h-[clamp(40px,4.4vw,54px)] w-auto"
            />
          </Link>
          <span className="flex-1" />

          <nav className="hidden items-center gap-0.5 text-[15px] nav:flex">
            {navLinks.map((l) => {
              const active = isActive(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`whitespace-nowrap border-b-2 px-[11px] py-2 ${
                    active
                      ? "border-orange-bright font-semibold text-deep"
                      : "border-transparent text-ink-2 hover:text-teal"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
          <Link
            href="/contact"
            className="hidden whitespace-nowrap rounded-full bg-orange px-5 py-3 text-[15px] font-semibold leading-none text-white transition-colors hover:bg-orange-hover nav:block"
          >
            Request Appointment
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="min-h-11 rounded-full border-[1.5px] border-ink bg-white px-[18px] py-2.5 text-[15px] font-semibold text-ink nav:hidden"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>

        {menuOpen && (
          <nav
            id="mobile-menu"
            className="flex max-h-[calc(100dvh-140px)] flex-col overflow-y-auto border-t border-sand-line bg-white px-5 pb-5 pt-2 nav:hidden"
          >
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                aria-current={isActive(l.href) ? "page" : undefined}
                className="border-b border-sand-2 py-3.5 font-display text-xl text-ink"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-4 text-sm leading-normal text-muted-2">
              {site.address.oneLine}
              <br />
              {site.hoursShort} · Closed Sat – Mon
            </div>
          </nav>
        )}
      </header>
    </div>
  );
}
