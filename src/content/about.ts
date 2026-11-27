/**
 * About me (Section 04): seven cards about Scott's life, not his work.
 * Copy marked as quoted below comes from Scott's brief. Anything marked PLACEHOLDER is a
 * stand-in; cards that still hold placeholders stay hidden (`show: false`) until filled. Never fill these with invented
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
  /** One portrait (Nov 25): Scott's pencil-sketch illustration of himself. The card shows a 4:5 crop; the enlarged view shows the whole square drawing. */
  portrait: { src: "/about/scott-neon-320.webp", big: "/about/scott-neon-big.webp", alt: "Collage portrait of Scott Galetto in a cap and hood, glancing sideways, ringed by a neon orbit with the moon, an orange sun and clouds behind him", ratio: 1 } as Photo,
  /** Earlier portraits from humanbuiltai.work, not shown. Files are still in public/about/. */
  laterPortraits: [
    { src: "/about/scott-studio-320.webp", big: "/about/scott-studio-big.webp", alt: "Black and white studio portrait of Scott Galetto in a dark sweater, half smiling", ratio: 3 / 4 },
    { src: "/about/scott-rose-320.webp", big: "/about/scott-rose-big.webp", alt: "Portrait of Scott Galetto in a bird-print shirt and suspenders, toned dusty rose", ratio: 4 / 5 },
    { src: "/about/scott-cafe-big.webp", alt: "Scott Galetto in a bird-print shirt and suspenders, sitting in a warmly lit café", ratio: 345 / 439 },
  ] as Photo[],
};

/**
 * The Bella report: a stacked photo deck. Tap or swipe the top photo to shuffle it to the back.
 * Labels and notes are built from Scott's own descriptions (Nov 24). Photos are square WebP (non-square originals cropped),
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
    {
      key: "night", label: "Night walk",
      note: "Out after dark, posing by a brick wall under the streetlights.",
      photo: { src: "/about/bella-night-640.webp", big: "/about/bella-night-1200.webp", alt: "Bella sitting on a sidewalk at night beside a brick wall, streetlights glowing behind her", ratio: 1 } as Photo,
    },
    {
      key: "bw", label: "Black and white",
      note: "Tongue out, curls everywhere.",
      photo: { src: "/about/bella-bw-640.webp", big: "/about/bella-bw-1200.webp", alt: "Black and white close-up of Bella with her tongue out and her curls catching the light", ratio: 1 } as Photo,
    },
    {
      key: "mural", label: "Blep",
      note: "Tongue out, mural behind. Accidental art.",
      photo: { src: "/about/bella-mural-640.webp", big: "/about/bella-mural-1200.webp", alt: "Bella with the tip of her tongue out in front of a colorful painted mural", ratio: 1 } as Photo,
    },
    {
      key: "serious", label: "Serious face",
      note: "Straight to camera. Very serious.",
      photo: { src: "/about/bella-serious-640.webp", big: "/about/bella-serious-1200.webp", alt: "Bella looking straight at the camera on a sunny path, leather collar and leash clip showing", ratio: 1 } as Photo,
    },
    {
      key: "home", label: "At home",
      note: "All smiles at home.",
      photo: { src: "/about/bella-home-640.webp", big: "/about/bella-home-1200.webp", alt: "Bella sitting on a wood floor indoors, looking up with a happy open mouth", ratio: 1 } as Photo,
    },
    {
      key: "park", label: "Park break",
      note: "Stretched out in the park grass, tongue out.",
      photo: { src: "/about/bella-park-640.webp", big: "/about/bella-park-1200.webp", alt: "Bella lying in the grass at a park with her tongue out, trees and buildings behind", ratio: 1 } as Photo,
    },
    {
      key: "closeup", label: "Close-up",
      note: "Up close, mouth open, curls a little wild.",
      photo: { src: "/about/bella-closeup-640.webp", big: "/about/bella-closeup-1200.webp", alt: "Close-up of Bella indoors, mouth open, curly fur sticking up on top", ratio: 1 } as Photo,
    },
  ],
};

/**
 * Where I wander (Nov 24): Scott's Chicago photos, merged with the old "Things I stop for" card.
 * 18 photos (the Loop collage was removed Nov 25). No captions on purpose; add a `caption`
 * to any photo to show a line under it. Files are WebP, EXIF stripped: 160 (filmstrip),
 * 640 (stage on small screens), 1200 (stage and enlarged view).
 */
export const wander = {
  show: true,
  title: "Where I wander",
  /** Scott's own copy about Chicago (Nov 25, verbatim). */
  line: "Some of my best thinking happens at three miles an hour with nowhere particular to be. I love the visual friction of the city—sharp modernist glass across from a turn-of-the-century turret, or a mint-condition 1970s red Ford stealing the show in the Loop. Slow down and look up, and Chicago is basically an open-air museum.",
  /** Scott's own copy (Nov 25, verbatim). */
  stopFor: { title: "Things I stop for", line: "Vintage iron, heavy masonry, street-level typography, and anything that’s outlived its era without losing its character." },
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

/** Hidden (Nov 25) until Scott sends real examples. Set `show: true` once `examples` holds them. */
export const comic = {
  show: false,
  title: "Some comic relief",
  line: "I’m usually looking for a way to make you laugh. The circumstances don’t always cooperate. I proceed anyway.",
  // PLACEHOLDER: real examples from Scott. Each can be text, a photo, or both.
  examples: [
    { text: "PLACEHOLDER: example one." },
    { text: "PLACEHOLDER: example two." },
    { text: "PLACEHOLDER: example three." },
  ] as { text: string; photo?: Photo }[],
};

/**
 * Scott's picks (Nov 24), with the cover art he sent (Nov 25). Third-party artwork:
 * PRE-LAUNCH RIGHTS CHECK, like the Raccoon Mario image.
 */
export const rotation = {
  show: true,
  title: "Currently in rotation",
  updated: "Nov 2026",
  tabs: [
    { key: "reading", label: "Reading", word: "READ", picks: [{ title: "The AGI Chronicles", by: "Kevin Roose", cover: { src: "/about/rotation/agi-chronicles-240.webp", alt: "Cover of The AGI Chronicles by Kevin Roose", ratio: 1303 / 2000 } }] },
    { key: "watching", label: "Watching", word: "WATCH", picks: [{ title: "War", by: "HBO Max", cover: { src: "/about/rotation/war-240.webp", alt: "Poster for the HBO series War", ratio: 1296 / 1920 } }] },
    { key: "listening", label: "Listening", word: "LISTEN", picks: [{ title: "Good Hang", by: "Amy Poehler’s podcast", cover: { src: "/about/rotation/good-hang-240.webp", alt: "Cover art for the Good Hang podcast with Amy Poehler", ratio: 1 } }] },
  ] as { key: string; label: string; /** up to 6 letters, shown on the dot-matrix screen */ word: string; picks: { title: string; by?: string; cover?: Photo }[] }[],
};

/** Scott's rabbit hole (Nov 25): his text, lightly tidied, and his two photos. */
export const rabbitHole = {
  show: true,
  title: "Down this rabbit hole",
  topic: "Why every grocery receipt still uses the same blocky pixel font",
  sub: "A 1980s firmware bottleneck is the reason receipt type hasn’t changed in 40 years.",
  photos: [
    { src: "/about/rabbit-magnifier-640.webp", big: "/about/rabbit-magnifier-1200.webp", alt: "A brass magnifier over a thermal receipt, showing the dotted pixels of a 7, a slashed zero and a dollar sign", ratio: 1200 / 896 },
    { src: "/about/rabbit-receipts-640.webp", big: "/about/rabbit-receipts-1200.webp", alt: "A drugstore receipt and a hardware store receipt side by side on a wooden table, printed in the same blocky font", ratio: 1200 / 896 },
  ] as Photo[],
  steps: [
    { label: "What caught my attention", text: "A hardware store receipt and a pharmacy receipt shared the exact same clunky, flat-topped 7 and wide letter spacing." },
    { label: "What I discovered", text: "Receipt printers don’t render vector fonts. They use monospace bitmaps burned into the printer’s ROM chip, so the thermal head can fire fast without overheating or lagging." },
    { label: "What I’m trying next", text: "Hunting down the oldest thermal printer firmware still printing tickets at a local diner." },
  ],
  link: null as null | { label: string; href: string },
};

/** Replaces the old "Just because I wanted to" card (Nov 24). Image supplied by Scott. */
export const spiritAnimal = {
  show: true,
  title: "My spirit animal",
  name: "Raccoon Mario.",
  /** Scott's copy (Nov 25, verbatim). */
  line: "Just a guy in a cozy suit who knows when to sprint, when to float gently down to earth, and how to find the secret bonus level everyone else walked right past.",
  photo: { src: "/about/spirit-animal-480.webp", alt: "Raccoon Mario in his brown raccoon suit, arms out, mid-wave" } as Photo,
};
