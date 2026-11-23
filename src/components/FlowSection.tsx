"use client";

import { useRef } from "react";
import { flow } from "@/content/site";
import { WorkflowArt } from "./workflow/WorkflowArt";
import { workflowStages } from "./workflow/content";
import { useWorkflowScroll } from "./workflow/useWorkflowScroll";
import "./workflow/workflow.css";

export function FlowSection() {
  const scene = useRef<HTMLDivElement>(null);
  useWorkflowScroll(scene);

  return (
    <section id="flow" className="workflow" aria-labelledby="flow-h">
      <div ref={scene} className="workflow-scene">
        <div className="in workflow-inner">
          <h2 id="flow-h" className="h-l">{flow.title}</h2>
          {process.env.NODE_ENV === "development" && (
            <div className="workflow-review" data-workflow-review hidden>
              <div className="workflow-review-jumps" role="group" aria-label="Jump to an animation beat">
                {workflowStages.map((stage) => (
                  <button key={stage.label} type="button" data-workflow-jump={stage.label}>
                    {stage.number} {stage.title}
                  </button>
                ))}
                <button type="button" data-workflow-jump="gather">Gather</button>
              </div>
              <div data-workflow-tools />
            </div>
          )}
          <div className="workflow-visual"><WorkflowArt /></div>
          <div className="workflow-captions">
            {workflowStages.map((stage, index) => (
              <article key={stage.number} data-workflow-caption>
                {index > 0 && (
                  <div className="workflow-static-end">{stage.label === "resolved" ? <WorkflowArt resolved /> :
                      stage.label === "find-gaps" ? <WorkflowArt gaps /> :
                      stage.label !== "mess" && <WorkflowArt later={stage.label} />}</div>
                )}
                <div className="workflow-copy">
                  <span className="workflow-number">{stage.number}</span>
                  <div>
                    <h3>{stage.title}</h3>
                    <p>{stage.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
