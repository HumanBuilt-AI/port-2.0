/**
 * Alternate contact illustration: a manual typewriter typing a note, in the same flat
 * black-and-white style as RingingPhone (hatched disc, dotted stitch, line fans).
 * Shares the .contact.ringing trigger: the carriage steps along and the note types out.
 */
const C = { x: 210, y: 212, r: 150 };
const hatch = Array.from({ length: 37 }, (_, i) => {
  const x = C.x - C.r + 4 + i * 8.2;
  const h = Math.sqrt(Math.max(0, C.r * C.r - (x - C.x) ** 2));
  return `M${x.toFixed(1)} ${(C.y - h).toFixed(1)} V${(C.y + h).toFixed(1)}`;
}).join(" ");

// typebars fanning up from the basket to the platen
const bars = Array.from({ length: 15 }, (_, i) => {
  const a = ((200 + i * 10) * Math.PI) / 180;
  return `M${(210 + 10 * Math.cos(a)).toFixed(1)} ${(236 + 10 * Math.sin(a)).toFixed(1)} L${(210 + 52 * Math.cos(a)).toFixed(1)} ${(236 + 24 * Math.sin(a)).toFixed(1)}`;
}).join(" ");

const rows = [
  { y: 258, n: 10, x0: 113 },
  { y: 279, n: 9, x0: 124 },
];

export function Typewriter({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 420 420" role="img" aria-label="A typewriter typing a note that says: hi scott, let's make something">
      <path d={hatch} className="rp-hatch" />

      {/* paper, rising out of the carriage */}
      <g className="tw-paper">
        <rect x="134" y="48" width="152" height="150" rx="2" className="rp-paper" />
        <path d="M150 140 H270 M150 154 H250 M150 168 H262" className="tw-rule" />
        <text x="150" y="86" className="tw-type tw-l1">hi scott,</text>
        <text x="150" y="110" className="tw-type tw-l2">let’s make</text>
        <text x="150" y="128" className="tw-type tw-l3">something_</text>
      </g>

      {/* carriage + platen, steps left as it types */}
      <g className="tw-carriage">
        <rect x="96" y="184" width="228" height="28" rx="14" className="rp-ink" />
        <path d="M112 198 H308" className="rp-stitch" />
        <circle cx="86" cy="198" r="16" className="rp-ink" /><circle cx="86" cy="198" r="4" className="rp-paper-fill" />
        <circle cx="334" cy="198" r="16" className="rp-ink" /><circle cx="334" cy="198" r="4" className="rp-paper-fill" />
        <path d="M100 186 L72 150 L56 158" className="tw-lever" />
        <rect x="128" y="176" width="164" height="9" rx="2" className="rp-paper" />
      </g>

      {/* body */}
      <path d="M68 306 L98 222 H322 L352 306 Q355 324 336 324 H84 Q65 324 68 306 Z" className="rp-ink" />
      <path d="M88 304 L112 234 H308 L332 304" className="rp-stitch" />
      <rect x="92" y="324" width="34" height="9" rx="2" className="rp-ink" />
      <rect x="294" y="324" width="34" height="9" rx="2" className="rp-ink" />

      {/* typebar basket */}
      <path d="M156 236 A54 22 0 0 1 264 236 Z" className="rp-paper-fill" />
      <path d={bars} className="tw-bars" />

      {/* keys */}
      {rows.map((r) => Array.from({ length: r.n }, (_, i) => (
        <circle key={`${r.y}-${i}`} cx={r.x0 + i * 21.5} cy={r.y} r="7.5" className={`rp-line tw-key k${(i * 7 + r.n) % 5}`} />
      )))}
      <rect x="150" y="296" width="120" height="10" rx="5" className="rp-paper" />

      {/* sound of keys: little line fans */}
      <path d="M58 248 L40 240 M56 262 L36 262 M58 276 L40 284" className="rp-ring" />
      <path d="M362 248 L380 240 M364 262 L384 262 M362 276 L380 284" className="rp-ring" />
    </svg>
  );
}
