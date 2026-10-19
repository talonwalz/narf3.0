import type { ReactNode } from "react";
import Eyebrow from "./Eyebrow";

type Props = {
  title: ReactNode;
  eyebrow?: string;
  eyebrowTone?: "teal" | "orange" | "dark";
  description?: ReactNode;
  className?: string;
};

export default function SectionHeading({
  title,
  eyebrow,
  eyebrowTone,
  description,
  className = "",
}: Props) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {eyebrow && <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow>}
      <h2 className="h2">{title}</h2>
      {description && (
        <p className="max-w-[600px] text-[17px] leading-[1.55] text-muted">
          {description}
        </p>
      )}
    </div>
  );
}
