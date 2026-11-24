/**
 * About me (Section 05). All copy for the bento lives here so it can be edited without touching layout.
 * Lines marked PLACEHOLDER are stand-ins for Scott to replace.
 */
import { studies } from "./cases";

export const about = {
  name: "Scott Galetto",
  facts: ["Chicago", "AI-fluent design technologist", "Building Specs"],
  // PLACEHOLDER bio: built from the hero line; swap for Scott's own words.
  bio: "I help teams figure out what to build, then bring it to life through design, prototyping and AI. Twelve years of campaigns, products and data tools taught me the same lesson: the first draft is cheap, the judgment after it is the job.",
  photo: { src: "", alt: "Portrait of Scott Galetto" }, // set src (e.g. /scott.jpg in /public) when the photo is ready
};

/** Timeline rows come straight from the case studies, newest first. */
export const timeline = [...studies]
  .sort((a, b) => Number(b.year) - Number(a.year))
  .map((s) => ({ slug: s.slug, name: s.name.split(" / ")[0], year: s.year, tags: s.tags, title: s.title }));

/** "Currently" card: one chip per tab. PLACEHOLDER items. */
export const currently = [
  { key: "building", label: "Building", title: "Specs", note: "Brand kits an AI can read. Early beta." },
  { key: "reading", label: "Reading", title: "Book title here", note: "Author name" },
  { key: "learning", label: "Learning", title: "Agent design", note: "Small tools that hand judgment back to people." },
];

/** "How I work" slider stops, from explore to ship. PLACEHOLDER lines. */
export const workStops = [
  { at: "Explore", line: "Start with the question people actually bring, not the brief." },
  { at: "Sketch", line: "Ten rough directions before one careful one." },
  { at: "Prototype", line: "Make it real enough to argue with by Friday." },
  { at: "Refine", line: "Let the AI draft. Spend the time on the last 10%." },
  { at: "Ship", line: "Put it in front of people, then keep listening." },
];

/** Toolkit chips. PLACEHOLDER list; tap one to see what it's for. */
export const toolkit = [
  { name: "Figma", use: "Layout, systems, quick flows" },
  { name: "Claude", use: "Drafting, critique, agent work" },
  { name: "Next.js", use: "Prototypes that ship" },
  { name: "GSAP", use: "Scroll stories and motion" },
  { name: "After Effects", use: "Animation and campaign spots" },
  { name: "Blender", use: "Objects, lighting, small worlds" },
];
