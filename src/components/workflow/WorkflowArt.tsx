import { useId } from "react";
import { armShapes, papers, scatteredDots } from "./content";

export const paperOutline = "M1 1H64L86 22V79H1Z";
export const markdownOutline = "M1 1H263L298 36V330H1Z";

export function WorkflowArt({ resolved = false }: { resolved?: boolean }) {
  const hatch = useId();

  return (
    <svg viewBox="0 0 720 400" aria-hidden="true" className="workflow-art">
      <defs>
        <pattern id={hatch} width="5" height="5" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="0.85" fill="#181816" />
        </pattern>
      </defs>

      <g fill="#242422" opacity=".42">
        {scatteredDots.map((dot, i) => (
          <circle key={i} data-stipple cx={resolved ? dot.organizedX : dot.x} cy={resolved ? dot.organizedY : dot.y} r={dot.radius} />
        ))}
      </g>

      <g stroke="#171715" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <g data-character stroke="none">
          {/* Cut-paper figure: an offset cap, a single eye and a movable ribbon arm. */}
          <ellipse cx="140" cy="354" rx="102" ry="13" fill={`url(#${hatch})`} opacity=".52" />
          <path d="M101 296v52h-32m92-53 21 53h30" fill="none" stroke="#1e1c19" strokeWidth="6" />
          <path d="M60 304 85 188q11-51 64-55l48 8-19 165Z" fill="#235c82" />
          <path d="M60 304h63l-18-41Z" fill="#19445f" />
          <path d="M89 180q-15-79 37-96 44-15 65 27l25 33-24 6q-6 39-44 40Z" fill="#efb4ae" />
          <path d="M77 127q-12-50 24-70 43-24 83 13l32 7-18 24-67-12q-19 28-54 38Z" fill="#e65836" />
          <path d="M77 127q27-11 54-38l67 12" fill="none" stroke="#1e1c19" strokeWidth="4" />
          <ellipse cx="163" cy="130" rx="17" ry="13" fill="#faf8f0" />
          <circle cx="170" cy="130" r="7" fill="#1e1c19" />
          <path d="M156 158q11 8 23-1" fill="none" stroke="#1e1c19" strokeWidth="4" />
          <circle cx="115" cy="150" r="7" fill="#e65836" />
          <path d="M93 212q-26 3-49 34l21 13q22-23 38-17" fill="none" stroke="#1e1c19" strokeWidth="5" />
          <path d="m90 196 15-13 13 18-16 10Z" fill="#ffd34c" />
          <path data-reaching-arm d={resolved ? armShapes.resolved : armShapes.initial} fill="#e65836" />
          <path d="M47 144v19m-10-10h20m172-55 9-12m-3 28 15-3" fill="none" stroke="#235c82" strokeWidth="3" />
        </g>

        <g data-document transform="translate(339 35)" opacity={resolved ? 1 : 0}>
          <path d="M8 9H280L307 35V339H8Z" fill={`url(#${hatch})`} />
          <path data-document-outline d={markdownOutline} fill="#faf8f0" />
          <path d="M263 1v35h35M1 61h297" fill="none" />
          <path d="M21 19h32v23H21Z" fill="#ffd34c" />
          <path d="m27 35 5-9 5 9m4-8v8m5-4-5 4-5-4" fill="none" strokeWidth="1.6" />
          <text x="66" y="34" stroke="none" fill="#171715" fontFamily="monospace" fontSize="15">project-context.md</text>
          <g stroke="none" fill="#171715" fontFamily="monospace" fontSize="14">
            <text x="21" y="91"># Project brief</text>
            <text x="21" y="136">## Source material</text>
            <text x="21" y="209">## Visual references</text>
            <text x="21" y="272">## Decisions &amp; next steps</text>
          </g>
        </g>

        {papers.map((paper) => (
          <g key={paper.id} data-paper={paper.id} transform={resolved ? `translate(365 ${paper.row})` : `translate(${paper.x}, ${paper.y}) rotate(${paper.angle})`}>
            <g data-paper-shell opacity={resolved ? 0 : 1}>
              <path d="M6 6H70L91 25V84H6Z" fill={`url(#${hatch})`} />
              <path d={paperOutline} fill={paper.tint} />
              <path d="M64 1v21h22" fill="none" />
              <text x="13" y="19" fill="#171715" stroke="none" fontFamily="monospace" fontWeight="700" fontSize="11">{paper.id === "spreadsheet" ? "XLS" : paper.id === "transcript" ? "AUDIO" : paper.id.toUpperCase()}</text>
            </g>
            <path data-paper-mark d={resolved ? paper.target : paper.mark} fill="none" strokeWidth={resolved ? 1.7 : 1.8} />
          </g>
        ))}
      </g>
    </svg>
  );
}
