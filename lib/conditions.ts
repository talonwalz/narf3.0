export const CATEGORIES = [
  "Spine",
  "Upper body",
  "Lower body",
  "Injury & surgery",
  "Whole body",
] as const;

export type Category = (typeof CATEGORIES)[number];
export type CategoryFilter = "All" | Category;

export const FILTERS: CategoryFilter[] = ["All", ...CATEGORIES];

// Value used in the /services?area= query param.
export const AREA_SLUGS: Record<Category, string> = {
  Spine: "spine",
  "Upper body": "upper-body",
  "Lower body": "lower-body",
  "Injury & surgery": "injury-surgery",
  "Whole body": "whole-body",
};

export function categoryFromArea(area: string | null): CategoryFilter {
  return CATEGORIES.find((c) => AREA_SLUGS[c] === area) ?? "All";
}

export type Condition = {
  category: Category;
  name: string;
  description: string;
};

export const CONDITIONS: Condition[] = [
  { category: "Spine", name: "Sciatica & Back Pain", description: "Physical discomfort anywhere on the spine or back, ranging from mild to disabling, or pain that radiates along the path of the sciatic nerve." },
  { category: "Spine", name: "Neck Pain", description: "Pain in the neck and shoulder that varies in intensity, and may feel achy or like an electric shock from the neck to the arm." },
  { category: "Upper body", name: "Shoulder Pain", description: "Discomfort of the shoulder, including the joint itself or the muscles, tendons, and ligaments that support it." },
  { category: "Upper body", name: "Elbow, Wrist & Hand Pain", description: "Fractures, sprains, and repetitive stress injuries such as tennis elbow and carpal tunnel syndrome." },
  { category: "Lower body", name: "Hip Pain", description: "Physical discomfort in the hip, which varies from mild to severe." },
  { category: "Lower body", name: "Knee Pain", description: "Pain in or around the knee affecting the joint itself or the soft tissue around it." },
  { category: "Lower body", name: "Foot & Ankle Pain", description: "Discomfort in the ankle area, often including the joint or the Achilles tendon." },
  { category: "Injury & surgery", name: "Post-Surgical Rehab", description: "Rebuild lost muscle from atrophy, retrain the body, and help control post-surgical pain." },
  { category: "Injury & surgery", name: "Sports Injury", description: "Injuries during exercise or sport. Children are particularly at risk, but adults get them too." },
  { category: "Injury & surgery", name: "Work Injury", description: "Slips, trips and falls, overexertion, and contact with equipment." },
  { category: "Whole body", name: "Balance & Gait Disorders", description: "Abnormal movements impacting the way you walk and run, which can become exacerbated with age." },
  { category: "Whole body", name: "Arthritis", description: "Joint inflammation causing pain and stiffness that can worsen with age." },
  { category: "Whole body", name: "Chronic Pain", description: "Long-standing pain that persists beyond the usual recovery period or accompanies a chronic condition." },
  { category: "Whole body", name: "Fibromyalgia", description: "Widespread pain, sleep problems, fatigue, and often emotional and mental distress." },
  { category: "Whole body", name: "General Weakness", description: "Difficulty moving part of the body properly, which can quickly result in more serious injuries." },
];

// "Where does it hurt?" chips on the home hero -> preselected filter on /services.
export const BODY_AREAS: { label: string; category: Category }[] = [
  { label: "Back", category: "Spine" },
  { label: "Neck", category: "Spine" },
  { label: "Shoulder", category: "Upper body" },
  { label: "Hip", category: "Lower body" },
  { label: "Knee", category: "Lower body" },
  { label: "Foot & ankle", category: "Lower body" },
  { label: "Hand & wrist", category: "Upper body" },
];
