import Link from "next/link";
import { studies } from "@/content/cases";
import { ArrowCircle } from "@/components/ArrowCircle";

/**
 * Selected work: six case studies, copy from humanbuiltai.work.
 * Thumbs are clean placeholders until the new case study artwork is ready;
 * set `art` on a study in src/content/cases.ts to replace one.
 * Frames are 2:1 to match the artwork.
 */
export function CaseStudies() {
  return (
    <section className="cases" id="work" aria-labelledby="cases-h">
      <div className="in">
        <header className="cases-head">
          <div className="cases-title">
            <span className="pill">Section 03 · Work</span>
            <h2 id="cases-h" className="h2">
              Selected <span className="soft">work</span>
            </h2>
          </div>
          <div className="cases-side">
            <span className="numeral" aria-hidden="true">
              {String(studies.length).padStart(2, "0")}
            </span>
            <p className="fine">Case studies, 2014 to 2026</p>
          </div>
        </header>
        <ul className="cases-grid">
          {studies.map((s) => (
            <li key={s.num}>
              <Link className="case" href={`/work/${s.slug}`}>
                <span className="case-art">
                  {s.art ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`${s.art}-1024.webp`}
                      srcSet={`${s.art}-640.webp 640w, ${s.art}-1024.webp 1024w`}
                      sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw"
                      width={1024}
                      height={512}
                      loading="lazy"
                      decoding="async"
                      alt=""
                    />
                  ) : (
                    <span className="case-ph" aria-hidden="true">
                      <span className="cap">artwork {s.num}</span>
                    </span>
                  )}
                </span>
                <span className="case-meta">
                  <span>
                    {s.num} · {s.year}
                  </span>
                  <span>{s.name}</span>
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
        <p className="cap">Selected work · six case studies · new artwork coming</p>
      </div>
    </section>
  );
}
