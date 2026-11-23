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
          <div className="workflow-visual"><WorkflowArt /></div>
          <div className="workflow-captions">
            {workflowStages.map((stage, index) => (
              <article key={stage.number} data-workflow-caption>
                {index === 1 && (
                  <div className="workflow-static-end"><WorkflowArt resolved /></div>
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
