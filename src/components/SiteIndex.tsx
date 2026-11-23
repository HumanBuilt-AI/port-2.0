/** Top-of-page menu: the gold robot (home) plus icon + word + sub-links. */
export function SiteIndex() {
  return (
    <>
      <header className="index" id="index">
        <div className="in">
          <a className="wordmark robot" href="#top" aria-label="Scott Galetto, back to the top"><canvas width="180" height="180" aria-hidden="true"></canvas><span className="rb-fallback">scott<br />galetto</span></a>
          <div className="idx"><svg className="ico" aria-hidden="true"><use href="#i-approach" /></svg><a href="#flow" style={{ textDecoration: "none" }}><b>approach</b></a><ul><li><a href="#flow">the flow</a></li><li><a href="#brand">the brief</a></li></ul></div>
          <div className="idx"><svg className="ico" aria-hidden="true"><use href="#i-specs" /></svg><a href="#specs" style={{ textDecoration: "none" }}><b>specs</b></a><ul><li><a href="#specs">early beta</a></li><li><a href="https://specs.humanbuiltai.work" target="_blank" rel="noopener">try it</a></li></ul></div>
          <div className="idx"><svg className="ico" aria-hidden="true"><use href="#i-work" /></svg><a href="#work" style={{ textDecoration: "none" }}><b>work</b></a><ul><li><a href="#specs">specs</a></li><li><a href="#work">aon</a></li><li><a href="#work">creditninja</a></li><li><a href="#work">verizon</a></li><li><a href="#work">chipotle</a></li></ul></div>
          <div className="idx"><svg className="ico" aria-hidden="true"><use href="#i-studio" /></svg><a href="#work" style={{ textDecoration: "none" }}><b>studio</b></a><ul><li><a href="#work">side projects</a></li><li><a href="#work">experiments</a></li></ul></div>
          <div className="idx"><svg className="ico" aria-hidden="true"><use href="#i-notes" /></svg><a href="#notes" style={{ textDecoration: "none" }}><b>notes</b></a><ul><li><a href="#notes">notes on now</a></li></ul></div>
          <div className="idx"><svg className="ico" aria-hidden="true"><use href="#i-contact" /></svg><a href="#contact" style={{ textDecoration: "none" }}><b>contact</b></a><ul><li><a href="#contact">email</a></li><li><a href="https://www.linkedin.com/in/scottgaletto" target="_blank" rel="noopener">linkedin</a></li><li><a href="#contact">résumé</a></li></ul></div>
        </div>
      </header>
    </>
  );
}
