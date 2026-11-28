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

const V = 1000; // viewBox is centred: -500..500
const RING: Record<Freq, number> = { Daily: 192, Regular: 296, Familiar: 390 };
const BR: Record<Freq, number> = { Daily: 29, Regular: 16, Familiar: 9.5 };
const HUB = 52;
const SPAN = 60;
const COLOR: Record<string, string> = { ai: "#1A1A1A", design: "#DCF26A", dev: "#9C9B97", data: "#F7B7A3", auto: "#5C5C59", analytics: "#C3DB52" };
const pad = (n: number) => String(n).padStart(2, "0");
const rad = (a: number) => (a * Math.PI) / 180;
const pt = (a: number, r: number) => [Math.cos(rad(a)) * r, Math.sin(rad(a)) * r] as const;
const f2 = (n: number) => +n.toFixed(2);

type Tool = { name: string; f: Freq; a: number; x: number; y: number; r: number };

const SECTORS = DISCIPLINES.map((d, i) => {
  const mid = -90 + i * SPAN;
  const tools: Tool[] = [];
  FREQS.forEach((f) => {
    const list = d.tools.filter((t) => t[1] === f);
    const step = Math.min(50 / Math.max(list.length, 1), f === "Daily" ? 12 : 9);
    list.forEach(([name], j) => {
      const a = mid + (j - (list.length - 1) / 2) * step;
      const [x, y] = pt(a, RING[f]);
      tools.push({ name, f, a, x: f2(x), y: f2(y), r: BR[f] });
    });
  });
  // annular wedge behind the tools
  const a0 = mid - SPAN / 2 + 2, a1 = mid + SPAN / 2 - 2, ri = HUB + 18, ro = 432;
  const [p1x, p1y] = pt(a0, ri), [p2x, p2y] = pt(a0, ro), [p3x, p3y] = pt(a1, ro), [p4x, p4y] = pt(a1, ri);
  const wedge = `M${f2(p1x)} ${f2(p1y)} L${f2(p2x)} ${f2(p2y)} A${ro} ${ro} 0 0 1 ${f2(p3x)} ${f2(p3y)} L${f2(p4x)} ${f2(p4y)} A${ri} ${ri} 0 0 0 ${f2(p1x)} ${f2(p1y)} Z`;
  const [lx, ly] = pt(mid, 462);
  const counts = FREQS.map((f) => d.tools.filter((t) => t[1] === f).length);
  return { d, i, mid, tools, wedge, label: { x: f2(lx), y: f2(ly) }, counts, color: COLOR[d.key] };
});
type Sector = (typeof SECTORS)[number];
const TOTAL = DISCIPLINES.reduce((n, d) => n + d.tools.length, 0);
const HOME = `${-V / 2} ${-V / 2} ${V} ${V}`;
// zoomed, the picked wedge is turned to point right, so its names read left to right
const ZOOM = "-52 -262 524 524";
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

/** Tool name along its radius: daily names point in toward the hub, the others point out. */
function Label({ t }: { t: Tool }) {
  const out = t.f !== "Daily";
  const off = t.r + 5;
  const [x, y] = pt(t.a, RING[t.f] + (out ? off : -off));
  const rot = t.a;
  const anchor = out ? "start" : "end";
  return (
    <text className="tm-tool" x={f2(x)} y={f2(y)} textAnchor={anchor} dominantBaseline="central" transform={`rotate(${f2(rot)} ${f2(x)} ${f2(y)})`}>
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
                  <circle r={RING[f]} className="tm-ring" />
                  <text className="tm-ringlabel" x={RING[f] + 8} y="0" dominantBaseline="central">{f}</text>
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
                  {s.tools.map((t, j) => (
                    <line key={`s${j}`} x1="0" y1="0" x2={t.x} y2={t.y} className="tm-spoke" />
                  ))}
                  {s.tools.map((t, j) => (
                    <g key={t.name} className={`tm-b f-${t.f.toLowerCase()}`} transform={`translate(${t.x} ${t.y})`}>
                      <circle r={t.r} className="tm-disc" style={{ "--i": j + s.i * 2 } as React.CSSProperties} />
                    </g>
                  ))}
                  <g className="tm-names" aria-hidden="true">{s.tools.map((t) => <Label key={t.name} t={t} />)}</g>
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
