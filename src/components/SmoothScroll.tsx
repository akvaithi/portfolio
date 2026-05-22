"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState, type ReactNode } from "react";

/**
 * Wrap children in Lenis smooth-scroll only on devices that can actually
 * sustain a custom scroll loop. Lower-end machines + headless browsers can
 * lock up because every Lenis tick re-evaluates every IntersectionObserver
 * on the page, and we have a lot of those (Reveal, CyclingTile, GalleryItem).
 *
 * We bail out if:
 * - the user prefers reduced motion (accessibility)
 * - touch device (native momentum scroll is already smooth + GPU-accelerated)
 * - device CPU concurrency is low (rough proxy for "this machine will choke")
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [shouldSmooth, setShouldSmooth] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    const lowCpu = (navigator.hardwareConcurrency ?? 8) < 4;
    setShouldSmooth(!reduced && !touch && !lowCpu);
  }, []);

  if (!shouldSmooth) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.12,
        duration: 1.0,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
      }}
    >
      {children}
    </ReactLenis>
  );
}
