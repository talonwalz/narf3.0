import type { ReactNode } from "react";

// Teal call-to-action band used at the bottom of Home and Services.
export default function CtaBand({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode; // buttons
}) {
  return (
    <section className="bg-teal py-[clamp(48px,6vw,80px)] text-white">
      <div className="wrap flex flex-wrap items-center justify-between gap-7">
        <div className="max-w-[620px]">
          <h2 className="font-display text-[clamp(30px,3.6vw,44px)] leading-[1.08]">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2.5 text-lg text-teal-tint">{subtitle}</p>
          )}
        </div>
        <div className="flex flex-wrap gap-3">{children}</div>
      </div>
    </section>
  );
}
