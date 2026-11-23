import gsap from "gsap";
import { GSDevTools } from "gsap/dist/GSDevTools";
import { buildWorkflowTimeline } from "./timeline";

export function mountWorkflowReview(scene: HTMLDivElement) {
  const panel = scene.querySelector<HTMLElement>("[data-workflow-review]");
  const container = panel?.querySelector("[data-workflow-tools]");
  if (!panel || !container) return;

  gsap.registerPlugin(GSDevTools);
  scene.dataset.animated = "true";
  scene.dataset.review = "true";
  panel.hidden = false;

  const context = gsap.context(() => {
    const timeline = buildWorkflowTimeline(scene);
    const tools = GSDevTools.create({
      animation: timeline,
      container,
      globalSync: false,
      minimal: true,
      paused: true,
      persist: false,
    });
    const listeners = new AbortController();

    panel.querySelectorAll<HTMLButtonElement>("[data-workflow-jump]").forEach((button) => {
      button.addEventListener("click", () => {
        const label = button.dataset.workflowJump;
        if (label && Object.hasOwn(timeline.labels, label)) timeline.pause(label);
      }, { signal: listeners.signal });
    });

    return () => {
      listeners.abort();
      tools.kill();
    };
  }, scene);

  return () => {
    context.revert();
    panel.hidden = true;
    delete scene.dataset.review;
    delete scene.dataset.animated;
  };
}
