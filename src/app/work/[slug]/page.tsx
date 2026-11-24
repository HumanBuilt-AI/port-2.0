import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { studies } from "@/content/cases";
import { casePage, casePages, type Block, type Media } from "@/content/case-pages";
import { ArrowCircle } from "@/components/ArrowCircle";
import { SectionBadge } from "@/components/SectionBadge";
import { CaseIcon } from "@/components/CaseIcon";
import { CaseHeroArt, hasCaseHeroArt } from "@/components/CaseHeroArt";
import { RobotInit } from "@/components/RobotInit";

export function generateStaticParams() {
  return casePages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = casePage(slug);
  if (!p) return {};
  return { title: `${p.client}: ${p.title} ${p.soft} · Scott Galetto`, description: p.lede };
}

function Pic({ m, slug }: { m: Media; slug: string }) {
  const src = `/work/${slug}/${m.src}`;
  return (
    <figure className="cs-fig">
      <div className="cs-tile">
        {m.video ? (
          <video src={src} poster={m.poster && `/work/${slug}/${m.poster}`} autoPlay muted loop playsInline aria-label={m.alt} />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={m.alt} loading="lazy" decoding="async" />
        )}
      </div>
      {m.cap && <figcaption className="fine">{m.cap}</figcaption>}
    </figure>
  );
}

function Section({ b, i, slug }: { b: Block; i: number; slug: string }) {
  const n = String(i + 2).padStart(2, "0");
  return (
    <section className={`cs-block${b.dark ? " on-dark" : ""}`}>
      <div className="cs-card">
        <header className="cs-bh">
          <span className={`pill${b.dark ? " on-dark" : ""}`}>
            {n} · {b.kicker}
          </span>
          <h2>
            {b.title} {b.soft && <span className="soft">{b.soft}</span>}
          </h2>
        </header>
        {b.body && (
          <div className="cs-body">
            {b.body.map((t) => (
              <p key={t.slice(0, 24)}>{t}</p>
            ))}
          </div>
        )}
        {b.points && (
          <ul className="cs-points" style={{ "--cols": b.points.length === 6 ? 3 : Math.min(b.points.length, 4) } as React.CSSProperties}>
            {b.points.map((pt) => (
              <li key={pt.k}>
                <span className="fine">{pt.k}</span>
                <span>{pt.v}</span>
              </li>
            ))}
          </ul>
        )}
        {b.stats && (
          <ul className="cs-stats">
            {b.stats.map((s) => (
              <li key={s.n + s.l}>
                <span className="cs-n">{s.n}</span>
                <span>{s.l}</span>
              </li>
            ))}
          </ul>
        )}
        {b.note && <p className="fine cs-note">{b.note}</p>}
      </div>
      {b.media && (
        <div className={`cs-media ${b.layout ?? "wide"}`}>
          {b.media.map((m) => (
            <Pic key={m.src} m={m} slug={slug} />
          ))}
        </div>
      )}
      {b.embed && (
        <figure className="cs-fig">
          <div className={`cs-tile cs-embed${b.embed.tall ? " tall" : ""}`}>
            <iframe src={b.embed.src} title={b.embed.title} loading="lazy" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
          </div>
          {b.embed.note && (
            <figcaption className="fine">
              {b.embed.note}{" "}
              <a href={b.embed.src} target="_blank" rel="noopener">
                Open in a new tab ↗
              </a>
            </figcaption>
          )}
        </figure>
      )}
    </section>
  );
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const p = casePage(slug);
  const s = studies.find((x) => x.slug === slug);
  if (!p || !s) notFound();
  const at = studies.indexOf(s);
  const next = studies[(at + 1) % studies.length];

  return (
    <>
      <header className="index cs-top">
        <div className="in">
          <Link className="wordmark robot" href="/" aria-label="Scott Galetto, back home">
            <canvas width="180" height="180" aria-hidden="true"></canvas>
            <span className="rb-fallback">
              scott
              <br />
              galetto
            </span>
          </Link>
          <Link className="cs-back" href="/#work">
            <ArrowCircle dir="w" />
            <span>All work</span>
          </Link>
        </div>
      </header>

      <main className="cs" id="top">
        <div className="in">
          <section className="cs-hero on-dark" aria-labelledby="cs-h">
            <div className="cs-hero-top">
              <SectionBadge num={s.num} kind="Case study" label={s.name} onDark />
              <span className="fine">{p.tags.join(" · ")}</span>
            </div>
            <div className="cs-hero-mid">
              <div>
                <p className="cs-client">{p.client}</p>
                <h1 id="cs-h">
                  {p.title} <span className="soft">{p.soft}</span>
                </h1>
              </div>
              {hasCaseHeroArt(slug) ? (
                <div className="cs-hero-side has-art">
                  <CaseHeroArt slug={slug} />
                </div>
              ) : (
                <div className="cs-hero-side">
                  <CaseIcon slug={slug} />
                  <span className="numeral" aria-hidden="true">
                    {s.num}
                  </span>
                </div>
              )}
            </div>
            <div className="cs-hero-foot">
              <p className="lede">{p.lede}</p>
              {p.links && (
                <div className="cs-links">
                  {p.links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noopener">
                      <span>{l.label}</span>
                      <ArrowCircle />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </section>

          <dl className="cs-meta">
            {p.meta.map(([k, v]) => (
              <div key={k}>
                <dt className="fine">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          {p.disclaimer && <p className="fine cs-disclaimer">{p.disclaimer}</p>}

          <section className="cs-short" aria-label="The short version">
            {(["problem", "approach", "result"] as const).map((k, i) => (
              <div key={k} className={i === 2 ? "on-dark" : ""}>
                <span className={`pill${i === 2 ? " on-dark" : ""}`}>{k}</span>
                <p>{p.short[k]}</p>
              </div>
            ))}
          </section>

          <div className={`cs-media ${p.heroPair ? "phones" : "wide"} cs-lead`}>
            <Pic m={p.hero} slug={slug} />
            {p.heroPair && <Pic m={p.heroPair} slug={slug} />}
          </div>

          {p.blocks.map((b, i) => (
            <Section key={b.kicker} b={b} i={i} slug={slug} />
          ))}

          <Link className="cs-next" href={`/work/${next.slug}`}>
            <span className="fine">Next case study · {next.num}</span>
            <span className="cs-next-t">
              {next.name}
              <span className="soft"> {next.title}</span>
            </span>
            <ArrowCircle />
          </Link>
        </div>
      </main>
      <RobotInit />
    </>
  );
}
