"use client";
import { SectionBadge } from "@/components/SectionBadge";
import { BellaDeck } from "@/components/BellaDeck";
import { WanderGallery } from "@/components/WanderGallery";
import { RotationTuner } from "@/components/RotationTuner";

import { useEffect, useMemo, useRef, useState } from "react";
import { intro, bella, wander, comic, rotation, rabbitHole, spiritAnimal, type Photo } from "@/content/about";

/**
 * About me (Section 04): seven cards about life outside work. Light cards and dark
 * A2UI-style cards from the Specs catalog. Every control is a real button (touch and
 * keyboard), nothing depends on hover, and motion stops under reduced motion.
 */

/** A photo, or a labelled placeholder frame until the file exists. */
function Pic({ p, className, fit = "cover" }: { p: Photo; className?: string; fit?: "cover" | "contain" }) {
  return p.src ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={`pic-img ${className ?? ""}`} src={p.src} alt={p.alt} style={{ objectFit: fit }} />
  ) : (
    <span className={`pic-ph ${className ?? ""}`} role="img" aria-label={p.alt}>
      <span className="fine">{p.alt.replace(/^PLACEHOLDER:\s*/, "")}</span>
    </span>
  );
}

/** What the lightbox is showing: one photo, or a photo within a set it can step through. */
export type Enlarge = { set: Photo[]; i: number };

const Chevron = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d={d} /></svg>
);

/**
 * Click-to-enlarge, keeping the photo's original proportions. When the photo belongs to a
 * set of two or more, the lightbox gets prev/next arrows, a position count, the arrow keys
 * and swipe, and wraps at either end. A single photo stays as it was.
 */
function Lightbox({ view, onClose }: { view: Enlarge | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [i, setI] = useState(view?.i ?? 0);
  const [shown, setShown] = useState(view);
  if (view !== shown) { setShown(view); setI(view?.i ?? 0); } // a new open starts on the clicked photo
  const start = useRef<{ x: number; y: number } | null>(null);
  const set = useMemo(() => view?.set ?? [], [view]);
  const n = set.length;
  const multi = n > 1;
  const p = view ? set[Math.min(i, n - 1)] : null;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (view && !d.open) d.showModal();
    if (!view && d.open) d.close();
  }, [view]);

  const go = (dir: number) => { if (multi) setI((c) => (c + dir + n) % n); };

  // warm up the neighbours so stepping through feels instant
  useEffect(() => {
    if (!multi) return;
    for (const j of [i + 1, i - 1]) {
      const q = set[(j + n) % n];
      const src = q.big ?? q.src;
      if (src) { const im = new Image(); im.src = src; }
    }
  }, [i, multi, n, set]);

  const onKey = (e: React.KeyboardEvent) => {
    if (!multi) return;
    if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
  };
  const onDown = (e: React.PointerEvent) => {
    if (!multi || (e.pointerType === "mouse" && e.button !== 0)) return;
    start.current = { x: e.clientX, y: e.clientY };
  };
  const onUp = (e: React.PointerEvent) => {
    const s = start.current;
    start.current = null;
    if (!s) return;
    const dx = e.clientX - s.x;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(e.clientY - s.y)) go(dx < 0 ? 1 : -1);
  };

  return (
    <dialog ref={ref} className={`lightbox${multi ? " lb-multi" : ""}`} onClose={onClose} onKeyDown={onKey} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      {p && (
        <figure
          key={multi ? i : undefined}
          className={multi ? "lb-fig" : undefined}
          style={{ aspectRatio: p.ratio ?? 4 / 3, "--r": p.ratio ?? 4 / 3 } as React.CSSProperties}
          onPointerDown={onDown}
          onPointerUp={onUp}
          onPointerCancel={() => { start.current = null; }}
        >
          <Pic p={p.big ? { ...p, src: p.big } : p} fit="contain" />
          {p.caption && <figcaption>{p.caption}</figcaption>}
        </figure>
      )}
      {multi && (
        <div className="lb-nav">
          <button type="button" className="lb-arrow lb-prev" onClick={() => go(-1)} aria-label="Previous photo"><Chevron d="M15 5l-7 7 7 7" /></button>
          <span className="lb-count" aria-live="polite"><b>{String(i + 1).padStart(2, "0")}</b> / {String(n).padStart(2, "0")}</span>
          <button type="button" className="lb-arrow lb-next" onClick={() => go(1)} aria-label="Next photo"><Chevron d="M9 5l7 7-7 7" /></button>
        </div>
      )}
      <button type="button" className="lb-close" onClick={onClose} aria-label="Close">×</button>
    </dialog>
  );
}

export function AboutSection() {
  const [big, setBig] = useState<Enlarge | null>(null);
  const one = (p: Photo) => setBig({ set: [p], i: 0 });
  const [joke, setJoke] = useState(0);

  const pt = intro.portrait;
  const jk = comic.examples[joke];

  return (
    <section className="about" id="about" aria-labelledby="about-h">
      <div className="in">
        <header className="about-head">
          <SectionBadge num="04" label="About" />
          <h2 id="about-h" className="h2">Off the clock. <span className="soft">Still paying attention.</span></h2>
        </header>

        <div className="bento">
          {/* 1 · introduction, with one portrait (Nov 25) */}
          {intro.show && (
            <article className="bc b-intro">
              <div className="intro-pic">
                <button type="button" className="pic-btn" onClick={() => one(pt)} aria-label={`Enlarge: ${pt.alt}`}>
                  <Pic p={pt} />
                </button>
              </div>
              <div>
                <h3>{intro.name}</h3>
                <p className="bc-line">{intro.line}</p>
                {pt.caption && <p className="bc-cap">{pt.caption}</p>}
              </div>
            </article>
          )}

          {/* 2 · the Bella report (dark, because Bella is): a stacked photo deck */}
          {bella.show && <BellaDeck onEnlarge={setBig} />}

          {/* 3 · my spirit animal: a gentle idle float, still under reduced motion */}
          {spiritAnimal.show && (
            <article className="bc b-just b-spirit">
              <h3>{spiritAnimal.title}</h3>
              <p className="just-p">{spiritAnimal.name}</p>
              {spiritAnimal.line && <p className="bc-line">{spiritAnimal.line}</p>}
              <div className="spirit">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="spirit-img" src={spiritAnimal.photo.src} alt={spiritAnimal.photo.alt} width={402} height={480} loading="lazy" decoding="async" />
                <span className="spirit-shadow" aria-hidden="true" />
              </div>
            </article>
          )}
          {/* 4 · currently in rotation: a dot-matrix tuner (Nov 25) */}
          {rotation.show && <RotationTuner />}

          {/* 5 · where I wander: Scott's Chicago photos (merged with "Things I stop for", Nov 24) */}
          {wander.show && <WanderGallery onEnlarge={setBig} />}

          {/* 6 · some comic relief */}
          {comic.show && (
            <article className="a2 b-comic">
              <header className="a2-top"><h3 className="a2-name">{comic.title}</h3><span className="a2-to">{joke + 1}/{comic.examples.length}</span></header>
              <p className="a2-q">{comic.line}</p>
              <div className="joke" key={joke} aria-live="polite">
                {jk.photo && <button type="button" className="pic-btn" onClick={() => one(jk.photo!)} aria-label={`Enlarge: ${jk.photo.alt}`}><Pic p={jk.photo} /></button>}
                <p className="a2-line">{jk.text}</p>
              </div>
              <button type="button" className="btn-pill" onClick={() => setJoke((joke + 1) % comic.examples.length)}>There’s more</button>
            </article>
          )}

          {/* 7 · down this rabbit hole */}
          {rabbitHole.show && (
            <article className="a2 b-rabbit">
              <header className="a2-top"><h3 className="a2-name">{rabbitHole.title}</h3>{rabbitHole.link ? <a className="a2-to" href={rabbitHole.link.href}>→ {rabbitHole.link.label}</a> : <span className="a2-to">→ trail</span>}</header>
              <p className="a2-q">{rabbitHole.topic}</p>
              {rabbitHole.sub && <p className="rh-sub">{rabbitHole.sub}</p>}
              {rabbitHole.photos.length > 0 && (
                <div className="rh-pics">
                  {rabbitHole.photos.map((p, i) => (
                    <button key={i} type="button" className="pic-btn" onClick={() => setBig({ set: rabbitHole.photos, i })} aria-label={`Enlarge: ${p.alt}`}><Pic p={p} /></button>
                  ))}
                </div>
              )}
              <ol className="trail">
                {rabbitHole.steps.map((s, i) => (
                  <li key={i}><span className="trail-n">{String(i + 1).padStart(2, "0")}</span><span><b>{s.label}</b><span>{s.text}</span></span></li>
                ))}
              </ol>
            </article>
          )}

        </div>
      </div>
      <div className="in"><p className="cap">About · life outside work</p></div>
      <Lightbox view={big} onClose={() => setBig(null)} />
    </section>
  );
}
