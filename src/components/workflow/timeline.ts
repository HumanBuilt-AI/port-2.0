import gsap from "gsap";
import { armShapes, papers, scatteredDots } from "./content";
import { markdownOutline, paperOutline } from "./WorkflowArt";

export function buildWorkflowTimeline(scene: HTMLElement) {
  const art = scene.querySelector(".workflow-visual");
  if (!art) throw new Error("Workflow illustration is missing");
  const select = gsap.utils.selector(art);
  const captions = scene.querySelectorAll("[data-workflow-caption]");
  const timeline = gsap.timeline({ paused: true });
  const hold = { progress: 0 };

  timeline
    .addLabel("mess", 0)
    .to(hold, { progress: 1, duration: 1.35, ease: "none" })
    .addLabel("gather")
    .to(select("[data-reaching-arm]"), {
      morphSVG: armShapes.resolved,
      duration: 1.35,
      ease: "power2.inOut",
    }, "gather")
    .fromTo(select("[data-document-outline]"), { attr: { d: paperOutline } }, { morphSVG: markdownOutline, duration: 0.75 }, "gather+=0.46")
    .to(select("[data-document]"), { opacity: 1, duration: 1.1, ease: "power2.inOut" }, "gather+=0.66")
    .to(captions[0], { opacity: 0, duration: 0.38 }, "gather+=1")
    .fromTo(captions[1], { opacity: 0 }, { opacity: 1, duration: 0.38 }, "gather+=1");

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
  timeline
    .addLabel("inspect")
    .to(select("[data-source-scene]"), { opacity: 0, duration: 0.55 }, "inspect")
    .to(select("[data-gap-scene]"), { opacity: 1, duration: 0.55 }, "inspect+=0.12")
    .to(captions[1], { opacity: 0, duration: 0.34 }, "inspect+=0.18")
    .to(captions[2], { opacity: 1, duration: 0.34 }, "inspect+=0.18")
    .to(select("[data-gap-lens]"), { x: 36, y: 54, duration: 0.74, ease: "power2.inOut" }, "inspect+=0.45")
    .to(select("[data-gap-target]"), { attr: { fill: "#f5d77f" }, duration: 0.35 }, "inspect+=0.92")
    .addLabel("find-gaps")
    .to(hold, { progress: 3, duration: 1.05, ease: "none" });

  const laterBeats = ["fill", "draft", "refine", "ship"] as const;
  let previousScene = select("[data-gap-scene]");

  laterBeats.forEach((beat, index) => {
    const transition = `enter-${beat}`;
    const incoming = select(`[data-later-scene="${beat}"]`);
    const [layer] = incoming;
    const moving = layer.querySelector("[data-later-motion]");
    const accent = layer.querySelector("[data-later-accent]");

    timeline
      .addLabel(transition)
      .to(previousScene, { opacity: 0, duration: 0.5 }, transition)
      .to(incoming, { opacity: 1, duration: 0.5 }, `${transition}+=0.08`)
      .to(captions[index + 2], { opacity: 0, duration: 0.35 }, `${transition}+=0.12`)
      .to(captions[index + 3], { opacity: 1, duration: 0.35 }, `${transition}+=0.12`)
      .to(moving, {
        attr: { transform: beat === "fill" ? "translate(0 0) rotate(0 418 247)" :
          beat === "ship" ? "translate(0 0) rotate(0 544 179)" : "translate(0 0)" },
        duration: 0.83,
        ease: "power2.inOut",
      }, `${transition}+=0.29`)
      .to(accent, { opacity: 1, duration: 0.32 }, `${transition}+=0.88`);

    if (beat === "refine" || beat === "ship") {
      timeline.to(scene, {
        backgroundColor: beat === "refine" ? "#f3d68c" : "#f6f4ec",
        duration: 0.58,
      }, transition);
    }

    timeline.addLabel(beat).to(hold, { progress: index + 4, duration: 0.95, ease: "none" });
    previousScene = incoming;
  });

  return timeline;
}
