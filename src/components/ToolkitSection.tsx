"use client";
import { useEffect, useRef, useState } from "react";
import { GLYPHS, SectionBadge } from "@/components/SectionBadge";
import { ArrowCircle } from "@/components/ArrowCircle";
import { DISCIPLINES, FREQS, type Discipline, type Freq } from "@/content/toolkit";

/**
 * Toolkit (Section 04): six stacks as six dashboard cards. Each card draws its tools as a
 * cluster of overlapping translucent circles, one per tool, sized by how often Scott uses it
 * (daily largest). Click a card to open the stack: the same cluster, numbered, with the list.
 * That's the only interaction. Bubbles pop in the first time the grid scrolls into view;
 * reduced motion skips that.
 */

const pad = (n: number) => String(n).padStart(2, "0");
const R: Record<Freq, number> = { Daily: 15, Regular: 10.5, Familiar: 7 };

/** Card look per stack, picked to read like the reference dashboards: mostly greys, one lime, one coral, one black. */
const THEME: Record<string, string> = { dev: "t-white", design: "t-lime", ai: "t-black", data: "t-grey", auto: "t-coral", analytics: "t-white" };
const SPAN: Record<string, string> = { dev: "s4", design: "s4", ai: "s4", data: "s4", auto: "s4", analytics: "s4" };

type Bubble = { name: string; f: Freq; x: number; y: number; r: number; n: number };

/** Pack a stack's tools into a loose cluster (deterministic, so server and client agree). */
function pack(d: Discipline) {
  const tools = [...d.tools].map(([name, f], i) => ({ name, f, i })).sort((a, b) => R[b.f] - R[a.f] || a.i - b.i);
  const placed: Bubble[] = [];
  tools.forEach((t, k) => {
    const r = R[t.f];
    if (k === 0) { placed.push({ name: t.name, f: t.f, x: 0, y: 0, r, n: k + 1 }); return; }
    // walk out along a golden-angle spiral until the circle only overlaps its neighbours a little
    for (let s = 0; s < 4000; s++) {
      const a = s * 2.39996 + k * 0.7;
      const dist = 2 + s * 0.12;
      const x = Math.cos(a) * dist * 1.35, y = Math.sin(a) * dist * 0.8;
      if (placed.every((p) => Math.hypot(p.x - x, p.y - y) > (p.r + r) * 0.78)) {
        placed.push({ name: t.name, f: t.f, x, y, r, n: k + 1 });
        return;
      }
    }
  });
  const minX = Math.min(...placed.map((p) => p.x - p.r)), maxX = Math.max(...placed.map((p) => p.x + p.r));
  const minY = Math.min(...placed.map((p) => p.y - p.r)), maxY = Math.max(...placed.map((p) => p.y + p.r));
  const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
  const bubbles = placed.map((p) => ({ ...p, x: +(p.x - cx).toFixed(2), y: +(p.y - cy).toFixed(2) }));
  return { bubbles, w: maxX - minX, h: maxY - minY };
}

const STACKS = DISCIPLINES.map((d) => ({ d, ...pack(d), counts: FREQS.map((f) => d.tools.filter((t) => t[1] === f).length) }));
type Stack = (typeof STACKS)[number];
// one scale for every card, so a circle means the same size everywhere
const VW = Math.max(...STACKS.map((s) => s.w)) + 8, VH = Math.max(...STACKS.map((s) => s.h)) + 8;

/** A number as a 5 × 7 dot matrix, same drawing as the section badges. */
function DotNum({ n }: { n: number }) {
  const P = 4, rr = 1.55;
  const chars = pad(n).split("");
  return (
    <svg className="dotnum" viewBox={`0 0 ${(chars.length * 6 - 1) * P} ${7 * P}`} aria-hidden="true">
      {chars.map((c, ci) =>
        (GLYPHS[c] ?? GLYPHS["0"]).map((row, y) =>
          row.split("").map((bit, x) => (
            <circle key={`${ci}${x}${y}`} cx={(ci * 6 + x) * P + P / 2} cy={y * P + P / 2} r={rr} className={bit === "1" ? "on" : "off"} />
          )),
        ),
      )}
    </svg>
  );
}

/** The cluster drawing. `numbered` adds the key numbers used in the open view. */
function Cluster({ s, numbered = false, hot = -1 }: { s: Stack; numbered?: boolean; hot?: number }) {
  const w = numbered ? s.w + 8 : VW, h = numbered ? s.h + 8 : VH;
  return (
    <svg className="tk-cluster" viewBox={`${-w / 2} ${-h / 2} ${w} ${h}`} aria-hidden="true">
      {/* satellite lines from the biggest bubble out to each node */}
      {s.bubbles.slice(1).map((b) => (
        <line key={`l${b.n}`} x1={s.bubbles[0].x} y1={s.bubbles[0].y} x2={b.x} y2={b.y} className="tk-spoke" />
      ))}
      {s.bubbles.map((b, i) => (
        <g key={b.name} className={`tk-b f-${b.f.toLowerCase()}${hot === b.n ? " hot" : ""}`} style={{ "--i": i } as React.CSSProperties} transform={`translate(${b.x} ${b.y})`}>
          <g className="tk-bi">
            <circle r={b.r} className="tk-disc" />
            {numbered ? (
              <text className="tk-num" y="0.35em" textAnchor="middle">{b.n}</text>
            ) : (
              <circle r={b.f === "Daily" ? 2.2 : b.f === "Regular" ? 1.5 : 1} className="tk-node" />
            )}
          </g>
        </g>
      ))}
    </svg>
  );
}

function Sheet({ s, onClose }: { s: Stack | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [hot, setHot] = useState(-1);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (s && !d.open) d.showModal();
    if (!s && d.open) d.close();
  }, [s]);
  return (
    <dialog
      ref={ref}
      className={`tk-sheet ${s ? THEME[s.d.key] : ""}`}
      onClose={onClose}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      aria-labelledby="tk-sheet-h"
    >
      {s && (
        <div className="tk-sheet-in">
          <div className="tk-sheet-art"><Cluster s={s} numbered hot={hot} /></div>
          <div className="tk-sheet-copy">
            <p className="tk-k">The stack</p>
            <h3 id="tk-sheet-h">{s.d.name}</h3>
            <p className="tk-sum">{s.d.tools.length} tools · {FREQS.map((f, i) => (s.counts[i] ? `${s.counts[i]} ${f.toLowerCase()}` : null)).filter(Boolean).join(" · ")}</p>
            {FREQS.map((f) => {
              const list = s.bubbles.filter((b) => b.f === f);
              if (!list.length) return null;
              return (
                <div className="tk-group" key={f}>
                  <p className="tk-k">{f}</p>
                  <ol>
                    {list.map((b) => (
                      <li key={b.name} onPointerEnter={() => setHot(b.n)} onPointerLeave={() => setHot(-1)}>
                        <span className="tk-ln">{pad(b.n)}</span>{b.name}
                      </li>
                    ))}
                  </ol>
                </div>
              );
            })}
          </div>
          <button type="button" className="tk-close" onClick={onClose} aria-label="Close">×</button>
        </div>
      )}
    </dialog>
  );
}

export function ToolkitSection() {
  const [open, setOpen] = useState<Stack | null>(null);
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const grid = el.querySelector(".tk-grid");
    if (!grid || grid.getBoundingClientRect().top < window.innerHeight * 0.9) return; // already on screen: leave it
    el.classList.add("armed");
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.replace("armed", "shown"); io.disconnect(); }
    }, { threshold: 0.15 });
    io.observe(grid);
    return () => io.disconnect();
  }, []);

  return (
    <section className="toolkit" id="toolkit" aria-labelledby="toolkit-h" ref={root}>
      <div className="in">
        <header className="about-head tk-head">
          <SectionBadge num="04" label="Toolkit" />
          <h2 id="toolkit-h" className="h2">The toolkit, <span className="soft">in daily use.</span></h2>
          <p className="lede tk-lede">Six stacks, one circle per tool. The bigger the circle, the more often I reach for it. Open a stack to see what’s in it.</p>
        </header>

        <div className="tk-grid">
          {STACKS.map((s) => (
            <button key={s.d.key} type="button" className={`tk-card ${THEME[s.d.key]} ${SPAN[s.d.key]}`} onClick={() => setOpen(s)} aria-haspopup="dialog">
              <span className="tk-card-top">
                <span className="tk-name">{s.d.name}</span>
                <DotNum n={s.d.tools.length} />
              </span>
              <Cluster s={s} />
              <span className="tk-card-foot">
                <span className="tk-mix">
                  {FREQS.map((f, i) => (s.counts[i] ? <span key={f}><i className={`k-${f.toLowerCase()}`} aria-hidden="true" />{s.counts[i]} {f.toLowerCase()}</span> : null))}
                </span>
                <ArrowCircle dir="ne" />
              </span>
              <span className="sr-only">{`, ${s.d.tools.length} tools. Open the stack.`}</span>
            </button>
          ))}
        </div>
      </div>
      <Sheet s={open} onClose={() => setOpen(null)} />
    </section>
  );
}
