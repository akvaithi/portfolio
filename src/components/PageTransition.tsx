"use client";

import { usePathname } from "next/navigation";
import { useRef, type ReactNode } from "react";

// Curtain wipe on route change. The curtain is keyed by pathname, so each
// navigation mounts a fresh one that covers the screen and slides away
// (CSS keyframes in globals.css). The new page renders immediately
// underneath: navigation no longer waits for an exit animation. Nothing
// plays on the first load, so the hero paints straight away.
//
// Deliberately not the View Transitions API: it animates snapshots of the
// old and new pages, and Safari is known to show gain-map images as SDR
// while transitions run. A plain overlay keeps the HDR heroes out of it.
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const firstPath = useRef(pathname);
  const navigated = useRef(false);
  if (pathname !== firstPath.current) navigated.current = true;

  if (!navigated.current) return <div className="relative">{children}</div>;
  return (
    <>
      <div key={pathname} aria-hidden className="curtain" />
      <div key={`page-${pathname}`} className="page-enter relative">
        {children}
      </div>
    </>
  );
}
