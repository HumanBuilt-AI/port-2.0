/**
 * Spot illustrations for the case studies: bold black geometry, solid fills,
 * stripes and radial lines. Original drawings, one per study.
 */
const icons: Record<string, React.ReactNode> = {
  // a fan of brand swatches with a ruler edge
  specs: (
    <>
      {[-48, -32, -16, 0].map((r, i) => (
        <g key={r} transform={`rotate(${r} 34 96)`}>
          <rect x="22" y="18" width="24" height="80" rx="4" className={i === 3 ? "solid" : "paper"} />
          {i < 3 && <line x1="22" y1="34" x2="46" y2="34" />}
        </g>
      ))}
      <rect x="62" y="18" width="38" height="80" rx="4" className="paper" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <line key={i} x1="62" y1={26 + i * 9} x2={i % 2 ? 72 : 78} y2={26 + i * 9} />
      ))}
      <circle cx="88" cy="84" r="6" className="solid" />
    </>
  ),
  // a striped globe with a pin and a time dial
  "aon-horizon": (
    <>
      <circle cx="56" cy="62" r="40" className="paper" />
      <path d="M56 22 A40 40 0 0 1 56 102 Z" className="solid" />
      {[-26, -13, 0, 13, 26].map((y) => (
        <line key={y} x1={56 - Math.sqrt(1600 - y * y)} y1={62 + y} x2="56" y2={62 + y} />
      ))}
      <ellipse cx="56" cy="62" rx="18" ry="40" />
      <circle cx="96" cy="26" r="14" className="paper" />
      <path d="M96 26 V16 M96 26 L104 30" />
      <path d="M38 50 a8 8 0 1 1 16 0 c0 7 -8 14 -8 14 s-8 -7 -8 -14 Z" className="paper" />
      <circle cx="46" cy="50" r="2.5" className="solid" />
    </>
  ),
  // a foil-wrapped burrito with a text bubble
  "chipotle-raincheck": (
    <>
      <rect x="12" y="52" width="86" height="40" rx="20" className="paper" />
      <path d="M55 52 H78 A20 20 0 0 1 78 92 H55 Z" className="solid" />
      {[22, 30, 38, 46].map((x) => (
        <line key={x} x1={x} y1="58" x2={x - 4} y2="86" />
      ))}
      <path d="M62 30 h44 a6 6 0 0 1 6 6 v16 a6 6 0 0 1 -6 6 h-28 l-10 8 v-8 h-6 a6 6 0 0 1 -6 -6 v-16 a6 6 0 0 1 6 -6 Z" className="paper" />
      <circle cx="74" cy="44" r="2.5" className="solid" />
      <circle cx="84" cy="44" r="2.5" className="solid" />
      <circle cx="94" cy="44" r="2.5" className="solid" />
    </>
  ),
  // a chat thread: question, reply, next question
  creditninja: (
    <>
      <rect x="14" y="14" width="62" height="24" rx="12" className="paper" />
      <line x1="26" y1="26" x2="60" y2="26" />
      <rect x="44" y="46" width="62" height="24" rx="12" className="solid" />
      <rect x="14" y="78" width="62" height="24" rx="12" className="paper" />
      {[28, 40, 52].map((x) => (
        <circle key={x} cx={x} cy="90" r="2.5" className="solid" />
      ))}
      <path d="M96 84 v20 M88 96 l8 8 8 -8" />
    </>
  ),
  // a lasso loop dropping over a bottle
  "sauza-lasso": (
    <>
      <path d="M50 108 V66 c0 -8 6 -12 6 -20 V30 h12 v16 c0 8 6 12 6 20 V108 Z" className="solid" />
      <rect x="56" y="22" width="12" height="8" className="paper" />
      <rect x="52" y="74" width="20" height="16" className="paper" />
      <ellipse cx="62" cy="40" rx="34" ry="12" />
      <ellipse cx="62" cy="40" rx="28" ry="8" />
      <path d="M28 42 C 18 60, 26 80, 10 100" />
      <path d="M33 44 C 24 62, 32 82, 16 104" />
    </>
  ),
  // a checkered flag on a pole beside a VR viewer
  "verizon-indycar": (
    <>
      <line x1="18" y1="12" x2="18" y2="108" />
      <rect x="18" y="14" width="56" height="40" className="paper" />
      {[0, 1, 2, 3].map((r) =>
        [0, 1, 2, 3, 4, 5, 6].map((c) =>
          (r + c) % 2 === 0 ? <rect key={`${r}${c}`} x={18 + c * 8} y={14 + r * 10} width="8" height="10" className="solid" /> : null,
        ),
      )}
      <path d="M50 74 h56 v24 h-18 l-6 -8 h-8 l-6 8 h-18 Z" className="paper" />
      <circle cx="66" cy="86" r="6" className="solid" />
      <circle cx="90" cy="86" r="6" className="solid" />
      <path d="M62 74 l6 -10 h20 l6 10" />
    </>
  ),
};

export function CaseIcon({ slug, className = "" }: { slug: string; className?: string }) {
  return (
    <svg className={`spot ln ${className}`} viewBox="0 0 120 120" aria-hidden="true">
      {icons[slug]}
    </svg>
  );
}
