/** Same prompt, better brief: brand files switch on and a generic hotel app becomes The Alibi. */
export function BrandSection() {
  return (
    <>
      {/* BRAND SYSTEM */}
        <section className="pin brand" id="brand" aria-labelledby="brand-h">
          <div className="stage">
            <div className="in grid">
              <div>
                <h2 id="brand-h" className="h2">Same prompt.<br />Better brief.</h2>
                <p className="brief">Watch an AI design the same screen, over and over. The prompt never changes. Each brand file it reads adds a little more taste, until generic turns into something that feels like it belongs.</p>
                <div className="folders">
                  <div className="folder people">
                    <h4>brand/for-people</h4>
                    <ul><li><span className="sw"></span>Brand-Guidelines.pdf</li><li><span className="sw"></span>Launch-Deck.pdf</li><li><span className="sw"></span>Photo-Library/</li></ul>
                  </div>
                  <div className="folder agents">
                    <h4>brand/for-agents</h4>
                    <ul id="files">
                      <li data-k="readme"><span className="sw"></span><span>README.md<small>which file to open for which job</small></span></li>
                      <li data-k="tokens"><span className="sw"></span><span>tokens.json<small>colour, type, corners, spacing</small></span></li>
                      <li data-k="voice"><span className="sw"></span><span>voice.yaml<small>tone, and why</small></span></li>
                      <li data-k="guard"><span className="sw"></span><span>guardrails.yaml<small>what a screen may never do</small></span></li>
                      <li data-k="comps"><span className="sw"></span><span>components/<small>real parts from the product</small></span></li>
                    </ul>
                  </div>
                </div>
                <div className="brand-foot"><span className="tag"><i></i>made-up brand</span> The Alibi is fictional. The idea isn’t.</div>
              </div>
              <div className="phone" aria-label="Phone mockup of a hotel check-in screen" role="group">
                <div className="screen" id="screen">
                  <div className="s-top"><span className="s-gen">Grand Hotel</span><svg className="s-logo" viewBox="30 50 250 192" aria-hidden="true"><g fill="currentColor" fillRule="evenodd"><path id="the-t" d="M41 90 C53 87 65 81 71 73 L71 89 L83 89 L83 90 L71 90 L71 133 C71 141 75 144 83 140 C79 145 74 147 67 147 C55 147 49 141 49 130 L49 91 Z" /><path id="the-h" d="M82 65 L110 57 L110 101 C114 92 122 87 130 87 C142 87 149 94 149 107 L149 132 C149 134 150 135 151 135 C141 134 135 143 127 146 L127 106 C127 98 125 94 120 94 C116 94 112 98 110 104 L110 134 C110 143 101 147 82 146 C88 145 89 141 89 134 L89 76 C89 69 88 66 82 65 Z" /><path id="the-e" d="M174 113 C173 126 181 135 193 135 C201 135 207 132 211 125 C208 139 198 147 183 147 C165 147 154 135 154 118 C154 100 168 87 185 87 C198 87 209 94 209 103 C209 111 200 114 187 114 Z M174 112 L182 112 C190 112 193 108 193 101 C193 93 190 88 185 88 C179 88 175 98 174 112 Z" /><path id="alibi-a" d="M63 185 C63 192 59 196 53 196 C48 196 45 193 45 189 C45 180 58 172 73 172 C92 172 102 180 102 195 L102 222 C102 230 104 234 110 234 L94 234 C85 234 80 230 80 220 C75 230 68 235 58 235 C47 235 39 229 39 219 C39 208 48 203 62 200 C75 197 80 194 80 184 C80 177 78 173 73 173 C67 173 63 179 63 185 Z M80 192 C78 197 75 199 70 201 C63 206 60 210 60 217 C60 224 63 228 68 228 C73 228 77 224 80 218 Z" /><path id="alibi-l" d="M104 151 L133 143 L133 222 C133 230 134 233 140 234 L104 234 C110 233 112 230 112 222 L112 162 C112 155 110 152 104 151 Z" /><path id="alibi-i-one-dot" d="M143 156 C150 159 158 158 165 154 C165 164 161 169 154 169 C147 169 143 165 143 156 Z" /><path id="alibi-i-one" d="M136 179 L165 172 L165 222 C165 230 166 233 172 234 L137 234 C143 233 144 230 144 222 L144 189 C144 182 142 180 136 179 Z" /><path id="alibi-b" d="M173 153 L196 144 L196 185 C200 177 207 172 215 172 C230 172 239 184 239 201 C239 221 225 235 205 235 C193 235 182 229 175 222 L175 163 C175 157 175 154 173 153 Z M196 189 L196 221 C196 230 199 234 205 234 C213 234 218 223 218 206 C218 189 213 179 206 179 C202 179 198 183 196 189 Z" /><path id="alibi-i-two" d="M237 179 L266 172 L266 222 C266 230 267 233 272 234 L238 234 C244 233 245 230 245 222 L245 190 C245 183 243 180 237 179 Z" /></g><circle cx="254.5" cy="157.8" r="11.7" fill="#AA390F" /></svg><span className="s-time">21:40</span></div>
                  <div className="s-photo" style={{ backgroundImage: "url(/alibi/room.jpg)" }}><i className="door l"></i><i className="door r"></i><span className="s-hint" aria-hidden="true">No. 7</span></div>
                  <div className="t" id="s-title">Welcome! Check in now</div>
                  <p className="s-note" id="s-note">Your room is ready for check-in.</p>
                  <div className="code"><span id="s-sub">Room number</span><b id="s-room">412</b><span id="s-meta">Check-out: 11:00 AM</span></div>
                  <div className="s-key"><span className="k-dot"></span><span className="k-l">Room<b>Seven</b></span><span className="k-r">Floor 3<br />Out by 1 pm</span><svg className="k-nfc" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 7 a7 7 0 0 1 0 10 M12 4.5 a11 11 0 0 1 0 15 M16 2 a15 15 0 0 1 0 20" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg></div>
                  <div className="promo">Upgrade to a suite for $49! <span>Upgrade</span></div>
                  <div className="rate">Rate your booking experience ★★★★★</div>
                  <button type="button" className="cta" id="s-cta"><i className="ring"></i><span id="s-cta-t">Check in</span></button>
                </div>
                <span className="tag" id="phone-tag"><i></i>generic</span>
              </div>
            </div>
          </div>
        </section>


    </>
  );
}
