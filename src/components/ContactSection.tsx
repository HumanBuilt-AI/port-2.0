/** Contact and footer. */
export function ContactSection() {
  return (
    <>
      {/* CONTACT */}
        <section className="contact" id="contact" aria-labelledby="contact-h">
          <div className="in">
            <div className="row">
              <div>
                <span className="pill">Section 06 · Contact</span>
                <h2 id="contact-h">Have something to <span className="soft">figure out?</span></h2>
                <div className="links">
                  <button className="btn fill" type="button" id="copy">scottgaletto@gmail.com <span id="copy-l" style={{ opacity: ".6" }}>copy</span></button>
                  <a className="btn" href="https://www.linkedin.com/in/scottgaletto" target="_blank" rel="noopener">LinkedIn</a>
                  <span className="btn dim">Résumé soon</span>
                </div>
              </div>
              <span className="numeral" aria-hidden="true">06</span>
            </div>
            <footer><span>Scott Galetto, Chicago</span><svg style={{ width: "64px", height: "50px", color: "var(--ink)" }} aria-hidden="true"><use href="#i-mark" /></svg><span className="sig">Prototype, Nov 2026</span></footer>
          </div>
          <div className="in"><p className="cap">Scott Galetto · Chicago · prototype</p></div>
        </section>
    </>
  );
}
