import { BrandMark } from "@/components/BrandMark";

/** Compact bar that slides in once the menu has scrolled away. StoryMotion toggles it. */
export function StickyBar() {
  return (
    <>
      <header className="bar" id="bar" aria-hidden="true">
        <div className="in">
          <BrandMark className="name" href="#top" tabIndex={-1} label="humanbuiltAI, Scott Galetto, back to the top" tone="auto" canvas={88} />
          <nav aria-label="Sections">
            <a href="#work" tabIndex={-1}><svg aria-hidden="true"><use href="#i-work" /></svg><span>work</span></a>
            {/* Specs hidden for now: <Link href="/work/specs" tabIndex={-1}><svg aria-hidden="true"><use href="#i-specs" /></svg><span>specs</span></Link> */}
            <a href="#flow" tabIndex={-1}><svg aria-hidden="true"><use href="#i-approach" /></svg><span>approach</span></a>
            {/* Studio hidden for now: <a href="#work" tabIndex={-1}><svg aria-hidden="true"><use href="#i-studio" /></svg><span>studio</span></a> */}
            <a href="#about" tabIndex={-1}><svg aria-hidden="true"><use href="#i-about" /></svg><span>about</span></a>
            <a href="#contact" tabIndex={-1}><svg aria-hidden="true"><use href="#i-contact" /></svg><span>contact</span></a>
          </nav>
        </div>
      </header>
    </>
  );
}
