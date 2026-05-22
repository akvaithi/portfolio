"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        {/* curtain wipe on route change */}
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[70] origin-bottom bg-ink"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1, originY: 0 }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
        />
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
