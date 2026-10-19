"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Escape closes the menu.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

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
            className="inline-flex min-h-11 items-center gap-2.5 rounded-full border-[1.5px] border-ink bg-white py-2.5 pl-4 pr-[18px] text-[15px] font-semibold text-ink nav:hidden"
          >
            <span aria-hidden className="relative block h-3 w-4">
              {[
                menuOpen ? "top-[5px] rotate-45" : "top-0",
                menuOpen ? "top-[5px] opacity-0" : "top-[5px]",
                menuOpen ? "top-[5px] -rotate-45" : "top-[10px]",
              ].map((pos, i) => (
                <span
                  key={i}
                  className={`absolute left-0 h-[2px] w-4 rounded-full bg-ink transition-all duration-300 ease-out motion-reduce:transition-none ${pos}`}
                />
              ))}
            </span>
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>

        {/* Always rendered so it can animate; inert hides it from keyboard/AT when closed. */}
        <div
          id="mobile-menu"
          inert={!menuOpen}
          className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none nav:hidden ${
            menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <nav
              aria-label="Main"
              className={`flex max-h-[calc(100dvh-140px)] flex-col overflow-y-auto border-t border-sand-line bg-white px-5 pb-5 pt-2 transition-opacity duration-300 motion-reduce:transition-none ${
                menuOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              {navLinks.map((l, i) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  style={{ transitionDelay: menuOpen ? `${80 + i * 40}ms` : "0ms" }}
                  className={`flex items-center justify-between border-b border-sand-2 py-3.5 font-display text-xl text-ink transition-[opacity,translate] duration-300 ease-out motion-reduce:transition-none ${
                    menuOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
                  }`}
                >
                  {l.label}
                  {isActive(l.href) && (
                    <span aria-hidden className="h-2 w-2 rounded-full bg-orange-bright" />
                  )}
                </Link>
              ))}
              <div
                style={{ transitionDelay: menuOpen ? `${80 + navLinks.length * 40}ms` : "0ms" }}
                className={`mt-4 text-sm leading-normal text-muted-2 transition-opacity duration-300 motion-reduce:transition-none ${
                  menuOpen ? "opacity-100" : "opacity-0"
                }`}
              >
                {site.address.oneLine}
                <br />
                {site.hoursShort} · Closed Sat – Mon
              </div>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
}
