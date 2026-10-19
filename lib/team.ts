// Therapists & staff grid on /team (the founder has their own feature block).
// A member without `image` renders a striped placeholder portrait; a member
// without `bio` but with `contentNeeded` renders a dashed "content needed" note.
// dan.jpg, dawn.jpg and talon.jpg are in public/images but were commented out
// on the old site — confirm with the clinic before adding them here.
export type TeamMember = {
  name: string;
  role: string;
  image?: string;
  placeholderLabel?: string;
  bio?: string;
  contentNeeded?: string;
  placeholder?: boolean;
};

export const founder = {
  name: "Tarrin Walz, PT, MS",
  role: "Physical Therapist & Owner",
  image: "/images/TarrinNew.jpg",
  eyebrow: "Founded 2000 · Cottonwood",
  bio: [
    "Tarrin graduated from Utah State University with a B.S. in Exercise Science (1994) and an M.S. in Exercise Physiology with an emphasis in Cardiac Rehabilitation (1997), then received his M.S. in Physical Therapy from Regis University in Denver in 1999. Shortly after moving his family to Cottonwood in 2000, he opened Northern Arizona Rehabilitation & Fitness with business partner Philip A. Sauer, RPT.",
    "He has experience in sports medicine, orthopedics, athletic training and aquatic rehabilitation, is a proud supporter of Mingus Union H.S. athletics, and stays active in numerous community activities.",
  ],
  tags: [
    "Sports medicine",
    "Orthopedics",
    "Aquatic rehab",
    "APTA member",
    "NSCA member",
  ],
};

export const team: TeamMember[] = [
  {
    name: "Amy Shantz, PT, DPT",
    role: "Physical Therapist",
    image: "/images/AmyNew.jpg",
    contentNeeded: "Content needed: Amy’s bio & specialties",
  },
  {
    name: "Team member",
    role: "Role · add as needed",
    placeholderLabel: "staff portrait",
    placeholder: true,
  },
  {
    name: "Team member",
    role: "Role · add as needed",
    placeholderLabel: "front desk portrait",
    placeholder: true,
  },
];
