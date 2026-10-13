"use client";

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
  const closeBtn = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const throttledNav = (fn: () => void) => () => {
    const now = Date.now();
    if (now - lastNavAt.current < NAV_THROTTLE_MS) return;
    lastNavAt.current = now;
    fn();
  };
  const tNext = throttledNav(onNext);
  const tPrev = throttledNav(onPrev);
  const isOpen = photo !== null;

  useEffect(() => {
    if (!isOpen) return;
    // Return focus to whatever opened the lightbox when it closes.
    const opener = document.activeElement as HTMLElement | null;
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") tNext();
      else if (e.key === "ArrowLeft") tPrev();
    };
    document.body.style.overflow = "hidden";
    // Signal lightbox-open. The custom cursor hides itself (a
    // mix-blend-difference cursor over HDR images crashes Chrome's GPU
    // process) and ambient animations pause (globals.css).
    document.body.dataset.lightbox = "open";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      delete document.body.dataset.lightbox;
      window.removeEventListener("keydown", onKey);
      opener?.focus?.();
    };
    // tNext/tPrev are rebuilt each render; the handlers they wrap are what
    // matter, and those are in the list.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, onClose, onNext, onPrev]);

  if (!photo) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${count}`}
      className="lightbox-in fixed inset-0 z-[90] bg-ink/95 flex flex-col"
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-10 py-5 font-mono text-[11px] uppercase tracking-[0.18em] text-cream/75">
        <span>
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          {photo.sdrSrc && <span className="ml-3 text-acid">HDR</span>}
        </span>
        <button
          ref={closeBtn}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="min-h-11 px-2 hover:text-acid"
          data-cursor="link"
        >
          Close ✕
        </button>
      </div>
      <div
        className="relative flex-1 px-4 md:px-20 pb-16 md:pb-20"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 50) (dx < 0 ? tNext : tPrev)();
        }}
      >
        {/* No per-photo key. Each photo change just swaps the <img src>, so
            the browser releases the old EDR buffer cleanly before
            allocating the next one. Remounting via key was leaving multiple
            HDR layers in flight, which pushed Chrome's GPU process over the
            edge. */}
        <div className="relative h-full w-full">
          <HDRImage
            src={photo.src}
            sdrSrc={photo.sdrSrc}
            alt="Selected photograph"
            fill
            sizes="100vw"
            className="object-contain"
            loading="eager"
            fetchPriority="high"
          />
        </div>

        <button
          type="button"
          onClick={tPrev}
          aria-label="Previous photo"
          className="absolute left-1 md:left-6 top-1/2 -translate-y-1/2 min-h-11 px-2 font-mono text-xs uppercase tracking-[0.18em] text-cream/75 hover:text-acid"
        >
          ← Prev
        </button>
        <button
          type="button"
          onClick={tNext}
          aria-label="Next photo"
          className="absolute right-1 md:right-6 top-1/2 -translate-y-1/2 min-h-11 px-2 font-mono text-xs uppercase tracking-[0.18em] text-cream/75 hover:text-acid"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
