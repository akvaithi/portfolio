"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useState } from "react";

type HDRImageProps = Omit<ImageProps, "src"> & {
  src: string; // HDR AVIF
  sdrSrc?: string | null; // SDR WebP / JPEG sibling
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
 * Dynamic-range targeting:
 *   - mode=auto (default): <picture> with (dynamic-range: high) media query.
 *     HDR display gets the AVIF, others get the SDR WebP.
 *   - ?hdr=force in the URL: always serve the HDR AVIF (useful for previewing
 *     on a non-HDR machine — you won't see HDR pixels but you'll see whatever
 *     the tone-map produces).
 *   - ?hdr=sdr in the URL: always serve the SDR WebP (force-side-by-side).
 *
 * All variants are passed `unoptimized` so files come straight from /public.
 */
export function HDRImage({ src, sdrSrc, alt, ...rest }: HDRImageProps) {
  const [mode, setMode] = useState<ForceMode>("auto");

  useEffect(() => {
    setMode(readForceMode());
  }, []);

  // No SDR sibling — fall back to the source as a plain image.
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
      <source srcSet={src} type="image/avif" media="(dynamic-range: high)" />
      <Image src={sdrSrc} alt={alt} unoptimized {...rest} />
    </picture>
  );
}
