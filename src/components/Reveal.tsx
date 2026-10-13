import type { CSSProperties, ReactNode } from "react";

// Scroll reveals, done in CSS.
//
// These render plain markup with a `data-reveal` attribute. One shared
// IntersectionObserver in <MotionObserver> (mounted once in the layout) sets
// `data-in` the first time each element enters the viewport, and the
// transitions in globals.css do the rest. No per-word React components, no
// per-instance observers, and the components work on the server.
//
//   - `eager` → `data-in` is rendered up front, so the animation plays on
//     first paint. Use for above-the-fold hero text.
//   - Otherwise the element animates the first time it scrolls into view.
//     An element already on screen at load animates immediately, because an
//     IntersectionObserver reports current visibility as soon as it observes.

type Vars = CSSProperties & Record<`--${string}`, string | number>;

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
  const style: Vars = {
    "--rv-delay": `${delay}s`,
    "--rv-y": `${y}px`,
    "--rv-dur": `${duration}s`,
  };
  return (
    <div
      data-reveal="fade"
      data-in={eager ? "" : undefined}
      className={className}
      style={style}
    >
      {children}
    </div>
  );
}

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
  const split = classApplyToInner(className);
  return (
    <span
      data-reveal="mask"
      data-in={eager ? "" : undefined}
      className={split.wrapper}
      style={{ "--rv-delay": `${delay}s`, "--rv-step": "0.04s", "--rv-dur": "1.05s" } as Vars}
    >
      {lines.map((line, i) => (
        <span key={i} className="reveal-mask !block">
          <span className={`rv-piece block ${split.inner}`} style={{ "--i": i } as Vars}>
            {line}
          </span>
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
  const split = classApplyToInner(className);
  return (
    <span
      data-reveal="mask"
      data-in={eager ? "" : undefined}
      className={split.wrapper}
      style={{ "--rv-delay": `${delay}s`, "--rv-step": `${stagger}s`, "--rv-dur": "0.9s" } as Vars}
    >
      {words.map((w, i) => (
        <span key={i} className="reveal-mask inline-block mr-[0.22em]">
          <span className={`rv-piece block ${split.inner}`} style={{ "--i": i } as Vars}>
            {w}
          </span>
        </span>
      ))}
    </span>
  );
}
