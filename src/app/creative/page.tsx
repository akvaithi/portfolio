import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal, MaskedLines, SplitWords } from "@/components/Reveal";
import { Marquee } from "@/components/Marquee";
import { Gallery } from "@/components/Gallery";
import { HDRImage } from "@/components/HDRImage";
import { Footer } from "@/components/Footer";
import { PHOTOS, YEARS, CATEGORIES } from "@/data/photos";

export const metadata: Metadata = {
  title: "Creative",
  description:
    "Wedding, portrait, and brand photography in College Station and Houston, and a YouTube channel on Python automation, Linux, and self-hosted infrastructure. Archive from 2023–2026.",
  alternates: { canonical: "/creative" },
  openGraph: {
    title: "Creative · Arun Vaithianathan",
    description:
      "Photography business and YouTube channel. Wedding, portrait, and brand work, plus technical tutorials.",
    url: "https://akvaithi.page/creative",
    type: "website",
  },
};

const HERO =
  PHOTOS.find((p) => p.year === "2025" && p.category === "Landscapes" && p.src.includes(" 10 ")) ??
  PHOTOS.find((p) => p.year === "2025" && p.category === "Landscapes");

// Featured YouTube videos. Card pulls its thumbnail straight from YouTube
// via img.youtube.com/vi/{id}/maxresdefault.jpg.
const FEATURED_VIDEOS: { id: string; title: string; views: string }[] = [
  { id: "CdLvTaBCYyA", title: "Featured", views: "Watch on YouTube" },
  { id: "qCMWeNndqtQ", title: "Featured", views: "Watch on YouTube" },
  { id: "lpRgjEq4JoY", title: "Featured", views: "Watch on YouTube" },
];

export default function Creative() {
  return (
    <>
      {/* ─────── HERO ─────── */}
      <section className="relative h-[88vh] min-h-[680px] w-full overflow-hidden">
        <div className="absolute inset-0">
          {HERO && (
            <HDRImage
              src={HERO.src}
              sdrSrc={HERO.sdrSrc}
              alt="Lead frame from the archive"
              fill
              priority
              sizes="100vw"
              className="object-cover drift"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/15 to-ink" />
        </div>

        <div className="absolute inset-x-0 top-24 z-10 mx-auto flex max-w-[1600px] items-center justify-between px-6 font-mono text-[10px] uppercase tracking-[0.22em] text-cream/70 md:px-10">
          <span>03 — Creative Archive</span>
          <span>{PHOTOS.length} frames · 2023 – 2026</span>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 mx-auto max-w-[1600px] px-6 pb-16 md:px-10 md:pb-24">
          <h1 className="display-mega text-[clamp(2.6rem,8.5vw,9rem)] tracking-tighter">
            <MaskedLines lines={["Photo", "& Video."]} eager />
          </h1>
          <Reveal delay={0.7} eager className="mt-8 max-w-2xl">
            <p className="font-serif italic text-2xl md:text-3xl leading-snug">
              Wedding, portrait, and brand work, plus a YouTube channel.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─────── MARQUEE ─────── */}
      <div className="border-y border-cream/10 bg-ink py-6">
        <Marquee speed={55}>
          {[
            "Photography",
            "|",
            "Wedding · Portrait · Brand",
            "|",
            "Color grading",
            "|",
            "Video",
            "|",
            "80+ client shoots",
            "|",
            "2,500+ subscribers",
            "|",
            "1.2M+ views",
            "|",
            "Self-hosted infra",
            "|",
          ].map((t, i) => {
            const isSep = t === "|";
            return (
              <span
                key={i}
                className={
                  isSep
                    ? "text-cream/25 font-sans font-light text-[clamp(2rem,6vw,5rem)] leading-none"
                    : "display-xl text-[clamp(2rem,6vw,5rem)] tracking-tighter text-cream/90 uppercase"
                }
              >
                {t}
              </span>
            );
          })}
        </Marquee>
      </div>

      {/* ─────── INTRO COPY ─────── */}
      <section className="mx-auto max-w-[1600px] px-6 md:px-10 py-24 md:py-32 grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-3">
          <p className="eyebrow text-cream/50 sticky top-28">§ — About</p>
        </div>
        <div className="col-span-12 md:col-span-9">
          <h2 className="font-serif italic text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.05] tracking-tight measure">
            <SplitWords text="I shoot people and places, and make tutorials about the software I use." />
          </h2>
          <Reveal delay={0.2} className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <p className="text-cream/75 leading-relaxed text-lg">
              I&apos;ve run the photography business since 2020: wedding, portrait,
              and brand work in College Station and Houston, 80+ client shoots so
              far. It taught me to deliver to a deadline and to explain technical
              work to people outside it.
            </p>
            <p className="text-cream/75 leading-relaxed text-lg">
              On YouTube I post tutorials on Python automation, Linux, and
              self-hosted infrastructure. The channel is past 1.2M views and
              2,500 subscribers.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─────── ARCHIVE LABEL ─────── */}
      <section className="mx-auto max-w-[1600px] px-6 md:px-10 mb-6">
        <div className="border-t border-cream/10 pt-10 flex items-end justify-between flex-wrap gap-4">
          <h3 className="display-xl text-[clamp(1.8rem,4.5vw,3.4rem)] tracking-tighter">
            <SplitWords text="Gallery." />
          </h3>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-cream/55">
            Filter by year &amp; series — click any frame to enlarge
          </p>
        </div>
      </section>

      {/* ─────── GALLERY ─────── */}
      <section className="mx-auto max-w-[1600px] px-6 md:px-10 pb-32">
        <Gallery photos={PHOTOS} years={YEARS} categories={CATEGORIES} />
      </section>

      {/* ─────── YOUTUBE ─────── */}
      <section className="border-y border-cream/10 bg-ink-soft">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-24 md:py-32">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="eyebrow text-cream/50">§ — YouTube</p>
              <h2 className="mt-4 display-xl text-[clamp(1.6rem,4vw,3.4rem)] tracking-tighter">
                <SplitWords text="1.2 million views" />
                <br />
                <SplitWords
                  text="on Python, Linux, and self-hosting."
                  delay={0.1}
                  className="font-serif italic iris-text"
                />
              </h2>
            </div>
            <a
              href="https://www.youtube.com/@akvaithi"
              target="_blank"
              rel="noreferrer"
              data-cursor="link"
              className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] hover:text-acid"
            >
              Visit the channel ↗
            </a>
          </div>

          {/* metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-y border-cream/10 py-10 mb-14">
            {[
              { v: "1.2M+", l: "Lifetime views" },
              { v: "2,500+", l: "Subscribers" },
              { v: "$2K+", l: "Channel revenue" },
              { v: "2020 →", l: "Publishing since" },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-serif italic text-3xl md:text-5xl iris-text inline-block">
                  {s.v}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-cream/55">
                  {s.l}
                </p>
              </div>
            ))}
          </div>

          {/* what's on it */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {[
              {
                title: "Python Automation",
                body: "Scripts, schedulers, system-level glue for the things you didn't know you could automate.",
              },
              {
                title: "Linux",
                body: "Getting comfortable on the command line: servers, networking, and day-to-day Linux.",
              },
              {
                title: "Self-Hosted Infrastructure",
                body: "Running your own services at home with Docker, and keeping them running.",
              },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <div className="border-t border-cream/10 pt-6 h-full flex flex-col">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-acid">
                    Series 0{i + 1}
                  </p>
                  <h3 className="mt-3 display-xl text-2xl md:text-3xl tracking-tight">
                    {c.title}
                  </h3>
                  <p className="mt-4 text-cream/75 leading-relaxed">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* featured videos — fill in actual video IDs from the channel
              for the previews. Until then the cards link to the channel. */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
            {FEATURED_VIDEOS.map((v) => (
              <a
                key={v.id || v.title}
                href={
                  v.id
                    ? `https://www.youtube.com/watch?v=${v.id}`
                    : "https://www.youtube.com/@akvaithi"
                }
                target="_blank"
                rel="noreferrer"
                data-cursor="media"
                data-cursor-label="Watch"
                className="group relative aspect-video overflow-hidden rounded-sm bg-ink-mute border border-cream/10 hover:border-acid/50 transition-colors"
              >
                {v.id ? (
                  <Image
                    src={`https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`}
                    alt={v.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center font-mono text-[10px] uppercase tracking-[0.22em] text-cream/40">
                    Add video ID
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
                <div className="absolute inset-x-4 bottom-3 flex items-end justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-serif italic text-lg leading-tight line-clamp-2">
                      {v.title}
                    </p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-cream/55">
                      {v.views}
                    </p>
                  </div>
                  <span className="size-9 flex items-center justify-center rounded-full bg-cream text-ink shrink-0 group-hover:bg-acid transition-colors">
                    ▶
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <a
              href="https://www.youtube.com/@akvaithi"
              target="_blank"
              rel="noreferrer"
              data-cursor="link"
              className="group inline-flex items-center gap-4 rounded-full border border-cream/20 bg-cream text-ink px-7 py-4 font-mono text-xs uppercase tracking-[0.22em] hover:bg-acid hover:text-ink transition-colors"
            >
              Watch on YouTube
              <span
                aria-hidden
                className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
              >
                ↗
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ─────── CTA ─────── */}
      <section className="bg-cream text-ink border-y border-ink/10">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-32 md:py-40 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-8">
            <p className="eyebrow text-ink/60 mb-6">§ — Booking</p>
            <h2 className="display-mega text-[clamp(1.6rem,4.4vw,4.4rem)] tracking-tighter">
              <SplitWords text="Booking shoots in" />
              <br />
              <SplitWords
                text="College Station & Houston."
                delay={0.15}
                className="font-serif italic text-rust"
              />
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4 flex flex-col justify-end gap-6 md:items-end">
            <p className="font-serif italic text-xl leading-snug measure">
              Graduations, weddings, garba nights, conferences, and portraits.
            </p>
            <Link
              href="/contact"
              data-cursor="link"
              className="group inline-flex items-center gap-4 rounded-full bg-ink text-cream px-7 py-4 font-mono text-xs uppercase tracking-[0.22em] hover:bg-acid hover:text-ink transition-colors"
            >
              Get in touch
              <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
