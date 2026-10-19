// Single source of truth for clinic details used across the site.

export const site = {
  name: "Northern Arizona Rehabilitation & Fitness",
  legalName: "Northern Arizona Rehabilitation & Fitness, PC",
  shortName: "NARF",
  url: process.env.NEXT_PUBLIC_SITE_URL,
  phone: "928-649-9726",
  phoneHref: "tel:9286499726",
  address: {
    street: "480 S. Willard St",
    city: "Cottonwood",
    state: "AZ",
    zip: "86326",
    oneLine: "480 S. Willard St, Cottonwood, AZ 86326",
  },
  timeZone: "America/Phoenix",
  hoursShort: "Tue – Fri · 7AM – 6PM",
  mapsUrl: "https://maps.google.com/?q=480+S+Willard+St+Cottonwood+AZ+86326",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=480+S+Willard+St+Cottonwood+AZ+86326&output=embed",
  facebook: "https://www.facebook.com/norazrehab",
  googleReviews:
    "https://www.google.com/search?q=northern+arizona+rehab+and+fitness",
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Patient Info", href: "/patient-info" },
  { label: "Our Team", href: "/team" },
  { label: "Facilities", href: "/facilities" },
  { label: "Contact", href: "/contact" },
] as const;

export const OPEN_HOUR = 7;
export const CLOSE_HOUR = 18;

// `day` matches Date.getDay() (0 = Sunday). Listed Monday-first for display.
export const hours = [
  { name: "Monday", day: 1, open: false },
  { name: "Tuesday", day: 2, open: true },
  { name: "Wednesday", day: 3, open: true },
  { name: "Thursday", day: 4, open: true },
  { name: "Friday", day: 5, open: true },
  { name: "Saturday", day: 6, open: false },
  { name: "Sunday", day: 0, open: false },
] as const;

export const OPEN_HOURS_LABEL = "7AM – 6PM";

// EmailJS (same service/template as the old narf2.0 contact form).
export const emailjsConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "gmail",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "template_7nlu4to",
  publicKey:
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "user_xEWI2orbMXf48SBIwv08s",
};
