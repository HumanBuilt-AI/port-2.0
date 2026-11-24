/** Compact bar that slides in once the menu has scrolled away. StoryMotion toggles it. */
export function StickyBar() {
  return (
    <>
      <header className="bar" id="bar" aria-hidden="true">
        <div className="in">
          <a className="name robot" href="#top" tabIndex={-1} aria-label="Scott Galetto, back to the top"><canvas width="88" height="88" aria-hidden="true"></canvas><span className="rb-fallback">scott galetto</span></a>
          <nav aria-label="Sections">
            <a href="#flow" tabIndex={-1}><svg aria-hidden="true"><use href="#i-approach" /></svg><span>approach</span></a>
            <a href="#specs" tabIndex={-1}><svg aria-hidden="true"><use href="#i-specs" /></svg><span>specs</span></a>
            <a href="#work" tabIndex={-1}><svg aria-hidden="true"><use href="#i-work" /></svg><span>work</span></a>
            <a href="#work" tabIndex={-1}><svg aria-hidden="true"><use href="#i-studio" /></svg><span>studio</span></a>
            <a href="#about" tabIndex={-1}><svg aria-hidden="true"><use href="#i-about" /></svg><span>about</span></a>
            <a href="#contact" tabIndex={-1}><svg aria-hidden="true"><use href="#i-contact" /></svg><span>contact</span></a>
          </nav>
        </div>
      </header>
    </>
  );
}
