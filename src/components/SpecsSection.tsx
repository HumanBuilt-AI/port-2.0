/** Specs, the working tool, with two of its components. */
export function SpecsSection() {
  return (
    <>
      {/* SPECS */}
        <section className="specs" id="specs" aria-labelledby="specs-h">
          <div className="in">
            <div className="specs-head">
              <h2 id="specs-h" className="h2">So I built the working version.</h2>
              <div className="specs-lede">
                <p className="lede">It’s called Specs. It turns a logo, a website, a PDF and some photos into a brand kit an AI can read, then art-directs posts from it and explains every choice.</p>
                <a className="btn fill" href="https://specs.humanbuiltai.work" target="_blank" rel="noopener">Try Specs <span className="tag" style={{ borderColor: "currentColor" }}>beta</span></a>
              </div>
            </div>
            <div className="specs-kit">
              <figure className="kp">
                <div className="cmp">
                  <div className="cmp-top"><span className="sig">kitprogress</span></div>
                  <div className="big"><span>07</span><span className="of">/10</span></div>
                  <svg className="ticks" viewBox="0 0 300 18" preserveAspectRatio="none" aria-hidden="true" id="kp-ticks"></svg>
                  <ul className="kp-list">
                    <li>positioning-core<i></i></li><li>brand-about<i className="warn"></i></li><li>voice-core<i></i></li><li>voice-examples<i></i></li><li>terminology<i></i></li>
                    <li>audience-renters<i></i></li><li>visual-system<i className="warn"></i></li><li>art-direction<i></i></li><li>social-rules<i></i></li><li>guardrails<i className="todo"></i></li>
                  </ul>
                </div>
              </figure>
              <figure className="ts">
                <div className="cmp">
                  <div className="cmp-top"><span className="sig">toneslider</span><span className="sig muted">voice-core</span></div>
                  <p className="cmp-q">How should Half Acre sound?</p>
                  <p className="cmp-line">Pea shoots. Ten days. One windowsill. You’ve got this.</p>
                  <svg className="scale" viewBox="0 0 300 44" aria-hidden="true" id="ts-scale"></svg>
                  <div className="cmp-ends"><span className="sig">plain-spoken</span><span className="sig">playful</span></div>
                </div>
                <figcaption>Two of the ten pieces Specs can show you while it builds a kit. Half Acre Club is a made-up brand.</figcaption>
              </figure>
            </div>
            <ul className="feats" aria-label="What Specs does">
              <li>mixed uploads: pdfs, photos, notes, scribbles</li>
              <li>converted into structured markdown</li>
              <li>input cards that match what you meant</li>
              <li>design changes made through those cards</li>
              <li>critic agents that review every output</li>
              <li>an image-generated first design pass</li>
              <li>translated into html, css and javascript</li>
            </ul>
          </div>
          <div className="in"><p className="cap">Specs · brand kits an AI can read · early beta</p></div>
        </section>


    </>
  );
}
