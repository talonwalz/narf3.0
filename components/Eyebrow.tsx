import type { ReactNode } from "react";

const tones = {
  teal: "text-teal",
  orange: "text-orange",
  dark: "text-deep-tint-2", // for use on deep backgrounds
};

export default function Eyebrow({
  tone = "teal",
  className = "",
  children,
}: {
  tone?: keyof typeof tones;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`text-[13px] font-semibold uppercase tracking-[0.12em] ${tones[tone]} ${className}`}
    >
      {children}
    </div>
  );
}
