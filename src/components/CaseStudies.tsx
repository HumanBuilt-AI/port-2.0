import Link from "next/link";
import { studies } from "@/content/cases";
import { ArrowCircle } from "@/components/ArrowCircle";
import { SectionBadge } from "@/components/SectionBadge";

/**
 * Selected work: six case studies, copy from humanbuiltai.work.
 * Each card shows a simplified, recoloured take on the case page header art
 * (public/work/<slug>/card.svg, 4:3) with the study name over it in HTML
 * and the client logo in the bottom-right corner (per Scott's Figma, node 7:771).
 */
export function CaseStudies() {
  return (
    <section className="cases" id="work" aria-labelledby="cases-h">
      <div className="in">
        <header className="cases-head">
          <div className="cases-title">
            <SectionBadge num="01" label="Work" />
            <h2 id="cases-h" className="h2">
              Selected <span className="soft">work</span>
            </h2>
            <p className="cases-lede">
              Print to digital, desktop to mobile, native apps to the web, and now AI. Every shift asked the same thing: figure out what the new technology makes possible, then make it useful.
            </p>
          </div>
        </header>
        <ul className="cases-grid">
          {studies.map((s) => (
            <li key={s.num}>
              <Link className="case" href={`/work/${s.slug}`}>
                <span className="case-art">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/work/${s.slug}/card.svg`} width={800} height={600} loading="lazy" decoding="async" alt="" />
                  <span className="case-name">{s.name}</span>
                  {/* The client name is already in the text beside it, so the logo is decorative for screen readers. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="case-logo"
                    src={`/work/${s.slug}/logo.svg`}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    style={{ "--logo-w": `${s.logoW}%` } as React.CSSProperties}
                  />
                </span>
                <span className="case-meta">
                  <span>{s.num}</span>
                </span>
                <h3>{s.title}</h3>
                <p>{s.blurb}</p>
                <span className="case-foot">
                  <span className="case-tags">{s.tags}</span>
                  <ArrowCircle />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="in">
        <p className="cap">Selected work · six case studies</p>
      </div>
    </section>
  );
}
