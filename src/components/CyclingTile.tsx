"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Crossfade through a pool of images at a given interval. Each tile picks an
// independent starting index + interval so the grid feels alive but never
// synchronized. Pool is shuffled-deterministically per tile via the seed.
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
  // Deterministic shuffle by seed: rotate the pool so each tile starts on a
  // different image, ensuring the same image isn't shown in multiple tiles at
  // once (when seed values are distinct < pool length).
  const ordered = pool
    .slice(seed % pool.length)
    .concat(pool.slice(0, seed % pool.length));

  const [i, setI] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (ordered.length < 2 || hovered) return;
    const id = setInterval(
      () => setI((n) => (n + 1) % ordered.length),
      interval
    );
    return () => clearInterval(id);
  }, [ordered.length, interval, hovered]);

  return (
    <div
      className={`overflow-hidden rounded-sm group ${className ?? ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor="media"
      data-cursor-label="Cycle"
    >
      {ordered.map((src, idx) => (
        <div
          key={src}
          className={`absolute inset-0 transition-[opacity,transform] ease-out ${
            idx === i
              ? "opacity-100 scale-100"
              : "opacity-0 scale-[1.04] pointer-events-none"
          }`}
          style={{ transitionDuration: "1600ms" }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes ?? "(max-width: 768px) 50vw, 25vw"}
            loading="lazy"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
