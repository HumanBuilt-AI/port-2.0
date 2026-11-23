/**
 * Selected work: six case studies, copy from humanbuiltai.work.
 * Thumbs are clean placeholders until the new case study artwork is ready;
 * drop an image path into `art` to replace one.
 */
type Study = {
  name: string;
  num: string;
  year: string;
  tags: string;
  title: string;
  blurb: string;
  href: string;
  art?: string;
};

const studies: Study[] = [
  {
    name: "Specs",
    num: "01",
    year: "2026",
    tags: "AI product · Brand systems",
    title: "A brand kit for AI.",
    blurb:
      "My own app turns a small business’s messy logo, PDFs and photos into a kit AI can follow, then art-directs on-brand posts that explain their choices.",
    href: "https://humanbuiltai.work/work/specs/",
  },
  {
    name: "Aon / Horizon",
    num: "02",
    year: "2018",
    tags: "Product design · Data viz · AI",
    title: "Complex data, made explorable.",
    blurb:
      "A climate-risk visualizer rebuilt around the questions people bring to it, with a conversational layer for asking the data.",
    href: "https://humanbuiltai.work/work/aon-horizon/",
  },
  {
    name: "Chipotle / RAINCHECK",
    num: "03",
    year: "2016",
    tags: "SMS · Mobile Wallet · Animation",
    title: "A closed door, turned into a free burrito.",
    blurb: "The text-to-Wallet campaign that drew 5.3 million requests in about five hours.",
    href: "https://humanbuiltai.work/work/chipotle-raincheck/",
  },
  {
    name: "CreditNinja",
    num: "04",
    year: "2021",
    tags: "UX · Conversational form",
    title: "A 15-minute form, now under five.",
    blurb: "A loan eligibility flow redesigned as a conversation, with a 40% lift in completion.",
    href: "https://humanbuiltai.work/work/creditninja/",
  },
  {
    name: "Sauza / Lasso Up With A Cowboy",
    num: "05",
    year: "2014",
    tags: "Interactive kiosk · Game",
    title: "One throw, two screens.",
    blurb:
      "A phone-to-iPad in-store game that won a Verizon Partner Innovation Award for its use of WebSockets.",
    href: "https://humanbuiltai.work/work/sauza-lasso/",
  },
  {
    name: "Verizon / IndyCar",
    num: "06",
    year: "2014",
    tags: "Mobile web · VR",
    title: "Race day, in fans’ hands.",
    blurb:
      "A mobile web and VR activation that lifted engagement with Ways to Win by 124% over the prior year.",
    href: "https://humanbuiltai.work/work/verizon-indycar/",
  },
];

export function CaseStudies() {
  return (
    <section className="cases" id="work" aria-labelledby="cases-h">
      <div className="in">
        <header className="cases-head">
          <h2 id="cases-h" className="h2">
            Selected work
          </h2>
          <span className="sig muted">{String(studies.length).padStart(2, "0")} case studies</span>
        </header>
        <ul className="cases-grid">
          {studies.map((s) => (
            <li key={s.num}>
              <a className="case" href={s.href} target="_blank" rel="noopener">
                <span className="case-art">
                  {s.art ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={s.art} alt="" />
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
                <span className="case-tags">{s.tags}</span>
              </a>
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
