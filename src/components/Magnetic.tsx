"use client";

import Link from "next/link";
import { useRef, type ReactNode, type ComponentProps } from "react";

type MagneticProps = {
  children: ReactNode;
  strength?: number;
  className?: string;
};

// Pulls its content toward the pointer while hovered, then eases back.
// Writes a transform directly; the easing is a CSS transition (.magnetic in
// globals.css), so there is no animation loop and no React state.
export function Magnetic({ children, strength = 0.35, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * strength;
    el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`magnetic ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

type MagneticLinkProps = ComponentProps<typeof Link> & {
  children: ReactNode;
  strength?: number;
  cursor?: "link" | "media" | "drag";
};

export function MagneticLink({
  children,
  strength,
  cursor = "link",
  ...props
}: MagneticLinkProps) {
  return (
    <Magnetic strength={strength}>
      <Link {...props} data-cursor={cursor}>
        {children}
      </Link>
    </Magnetic>
  );
}
