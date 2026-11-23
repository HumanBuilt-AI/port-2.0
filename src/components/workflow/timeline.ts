import gsap from "gsap";
import { papers, scatteredDots } from "./content";
import { markdownOutline, paperOutline } from "./WorkflowArt";

export function buildWorkflowTimeline(scene: HTMLElement) {
  const art = scene.querySelector(".workflow-visual");
  if (!art) throw new Error("Workflow illustration is missing");
  const select = gsap.utils.selector(art);
  const captions = scene.querySelectorAll("[data-workflow-caption]");
  const timeline = gsap.timeline({ paused: true });
  const hold = { progress: 0 };

  timeline
    .to(hold, { progress: 1, duration: 1.35, ease: "none" })
    .addLabel("gather")
    .to(select("[data-reaching-arm]"), {
      morphSVG: "M179 190q38 3 65-30l15-9 10 4-5 9-16 12q-28 37-61 35Z",
      duration: 1.35,
      ease: "power2.inOut",
    }, "gather")
    .fromTo(select("[data-document-outline]"), { attr: { d: paperOutline } }, { morphSVG: markdownOutline, duration: 0.75 }, "gather+=0.46")
    .to(select("[data-document]"), { opacity: 1, duration: 1.1, ease: "power2.inOut" }, "gather+=0.66")
    .to(captions[0], { opacity: 0, y: -12, duration: 0.32 }, "gather+=0.92")
    .fromTo(captions[1], { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45 }, "gather+=1.25");

  select("[data-stipple]").forEach((dot, index) => {
    const { organizedX, organizedY } = scatteredDots[index];
    timeline.to(dot, {
      attr: { cx: organizedX, cy: organizedY },
      duration: 1.2,
      ease: "power2.inOut",
    }, `gather+=${0.15 + (index % 8) * 0.055}`);
  });

  papers.forEach((paper, index) => {
    const [group] = select(`[data-paper="${paper.id}"]`);
    const shell = group.querySelector("[data-paper-shell]");
    const mark = group.querySelector("[data-paper-mark]");
    const start = 0.1 + index * 0.1;

    timeline
      .to(group, {
        attr: { transform: `translate(365, ${paper.row}) rotate(0)` },
        duration: 1.32,
        ease: "power2.inOut",
      }, `gather+=${start}`)
      .to(shell, { scaleY: 0.03, opacity: 0, duration: 0.56, ease: "power2.in" }, `gather+=${start + 0.53}`)
      .to(mark, { morphSVG: paper.target, strokeWidth: 1.7, duration: 0.88, ease: "power2.inOut" }, `gather+=${start + 0.44}`);
  });

  timeline.addLabel("resolved").to(hold, { progress: 2, duration: 1.2, ease: "none" });
  return timeline;
}
