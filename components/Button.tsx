import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "light" | "outline-light";
type Size = "md" | "sm";

const base =
  "inline-flex items-center justify-center rounded-full font-semibold text-base whitespace-nowrap transition-colors";

const variants: Record<Variant, string> = {
  primary: "bg-orange text-white hover:bg-orange-hover",
  outline: "border-[1.5px] border-ink text-ink hover:bg-ink hover:text-white",
  light: "bg-white text-deep hover:bg-deep-tint",
  "outline-light":
    "border-[1.5px] border-white text-white hover:bg-white hover:text-deep",
};

const sizes: Record<Size, Record<Variant, string>> = {
  md: {
    primary: "min-h-[50px] px-[26px]",
    outline: "min-h-[50px] px-6",
    light: "min-h-[50px] px-6",
    "outline-light": "min-h-[50px] px-6",
  },
  sm: {
    primary: "min-h-12 px-5",
    outline: "min-h-12 px-[22px]",
    light: "min-h-12 px-5",
    "outline-light": "min-h-12 px-5",
  },
};

type Props = {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export default function Button({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
}: Props) {
  const cls = `${base} ${variants[variant]} ${sizes[size][variant]} ${className}`;

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={cls}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
