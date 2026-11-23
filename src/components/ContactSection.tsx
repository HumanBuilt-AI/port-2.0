/** Contact and footer. */
export function ContactSection() {
  return (
    <>
      {/* CONTACT */}
        <section className="contact" id="contact" aria-labelledby="contact-h">
          <div className="in">
            <div className="row">
              <div>
                <h2 id="contact-h">Have something to figure out?</h2>
                <div className="links">
                  <button className="btn fill" type="button" id="copy">scottgaletto@gmail.com <span id="copy-l" style={{ opacity: ".6" }}>copy</span></button>
                  <a className="btn" href="https://www.linkedin.com/in/scottgaletto" target="_blank" rel="noopener">LinkedIn</a>
                  <span className="btn dim">Résumé soon</span>
                </div>
              </div>
              <svg className="big-ico" viewBox="0 0 56 72" aria-hidden="true"><use href="#i-contact" /></svg>
            </div>
            <footer><span>Scott Galetto, Chicago</span><svg style={{ width: "64px", height: "50px", color: "var(--ink)" }} aria-hidden="true"><use href="#i-mark" /></svg><span className="sig">Prototype, Nov 2026</span></footer>
          </div>
          <div className="in"><p className="cap">Scott Galetto · Chicago · prototype</p></div>
        </section>
    </>
  );
}
