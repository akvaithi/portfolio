import { FRAMES, HIGHLIGHTS } from "./cloud9.frames";
import { PHOTO_HOST, type RawFrame } from "./cloud9.urls";

export { PHOTO_HOST };
export type { Frame, RawFrame } from "./cloud9.urls";

export type Run = {
  slug: string;
  title: string;
  date: string;
  dateLabel: string;
  cover: string;
};

export const RUNS: Run[] = [
  {
    slug: "sept-27",
    title: "Evening Run",
    date: "2026-09-27",
    dateLabel: "September 27th, 2026",
    cover: "_DSC7343",
  },
  {
    slug: "sept-11",
    title: "Evening Run",
    date: "2026-09-11",
    dateLabel: "September 11th, 2026",
    cover: "_DSC6049",
  },
];

export function rawFramesFor(slug: string): RawFrame[] {
  return FRAMES[slug] ?? [];
}

export function highlightsFor(slug: string): string[] {
  return HIGHLIGHTS[slug] ?? [];
}

export function coverUrl(run: Run) {
  return `${PHOTO_HOST}/${run.slug}/web/${run.cover}.webp`;
}

export function zipUrl(run: Run) {
  return `${PHOTO_HOST}/dl/${run.slug}.zip`;
}

export const TOTAL_FRAMES = RUNS.reduce((n, r) => n + (FRAMES[r.slug]?.length ?? 0), 0);
