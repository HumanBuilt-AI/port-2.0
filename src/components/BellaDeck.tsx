"use client";
import { useRef, useState } from "react";
import { bella, type Photo } from "@/content/about";

/**
 * The Bella report as a stacked photo deck. The top photo shuffles to the back when you tap it,
 * swipe it (left = next, right = back), or press the arrow keys while the deck has focus.
 * The dots jump straight to a photo. Under reduced motion the stack still works, without tilt or slide.
 */
export function BellaDeck({ onEnlarge }: { onEnlarge: (p: Photo) => void }) {
  const n = bella.states.length;
  const [idx, setIdx] = useState(0);
  const [dx, setDx] = useState(0);
  const drag = useRef<{ x: number; y: number; id: number; moved: boolean } | null>(null);
  const go = (d: number) => setIdx((i) => (i + d + n) % n);
  const cur = bella.states[idx];

  const onDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest(".deck-zoom")) return;
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
    if (d.moved) setDx(mx);
  };
  const onUp = (e: React.PointerEvent) => {
    const d = drag.current;
    drag.current = null;
    if (!d || d.id !== e.pointerId) return;
    const mx = e.clientX - d.x;
    setDx(0);
    if (!d.moved) { if (Math.abs(e.clientY - d.y) < 8) go(1); return; }
    if (mx < -48) go(1);
    else if (mx > 48) go(-1);
  };
  const onCancel = () => { drag.current = null; setDx(0); };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); go(1); }
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); go(-1); }
    else if ((e.key === "Enter" || e.key === " ") && e.target === e.currentTarget) { e.preventDefault(); go(1); }
  };

  return (
    <article className="a2 b-bella">
      <header className="a2-top"><span className="a2-name">{bella.title}</span><span className="a2-to" aria-hidden="true">{String(idx + 1).padStart(2, "0")}/{String(n).padStart(2, "0")}</span></header>
      <p className="a2-q">{bella.line}</p>
      <div
        className={`deck${dx ? " dragging" : ""}`}
        role="group"
        aria-roledescription="photo stack"
        aria-label={`Photos of Bella, ${idx + 1} of ${n}: ${cur.label}`}
        aria-describedby="bella-how"
        tabIndex={0}
        onKeyDown={onKey}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onCancel}
      >
        {bella.states.map((s, i) => {
          const pos = (i - idx + n) % n;
          return (
            <div
              key={s.key}
              className="deck-card"
              data-pos={pos}
              aria-hidden={pos !== 0}
              style={pos === 0 && dx ? ({ "--dx": `${dx}px`, "--dr": `${dx / 14}deg` } as React.CSSProperties) : undefined}
            >
              {/* Only the top three and the previous photo load; the rest wait until they come near the top. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {(pos < 3 || pos === n - 1) && <img src={s.photo.src} alt={pos === 0 ? s.photo.alt : ""} width={640} height={640} decoding="async" draggable={false} />}
            </div>
          );
        })}
        <button type="button" className="deck-zoom" onClick={() => onEnlarge(cur.photo)} aria-label={`Enlarge: ${cur.photo.alt}`}>
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M9.5 2.5h4v4M6.5 13.5h-4v-4M13.5 2.5 9 7M2.5 13.5 7 9" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
      <span id="bella-how" className="sr-only">Press the arrow keys, or tap or swipe the photo, to see the next one.</span>
      <div className="deck-bar">
        <span className="deck-label" key={`l${idx}`}>{cur.label}</span>
        <div className="dots on-dark" role="radiogroup" aria-label="Choose a photo of Bella">
          {bella.states.map((s, i) => (
            <button key={s.key} type="button" role="radio" aria-checked={i === idx} aria-label={s.label} onClick={() => setIdx(i)} />
          ))}
        </div>
      </div>
      <p className="a2-note" key={`n${idx}`} aria-live="polite">{cur.note}</p>
    </article>
  );
}
