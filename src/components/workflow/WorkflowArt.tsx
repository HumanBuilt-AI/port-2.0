import { LaterScene, type LaterBeat } from "./LaterScenes";
import { GapScene } from "./GapScene";
import { useId } from "react";
import { armShapes, papers, scatteredDots } from "./content";

export const paperOutline = "M1 1H64L86 22V79H1Z";
export const markdownOutline = "M1 1H263L298 36V330H1Z";

export function WorkflowArt({ resolved = false, gaps = false, later }: { resolved?: boolean; gaps?: boolean; later?: LaterBeat }) {
  const hatch = useId();

  return (
    <svg viewBox="0 0 720 400" aria-hidden="true" className="workflow-art">
      <defs>
        <pattern id={hatch} width="5" height="5" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="0.85" fill="#181816" />
        </pattern>
      </defs>

      {!gaps && !later && <g data-source-scene>
      <g fill="#242422" opacity=".42">
        {scatteredDots.map((dot, i) => (
          <circle key={i} data-stipple cx={resolved ? dot.organizedX : dot.x} cy={resolved ? dot.organizedY : dot.y} r={dot.radius} />
        ))}
      </g>

      <g stroke="#171715" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <g data-character stroke="none">
          <ellipse cx="144" cy="359" rx="108" ry="10" fill="#d7c6aa" />
          <path d="M112 233 137 244 108 296 66 325 56 308 87 280Z" fill="#302d29" />
          <path d="M126 231q21-7 34 12l23 32 23 57-23 11-28-47-37-28Z" fill="#242321" />
          <path d="m56 303 19 17-13 26q-5 10-18 9H34q-8-4-4-16Z" fill="#3d385b" />
          <path d="M30 339q0 16 13 16h19l-5 8H38q-18-3-13-19Z" fill="#f2dfb8" />
          <path d="m179 336 23-11 11 13q28 0 34 15v5h-71q-5-8 3-22Z" fill="#423e65" />
          <path d="M175 354h72v9h-70Z" fill="#f2dfb8" />
          <path d="m184 338 12-4m-8 11 12-4m-151-23 10 5m-15 2 10 5" fill="none" stroke="#f2dfb8" strokeWidth="3" />
          <path d="M121 158q19-6 31 17l14 70q-21 16-47 11L99 238l7-62Z" fill="#292825" />
          <path d="m107 177 17 70 13 6-15-87Z" fill="#3d3a35" />
          <path d="m116 190 16 44" fill="none" stroke="#d0b99d" strokeWidth="2.3" />
          <path data-reaching-arm d={resolved ? armShapes.resolved : armShapes.initial} fill="#292825" />
          <path d="M107 190q-24 28-13 44 13 12 51-9l-6-10-31 10 12-23Z" fill="#292825" />
          <path d="M138 214q9-7 17-4 5 3 2 8l-12 9Z" fill="#688f89" />
          <path d="m110 175 8-8 7 10-9 7Z" fill="#f3dfb5" />
          <circle cx="118" cy="175" r="1.8" fill="#292825" />

          {/* The face uses opaque paper facets instead of outline strokes. */}
          <path d="m113 62 32 41 48 22-35 21-25 35-18-31-47-16 36-25Z" fill="#709b95" />
          <path d="m113 62 32 41-23 14-18-8Z" fill="#4a7779" />
          <path d="m122 117 36 29-25 35-18-31Z" fill="#4d7774" />
          <path d="m145 103 48 22-35 21-20-17Z" fill="#9cb5a5" />
          <ellipse cx="124" cy="117" rx="11" ry="15" transform="rotate(-22 124 117)" fill="#faf0d4" />
          <ellipse cx="151" cy="111" rx="12" ry="16" transform="rotate(-19 151 111)" fill="#faf0d4" />
          <ellipse cx="129" cy="115" rx="4.3" ry="8" transform="rotate(-17 129 115)" fill="#252420" />
          <ellipse cx="157" cy="109" rx="4.7" ry="8.5" transform="rotate(-17 157 109)" fill="#252420" />
          <path d="M111 97q4-8 11-7m24-5q7-5 13 0m-20 44 9 3-4 4m-12 5q9 7 17-1" fill="none" stroke="#252420" strokeWidth="2.8" />
          <path d="M74 66q3 13 14 15-11 3-14 16-3-13-14-16 11-2 14-15Z" fill="#e6a53b" />
          <path d="M193 65q2 9 11 12-9 3-11 12-3-9-12-12 9-3 12-12Z" fill="#e6a53b" />
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
      </g>}
      {!later && <g data-gap-scene opacity={gaps ? 1 : 0}><GapScene settled={gaps} /></g>}
      {!resolved && !gaps && (later ? [later] : (["fill", "draft", "refine", "ship"] as const)).map((beat) => (
        <g key={beat} data-later-scene={beat} opacity={later ? 1 : 0}>
          <LaterScene beat={beat} settled={Boolean(later)} />
        </g>
      ))}
    </svg>
  );
}
