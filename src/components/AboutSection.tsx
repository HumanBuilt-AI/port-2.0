"use client";

import { useState } from "react";
import { about, timeline, currently, workStops, toolkit } from "@/content/about";

/**
 * About me (Section 05). A bento of light cards (intro, bio, photo, toolkit) and
 * dark A2UI-style cards borrowed from the Specs catalog (timeline, how I work),
 * each with a mono label top-left and a "→ target" top-right.
 */
export function AboutSection() {
  const [row, setRow] = useState(0);
  const [tab, setTab] = useState(currently[0].key);
  const [stop, setStop] = useState(2);
  const [tool, setTool] = useState<string | null>(null);

  const sel = timeline[row];
  const cur = currently.find((c) => c.key === tab) ?? currently[0];
  const span = Number(timeline[0].year) - Number(timeline[timeline.length - 1].year);
  const pickedTool = toolkit.find((t) => t.name === tool);

  return (
    <section className="about" id="about" aria-labelledby="about-h">
      <div className="in">
        <header className="about-head">
          <span className="pill">Section 05 · About</span>
          <h2 id="about-h" className="h2">Design first. <span className="soft">AI in the loop.</span></h2>
        </header>

        <div className="bento">
          {/* intro */}
          <article className="bc b-intro">
            <span className="bc-ico" aria-hidden="true">
              <svg viewBox="0 0 24 24"><g className="ln"><circle cx="12" cy="12" r="8.5" /><path d="M8.6 14.2c.9 1.2 2 1.8 3.4 1.8s2.5-.6 3.4-1.8" /><circle cx="9.3" cy="10" r=".6" className="solid" /><circle cx="14.7" cy="10" r=".6" className="solid" /></g></svg>
            </span>
            <h3>{about.name}</h3>
            <ul className="bc-facts">{about.facts.map((f) => <li key={f}>{f}</li>)}</ul>
          </article>

          {/* bio */}
          <article className="bc b-bio"><p>{about.bio}</p></article>

          {/* photo */}
          <figure className="bc b-photo">
            {about.photo.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={about.photo.src} alt={about.photo.alt} />
            ) : (
              <div className="ph" role="img" aria-label="Portrait placeholder">
                <svg viewBox="0 0 200 220" aria-hidden="true"><g className="ln">
                  <circle cx="100" cy="82" r="38" /><path d="M30 220c4-46 34-72 70-72s66 26 70 72" />
                </g></svg>
                <span className="fine">Portrait · placeholder</span>
              </div>
            )}
          </figure>

          {/* timeline: KitProgress-style */}
          <article className="a2 b-time" aria-labelledby="t-h">
            <header className="a2-top"><span className="a2-name">Timeline</span><a className="a2-to" href="#work">→ selected work</a></header>
            <div className="a2-big" aria-live="polite"><span key={sel.year} className="a2-roll">{sel.year}</span><span className="of">/{span}yrs</span></div>
            <p id="t-h" className="a2-q">{sel.title} <span className="dim">{sel.tags}</span></p>
            <ul className="a2-rows" role="listbox" aria-label="Work by year">
              {timeline.map((t, i) => (
                <li key={t.slug} role="option" aria-selected={i === row} tabIndex={0}
                  onMouseEnter={() => setRow(i)} onFocus={() => setRow(i)} onClick={() => setRow(i)}>
                  <i className={i === 0 ? "live" : undefined} aria-hidden="true" />
                  <span>{t.name}</span>
                  <span className="yr">{i === 0 ? "Current" : t.year}</span>
                </li>
              ))}
            </ul>
          </article>

          {/* currently: ChoiceChips-style */}
          <article className="bc b-now">
            <h3>Currently</h3>
            <div className="chips" role="radiogroup" aria-label="Currently">
              {currently.map((c) => (
                <button key={c.key} type="button" role="radio" aria-checked={c.key === tab} className="chip" onClick={() => setTab(c.key)}>{c.label}</button>
              ))}
            </div>
            <div className="now-body" key={cur.key}>
              <div className="now-cover" aria-hidden="true"><span>{cur.title.slice(0, 1)}</span></div>
              <div><p className="now-t">{cur.title}</p><p className="now-n">{cur.note}</p></div>
            </div>
          </article>

          {/* how I work: ToneSlider-style */}
          <article className="a2 b-how">
            <header className="a2-top"><span className="a2-name">How I work</span><span className="a2-to">→ process</span></header>
            <p className="a2-line" key={stop}>{workStops[stop].line}</p>
            <div className="slide">
              <input type="range" min={0} max={workStops.length - 1} step={1} value={stop}
                onChange={(e) => setStop(Number(e.target.value))}
                aria-label="Stage of the work" aria-valuetext={workStops[stop].at}
                style={{ "--p": `${(stop / (workStops.length - 1)) * 100}%` } as React.CSSProperties} />
              <ol className="slide-stops" aria-hidden="true">
                {workStops.map((s, i) => <li key={s.at} className={i === stop ? "on" : undefined}>{s.at}</li>)}
              </ol>
            </div>
          </article>

          {/* toolkit */}
          <article className="bc b-tools">
            <h3>Toolkit</h3>
            <p className="bc-sub">{pickedTool ? pickedTool.use : "Tap a tool to see what it’s for."}</p>
            <div className="chips">
              {toolkit.map((t) => (
                <button key={t.name} type="button" className="chip" aria-pressed={t.name === tool}
                  onClick={() => setTool(t.name === tool ? null : t.name)}>{t.name}</button>
              ))}
            </div>
          </article>
        </div>
      </div>
      <div className="in"><p className="cap">About · Scott Galetto · Chicago</p></div>
    </section>
  );
}
