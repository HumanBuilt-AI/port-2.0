import { flowScene } from "./scene";

/** How I work with AI: a horizontal, scroll-driven walk through the storyboard. Animated by StoryMotion. */
export function FlowSection() {
  return (
    <>
      {/* FLOW: the six-step storyboard, traced to SVG; each step builds as the scroll reaches it */}
        <section className="pin flow" id="flow" aria-labelledby="flow-h">
          <div className="stage">
            <div className="fflood" id="fflood" aria-hidden="true"></div>
            <div className="flow-head"><div className="in"><div className="fh-copy"><h2 id="flow-h" className="h2">How I work with AI, right now</h2><p className="fh-lede">Speed is half the value. Judgment is the other half: knowing what a good result has to do before asking for one, and checking every draft against it. That balance will shift as the models get better. Knowing when to let go is part of the job.</p></div>
              <span className="seg7" aria-hidden="true"><span id="flow-count"></span><span className="bars" id="flow-bars"><i className="on"></i><i></i><i></i><i></i><i></i><i></i></span></span></div></div>
            <div className="ftrack" id="ftrack" data-w="4272" data-pl="0,355,745,1090,1455,1790" data-pr="355,745,1090,1455,1790,2172" data-g="420" data-ob={"{\"0-blob\": [0, 1, 403, 446], \"0-char\": [79, 218, 254, 446], \"0-kdoc\": [165, 110, 293, 223], \"0-ksheet\": [285, 82, 403, 212], \"0-kpdf\": [94, 59, 194, 160], \"0-kplay\": [161, 132, 348, 290], \"0-kchat\": [24, 155, 120, 238], \"0-kimg\": [212, 52, 303, 128], \"0-o299\": [88, 46, 298, 164], \"0-o157\": [20, 43, 49, 71], \"0-o163\": [54, 30, 69, 62], \"0-o186\": [293, 376, 329, 408], \"0-o188\": [72, 272, 90, 287], \"0-o191\": [39, 341, 54, 358], \"0-o192\": [24, 327, 44, 336], \"0-o211\": [71, 295, 84, 301], \"0-o308\": [234, 39, 236, 41], \"1-char\": [388, 174, 717, 442], \"1-blob\": [414, 39, 743, 399], \"1-o247\": [483, 99, 717, 401], \"1-arrow\": [348, 281, 389, 319], \"1-o164\": [352, 133, 377, 174], \"1-o165\": [685, 44, 697, 77], \"1-o173\": [702, 60, 725, 84], \"1-o182\": [660, 54, 671, 77], \"1-o215\": [361, 218, 370, 230], \"1-o243\": [355, 247, 360, 254], \"2-blob\": [760, 23, 1093, 446], \"2-char\": [760, 201, 1059, 446], \"2-o306\": [788, 117, 1040, 224], \"2-arrow\": [739, 280, 780, 317], \"2-o154\": [1034, 47, 1084, 94], \"2-o219\": [1072, 102, 1082, 108], \"3-char\": [1051, 22, 1436, 446], \"3-blob\": [1098, 22, 1365, 249], \"3-o312\": [1191, 87, 1436, 354], \"3-o99\": [1344, 353, 1400, 411], \"3-arrow\": [1091, 280, 1131, 317], \"4-char\": [1480, 134, 1688, 447], \"4-blob\": [1479, 50, 1753, 402], \"4-o300\": [1696, 125, 1767, 189], \"4-o102\": [1710, 199, 1767, 256], \"4-o88\": [1710, 275, 1757, 323], \"4-arrow\": [1454, 280, 1495, 317], \"4-o162\": [1738, 36, 1786, 94], \"4-o148\": [1717, 31, 1730, 68], \"4-o180\": [1689, 369, 1728, 402], \"4-o199\": [1695, 148, 1698, 187], \"5-blob\": [1757, 0, 2172, 449], \"5-o282\": [1757, 240, 2172, 449], \"5-char\": [1757, 64, 2130, 422], \"5-o34\": [2033, 0, 2172, 79], \"5-arrow\": [1779, 280, 1819, 318], \"5-o145\": [2129, 188, 2153, 217]}"}>
              <ol className="fsteps"><li id="ft0" style={{ left: "2.037%" }}><span className="n">01</span><h3>The Mess</h3><p>Unstructured inputs from everywhere.</p></li><li id="ft1" style={{ left: "20.833%" }}><span className="n">02</span><h3>Make It Usable</h3><p>Turn it into clean, structured Markdown that maximizes context.</p></li><li id="ft2" style={{ left: "38.975%" }}><span className="n">03</span><h3>The Prompt</h3><p>Give the model clear direction, context, and taste.</p></li><li id="ft3" style={{ left: "56.765%" }}><span className="n">04</span><h3>The Results</h3><p>High-quality output that’s ready to shape.</p></li><li id="ft4" style={{ left: "74.836%" }}><span className="n">05</span><h3>Human Check</h3><p>Review, refine, and add judgment.</p></li><li id="ft5" style={{ left: "93.095%" }}><span className="n">06</span><h3>Ship It</h3><p>From scattered inputs to something real.</p></li></ol>
              <svg className="fart" id="fart" viewBox="0 0 4272 496" aria-hidden="true" dangerouslySetInnerHTML={{ __html: flowScene }} />
            </div>
          </div>
        </section>


    </>
  );
}
