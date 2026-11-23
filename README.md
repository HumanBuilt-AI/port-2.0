# Port 2.0

An alternative, story-driven version of Scott Galetto's portfolio ([humanbuiltai.work](https://humanbuiltai.work)). It runs alongside the original site, not in place of it.

The page is a vertical scroll story. Some sections pin in place while a drawing or change plays out, then release.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Where things live

| What | Where |
| --- | --- |
| Section order | `src/app/page.tsx` |
| Sections and their copy | `src/components/` (one file per section: `Hero`, `flow/FlowSection`, `BrandSection`, `SpecsSection`, `WorkSection`, `NotesSection`, `ContactSection`; menu in `SiteIndex`, sticky bar in `StickyBar`, product sheets in `WorkSheets`) |
| Colours, type scale, section styles | `src/app/globals.css` (base tokens at the top; the mono editorial look and the `--pop` accent are in the override block near the end) |
| Fonts (SF Pro Display / Text) | `src/app/fonts/`, loaded in `src/app/layout.tsx` |
| Scroll animation (hero, flow, brand demo, sticky bar) | `src/lib/story-motion.js`, started by `StoryMotion` |
| Storyboard art (traced SVG) | `src/components/flow/scene.ts` (generated, do not hand-edit) |
| Gold robot logo (WebGL) | `src/lib/robot.js` |
| The Alibi photo | `public/alibi/room.jpg` |

The page was ported from the HTML prototype (`prototypes/story-sf4.src.html` in the project files), so the markup, styles and motion match it one to one. GSAP 3.13 and ScrollTrigger drive the storyboard flow.

### How the motion works

Pinned sections are a tall `<section className="pin">` with a sticky `.stage` inside. `story-motion.js` reads scroll progress through each one and writes styles straight to the DOM, so React never re-renders on scroll. Make a section hold longer by raising its height in `globals.css`.

With reduced motion turned on, nothing pins, every section shows its finished state, and the robot stays still.

## Working agreement

- One small PR per section or idea. Each PR gets a Netlify deploy preview to review.
- Copy lives next to its markup in each section component.
