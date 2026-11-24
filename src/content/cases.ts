/**
 * The six case studies. Card copy comes from humanbuiltai.work.
 * Home-page card art lives at `/work/<slug>/card.svg` (4:3, simplified from the case page header art).
 * The study `name` is laid over the top of the art as HTML.
 * The interior page content for each study lives in `src/content/case-pages.ts`.
 */
export type Study = {
  slug: string;
  name: string;
  num: string;
  tags: string;
  title: string;
  blurb: string;
};

export const studies: Study[] = [
  {
    slug: "specs",
    name: "Specs",
    num: "01",
    tags: "AI product · Brand systems",
    title: "A brand kit for AI.",
    blurb:
      "My own app turns a small business’s messy logo, PDFs and photos into a kit AI can follow, then art-directs on-brand posts that explain their choices.",
  },
  {
    slug: "aon-horizon",
    name: "Aon / Horizon",
    num: "02",
    tags: "Product design · Data viz · AI",
    title: "Complex data, made explorable.",
    blurb:
      "A climate-risk visualizer rebuilt around the questions people bring to it, with a conversational layer for asking the data.",
  },
  {
    slug: "chipotle-raincheck",
    name: "Chipotle / RAINCHECK",
    num: "03",
    tags: "SMS · Mobile Wallet · Animation",
    title: "A closed door, turned into a free burrito.",
    blurb: "The text-to-Wallet campaign that drew 5.3 million requests in about five hours.",
  },
  {
    slug: "creditninja",
    name: "CreditNinja",
    num: "04",
    tags: "UX · Conversational form",
    title: "A 15-minute form, now under five.",
    blurb: "A loan eligibility flow redesigned as a conversation, with a 40% lift in completion.",
  },
  {
    slug: "sauza-lasso",
    name: "Sauza / Lasso Up With A Cowboy",
    num: "05",
    tags: "Interactive kiosk · Game",
    title: "One throw, two screens.",
    blurb:
      "A phone-to-iPad in-store game that won a Verizon Partner Innovation Award for its use of WebSockets.",
  },
  {
    slug: "verizon-indycar",
    name: "Verizon / IndyCar",
    num: "06",
    tags: "Mobile web · VR",
    title: "Race day, in fans’ hands.",
    blurb:
      "A mobile web and VR activation that lifted engagement with Ways to Win by 124% over the prior year.",
  },
];
