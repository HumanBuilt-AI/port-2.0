/** Thin arrow in a circle, from the reference's type kit. `dir` sets where it points. */
export function ArrowCircle({ dir = "ne", label }: { dir?: "ne" | "n" | "sw" | "se" | "w"; label?: string }) {
  const rot = { ne: -45, n: -90, se: 45, sw: 135, w: 180 }[dir];
  return (
    <span className="arc" aria-hidden={label ? undefined : true} aria-label={label} role={label ? "img" : undefined}>
      <svg viewBox="0 0 16 16" style={{ transform: `rotate(${rot}deg)` }}>
        <path d="M3 8 H13 M9 4 L13 8 L9 12" />
      </svg>
    </span>
  );
}
