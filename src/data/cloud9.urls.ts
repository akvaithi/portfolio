// No manifest import here: the client gallery pulls this in, and the full
// frame list for every run has no business in the browser bundle.

// The Cloud 9 run photos are not in this repo (2,190 originals, ~12.7 GB). On
// akvcloud the same Caddy that fronts this site serves them from disk under
// /cloud9/, so they are same-origin (deploy/akvcloud/Caddyfile). Point
// NEXT_PUBLIC_CLOUD9_HOST at https://akvaithi.page/cloud9 to use the live copies
// from `npm run dev`.
export const PHOTO_HOST = process.env.NEXT_PUBLIC_CLOUD9_HOST ?? "/cloud9";

export type Frame = {
  name: string;
  w: number;
  h: number;
  thumb: string;
  web: string;
  download: string;
};

export type RawFrame = [name: string, w: number, h: number];

// Expanded client-side: shipping ~1,100 full URLs through the page payload
// would triple its size for strings that differ only by file name.
export function expandFrames(slug: string, raw: RawFrame[]): Frame[] {
  return raw.map(([name, w, h]) => ({
    name,
    w,
    h,
    thumb: `${PHOTO_HOST}/${slug}/web/${name}.thumb.webp`,
    web: `${PHOTO_HOST}/${slug}/web/${name}.webp`,
    download: `${PHOTO_HOST}/dl/${slug}/${name}.jpg`,
  }));
}
