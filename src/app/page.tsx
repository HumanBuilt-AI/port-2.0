import { IconSprite } from "@/components/IconSprite";
import { SiteIndex } from "@/components/SiteIndex";
import { StickyBar } from "@/components/StickyBar";
import { HeroIntro } from "@/components/HeroIntro";
import { FlowSection } from "@/components/flow/FlowSection";
import { BrandSection } from "@/components/BrandSection";
import { CaseStudies } from "@/components/CaseStudies";
import { ToolkitSection } from "@/components/ToolkitSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { StoryMotion } from "@/components/StoryMotion";

// The story, in order. Reorder sections here.
export default function Home() {
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
        <ToolkitSection />
        <AboutSection />
        <ContactSection />
      </main>
      <StoryMotion />
    </>
  );
}
