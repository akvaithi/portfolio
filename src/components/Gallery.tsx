"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Lightbox } from "./Lightbox";
import type { Photo } from "@/data/photos";

type Filter = {
  year: string | "ALL";
  category: "Landscapes" | "Portraits" | "Events" | "ALL";
};

// Bounded initial batch — the single biggest factor in keeping the tab
// responsive on lower-end devices. Each batch is small enough that even
// slow GPUs can decode them concurrently without locking the main thread.
const INITIAL_BATCH = 8;
const STEP_BATCH = 12;

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
  const [visibleCount, setVisibleCount] = useState(4);

  // Two-pass reveal: first row immediately, the rest after the browser
  // has had a moment to finish painting + decoding the first batch. Also
  // resets when the filter changes so heavy filter switches stay responsive.
  useEffect(() => {
    setVisibleCount(4);
    const id = setTimeout(() => setVisibleCount(INITIAL_BATCH), 400);
    return () => clearTimeout(id);
  }, [filter]);

  const filtered = useMemo(
    () =>
      photos.filter(
        (p) =>
          (filter.year === "ALL" || p.year === filter.year) &&
          (filter.category === "ALL" || p.category === filter.category)
      ),
    [photos, filter]
  );


  const shown = filtered.slice(0, visibleCount);
  const remaining = filtered.length - shown.length;

  const counts = useMemo(() => {
    const out: Record<string, number> = { ALL: photos.length };
    for (const y of years) out[y] = photos.filter((p) => p.year === y).length;
    return out;
  }, [photos, years]);

  return (
    <>
      {/* Filters — opaque background, no backdrop blur (was GPU-thrashing). */}
      <div className="sticky top-[72px] z-30 -mx-6 md:-mx-10 mb-10 border-y border-cream/10 bg-ink">
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
              filter.category === "ALL" ? "text-acid" : "text-cream/65 hover:text-cream"
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() =>
                setFilter((f) => ({ ...f, category: c as Filter["category"] }))
              }
              data-cursor="link"
              className={`font-mono text-xs uppercase tracking-[0.18em] transition-colors ${
                filter.category === c ? "text-acid" : "text-cream/65 hover:text-cream"
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

      {/* Plain CSS grid — fixed 4-up aspect-square cells. No masonry column
          flow (which re-layouts on every image load), no Framer Motion layout
          animations, no per-item IntersectionObserver. */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {shown.map((p, i) => (
          <button
            key={p.src}
            onClick={() => setLightboxIndex(i)}
            data-cursor="media"
            data-cursor-label="View"
            className="group relative aspect-[4/5] overflow-hidden rounded-sm bg-ink-soft"
          >
            <Image
              src={p.src}
              alt={`${p.category} ${p.year}`}
              fill
              loading="lazy"
              decoding="async"
              sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
              className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
            />
            <div className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/15" />
            <div className="pointer-events-none absolute left-3 bottom-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-cream opacity-0 transition-opacity group-hover:opacity-100">
              <span className="rounded-full bg-ink/70 px-2 py-1">{p.year}</span>
              <span className="rounded-full bg-ink/70 px-2 py-1">{p.category}</span>
            </div>
          </button>
        ))}
      </div>

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
        </div>
      )}

      <Lightbox
        photo={
          lightboxIndex !== null && filtered[lightboxIndex]
            ? {
                src: filtered[lightboxIndex].src,
                sdrSrc: filtered[lightboxIndex].sdrSrc,
              }
            : null
        }
        index={lightboxIndex ?? 0}
        count={filtered.length}
        onClose={() => setLightboxIndex(null)}
        onNext={() =>
          setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length))
        }
        onPrev={() =>
          setLightboxIndex((i) =>
            i === null ? null : (i - 1 + filtered.length) % filtered.length
          )
        }
      />
    </>
  );
}
