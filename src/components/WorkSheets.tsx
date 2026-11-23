/** Click-through sheets for the product grid (native <dialog>). */
export function WorkSheets() {
  return (
    <>
      {/* click-through sheets for the product grid */}
      <dialog className="sheet" id="d-specs" aria-labelledby="d-specs-h"><div className="sheet-in">
        <div className="big"><svg viewBox="0 0 120 120" aria-hidden="true"><use href="#a-specs" /></svg></div>
        <div className="info"><span className="tag" style={{ justifySelf: "start" }}><i></i>early beta</span><h2 id="d-specs-h">Specs</h2>
          <p>Give it a logo, a website, a PDF and some photos. It builds a brand kit an AI can read, then art-directs posts from it and explains every choice.</p>
          <dl><dt>year</dt><dd>2026</dd><dt>type</dt><dd>Independent project</dd><dt>status</dt><dd>Early beta, public demo</dd></dl>
          <a className="btn fill" style={{ justifySelf: "start" }} href="https://specs.humanbuiltai.work" target="_blank" rel="noopener">Try Specs <svg aria-hidden="true"><use href="#i-arrow" /></svg></a></div>
      </div><button className="close" type="button" aria-label="Close"><svg aria-hidden="true"><g className="ln"><path d="M2 2 L12 12 M12 2 L2 12" /></g></svg></button></dialog>
      <dialog className="sheet" id="d-cn" aria-labelledby="d-cn-h"><div className="sheet-in">
        <div className="big"><svg viewBox="0 0 120 120" aria-hidden="true"><use href="#a-cn" /></svg></div>
        <div className="info"><span className="tag" style={{ justifySelf: "start" }}><i></i>case study soon</span><h2 id="d-cn-h">CreditNinja</h2>
          <p>A 15-minute loan form, rebuilt as a conversation you can finish on your phone.</p>
          <dl><dt>year</dt><dd>2021</dd><dt>focus</dt><dd>Conversational interface, mobile</dd><dt>status</dt><dd>Write-up in progress</dd></dl></div>
      </div><button className="close" type="button" aria-label="Close"><svg aria-hidden="true"><g className="ln"><path d="M2 2 L12 12 M12 2 L2 12" /></g></svg></button></dialog>
      <dialog className="sheet" id="d-aon" aria-labelledby="d-aon-h"><div className="sheet-in">
        <div className="big"><svg viewBox="0 0 120 120" aria-hidden="true"><use href="#a-aon" /></svg></div>
        <div className="info"><span className="tag" style={{ justifySelf: "start" }}><i></i>case study soon</span><h2 id="d-aon-h">Aon Horizon</h2>
          <p>A climate-risk tool where the map is the interface and time is a control.</p>
          <dl><dt>year</dt><dd>2018</dd><dt>focus</dt><dd>Data visualisation, complex systems</dd><dt>status</dt><dd>Write-up in progress</dd></dl></div>
      </div><button className="close" type="button" aria-label="Close"><svg aria-hidden="true"><g className="ln"><path d="M2 2 L12 12 M12 2 L2 12" /></g></svg></button></dialog>
      <dialog className="sheet" id="d-studio" aria-labelledby="d-studio-h"><div className="sheet-in">
        <div className="big"><svg viewBox="0 0 120 120" aria-hidden="true"><use href="#a-studio" /></svg></div>
        <div className="info"><span className="tag" style={{ justifySelf: "start" }}><i></i>moving over</span><h2 id="d-studio-h">Studio</h2>
          <p>Side projects and WebGL experiments, coming over from the current site.</p>
          <dl><dt>year</dt><dd>Ongoing</dd><dt>focus</dt><dd>Three.js, WebGL, small tools</dd><dt>status</dt><dd>Being moved over</dd></dl></div>
      </div><button className="close" type="button" aria-label="Close"><svg aria-hidden="true"><g className="ln"><path d="M2 2 L12 12 M12 2 L2 12" /></g></svg></button></dialog>
    </>
  );
}
