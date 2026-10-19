import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Old narf2.0 (CRA) routes -> new routes. /team is unchanged.
  async redirects() {
    return [
      { source: "/treatments", destination: "/services", permanent: true },
      { source: "/new-patient", destination: "/patient-info", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/about", destination: "/facilities", permanent: true },
    ];
  },
};

export default nextConfig;
