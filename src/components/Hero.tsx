/** Opening: a prompt types itself, a generic AI draft is crossed out, Scott’s line replaces it.
    The prompt rotates through a few lazy asks (see PROMPTS in lib/story-motion.js). */
export function Hero() {
  return (
    <>
      {/* HERO: the prompt, inside a large rounded panel */}
        <section className="pin hero" id="hero" aria-labelledby="hb-h">
          <div className="stage">
            <div className="in">
              <div className="panel">
                <svg className="reg tl" aria-hidden="true"><use href="#i-reg" /></svg><svg className="reg tr" aria-hidden="true"><use href="#i-reg" /></svg><svg className="reg bl" aria-hidden="true"><use href="#i-reg" /></svg><svg className="reg br" aria-hidden="true"><use href="#i-reg" /></svg>
                <div className="prompt" role="img" id="hb-prompt" aria-label="A prompt that reads: Write a portfolio homepage for Scott. Make it pop.">
                  <span className="typed"><span id="hb-typed"></span><span className="caret"></span><span className="ph" id="hb-ph">Ask for anything</span></span>
                  <span className="send" aria-hidden="true"><svg style={{ transform: "rotate(-90deg)" }}><use href="#i-arrow" /></svg></span>
                </div>
                <div className="answer">
                  <div className="generic" id="hb-generic" style={{ opacity: "0" }}>Hi, I&apos;m a passionate, results-driven creative who loves pushing boundaries.<i className="x" style={{ top: "30%" }}></i><i className="x" style={{ top: "64%" }}></i></div>
                  <span className="tag" id="hb-tag" style={{ opacity: "0" }}><i></i>ai draft. not quite</span>
                </div>
                <h1 id="hb-h" className="reveal" style={({ "--r": "0" } as import("react").CSSProperties)}>AI is only as good as the person using it.</h1>
              </div>
              <div className="hero-meta">
                <div className="lockup"><span>Scott Galetto</span><span>AI-fluent design technologist</span><span>Chicago</span></div>
                <p className="who" id="hb-who">Half designer, half technologist. I find the idea worth building, then prototype it into something real, with AI in the loop.</p>
                <span className="sig" id="hb-hint"><svg aria-hidden="true"><use href="#i-down" /></svg>scroll</span>
              </div>
            </div>
          </div>
        </section>


    </>
  );
}
