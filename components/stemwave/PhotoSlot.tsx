import Photo from "@/components/Photo";

// Shows the photo when one is configured in lib/stemwave.ts, otherwise a
// striped placeholder describing the photo that's needed.
export default function PhotoSlot({
  src,
  alt,
  label,
  sizes,
  className,
  dark = false,
  preload,
}: {
  src?: string;
  alt: string;
  label: string;
  sizes: string;
  className: string; // aspect ratio / min height + radius
  dark?: boolean;
  preload?: boolean;
}) {
  if (src) {
    return (
      <Photo
        src={src}
        alt={alt}
        sizes={sizes}
        className={className}
        preload={preload}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={alt}
      className={`flex w-full items-center justify-center p-5 text-center font-mono text-xs ${
        dark
          ? "bg-[repeating-linear-gradient(135deg,#0a434b_0_12px,#0d4a52_12px_24px)] text-deep-tint-2"
          : "bg-[repeating-linear-gradient(135deg,#f3eee5_0_10px,#ece5d8_10px_20px)] text-placeholder"
      } ${className}`}
    >
      {label}
    </div>
  );
}
