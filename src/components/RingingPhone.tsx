/**
 * Contact illustration: a rotary phone ringing off its cradle, a letter flying out.
 * Flat black shapes with white detail, line-fan "ring" marks, hatched backdrop and a
 * dotted stitch, in the spirit of bold editorial spot illustrations.
 */
const C = { x: 210, y: 212, r: 150 };

// hatched disc behind the phone: vertical lines clipped to a circle
const hatch = Array.from({ length: 37 }, (_, i) => {
  const x = C.x - C.r + 4 + i * 8.2;
  const dx = x - C.x;
  const h = Math.sqrt(Math.max(0, C.r * C.r - dx * dx));
  return `M${x.toFixed(1)} ${(C.y - h).toFixed(1)} V${(C.y + h).toFixed(1)}`;
}).join(" ");

// coiled cord: loops riding along a curve from the phone body
const coil = (() => {
  const p0 = [96, 300], p1 = [14, 330], p2 = [60, 392];
  const pts: string[] = [];
  const N = 260, turns = 11;
  for (let i = 0; i <= N; i++) {
    const t = i / N, u = 1 - t;
    const x = u * u * p0[0] + 2 * u * t * p1[0] + t * t * p2[0];
    const y = u * u * p0[1] + 2 * u * t * p1[1] + t * t * p2[1];
    const a = t * turns * Math.PI * 2;
    pts.push(`${(x + 8 * Math.cos(a)).toFixed(1)},${(y + 11 * Math.sin(a)).toFixed(1)}`);
  }
  return "M" + pts.join(" L");
})();

// finger holes on the dial
const holes = Array.from({ length: 10 }, (_, i) => {
  const a = ((-60 + i * 27) * Math.PI) / 180;
  return { cx: 200 + 34 * Math.cos(a), cy: 258 + 34 * Math.sin(a) };
});

// ring marks: short strokes fanning out from a point
const fan = (x: number, y: number, from: number, to: number, n: number) =>
  Array.from({ length: n }, (_, i) => {
    const a = ((from + ((to - from) * i) / (n - 1)) * Math.PI) / 180;
    const r0 = 16, r1 = i % 2 ? 34 : 44;
    return `M${(x + r0 * Math.cos(a)).toFixed(1)} ${(y + r0 * Math.sin(a)).toFixed(1)} L${(x + r1 * Math.cos(a)).toFixed(1)} ${(y + r1 * Math.sin(a)).toFixed(1)}`;
  }).join(" ");

export function RingingPhone({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 420 420" role="img" aria-label="A rotary phone ringing off its cradle, a letter flying out of it">
      <path d={hatch} className="rp-hatch" />
      <path d={coil} className="rp-cord" />

      {/* body */}
      <path d="M90 300 L120 196 H280 L310 300 Q313 318 295 318 H105 Q87 318 90 300 Z" className="rp-ink" />
      <path d="M110 298 L134 210 H266 L290 298" className="rp-stitch" />
      <rect x="112" y="318" width="30" height="9" rx="2" className="rp-ink" />
      <rect x="258" y="318" width="30" height="9" rx="2" className="rp-ink" />
      <rect x="132" y="178" width="22" height="22" rx="3" className="rp-ink" />
      <rect x="246" y="178" width="22" height="22" rx="3" className="rp-ink" />

      {/* dial */}
      <circle cx="200" cy="258" r="50" className="rp-paper" />
      {holes.map((h, i) => <circle key={i} cx={h.cx.toFixed(1)} cy={h.cy.toFixed(1)} r="7.5" className="rp-line" />)}
      <circle cx="200" cy="258" r="17" className="rp-ink" />
      <circle cx="200" cy="258" r="3" className="rp-paper-fill" />
      <path d="M236 290 L246 300" className="rp-line" />

      {/* handset, lifted and ringing */}
      <g className="rp-handset">
        <path d="M96 160 Q96 126 128 124 H272 Q304 126 304 160 V170 Q304 182 290 182 H262 Q250 182 250 170 V158 H150 V170 Q150 182 138 182 H110 Q96 182 96 170 Z" className="rp-ink" />
        <path d="M118 138 H282" className="rp-stitch" />
        <path d={fan(98, 150, 175, 255, 6)} className="rp-ring" />
        <path d={fan(302, 150, -75, 5, 6)} className="rp-ring" />
      </g>

      {/* letter on its way */}
      <g className="rp-letter">
        <path d="M292 62 H324 M282 76 H318 M298 90 H322" className="rp-speed" />
        <g transform="translate(336 40) rotate(14)">
          <rect x="0" y="0" width="74" height="48" rx="3" className="rp-paper" />
          <path d="M0 2 L37 28 L74 2" className="rp-line" />
          <rect x="52" y="30" width="14" height="12" className="rp-ink" />
        </g>
      </g>
    </svg>
  );
}
