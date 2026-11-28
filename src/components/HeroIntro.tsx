"use client";

import React, { useEffect, useState, useSyncExternalStore } from "react";

/**
 * Home hero, from Scott's Figma frame.
 * Left: "I'm Scott. A [word] human living and working in Chicago." The word types out letter by
 * letter in its own colour (from the Approach storyboard palette), holds, deletes letter by letter,
 * and the next one types.
 * Right: a deck of real project shots, each with a black logo tag in the top-right corner. The
 * front card steps through a project's three frames with a push-in; after the third it tips back
 * into the pile (tilt, blur, fade) while the next card rises forward and its tag drops in.
 * Behind the deck, a thin line drawing of arches and steps draws itself on, stroke by stroke.
 * Reduced motion: first word, first frame and the finished drawing, no movement.
 */
const WORDS: { w: string; c: string }[] = [
  { w: "passionate", c: "#FF8970" },
  { w: "multifaceted", c: "#D4BEFC" },
  { w: "empathetic", c: "#FDD5DD" },
  { w: "mindful", c: "#FEE68C" },
  { w: "practical", c: "#F7C81E" },
];
const TYPE_MS = 85, DELETE_MS = 45, HOLD_MS = 1800, GAP_MS = 350;

const PROJECTS = [
  { name: "Verizon / IndyCar", slug: "verizon-indycar", key: "indycar", logo: "Verizon", alts: ["Four Nokia phones showing the IndyCar app screens", "A hand holding a phone with the track map", "A finger tapping a stop on the track map"] },
  { name: "Chipotle / RAINCHECK", slug: "chipotle-raincheck", key: "raincheck", logo: "Chipotle", alts: ["A phone showing the 'Our doors are closed' screen", "The free burrito offer on a phone", "The free burrito pass being added to Apple Wallet"] },
  { name: "Aon / Horizon", slug: "aon-horizon", key: "aon", logo: "Aon", alts: ["The Horizon site climate risk tabs", "The climate risk map dashboard on a laptop", "A hand-drawn sketch of the dashboard"] },
  { name: "Sauza / Lasso", slug: "sauza-lasso", key: "sauza", logo: "Sauza", alts: ["A cowboy in a hat looking into the camera", "A rider at sunset behind four Sauza sparkling margarita bottles", "A tablet showing the Lasso Up With a Cowboy game"] },
  { name: "CreditNinja", slug: "creditninja", key: "creditninja", logo: "CreditNinja", alts: ["A man on the couch with his dog, checking his phone", "The CreditNinja app offering a $1,500 loan", "A 'Great news! You're approved.' notification"] },
  // Specs goes here once its strip and logo arrive: add public/hero/specs-{1,2,3}-{640,1200}.webp and public/hero/logos/specs.svg.
];
/** Time on each picture. The progress bars and push-in read it from --hi-frame. */
const FRAME_MS = 1800;

const article = (w: string) => (/^[aeiou]/i.test(w) ? "An" : "A");

const RM = "(prefers-reduced-motion: reduce)";
function useReducedMotion() {
  return useSyncExternalStore(
    (cb) => { const m = window.matchMedia(RM); m.addEventListener("change", cb); return () => m.removeEventListener("change", cb); },
    () => window.matchMedia(RM).matches,
    () => false,
  );
}

/** Types each word out, holds, deletes it letter by letter, then types the next. */
function useTypedWord(reduce: boolean) {
  const [i, setI] = useState(0);
  const [n, setN] = useState(WORDS[0].w.length);
  useEffect(() => {
    if (reduce) return;
    let alive = true;
    const timers: number[] = [];
    const wait = (ms: number) => new Promise<void>((r) => { timers.push(window.setTimeout(r, ms)); });
    (async () => {
      let k = 0;
      await wait(HOLD_MS);
      while (alive) {
        for (let c = WORDS[k].w.length - 1; c >= 0 && alive; c--) { setN(c); await wait(DELETE_MS); }
        await wait(GAP_MS);
        if (!alive) return;
        k = (k + 1) % WORDS.length; setI(k);
        for (let c = 1; c <= WORDS[k].w.length && alive; c++) { setN(c); await wait(TYPE_MS); }
        await wait(HOLD_MS);
      }
    })();
    return () => { alive = false; timers.forEach((t) => window.clearTimeout(t)); };
  }, [reduce]);
  return { word: WORDS[i], typed: WORDS[i].w.slice(0, n) };
}

export function HeroIntro() {
  const reduce = useReducedMotion();
  const { word, typed } = useTypedWord(reduce);
  const [tick, setTick] = useState(0); // frames shown since load
  const step = tick % (PROJECTS.length * 3); // 0..(3 * PROJECTS.length - 1)
  const moved = tick >= 3; // a card has left the front at least once (no recede on first paint)

  useEffect(() => {
    if (reduce) return;
    const b = window.setInterval(() => setTick((x) => x + 1), FRAME_MS);
    return () => window.clearInterval(b);
  }, [reduce]);

  const p = Math.floor(step / 3), f = step % 3;
  const all = WORDS.map((x) => x.w);
  const label = `I’m Scott. A ${all.slice(0, -1).join(", ")} and ${all[all.length - 1]} human living and working in Chicago.`;

  return (
    <section className="hi" id="hero" aria-labelledby="hi-h">
      <div className="hi-in">
        <div className="hi-copy">
          <p className="hi-kicker" aria-label={label}>
            <span aria-hidden="true">I’m Scott. {article(word.w)} </span>
            <span className="hi-type" aria-hidden="true" style={{ color: word.c }}>{typed}<span className="hi-caret" style={{ background: word.c }} /></span>
            <span aria-hidden="true"> human living and working in Chicago.</span>
          </p>
          <h1 id="hi-h">AI-fluent creative technologist.</h1>
          <p className="hi-lede">Designer by trade, technologist by instinct. I find the idea worth building and prototype it into something real, with AI in the loop.</p>
        </div>

        <div className="hi-deck" aria-label="Recent work" style={{ "--hi-frame": `${FRAME_MS}ms` } as React.CSSProperties}>
          {PROJECTS.map((proj, i) => {
            const pos = (i - p + PROJECTS.length) % PROJECTS.length; // 0 = front
            const out = moved && pos === PROJECTS.length - 1; // the card that just left the front
            const rise = moved && pos === 0; // the card that just came forward
            return (
              <a key={proj.key} href={`/work/${proj.slug}`} className={`hi-card${out ? " out" : ""}${rise ? " in" : ""}`} data-pos={Math.min(pos, 3)} tabIndex={pos === 0 ? 0 : -1} aria-hidden={pos === 0 ? undefined : true}>
                {[0, 1, 2].map((k) => {
                  const on = pos === 0 ? k === f : out ? k === 2 : k === 0; // a leaving card holds its last frame
                  // cards in the pile only show their first frame; the other two load once the card is next up
                  if (k > 0 && i > Math.floor(tick / 3) + 1) return null;
                  return (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={k} className={`hi-frame${on ? " on" : ""}`} src={`/hero/${proj.key}-${k + 1}-1200.webp`} srcSet={`/hero/${proj.key}-${k + 1}-640.webp 640w, /hero/${proj.key}-${k + 1}-1200.webp 1200w`} sizes="(max-width: 860px) 92vw, 46vw" alt={on && pos === 0 ? proj.alts[k] : ""} loading={i === 0 && k === 0 ? "eager" : "lazy"} decoding="async" />
                  );
                })}
                <span className="hi-tag">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/hero/logos/${proj.key}.svg`} alt="" className={`hi-logo hi-logo-${proj.key}`} />
                </span>
                <span className="hi-cap">
                  <b>{proj.name}</b>
                  <span className="hi-bars" aria-hidden="true" key={pos === 0 ? step : "idle"}>{[0, 1, 2].map((k) => <i key={k} className={pos === 0 && k < f ? "full" : pos === 0 && k === f ? "run" : ""} />)}</span>
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
