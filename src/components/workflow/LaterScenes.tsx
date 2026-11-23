export type LaterBeat = "fill" | "draft" | "refine" | "ship";

const ink = "#292825";
const paper = "#faf0d4";
const gold = "#e6a53b";
const indigo = "#514a76";
const teal = "#4d7774";
const orange = "#c46743";

function Eyes({ x, y, look = 3 }: { x: number; y: number; look?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse rx="9" ry="14" fill={paper} />
      <ellipse cx="23" rx="9" ry="14" fill={paper} />
      <ellipse cx={look} cy="2" rx="3.5" ry="7" fill={ink} />
      <ellipse cx={23 + look} cy="2" rx="3.5" ry="7" fill={ink} />
    </g>
  );
}

function Spark({ x, y }: { x: number; y: number }) {
  return <path transform={`translate(${x} ${y})`} d="M0-15Q4-3 15 0 4 3 0 15-4 3-15 0-4-3 0-15Z" fill={gold} />;
}

function DraftCard({ x, y, variant }: { x: number; y: number; variant: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="4" y="5" width="104" height="118" rx="4" fill="#d8c7aa" />
      <rect width="104" height="118" rx="4" fill="#faf8f0" stroke={ink} strokeWidth="2" />
      {variant === 1 && <path d="M11 66 41 16l21 30 16-17 15 37Z" fill={teal} />}
      {variant === 2 && <><path d="M12 66a26 26 0 0 1 52 0Z" fill={orange} /><circle cx="77" cy="31" r="16" fill={gold} /></>}
      {variant === 3 && <path d="m11 64 33-47 15 31 14-22 20 38Z" fill={indigo} />}
      <path d="M13 82h74m-74 10h56m-56 10h37" fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

export function LaterScene({ beat, settled = false }: { beat: LaterBeat; settled?: boolean }) {
  if (beat === "fill") {
    return (
      <>
        <ellipse cx="199" cy="355" rx="122" ry="12" fill="#d7c6aa" />
        <path d="M136 226l36 5-28 64-43 34-10-19 31-30Zm29 8 32-11 36 104-30 9-39-65Z" fill={ink} />
        <path d="m90 307 20 15-13 29H57q0-15 19-19Zm111 17 27-7 14 15q30-4 44 19h-88Z" fill={indigo} />
        <path d="M57 350h40v10H57Zm141 0h88v10h-88Z" fill="#f2dfb8" />
        <path d="M137 159q31-13 45 22l22 55-58 17-25-29Z" fill={ink} />
        <path d="m116 77 110 55-64 24-11 37-61-38 39-21Z" fill="#df8464" />
        <path d="m116 77 110 55-51-14-46 16Z" fill={orange} />
        <Eyes x={160} y={127} />
        <path d="M164 149q10 8 21 0" fill="none" stroke={ink} strokeWidth="3" strokeLinecap="round" />
        <path d="M181 182q44 33 91 33l24-8m-122-4q32 41 88 41l28-10" fill="none" stroke={ink} strokeWidth="15" strokeLinecap="round" />
        <path d="M282 205q17-13 29-4l4 10-23 11Zm0 27q17-13 29-4l2 10-23 10Z" fill="#df8464" />
        <rect x="357" y="82" width="255" height="241" rx="9" fill="#e4d6be" />
        <rect x="348" y="73" width="255" height="241" rx="9" fill="#faf8f0" stroke={ink} strokeWidth="2.4" />
        <path d="M369 103h119m-119 13h77" fill="none" stroke={indigo} strokeWidth="3" strokeLinecap="round" />
        <rect x="370" y="138" width="96" height="62" rx="4" fill="#b9cebf" />
        <rect x="482" y="138" width="96" height="62" rx="4" fill="#edbc9e" />
        <rect x="482" y="216" width="96" height="62" rx="4" fill="#b9cebf" />
        <rect x="370" y="216" width="96" height="62" rx="4" fill="none" stroke="#8d5429" strokeWidth="2" strokeDasharray="6 5" />
        <g data-later-motion transform={settled ? "translate(0 0) rotate(0 418 247)" : "translate(-67 -40) rotate(-10 418 247)"}>
          <rect x="370" y="216" width="96" height="62" rx="4" fill={teal} />
          <path d="m402 248 10 10 20-22" fill="none" stroke={paper} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <g data-later-accent opacity={settled ? 1 : 0}><Spark x={476} y={219} /></g>
      </>
    );
  }

  if (beat === "draft") {
    return (
      <>
        <path d="M65 285q4-150 166-177 97-16 183 51 46 39 38 126Z" fill={indigo} />
        <path d="M65 285q38-49 133-57l35 57Z" fill="#393554" />
        <Eyes x={212} y={155} />
        <path d="M231 185q13 8 24-2" fill="none" stroke={ink} strokeWidth="3" strokeLinecap="round" />
        <path d="M361 266q-35-26-34-68 0-29-24-24-18 5-12 27" fill="none" stroke={ink} strokeWidth="26" strokeLinecap="round" />
        <path d="M41 272h617l-48 89H86Z" fill="#e5d0af" />
        <path d="M86 361h524" stroke={ink} strokeWidth="2" />
        <g data-later-motion transform={settled ? "translate(0 0)" : "translate(75 -27)"}>
          <DraftCard x={272} y={224} variant={1} />
          <DraftCard x={399} y={224} variant={2} />
          <DraftCard x={526} y={224} variant={3} />
        </g>
        <path d="M100 257q54-25 101 12" fill="none" stroke={ink} strokeWidth="28" strokeLinecap="round" />
        <path d="m193 258 66 32-11 8-61-28Z" fill={orange} />
        <path d="m248 298 11-8 10 14Z" fill={ink} />
        <g data-later-accent opacity={settled ? 1 : 0}><Spark x={608} y={193} /></g>
      </>
    );
  }

  if (beat === "refine") {
    return (
      <>
        <ellipse cx="350" cy="355" rx="263" ry="10" fill="#d7c6aa" />
        <path d="M113 232h105l-14 109m-68-106-18 112m400-115h89l-10 116m-62-94-17 94" fill="none" stroke={orange} strokeWidth="12" strokeLinecap="round" />
        <path d="M126 264q3-73 66-75l33 75Zm363 0 21-113 42 27 32 86Z" fill={ink} />
        <circle cx="167" cy="144" r="55" fill="#edb84e" />
        <path d="M119 161q30 38 88 4-12 35-44 34-32-1-44-38Z" fill="#cf8d30" />
        <Eyes x={156} y={142} />
        <path d="M151 165q14 12 29 0" fill="none" stroke={ink} strokeWidth="3" strokeLinecap="round" />
        <path d="m475 107 72-47 50 18-24 63 27 29-70 43-8-54Z" fill={teal} />
        <path d="m547 60 50 18-24 63-19-36Zm-25 99 51-18 27 29-70 43Z" fill="#31575f" />
        <Eyes x={510} y={115} look={-3} />
        <path d="M515 140q12 7 23-1" fill="none" stroke={ink} strokeWidth="3" strokeLinecap="round" />
        <path d="M190 281v68m303-68v68" stroke={ink} strokeWidth="10" strokeLinecap="round" />
        <ellipse cx="345" cy="271" rx="202" ry="51" fill="#d9bea0" stroke={ink} strokeWidth="2.4" />
        <path d="M261 234h137l33 66H235Z" fill="#faf8f0" stroke={ink} strokeWidth="2" />
        <path d="M275 249h77m-82 13h101m-106 13h77m-81 12h104" fill="none" stroke={indigo} strokeWidth="3" strokeLinecap="round" />
        <path d="M202 225q34 1 57 26m268-28q-49-3-97 35" fill="none" stroke={ink} strokeWidth="13" strokeLinecap="round" />
        <g data-later-motion transform={settled ? "translate(0 0)" : "translate(34 -25)"}>
          <path d="m430 246-35 36-8-3 34-42Z" fill={orange} />
          <path d="m387 279 8 3-14 6Z" fill={ink} />
        </g>
        <g data-later-accent opacity={settled ? 1 : 0} fill="none" stroke={orange} strokeWidth="3">
          <ellipse cx="365" cy="262" rx="25" ry="10" />
          <path d="m361 283 7 6 13-12" strokeLinecap="round" />
        </g>
      </>
    );
  }

  return (
    <>
      <ellipse cx="234" cy="357" rx="142" ry="11" fill="#d7c6aa" />
      <path d="m209 209 47 8 81 122h-44l-70-75-45 77h-45Z" fill={ink} />
      <path d="M126 352q13-27 55-20l10 20Zm157 0 11-20q47-8 62 20Z" fill={teal} />
      <path d="M126 350h65v11h-65Zm157 0h73v11h-73Z" fill="#f2dfb8" />
      <path d="M213 144q35 0 44 33l7 53-67 11-8-46Z" fill={ink} />
      <path d="M199 169l-62 29 43 38m69-66 114-14 22-17" fill="none" stroke={ink} strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m358 150 16-22q5-4 9 0l-3 12 25-8q7 1 4 7l-20 10 19-3q9 3 2 8l-29 11Z" fill={ink} />
      <path d="M105 109q110-71 220 0-111 69-220 0Z" fill={orange} />
      <path d="M105 109q109 25 220 0-111 69-220 0Z" fill="#b45d38" />
      <Eyes x={217} y={102} />
      <path d="M212 126q12 12 27-1" fill="none" stroke={ink} strokeWidth="3" strokeLinecap="round" />
      <circle cx="224" cy="172" r="9" fill={paper} />
      <g data-later-motion transform={settled ? "translate(0 0) rotate(0 544 179)" : "translate(-120 20) rotate(-18 544 179)"}>
        <path d="M485 98h95l27 30v138H485Z" fill="#d8c7aa" />
        <path d="M477 91h95l27 30v138H477Z" fill="#faf8f0" stroke={ink} strokeWidth="2.5" />
        <path d="M572 91v30h27" fill="#e5d0af" stroke={ink} strokeWidth="2.5" />
        <text x="494" y="154" fill={indigo} fontSize="40" fontWeight="bold" fontFamily="monospace">#</text>
        <path d="M495 172h84m-84 14h65m-65 14h72m-72 14h53" fill="none" stroke={indigo} strokeWidth="3" strokeLinecap="round" />
        <circle cx="563" cy="234" r="15" fill={teal} />
        <path d="m555 234 6 6 9-11" fill="none" stroke={paper} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g data-later-accent opacity={settled ? 1 : 0}>
        <path d="M433 115h30m-36 19h24m-22 95h34" fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round" />
        <Spark x={629} y={102} /><Spark x={620} y={277} />
      </g>
    </>
  );
}
