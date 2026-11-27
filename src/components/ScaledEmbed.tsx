"use client";

import { useEffect, useRef, useState } from "react";

/**
 * An iframe laid out at a fixed desktop size (w x h) and scaled down to fit its tile,
 * so a prototype keeps its full desktop layout instead of being cropped on narrower screens.
 */
export function ScaledEmbed({ src, title, w, h }: { src: string; title: string; w: number; h: number }) {
  const box = useRef<HTMLDivElement>(null);
  const [k, setK] = useState(1);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const fit = () => setK(Math.min(1, el.clientWidth / w));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [w]);
  return (
    <div ref={box} className="cs-tile cs-embed scaled" style={{ aspectRatio: `${w} / ${h}` }}>
      <iframe
        src={src}
        title={title}
        loading="lazy"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        style={{ width: w, height: h, transform: `scale(${k})` }}
      />
    </div>
  );
}
