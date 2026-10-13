"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { expandFrames, type Frame, type RawFrame } from "@/data/cloud9.urls";

// A run is 700–1,100 frames. Mounting them all at once stalls the main thread
// on decode, so tiles arrive in batches as a sentinel nears the viewport.
const BATCH = 48;

function useColumnCount() {
  const [cols, setCols] = useState(2);
  useEffect(() => {
    const queries = [
      { mq: window.matchMedia("(min-width: 1280px)"), n: 4 },
      { mq: window.matchMedia("(min-width: 768px)"), n: 3 },
    ];
    const update = () => setCols(queries.find((q) => q.mq.matches)?.n ?? 2);
    update();
    queries.forEach((q) => q.mq.addEventListener("change", update));
    return () => queries.forEach((q) => q.mq.removeEventListener("change", update));
  }, []);
  return cols;
}

export function RunGallery({
  slug,
  raw,
  label,
}: {
  slug: string;
  raw: RawFrame[];
  label: string;
}) {
  const frames = useMemo(() => expandFrames(slug, raw), [slug, raw]);
  const cols = useColumnCount();
  const [visible, setVisible] = useState(BATCH);
  const [open, setOpen] = useState<number | null>(null);
  const sentinel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVisible((v) => Math.min(v + BATCH, frames.length));
      },
      { rootMargin: "1200px 0px" }
    );
    // Re-observing after every batch re-fires the callback if the sentinel is
    // still in range, so a tall viewport keeps filling instead of stalling.
    io.observe(el);
    return () => io.disconnect();
  }, [frames.length, visible]);

  // Masonry that still reads left-to-right in shooting order: each frame goes
  // to the currently shortest column. Greedy placement is prefix-stable, so
  // loading the next batch never moves a tile that is already on screen.
  const columns = useMemo(() => {
    const out: { frame: Frame; index: number }[][] = Array.from({ length: cols }, () => []);
    const heights = new Array(cols).fill(0);
    frames.slice(0, visible).forEach((frame, index) => {
      const c = heights.indexOf(Math.min(...heights));
      out[c].push({ frame, index });
      heights[c] += frame.h / frame.w;
    });
    return out;
  }, [frames, visible, cols]);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? null : (i + d + frames.length) % frames.length)),
    [frames.length]
  );

  return (
    <>
      <div className="flex gap-3 md:gap-4">
        {columns.map((col, c) => (
          <div key={c} className="flex-1 min-w-0 flex flex-col gap-3 md:gap-4">
            {col.map(({ frame, index }) => (
              <button
                key={frame.name}
                type="button"
                onClick={() => setOpen(index)}
                data-cursor="media"
                data-cursor-label="View"
                className="group relative block overflow-hidden rounded-sm bg-ink-soft"
                style={{ aspectRatio: `${frame.w} / ${frame.h}` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={frame.thumb}
                  alt={`${label}, frame ${index + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
                />
              </button>
            ))}
          </div>
        ))}
      </div>
      {visible < frames.length && (
        <div ref={sentinel} className="py-16 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-cream/40">
          Loading frames · {visible} / {frames.length}
        </div>
      )}

      <RunLightbox
        frame={open === null ? null : frames[open]}
        index={open ?? 0}
        count={frames.length}
        onClose={close}
        onStep={step}
      />
    </>
  );
}

function RunLightbox({
  frame,
  index,
  count,
  onClose,
  onStep,
}: {
  frame: Frame | null;
  index: number;
  count: number;
  onClose: () => void;
  onStep: (d: number) => void;
}) {
  const touchX = useRef<number | null>(null);
  const isOpen = frame !== null;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onStep(1);
      else if (e.key === "ArrowLeft") onStep(-1);
    };
    document.body.style.overflow = "hidden";
    // The custom cursor hides itself while a lightbox is open.
    document.body.dataset.lightbox = "open";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      delete document.body.dataset.lightbox;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose, onStep]);

  return (
    <AnimatePresence>
      {frame && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[90] bg-ink/95 flex flex-col"
          onClick={onClose}
          data-lenis-prevent
        >
          <div
            className="flex items-center justify-between gap-4 px-6 md:px-10 py-5 font-mono text-[11px] uppercase tracking-[0.22em] text-cream/70"
            onClick={(e) => e.stopPropagation()}
          >
            <span>
              {String(index + 1).padStart(String(count).length, "0")} / {count}
            </span>
            <div className="flex items-center gap-6">
              <a
                href={frame.download}
                className="rounded-full bg-cream text-ink px-4 py-2 hover:bg-acid transition-colors"
              >
                Download ↓
              </a>
              <button type="button" onClick={onClose} className="hover:text-acid">
                Close ✕
              </button>
            </div>
          </div>
          <div
            className="relative flex-1 min-h-0 px-4 md:px-20 pb-10 md:pb-16"
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              touchX.current = null;
              if (Math.abs(dx) > 50) onStep(dx < 0 ? 1 : -1);
            }}
          >
            {/* Thumbnail underneath as an instant placeholder; the 2400px
                frame paints over it once it arrives. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={frame.thumb}
              alt=""
              aria-hidden
              className="absolute inset-0 m-auto h-full w-full object-contain px-4 md:px-20 pb-10 md:pb-16"
              onClick={(e) => e.stopPropagation()}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={frame.web}
              src={frame.web}
              alt={`Frame ${index + 1} of ${count}`}
              className="relative h-full w-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onStep(-1);
              }}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 font-mono text-xs uppercase tracking-[0.22em] text-cream/70 hover:text-acid"
            >
              ← Prev
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onStep(1);
              }}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 font-mono text-xs uppercase tracking-[0.22em] text-cream/70 hover:text-acid"
            >
              Next →
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
