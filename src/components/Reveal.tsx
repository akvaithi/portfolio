"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

// Guarantee that any reveal eventually plays. We watch IntersectionObserver
// through Framer's useInView, then OR it with a fallback timer so even if the
// observer never fires (mount-already-visible races, transition timing,
// Lenis-driven scroll quirks) the animation still runs.
function useReliableReveal<T extends HTMLElement = HTMLDivElement>(
  eager: boolean,
  amount: number = 0.05
) {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { once: true, amount });
  const [forced, setForced] = useState(false);

  useEffect(() => {
    if (eager) {
      setForced(true);
      return;
    }
    const id = setTimeout(() => setForced(true), 800);
    return () => clearTimeout(id);
  }, [eager]);

  return { ref, visible: eager || forced || inView };
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  eager?: boolean;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 32,
  duration = 0.9,
  eager = false,
}: RevealProps) {
  const { ref, visible } = useReliableReveal(eager);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const lineVariants: Variants = {
  hidden: { y: "110%" },
  visible: (i: number) => ({
    y: "0%",
    transition: {
      duration: 1.05,
      delay: 0.04 * i,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

// Pull styling classes out of the wrapper-level className and re-apply them
// to the inner text-bearing span. Necessary for things like `iris-text`
// (which uses `background-clip: text` + `color: transparent`) — when applied
// only at the wrapper, the inner mask container creates a stacking context
// that breaks the clip, and the text renders invisible.
function classApplyToInner(className: string | undefined): {
  wrapper: string;
  inner: string;
} {
  if (!className) return { wrapper: "", inner: "" };
  const tokens = className.split(/\s+/).filter(Boolean);
  const INNER = new Set([
    "iris-text",
    "text-acid",
    "text-acid-deep",
    "text-acid-cool",
    "text-acid-warm",
    "text-rust",
    "text-cream",
    "text-ink",
    "font-serif",
    "italic",
  ]);
  const inner: string[] = [];
  const wrapper: string[] = [];
  for (const t of tokens) {
    if (INNER.has(t)) inner.push(t);
    else wrapper.push(t);
  }
  return { wrapper: wrapper.join(" "), inner: inner.join(" ") };
}

export function MaskedLines({
  lines,
  className,
  delay = 0,
  eager = false,
}: {
  lines: string[];
  className?: string;
  delay?: number;
  eager?: boolean;
}) {
  const { ref, visible } = useReliableReveal<HTMLSpanElement>(eager);
  const split = classApplyToInner(className);
  return (
    <span ref={ref} className={split.wrapper}>
      {lines.map((line, i) => (
        <span key={i} className="reveal-mask !block">
          <motion.span
            className={`block ${split.inner}`}
            variants={lineVariants}
            initial="hidden"
            animate={visible ? "visible" : "hidden"}
            custom={i + delay * 10}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function SplitWords({
  text,
  className,
  delay = 0,
  stagger = 0.05,
  eager = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  eager?: boolean;
}) {
  const words = text.split(" ");
  const { ref, visible } = useReliableReveal<HTMLSpanElement>(eager);
  const split = classApplyToInner(className);
  return (
    <span ref={ref} className={split.wrapper}>
      {words.map((w, i) => (
        <span key={i} className="reveal-mask inline-block mr-[0.22em]">
          <motion.span
            className={`block ${split.inner}`}
            initial={{ y: "110%" }}
            animate={visible ? { y: "0%" } : { y: "110%" }}
            transition={{
              duration: 0.9,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
