import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal, MaskedLines, SplitWords } from "@/components/Reveal";
import { Marquee } from "@/components/Marquee";
import { Gallery } from "@/components/Gallery";
import { Footer } from "@/components/Footer";
import { PHOTOS, YEARS, CATEGORIES } from "@/data/photos";

export const metadata: Metadata = {
  title: "Creative — Arun Vaithianathan",
  description:
    "Commercial photography service plus a self-hosted YouTube channel. Selected frames from 2023–2026.",
};

const HERO =
  PHOTOS.find((p) => p.year === "2025" && p.category === "Landscapes" && p.src.includes(" 10 ")) ??
  PHOTOS.find((p) => p.year === "2025" && p.category === "Landscapes");

export default function Creative() {
  return (
    <>
      {/* ─────── HERO ─────── */}
      <section className="relative h-[88vh] min-h-[680px] w-full overflow-hidden">
        <div className="absolute inset-0">
          {HERO && (
            <Image
              src={HERO.src}
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
            <MaskedLines lines={["Through the", "Lens."]} eager />
          </h1>
          <Reveal delay={0.7} eager className="mt-8 max-w-2xl">
            <p className="font-serif italic text-2xl md:text-3xl leading-snug">
              A commercial photography practice — landscape, portrait, event, brand —
              and the <span className="iris-text">other stuff</span> on YouTube that taught me how to ship.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─────── MARQUEE ─────── */}
      <div className="border-y border-cream/10 bg-ink py-6">
        <Marquee speed={55}>
          {[
            "Photography service",
            "|",
            "Portrait · Brand · Event",
            "|",
            "Color grading",
            "|",
            "Editorial sequencing",
            "|",
            "80+ client shoots",
            "|",
            "2.2k subscribers",
            "|",
            "1M+ views",
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
          <p className="eyebrow text-cream/50 sticky top-28">§ — Statement</p>
        </div>
        <div className="col-span-12 md:col-span-9">
          <h2 className="font-serif italic text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.05] tracking-tight measure">
            <SplitWords text="The best technical architecture is useless if nobody understands how to use it." />
          </h2>
          <Reveal delay={0.2} className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <p className="text-cream/75 leading-relaxed text-lg">
              Photography is the service. Brand, portrait, event, product, landscape —
              80+ commercial engagements taught me the discipline of shipping art to
              a deadline, and editorial sequencing taught me how images carry the story
              past the frame.
            </p>
            <p className="text-cream/75 leading-relaxed text-lg">
              YouTube is the other stuff — a self-hosted channel of deep technical
              tutorials that crossed 1M+ views and 2.2k subscribers, funding 100%
              of its own operational overhead through the Partner Program.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─────── ARCHIVE LABEL ─────── */}
      <section className="mx-auto max-w-[1600px] px-6 md:px-10 mb-6">
        <div className="border-t border-cream/10 pt-10 flex items-end justify-between flex-wrap gap-4">
          <h3 className="display-xl text-[clamp(1.8rem,4.5vw,3.4rem)] tracking-tighter">
            <SplitWords text="The Archive." />
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
              <p className="eyebrow text-cream/50">§ — The Other Stuff · YouTube</p>
              <h2 className="mt-4 display-xl text-[clamp(2rem,5vw,4rem)] tracking-tighter">
                <SplitWords text="A million views" />
                <br />
                <span className="font-serif italic iris-text">
                  <SplitWords text="of teaching how things work." delay={0.1} />
                </span>
              </h2>
            </div>
            <a
              href="https://youtube.com/@arunvaithianathan"
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
              { v: "1M+", l: "Lifetime views" },
              { v: "2.2k", l: "Subscribers" },
              { v: "100%", l: "Self-funded via Partner Program" },
              { v: "2020 →", l: "Building in public" },
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
                title: "Self-Hosted Linux",
                body: "Home-lab Linux, server stacks, networking, and the sovereignty of running your own infrastructure.",
              },
              {
                title: "Hardware Architectures",
                body: "Single-board computers, embedded systems, and the techno-economic tradeoffs of picking a platform.",
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

          <div className="mt-14 flex flex-wrap items-center gap-5">
            <a
              href="https://youtube.com/@arunvaithianathan"
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
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/45 max-w-md">
              Sponsorship + Partner-Program revenue fully covers the channel&apos;s operating cost.
            </p>
          </div>
        </div>
      </section>

      {/* ─────── CTA ─────── */}
      <section className="bg-cream text-ink border-y border-ink/10">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-32 md:py-40 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-8">
            <p className="eyebrow text-ink/60 mb-6">§ — Commission</p>
            <h2 className="display-mega text-[clamp(1.9rem,5.5vw,5.4rem)] tracking-tighter">
              <SplitWords text="Need photography" />
              <br />
              <span className="font-serif italic text-rust">
                <SplitWords text="for a thing you're building?" delay={0.15} />
              </span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4 flex flex-col justify-end gap-6 md:items-end">
            <p className="font-serif italic text-xl leading-snug measure">
              Brand · portrait · product · event · landscape. Editorial sequencing and color included.
            </p>
            <Link
              href="/contact"
              data-cursor="link"
              className="group inline-flex items-center gap-4 rounded-full bg-ink text-cream px-7 py-4 font-mono text-xs uppercase tracking-[0.22em] hover:bg-acid hover:text-ink transition-colors"
            >
              Start a brief
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
