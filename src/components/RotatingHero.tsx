"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Full-bleed crossfading banner. Only three frames are ever mounted: the
// one fading out, the one showing, and the next one (so it is loaded before
// its turn). Mounting every frame at once made the page download all of
// them on load.
export function RotatingHero({
  images,
  interval = 4500,
  alt = "Featured frame",
  className,
}: {
  images: string[];
  interval?: number;
  alt?: string;
  className?: string;
}) {
  const [i, setI] = useState(0);
  const n = images.length;

  useEffect(() => {
    if (n < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      // Don't advance (or fetch the next frame) in a background tab.
      if (!document.hidden) setI((v) => (v + 1) % n);
    }, interval);
    return () => clearInterval(id);
  }, [n, interval]);

  const live = new Set([i, (i + 1) % n, (i - 1 + n) % n]);

  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      {images.map((src, idx) =>
        live.has(idx) ? (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity ease-out ${
              idx === i ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDuration: "1400ms" }}
          >
            <Image
              src={src}
              alt={idx === i ? alt : ""}
              fill
              sizes="100vw"
              preload={idx === 0}
              loading={idx === 0 ? "eager" : "lazy"}
              className="object-cover"
            />
          </div>
        ) : null
      )}
      <div aria-hidden className="absolute bottom-3 right-3 flex gap-1 z-10">
        {images.map((_, j) => (
          <span
            key={j}
            className={`h-px transition-all duration-500 ${
              j === i ? "w-8 bg-cream" : "w-3 bg-cream/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
