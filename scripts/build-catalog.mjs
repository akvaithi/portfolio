#!/usr/bin/env node
// Scans public/images and writes src/data/photos.ts + src/data/heroes.ts.
//
// HDR + SDR pairing:
//   When an AVIF is found, we also look for an "SDR sibling" — same base name
//   + ".sdr.webp" or ".sdr.jpg" extension. If present, that path is emitted
//   alongside so the runtime <HDRImage> can wire it up as the
//   dynamic-range: standard fallback in a <picture> element.
import { readdir, writeFile, mkdir, stat, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { execFileSync } from "node:child_process";
import { join, relative, dirname } from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const IMG_ROOT = join(ROOT, "public", "images");
// Grid thumbnails live outside IMG_ROOT so the walk below never mistakes
// them for photos or SDR siblings. Mirrors the images/ tree.
const THUMB_ROOT = join(ROOT, "public", "thumbs");
// Two widths: 480 for phones and small tiles, 960 for retina desktop tiles.
const THUMB_WIDTHS = [480, 960];

// Build (or reuse) small SDR WebPs for grid tiles (<name>.480.webp and
// <name>.960.webp) and return their shared public stem plus a dominant
// colour for the tile background while they load.
// Source is the SDR sibling when there is one: thumbnails never touch the
// HDR pipeline, and the lightbox keeps loading the full gain-map AVIF.
async function makeThumb(absSource) {
  const rel = relative(IMG_ROOT, absSource).replaceAll("\\", "/");
  const stem = rel.replace(/\.[^.]+$/, "");
  const srcStat = await stat(absSource);
  let decoded = null; // lazily-decoded input, shared across widths
  const input = async () => {
    if (decoded) return decoded;
    try {
      await sharp(absSource).metadata();
      decoded = absSource;
      // Probe a real decode; metadata() alone succeeds on files whose
      // bitstream sharp's libheif then refuses.
      await sharp(absSource).resize(8).toBuffer();
    } catch {
      // sharp's bundled libheif can't decode some gain-map AVIFs. macOS
      // can: decode through sips into a temp PNG, then encode that.
      decoded = join(tmpdir(), `thumb-${process.pid}-${Date.now()}.png`);
      execFileSync("sips", ["-s", "format", "png", absSource, "--out", decoded], {
        stdio: "ignore",
      });
    }
    return decoded;
  };
  for (const w of THUMB_WIDTHS) {
    const outAbs = join(THUMB_ROOT, `${stem}.${w}.webp`);
    try {
      if ((await stat(outAbs)).mtimeMs >= srcStat.mtimeMs) continue;
    } catch {
      /* no thumb yet */
    }
    await mkdir(dirname(outAbs), { recursive: true });
    await sharp(await input())
      .rotate()
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 72 })
      .toFile(outAbs);
  }
  if (decoded && decoded !== absSource) await rm(decoded, { force: true });
  const { dominant } = await sharp(join(THUMB_ROOT, `${stem}.480.webp`)).stats();
  const hex = (n) => n.toString(16).padStart(2, "0");
  return {
    thumb: "/thumbs/" + stem,
    tone: `#${hex(dominant.r)}${hex(dominant.g)}${hex(dominant.b)}`,
  };
}

const IMG_EXT = new Set([".avif", ".jpeg", ".jpg", ".png", ".webp"]);
const VID_EXT = new Set([".mp4", ".mov", ".webm"]);
// Anything other than the primary HDR format gets paired as an SDR fallback
// when it shares the same base name as a sibling AVIF.
const SDR_EXTS = [".webp", ".jpg", ".jpeg"];

async function walk(dir) {
  const out = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.name.startsWith(".")) continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) {
      out.push(...(await walk(p)));
    } else {
      out.push(p);
    }
  }
  return out;
}

function publicPath(absPath) {
  return "/" + relative(join(ROOT, "public"), absPath).replaceAll("\\", "/");
}

function ext(p) {
  const i = p.lastIndexOf(".");
  return i >= 0 ? p.slice(i).toLowerCase() : "";
}

// Look for an SDR sibling (same base name, different extension).
async function findSdrSibling(absAvif) {
  const base = absAvif.replace(/\.avif$/i, "");
  for (const ext of SDR_EXTS) {
    try {
      await stat(base + ext);
      return base + ext;
    } catch {
      /* sibling not present */
    }
  }
  return null;
}

// Build a set of every SDR file that *is* paired with an AVIF, so we can skip
// adding those WebP/JPEG files as standalone photos in the catalog.
const all = await walk(IMG_ROOT);
const sdrSiblings = new Set();
for (const abs of all) {
  if (ext(abs) !== ".avif") continue;
  const sibling = await findSdrSibling(abs);
  if (sibling) sdrSiblings.add(sibling);
}

const photos = [];
const heroes = {};
let sdrPairCount = 0;

for (const abs of all) {
  const rel = relative(IMG_ROOT, abs).replaceAll("\\", "/");
  const parts = rel.split("/");
  const e = ext(abs);
  if (!IMG_EXT.has(e) && !VID_EXT.has(e)) continue;

  // Skip any file that's been identified as an SDR sibling of an AVIF —
  // those attach to their AVIF primary, they don't get their own entry.
  if (sdrSiblings.has(abs)) continue;
  // Skip HEIC files; browser support is too narrow to ship as a primary.
  if (e === ".heic") continue;

  const isVideo = VID_EXT.has(e);
  const src = "/images/" + rel;

  let sdrSrc = null;
  if (e === ".avif") {
    const sibling = await findSdrSibling(abs);
    if (sibling) {
      sdrSrc = "/images/" + relative(IMG_ROOT, sibling).replaceAll("\\", "/");
      sdrPairCount++;
    }
  }

  // Thumbnails come from the SDR sibling when one exists (AVIF decode in
  // sharp works, but the SDR export is what the photographer graded for
  // non-HDR screens). SVGs and videos get none.
  const thumbSource = sdrSrc ? join(ROOT, "public", sdrSrc) : abs;
  const thumb =
    isVideo || e === ".svg" ? { thumb: null, tone: null } : await makeThumb(thumbSource);

  if (parts[0] === "HERO Images") {
    const project = parts[1];
    heroes[project] = heroes[project] ?? [];
    heroes[project].push({ src, isVideo, name: parts.at(-1), sdrSrc, ...thumb });
  } else if (/^20\d\d$/.test(parts[0])) {
    const year = parts[0];
    const category = parts[1];
    const subgroup = category === "Events" ? parts[2] : null;
    photos.push({
      src,
      year,
      category,
      subgroup,
      isVideo,
      sdrSrc,
      ...thumb,
    });
  }
}

const yearOrder = (a, b) => Number(b) - Number(a);
const numericalSort = (a, b) => {
  // sort by trailing number in filename when present
  const re = /(\d+)(?=\D*$)/;
  const am = a.src.match(re);
  const bm = b.src.match(re);
  if (am && bm) return Number(am[1]) - Number(bm[1]);
  return a.src.localeCompare(b.src);
};

photos.sort(numericalSort);

const years = Array.from(new Set(photos.map((p) => p.year))).sort(yearOrder);
const categories = ["Landscapes", "Portraits", "Events"];

await mkdir(join(ROOT, "src", "data"), { recursive: true });

const photoTs = `// Generated by scripts/build-catalog.mjs. Do not edit by hand.
export type Photo = {
  src: string;
  year: string;
  category: "Landscapes" | "Portraits" | "Events";
  subgroup: string | null;
  isVideo: boolean;
  // SDR sibling file (e.g., \`name.sdr.webp\`) found next to the AVIF.
  // Null when the photographer hasn't exported an SDR fallback yet — the
  // image will silently fall back to the Vercel-optimized SDR path.
  sdrSrc: string | null;
  // Stem of the SDR grid thumbnails under /public/thumbs, built by the
  // catalog script: \`\${thumb}.480.webp\` and \`\${thumb}.960.webp\`. Grid
  // tiles use these; the lightbox still loads \`src\` (HDR).
  thumb: string | null;
  // Dominant colour of the thumbnail, shown behind the tile while it loads.
  tone: string | null;
};

export const PHOTOS: Photo[] = ${JSON.stringify(photos, null, 2)};

export const YEARS = ${JSON.stringify(years)} as const;
export const CATEGORIES = ${JSON.stringify(categories)} as const;
`;

const heroesTs = `// Generated by scripts/build-catalog.mjs. Do not edit by hand.
export type HeroAsset = {
  src: string;
  isVideo: boolean;
  name: string;
  sdrSrc: string | null;
  thumb: string | null;
  tone: string | null;
};
export const HEROES: Record<string, HeroAsset[]> = ${JSON.stringify(heroes, null, 2)};
`;

await writeFile(join(ROOT, "src", "data", "photos.ts"), photoTs);
await writeFile(join(ROOT, "src", "data", "heroes.ts"), heroesTs);

console.log(
  `Wrote ${photos.length} photos across ${years.length} years and ${Object.keys(heroes).length} hero projects. SDR siblings paired: ${sdrPairCount}.`
);
