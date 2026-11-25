/**
 * Hero illustration for the "I am a ___ creative technologist" intro (preview route).
 * Original artwork: Scott in profile (cap, raised brow, stubble, fleece collar) over two echo heads (hatched, dotted, line), a pencil whose
 * scribble turns into circuit traces running into the head, and idea rays at the crown.
 * Bold black-and-white line style; the panel tint is driven by --hi-tint from HeroIntro.
 * Motion lives in globals.css (.hi-art …) and switches off under prefers-reduced-motion.
 */
const HEAD =
  "M250 560 C250 522 290 500 340 494 L352 494 L352 440 C300 410 286 330 310 260 C335 180 410 130 480 140 C545 150 580 200 586 262 L590 316 Q600 322 598 332 L624 370 Q627 380 615 381 L602 381 Q598 386 602 390 L607 396 Q606 401 600 402 L605 408 Q604 417 596 418 L600 432 Q601 448 584 452 C562 458 540 458 522 454 L518 490 C580 496 640 520 640 560 Z";
// Scott's cap: crown over the skull, brim out past the brow
const CAP = "M298 306 C288 204 374 122 474 122 C556 122 604 184 604 258 L676 270 Q686 282 672 290 L590 294 L330 312 Z";

const TRACES = [
  "M24 250 H100 Q120 250 120 270 V316 Q120 336 140 336 H300",
  "M214 470 H268 Q288 470 288 450 V398 Q288 378 308 378 H330",
  "M190 206 V214 Q190 234 210 234 H330",
  "M24 430 H52 Q72 430 72 410 V392 Q72 372 92 372 H140",
];

export function HeroIllustration() {
  return (
    <svg className="hi-art" viewBox="0 0 640 560" role="img" aria-label="Illustration: Scott in profile, in his cap, with two echo outlines behind him and a pencil whose scribble turns into circuit lines running into the head">
      <defs>
        <pattern id="hi-hatch" width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" fill="var(--white)" />
          <path d="M0 4 H8" stroke="var(--ink)" strokeWidth="1.6" />
        </pattern>
        <pattern id="hi-dots" width="9" height="9" patternUnits="userSpaceOnUse">
          <rect width="9" height="9" fill="var(--white)" />
          <circle cx="4.5" cy="4.5" r="1.7" fill="var(--ink)" />
        </pattern>
        <pattern id="hi-stubble" width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="var(--ink)" />
          <circle cx="5.5" cy="5.5" r="1.2" fill="var(--ink)" />
        </pattern>
        <pattern id="hi-steps" width="6" height="6" patternUnits="userSpaceOnUse">
          <path d="M0 3 H6" stroke="var(--ink)" strokeWidth="1.4" />
        </pattern>
        <clipPath id="hi-front"><path d={HEAD} /></clipPath>
        <clipPath id="hi-panel"><rect x="0" y="190" width="640" height="370" rx="22" /></clipPath>
      </defs>

      {/* panel, tinted per word */}
      <rect className="hi-panel" x="0" y="190" width="640" height="370" rx="22" />

      <g clipPath="url(#hi-panel)">
        {/* striped steps, bottom left */}
        <path d="M0 560 V500 H70 V460 H130 V420 H170 V560 Z" fill="url(#hi-steps)" />
        <path d="M0 500 H70 V460 H130 V420 H170" fill="none" stroke="var(--ink)" strokeWidth="2.5" />

        {/* circuit traces + travelling pulses */}
        <g fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {TRACES.map((d, i) => <path key={i} d={d} />)}
        </g>
        <g className="hi-pulses" fill="none" stroke="var(--ink)" strokeWidth="5" strokeLinecap="round">
          {TRACES.map((d, i) => <path key={i} d={d} pathLength={100} style={{ animationDelay: `${i * -1.3}s` }} />)}
        </g>
        <g className="hi-nodes">
          <circle cx="24" cy="250" r="7" fill="var(--white)" stroke="var(--ink)" strokeWidth="2.5" />
          <circle cx="24" cy="430" r="7" fill="var(--white)" stroke="var(--ink)" strokeWidth="2.5" />
          <circle cx="190" cy="206" r="7" fill="var(--white)" stroke="var(--ink)" strokeWidth="2.5" />
          <circle cx="120" cy="296" r="4.5" fill="var(--ink)" />
          <circle cx="288" cy="420" r="4.5" fill="var(--ink)" />
          <circle cx="72" cy="400" r="4.5" fill="var(--ink)" />
          <circle cx="140" cy="372" r="7" fill="var(--white)" stroke="var(--ink)" strokeWidth="2.5" />
        </g>
        {/* small right-hand trace behind the shoulders */}
        <path d="M640 236 H624 Q612 236 612 248 V300" fill="none" stroke="var(--ink)" strokeWidth="2" />
        <circle cx="612" cy="300" r="4.5" fill="var(--ink)" />
      </g>

      {/* heads: hatched back, solid middle, line-drawn front */}
      <g className="hi-heads">
        <path className="hi-h3" d={HEAD} transform="translate(-84 -4)" fill="url(#hi-hatch)" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round" />
        <path className="hi-h2" d={HEAD} transform="translate(-42 -2)" fill="url(#hi-dots)" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round" />
        <g className="hi-h1">
          <path d={HEAD} fill="var(--white)" />
          <g clipPath="url(#hi-front)">
            {/* stubble: stippled jaw, chin and moustache */}
            <path d="M462 392 Q508 428 566 388 L600 384 L640 378 L640 470 L420 470 Z" fill="url(#hi-stubble)" />
            {/* short hair at the nape, under the cap */}
            <path d="M300 300 L392 300 C392 322 386 340 372 352 L300 352 Z" fill="var(--ink)" />
            {/* concentric ear, like a scroll */}
            <circle cx="446" cy="350" r="22" fill="var(--white)" stroke="var(--ink)" strokeWidth="3" />
            <circle cx="446" cy="350" r="13" fill="none" stroke="var(--ink)" strokeWidth="2" />
            <circle cx="446" cy="350" r="5" fill="var(--ink)" />
            {/* striped jacket */}
            <path d="M330 520 H640 M330 530 H640 M330 540 H640 M330 550 H640" stroke="var(--ink)" strokeWidth="2" />
          </g>
          <path d={HEAD} fill="none" stroke="var(--ink)" strokeWidth="3.5" strokeLinejoin="round" />
          {/* fleece collar */}
          <path d="M456 506 Q458 482 482 484 Q494 466 514 476 Q532 466 548 482 Q570 482 572 504 Q540 494 514 496 Q484 494 456 506 Z" fill="var(--white)" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round" />
          {/* cap, with stitch lines */}
          <path d={CAP} fill="var(--ink)" />
          <g fill="none" stroke="var(--white)" strokeWidth="1.6" strokeDasharray="4 4" strokeLinecap="round">
            <path d="M330 296 C322 210 392 142 474 140 C548 140 588 196 588 258" />
            <path d="M470 124 C452 180 446 240 452 302" />
            <path d="M606 268 L630 272" />
            <path d="M600 280 L628 282" />
          </g>
          {/* eye and a raised, sceptical brow */}
          <circle className="hi-eye" cx="560" cy="324" r="6.5" fill="var(--ink)" />
          <path d="M540 304 Q560 292 580 300" fill="none" stroke="var(--ink)" strokeWidth="6" strokeLinecap="round" />
          {/* mouth */}
          <path d="M582 398 L600 398" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      </g>

      {/* idea rays at the crown */}
      <g className="hi-rays" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="2 7">
        <path d="M560 128 L590 84" />
        <path d="M588 160 L630 132" />
        <path d="M524 112 L534 62" />
      </g>

      {/* the scribble the pencil is drawing */}
      <path className="hi-scribble" d="M118 470 Q134 440 150 470 T182 470 T214 470" pathLength={100} fill="none" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />

      {/* pencil, tip at the start of the scribble */}
      <g className="hi-pencil-pos" transform="translate(118 470)">
        <g className="hi-pencil">
          <g transform="rotate(-105) translate(40 0)">
            <path d="M0 -15 L-40 0 L0 15 Z" fill="var(--white)" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round" />
            <path d="M-40 0 L-26 -5.2 L-26 5.2 Z" fill="var(--ink)" />
            <rect x="0" y="-15" width="200" height="30" fill="var(--white)" stroke="var(--ink)" strokeWidth="3" />
            <path d="M0 -5 H200 M0 5 H200" stroke="var(--ink)" strokeWidth="2" />
            <rect x="200" y="-15" width="30" height="30" fill="var(--ink)" />
            <path d="M208 -15 V15 M216 -15 V15 M224 -15 V15" stroke="var(--white)" strokeWidth="1.6" />
            <path d="M230 -15 H244 Q258 -15 258 0 Q258 15 244 15 H230 Z" fill="url(#hi-hatch)" stroke="var(--ink)" strokeWidth="3" />
          </g>
        </g>
      </g>
    </svg>
  );
}
