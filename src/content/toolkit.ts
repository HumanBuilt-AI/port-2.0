/**
 * Toolkit (Section 04): the tools Scott uses, by discipline and by how often.
 * Source: the toolkit on the original site (humanbuiltai.work, v1). Edit here only.
 * One tool = one layer in that discipline's character; daily layers are thickest.
 */
export type Freq = "Daily" | "Regular" | "Familiar";
export type Crew = "antenna" | "beret" | "shades" | "cyclops" | "windup" | "tuft";

export type Discipline = {
  key: string;
  name: string;
  /** body colour of the character */
  color: string;
  /** what makes this character itself (drawn in ToolkitSection) */
  look: Crew;
  tools: [string, Freq][];
};

export const FREQS: Freq[] = ["Daily", "Regular", "Familiar"];

export const DISCIPLINES: Discipline[] = [
  {
    key: "ai",
    name: "AI & LLM",
    color: "#6F93E8",
    look: "antenna",
    tools: [["Claude / Claude Code", "Daily"], ["ChatGPT", "Daily"], ["Codex", "Daily"], ["Nano Banana", "Regular"], ["Cursor", "Familiar"], ["Kimi", "Familiar"], ["DeepSeek", "Familiar"]],
  },
  {
    key: "design",
    name: "Design",
    color: "#FA6A3C",
    look: "beret",
    tools: [["Figma (with AI)", "Daily"], ["Framer", "Daily"], ["Webflow", "Daily"], ["Photoshop", "Daily"], ["Illustrator", "Daily"], ["InDesign", "Regular"], ["Sketch", "Regular"], ["Adobe XD", "Regular"], ["Canva", "Regular"], ["Lottie", "Regular"]],
  },
  {
    key: "dev",
    name: "Development",
    color: "#7DB36A",
    look: "shades",
    tools: [["HTML / CSS", "Daily"], ["TypeScript", "Daily"], ["React.js / Next.js", "Daily"], ["JavaScript", "Regular"], ["GSAP", "Regular"], ["Storybook", "Regular"], ["Sanity Studio", "Regular"], ["three.js / WebGL", "Regular"], ["WordPress", "Regular"], ["Git / GitHub", "Regular"], ["Basic Python", "Familiar"]],
  },
  {
    key: "data",
    name: "Data & APIs",
    color: "#A889E0",
    look: "cyclops",
    tools: [["OpenAI API", "Daily"], ["Anthropic API", "Daily"], ["Postman", "Daily"], ["REST / JSON / webhooks", "Daily"], ["Supabase", "Regular"], ["Sanity Content Lake", "Regular"], ["MySQL", "Familiar"]],
  },
  {
    key: "auto",
    name: "Automation & CRM",
    color: "#FBC23A",
    look: "windup",
    tools: [["n8n", "Daily"], ["Zapier", "Regular"], ["Composio", "Regular"], ["Gumloop", "Regular"], ["HubSpot", "Familiar"]],
  },
  {
    key: "analytics",
    name: "Analytics",
    color: "#F59CC0",
    look: "tuft",
    tools: [["GA4 / Google Analytics", "Daily"], ["Google Tag Manager", "Daily"]],
  },
];
