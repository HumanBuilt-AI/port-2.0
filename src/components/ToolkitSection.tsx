"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { GLYPHS, SectionBadge } from "@/components/SectionBadge";
import { DISCIPLINES, FREQS, type Freq } from "@/content/toolkit";

/**
 * Toolkit (Section 04): one radial map of everything. Scott is the hub; each discipline is a
 * 60° sector; every tool is a translucent circle on one of three rings, so distance from the
 * centre reads as how often (daily closest, then regular, then familiar). Bird's-eye shows all
 * six stacks at once. Click a sector (or a key pill) and the map zooms into it in place, the
 * other stacks fade, and tool names appear along the radii. Esc, the hub or "All stacks" zooms
 * back out. Reduced motion: no zoom tween or pop-in, the view just switches.
 */

const V = 1100; // viewBox is centred: -550..550
const RING: Record<Freq, number> = { Daily: 200, Regular: 320, Familiar: 420 };
const BR: Record<Freq, number> = { Daily: 15, Regular: 12, Familiar: 8 };
const HUB = 52;
const SPAN = 60;
const HALF = SPAN / 2 - 2; // the wedge is drawn 2° short of each edge
const RI = HUB + 18, RO = 490;
const COLOR: Record<string, string> = { ai: "#1A1A1A", design: "#DCF26A", dev: "#9C9B97", data: "#F7B7A3", auto: "#5C5C59", analytics: "#C3DB52" };
const pad = (n: number) => String(n).padStart(2, "0");
const rad = (a: number) => (a * Math.PI) / 180;
const pt = (a: number, r: number) => [Math.cos(rad(a)) * r, Math.sin(rad(a)) * r] as const;
const f2 = (n: number) => +n.toFixed(2);
const ELBOW = 12; // how far the joining line drops below (or rises above) a column's end before it crosses over

type Tool = { name: string; f: Freq; u: number; v: number; x: number; y: number; r: number };

/**
 * Each frequency is a straight column across the wedge, square to its middle, so once a stack is
 * zoomed (and turned to point right) its tools line up and their names read level. Columns stay
 * inside the wedge's edges with room for the joining line to turn at the ends.
 * u: distance out from the hub, v: distance off the stack's middle.
 */
function placeColumn(names: string[], f: Freq, mid: number): Tool[] {
  const n = names.length, u = RING[f], r = BR[f];
  if (!n) return [];
  const room = u * Math.tan(rad(HALF)) - r - ELBOW - 4;
  const gap = n > 1 ? Math.min(2 * r + 24, (2 * room) / (n - 1)) : 0;
  const c = Math.cos(rad(mid)), sn = Math.sin(rad(mid));
  return names.map((name, j) => {
    const v = (j - (n - 1) / 2) * gap;
    return { name, f, u, v, x: f2(u * c - v * sn), y: f2(u * sn + v * c), r };
  });
}

/**
 * One dotted line per stack: hub to the top of the daily column, down it, across to the next column at
 * the end, back up it, and so on, so every tool is joined once and the line never runs through a name
 * (names sit to the right; the crossings turn below or above the column ends).
 * Drawn in the stack's own frame (u out, v across), then turned into place.
 */
function chainPath(tools: Tool[], mid: number) {
  const c = Math.cos(rad(mid)), sn = Math.sin(rad(mid));
  const P = (u: number, v: number) => `${f2(u * c - v * sn)} ${f2(u * sn + v * c)}`;
  const cols = FREQS.map((f) => tools.filter((t) => t.f === f)).filter((col) => col.length);
  let d = "";
  // hub to the first tool
  const first = cols[0][0];
  const L0 = Math.hypot(first.u, first.v);
  d += `M${P((first.u / L0) * (HUB + 5), (first.v / L0) * (HUB + 5))}L${P(first.u - (first.u / L0) * (first.r + 5), first.v - (first.v / L0) * (first.r + 5))}`;
  let down = true; // walking the column top to bottom
  cols.forEach((col, ci) => {
    const row = down ? col : [...col].reverse();
    for (let k = 1; k < row.length; k++) {
      const A = row[k - 1], B = row[k], s = down ? 1 : -1;
      d += `M${P(A.u, A.v + s * (A.r + 5))}L${P(B.u, B.v - s * (B.r + 5))}`;
    }
    const next = cols[ci + 1];
    if (!next) return;
    const A = row[row.length - 1], B = down ? next[next.length - 1] : next[0], s = down ? 1 : -1;
    const turn = s > 0 ? Math.max(A.v + A.r, B.v + B.r) + ELBOW : Math.min(A.v - A.r, B.v - B.r) - ELBOW;
    d += `M${P(A.u, A.v + s * (A.r + 5))}L${P(A.u, turn)}L${P(B.u, turn)}L${P(B.u, B.v + s * (B.r + 5))}`;
    down = !down;
  });
  return d;
}

/** Frequency ring as a hexagon: one flat side per stack, so each column sits on its ring. */
const hexRing = (u: number) => {
  const R = u / Math.cos(rad(SPAN / 2));
  return Array.from({ length: 6 }, (_, k) => pt(-120 + k * 60, R).map(f2).join(",")).join(" ");
};

const SECTORS = DISCIPLINES.map((d, i) => {
  const mid = -90 + i * SPAN;
  const tools: Tool[] = FREQS.flatMap((f) => placeColumn(d.tools.filter((t) => t[1] === f).map((t) => t[0]), f, mid));
  // annular wedge behind the tools
  const a0 = mid - HALF, a1 = mid + HALF, ri = RI, ro = RO;
  const [p1x, p1y] = pt(a0, ri), [p2x, p2y] = pt(a0, ro), [p3x, p3y] = pt(a1, ro), [p4x, p4y] = pt(a1, ri);
  const wedge = `M${f2(p1x)} ${f2(p1y)} L${f2(p2x)} ${f2(p2y)} A${ro} ${ro} 0 0 1 ${f2(p3x)} ${f2(p3y)} L${f2(p4x)} ${f2(p4y)} A${ri} ${ri} 0 0 0 ${f2(p1x)} ${f2(p1y)} Z`;
  const [lx, ly] = pt(mid, RO + 30);
  const counts = FREQS.map((f) => d.tools.filter((t) => t[1] === f).length);
  return { d, i, mid, tools, wedge, chain: chainPath(tools, mid), label: { x: f2(lx), y: f2(ly) }, counts, color: COLOR[d.key] };
});
type Sector = (typeof SECTORS)[number];
const TOTAL = DISCIPLINES.reduce((n, d) => n + d.tools.length, 0);
const HOME = `${-V / 2} ${-V / 2} ${V} ${V}`;
// zoomed, the picked wedge is turned to point right, so its names read left to right
const ZOOM = "-62 -281 562 562";
/** shortest turn that brings a sector's middle to 0° */
const turnFor = (mid: number) => { let r = -mid % 360; if (r > 180) r -= 360; if (r <= -180) r += 360; return r; };

/** Dot-matrix number as an SVG group (same drawing as the section badges), centred on 0,0. */
function DotNum({ n, scale = 1 }: { n: number; scale?: number }) {
  const P = 4, R = 1.55;
  const chars = pad(n).split("");
  const w = (chars.length * 6 - 1) * P, h = 7 * P;
  return (
    <g transform={`scale(${scale}) translate(${-w / 2} ${-h / 2})`}>
      {chars.map((c, ci) =>
        (GLYPHS[c] ?? GLYPHS["0"]).map((row, y) =>
          row.split("").map((bit, x) => (
            <circle key={`${ci}${x}${y}`} cx={(ci * 6 + x) * P + P / 2} cy={y * P + P / 2} r={R} className={bit === "1" ? "on" : "off"} />
          )),
        ),
      )}
    </g>
  );
}

/** Tool name to the right of its circle; turned by the stack's middle so it reads level once zoomed. */
function Label({ t, mid }: { t: Tool; mid: number }) {
  const off = t.r + 5;
  const x = f2(t.x + Math.cos(rad(mid)) * off), y = f2(t.y + Math.sin(rad(mid)) * off);
  return (
    <text className="tm-tool" x={x} y={y} textAnchor="start" dominantBaseline="central" transform={`rotate(${mid} ${x} ${y})`}>
      {t.name}
    </text>
  );
}

export function ToolkitSection() {
  const [sel, setSel] = useState<number | null>(null);
  const [hov, setHov] = useState<number | null>(null);
  const root = useRef<HTMLElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const spin = useRef<SVGGElement>(null);
  const hub = useRef<SVGGElement>(null);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = root.current;
    if (!el || reduced.current || !("IntersectionObserver" in window)) return;
    const map = el.querySelector(".tm-card");
    if (!map || map.getBoundingClientRect().top < window.innerHeight * 0.85) return; // already on screen: leave it
    el.classList.add("armed");
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.replace("armed", "shown"); io.disconnect(); }
    }, { threshold: 0.25 });
    io.observe(map);
    return () => io.disconnect();
  }, []);

  // zoom: tween the viewBox to the picked wedge (or back home)
  useEffect(() => {
    const s = svg.current, g = spin.current, h = hub.current;
    if (!s || !g || !h) return;
    const to = sel === null ? HOME : ZOOM;
    const turn = sel === null ? 0 : turnFor(SECTORS[sel].mid);
    if (reduced.current) {
      s.setAttribute("viewBox", to);
      gsap.set(g, { rotation: turn, svgOrigin: "0 0" });
      gsap.set(h, { rotation: 0, svgOrigin: "0 0" });
      return;
    }
    const tl = gsap.timeline({ defaults: { duration: 0.95, ease: "power3.inOut" } });
    tl.to(s, { attr: { viewBox: to } }, 0).to(g, { rotation: turn, svgOrigin: "0 0" }, 0);
    return () => { tl.kill(); };
  }, [sel]);

  const back = useCallback(() => setSel(null), []);
  useEffect(() => {
    if (sel === null) return;
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") back(); };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [sel, back]);

  const pick = (i: number) => setSel((c) => (c === i ? null : i));
  const cur: Sector | null = sel === null ? null : SECTORS[sel];
  const focus = sel ?? hov;

  return (
    <section className="toolkit" id="toolkit" aria-labelledby="toolkit-h" ref={root}>
      <div className="in">
        <header className="about-head tk-head">
          <SectionBadge num="04" label="Toolkit" />
          <h2 id="toolkit-h" className="h2">The toolkit, <span className="soft">in daily use.</span></h2>
          <p className="lede tk-lede">Six stacks around one person. The closer a tool sits to the middle, the more often I reach for it. Click one to zoom in.</p>
        </header>

        <div className={`tm-card${cur ? " is-zoomed" : ""}`}>
          <svg ref={svg} className="tm-map" viewBox={HOME} role="group" aria-label="Toolkit map: six stacks of tools, by how often they're used">
            <g ref={spin} className="tm-spin">
            {/* frequency rings */}
            <g className="tm-rings" aria-hidden="true">
              {FREQS.map((f) => (
                <g key={f}>
                  <polygon points={hexRing(RING[f])} className="tm-ring" />
                  <text className="tm-ringlabel" x={f2(RING[f] / Math.cos(rad(SPAN / 2)) + 8)} y="0" dominantBaseline="central">{f}</text>
                </g>
              ))}
            </g>

            {SECTORS.map((s) => {
              const on = focus === null || focus === s.i;
              return (
                <g
                  key={s.d.key}
                  className={`tm-sector${on ? "" : " is-faded"}${sel === s.i ? " is-sel" : ""}${s.d.key === "ai" || s.d.key === "auto" ? " is-dark" : ""}`}
                  style={{ "--c": s.color } as React.CSSProperties}
                  role="button"
                  tabIndex={0}
                  aria-pressed={sel === s.i}
                  aria-label={`${s.d.name}: ${s.d.tools.length} tools. ${sel === s.i ? "Zoom out" : "Zoom in"}.`}
                  onClick={() => pick(s.i)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(s.i); } }}
                  onPointerEnter={(e) => { if (e.pointerType === "mouse") setHov(s.i); }}
                  onPointerLeave={(e) => { if (e.pointerType === "mouse") setHov(null); }}
                >
                  <path d={s.wedge} className="tm-wedge" />
                  <path d={s.chain} className="tm-chain" aria-hidden="true" />
                  {s.tools.map((t, j) => (
                    <g key={t.name} className={`tm-b f-${t.f.toLowerCase()}`} transform={`translate(${t.x} ${t.y})`}>
                      <circle r={t.r} className="tm-disc" style={{ "--i": j + s.i * 2 } as React.CSSProperties} />
                    </g>
                  ))}
                  <g className="tm-names" aria-hidden="true">{s.tools.map((t) => <Label key={t.name} t={t} mid={s.mid} />)}</g>
                  <g className="tm-stack" transform={`translate(${s.label.x} ${s.label.y})`} aria-hidden="true">
                    <text className="tm-stackname" textAnchor="middle" y="-2">{s.d.name}</text>
                    <text className="tm-stackn" textAnchor="middle" y="18">{pad(s.d.tools.length)} tools</text>
                  </g>
                </g>
              );
            })}

            </g>

            {/* hub: Scott, and the total (outside the turning group so it stays upright) */}
            <g ref={hub} className="tm-hub" aria-hidden="true" onClick={back}>
              <circle r={HUB} />
              <g className="tm-hubnum" transform="translate(0 -6)"><DotNum n={TOTAL} scale={1.25} /></g>
              <text y="30" textAnchor="middle" className="tm-hubk">tools</text>
            </g>
          </svg>

          {cur && (
            <button type="button" className="tm-back" onClick={back}>
              <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M13 8 H3 M7 4 L3 8 L7 12" /></svg>
              All stacks
            </button>
          )}

          {/* key: doubles as stack picker */}
          <div className="tm-key" role="group" aria-label="Stacks">
            {SECTORS.map((s) => (
              <button
                key={s.d.key}
                type="button"
                className="tm-pill"
                aria-pressed={sel === s.i}
                onClick={() => pick(s.i)}
                onPointerEnter={(e) => { if (e.pointerType === "mouse") setHov(s.i); }}
                onPointerLeave={(e) => { if (e.pointerType === "mouse") setHov(null); }}
              >
                <i style={{ background: s.color }} aria-hidden="true" />
                {s.d.name}
                <span>{pad(s.d.tools.length)}</span>
              </button>
            ))}
          </div>

          {/* what's in the zoomed stack, readable on phones and for screen readers */}
          <div className="tm-detail" aria-live="polite">
            {cur && (
              <>
                <p className="tm-detail-h">{cur.d.name} · {cur.d.tools.length} tools</p>
                {FREQS.map((f, fi) => (cur.counts[fi] ? (
                  <p key={f}><b>{f}</b> {cur.d.tools.filter((t) => t[1] === f).map((t) => t[0]).join(", ")}</p>
                ) : null))}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
