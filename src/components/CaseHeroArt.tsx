import { aonHorizonArt } from "@/content/case-art/aon-horizon";

/**
 * Scott's animated header art for a case study page. It takes the place of the
 * spot icon and big numeral. Studies without art keep the icon and numeral.
 * Art lives in src/content/case-art/<slug>.ts; the motion is in globals.css (.cs-art).
 */
const art: Record<string, { svg: string; viewBox: string }> = {
  "aon-horizon": { svg: aonHorizonArt, viewBox: "96 72 448 508" },
};

export function hasCaseHeroArt(slug: string) {
  return slug in art;
}

export function CaseHeroArt({ slug }: { slug: string }) {
  const a = art[slug];
  if (!a) return null;
  return (
    <svg
      className={`cs-art cs-art-${slug}`}
      viewBox={a.viewBox}
      fill="none"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: a.svg }}
    />
  );
}
