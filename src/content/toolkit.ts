/**
 * Toolkit (Section 04): the tools Scott uses, by discipline and by how often.
 * Source: the toolkit on the original site (humanbuiltai.work, v1). Edit here only.
 */
export type Freq = "Daily" | "Regular" | "Familiar";

export type Discipline = { key: string; name: string; tools: [string, Freq][] };

export const FREQS: Freq[] = ["Daily", "Regular", "Familiar"];

export const DISCIPLINES: Discipline[] = [
  {
    key: "ai",
    name: "AI & LLM",
    tools: [["Claude / Claude Code", "Daily"], ["ChatGPT", "Daily"], ["Codex", "Daily"], ["Nano Banana", "Regular"], ["Cursor", "Familiar"], ["Kimi", "Familiar"], ["DeepSeek", "Familiar"]],
  },
  {
    key: "design",
    name: "Design",
    tools: [["Figma (with AI)", "Daily"], ["Framer", "Daily"], ["Webflow", "Daily"], ["Photoshop", "Daily"], ["Illustrator", "Daily"], ["InDesign", "Regular"], ["Sketch", "Regular"], ["Adobe XD", "Regular"], ["Canva", "Regular"], ["Lottie", "Regular"]],
  },
  {
    key: "dev",
    name: "Development",
    tools: [["HTML / CSS", "Daily"], ["TypeScript", "Daily"], ["React.js / Next.js", "Daily"], ["JavaScript", "Regular"], ["GSAP", "Regular"], ["Storybook", "Regular"], ["Sanity Studio", "Regular"], ["three.js / WebGL", "Regular"], ["WordPress", "Regular"], ["Git / GitHub", "Regular"], ["Basic Python", "Familiar"]],
  },
  {
    key: "data",
    name: "Data & APIs",
    tools: [["OpenAI API", "Daily"], ["Anthropic API", "Daily"], ["Postman", "Daily"], ["REST / JSON / webhooks", "Daily"], ["Supabase", "Regular"], ["Sanity Content Lake", "Regular"], ["MySQL", "Familiar"]],
  },
  {
    key: "auto",
    name: "Automation & CRM",
    tools: [["n8n", "Daily"], ["Zapier", "Regular"], ["Composio", "Regular"], ["Gumloop", "Regular"], ["HubSpot", "Familiar"]],
  },
  {
    key: "analytics",
    name: "Analytics",
    tools: [["GA4 / Google Analytics", "Daily"], ["Google Tag Manager", "Daily"]],
  },
];
