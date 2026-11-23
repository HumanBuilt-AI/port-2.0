"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { startStory } from "@/lib/story-motion";
import { initRobots } from "@/lib/robot";

/** Starts the scroll story and the gold robots once the page is in the browser. Renders nothing. */
export function StoryMotion() {
  useEffect(() => {
    startStory(gsap, ScrollTrigger);
    initRobots();
  }, []);
  return null;
}
