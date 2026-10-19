import type { ReactNode } from "react";
import Eyebrow from "./Eyebrow";

export default function PageHero({
  eyebrow,
  title,
  lead,
  titleClassName = "max-w-[820px]",
  className = "pb-[clamp(28px,4vw,44px)]",
}: {
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  titleClassName?: string;
  className?: string;
}) {
  return (
    <section className={`pt-[clamp(40px,6vw,80px)] ${className}`}>
      <div className="wrap flex flex-col gap-4">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className={`h1 ${titleClassName}`}>{title}</h1>
        {lead && <p className="lead max-w-[640px]">{lead}</p>}
      </div>
    </section>
  );
}
