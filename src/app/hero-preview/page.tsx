import type { Metadata } from "next";
import { IconSprite } from "@/components/IconSprite";
import { SiteIndex } from "@/components/SiteIndex";
import { StickyBar } from "@/components/StickyBar";
import { HeroIntro } from "@/components/HeroIntro";
import { FlowSection } from "@/components/flow/FlowSection";
import { BrandSection } from "@/components/BrandSection";
import { CaseStudies } from "@/components/CaseStudies";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { StoryMotion } from "@/components/StoryMotion";

export const metadata: Metadata = {
  title: "Hero preview · Scott Galetto",
  robots: { index: false, follow: false },
};

// Preview of the alternative hero. Same page as home, only the hero differs. The live home page is untouched.
export default function HeroPreview() {
  return (
    <>
      <IconSprite />
      <SiteIndex />
      <StickyBar />
      <main id="top">
        <HeroIntro />
        <CaseStudies />
        <FlowSection />
        <BrandSection />
        <AboutSection />
        <ContactSection />
      </main>
      <StoryMotion />
    </>
  );
}
