"use client";

import { useEffect } from "react";

// One IntersectionObserver pair for the whole site, mounted once in the
// layout. It drives two things through data attributes; the motion itself
// lives in globals.css.
//
// 1. Reveals: the first time a `[data-reveal]` element enters the viewport
//    it gets `data-in`, and is never observed again.
// 2. Ambient loops (iris shimmer, marquee, hero drift): `data-offscreen` is
//    toggled as they leave and re-enter the viewport so their animations
//    pause when nobody can see them. That saves paint work, and keeps idle
//    animation from competing with gain-map HDR images (Safari can drop a
//    gain-map image to SDR while other animations run on the page).
//
// A MutationObserver picks up elements added later (route changes, the
// gallery's "load more", the lightbox).
const REVEAL = "[data-reveal]:not([data-in])";
const AMBIENT = ".iris-text, .marquee-track, .drift";

export function MotionObserver() {
  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          (e.target as HTMLElement).dataset.in = "";
          reveal.unobserve(e.target);
        }
      },
      { threshold: 0.05 }
    );

    const ambient = new IntersectionObserver((entries) => {
      for (const e of entries) {
        const el = e.target as HTMLElement;
        if (e.isIntersecting) delete el.dataset.offscreen;
        else el.dataset.offscreen = "";
      }
    });

    const seen = new WeakSet<Element>();
    const scan = (root: ParentNode) => {
      root.querySelectorAll(REVEAL).forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        reveal.observe(el);
      });
      root.querySelectorAll(AMBIENT).forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        ambient.observe(el);
      });
    };

    scan(document);
    // Batch mutation scans into one per frame.
    let queued = false;
    const mutations = new MutationObserver(() => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        scan(document);
      });
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      reveal.disconnect();
      ambient.disconnect();
    };
  }, []);

  return null;
}
