import type { Metadata } from "next";
import { site } from "./site";

export const TITLE_SUFFIX = "NARF Physical Therapy";
const OG_IMAGE = "/images/narfBuilding.jpeg";

// Per-page <title>, description and social-share tags. Next.js merges metadata
// shallowly, so each page must set its own openGraph or it inherits Home's.
export function pageMetadata({
  title,
  description,
  absoluteTitle = false,
  noindex = false,
}: {
  title: string;
  description: string;
  absoluteTitle?: boolean;
  noindex?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${TITLE_SUFFIX}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    openGraph: {
      type: "website",
      siteName: site.name,
      title: fullTitle,
      description,
      images: [OG_IMAGE],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
