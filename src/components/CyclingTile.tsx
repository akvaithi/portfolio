"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Crossfade between two image layers. Three things keep this cheap:
//   1. Images only mount after the tile is near the viewport (IO).
//   2. A per-tile staggered delay (mountDelay) so a row of tiles doesn't
//      kick off six simultaneous AVIF decodes when the section enters view.
//   3. Images go through next/image's optimizer (not `unoptimized`) so the
//      browser decodes a ~30–80 KB thumbnail, not a 2 MB full-resolution AVIF.
export function CyclingTile({
  pool,
  className,
  interval = 5200,
  seed = 0,
  alt = "Frame from the archive",
  sizes,
  mountDelay = 0,
}: {
  pool: string[];
  className?: string;
  interval?: number;
  seed?: number;
  alt?: string;
  sizes?: string;
  mountDelay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [mounted, setMounted] = useState(false);

  const startIndex = pool.length ? seed % pool.length : 0;
  const [current, setCurrent] = useState(startIndex);
  const [next, setNext] = useState((startIndex + 1) % Math.max(pool.length, 1));
  const [showNext, setShowNext] = useState(false);
  const [hovered, setHovered] = useState(false);

  // (1) intersection — flag when the tile is near the viewport
  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [inView]);

  // (2) after the tile is in view, wait a per-tile delay before actually
  //     mounting the images, so siblings don't all decode at once
  useEffect(() => {
    if (!inView || mounted) return;
    const id = setTimeout(() => setMounted(true), mountDelay);
    return () => clearTimeout(id);
  }, [inView, mounted, mountDelay]);

  // (3) crossfade interval — only runs once mounted
  useEffect(() => {
    if (!mounted || pool.length < 2 || hovered) return;
    const id = setInterval(() => {
      setShowNext(true);
      setTimeout(() => {
        setCurrent((c) => {
          const promoted = (c + 1) % pool.length;
          setNext((promoted + 1) % pool.length);
          return promoted;
        });
        setShowNext(false);
      }, 1400);
    }, interval);
    return () => clearInterval(id);
  }, [mounted, pool.length, interval, hovered]);

  if (!pool.length) return null;

  return (
    <div
      ref={ref}
      className={`overflow-hidden rounded-sm group bg-ink-soft ${className ?? ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor="media"
      data-cursor-label="Cycle"
    >
      {mounted && (
        <>
          <div
            className={`absolute inset-0 transition-opacity ease-out ${
              showNext ? "opacity-0" : "opacity-100"
            }`}
            style={{ transitionDuration: "1400ms" }}
          >
            <Image
              src={pool[current]}
              alt={alt}
              fill
              loading="lazy"
              decoding="async"
              sizes={sizes ?? "(max-width: 768px) 50vw, 25vw"}
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
              src={pool[next]}
              alt={alt}
              fill
              loading="lazy"
              decoding="async"
              sizes={sizes ?? "(max-width: 768px) 50vw, 25vw"}
              className="object-cover"
            />
          </div>
        </>
      )}
    </div>
  );
}
