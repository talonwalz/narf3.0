import Image from "next/image";

// Cover-fit photo in a fixed aspect-ratio frame.
export default function Photo({
  src,
  alt,
  sizes,
  className = "",
  imgClassName = "",
  preload = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string; // aspect ratio + radius go here
  imgClassName?: string;
  preload?: boolean;
}) {
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        preload={preload}
        className={`object-cover ${imgClassName}`}
      />
    </div>
  );
}
