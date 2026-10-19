import type { ReactNode } from "react";

const tones = {
  soft: "bg-orange-soft text-ink",
  orange: "bg-orange text-white",
};

export default function Badge({
  tone = "soft",
  className = "",
  children,
}: {
  tone?: keyof typeof tones;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={`rounded-full px-[11px] py-[5px] text-xs font-semibold uppercase tracking-[0.08em] ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
