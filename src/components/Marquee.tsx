"use client";

import type { ReactNode } from "react";

export function Marquee({
  children,
  speed = 40,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  return (
    <div className={`relative w-full overflow-hidden ${className ?? ""}`}>
      <div
        className="marquee-track flex w-max items-center gap-12 whitespace-nowrap"
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="flex items-center gap-12">{children}</div>
        <div className="flex items-center gap-12" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
