import Link from "next/link";
import type { Metadata } from "next";
import { Reveal, MaskedLines, SplitWords } from "@/components/Reveal";
import { Clock } from "@/components/Clock";
import { HDRImage } from "@/components/HDRImage";
import { Footer } from "@/components/Footer";
import { PHOTOS } from "@/data/photos";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Arun Vaithianathan — email, LinkedIn, GitHub, and résumé. Open to deep-tech, climate, robotics, 0→1 software, and photography commissions.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact · Arun Vaithianathan",
    description:
      "Direct lines — email, LinkedIn, GitHub, résumé. Open to deep-tech, climate, robotics, and photography commissions.",
    url: "https://akvaithi.page/contact",
    type: "website",
  },
};

// Latest landscape — 2026 set, lighter overlay so the gain-map HDR survives.
const HERO =
  PHOTOS.find(
    (p) =>
      p.category === "Landscapes" &&
      p.year === "2026" &&
      p.src.includes("Landscapes - 3 of 5")
  ) ??
  PHOTOS.find((p) => p.category === "Landscapes" && p.year === "2026") ??
  PHOTOS.find((p) => p.category === "Landscapes");

const CHANNELS = [
  {
    label: "Email",
    value: "akvaithi.tech@gmail.com",
    href: "mailto:akvaithi.tech@gmail.com",
    aside: "Fastest reply · drafts get a response inside 24 hours.",
  },
  {
    label: "LinkedIn",
    value: "/in/akvaithi",
    href: "https://linkedin.com/in/akvaithi",
    aside: "Best for intros, cohorts, fellowships, and recruiting threads.",
  },
  {
    label: "GitHub",
    value: "@akvaithi",
    href: "https://github.com/akvaithi",
    aside: "Inspect the code · open issues · trade pull requests.",
  },
  {
    label: "Résumé",
    value: "résumé.pdf",
    href: "/resume.pdf",
    aside: "Full one-page PDF — last updated May 2026.",
  },
];

export default function Contact() {
  return (
    <>
      {/* ────────── HERO ────────── */}
      <section className="relative pt-40 md:pt-52 pb-24 md:pb-32 overflow-hidden">
        {HERO && (
          <div className="absolute inset-0">
            <HDRImage
              src={HERO.src}
              sdrSrc={HERO.sdrSrc}
              alt="Atmosphere — a landscape from the personal archive"
              fill
              priority
              sizes="100vw"
              className="object-cover drift"
            />
            {/* Lighter overlays so the gain-map HDR pop survives. Vertical
                gradient only fades the bottom into the page; horizontal
                gradient gives the headline some shade on the left. */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink/15 to-ink" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/55 via-transparent to-transparent" />
          </div>
        )}

        <div className="relative mx-auto max-w-[1600px] px-6 md:px-10">
          <p className="eyebrow text-cream/60 mb-8">04 — Open a channel</p>
          <h1 className="display-mega text-[clamp(2.6rem,8.5vw,9rem)] tracking-tighter">
            <MaskedLines lines={["Let's", "trade", "ideas."]} eager />
          </h1>
          <Reveal delay={0.6} eager>
            <p className="mt-10 max-w-2xl font-serif italic text-2xl md:text-3xl leading-snug">
              I&apos;m energized by people with an obsessive drive to pull ideas out of their heads
              and force them into physical reality. Critique my code, propose a project, or just
              say hi.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ────────── STATUS BAR ────────── */}
      <div className="border-y border-cream/10 bg-ink-soft">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-4 flex flex-wrap items-center gap-x-8 gap-y-2 font-mono text-[11px] uppercase tracking-[0.22em] text-cream/65">
          <span className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-acid animate-pulse" />
            Open to: deep-tech, climate, robotics, 0→1 software, photography commissions
          </span>
          <span className="hidden md:inline">
            College Station — <Clock />
          </span>
          <span className="ml-auto">Typical response &lt; 24 h</span>
        </div>
      </div>

      {/* ────────── DIRECT LINES (centerpiece) ────────── */}
      <section className="mx-auto max-w-[1600px] px-6 md:px-10 py-24 md:py-32">
        <div className="mb-12 flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="eyebrow text-cream/50">§ — Direct lines</p>
            <h2 className="mt-4 display-xl text-[clamp(1.6rem,3.6vw,3rem)] tracking-tighter">
              <SplitWords text="Four ways" />{" "}
              <SplitWords
                text="to reach me."
                delay={0.1}
                className="iris-text font-serif italic"
              />
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-cream/45 max-w-md">
            Pick whichever feels right — every one of them reaches me.
          </p>
        </div>

        <ul className="divide-y divide-cream/10 border-y border-cream/10">
          {CHANNELS.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.05}>
              <li>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") || c.href.endsWith(".pdf") ? "_blank" : undefined}
                  rel="noreferrer"
                  data-cursor="link"
                  className="group grid grid-cols-12 items-center gap-6 py-8 md:py-10"
                >
                  <div className="col-span-2 md:col-span-1">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-acid/80">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="col-span-10 md:col-span-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/45">
                      {c.label}
                    </p>
                    <p className="mt-1 font-serif text-3xl md:text-5xl truncate group-hover:iris-text transition-colors">
                      {c.value}
                    </p>
                  </div>
                  <div className="hidden md:block md:col-span-7">
                    <p className="text-cream/70 leading-snug font-serif italic text-xl">
                      {c.aside}
                    </p>
                  </div>
                  <div className="col-span-12 md:col-span-1 md:text-right">
                    <span
                      aria-hidden
                      className="font-mono text-xs text-cream/45 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-acid"
                    >
                      OPEN →
                    </span>
                  </div>
                </a>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ────────── LOOK FOR ME AT + SLACK-STYLE NOTE ────────── */}
      <section className="bg-ink-soft border-y border-cream/5 py-24 md:py-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 grid grid-cols-12 gap-10">
          <div className="col-span-12 md:col-span-6">
            <p className="eyebrow text-cream/50 mb-6">§ — Look for me at</p>
            <ul className="space-y-3 text-cream/85 font-serif text-2xl leading-snug">
              <li>· Texas A&amp;M College of Engineering</li>
              <li>· Greentown Labs · Houston</li>
              <li>· Aggies in Tech residencies · Bay Area</li>
              <li>· FRC competitions · season-dependent</li>
              <li>· On a shoot · client-dependent</li>
            </ul>
          </div>
          <div className="col-span-12 md:col-span-6">
            <p className="eyebrow text-cream/50 mb-6">§ — When sending</p>
            <ul className="divide-y divide-cream/10 border-y border-cream/10">
              {[
                ["A prototype", "A repo, a screenshot, a rough sketch — anything tangible."],
                ["A constraint", "What can't change. That's where the interesting work lives."],
                ["A timeline", "Even rough. \"Some time this semester\" works."],
              ].map(([t, s]) => (
                <li key={t} className="py-5 grid grid-cols-[1fr_2fr] gap-6 items-baseline">
                  <span className="font-serif italic text-2xl">{t}</span>
                  <span className="text-cream/70 leading-snug">{s}</span>
                </li>
              ))}
            </ul>
            <a
              href="mailto:akvaithi.tech@gmail.com"
              data-cursor="link"
              className="group mt-10 inline-flex items-center gap-4 rounded-full border border-cream/20 bg-cream text-ink px-7 py-4 font-mono text-xs uppercase tracking-[0.22em] hover:bg-acid hover:text-ink transition-colors"
            >
              Compose email
              <span
                aria-hidden
                className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ────────── CLOSING ────────── */}
      <section className="py-32 md:py-40">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 md:col-span-9">
            <h2 className="font-serif italic text-[clamp(2rem,5.5vw,5rem)] leading-[0.98] tracking-tight">
              <SplitWords text="Build something good." />
              <br />
              <SplitWords
                text="Then build the next thing."
                delay={0.15}
                className="iris-text"
              />
            </h2>
          </div>
          <div className="col-span-12 md:col-span-3 md:text-right">
            <Link
              href="/"
              data-cursor="link"
              className="font-mono text-xs uppercase tracking-[0.22em] text-cream/70 hover:text-acid"
            >
              ← Back to the top
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
