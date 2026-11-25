"use client";

import { useEffect, useState } from "react";
import { HeroIllustration } from "@/components/HeroIllustration";
import { ArrowCircle } from "@/components/ArrowCircle";

/**
 * Alternative hero (preview only, see /hero-preview): "I am a ___ creative technologist."
 * The word types in, gets selected, clears, and the next one types. Each word brings its own
 * muted tint, shared with the illustration panel. Reduced motion shows the first word, still.
 */
const WORDS: { w: string; tint: string }[] = [
  { w: "multifaceted", tint: "#E4E3DE" },
  { w: "passionate", tint: "#F4D3C8" },
  { w: "empathetic", tint: "#DDCCFD" },
  { w: "mindful", tint: "#D7E3D9" },
  { w: "practical", tint: "#FFE99D" },
];
const TYPE_MS = 75, HOLD_MS = 1500, SELECT_MS = 650, GAP_MS = 450;
const article = (w: string) => (/^[aeiou]/i.test(w) ? "an" : "a");

export function HeroIntro() {
  const [i, setI] = useState(0);
  const [n, setN] = useState(WORDS[0].w.length);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let alive = true;
    const timers: number[] = [];
    const wait = (ms: number) => new Promise<void>((r) => timers.push(window.setTimeout(r, ms)));
    (async () => {
      let k = 0;
      await wait(HOLD_MS);
      while (alive) {
        setSelected(true); await wait(SELECT_MS); if (!alive) return;
        setSelected(false); setN(0); await wait(GAP_MS); if (!alive) return;
        k = (k + 1) % WORDS.length; setI(k);
        for (let c = 1; c <= WORDS[k].w.length && alive; c++) { setN(c); await wait(TYPE_MS); }
        await wait(HOLD_MS);
      }
    })();
    return () => { alive = false; timers.forEach(clearTimeout); };
  }, []);

  const { w, tint } = WORDS[i];
  const all = WORDS.map((x) => x.w);
  const label = `I am a ${all.slice(0, -1).join(", ")} and ${all[all.length - 1]} creative technologist.`;

  return (
    <section className="hi" id="hero-intro" aria-labelledby="hi-h" style={{ "--hi-tint": tint } as React.CSSProperties}>
      <div className="hi-in">
        <div className="hi-copy">
          <span className="hi-who">Scott Galetto · Chicago</span>
          <h1 id="hi-h" aria-label={label}>
            <span aria-hidden="true">
              I am {article(w)}{" "}
              <span className={`hi-word${selected ? " sel" : ""}`}>{w.slice(0, n)}</span>
              <span className="hi-caret" />
              <br />
              creative technologist.
            </span>
          </h1>
          <p className="hi-lede">Half designer, half technologist. I find the idea worth building, then prototype it into something real, with AI in the loop.</p>
          <div className="hi-ctas">
            <a className="btn fill" href="#work">View selected work <ArrowCircle /></a>
            <a className="btn" href="#flow">How I work</a>
          </div>
        </div>
        <div className="hi-figure">
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
}
