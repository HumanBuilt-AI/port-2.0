/** Line icons used across the page, referenced with <use href="#i-…">. */
export function IconSprite() {
  return (
    <>
      {/* Icon set: original, single-weight line drawings about Scott's own work. */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          {/* approach: a prompt field with a send button */}
          <symbol id="i-approach" viewBox="0 0 56 72"><g className="ln">
            <rect x="2" y="22" width="52" height="26" rx="5" />
            <path d="M10 28 V42" />
            <circle cx="43" cy="35" r="7" />
            <path d="M43 38.5 V31.5 M40 34 L43 31 L46 34" />
            <path d="M8 14 H30 M8 58 H22" />
          </g></symbol>
          {/* specs: a card measured with dimension lines */}
          <symbol id="i-specs" viewBox="0 0 56 72"><g className="ln">
            <rect x="6" y="16" width="34" height="48" rx="2" />
            <path d="M6 8 H40 M6 5 V11 M40 5 V11" />
            <path d="M48 16 V64 M45 16 H51 M45 64 H51" />
            <circle cx="23" cy="32" r="8" />
            <path d="M12 48 H34 M12 54 H26" />
          </g></symbol>
          {/* work: a phone conversation over map contours */}
          <symbol id="i-work" viewBox="0 0 56 72"><g className="ln">
            <circle cx="36" cy="44" r="18" />
            <ellipse cx="36" cy="44" rx="11" ry="9" />
            <ellipse cx="37" cy="45" rx="4" ry="3" />
            <rect x="2" y="6" width="24" height="46" rx="5" />
            <path d="M7 16 H19 M11 24 H21 M7 32 H17" />
          </g></symbol>
          {/* studio: a wireframe cube with a lit core */}
          <symbol id="i-studio" viewBox="0 0 56 72"><g className="ln">
            <path d="M28 12 L50 25 V51 L28 64 L6 51 V25 Z" />
            <path d="M6 25 L28 38 L50 25 M28 38 V64" />
            <path d="M17 18.5 L39 31.5 M39 18.5 L17 31.5" style={{ opacity: ".45" }} />
            <circle cx="28" cy="38" r="2.6" />
          </g></symbol>
          {/* notes: a dated sheet with a folded corner */}
          <symbol id="i-notes" viewBox="0 0 56 72"><g className="ln">
            <path d="M6 8 H38 L50 20 V66 H6 Z" />
            <path d="M38 8 V20 H50" />
            <path d="M13 30 H42 M13 37 H42 M13 44 H34" />
            <rect x="13" y="13" width="14" height="9" rx="1.5" />
          </g></symbol>
          {/* contact: a speaker grille with a sound arc */}
          <symbol id="i-contact" viewBox="0 0 56 72"><g className="ln">
            <circle cx="24" cy="36" r="21" />
            <circle cx="16" cy="28" r="1.6" /><circle cx="24" cy="28" r="1.6" /><circle cx="32" cy="28" r="1.6" />
            <circle cx="16" cy="36" r="1.6" /><circle cx="24" cy="36" r="1.6" /><circle cx="32" cy="36" r="1.6" />
            <circle cx="16" cy="44" r="1.6" /><circle cx="24" cy="44" r="1.6" /><circle cx="32" cy="44" r="1.6" />
            <path d="M50 24 A16 16 0 0 1 50 48" />
          </g></symbol>
          {/* mark: the prompt, ›_ drawn as outlined solids */}
          <symbol id="i-mark" viewBox="0 0 92 72"><g className="ln">
            <path d="M4 6 L44 32 V40 L4 66 V52 L32 36 L4 20 Z" />
            <rect x="50" y="54" width="38" height="12" rx="1" />
          </g></symbol>
          <symbol id="i-arrow" viewBox="0 0 16 16"><g className="ln"><path d="M3 8 H13 M9 4 L13 8 L9 12" /></g></symbol>
          <symbol id="i-down" viewBox="0 0 12 22"><g className="ln"><path d="M6 2 V20 M2 16 L6 20 L10 16" /></g></symbol>
          <symbol id="i-reg" viewBox="0 0 18 18"><g className="ln"><path d="M9 0 V18 M0 9 H18" /><circle cx="9" cy="9" r="4.5" /></g></symbol>
        </defs>
      </svg>
    </>
  );
}
