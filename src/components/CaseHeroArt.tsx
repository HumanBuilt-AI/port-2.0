import { aonHorizonArt } from "@/content/case-art/aon-horizon";
import specs from "@/content/case-art/specs";
import creditninja from "@/content/case-art/creditninja";
import raincheck from "@/content/case-art/chipotle-raincheck";
import sauza from "@/content/case-art/sauza-lasso";
import indycar from "@/content/case-art/verizon-indycar";

/**
 * Scott's animated header art for each case study page, in place of the spot
 * icon and big numeral. Art lives in src/content/case-art/<slug>.ts.
 * Aon Horizon is animated by .cs-art rules in globals.css; the other five carry
 * their own one-shot CSS entrance (scoped to .horizon-art) inside the markup.
 * All share one viewBox so the series sits at the same scale.
 */
const art: Record<string, string> = {
  specs,
  "aon-horizon": aonHorizonArt,
  "chipotle-raincheck": raincheck,
  creditninja,
  "sauza-lasso": sauza,
  "verizon-indycar": indycar,
};

export function hasCaseHeroArt(slug: string) {
  return slug in art;
}

export function CaseHeroArt({ slug }: { slug: string }) {
  const svg = art[slug];
  if (!svg) return null;
  return (
    <svg
      className={`cs-art horizon-art cs-art-${slug}`}
      viewBox="88 72 464 508"
      fill="none"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
