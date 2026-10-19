// StemWave® acoustic wave therapy content, shared by /services/stemwave,
// the /stemwave campaign page, and the Home/Services promos.
// TODO(clinic): items marked [confirm] must be approved before launch.
import type { FaqItem } from "./faq";

export const stemwaveOffer = {
  show: true,
  text: "Introductory offer: free 15-minute StemWave consultation", // [confirm]
  cta: "Book a StemWave consultation",
  ctaShort: "Book StemWave",
};

// Campaign landing page anchor for the lead form.
export const STEMWAVE_BOOK_HREF = "/stemwave#book";

// TODO(clinic): real photos of NARF's StemWave unit. Drop files into
// public/images/stemwave/ and set the paths here; until then a placeholder shows.
export const stemwaveImages: {
  serviceHero?: string;
  device?: string;
  servicesCard?: string;
} = {};

export const benefits = [
  { title: "Non-invasive", text: "No needles, no incisions — the device works from the surface of the skin." },
  { title: "Drug-free", text: "An option for people who want to avoid relying on medication or injections." },
  { title: "Quick sessions", text: "Treatment takes just minutes and fits alongside your regular therapy visit." },
  { title: "No downtime", text: "Most people go right back to their normal day afterwards." },
];

export const campaignBullets = [
  "Non-invasive",
  "No medication",
  "No downtime",
  "Performed by a licensed PT",
];

// [confirm] session/plan wording
const stepsBase = [
  { title: "Consultation", text: "We review your history and goals and make sure StemWave is a good fit." },
  { title: "Mapping", text: "Your therapist uses the device to pinpoint the most sensitive areas." },
  { title: "Treatment", text: "Focused acoustic waves are delivered to the area — usually just a few minutes." },
];

export const serviceSteps = [
  ...stepsBase,
  { title: "A series, not a one-off", text: "Best results come from a series of sessions combined with exercise." },
];

export const campaignSteps = [
  ...stepsBase,
  { title: "Your plan", text: "A series of sessions, combined with exercise in our gym or pool." },
];

// [confirm] condition list matches what NARF will actually treat
export const stemwaveConditions = [
  { area: "Foot", short: "Plantar fasciitis", name: "Plantar fasciitis & heel pain" },
  { area: "Ankle", short: "Achilles tendinopathy", name: "Achilles tendinopathy" },
  { area: "Knee", short: "Patellar tendinopathy", name: "Patellar tendinopathy & knee pain" },
  { area: "Shoulder", short: "Rotator cuff tendinopathy", name: "Rotator cuff tendinopathy" },
  { area: "Elbow", short: "Tennis & golfer’s elbow", name: "Tennis & golfer’s elbow" },
  { area: "Hip", short: "Hip & trochanteric pain", name: "Hip & trochanteric pain" },
  { area: "Back", short: "Low back soft-tissue pain", name: "Low back soft-tissue pain" },
  { area: "Joints", short: "Arthritic joint pain", name: "Arthritic joint pain" },
];

export const painAreas = [
  "Foot & heel",
  "Knee",
  "Shoulder",
  "Elbow",
  "Hip",
  "Low back",
  "Other",
];

export const stemwaveFaq: FaqItem[] = [
  {
    question: "Does it hurt?",
    answer: "Most patients describe a tapping or pulsing sensation. Your therapist adjusts the intensity to keep you comfortable.",
  },
  {
    question: "How long is a session?",
    answer: "Treatment itself usually takes just a few minutes, so it fits easily alongside your regular therapy visit.",
  },
  {
    question: "How many sessions will I need?",
    answer: "It depends on your condition. Some people feel a difference early, but StemWave works best as a series — your therapist will recommend a plan after your consultation.",
  },
  {
    // [confirm] placeholder — replace with the real pricing/coverage policy
    question: "Is it covered by insurance?",
    answer: "Acoustic wave therapy is often not covered by insurance. Call us and we’ll walk you through pricing and packages.",
  },
  {
    // [confirm] contraindications must be reviewed by a PT
    question: "Who shouldn’t have StemWave?",
    answer: "It isn’t appropriate for everyone — for example during pregnancy or over certain implants or conditions. We’ll review your history before treatment.",
  },
];

export const stemwaveDisclaimer =
  "StemWave is not right for everyone. Results vary. Your physical therapist will determine whether it’s appropriate for your condition.";
