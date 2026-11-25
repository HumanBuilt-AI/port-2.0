"use client";
import { useEffect, useRef, useState } from "react";
import { wander } from "@/content/about";
import type { Enlarge } from "@/components/AboutSection";

/**
 * Where I wander: Scott's Chicago photos as a featured stage plus a filmstrip.
 * The stage crossfades between photos and drifts slowly (a quiet Ken Burns) while one is showing.
 * Swipe or drag the stage, use the arrow buttons, the arrow keys anywhere in the card, or pick a
 * thumbnail. Tap the stage to see the photo enlarged at its original proportions.
 * Under reduced motion the photos swap without fading, drifting or sliding.
 */
const n = wander.photos.length;
const pad = (i: number) => String(i).padStart(2, "0");
const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type Layer = { i: number; id: number; dir: number };

export function WanderGallery({ onEnlarge }: { onEnlarge: (v: Enlarge) => void }) {
  const [idx, setIdx] = useState(0);
  const [layers, setLayers] = useState<Layer[]>([{ i: 0, id: 0, dir: 1 }]);
  const [dx, setDx] = useState(0);
  const uid = useRef(1);
  const drag = useRef<{ x: number; y: number; id: number; moved: boolean } | null>(null);
  const strip = useRef<HTMLOListElement>(null);
  const seen = useRef(false);

  const show = (next: number, dir: number) => {
    const i = (next + n) % n;
    if (i === idx) return;
    setIdx(i);
    if (reduced()) { setLayers([{ i, id: uid.current++, dir }]); return; }
    // keep only the outgoing photo underneath the new one
    setLayers((ls) => [...ls.slice(-1), { i, id: uid.current++, dir }]);
  };
  const go = (d: number) => show(idx + d, d);

  // drop the outgoing layer once the new one has faded in
  useEffect(() => {
    if (layers.length < 2) return;
    const t = window.setTimeout(() => setLayers((ls) => ls.slice(-1)), 900);
    return () => window.clearTimeout(t);
  }, [layers]);

  // keep the active thumbnail in view without scrolling the page, and warm up the neighbours
  useEffect(() => {
    const s = strip.current;
    const el = s?.children[idx] as HTMLElement | undefined;
    if (s && el && seen.current) {
      const left = el.offsetLeft - (s.clientWidth - el.clientWidth) / 2;
      s.scrollTo({ left, behavior: reduced() ? "auto" : "smooth" });
    }
    seen.current = true;
    for (const j of [idx + 1, idx - 1]) {
      const p = wander.photos[(j + n) % n];
      if (p.big) { const im = new Image(); im.src = p.big; }
    }
  }, [idx]);

  const onDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    drag.current = { x: e.clientX, y: e.clientY, id: e.pointerId, moved: false };
  };
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const mx = e.clientX - d.x;
    if (!d.moved && Math.abs(mx) > 8 && Math.abs(mx) > Math.abs(e.clientY - d.y)) {
      d.moved = true;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    }
    if (d.moved && !reduced()) setDx(mx);
  };
  const onUp = (e: React.PointerEvent) => {
    const d = drag.current;
    drag.current = null;
    if (!d || d.id !== e.pointerId) return;
    const mx = e.clientX - d.x;
    setDx(0);
    if (!d.moved) return; // a plain tap falls through to the enlarge button
    // swallow the click that follows a drag so it doesn't open the enlarged view
    const stop = (ev: Event) => { ev.stopPropagation(); ev.preventDefault(); };
    window.addEventListener("click", stop, { capture: true, once: true });
    window.setTimeout(() => window.removeEventListener("click", stop, { capture: true }), 0);
    if (mx < -48) go(1);
    else if (mx > 48) go(-1);
  };
  const onCancel = () => { drag.current = null; setDx(0); };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
    else if (e.key === "Home" && (e.target as HTMLElement).closest(".film")) { e.preventDefault(); show(0, -1); }
    else if (e.key === "End" && (e.target as HTMLElement).closest(".film")) { e.preventDefault(); show(n - 1, 1); }
  };

  const cur = wander.photos[idx];

  return (
    <article
      className="bc b-wander"
      role="region"
      aria-roledescription="carousel"
      aria-label={`${wander.title}: Chicago photos`}
      onKeyDown={onKey}
    >
      <div className="wg-text">
        <h3>{wander.title}</h3>
        <p className="wg-line">{wander.line}</p>
        <p className="wg-stop"><b>{wander.stopFor.title}.</b> {wander.stopFor.line}</p>
        <div className="wg-nav">
          <button type="button" className="wg-arrow" onClick={() => go(-1)} aria-label="Previous photo">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 6 8.5 12l6 6" /></svg>
          </button>
          <button type="button" className="wg-arrow" onClick={() => go(1)} aria-label="Next photo">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9.5 6 6 6-6 6" /></svg>
          </button>
          <span className="wg-count" aria-live="polite" aria-atomic="true">
            <span className="sr-only">Photo </span><b>{pad(idx + 1)}</b><span aria-hidden="true"> / </span><span className="sr-only"> of </span>{pad(n)}
          </span>
        </div>
        {cur.caption && <p className="bc-cap wg-cap" key={`c${idx}`}>{cur.caption}</p>}
      </div>

      <div
        className={`wg-stage${dx ? " dragging" : ""}`}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onCancel}
        style={dx ? ({ "--dx": `${dx * 0.35}px` } as React.CSSProperties) : undefined}
      >
        {layers.map((l, k) => {
          const p = wander.photos[l.i];
          const top = k === layers.length - 1;
          return (
            <button
              key={l.id}
              type="button"
              className={`wg-slide${top ? " on" : " off"}${l.id === 0 ? " first" : ""}`}
              data-kb={l.i % 4}
              style={{ "--from": `${l.dir * 3}%` } as React.CSSProperties}
              onClick={() => onEnlarge({ set: wander.photos, i: l.i })}
              aria-label={`Enlarge photo ${l.i + 1} of ${n}: ${p.alt}`}
              aria-hidden={!top}
              tabIndex={top ? 0 : -1}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.src}
                srcSet={p.big ? `${p.src} 640w, ${p.big} 1200w` : undefined}
                sizes="(max-width: 680px) 92vw, (max-width: 1000px) 60vw, 440px"
                alt=""
                loading="lazy"
                decoding="async"
                width={1200}
                height={Math.round(1200 / (p.ratio ?? 1))}
                draggable={false}
              />
            </button>
          );
        })}
        <span className="wg-zoom" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M14 4h6v6M10 20H4v-6M20 4l-6.5 6.5M4 20l6.5-6.5" /></svg>
        </span>
      </div>

      <ol className="film" ref={strip} aria-label="All photos">
        {wander.photos.map((p, i) => (
          <li key={i}>
            <button
              type="button"
              className="film-thumb"
              aria-current={i === idx ? "true" : undefined}
              aria-label={`Photo ${i + 1} of ${n}`}
              onClick={() => show(i, i > idx ? 1 : -1)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.thumb ?? p.src} alt="" width={160} height={160} loading="lazy" decoding="async" draggable={false} />
            </button>
          </li>
        ))}
      </ol>
    </article>
  );
}
