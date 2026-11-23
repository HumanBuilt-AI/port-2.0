"use client";

import { useEffect } from "react";
import { initRobots } from "@/lib/robot";

/** Wakes the gold robot on pages that don't run the scroll story. Renders nothing. */
export function RobotInit() {
  useEffect(() => {
    initRobots();
  }, []);
  return null;
}
