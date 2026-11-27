import Link from "next/link";

/**
 * Home link in the menus: the humanbuiltAI logo (gold robot + wordmark, Scott's artwork in public/brand/).
 * The interactive WebGL robot is kept: set USE_ROBOT to true to bring it back everywhere.
 */
export const USE_ROBOT = false;

type Props = { href: string; label: string; className?: string; tone?: "auto" | "ink" | "white"; canvas?: number; tabIndex?: number };

const src = (tone: "ink" | "white") => ({
  src: `/brand/humanbuiltai-${tone}-96.png`,
  srcSet: `/brand/humanbuiltai-${tone}-48.png 1x, /brand/humanbuiltai-${tone}-96.png 2x, /brand/humanbuiltai-${tone}-144.png 3x`,
});

export function BrandMark({ href, label, className = "", tone = "ink", canvas = 180, tabIndex }: Props) {
  const Tag = href.startsWith("#") ? "a" : Link;
  if (USE_ROBOT) {
    return (
      <Tag className={`${className} robot`} href={href} aria-label={label} tabIndex={tabIndex}>
        <canvas width={canvas} height={canvas} aria-hidden="true"></canvas>
        <span className="rb-fallback">scott galetto</span>
      </Tag>
    );
  }
  // "auto" carries both versions; CSS shows the white one on dark bars (.on-night)
  const tones: ("ink" | "white")[] = tone === "auto" ? ["ink", "white"] : [tone];
  return (
    <Tag className={`${className} hb-logo`} href={href} aria-label={label} tabIndex={tabIndex}>
      {tones.map((t) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={t} className={`hb-${t}`} {...src(t)} alt="" width={313} height={96} decoding="async" />
      ))}
    </Tag>
  );
}
