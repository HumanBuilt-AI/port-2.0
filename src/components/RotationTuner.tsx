"use client";
import { useRef, useState } from "react";
import { rotation } from "@/content/about";

/**
 * Currently in rotation (Nov 25): a small dark "tuner" widget. A dot-matrix screen spells the
 * medium (READ / WATCH / LISTEN), the cover slides in beneath it, and a dotted rail with a knob
 * picks the medium. Tap a label, drag the knob, swipe the cover, or use the arrow keys.
 * Under reduced motion everything still works; only the animations stop.
 */
const GLYPHS: Record<string, string[]> = {
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  C: ["01110", "10001", "10000", "10000", "10000", "10001", "01110"],
  D: ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
  E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
  H: ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
  I: ["01110", "00100", "00100", "00100", "00100", "00100", "01110"],
  L: ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
  N: ["10001", "11001", "10101", "10011", "10001", "10001", "10001"],
  R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
  S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
  T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
  W: ["10001", "10001", "10001", "10101", "10101", "10101", "01010"],
  " ": ["00000", "00000", "00000", "00000", "00000", "00000", "00000"],
};
const CELLS = 6; // the screen always shows six characters, so unlit dots stay put between words
const P = 4;
const R = 1.2; // smaller dots, more gap: reads calmer on the card

function DotWord({ word }: { word: string }) {
  const w = word.toUpperCase().slice(0, CELLS).padEnd(CELLS, " ");
  const cols = CELLS * 6 - 1;
  const dots: React.ReactNode[] = [];
  w.split("").forEach((c, ci) => {
    const g = GLYPHS[c] ?? GLYPHS[" "];
    g.forEach((row, y) =>
      (ci < CELLS - 1 ? row + "0" : row).split("").forEach((bit, x) => {
        const col = ci * 6 + x; // the spacer column between letters gets unlit dots too, so the screen reads as one grid
        const on = bit === "1";
        dots.push(
          <circle key={`${ci}-${x}-${y}`} cx={col * P + P / 2} cy={y * P + P / 2} r={R} className={on ? "on" : "off"}
            style={on ? ({ "--d": `${col * 14 + y * 5}ms` } as React.CSSProperties) : undefined} />,
        );
      }),
    );
  });
  return (
    <svg viewBox={`0 0 ${cols * P} ${7 * P}`} aria-hidden="true">
      {dots}
    </svg>
  );
}

const RAIL_DOTS = 31;

export function RotationTuner() {
  const tabs = rotation.tabs;
  const n = tabs.length;
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [drag, setDrag] = useState<number | null>(null); // knob position 0..1 while dragging
  const rail = useRef<HTMLDivElement>(null);
  const btns = useRef<(HTMLButtonElement | null)[]>([]);
  const swipe = useRef<{ x: number; y: number } | null>(null);

  const t = tabs[i];
  const pick = t.picks[0];
  const pos = drag ?? i / (n - 1);

  const go = (j: number, focus = false) => {
    const k = (j + n) % n;
    if (k === i) return;
    setDir(k > i ? 1 : -1);
    setI(k);
    if (focus) btns.current[k]?.focus();
  };

  const at = (clientX: number) => {
    const r = rail.current!.getBoundingClientRect();
    return Math.min(1, Math.max(0, (clientX - r.left) / r.width));
  };
  const onRailDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setDrag(at(e.clientX));
  };
  const onRailMove = (e: React.PointerEvent) => { if (drag !== null) setDrag(at(e.clientX)); };
  const onRailUp = () => {
    if (drag === null) return;
    go(Math.round(drag * (n - 1)));
    setDrag(null);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); go(i + 1, true); }
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); go(i - 1, true); }
    if (e.key === "Home") { e.preventDefault(); go(0, true); }
    if (e.key === "End") { e.preventDefault(); go(n - 1, true); }
  };

  const onNowDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    swipe.current = { x: e.clientX, y: e.clientY };
  };
  const onNowUp = (e: React.PointerEvent) => {
    const s = swipe.current;
    swipe.current = null;
    if (!s) return;
    const dx = e.clientX - s.x;
    if (Math.abs(dx) > 36 && Math.abs(dx) > Math.abs(e.clientY - s.y)) go(i + (dx < 0 ? 1 : -1));
  };

  return (
    <article className="a2 b-rot">
      <header className="a2-top">
        <h3 className="a2-name">{rotation.title}</h3>
        <span className="a2-to" aria-hidden="true">{String(i + 1).padStart(2, "0")}/{String(n).padStart(2, "0")}</span>
      </header>

      <div className="rot-screen" key={`s-${t.key}`}>
        <DotWord word={t.word} />
      </div>

      <div
        className="rot-now"
        style={{ "--dir": dir } as React.CSSProperties}
        onPointerDown={onNowDown}
        onPointerUp={onNowUp}
        onPointerCancel={() => { swipe.current = null; }}
        aria-live="polite"
      >
        <div className="rot-sleeve" key={`c-${t.key}`}>
          {pick?.cover?.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="rot-art" src={pick.cover.src} alt={pick.cover.alt} style={{ aspectRatio: pick.cover.ratio }} draggable={false} decoding="async" />
          ) : (
            <span className="rot-art rot-blank" aria-hidden="true">{pick?.title.slice(0, 1) ?? "·"}</span>
          )}
        </div>
        <div className="rot-meta" key={`m-${t.key}`}>
          <b>{pick?.title}</b>
          {pick?.by && <span className="rot-by">{pick.by}</span>}
        </div>
      </div>

      <div className="rot-tuner">
        <div
          ref={rail}
          className={`rot-rail${drag !== null ? " is-drag" : ""}`}
          style={{ "--p": pos } as React.CSSProperties}
          onPointerDown={onRailDown}
          onPointerMove={onRailMove}
          onPointerUp={onRailUp}
          onPointerCancel={() => setDrag(null)}
          aria-hidden="true"
        >
          {Array.from({ length: RAIL_DOTS }, (_, d) => {
            const f = d / (RAIL_DOTS - 1);
            const stop = Math.abs(f * (n - 1) - Math.round(f * (n - 1))) < 1e-6;
            return <span key={d} className={`rd${f <= pos + 1e-6 ? " lit" : ""}${stop ? " stop" : ""}`} />;
          })}
          <span className="rot-knob" />
        </div>
        <div className="rot-stops" role="radiogroup" aria-label="Currently" onKeyDown={onKey} style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
          {tabs.map((tb, j) => (
            <button
              key={tb.key}
              ref={(el) => { btns.current[j] = el; }}
              type="button"
              role="radio"
              aria-checked={j === i}
              tabIndex={j === i ? 0 : -1}
              className="rot-stop"
              onClick={() => go(j)}
            >
              {tb.label}
            </button>
          ))}
        </div>
      </div>

      {rotation.updated && <p className="rot-cap">Updated {rotation.updated}</p>}
    </article>
  );
}
