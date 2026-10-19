// `quote` is the short excerpt shown on the home page; `full` is the complete
// review carried over from the old site's carousel.
export type Testimonial = { name: string; quote: string; full: string };

export const testimonials: Testimonial[] = [
  {
    name: "Stacy",
    quote:
      "All of the staff and therapists genuinely care about their clients. When you walk in, you feel welcomed and valued.",
    full: "I cannot say enough about the exemplary quality of physical therapy I received at Northern Arizona Rehabilitation and Fitness! All of the staff and therapists genuinely care about their clients. When you walk in, you feel welcomed and valued. There is no one-size-fits-all plan of care there.",
  },
  {
    name: "Johnny",
    quote: "I had gone there years ago… I finally have relief and healing at NARF!",
    full: "These men and women are awesome! I had gone there years ago and when I needed rehab again a few years back I chose a different rehab for help. What a mistake. I finally have relief and healing at NARF!",
  },
  {
    name: "Carol",
    quote:
      "I find the staff knowledgeable, compassionate and professional… always. I highly recommend them.",
    full: "I have been going to them for the past 4 months for shoulder issues. I find the staff knowledgeable, compassionate and professional... always. I highly recommend them.",
  },
];
