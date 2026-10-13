import Link from "next/link";

const CHANNELS = [
  { label: "Email", href: "mailto:akvaithi.tech@gmail.com" },
  { label: "LinkedIn", href: "https://linkedin.com/in/akvaithi" },
  { label: "GitHub", href: "https://github.com/akvaithi" },
  { label: "Résumé", href: "/resume.pdf" },
];

const PAGES = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/professional" },
  { label: "Photography", href: "/creative" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-cream/10">
      <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 md:px-10">
        <div className="col-span-2">
          <p className="font-serif text-2xl leading-tight max-w-md">
            <span className="italic">Chemical engineering at Texas A&amp;M.</span> Research,
            robotics, software, and photography.
          </p>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-cream/60">
            © {year} Arun Vaithianathan · College Station &amp; Houston
          </p>
        </div>
        <nav aria-label="Elsewhere">
          <ul className="space-y-2.5 font-mono text-xs uppercase tracking-[0.16em]">
            {CHANNELS.map((c) => {
              const external = !c.href.startsWith("mailto:");
              return (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                    data-cursor="link"
                    className="text-cream/80 hover:text-acid"
                  >
                    {c.label} ↗
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <nav aria-label="Pages">
          <ul className="space-y-2.5 font-mono text-xs uppercase tracking-[0.16em]">
            {PAGES.map((p) => (
              <li key={p.href}>
                <Link href={p.href} data-cursor="link" className="text-cream/80 hover:text-acid">
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
