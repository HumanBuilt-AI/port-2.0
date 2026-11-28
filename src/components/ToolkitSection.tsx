"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { GLYPHS, SectionBadge } from "@/components/SectionBadge";
import { DISCIPLINES, FREQS, type Freq } from "@/content/toolkit";

/**
 * Toolkit (Section 04): every tool on one board, sorted into three shelves by how often
 * Scott reaches for it (daily, regular, familiar). Pick a discipline and its tools light up
 * and slide to the front of each shelf (GSAP Flip); the dot-matrix counts follow.
 * Hovering a tool previews its whole discipline. Reduced motion: no slide, no fade-in.
 */

const ALL = "all";
const pad = (n: number) => String(n).padStart(2, "0");
const METER: Record<Freq, number> = { Daily: 3, Regular: 2, Familiar: 1 };

const TOOLS = DISCIPLINES.flatMap((d) => d.tools.map(([name, f]) => ({ name, f, k: d.key })));
const nameOf = (k: string) => DISCIPLINES.find((d) => d.key === k)?.name ?? "";

/** A number as a 5 × 7 dot matrix, same drawing as the section badges. */
function DotNum({ n, label }: { n: number; label?: string }) {
  const P = 4, R = 1.55;
  const chars = pad(n).split("");
  const cols = chars.length * 6 - 1;
  return (
    <svg className="dotnum" viewBox={`0 0 ${cols * P} ${7 * P}`} role="img" aria-label={label ?? String(n)}>
      {chars.map((c, ci) =>
        (GLYPHS[c] ?? GLYPHS["0"]).map((row, y) =>
          row.split("").map((bit, x) => (
            <circle key={`${ci}${x}${y}`} cx={(ci * 6 + x) * P + P / 2} cy={y * P + P / 2} r={R} className={bit === "1" ? "on" : "off"} />
          )),
        ),
      )}
    </svg>
  );
}

export function ToolkitSection() {
  const [sel, setSel] = useState<string>(ALL);
  const [hov, setHov] = useState<string | null>(null);
  const root = useRef<HTMLElement>(null);
  const flip = useRef<Flip.FlipState | null>(null);
  const reduced = useRef(false);

  useEffect(() => {
    gsap.registerPlugin(Flip);
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = root.current;
    if (!el || reduced.current || !("IntersectionObserver" in window)) return;
    const board = el.querySelector(".tk-board");
    if (!board || board.getBoundingClientRect().top < window.innerHeight * 0.9) return; // already on screen: leave it
    el.classList.add("armed");
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.replace("armed", "shown"); io.disconnect(); }
    }, { threshold: 0.2 });
    io.observe(board);
    return () => io.disconnect();
  }, []);

  useLayoutEffect(() => {
    const st = flip.current;
    if (!st) return;
    flip.current = null;
    Flip.from(st, { duration: 0.55, ease: "power3.inOut", stagger: 0.008, simple: true });
  }, [sel]);

  const pick = (k: string) => {
    if (k === sel) return;
    if (!reduced.current && root.current) flip.current = Flip.getState(root.current.querySelectorAll(".tk-chip"));
    setSel(k);
  };

  const lit = hov ?? (sel === ALL ? null : sel); // which discipline is highlighted right now
  const match = (k: string) => lit === null || k === lit;
  const shown = TOOLS.filter((t) => match(t.k));
  const counts = FREQS.map((f) => shown.filter((t) => t.f === f).length);

  let chipIndex = 0;

  return (
    <section className="toolkit" id="toolkit" aria-labelledby="toolkit-h" ref={root}>
      <div className="in">
        <header className="about-head tk-head">
          <SectionBadge num="04" label="Toolkit" />
          <h2 id="toolkit-h" className="h2">The toolkit, <span className="soft">in daily use.</span></h2>
          <p className="lede tk-lede">Design, AI, code and automation, sorted by how often I reach for them. Pick a discipline to see where it sits.</p>
        </header>

        <div className="tk-board">
          <div className="tk-top">
            <div className="tk-filters" role="group" aria-label="Filter by discipline">
              {[{ key: ALL, name: "All", n: TOOLS.length }, ...DISCIPLINES.map((d) => ({ key: d.key, name: d.name, n: d.tools.length }))].map((d) => (
                <button key={d.key} type="button" className="tk-filter" aria-pressed={sel === d.key} onClick={() => pick(d.key)}>
                  {d.name}
                  <span className="tk-n">{pad(d.n)}</span>
                </button>
              ))}
            </div>
            <div className="tk-readout" aria-live="polite">
              <DotNum n={shown.length} label={`${shown.length} tools`} />
              <span><small>{lit ? "Showing" : "All tools"}</small>{lit ? nameOf(lit) : "In rotation"}</span>
            </div>
          </div>

          <div className="tk-shelves">
            {FREQS.map((f, fi) => {
              const list = TOOLS.filter((t) => t.f === f);
              // the picked discipline slides to the front; hover only highlights
              const ordered = sel === ALL ? list : [...list.filter((t) => t.k === sel), ...list.filter((t) => t.k !== sel)];
              return (
                <div className="tk-shelf" key={f}>
                  <div className="tk-shelf-head">
                    <span className="tk-meter" aria-hidden="true">{[0, 1, 2].map((i) => <i key={i} className={i < METER[f] ? "on" : ""} />)}</span>
                    <span className="tk-freq">{f}</span>
                    <DotNum n={counts[fi]} label={`${counts[fi]} ${f.toLowerCase()}`} />
                  </div>
                  <ul className="tk-chips">
                    {ordered.map((t) => (
                      <li
                        key={t.name}
                        data-flip-id={t.name}
                        className={`tk-chip${lit !== null && t.k === lit ? " is-lit" : ""}${match(t.k) ? "" : " is-dim"}`}
                        style={{ "--i": chipIndex++ } as React.CSSProperties}
                        onPointerEnter={(e) => { if (e.pointerType === "mouse") setHov(t.k); }}
                        onPointerLeave={(e) => { if (e.pointerType === "mouse") setHov(null); }}
                      >
                        {t.name}
                        <span className="sr-only">, {nameOf(t.k)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
