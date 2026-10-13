// Grid thumbnails are pre-built by scripts/build-catalog.mjs at two widths
// next to each other under /public/thumbs. They are SDR WebP and never go
// through the HDR pipeline or the Vercel image optimizer.
export function thumbSrc(stem: string, width: 480 | 960 = 960) {
  return encodeURI(`${stem}.${width}.webp`);
}

export function thumbSrcSet(stem: string) {
  return `${thumbSrc(stem, 480)} 480w, ${thumbSrc(stem, 960)} 960w`;
}
