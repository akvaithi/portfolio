"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { HDRImage } from "./HDRImage";

export type LightboxPhoto = {
  src: string;
  sdrSrc: string | null;
};

// Minimum gap between navigation clicks. Each Next/Prev triggers a fresh
// HDR-AVIF decode that allocates an EDR buffer; Chrome's GPU process can
// only hold so many concurrent EDR allocations before crashing. 350 ms
// gives the previous decode time to settle and its buffer time to release.
const NAV_THROTTLE_MS = 350;

export function Lightbox({
  photo,
  onClose,
  onPrev,
  onNext,
  count,
  index,
}: {
  photo: LightboxPhoto | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  count: number;
  index: number;
}) {
  const lastNavAt = useRef(0);
  const throttledNav = (fn: () => void) => () => {
    const now = Date.now();
    if (now - lastNavAt.current < NAV_THROTTLE_MS) return;
    lastNavAt.current = now;
    fn();
  };
  const tNext = throttledNav(onNext);
  const tPrev = throttledNav(onPrev);
  useEffect(() => {
    if (!photo) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") tNext();
      else if (e.key === "ArrowLeft") tPrev();
    };
    document.body.style.overflow = "hidden";
    // Signal lightbox-open. The custom cursor watches this and hides itself
    // — mix-blend-difference cursors over HDR images crash Chrome's GPU
    // process (the compositor can't blend pixel values above 1.0).
    document.body.dataset.lightbox = "open";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      delete document.body.dataset.lightbox;
      window.removeEventListener("keydown", onKey);
    };
  }, [photo, onClose, onNext, onPrev]);

  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[90] bg-ink/95 flex flex-col"
          onClick={onClose}
          data-lenis-prevent
        >
          <div className="flex items-center justify-between px-6 md:px-10 py-6 font-mono text-[11px] uppercase tracking-[0.22em] text-cream/70">
            <span>
              {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              {photo.sdrSrc && (
                <span className="ml-3 text-acid">HDR</span>
              )}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="hover:text-acid"
              data-cursor="link"
            >
              Close ✕
            </button>
          </div>
          <div
            className="relative flex-1 px-6 md:px-20 pb-20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* No motion wrapper, no per-photo key. Each photo change just
                swaps the <img src>, so the browser releases the old EDR
                buffer cleanly before allocating the next one. Remounting
                via key was leaving multiple HDR layers in flight, which
                pushed Chrome's GPU process over the edge. */}
            <div className="relative h-full w-full">
              <HDRImage
                src={photo.src}
                sdrSrc={photo.sdrSrc}
                alt="Selected photograph"
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            <button
              onClick={tPrev}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 font-mono text-xs uppercase tracking-[0.22em] text-cream/70 hover:text-acid"
            >
              ← Prev
            </button>
            <button
              onClick={tNext}
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
