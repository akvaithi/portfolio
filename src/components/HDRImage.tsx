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
 * Important: gain-map AVIFs don't go through `(dynamic-range: high)`. macOS
 * engages the EDR pipeline whenever a gain-map image is rendered AND the
 * display has brightness headroom — including the MacBook Air's Liquid
 * Retina. So we serve the AVIF unconditionally to AVIF-supporting browsers
 * and use the WebP only as a format fallback for ancient browsers.
 *
 *   <picture>
 *     <source srcset="hero.avif" type="image/avif" />   ← gain-map HDR
 *     <img src="hero.webp" />                            ← format fallback
 *   </picture>
 *
 * Browsers that don't understand AVIF (basically just IE-era browsers at this
 * point) fall back to the WebP `<img>`. AVIF-supporting browsers pick the
 * AVIF, and macOS handles EDR rendering automatically when the display has
 * headroom.
 *
 * Query overrides for testing:
 *   ?hdr=force → render AVIF as a plain <img>, no <picture> (skips fallback)
 *   ?hdr=sdr   → render the WebP only, never the AVIF
 *
 * All variants are passed `unoptimized` so files come straight from /public.
 */
export function HDRImage({ src, sdrSrc, alt, ...rest }: HDRImageProps) {
  const [mode, setMode] = useState<ForceMode>("auto");

  useEffect(() => {
    setMode(readForceMode());
  }, []);

  // No SDR sibling — just render the AVIF directly. Should be rare.
  if (!sdrSrc) {
    return <Image src={src} alt={alt} unoptimized {...rest} />;
  }

  if (mode === "hdr") {
    return <Image src={src} alt={alt} unoptimized {...rest} />;
  }
  if (mode === "sdr") {
    return <Image src={sdrSrc} alt={alt} unoptimized {...rest} />;
  }

  return (
    <picture>
      <source srcSet={src} type="image/avif" />
      <Image src={sdrSrc} alt={alt} unoptimized {...rest} />
    </picture>
  );
}
