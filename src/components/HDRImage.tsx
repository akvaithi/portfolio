"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useState } from "react";

type HDRImageProps = Omit<ImageProps, "src"> & {
  src: string; // gain-map HDR AVIF
  sdrSrc?: string | null; // SDR WebP fallback
};

type ForceMode = "auto" | "hdr" | "sdr";

function readForceMode(): ForceMode {
  if (typeof window === "undefined") return "auto";
  const v = new URLSearchParams(window.location.search).get("hdr");
  if (v === "force") return "hdr";
  if (v === "sdr") return "sdr";
  return "auto";
}

/**
 * Hero / lightbox image with gain-map HDR.
 *
 * Renders the AVIF directly as the `<img src>` — **no <picture>/<source>
 * wrapper**. Why: Chromium has a subtle bug where a `<picture>` element
 * whose `<source>` picks an HDR AVIF but whose fallback `<img src>` points
 * at an SDR file fails to allocate an EDR layer for the displayed image.
 * The image *loads* as AVIF (correct `currentSrc`) but renders as SDR
 * because the renderer makes its HDR decision based on the static `src`
 * attribute, not the resolved one. Skipping `<picture>` sidesteps this
 * entirely.
 *
 * AVIF support is ~96% (Chrome 85+, Safari 16+, Firefox 113+, Edge 121+),
 * so a `<picture>`-based fallback for the rest is a poor trade against
 * losing HDR on every Apple display with headroom.
 *
 * Query overrides for testing:
 *   ?hdr=sdr   → render the WebP instead of the AVIF
 *   ?hdr=force → same as default (AVIF as plain <img>), kept for symmetry
 *
 * All variants are passed `unoptimized` so files come straight from /public.
 */
export function HDRImage({ src, sdrSrc, alt, ...rest }: HDRImageProps) {
  const [mode, setMode] = useState<ForceMode>("auto");

  useEffect(() => {
    setMode(readForceMode());
  }, []);

  if (mode === "sdr" && sdrSrc) {
    return <Image src={sdrSrc} alt={alt} unoptimized {...rest} />;
  }
  // auto + force-hdr both serve the AVIF directly as a plain <img>
  return <Image src={src} alt={alt} unoptimized {...rest} />;
}
