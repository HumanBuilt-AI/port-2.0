/** Things I’ve made: product grid whose tiles open the sheets in WorkSheets. */
export function WorkSection() {
  return (
    <>
      {/* WORK: product grid */}
        <section className="work" id="work" aria-labelledby="work-h">
          <div className="in">
            <div className="work-head"><h2 id="work-h" className="h2">Things I’ve made</h2></div>
            <div className="grid4">
              <button className="item" type="button" data-open="d-specs">
                <span className="thumb"><svg viewBox="0 0 120 120" aria-hidden="true"><use href="#a-specs" /></svg></span>
                <span className="meta"><b>Specs <span className="tag">beta</span></b><span className="sig">2026</span></span>
                <p>Brand kits an AI can read, and posts made from them.</p>
                <span className="more">More <svg aria-hidden="true"><use href="#i-arrow" /></svg></span>
              </button>
              <button className="item" type="button" data-open="d-cn">
                <span className="thumb"><svg viewBox="0 0 120 120" aria-hidden="true"><use href="#a-cn" /></svg></span>
                <span className="meta"><b>CreditNinja</b><span className="sig">2021</span></span>
                <p>A 15-minute loan form, rebuilt as a conversation you can finish on your phone.</p>
                <span className="more">More <svg aria-hidden="true"><use href="#i-arrow" /></svg></span>
              </button>
              <button className="item" type="button" data-open="d-aon">
                <span className="thumb"><svg viewBox="0 0 120 120" aria-hidden="true"><use href="#a-aon" /></svg></span>
                <span className="meta"><b>Aon Horizon</b><span className="sig">2018</span></span>
                <p>A climate-risk tool where the map is the interface and time is a control.</p>
                <span className="more">More <svg aria-hidden="true"><use href="#i-arrow" /></svg></span>
              </button>
              <button className="item" type="button" data-open="d-studio">
                <span className="thumb"><svg viewBox="0 0 120 120" aria-hidden="true"><use href="#a-studio" /></svg></span>
                <span className="meta"><b>Studio</b><span className="sig">ongoing</span></span>
                <p>Side projects and WebGL experiments.</p>
                <span className="more">More <svg aria-hidden="true"><use href="#i-arrow" /></svg></span>
              </button>
            </div>
          </div>
          <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true"><defs>
            <symbol id="a-specs" viewBox="0 0 120 120"><g className="ln">
              <rect x="26" y="18" width="62" height="84" rx="3" className="paper" />
              <rect x="34" y="26" width="46" height="38" rx="1.5" /><circle cx="57" cy="45" r="11" className="sunfill" />
              <path d="M34 72 H76 M34 79 H66" /><rect x="34" y="87" width="22" height="8" rx="4" />
              <path d="M26 10 H88 M26 7 V13 M88 7 V13 M98 18 V102 M95 18 H101 M95 102 H101" />
            </g></symbol>
            <symbol id="a-cn" viewBox="0 0 120 120"><g className="ln">
              <rect x="34" y="8" width="52" height="104" rx="9" />
              <path d="M52 15 H68" />
              <rect x="41" y="26" width="30" height="12" rx="6" />
              <rect x="49" y="44" width="30" height="12" rx="6" className="sunfill" />
              <rect x="41" y="62" width="24" height="12" rx="6" />
              <rect x="41" y="88" width="38" height="14" rx="3" /><path d="M45 95 H58" />
              <path d="M14 40 H28 M14 48 H24 M14 56 H28" style={{ opacity: ".5" }} />
            </g></symbol>
            <symbol id="a-aon" viewBox="0 0 120 120"><g className="ln">
              <path d="M14 22 C34 12 52 30 70 20 S102 16 106 30 V84 H14 Z" />
              <path d="M28 44 c10 -10 26 -6 30 4 s-10 18 -22 14 s-14 -10 -8 -18 Z" />
              <path d="M36 48 c4 -4 12 -2 13 3 s-5 7 -10 5 s-6 -4 -3 -8 Z" />
              <path d="M70 50 c8 -8 22 -4 24 6 s-10 14 -18 10 s-10 -10 -6 -16 Z" />
              <circle cx="80" cy="58" r="3" className="sunfill" />
              <path d="M14 100 H106" /><path d="M14 96 V104 M43 96 V104 M72 96 V104 M106 96 V104" />
              <circle cx="62" cy="100" r="6" className="paper" />
            </g></symbol>
            <symbol id="a-console" viewBox="0 0 1200 520"><g className="ln">
              <rect x="10" y="10" width="1180" height="500" rx="18" />
              <path d="M10 90 H1190" />
              <circle cx="50" cy="50" r="10" /><circle cx="84" cy="50" r="10" /><path d="M120 50 H300" />
              <rect x="900" y="30" width="270" height="44" rx="4" />
              <g transform="translate(150 0)">
                <circle cx="0" cy="190" r="62" /><circle cx="0" cy="190" r="44" /><path d="M0 190 L26 154" /><path d="M-80 190 h10 M80 190 h-10 M0 110 v10 M-57 133 l7 7 M57 133 l-7 7" />
              </g>
              <g transform="translate(370 0)">
                <circle cx="0" cy="190" r="62" /><circle cx="0" cy="190" r="44" /><path d="M0 190 L-30 160" /><path d="M-80 190 h10 M80 190 h-10 M0 110 v10 M-57 133 l7 7 M57 133 l-7 7" />
              </g>
              <g transform="translate(590 0)">
                <circle cx="0" cy="190" r="62" /><circle cx="0" cy="190" r="44" className="sunfill" /><path d="M0 190 L40 176" /><path d="M-80 190 h10 M80 190 h-10 M0 110 v10 M-57 133 l7 7 M57 133 l-7 7" />
              </g>
              <path d="M60 300 H1140" />
              <g><path d="M120 330 V470" /><rect x="104" y="360" width="32" height="20" rx="3" className="paper" />
                <path d="M200 330 V470" /><rect x="184" y="410" width="32" height="20" rx="3" className="paper" />
                <path d="M280 330 V470" /><rect x="264" y="345" width="32" height="20" rx="3" className="paper" />
                <path d="M360 330 V470" /><rect x="344" y="430" width="32" height="20" rx="3" className="paper" />
                <path d="M440 330 V470" /><rect x="424" y="385" width="32" height="20" rx="3" className="paper" /></g>
              <g><rect x="740" y="130" width="400" height="130" rx="8" />
                <path d="M770 230 C820 160 850 250 900 200 S980 150 1010 210 S1080 220 1110 170" />
                <path d="M770 245 H1110" style={{ opacity: ".4" }} /></g>
              <g><rect x="560" y="340" width="70" height="56" rx="6" /><rect x="646" y="340" width="70" height="56" rx="6" /><rect x="732" y="340" width="70" height="56" rx="6" /><rect x="818" y="340" width="70" height="56" rx="6" className="sunfill" />
                <rect x="560" y="412" width="70" height="56" rx="6" /><rect x="646" y="412" width="70" height="56" rx="6" /><rect x="732" y="412" width="70" height="56" rx="6" /><rect x="818" y="412" width="70" height="56" rx="6" /></g>
              <g><circle cx="1000" cy="404" r="48" /><circle cx="1000" cy="404" r="8" /><circle cx="1100" cy="404" r="22" /><path d="M1100 382 V394" /></g>
            </g></symbol>
            <symbol id="a-studio" viewBox="0 0 120 120"><g className="ln">
              <path d="M60 14 L100 37 V83 L60 106 L20 83 V37 Z" />
              <path d="M20 37 L60 60 L100 37 M60 60 V106" />
              <path d="M40 25.5 L80 48.5 M80 25.5 L40 48.5" style={{ opacity: ".4" }} />
              <path d="M40 48.5 V94.5 M80 48.5 V94.5" style={{ opacity: ".4" }} />
              <path d="M20 60 L60 83 L100 60" style={{ opacity: ".4" }} />
              <circle cx="60" cy="60" r="4" className="sunfill" />
            </g></symbol>
          </defs></svg>
          <div className="in"><p className="cap">Selected work · Specs, Aon, CreditNinja, Verizon, Chipotle</p></div>
        </section>


    </>
  );
}
