/**
 * Top-of-page menu: a small gold robot (home) with the sections on one row beside it.
 * Each section's sub-links stay hidden and slide down on hover or keyboard focus.
 */
const LI = "https://www.linkedin.com/in/scottgaletto";
// Studio is hidden for now. To restore it, add this back to `sections` (after work):
// { icon: "studio", label: "studio", href: "#work", subs: [["side projects", "#work"], ["experiments", "#work"]] },
const sections: { icon: string; label: string; href: string; subs: [string, string][] }[] = [
  { icon: "work", label: "work", href: "#work", subs: [["specs", "/work/specs"], ["aon", "#work"], ["creditninja", "#work"], ["verizon", "#work"], ["chipotle", "#work"]] },
  { icon: "specs", label: "specs", href: "/work/specs", subs: [["case study", "/work/specs"], ["try it", "https://specs.humanbuiltai.work"]] },
  { icon: "approach", label: "approach", href: "#flow", subs: [["the flow", "#flow"], ["the brief", "#brand"]] },
  { icon: "about", label: "about", href: "#about", subs: [["who i am", "#about"], ["toolkit", "#about"]] },
  { icon: "contact", label: "contact", href: "#contact", subs: [["email", "#contact"], ["linkedin", LI], ["résumé", "#contact"]] },
];

export function SiteIndex() {
  return (
    <header className="index" id="index">
      <div className="in">
        <a className="wordmark robot" href="#top" aria-label="Scott Galetto, back to the top"><canvas width="180" height="180" aria-hidden="true"></canvas><span className="rb-fallback">scott<br />galetto</span></a>
        <nav className="idx-row" aria-label="Sections">
          {sections.map((s) => (
            <div className="idx" key={s.label}>
              <svg className="ico" aria-hidden="true"><use href={`#i-${s.icon}`} /></svg>
              <a className="idx-l" href={s.href}><b>{s.label}</b></a>
              <ul>
                {s.subs.map(([t, h], i) => (
                  <li key={t} style={{ "--i": i } as React.CSSProperties}>
                    <a href={h} {...(h.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}>{t}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}
