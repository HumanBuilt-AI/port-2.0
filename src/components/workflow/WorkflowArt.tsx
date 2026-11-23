import { useId } from "react";
import { papers, scatteredDots } from "./content";

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

      <g stroke="#171715" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M27 357Q107 349 230 357L286 364Q196 384 68 372Z" fill={`url(#${hatch})`} stroke="none" />
        <g data-character>
          <path d="M86 347l13-91 53-19 27 25 16 82-37 13-18-55-12 51Z" fill="#171715" />
          <path d="M86 346q22-4 44 5l-2 13H68q-8-10 18-18Zm73 4q22-12 38-7l24 10q8 10-6 11h-51Z" fill="#faf8f0" />
          <path d="M95 257q-31-12-25-46l10-39 41-31 54 15 30 36-19 18-20-18 4 57q-29 23-75 8Z" fill="#faf8f0" />
          <path d="M93 249q28 16 77-5l-4 13q-28 15-71 0Z" fill={`url(#${hatch})`} />
          <path d="M99 145q-20-28-5-55 10-20 37-17 37 3 41 31l-8 14-1 14q-3 17-28 19l-8 11Z" fill="#faf8f0" />
          <path d="M99 131q-25-19-13-42-4-21 20-24 16-15 34-4 29-6 36 15 16 14-7 28l-11-16q-10 14-34 8l-6 22q-13-13-19 13Z" fill="#171715" />
          <path d="M138 109q4-4 9 0m8 7 6 5-7 1m-19 11q8 5 15 0M113 125l6 6m-16 38 13 17m13-17 38 20" fill="none" />
          <circle cx="142" cy="116" r="1.7" fill="#171715" stroke="none" />
          <path data-reaching-arm d={resolved ? "M179 190q38 3 65-30l15-9 10 4-5 9-16 12q-28 37-61 35Z" : "M179 190q21-18 19-49l3-17 8-5 6 8-1 18q10 42-27 66Z"} fill="#faf8f0" />
          <path d="M79 194q-25 25-8 45 16 21 54 1l14-13-7-9-17 7-29 1" fill="#faf8f0" />
          <path d="M46 106l13 9m-24 9 18 3m139-53 11-13m-3 28 19-4" fill="none" />
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
              <path d={paperOutline} fill={paper.id === "notes" ? "#ffd34c" : "#faf8f0"} />
              <path d="M64 1v21h22" fill="none" />
              <text x="13" y="19" fill="#171715" stroke="none" fontFamily="monospace" fontWeight="700" fontSize="11">{paper.id === "spreadsheet" ? "XLS" : paper.id === "transcript" ? "AUDIO" : paper.id.toUpperCase()}</text>
            </g>
            <path data-paper-mark d={resolved ? paper.target : paper.mark} fill="none" strokeWidth={resolved ? 1.7 : 2} />
          </g>
        ))}
      </g>
    </svg>
  );
}
