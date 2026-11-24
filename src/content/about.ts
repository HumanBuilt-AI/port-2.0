/**
 * About me (Section 04): seven cards about Scott's life, not his work.
 * Copy marked as quoted below comes from Scott's brief. Anything marked PLACEHOLDER is a
 * stand-in to be replaced (or the card hidden) before launch. Never fill these with invented
 * anecdotes, picks or biography.
 *
 * Photos: put files in /public/about/ and set `src` (e.g. "/about/bella-01.jpg"). `ratio` is
 * width / height so the frame keeps the photo's original proportions before it loads.
 */
export type Photo = { src?: string; /** small square-ish file for filmstrips */ thumb?: string; /** larger file for the enlarged view */ big?: string; alt: string; caption?: string; ratio?: number };

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

/**
 * The Bella report: a stacked photo deck. Tap or swipe the top photo to shuffle it to the back.
 * Labels and notes are built from Scott's own descriptions (Nov 24). Photos are square WebP,
 * 640px for the card and 1200px for the enlarged view.
 */
export const bella = {
  show: true,
  title: "The Bella report",
  line: "Bella. Black Labradoodle. Strong feelings about upholstery.",
  states: [
    {
      key: "chill", label: "Post-ball chill",
      note: "This used to be her favorite chill pose after playing ball. Flat out, ball still in sight.",
      photo: { src: "/about/bella-chill-640.webp", big: "/about/bella-chill-1200.webp", alt: "Bella, a black Labradoodle, lying flat on a green and blue patterned floor with an orange ball near her nose", ratio: 1 } as Photo,
    },
    {
      key: "pose", label: "On assignment",
      note: "I’m always making her pose somewhere around Chicago for an Insta post. She’s a good sport about it.",
      photo: { src: "/about/bella-car-640.webp", big: "/about/bella-car-1200.webp", alt: "Bella sitting on a Chicago sidewalk in front of an old black car, looking off to the side", ratio: 1 } as Photo,
    },
    {
      key: "walk", label: "The daily walk",
      note: "Bella and me on one of our daily walks around the city.",
      photo: { src: "/about/bella-walk-640.webp", big: "/about/bella-walk-1200.webp", alt: "Selfie of Scott in sunglasses and a knit hat with Bella beside him, on a walk past brick buildings and bare trees", ratio: 1 } as Photo,
    },
  ],
};

/**
 * Where I wander (Nov 24): Scott's Chicago photos, merged with the old "Things I stop for" card.
 * 19 photos: the 9 from PR 11 plus 10 more Scott sent. No captions on purpose; add a `caption`
 * to any photo to show a line under it. Files are WebP, EXIF stripped: 160 (filmstrip),
 * 640 (stage on small screens), 1200 (stage and enlarged view).
 */
export const wander = {
  show: true,
  title: "Where I wander",
  /** Scott's own copy about Chicago. */
  line: "I love the city, but Lincoln Park—the actual park—is one of my favorite places. Along with the big cemeteries in fall. Excellent places to wander.",
  /** From the old "Things I stop for" card. */
  stopFor: { title: "Things I stop for", line: "Buildings, street graphics, people, and things that become more interesting next to each other." },
  photos: [
    { src: "/about/chicago/01-upward-640.webp", big: "/about/chicago/01-upward-1200.webp", thumb: "/about/chicago/01-upward-160.webp", alt: "Looking straight up between two downtown towers, a curved street lamp hanging into a blue sky", ratio: 1 },
    { src: "/about/chicago/02-red-ford-640.webp", big: "/about/chicago/02-red-ford-1200.webp", thumb: "/about/chicago/02-red-ford-160.webp", alt: "A red vintage Ford pickup parked head-on in a downtown street", ratio: 1 },
    { src: "/about/chicago/03-shop-window-640.webp", big: "/about/chicago/03-shop-window-1200.webp", thumb: "/about/chicago/03-shop-window-160.webp", alt: "A shop window with a painted cutout of a boy pulling a girl’s pigtail, an old soap advert below", ratio: 1 },
    { src: "/about/chicago/04-alley-dusk-640.webp", big: "/about/chicago/04-alley-dusk-1200.webp", thumb: "/about/chicago/04-alley-dusk-160.webp", alt: "Dusk in a narrow downtown gap: a fire escape, glass towers and one glowing street lamp under a violet sky", ratio: 1 },
    { src: "/about/chicago/05-balconies-640.webp", big: "/about/chicago/05-balconies-1200.webp", thumb: "/about/chicago/05-balconies-160.webp", alt: "Black and white: a residential tower of stacked balconies rising over a dark low wall", ratio: 1 },
    { src: "/about/chicago/06-turret-house-640.webp", big: "/about/chicago/06-turret-house-1200.webp", thumb: "/about/chicago/06-turret-house-160.webp", alt: "A brick and stone house with a round, cone-roofed turret, framed by bare winter branches", ratio: 3 / 4 },
    { src: "/about/chicago/07-panels-640.webp", big: "/about/chicago/07-panels-1200.webp", thumb: "/about/chicago/07-panels-160.webp", alt: "A building faced in staggered silver panels and dark windows against a deep blue sky", ratio: 1 },
    { src: "/about/chicago/08-berghoff-640.webp", big: "/about/chicago/08-berghoff-1200.webp", thumb: "/about/chicago/08-berghoff-160.webp", alt: "An old restaurant front with a gold script sign reading The Berghoff, a street lamp and paper hearts in the window", ratio: 1 },
    { src: "/about/chicago/09-night-street-640.webp", big: "/about/chicago/09-night-street-1200.webp", thumb: "/about/chicago/09-night-street-160.webp", alt: "Black and white night street: a corner building, a lit sign and street lamps fading down the block", ratio: 1 },
    { src: "/about/chicago/10-scalloped-towers-640.webp", big: "/about/chicago/10-scalloped-towers-1200.webp", thumb: "/about/chicago/10-scalloped-towers-160.webp", alt: "Two round towers ringed with scalloped balconies, rising into a blue sky with soft clouds", ratio: 3 / 4 },
    { src: "/about/chicago/11-stone-fox-640.webp", big: "/about/chicago/11-stone-fox-1200.webp", thumb: "/about/chicago/11-stone-fox-160.webp", alt: "A corner building with a round white bay tower and a vertical Stone Fox sign, shot from below", ratio: 1 },
    { src: "/about/chicago/12-quick-bite-640.webp", big: "/about/chicago/12-quick-bite-1200.webp", thumb: "/about/chicago/12-quick-bite-160.webp", alt: "A red and white striped Quick Bite carry-out stand on a snowy corner", ratio: 1 },
    { src: "/about/chicago/13-red-brick-640.webp", big: "/about/chicago/13-red-brick-1200.webp", thumb: "/about/chicago/13-red-brick-160.webp", alt: "A dark red brick tower with deep window bays under a grey sky", ratio: 1 },
    { src: "/about/chicago/14-dark-tower-640.webp", big: "/about/chicago/14-dark-tower-1200.webp", thumb: "/about/chicago/14-dark-tower-160.webp", alt: "A dark glass and steel tower against a clear blue sky, one edge catching orange light", ratio: 1 },
    { src: "/about/chicago/15-collage-640.webp", big: "/about/chicago/15-collage-1200.webp", thumb: "/about/chicago/15-collage-160.webp", alt: "Six photos of glass and steel towers in the Loop, looking up", ratio: 2 / 3 },
    { src: "/about/chicago/16-grid-tower-640.webp", big: "/about/chicago/16-grid-tower-1200.webp", thumb: "/about/chicago/16-grid-tower-160.webp", alt: "Looking up at a pale gridded office tower, a curved street lamp in the foreground", ratio: 3 / 4 },
    { src: "/about/chicago/17-lit-windows-640.webp", big: "/about/chicago/17-lit-windows-1200.webp", thumb: "/about/chicago/17-lit-windows-160.webp", alt: "A dark office tower at dusk, scattered windows lit, a green-lit plaza and orange street below", ratio: 1 },
    { src: "/about/chicago/18-reflection-640.webp", big: "/about/chicago/18-reflection-1200.webp", thumb: "/about/chicago/18-reflection-160.webp", alt: "A black steel and glass tower whose windows reflect the building across the street", ratio: 1 },
    { src: "/about/chicago/19-rosehill-640.webp", big: "/about/chicago/19-rosehill-1200.webp", thumb: "/about/chicago/19-rosehill-160.webp", alt: "The castle-like stone gate of Rosehill Cemetery at sunset, trees glowing through the arch", ratio: 1 },
  ] as Photo[],
  /** Scott's UP copy, kept for later. Hidden until there are UP photos to go with it. */
  up: {
    show: false,
    label: "The UP",
    line: "The beauty still surprises me. So does the intensity of the weather. Sometimes simultaneously.",
  },
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

/** Scott's picks (Nov 24). */
export const rotation = {
  show: true,
  title: "Currently in rotation",
  updated: "Nov 2026",
  tabs: [
    { key: "reading", label: "Reading", picks: [{ title: "The AGI Race", by: "Kevin Roose" }] },
    { key: "watching", label: "Watching", picks: [{ title: "War", by: "HBO Max" }] },
    { key: "listening", label: "Listening", picks: [{ title: "Good Hang", by: "Amy Poehler’s podcast" }] },
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

/** Replaces the old "Just because I wanted to" card (Nov 24). Image supplied by Scott. */
export const spiritAnimal = {
  show: true,
  title: "My spirit animal",
  name: "Raccoon Mario.",
  photo: { src: "/about/spirit-animal-480.webp", alt: "Raccoon Mario in his brown raccoon suit, arms out, mid-wave" } as Photo,
};
