"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

export function Lightbox({
  src,
  onClose,
  onPrev,
  onNext,
  count,
  index,
}: {
  src: string | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  count: number;
  index: number;
}) {
  useEffect(() => {
    if (!src) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onNext();
      else if (e.key === "ArrowLeft") onPrev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [src, onClose, onNext, onPrev]);

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[90] bg-ink/95 backdrop-blur-2xl flex flex-col"
          onClick={onClose}
          data-lenis-prevent
        >
          <div className="flex items-center justify-between px-6 md:px-10 py-6 font-mono text-[11px] uppercase tracking-[0.22em] text-cream/70">
            <span>
              {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
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
          <div className="relative flex-1 px-6 md:px-20 pb-20" onClick={(e) => e.stopPropagation()}>
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-full w-full"
            >
              <Image
                src={src}
                alt="Selected photograph"
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </motion.div>

            <button
              onClick={onPrev}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 font-mono text-xs uppercase tracking-[0.22em] text-cream/70 hover:text-acid"
              data-cursor="link"
            >
              ← Prev
            </button>
            <button
              onClick={onNext}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 font-mono text-xs uppercase tracking-[0.22em] text-cream/70 hover:text-acid"
              data-cursor="link"
            >
              Next →
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
