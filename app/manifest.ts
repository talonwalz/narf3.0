import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    start_url: "/",
    display: "browser",
    background_color: "#f7f3ec",
    theme_color: "#003239",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
