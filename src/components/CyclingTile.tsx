"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Crossfade through a pool of images at a given interval. Only two image
// layers are mounted at any time — the visible one and the next-up one we're
// fading toward — so a grid of tiles doesn't balloon the DOM.
export function CyclingTile({
  pool,
  className,
  interval = 5200,
  seed = 0,
  alt = "Frame from the archive",
  sizes,
}: {
  pool: string[];
  className?: string;
  interval?: number;
  seed?: number;
  alt?: string;
  sizes?: string;
}) {
  const startIndex = pool.length ? seed % pool.length : 0;
  const [current, setCurrent] = useState(startIndex);
  const [next, setNext] = useState((startIndex + 1) % Math.max(pool.length, 1));
  const [showNext, setShowNext] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (pool.length < 2 || hovered) return;
    const id = setInterval(() => {
      // start the crossfade to `next`
      setShowNext(true);
      // after the fade completes, promote `next` to `current` and stage a new `next`
      const promote = setTimeout(() => {
        setCurrent((c) => {
          const promoted = (c + 1) % pool.length;
          setNext((promoted + 1) % pool.length);
          return promoted;
        });
        setShowNext(false);
      }, 1400);
      return () => clearTimeout(promote);
    }, interval);
    return () => clearInterval(id);
  }, [pool.length, interval, hovered]);

  if (!pool.length) return null;

  const currentSrc = pool[current];
  const nextSrc = pool[next];

  return (
    <div
      className={`overflow-hidden rounded-sm group ${className ?? ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor="media"
      data-cursor-label="Cycle"
    >
      <div
        className={`absolute inset-0 transition-opacity ease-out ${
          showNext ? "opacity-0" : "opacity-100"
        }`}
        style={{ transitionDuration: "1400ms" }}
      >
        <Image
          src={currentSrc}
          alt={alt}
          fill
          sizes={sizes ?? "(max-width: 768px) 50vw, 25vw"}
          unoptimized
          className="object-cover"
        />
      </div>
      <div
        className={`absolute inset-0 transition-opacity ease-out ${
          showNext ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDuration: "1400ms" }}
      >
        <Image
          src={nextSrc}
          alt={alt}
          fill
          sizes={sizes ?? "(max-width: 768px) 50vw, 25vw"}
          unoptimized
          className="object-cover"
        />
      </div>
    </div>
  );
}
