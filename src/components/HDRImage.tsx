import Image, { type ImageProps } from "next/image";

type HDRImageProps = Omit<ImageProps, "src"> & {
  // The HDR AVIF (gain-map-free preferred). Served unoptimized so the
  // browser receives the original HDR-encoded pixels and engages the EDR
  // pipeline on capable displays.
  src: string;
  // The SDR fallback, found next to the AVIF as `name.sdr.webp` (or .jpg).
  // null/undefined → no HDR pipeline activated; we just render next/image
  // against the AVIF and let Vercel transcode it down to SDR WebP for the
  // browser. Safe-by-default; no EDR pressure.
  sdrSrc?: string | null;
};

/**
 * <picture>-based dynamic-range targeting.
 *
 *   <picture>
 *     <source srcset="frame.avif" type="image/avif"
 *             media="(dynamic-range: high)" />
 *     <img src="frame.sdr.webp" />   ← next/image's responsive WebP
 *   </picture>
 *
 * - Display reports `dynamic-range: high` → browser picks the AVIF and runs
 *   the EDR pipeline for that one image.
 * - Anything else → falls through to next/image's optimized SDR path.
 *
 * If no `sdrSrc` is provided, this degrades to a plain next/image call (no
 * <picture>, no HDR source) — same behavior as before HDR support existed.
 */
export function HDRImage({ src, sdrSrc, alt, ...rest }: HDRImageProps) {
  if (!sdrSrc) {
    // No SDR sibling — render the source as-is, unoptimized, so we don't
    // engage Vercel's image optimizer (per the test-mode config).
    return <Image src={src} alt={alt} unoptimized {...rest} />;
  }
  return (
    <picture>
      <source srcSet={src} type="image/avif" media="(dynamic-range: high)" />
      {/* SDR fallback. unoptimized: serve the raw WebP straight from /public,
          no Vercel transcoding. */}
      <Image src={sdrSrc} alt={alt} unoptimized {...rest} />
    </picture>
  );
}
