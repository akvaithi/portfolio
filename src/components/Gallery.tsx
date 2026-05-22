"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbox } from "./Lightbox";
import type { Photo } from "@/data/photos";

type Filter = {
  year: string | "ALL";
  category: "Landscapes" | "Portraits" | "Events" | "ALL";
};

const INITIAL_BATCH = 32;
const STEP_BATCH = 32;

const aspectFor = (i: number) => {
  // pseudo-random varied aspects for a more editorial feel
  const cycle = i % 7;
  if (cycle === 0) return "aspect-[4/5]";
  if (cycle === 1) return "aspect-[3/4]";
  if (cycle === 2) return "aspect-[16/10]";
  if (cycle === 3) return "aspect-[1/1]";
  if (cycle === 4) return "aspect-[4/3]";
  if (cycle === 5) return "aspect-[2/3]";
  return "aspect-[5/4]";
};

export function Gallery({
  photos,
  years,
  categories,
}: {
  photos: Photo[];
  years: readonly string[];
  categories: readonly string[];
}) {
  const [filter, setFilter] = useState<Filter>({ year: "ALL", category: "ALL" });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH);

  const filtered = useMemo(() => {
    return photos.filter(
      (p) =>
        (filter.year === "ALL" || p.year === filter.year) &&
        (filter.category === "ALL" || p.category === filter.category)
    );
  }, [photos, filter]);

  // Reset paging whenever filter changes
  useEffect(() => {
    setVisibleCount(INITIAL_BATCH);
  }, [filter]);

  const shown = filtered.slice(0, visibleCount);
  const remaining = filtered.length - shown.length;

  const counts = useMemo(() => {
    const out: Record<string, number> = { ALL: photos.length };
    for (const y of years) out[y] = photos.filter((p) => p.year === y).length;
    return out;
  }, [photos, years]);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const next = () =>
    setLightboxIndex((i) =>
      i === null ? null : (i + 1) % filtered.length
    );
  const prev = () =>
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + filtered.length) % filtered.length
    );

  return (
    <>
      {/* Filters */}
      <div className="sticky top-[72px] z-30 -mx-6 md:-mx-10 mb-10 border-y border-cream/10 bg-ink/85 backdrop-blur-xl">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-4 flex flex-wrap gap-x-8 gap-y-3 items-center">
          <span className="eyebrow text-cream/45">Year</span>
          <button
            onClick={() => setFilter((f) => ({ ...f, year: "ALL" }))}
            data-cursor="link"
            className={`font-mono text-xs uppercase tracking-[0.18em] transition-colors ${
              filter.year === "ALL" ? "text-acid" : "text-cream/65 hover:text-cream"
            }`}
          >
            All <span className="text-cream/35">({counts.ALL})</span>
          </button>
          {years.map((y) => (
            <button
              key={y}
              onClick={() => setFilter((f) => ({ ...f, year: y }))}
              data-cursor="link"
              className={`font-mono text-xs uppercase tracking-[0.18em] transition-colors ${
                filter.year === y ? "text-acid" : "text-cream/65 hover:text-cream"
              }`}
            >
              {y} <span className="text-cream/35">({counts[y] ?? 0})</span>
            </button>
          ))}

          <span className="w-px h-4 bg-cream/15 mx-2 hidden md:inline-block" />

          <span className="eyebrow text-cream/45">Series</span>
          <button
            onClick={() => setFilter((f) => ({ ...f, category: "ALL" }))}
            data-cursor="link"
            className={`font-mono text-xs uppercase tracking-[0.18em] transition-colors ${
              filter.category === "ALL"
                ? "text-acid"
                : "text-cream/65 hover:text-cream"
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() =>
                setFilter((f) => ({
                  ...f,
                  category: c as Filter["category"],
                }))
              }
              data-cursor="link"
              className={`font-mono text-xs uppercase tracking-[0.18em] transition-colors ${
                filter.category === c
                  ? "text-acid"
                  : "text-cream/65 hover:text-cream"
              }`}
            >
              {c}
            </button>
          ))}

          <span className="ml-auto font-mono text-xs uppercase tracking-[0.18em] text-cream/55">
            {filtered.length} frames
          </span>
        </div>
      </div>

      {/* Mosaic */}
      <motion.div
        layout
        className="columns-2 md:columns-3 xl:columns-4 gap-3 md:gap-4"
      >
        <AnimatePresence mode="popLayout">
          {shown.map((p, i) => (
            <motion.button
              key={p.src}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{
                duration: 0.5,
                delay: (i % 12) * 0.02,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={() => openLightbox(i)}
              data-cursor="media"
              data-cursor-label="View"
              className={`group relative mb-3 md:mb-4 block w-full overflow-hidden rounded-sm break-inside-avoid ${aspectFor(
                i
              )}`}
            >
              <Image
                src={p.src}
                alt={`${p.category} ${p.year}`}
                fill
                loading="lazy"
                unoptimized
                sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
              />
              <div className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/15" />
              <div className="pointer-events-none absolute left-3 bottom-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-cream opacity-0 transition-opacity group-hover:opacity-100">
                <span className="rounded-full bg-ink/70 px-2 py-1 backdrop-blur">
                  {p.year}
                </span>
                <span className="rounded-full bg-ink/70 px-2 py-1 backdrop-blur">
                  {p.category}
                </span>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* manual load-more */}
      {remaining > 0 && (
        <div className="mt-12 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={() =>
              setVisibleCount((c) => Math.min(c + STEP_BATCH, filtered.length))
            }
            data-cursor="link"
            className="rounded-full border border-cream/20 px-7 py-4 font-mono text-xs uppercase tracking-[0.22em] hover:bg-cream hover:text-ink transition-colors"
          >
            Load {Math.min(STEP_BATCH, remaining)} more · {remaining} remaining
          </button>
          <button
            type="button"
            onClick={() => setVisibleCount(filtered.length)}
            data-cursor="link"
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/45 hover:text-cream"
          >
            or show all {filtered.length}
          </button>
        </div>
      )}
      {remaining === 0 && shown.length > INITIAL_BATCH && (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => {
              setVisibleCount(INITIAL_BATCH);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            data-cursor="link"
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/45 hover:text-cream"
          >
            ↑ back to top · collapse
          </button>
        </div>
      )}

      <Lightbox
        src={lightboxIndex !== null ? filtered[lightboxIndex]?.src ?? null : null}
        index={lightboxIndex ?? 0}
        count={filtered.length}
        onClose={closeLightbox}
        onNext={next}
        onPrev={prev}
      />
    </>
  );
}
