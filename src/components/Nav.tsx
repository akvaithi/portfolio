"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticLink } from "./Magnetic";

const links = [
  { href: "/", label: "Index", num: "01" },
  { href: "/professional", label: "Professional", num: "02" },
  { href: "/creative", label: "Creative", num: "03" },
  { href: "/contact", label: "Contact", num: "04" },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled
            ? "bg-ink/70 backdrop-blur-xl border-b border-cream/5"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10">
          <MagneticLink href="/">
            <span className="flex items-baseline gap-2 font-mono text-xs uppercase tracking-[0.22em]">
              <span className="block size-2 rounded-full bg-acid" />
              Arun&nbsp;Vaithianathan
            </span>
          </MagneticLink>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <MagneticLink key={l.href} href={l.href}>
                  <span
                    className={`relative px-4 py-2 font-mono text-xs uppercase tracking-[0.22em] transition-colors ${
                      active ? "text-cream" : "text-cream/60 hover:text-cream"
                    }`}
                  >
                    <span className="text-acid/70 mr-2">{l.num}</span>
                    {l.label}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute left-4 right-4 bottom-1 h-px bg-cream"
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                  </span>
                </MagneticLink>
              );
            })}
          </nav>

          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden font-mono text-xs uppercase tracking-[0.22em]"
            data-cursor="link"
            aria-label="Toggle menu"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-ink md:hidden flex flex-col justify-center px-10 gap-6"
          >
            {links.map((l, i) => (
              <motion.div
                key={l.href}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.05 * i + 0.1,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href={l.href}
                  className="flex items-baseline gap-4 display-xl text-5xl"
                >
                  <span className="font-mono text-xs text-acid">{l.num}</span>
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
