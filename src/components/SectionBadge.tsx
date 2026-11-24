"use client";
import { useEffect, useRef } from "react";

/**
 * Section badge: a small rounded widget with the number drawn as a 5 × 7 dot matrix
 * (unlit dots stay faintly visible) and the section name beside it.
 * The dots light up column by column when the badge scrolls into view.
 * `onDark` flips it to a light widget for dark sections.
 */
const GLYPHS: Record<string, string[]> = {
  "0": ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
  "1": ["00100", "01100", "00100", "00100", "00100", "00100", "01110"],
  "2": ["01110", "10001", "00001", "00010", "00100", "01000", "11111"],
  "3": ["11111", "00010", "00100", "00010", "00001", "10001", "01110"],
  "4": ["00010", "00110", "01010", "10010", "11111", "00010", "00010"],
  "5": ["11111", "10000", "11110", "00001", "00001", "10001", "01110"],
  "6": ["00110", "01000", "10000", "11110", "10001", "10001", "01110"],
  "7": ["11111", "00001", "00010", "00100", "01000", "01000", "01000"],
  "8": ["01110", "10001", "10001", "01110", "10001", "10001", "01110"],
  "9": ["01110", "10001", "10001", "01111", "00001", "00010", "01100"],
};
const P = 4; // dot pitch in viewBox units
const R = 1.55; // dot radius

export function SectionBadge({ num, label, kind = "Section", onDark = false }: { num: string; label: string; kind?: string; onDark?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const chars = num.split("");
  const cols = chars.length * 6 - 1;

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return; // already on screen: stay lit
    el.classList.add("arm");
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("lit");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const dots: React.ReactNode[] = [];
  chars.forEach((c, ci) => {
    const g = GLYPHS[c] ?? GLYPHS["0"];
    g.forEach((row, y) =>
      row.split("").forEach((bit, x) => {
        const col = ci * 6 + x;
        dots.push(
          <circle
            key={`${ci}-${x}-${y}`}
            cx={col * P + P / 2}
            cy={y * P + P / 2}
            r={R}
            className={bit === "1" ? "on" : "off"}
            style={bit === "1" ? ({ "--d": `${col * 28 + y * 6}ms` } as React.CSSProperties) : undefined}
          />,
        );
      }),
    );
  });

  return (
    <span ref={ref} className={`sbadge${onDark ? " on-dark" : ""}`}>
      <span className="sb-num" aria-hidden="true">
        <svg viewBox={`0 0 ${cols * P} ${7 * P}`} width={cols * P} height={7 * P}>
          {dots}
        </svg>
      </span>
      <span className="sb-text">
        <span className="sb-kind">
          {kind}
          <span className="sr-only"> {num}</span>
        </span>
        <span className="sb-label">{label}</span>
      </span>
    </span>
  );
}
