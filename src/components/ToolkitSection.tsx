"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SectionBadge } from "@/components/SectionBadge";
import { DISCIPLINES, FREQS, type Discipline, type Freq } from "@/content/toolkit";

/**
 * Toolkit (Section 04): the toolkit crew. Each discipline is a little ink character whose
 * body is a stack of layers, one layer per tool, thicker for tools used more often
 * (the idea from the v1 site's stacks, redrawn in the "funky brand" Taste collection style:
 * cream paper, black ink, flat colour, characters with big eyes and mitten hands).
 *
 * - Tap a character: it hops, the others turn to look, and its tools list on the card.
 * - The Daily / Regular / Familiar switches pull those layers out of every body.
 * - Eyes follow the pointer, characters blink and bob while the section is on screen.
 * - The first frame is complete without JS; motion only adds to it. Reduced motion:
 *   no drop-in, bob, hop or blink; eyes stay still.
 */

const T: Record<Freq, number> = { Daily: 11, Regular: 8, Familiar: 5 }; // layer thickness (viewBox units)
const FLOOR = 186;
const BASE = FLOOR - 20; // bottom of the body, top of the legs
const BW = 64; // body width
const ORDER: Record<Freq, number> = { Daily: 0, Regular: 1, Familiar: 2 };

type Layer = { name: string; f: Freq; y: number; t: number; x: number; w: number; on: boolean };

/** Stack a discipline's tools bottom-up (daily at the bottom); hidden ones collapse where they sit. */
function stack(d: Discipline, ci: number, on: Record<Freq, boolean>) {
  const tools = [...d.tools].sort((a, b) => ORDER[a[1]] - ORDER[b[1]]);
  let top = BASE;
  const layers: Layer[] = tools.map(([name, f], li) => {
    const t = T[f];
    const vis = on[f];
    const dx = ((ci * 7 + li * 13) % 5) - 2; // hand-stacked wobble, deterministic
    const dw = ((ci * 3 + li * 11) % 5) - 2;
    const y = vis ? top - t : top;
    if (vis) top -= t;
    return { name, f, y, t, x: 60 - BW / 2 + dx - dw / 2, w: BW + dw, on: vis };
  });
  return { layers, top, h: BASE - top };
}

const pad = (n: number) => String(n).padStart(2, "0");

function Face({ d, h }: { d: Discipline; h: number }) {
  const smile = h >= 20 ? 1 : 0;
  if (d.look === "shades") {
    return (
      <g className="tk-eyes">
        <rect x="34" y="-12" width="52" height="5" rx="2" className="ink" />
        <rect x="36" y="-12" width="21" height="14" rx="5" className="ink" />
        <rect x="63" y="-12" width="21" height="14" rx="5" className="ink" />
        <g className="tk-pupils">
          <rect x="41" y="-8" width="9" height="2.6" rx="1.3" className="paper" />
          <rect x="68" y="-8" width="9" height="2.6" rx="1.3" className="paper" />
        </g>
        <path d="M54 12 h12" className="tk-line" style={{ opacity: smile }} />
      </g>
    );
  }
  if (d.look === "cyclops") {
    return (
      <g className="tk-eyes">
        <circle cx="60" cy="-4" r="13" className="eye" />
        <g className="tk-pupils"><circle cx="60" cy="-4" r="5.5" className="ink" /></g>
        <path d="M54 14 q6 4 12 0" className="tk-line" style={{ opacity: smile }} />
      </g>
    );
  }
  return (
    <g className="tk-eyes">
      <circle cx="49" cy="-3" r="9" className="eye" />
      <circle cx="71" cy="-3" r="9" className="eye" />
      <g className="tk-pupils">
        <circle cx="49" cy="-3" r="4" className="ink" />
        <circle cx="71" cy="-3" r="4" className="ink" />
      </g>
      <path d="M55 12 q5 4 10 0" className="tk-line" style={{ opacity: smile }} />
    </g>
  );
}

function Hat({ d }: { d: Discipline }) {
  switch (d.look) {
    case "antenna":
      return (
        <g>
          <path d="M60 -12 V-27" className="tk-line" />
          <circle cx="60" cy="-31" r="4.5" className="tk-bulb" />
        </g>
      );
    case "beret":
      return (
        <g>
          <path d="M36 -8 C 37 -24, 80 -27, 84 -9 C 70 -13, 50 -13, 36 -8 Z" className="ink" />
          <path d="M63 -22 l2 -6" className="tk-line" />
        </g>
      );
    case "tuft":
      return <path d="M57 -12 q-4 -9 -9 -10 M60 -12 q0 -10 3 -14 M63 -12 q5 -8 10 -8" className="tk-line" />;
    default:
      return null;
  }
}

function Character({
  d, ci, on, selected, onPick, setRefs,
}: {
  d: Discipline; ci: number; on: Record<Freq, boolean>; selected: boolean;
  onPick: (i: number) => void;
  setRefs: (i: number, r: { svg: SVGSVGElement | null; pupils: SVGGElement | null; eyes: SVGGElement | null; hop: SVGGElement | null; top: number }) => void;
}) {
  const { layers, top, h } = useMemo(() => stack(d, ci, on), [d, ci, on]);
  const svg = useRef<SVGSVGElement>(null);
  const hop = useRef<SVGGElement>(null);
  const top$ = useRef<SVGGElement>(null);

  useEffect(() => {
    const t = top$.current;
    setRefs(ci, {
      svg: svg.current,
      pupils: t?.querySelector(".tk-pupils") ?? null,
      eyes: t?.querySelector(".tk-eyes") ?? null,
      hop: hop.current,
      top,
    });
  }, [ci, top, setRefs]);

  const shoulder = Math.min(10, h / 2);
  const visible = layers.filter((l) => l.on).length;

  return (
    <button
      type="button"
      className={`tk-char${selected ? " is-on" : ""}`}
      style={{ "--c": d.color, "--ci": ci } as React.CSSProperties}
      aria-pressed={selected}
      aria-label={`${d.name}: ${d.tools.length} tools`}
      onClick={() => onPick(ci)}
    >
      <svg ref={svg} viewBox="10 52 100 142" className="tk-svg" aria-hidden="true">
        <path d={`M-14 ${FLOOR + 0.5} H134`} className="tk-floor" />
        <ellipse cx="60" cy={FLOOR + 1} rx="36" ry="5.5" className="tk-spot" />
        <g ref={hop} className="tk-hop">
          <g className="tk-bob">
            {/* legs + feet */}
            <path d={`M50 ${BASE} L48 ${FLOOR - 2} M70 ${BASE} L72 ${FLOOR - 2}`} className="tk-line" />
            <ellipse cx="43.5" cy={FLOOR - 2} rx="6.5" ry="3.2" className="ink" />
            <ellipse cx="76.5" cy={FLOOR - 2} rx="6.5" ry="3.2" className="ink" />
            {/* body: one layer per tool */}
            <g className="tk-body">
              {layers.map((l, li) => (
                <g key={l.name} className="tk-layer" style={{ transform: `translateY(${l.y}px)` }}>
                  <g className="tk-drop" style={{ "--d": `${ci * 90 + li * 45}ms` } as React.CSSProperties}>
                    <rect x={l.x} y="0" width={l.w} height={l.t} rx="3.5" className={`tk-slab${l.on ? "" : " off"}`} />
                  </g>
                </g>
              ))}
            </g>
            {/* head, arms and hat ride on top of the stack */}
            <g ref={top$} className="tk-top" style={{ transform: `translateY(${top}px)` }}>
              <g className="tk-pop" style={{ "--d": `${ci * 90 + layers.length * 45}ms` } as React.CSSProperties}>
                <g className="tk-arms" style={{ transform: `translateY(${shoulder}px)` }}>
                  <g className="tk-arm-l">
                    <path d="M29 0 C 21 5, 18 14, 20 23" className="tk-line" />
                    <circle cx="20" cy="27" r="4.6" className="eye" />
                  </g>
                  <g className="tk-arm-r">
                    <path d="M91 0 C 99 5, 102 14, 100 23" className="tk-line" />
                    <circle cx="100" cy="27" r="4.6" className="eye" />
                  </g>
                </g>
                {d.look === "windup" && (
                  <g style={{ transform: `translateY(${Math.max(4, h / 2)}px)` }} className="tk-keypos">
                    <path d="M92 0 h6" className="tk-line" />
                    <g className="tk-key">
                      <path d="M98 0 l8 -9 q4 -4 7 0 q3 4 -2 7 z M98 0 l8 9 q4 4 7 0 q3 -4 -2 -7 z" className="ink" />
                    </g>
                  </g>
                )}
                <Face d={d} h={h} />
                <Hat d={d} />
                {selected && (
                  <g className="tk-bubble" style={{ transform: `translateY(${d.look === "antenna" || d.look === "beret" ? -58 : -44}px)` }}>
                    <g className="tk-bubble-in">
                      <rect x="27" y="-9" width="66" height="18" rx="9" className="eye" />
                      <path d="M55.5 7.5 L60 14.6 L64.5 7.5 Z" className="paper" />
                      <path d="M55.6 9 L60 14.6 L64.4 9" className="tk-line" />
                      <text x="60" y="3.6" textAnchor="middle">{visible} {visible === 1 ? "tool" : "tools"}</text>
                    </g>
                  </g>
                )}
              </g>
            </g>
          </g>
        </g>
      </svg>
      <span className="tk-name">
        <span>{d.name}</span>
        <i>{pad(visible)}</i>
      </span>
    </button>
  );
}

type Refs = { svg: SVGSVGElement | null; pupils: SVGGElement | null; eyes: SVGGElement | null; hop: SVGGElement | null; top: number };

export function ToolkitSection() {
  const [sel, setSel] = useState(0);
  const [on, setOn] = useState<Record<Freq, boolean>>({ Daily: true, Regular: true, Familiar: true });
  const root = useRef<HTMLElement>(null);
  const refs = useRef<Refs[]>([]);
  const look = useRef<{ x: number; y: number } | null>(null); // where the crew is looking (client px)
  const override = useRef<{ x: number; y: number; who: number; until: number } | null>(null);
  const raf = useRef(0);
  const reduced = useRef(false);

  const setRefs = useCallback((i: number, r: Refs) => { refs.current[i] = r; }, []);

  /** Point every pair of pupils at the pointer, or at whoever was just picked. */
  const aim = useCallback(() => {
    raf.current = 0;
    const now = performance.now();
    const ov = override.current && override.current.until > now ? override.current : null;
    const tgt = ov ?? look.current;
    refs.current.forEach((r, i) => {
      if (!r?.svg || !r.pupils) return;
      if (!tgt || (ov && ov.who === i)) { r.pupils.setAttribute("transform", ""); return; }
      const b = r.svg.getBoundingClientRect();
      const s = b.width / 100;
      const ex = b.left + 50 * s;
      const ey = b.top + (r.top - 4 - 52) * s;
      const dx = tgt.x - ex, dy = tgt.y - ey;
      const dist = Math.hypot(dx, dy) || 1;
      const m = Math.min(1, dist / 140) * 3.4;
      r.pupils.setAttribute("transform", `translate(${((dx / dist) * m).toFixed(2)} ${((dy / dist) * m).toFixed(2)})`);
    });
  }, []);
  const queue = useCallback(() => { if (!raf.current) raf.current = requestAnimationFrame(aim); }, [aim]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced.current) return;

    // drop the layers in the first time the board scrolls into view (only if it starts off screen)
    const board = el.querySelector(".tk-board");
    if (board && board.getBoundingClientRect().top > window.innerHeight * 0.9) el.classList.add("armed");

    let blink = 0;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      look.current = { x: e.clientX, y: e.clientY };
      queue();
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        if (el.classList.contains("armed") && e.intersectionRatio > 0.25) el.classList.replace("armed", "built");
        el.classList.add("live");
        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("scroll", queue, { passive: true });
        if (!blink) blink = window.setInterval(() => {
          const r = refs.current[Math.floor(Math.random() * refs.current.length)];
          const g = r?.eyes;
          if (!g) return;
          g.classList.add("blink");
          window.setTimeout(() => g.classList.remove("blink"), 190);
        }, 1300);
      } else {
        el.classList.remove("live");
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("scroll", queue);
        window.clearInterval(blink); blink = 0;
      }
    }, { threshold: [0, 0.25] });
    io.observe(el.querySelector(".tk-board") ?? el);
    return () => {
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", queue);
      window.clearInterval(blink);
      cancelAnimationFrame(raf.current);
    };
  }, [queue]);

  // pupils follow the stack top when switches change the body heights
  useEffect(() => { queue(); }, [on, queue]);

  const pick = (i: number) => {
    setSel(i);
    if (reduced.current) return;
    const r = refs.current[i];
    r?.hop?.animate(
      [
        { transform: "translateY(0) scale(1, 1)" },
        { transform: "translateY(2px) scale(1.06, .92)", offset: 0.18 },
        { transform: "translateY(-16px) scale(.96, 1.05)", offset: 0.5 },
        { transform: "translateY(1px) scale(1.04, .95)", offset: 0.82 },
        { transform: "translateY(0) scale(1, 1)" },
      ],
      { duration: 560, easing: "cubic-bezier(.3,.7,.4,1)" },
    );
    if (r?.svg) {
      const b = r.svg.getBoundingClientRect();
      override.current = { x: b.left + b.width / 2, y: b.top + ((r.top - 52) / 142) * b.height, who: i, until: performance.now() + 1500 };
      queue();
      window.setTimeout(queue, 1520);
    }
  };

  const d = DISCIPLINES[sel];
  const counts = FREQS.map((f) => d.tools.filter((t) => t[1] === f).length);
  const total = DISCIPLINES.reduce((n, x) => n + x.tools.filter((t) => on[t[1]]).length, 0);

  return (
    <section className="toolkit" id="toolkit" aria-labelledby="toolkit-h" ref={root}>
      <div className="in">
        <header className="about-head tk-head">
          <SectionBadge num="04" label="Toolkit" />
          <h2 id="toolkit-h" className="h2">The toolkit, in daily use. <span className="soft">One layer per tool.</span></h2>
          <p className="lede tk-lede">Design, AI, code and automation, by how often I reach for them. Each character is a discipline, and the thicker the layer, the more I use that tool. Pick one to see what’s in it.</p>
        </header>

        <div className="tk-board">
          <div className="tk-stage">
            <div className="tk-crew" role="group" aria-label="Disciplines">
              {DISCIPLINES.map((x, i) => (
                <Character key={x.key} d={x} ci={i} on={on} selected={i === sel} onPick={pick} setRefs={setRefs} />
              ))}
            </div>

            <div className="tk-panel">
              <div className="tk-switches" role="group" aria-label="Show tools I use">
                {FREQS.map((f) => (
                  <button
                    key={f}
                    type="button"
                    role="switch"
                    aria-checked={on[f]}
                    className="tk-sw"
                    onClick={() => setOn((o) => ({ ...o, [f]: !o[f] }))}
                  >
                    <span className="tk-sw-track" aria-hidden="true"><span className="tk-sw-knob" /></span>
                    <span className="tk-sw-label">{f}</span>
                    <span className="tk-thk" style={{ height: T[f] }} aria-hidden="true" />
                  </button>
                ))}
              </div>
              <p className="tk-readout" aria-live="polite"><b>{pad(total)}</b> <span>tools showing</span></p>
            </div>
          </div>

          <div className="tk-card" aria-live="polite">
            <p className="tk-eyebrow"><i style={{ background: d.color }} aria-hidden="true" />In the stack</p>
            <h3>{d.name}</h3>
            <p className="tk-sum">
              {d.tools.length} tools
              {FREQS.map((f, i) => (counts[i] ? <span key={f}> · {counts[i]} {f.toLowerCase()}</span> : null))}
            </p>
            <ul className="tk-list" key={d.key}>
              {[...d.tools].sort((a, b) => ORDER[a[1]] - ORDER[b[1]]).map(([name, f], i) => (
                <li key={name} className={on[f] ? "" : "off"} style={{ "--i": i, "--c": d.color } as React.CSSProperties}>
                  <span className="tk-mini" style={{ height: T[f] }} aria-hidden="true" />
                  <span className="tk-tool">{name}</span>
                  <span className="tk-freq">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
