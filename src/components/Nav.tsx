"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MagneticLink } from "./Magnetic";

const links = [
  { href: "/professional", label: "Work" },
  { href: "/creative", label: "Photography" },
  { href: "/contact", label: "Contact" },
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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={`nav-enter fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled || open ? "bg-ink/95 border-b border-cream/5" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-5 sm:px-6 md:px-10">
          <MagneticLink href="/" aria-label="Arun Vaithianathan, home">
            <span className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.16em]">
              <span className="block size-2 rounded-full bg-acid" />
              Arun&nbsp;Vaithianathan
            </span>
          </MagneticLink>

          <nav aria-label="Main" className="hidden md:flex items-center gap-1">
            {links.map((l) => {
              const active = pathname === l.href || pathname.startsWith(`${l.href}/`);
              return (
                <MagneticLink
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                >
                  <span
                    className={`nav-link relative block px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] transition-colors ${
                      active ? "text-cream" : "text-cream/65 hover:text-cream"
                    }`}
                    data-active={active ? "" : undefined}
                  >
                    {l.label}
                  </span>
                </MagneticLink>
              );
            })}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              data-cursor="link"
              className="ml-3 rounded-full border border-cream/20 px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-cream/80 hover:border-cream/60 hover:text-cream transition-colors"
            >
              Résumé ↗
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden -mr-2 min-h-11 px-2 font-mono text-xs uppercase tracking-[0.16em]"
            data-cursor="link"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      {/* Mobile menu: always mounted so it can animate both ways in CSS. */}
      <div
        id="mobile-menu"
        className="mobile-menu fixed inset-0 z-40 bg-ink md:hidden flex flex-col justify-center gap-6 px-6"
        data-open={open ? "" : undefined}
        inert={!open}
      >
        {[{ href: "/", label: "Home" }, ...links].map((l, i) => (
          <Link
            key={l.href}
            href={l.href}
            className="mobile-menu-item display-xl text-5xl"
            style={{ "--i": i } as React.CSSProperties}
          >
            {l.label}
          </Link>
        ))}
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="mobile-menu-item mt-4 font-mono text-sm uppercase tracking-[0.16em] text-cream/75"
          style={{ "--i": links.length + 1 } as React.CSSProperties}
        >
          Résumé ↗
        </a>
      </div>
    </>
  );
}
