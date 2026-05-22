"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type CarouselItem = { src: string; isVideo: boolean };

export function HorizontalCarousel({
  items,
  displayMode = "photo",
  screenshotBg = "ink",
}: {
  items: CarouselItem[];
  displayMode?: "photo" | "screenshot";
  screenshotBg?: "cream" | "ink";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateAffordance = () => {
    const el = ref.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateAffordance();
    const el = ref.current;
    if (!el) return;
    el.addEventListener("scroll", updateAffordance, { passive: true });
    window.addEventListener("resize", updateAffordance);
    return () => {
      el.removeEventListener("scroll", updateAffordance);
      window.removeEventListener("resize", updateAffordance);
    };
  }, []);

  // Smart wheel handler: pass vertical scroll through to the page, capture
  // horizontal trackpad gestures for the carousel.
  const onWheel = (e: React.WheelEvent) => {
    const el = ref.current;
    if (!el) return;
    const absX = Math.abs(e.deltaX);
    const absY = Math.abs(e.deltaY);
    if (absX > absY * 1.2) {
      // user intends horizontal — translate to scrollLeft, suppress browser default
      el.scrollLeft += e.deltaX;
      e.preventDefault();
    }
    // otherwise vertical-dominant: do nothing, let the page (Lenis) scroll
  };

  const scrollBy = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.85), behavior: "smooth" });
  };

  if (!items?.length) return null;

  return (
    <div className="relative -mx-6 md:-mx-10">
      <div
        ref={ref}
        onWheel={onWheel}
        className="overflow-x-auto"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="flex gap-3 px-6 md:px-10 py-2 w-max">
          {items.map((item, i) => {
            if (displayMode === "screenshot") {
              const isCream = screenshotBg === "cream";
              return (
                <div
                  key={item.src}
                  className={`relative aspect-[3/2] h-[280px] md:h-[420px] flex-none overflow-hidden rounded-sm ${
                    isCream ? "bg-cream-mute" : "bg-ink-soft"
                  }`}
                  data-cursor="drag"
                  data-cursor-label="Drag"
                >
                  <div
                    className={`absolute inset-x-0 top-0 z-10 flex items-center gap-1.5 px-3 py-2 border-b ${
                      isCream ? "bg-cream border-ink/10" : "bg-ink-mute border-cream/10"
                    }`}
                  >
                    <span className="size-2 rounded-full bg-rust/70" />
                    <span className="size-2 rounded-full bg-acid/70" />
                    <span className="size-2 rounded-full bg-acid-cool/70" />
                  </div>
                  <div className="absolute inset-x-3 top-8 bottom-3">
                    <Image
                      src={item.src}
                      alt={`Asset ${i + 1}`}
                      fill
                      sizes="500px"
                      className="object-contain object-top pointer-events-none select-none"
                      draggable={false}
                    />
                  </div>
                </div>
              );
            }
            return (
              <div
                key={item.src}
                className="relative aspect-[3/2] h-[280px] md:h-[420px] flex-none overflow-hidden rounded-sm"
                data-cursor="drag"
                data-cursor-label="Drag"
              >
                <Image
                  src={item.src}
                  alt={`Asset ${i + 1}`}
                  fill
                  sizes="500px"
                  className="object-cover pointer-events-none select-none"
                  draggable={false}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* arrow controls */}
      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden md:flex items-center justify-between px-2">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          disabled={!canPrev}
          aria-label="Previous"
          data-cursor="link"
          className={`pointer-events-auto rounded-full bg-ink/70 backdrop-blur-md border border-cream/15 px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] transition-opacity ${
            canPrev ? "opacity-100 hover:bg-ink/90" : "opacity-0"
          }`}
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          disabled={!canNext}
          aria-label="Next"
          data-cursor="link"
          className={`pointer-events-auto rounded-full bg-ink/70 backdrop-blur-md border border-cream/15 px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] transition-opacity ${
            canNext ? "opacity-100 hover:bg-ink/90" : "opacity-0"
          }`}
        >
          →
        </button>
      </div>
    </div>
  );
}
