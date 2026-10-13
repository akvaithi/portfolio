"use client";

import { useEffect, useRef } from "react";

// Custom cursor. Position runs on a requestAnimationFrame loop that eases
// toward the pointer and writes a transform straight to the element; the
// variant (default / link / media / drag) and label are data attributes.
// Nothing here goes through React state, so moving the mouse never
// re-renders anything. Sizes and colours per variant live in globals.css.
//
// Hidden while the lightbox is open (see globals.css): a mix-blend cursor
// over HDR pixels has crashed Chrome's GPU process.
const EASE = 0.28;

export function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current;
    const text = label.current;
    if (!el || !text) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    document.documentElement.dataset.cursor = "custom";

    let tx = -100;
    let ty = -100;
    let x = tx;
    let y = ty;
    let raf = 0;

    const tick = () => {
      x += (tx - x) * EASE;
      y += (ty - y) * EASE;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.1 ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      el.dataset.visible = "";
      kick();
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest<HTMLElement>("a, button, [data-cursor]");
      const kind = interactive?.dataset.cursor;
      const variant = !interactive
        ? "default"
        : kind === "media" || kind === "drag"
          ? kind
          : "link";
      if (el.dataset.variant !== variant) el.dataset.variant = variant;
      const next = interactive?.dataset.cursorLabel ?? "";
      if (text.textContent !== next) text.textContent = next;
    };

    const onLeave = () => delete el.dataset.visible;

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      delete document.documentElement.dataset.cursor;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={root} aria-hidden data-cursor-root data-variant="default" className="cursor">
      <span ref={label} className="cursor-label" />
    </div>
  );
}
