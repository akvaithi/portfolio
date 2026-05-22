"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 380, damping: 36, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 380, damping: 36, mass: 0.4 });
  const [variant, setVariant] = useState<"default" | "link" | "media" | "drag">(
    "default"
  );
  const [label, setLabel] = useState("");
  const visible = useRef(false);
  const [, force] = useState(0);

  useEffect(() => {
    const hasFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!hasFine) return;

    const onMove = (e: MouseEvent) => {
      if (!visible.current) {
        visible.current = true;
        force((n) => n + 1);
      }
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest<HTMLElement>(
        "a, button, [data-cursor]"
      );
      if (interactive) {
        const kind = interactive.dataset.cursor;
        const text = interactive.dataset.cursorLabel ?? "";
        setLabel(text);
        if (kind === "media") setVariant("media");
        else if (kind === "drag") setVariant("drag");
        else setVariant("link");
      } else {
        setVariant("default");
        setLabel("");
      }
    };

    const onLeave = () => {
      visible.current = false;
      force((n) => n + 1);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [x, y]);

  const size =
    variant === "media" ? 120 : variant === "link" ? 56 : variant === "drag" ? 96 : 14;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[200] hidden md:flex items-center justify-center rounded-full mix-blend-difference"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: size,
          height: size,
          backgroundColor:
            variant === "default" ? "#f4f1e8" : "rgba(244,241,232,0.92)",
          opacity: visible.current ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 240, damping: 26, mass: 0.5 }}
      >
        {label && (
          <span className="text-[10px] uppercase tracking-[0.18em] font-mono text-ink">
            {label}
          </span>
        )}
      </motion.div>
    </>
  );
}
