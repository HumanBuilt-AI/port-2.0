"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { RingingPhone } from "./RingingPhone";
import { Typewriter } from "./Typewriter";

/** Which illustration the contact section shows. Preview the other with ?art=typewriter or ?art=phone. */
const CONTACT_ART: "phone" | "typewriter" = "phone";
import { ArrowCircle } from "./ArrowCircle";

const noop = () => () => {};
const readArt = () => {
  const q = new URLSearchParams(window.location.search).get("art");
  return q === "phone" || q === "typewriter" ? q : CONTACT_ART;
};

const LINKS: [string, string][] = [["approach", "#flow"], ["specs", "#specs"], ["work", "#work"], ["about", "#about"]];

/** Contact: a ringing phone on a coral splash that grows with scroll, plus the footer. */
export function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const [time, setTime] = useState("");
  const art = useSyncExternalStore(noop, readArt, () => CONTACT_ART);

  // splash: --p goes 0 → 1 as the section scrolls into view
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const tick = () => {
      raf = 0;
      const art = el.querySelector(".contact-art") ?? el;
      const r = art.getBoundingClientRect(), vh = window.innerHeight;
      const p = reduce ? 1 : Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.7)));
      el.style.setProperty("--p", p.toFixed(3));
      el.classList.toggle("ringing", p > 0.8);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, []);

  // local time in Chicago, ticking each minute
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", hour: "numeric", minute: "2-digit" });
    const set = () => setTime(fmt.format(new Date()));
    set();
    const id = setInterval(set, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="contact" id="contact" aria-labelledby="contact-h" ref={ref}>
      <div className="in">
        <div className="row">
          <div className="contact-copy">
            <span className="pill">Section 06 · Contact</span>
            <h2 id="contact-h">The line is open. <span className="soft">Drop me a line.</span></h2>
            <p className="lede contact-lede">Half-formed idea, messy brief, a product that should exist and doesn’t yet. Those are my favorite emails to open.</p>
            <div className="links">
              <button className="btn fill" type="button" id="copy">scottgaletto@gmail.com <span id="copy-l" style={{ opacity: ".6" }}>copy</span></button>
              <a className="btn" href="https://www.linkedin.com/in/scottgaletto" target="_blank" rel="noopener">LinkedIn</a>
              <span className="btn dim">Résumé soon</span>
            </div>
            <p className="contact-clock"><i aria-hidden="true" /><span>It’s <b suppressHydrationWarning>{time || "—"}</b> in Chicago</span></p>
          </div>
          <a className="contact-art" href="mailto:scottgaletto@gmail.com" aria-label="Email Scott">
            <span className="splash" aria-hidden="true"><i className="s1" /><i className="s2" /><i className="s3" /></span>
            {art === "typewriter" ? <Typewriter className="rp-svg" /> : <RingingPhone className="rp-svg" />}
          </a>
        </div>
        <footer className="foot">
          <nav aria-label="Footer">{LINKS.map(([t, h]) => <a key={t} href={h}>{t}</a>)}</nav>
          <span className="foot-c">© 2026 · Chicago</span>
          <a className="foot-top" href="#top">Back to top <ArrowCircle dir="n" /></a>
        </footer>
      </div>
    </section>
  );
}
