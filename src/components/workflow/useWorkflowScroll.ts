import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/dist/MorphSVGPlugin";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { buildWorkflowTimeline } from "./timeline";

export function useWorkflowScroll(ref: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const scene = ref.current;
    if (!scene) return;

    gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin);
    const media = gsap.matchMedia(scene);
    media.add("(prefers-reduced-motion: no-preference)", () => {
      scene.dataset.animated = "true";
      const timeline = buildWorkflowTimeline(scene);
      ScrollTrigger.create({
        animation: timeline,
        trigger: scene,
        pin: true,
        start: "top top",
        end: () => "+=" + Math.round(window.innerHeight * (window.innerWidth < 700 ? 2.25 : 2.8)),
        scrub: 0.35,
      });

      return () => {
        delete scene.dataset.animated;
      };
    });
    return () => media.revert();
  }, [ref]);
}
