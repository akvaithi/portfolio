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
    // Temporarily disabled across the board — Lenis was found to interact
    // poorly with the page's many IntersectionObservers + Framer Motion
    // springs on certain machines, causing scroll freezes at the mosaic
    // section. Native scroll is good enough; we can revisit later behind a
    // feature flag.
    setShouldSmooth(false);
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
