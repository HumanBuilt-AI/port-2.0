/**
 * About me (Section 05): eight cards about Scott's life, not his work.
 * Copy marked as quoted below comes from Scott's brief. Anything marked PLACEHOLDER is a
 * stand-in to be replaced (or the card hidden) before launch. Never fill these with invented
 * anecdotes, picks or biography.
 *
 * Photos: put files in /public/about/ and set `src` (e.g. "/about/bella-01.jpg"). `ratio` is
 * width / height so the frame keeps the photo's original proportions before it loads.
 */
export type Photo = { src?: string; alt: string; caption?: string; ratio?: number };

/** Set a card's `show` to false to hide it until its content is ready. */
export const intro = {
  show: true,
  name: "Scott Galetto",
  line: "Designer, compulsive experimenter, and Bella’s on-call staff.",
  portraits: [
    { alt: "Portrait of Scott", caption: "PLACEHOLDER caption 1", ratio: 4 / 5 },
    { alt: "Portrait of Scott", caption: "PLACEHOLDER caption 2", ratio: 4 / 5 },
    { alt: "Portrait of Scott", caption: "PLACEHOLDER caption 3", ratio: 4 / 5 },
  ] as Photo[],
};

export const stopFor = {
  show: true,
  title: "Things I stop for",
  line: "Buildings, street graphics, people, and things that become more interesting next to each other.",
  photos: [
    { alt: "PLACEHOLDER: a building", caption: "PLACEHOLDER caption", ratio: 4 / 3 },
    { alt: "PLACEHOLDER: street graphics", caption: "PLACEHOLDER caption", ratio: 3 / 4 },
    { alt: "PLACEHOLDER: two things next to each other", ratio: 1 },
  ] as Photo[],
};

export const bella = {
  show: true,
  title: "The Bella report",
  line: "Bella. Black Labradoodle. Strong feelings about upholstery.",
  states: [
    { key: "beard", label: "Beard maintenance", note: "The furniture is also a napkin. This is apparently thrilling.", photo: { alt: "PLACEHOLDER: Bella wiping her beard on the couch", ratio: 1 } as Photo },
    { key: "head", label: "Head: down", note: "A statement has been made. Its meaning remains unclear.", photo: { alt: "PLACEHOLDER: Bella with her head down", ratio: 1 } as Photo },
  ],
};

export const wander = {
  show: true,
  title: "Where I wander",
  places: [
    {
      key: "chicago", label: "Chicago",
      line: "I love the city, but Lincoln Park—the actual park—is one of my favorite places. Along with the big cemeteries in fall. Excellent places to wander.",
      photos: [{ alt: "PLACEHOLDER: Lincoln Park", ratio: 3 / 2 }, { alt: "PLACEHOLDER: a cemetery in fall", ratio: 3 / 2 }] as Photo[],
    },
    {
      key: "up", label: "The UP",
      line: "The beauty still surprises me. So does the intensity of the weather. Sometimes simultaneously.",
      photos: [{ alt: "PLACEHOLDER: the Upper Peninsula", ratio: 3 / 2 }, { alt: "PLACEHOLDER: UP weather", ratio: 3 / 2 }] as Photo[],
    },
  ],
};

export const comic = {
  show: true,
  title: "Some comic relief",
  line: "I’m usually looking for a way to make you laugh. The circumstances don’t always cooperate. I proceed anyway.",
  // PLACEHOLDER: real examples from Scott. Each can be text, a photo, or both.
  examples: [
    { text: "PLACEHOLDER: example one." },
    { text: "PLACEHOLDER: example two." },
    { text: "PLACEHOLDER: example three." },
  ] as { text: string; photo?: Photo }[],
};

/** Provisional. PLACEHOLDER picks only. */
export const rotation = {
  show: true,
  title: "Currently in rotation",
  updated: "", // e.g. "Nov 2026"
  tabs: [
    { key: "reading", label: "Reading", picks: [{ title: "PLACEHOLDER title", by: "PLACEHOLDER author" }] },
    { key: "watching", label: "Watching", picks: [{ title: "PLACEHOLDER title", by: "" }] },
    { key: "listening", label: "Listening", picks: [{ title: "PLACEHOLDER title", by: "PLACEHOLDER artist" }] },
  ],
};

/** Provisional. Topic ideas from the brief: parcel boundaries, unusual interfaces,
 *  film camera movements, connections between actors. PLACEHOLDER steps. */
export const rabbitHole = {
  show: true,
  title: "Down this rabbit hole",
  topic: "PLACEHOLDER topic",
  steps: [
    { label: "What caught my attention", text: "PLACEHOLDER" },
    { label: "What I discovered", text: "PLACEHOLDER" },
    { label: "What I’m trying next", text: "PLACEHOLDER" },
  ],
  link: null as null | { label: string; href: string },
};

/** Provisional. A playful project; preview + link until there is a working try-it. */
export const justBecause = {
  show: true,
  title: "Just because I wanted to",
  project: "Six Degrees of Kevin Bacon",
  note: "PLACEHOLDER: one line on what it does.",
  link: null as null | { label: string; href: string },
};
