"use client";
import { SectionBadge } from "@/components/SectionBadge";
import { BellaDeck } from "@/components/BellaDeck";
import { WanderGallery } from "@/components/WanderGallery";

import { useEffect, useRef, useState } from "react";
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

/** Click-to-enlarge, keeping the photo's original proportions. */
function Lightbox({ p, onClose }: { p: Photo | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (p && !d.open) d.showModal();
    if (!p && d.open) d.close();
  }, [p]);
  return (
    <dialog ref={ref} className="lightbox" onClose={onClose} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      {p && (
        <figure style={{ aspectRatio: p.ratio ?? 4 / 3, "--r": p.ratio ?? 4 / 3 } as React.CSSProperties}>
          <Pic p={p.big ? { ...p, src: p.big } : p} fit="contain" />
          {p.caption && <figcaption>{p.caption}</figcaption>}
        </figure>
      )}
      <button type="button" className="lb-close" onClick={onClose} aria-label="Close">×</button>
    </dialog>
  );
}

function Tabs<T extends { key: string; label: string }>({ items, value, onChange, label, dark }: { items: T[]; value: string; onChange: (k: string) => void; label: string; dark?: boolean }) {
  return (
    <div className={`chips${dark ? " on-dark" : ""}`} role="radiogroup" aria-label={label}>
      {items.map((t) => (
        <button key={t.key} type="button" role="radio" aria-checked={t.key === value} className="chip" onClick={() => onChange(t.key)}>{t.label}</button>
      ))}
    </div>
  );
}

export function AboutSection() {
  const [big, setBig] = useState<Photo | null>(null);
  const [portrait, setPortrait] = useState(0);
  const [joke, setJoke] = useState(0);
  const [tab, setTab] = useState(rotation.tabs[0].key);

  const pt = intro.portraits[portrait];
  const rt = rotation.tabs.find((t) => t.key === tab) ?? rotation.tabs[0];
  const jk = comic.examples[joke];

  return (
    <section className="about" id="about" aria-labelledby="about-h">
      <div className="in">
        <header className="about-head">
          <SectionBadge num="04" label="About" />
          <h2 id="about-h" className="h2">Off the clock. <span className="soft">Still paying attention.</span></h2>
        </header>

        <div className="bento">
          {/* 1 · introduction, with a small switchable portrait */}
          {intro.show && (
            <article className="bc b-intro">
              <div className="intro-pic">
                <button type="button" className="pic-btn" onClick={() => setBig(pt)} aria-label={`Enlarge: ${pt.alt}`}>
                  <Pic p={pt} key={portrait} className="fade" />
                </button>
                <div className="dots" role="radiogroup" aria-label="Portraits">
                  {intro.portraits.map((p, i) => (
                    <button key={i} type="button" role="radio" aria-checked={i === portrait} aria-label={`Portrait ${i + 1}`} onClick={() => setPortrait(i)} />
                  ))}
                </div>
              </div>
              <div>
                <h3>{intro.name}</h3>
                <p className="bc-line">{intro.line}</p>
                {pt.caption && <p className="bc-cap" key={`c${portrait}`}>{pt.caption}</p>}
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
              <div className="spirit">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="spirit-img" src={spiritAnimal.photo.src} alt={spiritAnimal.photo.alt} width={402} height={480} loading="lazy" decoding="async" />
                <span className="spirit-shadow" aria-hidden="true" />
              </div>
            </article>
          )}
          {/* 4 · currently in rotation (provisional) */}
          {rotation.show && (
            <article className="bc b-rot">
              <h3>{rotation.title}</h3>
              <Tabs items={rotation.tabs} value={tab} onChange={setTab} label="Currently" />
              <ul className="rot-list xfade" key={tab}>
                {rt.picks.map((p, i) => (
                  <li key={i}><span className="rot-cover" aria-hidden="true">{p.title.replace(/^PLACEHOLDER\s*/, "").slice(0, 1) || "·"}</span><span><b>{p.title}</b>{p.by && <span>{p.by}</span>}</span></li>
                ))}
              </ul>
              {rotation.updated && <p className="bc-cap">Updated {rotation.updated}</p>}
            </article>
          )}

          {/* 5 · where I wander: Scott's Chicago photos (merged with "Things I stop for", Nov 24) */}
          {wander.show && <WanderGallery onEnlarge={setBig} />}

          {/* 6 · some comic relief */}
          {comic.show && (
            <article className="a2 b-comic">
              <header className="a2-top"><span className="a2-name">{comic.title}</span><span className="a2-to">{joke + 1}/{comic.examples.length}</span></header>
              <p className="a2-q">{comic.line}</p>
              <div className="joke" key={joke} aria-live="polite">
                {jk.photo && <button type="button" className="pic-btn" onClick={() => setBig(jk.photo!)} aria-label={`Enlarge: ${jk.photo.alt}`}><Pic p={jk.photo} /></button>}
                <p className="a2-line">{jk.text}</p>
              </div>
              <button type="button" className="btn-pill" onClick={() => setJoke((joke + 1) % comic.examples.length)}>There’s more</button>
            </article>
          )}

          {/* 7 · down this rabbit hole */}
          {rabbitHole.show && (
            <article className="a2 b-rabbit">
              <header className="a2-top"><span className="a2-name">{rabbitHole.title}</span>{rabbitHole.link ? <a className="a2-to" href={rabbitHole.link.href}>→ {rabbitHole.link.label}</a> : <span className="a2-to">→ trail</span>}</header>
              <p className="a2-q">{rabbitHole.topic}</p>
              {rabbitHole.sub && <p className="rh-sub">{rabbitHole.sub}</p>}
              {rabbitHole.photos.length > 0 && (
                <div className="rh-pics">
                  {rabbitHole.photos.map((p, i) => (
                    <button key={i} type="button" className="pic-btn" onClick={() => setBig(p)} aria-label={`Enlarge: ${p.alt}`}><Pic p={p} /></button>
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
      <Lightbox p={big} onClose={() => setBig(null)} />
    </section>
  );
}
