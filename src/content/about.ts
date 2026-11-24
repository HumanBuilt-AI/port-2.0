/**
 * About me (Section 04): eight cards about Scott's life, not his work.
 * Copy marked as quoted below comes from Scott's brief. Anything marked PLACEHOLDER is a
 * stand-in to be replaced (or the card hidden) before launch. Never fill these with invented
 * anecdotes, picks or biography.
 *
 * Photos: put files in /public/about/ and set `src` (e.g. "/about/bella-01.jpg"). `ratio` is
 * width / height so the frame keeps the photo's original proportions before it loads.
 */
export type Photo = { src?: string; /** larger file for the enlarged view */ big?: string; alt: string; caption?: string; ratio?: number };

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

/** Scott's Chicago photos (Nov 24). Add a `caption` to any of them to show a line under the photo. */
export const stopFor = {
  show: true,
  title: "Things I stop for",
  line: "Buildings, street graphics, people, and things that become more interesting next to each other.",
  photos: [
    { src: "/about/stop-01-upward-640.webp", big: "/about/stop-01-upward-1200.webp", alt: "Looking straight up between two downtown towers, a curved street lamp hanging into a blue sky", ratio: 1 },
    { src: "/about/stop-02-stone-fox-640.webp", big: "/about/stop-02-stone-fox-1200.webp", alt: "A corner building with a round white bay tower and a vertical Stone Fox sign, shot from below at dusk", ratio: 1 },
    { src: "/about/stop-03-balconies-640.webp", big: "/about/stop-03-balconies-1200.webp", alt: "Black and white: a residential tower of stacked balconies rising over a dark low wall", ratio: 1 },
    { src: "/about/stop-04-shop-window-640.webp", big: "/about/stop-04-shop-window-1200.webp", alt: "A shop window with a painted cutout of a boy pulling a girl’s pigtail, an old soap advert below", ratio: 1 },
    { src: "/about/stop-05-panels-640.webp", big: "/about/stop-05-panels-1200.webp", alt: "A building faced in staggered silver panels and dark windows against a deep blue sky", ratio: 1 },
    { src: "/about/stop-06-night-street-640.webp", big: "/about/stop-06-night-street-1200.webp", alt: "Black and white night street: a corner building, a lit sign and street lamps fading down the block", ratio: 1 },
    { src: "/about/stop-07-red-brick-640.webp", big: "/about/stop-07-red-brick-1200.webp", alt: "A dark red brick tower with deep window bays under a grey sky", ratio: 1 },
    { src: "/about/stop-08-collage-640.webp", big: "/about/stop-08-collage-1200.webp", alt: "Six photos of glass and steel towers in the Loop, looking up", ratio: 2 / 3 },
    { src: "/about/stop-09-rosehill-640.webp", big: "/about/stop-09-rosehill-1200.webp", alt: "The castle-like stone gate of Rosehill Cemetery at sunset, trees glowing through the arch", ratio: 1 },
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
