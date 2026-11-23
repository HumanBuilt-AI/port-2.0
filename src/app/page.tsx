import { IconSprite } from "@/components/IconSprite";
import { SiteIndex } from "@/components/SiteIndex";
import { StickyBar } from "@/components/StickyBar";
import { Hero } from "@/components/Hero";
import { FlowSection } from "@/components/flow/FlowSection";
import { BrandSection } from "@/components/BrandSection";
import { SpecsSection } from "@/components/SpecsSection";
import { WorkSection } from "@/components/WorkSection";
import { NotesSection } from "@/components/NotesSection";
import { ContactSection } from "@/components/ContactSection";
import { WorkSheets } from "@/components/WorkSheets";
import { StoryMotion } from "@/components/StoryMotion";

// The story, in order. Reorder sections here.
export default function Home() {
  return (
    <>
      <IconSprite />
      <SiteIndex />
      <StickyBar />
      <main id="top">
        <Hero />
        <FlowSection />
        <BrandSection />
        <SpecsSection />
        <WorkSection />
        <NotesSection />
        <ContactSection />
      </main>
      <WorkSheets />
      <StoryMotion />
    </>
  );
}
