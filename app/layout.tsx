import type { Metadata } from "next";
import { DM_Serif_Display, Instrument_Sans } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MobileActionBar from "@/components/MobileActionBar";
import { CLOSE_HOUR, OPEN_HOUR, hours, site } from "@/lib/site";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
});

const instrumentSans = Instrument_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-instrument-sans",
});

const description =
  "Physical therapy in Cottonwood, Arizona. Skilled, hands-on therapy in our gym and pool, with a plan built around you. Call 928-649-9726.";

export const metadata: Metadata = {
  ...(site.url ? { metadataBase: new URL(site.url) } : {}),
  title: {
    default: `${site.name} | Physical Therapy in Cottonwood, AZ`,
    template: `%s | ${site.name}`,
  },
  description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} | Physical Therapy in Cottonwood, AZ`,
    description,
    images: ["/images/narfBuilding.jpeg"],
  },
};

const pad = (h: number) => `${String(h).padStart(2, "0")}:00`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["MedicalClinic", "LocalBusiness"],
  name: site.name,
  alternateName: site.shortName,
  description,
  ...(site.url
    ? { url: site.url, image: `${site.url}/images/narfBuilding.jpeg` }
    : {}),
  telephone: "+1-928-649-9726",
  medicalSpecialty: "PhysicalTherapy",
  foundingDate: "2000",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.zip,
    addressCountry: "US",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hours.filter((h) => h.open).map((h) => h.name),
      opens: pad(OPEN_HOUR),
      closes: pad(CLOSE_HOUR),
    },
  ],
  sameAs: [site.facebook],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${dmSerif.variable} ${instrumentSans.variable}`}
    >
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileActionBar />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
