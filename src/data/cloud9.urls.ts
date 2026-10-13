// No manifest import here: the client gallery pulls this in, and the full
// frame list for every run has no business in the browser bundle.

// The Cloud 9 run photos live on the ZimaOS box, not in this repo: 1,786
// originals are ~10.7 GB, far past what a Vercel Hobby deploy can carry.
// The box serves them through the Cloudflare tunnel. Override the host for
// local testing (e.g. the box's tailnet address) with NEXT_PUBLIC_CLOUD9_HOST.
export const PHOTO_HOST =
  process.env.NEXT_PUBLIC_CLOUD9_HOST ?? "https://photos.akvaithi.page";

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
