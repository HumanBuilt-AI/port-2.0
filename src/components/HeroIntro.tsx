"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/**
 * Alternative hero (preview only, see /hero-preview), from Scott's Figma frame.
 * Left: "I'm Scott. A [word] human living and working in Chicago." The word changes like a
 * split-flap board: each letter riffles through a few characters, then lands, left to right.
 * Right: a deck of real project shots. The front card steps through a project's three frames
 * with a slow push-in; after the third it slides away and the next project comes forward.
 * Reduced motion: first word and first frame, no movement.
 */
const WORDS = ["passionate", "multifaceted", "empathetic", "mindful", "practical"];
const FLAP_CHARS = "abcdefghijklmnopqrstuvwxyz";
const FLAP_MS = 55;
const WORD_MS = 3200;

const PROJECTS = [
  { name: "Verizon / IndyCar", slug: "verizon-indycar", key: "indycar", alts: ["Four Nokia phones showing the IndyCar app screens", "A hand holding a phone with the track map", "A finger tapping a stop on the track map"] },
  { name: "Chipotle / RAINCHECK", slug: "chipotle-raincheck", key: "raincheck", alts: ["A phone showing the 'Our doors are closed' screen", "The free burrito offer on a phone", "The free burrito pass being added to Apple Wallet"] },
  { name: "Aon / Horizon", slug: "aon-horizon", key: "aon", alts: ["The Horizon site climate risk tabs", "The climate risk map dashboard on a laptop", "A hand-drawn sketch of the dashboard"] },
];
const FRAME_MS = 3200;

const article = (w: string) => (/^[aeiou]/i.test(w) ? "An" : "A");

const RM = "(prefers-reduced-motion: reduce)";
function useReducedMotion() {
  return useSyncExternalStore(
    (cb) => { const m = window.matchMedia(RM); m.addEventListener("change", cb); return () => m.removeEventListener("change", cb); },
    () => window.matchMedia(RM).matches,
    () => false,
  );
}

/** One word on a split-flap board. Cells riffle through letters, then settle in order. */
function FlapWord({ word }: { word: string }) {
  const [cells, setCells] = useState<string[]>(word.split(""));
  const shown = useRef(word);
  useEffect(() => {
    if (shown.current === word) return;
    const from = shown.current;
    shown.current = word;
    const len = Math.max(from.length, word.length);
    let tick = 0;
    const id = window.setInterval(() => {
      tick++;
      const next: string[] = [];
      let done = true;
      for (let i = 0; i < len; i++) {
        const settleAt = 3 + i; // later letters land later
        if (tick >= settleAt) { if (i < word.length) next.push(word[i]); }
        else { done = false; next.push(FLAP_CHARS[(tick * 7 + i * 3) % FLAP_CHARS.length]); }
      }
      setCells(next);
      if (done) window.clearInterval(id);
    }, FLAP_MS);
    return () => window.clearInterval(id);
  }, [word]);
  return (
    <span className="flap" aria-hidden="true">
      {cells.map((c, i) => <span className="flap-c" key={`${i}-${c}`}>{c}</span>)}
    </span>
  );
}

export function HeroIntro() {
  const reduce = useReducedMotion();
  const [w, setW] = useState(0);
  const [step, setStep] = useState(0); // 0..8 across all projects

  useEffect(() => {
    if (reduce) return;
    const a = window.setInterval(() => setW((x) => (x + 1) % WORDS.length), WORD_MS);
    const b = window.setInterval(() => setStep((x) => (x + 1) % (PROJECTS.length * 3)), FRAME_MS);
    return () => { window.clearInterval(a); window.clearInterval(b); };
  }, [reduce]);

  const word = WORDS[w];
  const p = Math.floor(step / 3), f = step % 3;
  const label = `I’m Scott. A ${WORDS.slice(0, -1).join(", ")} and ${WORDS[WORDS.length - 1]} human living and working in Chicago.`;

  return (
    <section className="hi" id="hero-intro" aria-labelledby="hi-h">
      <div className="hi-in">
        <div className="hi-copy">
          <p className="hi-kicker" aria-label={label}>
            <span aria-hidden="true">I’m Scott. {article(word)} </span>
            <FlapWord word={word} />
            <span aria-hidden="true"> human living and working in Chicago.</span>
          </p>
          <h1 id="hi-h">AI-fluent creative technologist.</h1>
          <p className="hi-lede">Designer by trade, technologist by instinct. I find the idea worth building and prototype it into something real, with AI in the loop.</p>
        </div>

        <div className="hi-deck" aria-label="Recent work">
          {PROJECTS.map((proj, i) => {
            const pos = (i - p + PROJECTS.length) % PROJECTS.length; // 0 = front
            return (
              <a key={proj.key} href={`/work/${proj.slug}`} className="hi-card" data-pos={pos} tabIndex={pos === 0 ? 0 : -1} aria-hidden={pos === 0 ? undefined : true}>
                {[0, 1, 2].map((k) => {
                  const on = pos === 0 ? k === f : k === 0;
                  return (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={k} className={`hi-frame${on ? " on" : ""}`} src={`/hero/${proj.key}-${k + 1}-1200.webp`} srcSet={`/hero/${proj.key}-${k + 1}-640.webp 640w, /hero/${proj.key}-${k + 1}-1200.webp 1200w`} sizes="(max-width: 860px) 92vw, 46vw" alt={on && pos === 0 ? proj.alts[k] : ""} loading={i === 0 && k === 0 ? "eager" : "lazy"} decoding="async" />
                  );
                })}
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
