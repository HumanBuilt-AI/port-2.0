/**
 * Interior case study pages, one per study in `cases.ts`.
 * Copy is from humanbuiltai.work, trimmed by about a fifth: repeated images,
 * duplicate before/after spreads and a few minor sections are gone.
 * Media paths are file names inside `public/work/<slug>/`.
 */

export type Media = { src: string; alt: string; cap?: string; video?: boolean; poster?: string };

export type Block = {
  kicker: string;
  /** First part of the heading in ink; `soft` follows in grey. */
  title: string;
  soft?: string;
  body?: string[];
  /** Short labelled points, shown as small tiles. */
  points?: { k: string; v: string }[];
  stats?: { n: string; l: string }[];
  media?: Media[];
  /** wide = one full-width tile, pair = two, row = three or more, phones = tall screens. */
  layout?: "wide" | "pair" | "row" | "phones";
  embed?: { src: string; title: string; note?: string; tall?: boolean; /** lay the page out at this desktop size, then scale it to the tile */ fit?: { w: number; h: number } };
  note?: string;
  dark?: boolean;
};

export type CasePage = {
  slug: string;
  client: string;
  tags: string[];
  title: string;
  soft: string;
  lede: string;
  meta: [string, string][];
  disclaimer?: string;
  short: { problem: string; approach: string; result: string };
  links?: { label: string; href: string }[];
  hero: Media;
  heroPair?: Media;
  blocks: Block[];
};

export const casePages: CasePage[] = [
  {
    slug: "specs",
    client: "Specs",
    tags: ["AI product", "Brand systems"],
    title: "A brand kit",
    soft: "for AI.",
    lede: "Small businesses have a logo, a rough PDF and a few phone photos. AI tools need rules. Specs reads the messy files, writes them up as a brand kit an AI can follow, then art-directs Instagram posts that explain every choice they make.",
    meta: [
      ["Role", "Product, design and engineering (solo)"],
      ["Focus", "AI product design, prompt and pipeline design, generative UI"],
      ["Built with", "Next.js, TypeScript, Claude API, Netlify"],
    ],
    short: {
      problem: "Ask an AI for a small business’s Instagram post and you get something generic. Brand guidelines are written for people to browse, not for a model to follow.",
      approach: "Turn messy uploads into small, sourced kit files that state their reasons. Ask the owner only the calls that change a post. Let the model compose each layout, with code checking every one.",
      result: "A live app with three demo brands whose posts look like three different art directors made them. The kit version beat the same brief with no kit 5 times out of 5.",
    },
    links: [
      { label: "Try the live app", href: "https://specs.humanbuiltai.work/" },
      { label: "View on GitHub", href: "https://github.com/HandBuiltAI/specs" },
    ],
    hero: { src: "start.webp", alt: "The Specs start screen with three fictional demo brands", cap: "Start screen · three fictional demo brands, free to try" },
    blocks: [
      {
        kicker: "The problem",
        title: "The brand book was written",
        soft: "for people.",
        body: [
          "Most small businesses keep their brand in a logo file and the owner’s head. Even a proper guidelines PDF is made to be browsed. An AI skims it and guesses the rest, so the first draft comes out generic: right name, wrong everything else.",
          "Same brief, same model below. The only difference is whether the model could read the kit.",
        ],
        media: [
          { src: "tss-promo-nokit.webp", alt: "Without the kit: a generic post with a stock-looking open till 3am sign", cap: "Without the kit · generic type, a default blue" },
          { src: "tss-promo-kit.webp", alt: "With the kit: OFF AT 2:30? OPEN TILL 3AM. in huge yellow condensed type", cap: "With the kit · Third Shift Slice" },
        ],
        layout: "pair",
      },
      {
        kicker: "The kit",
        title: "Small files,",
        soft: "each with a reason.",
        body: [
          "A Specs kit is a folder of small chunks, one idea each: positioning, voice, terminology, audience, visual system, layout, art direction, social rules and guardrails. Each one opens by saying where it came from and how sure it is.",
          "Every rule states its reason and leans on examples over adjectives. A model follows “Write like the tag: number, material, price” far better than it follows “friendly”. So does a freelancer.",
        ],
        media: [{ src: "reveal.webp", alt: "Hollis Ware’s mood board in Specs: uploaded files, a fanned palette and type", cap: "Brand DNA reveal · the kit as a mood board" }],
        layout: "wide",
      },
      {
        kicker: "The calls",
        title: "Only the calls",
        soft: "that change a post.",
        body: [
          "My first live run was a wall of questions. Now code triages first: it asks only what changes a post, settles what the uploads already settle (with an Undo), and skips the rest. Five calls at most, and prices and dates are always asked.",
          "Each call is a small interface component beside a live post: a pair of prices, a photo picker, a palette. The model picks the component, and the app checks that choice against a fixed catalog of ten before anything renders.",
        ],
        media: [{ src: "call.webp", alt: "A call in Specs: three photos to choose from beside a live post", cap: "Fill the gaps · one call beside a live post" }],
        layout: "wide",
      },
      {
        kicker: "Art direction",
        title: "One engine.",
        soft: "Three art directors.",
        body: [
          "The first version filled six shared templates, so every brand composed the same way. Now the model composes each layout from the kit, and code keeps it honest: CSS reaches colors and fonts only through kit variables, and a browser check catches clipped text, overlaps and low contrast.",
          "It’s HTML and CSS, not image generation, so fonts, prices and logos come out exact.",
        ],
        media: [{ src: "all-posts.webp", alt: "Fifteen posts, five per demo brand, in three very different styles", cap: "Same five briefs, three kits: loud, warm, quiet" }],
        layout: "wide",
      },
      {
        kicker: "Showing the work",
        title: "Every choice",
        soft: "cites its rule.",
        body: [
          "Tap Why this works on any post and numbered pins land on it. Each note says what was decided and which kit chunks it came from. An owner can disagree with a rule instead of a vibe, and fix it once in the kit.",
          "Copy comes only from the kit and the brief. Specs never invents a price, a date or a location.",
        ],
        media: [{ src: "why.webp", alt: "A Third Shift Slice post with numbered pins and notes", cap: "Why this works" }],
        layout: "wide",
      },
      {
        kicker: "Outcome",
        title: "Live, open source,",
        soft: "and it explains itself.",
        stats: [
          { n: "5 of 5", l: "Head-to-heads won by the kit version, in my scoring." },
          { n: "20 of 20", l: "Checks passed on deliberately messy uploads, including a planted contradiction." },
          { n: "≤ 5", l: "Calls the owner is asked to make." },
        ],
        dark: true,
      },
      {
        kicker: "Reflection",
        title: "AI drafts.",
        soft: "Judgment decides what ships.",
        body: [
          "I built Specs the way it asks small businesses to work: I wrote the spec and the gates, made the calls on type, color and logos, and directed Claude through the build.",
          "The biggest lesson held for the model and for people: a rule without its reason gets over-applied. The fix was rarely a stricter rule. It was one more sentence saying why the rule exists.",
        ],
      },
    ],
  },
  {
    slug: "aon-horizon",
    client: "Aon / Horizon",
    tags: ["Product design", "Data visualization"],
    title: "Rethinking how",
    soft: "we see risk.",
    lede: "For Aon, I redesigned a dense climate risk tool around a map, with every bit of the data still underneath. Climate models are complicated enough. The interface didn’t need to be.",
    meta: [
      ["Role", "Experience Designer / Front-End Developer"],
      ["Focus", "Data visualization, interaction design, prototyping, AI-assisted exploration"],
      ["Deliverables", "Product concept, wireframes, UI system, interactive states"],
      ["Built with", "Figma, then a React.js and three.js prototype"],
    ],
    disclaimer: "The original work is internal and proprietary to Aon. The visuals and prototype on this page are recreations.",
    short: {
      problem: "A climate risk tool with plenty of data and no breathing room. People had to decode the interface before they could read a site’s risk.",
      approach: "Built the screen around six questions people bring to a site. The map became the interface, time became a control, and a chat layer lets people ask the data.",
      result: "A working React.js and three.js prototype that moves from the national pattern to one site’s score, drivers and trend without leaving the view.",
    },
    links: [{ label: "Try the live prototype", href: "/work/aon-horizon/prototype/index.html" }],
    hero: { src: "01-hero.jpg", alt: "Horizon composite risk view, light theme", cap: "Composite risk view · light theme" },
    blocks: [
      {
        kicker: "A little time travel",
        title: "Before we move forward,",
        soft: "let’s go backwards.",
        body: [
          "To pressure-test the direction, I mocked up the same data as 1990s enterprise software: tabs, tables, tiny charts and enough gray chrome to make Windows 95 proud. Imagined, not archival. Aon never shipped this.",
          "The data wasn’t the problem. Finding the story inside it was.",
        ],
        media: [{ src: "window95.webp", alt: "Imagined Windows 95-era version of the tool", cap: "An intentionally exaggerated trip back in time" }],
        layout: "wide",
      },
      {
        kicker: "Information hierarchy",
        title: "Start with the questions,",
        soft: "not the pixels.",
        body: ["I organized the interface around the six questions people bring to a site."],
        points: [
          { k: "Q1", v: "Where is the site?" },
          { k: "Q2", v: "What kind of risk am I looking at?" },
          { k: "Q3", v: "How severe is it?" },
          { k: "Q4", v: "How is it changing?" },
          { k: "Q5", v: "What is driving the score?" },
          { k: "Q6", v: "What should I investigate next?" },
        ],
        media: [
          { src: "ipad-grass.webp", alt: "Hand-sketched interface on an iPad, outdoors", cap: "Map for context, panel for meaning" },
          { src: "wireframes-Aon.jpg", alt: "Concept sketches, low-fi, mid-fi and interaction wireframes", cap: "Structure before styling" },
        ],
        layout: "pair",
      },
      {
        kicker: "The core idea",
        title: "Make the map",
        soft: "the interface.",
        body: ["No hopping between reports and tables. People move from the national picture to a single site without losing their place."],
        points: [
          { k: "Geography", v: "Pan, zoom and click straight into a site." },
          { k: "Severity", v: "Cell color and size both scale with intensity." },
          { k: "Detail", v: "Score, trend and drivers in the panel." },
          { k: "Time", v: "2026, 2031, 2036, one click apart." },
        ],
        media: [{ src: "06-dark-mode.jpg", alt: "Finished dark-mode interface", cap: "The finished interface, dark theme" }],
        layout: "wide",
        dark: true,
      },
      {
        kicker: "Visual language",
        title: "Color",
        soft: "has a job.",
        body: ["Risk data shouldn’t be charming, and it shouldn’t be alarming either. The palette needed enough contrast to show patterns across thousands of cells, and enough restraint to carry labels, charts and two themes. One scale, everywhere risk appears."],
        media: [{ src: "07-component-sheet.jpg", alt: "Component and system exploration", cap: "Component and system exploration" }],
        layout: "wide",
      },
      {
        kicker: "Time as interface",
        title: "Risk isn’t",
        soft: "a snapshot.",
        body: ["Time became a control instead of a footnote. People compare one site across 2026, 2031 and 2036 without digging through a report."],
        stats: [
          { n: "62", l: "2026" },
          { n: "68", l: "2031" },
          { n: "74", l: "2036" },
        ],
        note: "Composite score, Miami · sample data, not a forecast",
        media: [
          { src: "03-horizon-comparison.jpg", alt: "Time horizon comparison view", cap: "Same site, three points in time" },
          { src: "05-search.jpg", alt: "Search state", cap: "Search, for when you already know where you’re going" },
        ],
        layout: "pair",
      },
      {
        kicker: "Asking the data",
        title: "And sometimes",
        soft: "you just want to ask.",
        body: [
          "Not everyone wants to read a legend and work out a trend line in their head. So they can ask, and the answer points back to the map.",
          "I gave the AI a deliberately narrow job. It answers only from the scores and drivers the map already shows, so anything it says can be checked against what’s on screen. Deciding what it was allowed to say came before deciding how it should sound.",
        ],
        media: [{ src: "04-chat-in-use.jpg", alt: "Conversational AI interaction in use", cap: "“What drives the score for Miami?”" }],
        layout: "wide",
      },
      {
        kicker: "Final experience",
        title: "From data-heavy tool",
        soft: "to explorable system.",
        body: ["The prototype below is a recreation of the React.js and three.js build. The original stayed with Aon."],
        embed: { src: "/work/aon-horizon/prototype/index.html", title: "Horizon live prototype", fit: { w: 1440, h: 900 }, note: "Search a city · switch hazards · change the horizon · ask about the data. Best on desktop." },
      },
      {
        kicker: "Reflection",
        title: "The best visualization doesn’t simplify the data.",
        soft: "It simplifies getting to the point.",
        body: ["AI can now produce a hundred views of the same data in minutes. Someone still has to know which one helps a person understand their risk and act on it."],
      },
    ],
  },
  {
    slug: "chipotle-raincheck",
    client: "Chipotle / RAINCHECK",
    tags: ["Vibes", "SMS + Mobile Wallet"],
    title: "A closed door,",
    soft: "turned into a free burrito.",
    lede: "One day in February, Chipotle closed every U.S. restaurant for an afternoon and asked customers to text for a free burrito. At Vibes, I designed what they saw next: a landing page where a stop-motion burrito unwrapped itself on the way to their coupon.",
    meta: [
      ["Role", "Experience design, animation and production assets"],
      ["Team", "Vibes Mobile Solutions Group"],
      ["Deliverables", "Landing page concept, wireframes, stop-motion animation, dev-ready assets"],
      ["Platform", "SMS short code / mobile web / Apple Wallet"],
    ],
    short: {
      problem: "Every Chipotle in the country closed for lunch, with the press watching. The apology had to work nationwide, within hours.",
      approach: "One keyword on every door. The text led to a branded page with a light, stop-motion burrito and a one-tap Add to Wallet.",
      result: "5.3 million requests in about five hours, more than double what Chipotle expected, with an estimated 67% redemption rate.",
    },
    hero: { src: "chipotle-flow-phones.webp", alt: "Three phones: the closed-store landing page, the ingredient reveal and the Wallet pass", cap: "Landing page · ingredient reveal · Apple Wallet pass" },
    blocks: [
      {
        kicker: "The challenge",
        title: "One keyword.",
        soft: "Every door in the country.",
        body: [
          "Signs on every door invited customers to text RAINCHECK to 888222 for a free burrito, with a window that closed at 6 p.m. Eastern the same day. With millions arriving at once, it had to be warm, fast and flawless.",
          "My part was the page people landed on after the text.",
        ],
        points: [
          { k: "P1", v: "Make the apology feel like Chipotle" },
          { k: "P2", v: "Run on every phone" },
          { k: "P3", v: "Never slow down the coupon" },
        ],
      },
      {
        kicker: "The core idea",
        title: "A burrito",
        soft: "that unwraps itself.",
        body: ["I led the brainstorm for the landing page. Working from Chipotle’s brand guidelines, we landed on a foil-wrapped burrito in a handmade, stop-motion style that unwraps itself, then hands the screen to the offer. The animation lands on the offer, never in front of it."],
        media: [
          { src: "phone-closed.webp", alt: "First frame: doors closed, a free burrito is on us", cap: "Start · the wrapped burrito" },
          { src: "phone-reveal.webp", alt: "Final frame: the burrito unwrapped, surrounded by bowls of toppings", cap: "End · the ingredient reveal" },
        ],
        layout: "phones",
      },
      {
        kicker: "Making it run everywhere",
        title: "Stop motion,",
        soft: "without a video.",
        body: ["Video would have been heavy and slow to start at the exact moment millions of people tapped the link. So the burrito was a sequence of small images, animated in the browser with GSAP. It played on every phone that tapped the link, and nothing heavy loaded before the coupon."],
        media: [{ src: "burrito-anim.mp4", poster: "burrito-poster.jpg", alt: "The burrito animation", cap: "A recording made for this case study. The original ran live in the browser.", video: true }],
        layout: "phones",
      },
      {
        kicker: "The Wallet pass",
        title: "A coupon",
        soft: "that can’t get lost.",
        body: ["The offer lived in Apple Wallet as a PassKit pass. No app, no account, no printout. A pass gives you a logo, a strip image, a few fields and a barcode, so every asset counted."],
        media: [{ src: "phone-wallet.webp", alt: "Apple Wallet add screen with the Chipotle free burrito pass", cap: "Add to Apple Wallet" }],
        layout: "phones",
      },
      {
        kicker: "Results",
        title: "More than twice the response",
        soft: "Chipotle planned for.",
        body: ["Chipotle expected about 2.5 million requests. It got 5.3 million in roughly five hours, and most people who asked for a burrito came back to claim it."],
        stats: [
          { n: "5.3M", l: "Offer requests in about five hours." },
          { n: "14K", l: "Requests per minute at the peak." },
          { n: "67%", l: "Estimated redemption, per Chipotle’s CMO." },
          { n: "+10%", l: "Lift in restaurant visits, per PlaceIQ." },
        ],
        note: "Campaign results for Chipotle, not for the landing page alone. Sources: Nation’s Restaurant News; Mobile Marketer (PlaceIQ).",
        dark: true,
      },
      {
        kicker: "Into the platform",
        title: "From one-off campaign",
        soft: "to self-serve feature.",
        body: ["RAINCHECK proved the text-to-Wallet flow at national scale, but it was still custom work. Verizon, Home Depot, Lane Bryant and Ralph Lauren all asked the same question: when can we do this ourselves? I helped bring it into the Vibes platform, carrying over what the pilots taught us."],
      },
      {
        kicker: "Reflection",
        title: "Delight is only worth it",
        soft: "if it never gets in the way.",
        body: ["On a day when Chipotle needed goodwill, a dancing burrito did more than a plain coupon page could. But it only earned its place because it was light enough that nobody waited for it."],
      },
    ],
  },
  {
    slug: "creditninja",
    client: "CreditNinja",
    tags: ["UI & UX", "Loan eligibility"],
    title: "From 15 minutes",
    soft: "to under five.",
    lede: "I led the redesign of a dated, confusing loan eligibility form. The same questions now arrive one at a time in a chat, answered with a tap, a slider or a short field.",
    meta: [
      ["Role", "Creative Director"],
      ["Scope", "UI design, interaction design, mobile usability"],
      ["Built with", "Prototyped in Adobe XD and Figma. Built in React.js with Storybook by the internal dev teams"],
      ["Testing", "A/B tested against a one-question-per-page flow"],
    ],
    short: {
      problem: "A dated loan eligibility form took about 15 minutes to finish and was especially hard to complete on a phone.",
      approach: "Every question stayed. They just arrive one message at a time, like a text thread.",
      result: "Completion time fell to under five minutes. Completion rose 40%, drop-offs fell 27%, and confused service calls fell by 112 a month.",
    },
    links: [{ label: "Try the prototype", href: "/work/creditninja/prototype/index.html" }],
    hero: { src: "before-loan-form.png", alt: "The original CreditNinja loan application: a long single-page form", cap: "Before" },
    heroPair: { src: "chat-01.webp", alt: "Chat opening: the CreditNinja ninja asks how much you need", cap: "After" },
    blocks: [
      {
        kicker: "The challenge",
        title: "Checking eligibility shouldn’t feel",
        soft: "like the hard part.",
        body: ["People had to fight an outdated form just to learn whether they qualified for a loan, and on a phone it was worse."],
        points: [
          { k: "01", v: "An outdated interface" },
          { k: "02", v: "A confusing completion experience" },
          { k: "03", v: "Poor mobile usability" },
        ],
        media: [{ src: "phone-flow.webm", alt: "Screen recording of the original form on a phone", cap: "The original form", video: true }],
        layout: "phones",
      },
      {
        kicker: "The design shift",
        title: "One question,",
        soft: "one reply.",
        body: [
          "Each question arrives as a message from the CreditNinja guide, with the answer controls right under it, so there is always one obvious thing to do next. Earlier answers stay in the thread above.",
          "There is no Next button between steps. Reply, and the next question follows.",
        ],
        media: [
          { src: "chat-03.webp", alt: "Chat asking for main source of income with four answer cards", cap: "Question" },
          { src: "chat-08.webp", alt: "Full-time job appears as a reply bubble", cap: "Selected answer" },
          { src: "chat-09.webp", alt: "The next question appears below the reply", cap: "Next question" },
        ],
        layout: "phones",
      },
      {
        kicker: "Mobile experience",
        title: "Designed for",
        soft: "the phone in your hand.",
        body: ["People spend their days texting, so the redesign borrows that rhythm. The thread scrolls like a messaging app and replies sit at thumb height. A loan form, one of the internet’s least loved chores, starts to feel like answering a text."],
        points: [
          { k: "Focused screens", v: "Short, plain-language messages from the guide." },
          { k: "Labeled answers", v: "Large rounded buttons. The selected choice turns solid ink." },
          { k: "Illustration", v: "The ninja mark and line drawings bring in warmth." },
        ],
      },
      {
        kicker: "The complete flow",
        title: "One conversation,",
        soft: "start to finish.",
        media: [
          { src: "chat-01.webp", alt: "Chat opening asking how much you need", cap: "01 · Amount" },
          { src: "chat-02.webp", alt: "Email and mobile number as inline fields", cap: "02 · About you" },
          { src: "chat-04.webp", alt: "Where to send the money, with bank badges", cap: "03 · Bank" },
          { src: "chat-06.webp", alt: "Offer: approved up to $1,500 with an amount slider", cap: "04 · Offer" },
          { src: "chat-07.webp", alt: "Final message: $1,500 is on its way", cap: "05 · Confirmation" },
        ],
        layout: "phones",
        note: "Prototype screens · names, amounts and terms are sample data",
      },
      {
        kicker: "Working prototype",
        title: "Try the flow",
        soft: "yourself.",
        body: ["A recreation rebuilt with Claude Design. It was fast because the decisions were already made: keep every question, show one obvious next step, write replies that sound like a person. The AI did the typing."],
        embed: { src: "/work/creditninja/prototype/index.html", title: "CreditNinja chat prototype", note: "Drag the slider and tap your replies.", tall: true },
      },
      {
        kicker: "Results",
        title: "A 15-minute task,",
        soft: "finished in under five.",
        stats: [
          { n: "<5 min", l: "Redesigned completion time, down from about 15." },
          { n: "+40%", l: "Higher completion rate." },
          { n: "−27%", l: "Fewer drop-offs." },
          { n: "−112", l: "Confused customer service calls a month." },
        ],
        note: "Results reported by the project owner",
        dark: true,
      },
      {
        kicker: "Reflection",
        title: "Make the next step",
        soft: "easy to understand.",
        body: ["Nobody needed a better-looking form. Once it was clear why people stalled, the fix was the interaction model. Same questions, one at a time, in about a third of the time."],
      },
    ],
  },
  {
    slug: "sauza-lasso",
    client: "Sauza / Lasso Up With A Cowboy",
    tags: ["Creative technology", "In-store activation"],
    title: "One throw,",
    soft: "two screens.",
    lede: "A shopper texts a keyword and their phone pairs with an in-store iPad. They flick a lasso off the phone and it lands on the iPad, one continuous throw across two screens.",
    meta: [
      ["Role", "Creative tech lead"],
      ["Team", "Front-end developers, graphic designers"],
      ["Platform", "Mobile web, iPad kiosk, SMS, WebSockets"],
    ],
    short: {
      problem: "Sauza wanted an in-store moment for Sparkling Margarita that shoppers would actually stop for.",
      approach: "A guest’s own phone becomes the controller, with no app to install: text a keyword, join the kiosk iPad, and flick a lasso from one screen onto the other.",
      result: "A Verizon Partner Innovation Award for its use of WebSockets, which were bleeding-edge at the time.",
    },
    links: [{ label: "Watch the promo", href: "https://vimeo.com/239687595" }],
    hero: { src: "ipad-attract.webp", alt: "Kiosk attract screen: a hand holds a phone with the lasso in front of the iPad", cap: "iPad kiosk · attract screen" },
    blocks: [
      {
        kicker: "Promo",
        title: "See it",
        soft: "in the store.",
        embed: { src: "https://player.vimeo.com/video/239687595?title=0&byline=0&portrait=0", title: "Sauza Lasso promo video" },
      },
      {
        kicker: "Context",
        title: "Your phone is the lasso.",
        soft: "The iPad is the ranch.",
        body: [
          "The kiosk iPad ran the show and the guest’s own phone was the controller. Each guest got five throws at a bottle on a fence post.",
          "As creative tech lead, I designed the interaction and the system behind it, and led front-end developers and graphic designers through the build.",
        ],
        media: [{ src: "ipad-age-gate.webp", alt: "Age gate on the kiosk iPad: a cowboy beside a blue bottle", cap: "Every session opens with an age gate" }],
        layout: "wide",
      },
      {
        kicker: "Pairing",
        title: "A text, a link,",
        soft: "a four-digit code.",
        body: ["The guest texts LASSO, taps the link that comes back, and enters the code shown on the iPad. The phone opens a socket and joins that iPad’s room."],
        points: [
          { k: "No app", v: "SMS and a web link got guests playing in seconds." },
          { k: "Right kiosk", v: "The code maps the phone to the right iPad." },
          { k: "One session", v: "The socket stays open for all five throws." },
        ],
        media: [{ src: "wf-06.png", alt: "Wireframe: phone screen to enter the code and connect, iPad shows the code", cap: "Pair phone to iPad" }],
        layout: "wide",
      },
      {
        kicker: "The throw",
        title: "Swipe direction and speed",
        soft: "become the throw.",
        body: [
          "Touchstart to touchend gives an angle and a speed. The lasso keeps travelling off the top of the phone while that vector goes to the server. The server picks one of six pre-shot clips, and the iPad starts playing as the lasso clears the phone.",
          "Every clip starts on the idle loop’s frame from a locked-off camera, and the lasso always enters from the bottom edge, where the phone sits. That shared frame makes the handoff invisible.",
        ],
        media: [
          { src: "wf-07.webp", alt: "Wireframe: phone with lasso ready and chevrons hinting an upward swipe", cap: "Aim and flick" },
          { src: "wf-08.webp", alt: "Wireframe: phone shows Look at the iPad as the lasso leaves", cap: "Lasso crosses screens" },
          { src: "wf-09.png", alt: "Wireframe: result screens on phone and iPad", cap: "Result" },
        ],
        layout: "row",
      },
      {
        kicker: "Reflection",
        title: "The technology disappears",
        soft: "into the gesture.",
        body: [
          "Guests never saw a socket or a clip table. They saw a lasso leave their hand and land on a bottle.",
          "That’s still how I approach new technology, AI included. Start with what would make someone stop and play, then find out what the tool can do about it.",
        ],
      },
    ],
  },
  {
    slug: "verizon-indycar",
    client: "Verizon / IndyCar",
    tags: ["Experiential design", "Mobile web + VR"],
    title: "Putting race day",
    soft: "in fans’ hands.",
    lede: "Verizon wanted IndyCar fans to do more than wander through its tent. I led art direction and the front-end build of a mobile web race-day companion with a VR seat in the cockpit.",
    meta: [
      ["Role", "Art Director / Front-End Developer"],
      ["Focus", "Event engagement, mobile experience, immersive activation"],
      ["Deliverables", "Mobile web app and connected VR experience"],
      ["Platform", "Verizon demo devices / attendee phones"],
    ],
    short: {
      problem: "Verizon’s tent had two jobs during a busy race weekend: show off new demo phones, and give fans something useful enough to stop for.",
      approach: "A race-day companion with five destinations: schedule, map, Ways to Win, the official app, and a VR cockpit view nobody could miss.",
      result: "VR became the most-used feature. Ways to Win engagement rose 124% over the prior year, with 70%+ app installation reported.",
    },
    hero: { src: "four-phones-vr.webp", alt: "Four red Nokia phones showing the IndyCar experience", cap: "Home · weekend schedule · Ways to Win · track map" },
    blocks: [
      {
        kicker: "A little time travel",
        title: "Yes,",
        soft: "that’s a Nokia.",
        body: ["The hardware dates it. The problem doesn’t: give people a reason to try something new, and make starting easy. A race weekend competes for every minute of attention, so whatever we built had to earn a few seconds and pay them back fast."],
        media: [{ src: "nokia-home.webp", alt: "A single red Nokia phone showing the IndyCar homepage", cap: "Reconstructed presentation image" }],
        layout: "wide",
      },
      {
        kicker: "Wireframing",
        title: "Make the next move",
        soft: "obvious.",
        body: ["Five questions a visitor brings to race day, each with its own destination, all one tap from home. Every screen shares one structure: a large heading, an angled panel for the content, and an arrow on every row."],
        media: [
          { src: "wf-home.png", alt: "Home wireframe with an angled panel", cap: "Home" },
          { src: "wf-schedule.png", alt: "Weekend schedule wireframe", cap: "Weekend schedule" },
          { src: "wf-ways-to-win.png", alt: "Ways to Win wireframe", cap: "Ways to Win" },
          { src: "wf-track-map.png", alt: "Track map wireframe", cap: "Track map" },
        ],
        layout: "row",
      },
      {
        kicker: "The core idea",
        title: "A race-day companion",
        soft: "with a seat in the cockpit.",
        body: ["The homepage gets fans to practical information in one tap, and puts VR on top where nobody can miss it, without pushing anything essential off screen."],
        points: [
          { k: "Try IndyCar VR", v: "A full-width banner, above everything else." },
          { k: "Weekend schedule", v: "First in the list, one tap from home." },
          { k: "Ways to Win", v: "Chances to participate, visible from the start." },
        ],
        media: [{ src: "screen-home.webp", alt: "Annotated homepage: VR banner, schedule, Ways to Win, map", cap: "Homepage" }],
        layout: "phones",
      },
      {
        kicker: "Visual language",
        title: "Built to feel",
        soft: "like race day.",
        body: ["The look came from the track: Verizon red, black and white, tall condensed headlines, angled panels that suggest speed, and a chevron on every row. It’s loud where this portfolio is quiet."],
        media: [{ src: "three-phones.webp", alt: "Weekend schedule, Ways to Win and track map screens on three red phones" }],
        layout: "wide",
        dark: true,
      },
      {
        kicker: "Race-day essentials",
        title: "The right information,",
        soft: "right when fans need it.",
        body: ["The schedule plans three days and the map finds your way once you’re there. Ways to Win put Verizon’s promotions on one screen as three numbered paths: scan QR codes for prizes, check in and share, or play trivia."],
        media: [
          { src: "screen-schedule.webp", alt: "Finished weekend schedule screen", cap: "Weekend schedule" },
          { src: "screen-track-map.webp", alt: "Finished track map screen", cap: "Track map" },
          { src: "screen-ways-to-win.webp", alt: "Finished Ways to Win screen", cap: "Ways to Win" },
        ],
        layout: "phones",
        note: "Dates and times shown are mockup content",
      },
      {
        kicker: "The VR experience",
        title: "Then we put fans",
        soft: "in the driver’s seat.",
        body: ["Visitors got a free IndyCar cardboard viewer. Drop in a phone and you see the race from the driver’s seat. It was something physical to take home that led straight back to the app. Fans could open it on their own phones by SMS or QR code, so it kept working after they left the tent."],
        media: [
          { src: "vr-viewer.webp", alt: "IndyCar-branded cardboard VR viewer with a phone", cap: "Branded cardboard viewer" },
          { src: "vr-fan.webp", alt: "A fan holds the cardboard VR viewer to their eyes", cap: "The viewer in use at the Verizon tent" },
        ],
        layout: "pair",
      },
      {
        kicker: "Results",
        title: "Fans picked it up,",
        soft: "then played along.",
        stats: [
          { n: "70%+", l: "Reported app installation among event participants." },
          { n: "+124%", l: "Ways to Win engagement over the prior year." },
          { n: "No. 1", l: "IndyCar VR, the most-used feature." },
        ],
        note: "Results reported by the project owner",
        dark: true,
      },
      {
        kicker: "Reflection",
        title: "Give people something useful.",
        soft: "Then give them something to remember.",
        body: ["I’d build it with very different tools today. The hard part would be the same: knowing what a fan needs in the middle of a loud, crowded weekend, and what deserves a place on a small screen."],
      },
    ],
  },
];

export const casePage = (slug: string) => casePages.find((p) => p.slug === slug);
