/**
 * The six case studies. Card copy comes from humanbuiltai.work.
 * `art` is the home-page thumbnail base path: `${art}-640.webp` and `${art}-1024.webp`, 2:1. Studies without it show a placeholder.
 * The interior page content for each study lives in `src/content/case-pages.ts`.
 */
export type Study = {
  slug: string;
  name: string;
  num: string;
  year: string;
  tags: string;
  title: string;
  blurb: string;
  art?: string;
};

export const studies: Study[] = [
  {
    slug: "specs",
    name: "Specs",
    num: "01",
    year: "2026",
    tags: "AI product · Brand systems",
    title: "A brand kit for AI.",
    blurb:
      "My own app turns a small business’s messy logo, PDFs and photos into a kit AI can follow, then art-directs on-brand posts that explain their choices.",
  },
  {
    slug: "aon-horizon",
    name: "Aon / Horizon",
    num: "02",
    year: "2018",
    tags: "Product design · Data viz · AI",
    title: "Complex data, made explorable.",
    blurb:
      "A climate-risk visualizer rebuilt around the questions people bring to it, with a conversational layer for asking the data.",
    art: "/work/aon-horizon/thumb",
  },
  {
    slug: "chipotle-raincheck",
    name: "Chipotle / RAINCHECK",
    num: "03",
    year: "2016",
    tags: "SMS · Mobile Wallet · Animation",
    title: "A closed door, turned into a free burrito.",
    blurb: "The text-to-Wallet campaign that drew 5.3 million requests in about five hours.",
    art: "/work/chipotle-raincheck/thumb",
  },
  {
    slug: "creditninja",
    name: "CreditNinja",
    num: "04",
    year: "2021",
    tags: "UX · Conversational form",
    title: "A 15-minute form, now under five.",
    blurb: "A loan eligibility flow redesigned as a conversation, with a 40% lift in completion.",
    art: "/work/creditninja/thumb",
  },
  {
    slug: "sauza-lasso",
    name: "Sauza / Lasso Up With A Cowboy",
    num: "05",
    year: "2014",
    tags: "Interactive kiosk · Game",
    title: "One throw, two screens.",
    blurb:
      "A phone-to-iPad in-store game that won a Verizon Partner Innovation Award for its use of WebSockets.",
  },
  {
    slug: "verizon-indycar",
    name: "Verizon / IndyCar",
    num: "06",
    year: "2014",
    tags: "Mobile web · VR",
    title: "Race day, in fans’ hands.",
    blurb:
      "A mobile web and VR activation that lifted engagement with Ways to Win by 124% over the prior year.",
  },
];
