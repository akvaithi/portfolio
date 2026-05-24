import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-cream/10 mt-32">
      <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-10 px-6 py-16 md:grid-cols-4 md:px-10">
        <div className="col-span-2 md:col-span-2">
          <p className="eyebrow text-cream/50">© {year} — Arun Vaithianathan</p>
          <p className="mt-4 max-w-md font-serif text-2xl leading-tight">
            <span className="italic">Chemical engineering at Texas A&amp;M.</span>
            {" "}Research, robotics, software, and photography.
          </p>
        </div>
        <div>
          <p className="eyebrow text-cream/50 mb-4">Channels</p>
          <ul className="space-y-2 font-mono text-xs uppercase tracking-[0.18em]">
            <li>
              <a
                href="https://linkedin.com/in/akvaithi"
                target="_blank"
                rel="noreferrer"
                data-cursor="link"
                className="hover:text-acid"
              >
                LinkedIn ↗
              </a>
            </li>
            <li>
              <a
                href="https://github.com/akvaithi"
                target="_blank"
                rel="noreferrer"
                data-cursor="link"
                className="hover:text-acid"
              >
                GitHub ↗
              </a>
            </li>
            <li>
              <a
                href="mailto:akvaithi.tech@gmail.com"
                data-cursor="link"
                className="hover:text-acid"
              >
                Email ↗
              </a>
            </li>
            <li>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                data-cursor="link"
                className="hover:text-acid"
              >
                Résumé.pdf ↗
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="eyebrow text-cream/50 mb-4">Index</p>
          <ul className="space-y-2 font-mono text-xs uppercase tracking-[0.18em]">
            <li>
              <Link href="/" className="hover:text-acid" data-cursor="link">
                01 — Home
              </Link>
            </li>
            <li>
              <Link href="/professional" className="hover:text-acid" data-cursor="link">
                02 — Professional
              </Link>
            </li>
            <li>
              <Link href="/creative" className="hover:text-acid" data-cursor="link">
                03 — Creative
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-acid" data-cursor="link">
                04 — Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4 px-6 py-6 md:px-10 font-mono text-[10px] uppercase tracking-[0.22em] text-cream/40">
          <span>College Station · Houston · Bay Area</span>
          <span>BUILT IN-HOUSE — NEXT · TAILWIND · FRAMER · LENIS</span>
          <span>v1.0 — {year}</span>
        </div>
      </div>
    </footer>
  );
}
