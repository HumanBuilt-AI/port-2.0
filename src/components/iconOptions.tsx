/**
 * Candidate drawings for the approach, about and contact icons, in the same
 * single-weight style as the rest of the set (56 × 72 viewBox, .ln strokes).
 * Pick one per icon with ICON_CHOICE; every option stays in the sprite as
 * #i-<name>-<letter> so they can be compared side by side.
 */
import type { ReactNode } from "react";

export const ICON_OPTIONS: Record<"approach" | "about" | "contact", Record<"a" | "b" | "c", { note: string; draw: ReactNode }>> = {
  approach: {
    a: {
      note: "Flow: sketch, frame, ship, joined by one path",
      draw: (<>
        <circle cx="12" cy="18" r="6" />
        <rect x="22" y="30" width="12" height="12" rx="2" />
        <circle cx="44" cy="54" r="6" /><circle cx="44" cy="54" r="1.6" className="solid" />
        <path d="M12 24 V36 H22 M34 36 H44 V48" />
      </>),
    },
    b: {
      note: "Gauge: a dial with ticks and one needle (judgment)",
      draw: (<>
        <path d="M6 52 A22 22 0 0 1 50 52" />
        <path d="M8.9 41 L12.4 43 M17 32.9 L19 36.4 M28 30 V34 M39 32.9 L37 36.4 M47.1 41 L43.6 43" />
        <path d="M28 52 L38 36" />
        <circle cx="28" cy="52" r="3" />
        <path d="M4 60 H52" />
      </>),
    },
    c: {
      note: "Pencil and cursor: hand and machine",
      draw: (<>
        <path d="M10 54 L38 14 L44 18 L16 58 Z" />
        <path d="M10 54 L8 62 L16 58 M34 20 L40 24" />
        <path d="M34 40 V62 L39 57 L43 65 L46 63.5 L42 56 H49 Z" className="paper" />
      </>),
    },
  },
  about: {
    a: {
      note: "Badge: an ID card with a portrait",
      draw: (<>
        <rect x="8" y="12" width="40" height="52" rx="5" />
        <path d="M22 19 H34" />
        <circle cx="28" cy="33" r="7" />
        <path d="M17 52 C19 45 23 43 28 43 C33 43 37 45 39 52" />
        <path d="M18 58 H38" />
      </>),
    },
    b: {
      note: "Portrait: a head and shoulders inside crop marks",
      draw: (<>
        <path d="M6 18 V8 H16 M40 8 H50 V18 M50 54 V64 H40 M16 64 H6 V54" />
        <circle cx="28" cy="29" r="9" />
        <path d="M12 64 C14 50 20 45 28 45 C36 45 42 50 44 64" />
        <circle cx="43" cy="15" r="1.6" className="solid" />
      </>),
    },
    c: {
      note: "Fingerprint: human-built",
      draw: (<>
        <path d="M12 44 C10 32 16 18 30 16 C40 15 47 22 48 32" />
        <path d="M18 54 C14 46 14 32 22 26 C30 20 40 24 42 34 C43 40 42 46 40 50" />
        <path d="M24 57 C20 48 20 36 26 32 C32 28 37 32 37 38 C37 44 35 50 34 55" />
        <path d="M30 57 C27 50 27 42 29 38 C30 36 32 37 32 40 C32 46 31 52 31 56" />
      </>),
    },
  },
  contact: {
    a: {
      note: "Envelope with an @",
      draw: (<>
        <rect x="4" y="18" width="40" height="30" rx="3" />
        <path d="M4 20 L24 36 L44 20" />
        <circle cx="44" cy="52" r="9" className="paper" />
        <circle cx="44" cy="52" r="3.5" />
        <path d="M47.5 52 V54 C47.5 56.5 51 56.5 51 52" />
      </>),
    },
    b: {
      note: "Two speech bubbles, one still typing",
      draw: (<>
        <path d="M8 12 H38 Q42 12 42 16 V34 Q42 38 38 38 H18 L10 45 V38 H8 Q4 38 4 34 V16 Q4 12 8 12 Z" />
        <circle cx="15" cy="25" r="1.6" /><circle cx="23" cy="25" r="1.6" /><circle cx="31" cy="25" r="1.6" />
        <path d="M22 32 H48 Q52 32 52 36 V54 Q52 58 48 58 H46 V65 L39 58 H22 Q18 58 18 54 V36 Q18 32 22 32 Z" className="paper" />
        <path d="M25 42 H45 M25 48 H38" />
      </>),
    },
    c: {
      note: "Paper plane with a dotted trail",
      draw: (<>
        <path d="M4 32 L52 10 L40 56 L28 42 Z" />
        <path d="M52 10 L28 42 V54 L34 48" />
        <path d="M4 50 C10 57 16 59 22 57" strokeDasharray="2 4" />
      </>),
    },
  },
};

/** The option each icon uses on the site. Change a letter to swap it. */
export const ICON_CHOICE = { approach: "b", about: "b", contact: "b" } as const;
