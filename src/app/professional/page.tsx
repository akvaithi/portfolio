import Link from "next/link";
import type { Metadata } from "next";
import { Reveal, SplitWords, MaskedLines } from "@/components/Reveal";
import { HorizontalCarousel } from "@/components/HorizontalCarousel";
import { RotatingHero } from "@/components/RotatingHero";
import { ProjectHero } from "@/components/ProjectHero";
import { Footer } from "@/components/Footer";
import { PROJECTS, EXPERIENCES, AWARDS, SKILLS } from "@/data/projects";
import { HEROES } from "@/data/heroes";

export const metadata: Metadata = {
  title: "Professional — Arun Vaithianathan",
  description:
    "Case studies in chemical engineering, control systems, materials synthesis, and 0→1 software.",
};

const scaleLabel = (s: "molecular" | "digital" | "creative") =>
  s === "molecular" ? "I — Molecular" : s === "digital" ? "II — Digital" : "III — Creative";

// Rotating hero — only frames from the HERO Images folder, no landscapes.
// Software-screenshot projects are excluded from the cinematic banner since a
// UI screenshot stretched full-bleed reads as broken rather than intentional;
// they get their own framed treatment inside the case studies instead.
const BANNER_EXCLUDE = new Set(["Aggie Reseach Finder", "Tube Furnace"]);
const ROTATING_HEROES = (
  Object.entries(HEROES)
    .filter(([project]) => !BANNER_EXCLUDE.has(project))
    .flatMap(([, assets]) =>
      assets
        .filter((a) => !a.isVideo)
        .slice(0, 2)
        .map((a) => a.src)
    )
    .filter(Boolean) as string[]
);

export default function Professional() {
  return (
    <>
      {/* ───────────── HERO BANNER ───────────── */}
      <section className="relative h-[78vh] min-h-[620px] w-full overflow-hidden">
        <RotatingHero
          images={ROTATING_HEROES}
          alt="Selected work — rotating"
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink/10 to-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/55 via-ink/15 to-transparent" />

        {/* HUD overlay */}
        <div className="absolute inset-x-0 top-24 z-10 mx-auto flex max-w-[1600px] items-center justify-between px-6 font-mono text-[10px] uppercase tracking-[0.22em] text-cream/70 md:px-10">
          <span>02 — Professional Index</span>
          <span>
            {PROJECTS.length} case studies · {EXPERIENCES.length} positions · 2024–2026
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 mx-auto max-w-[1600px] px-6 pb-16 md:px-10 md:pb-24">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-8">
              <h1 className="display-mega text-[clamp(2.6rem,8.5vw,9rem)] tracking-tighter">
                <MaskedLines lines={["The", "Built", "Log."]} eager />
              </h1>
            </div>
            <div className="col-span-12 md:col-span-4 md:text-right">
              <Reveal delay={0.4} eager>
                <p className="font-serif italic text-2xl md:text-3xl leading-tight">
                  A working record of the systems, deployments, and field trials behind the résumé.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── PERSONAL STATS STRIP ───────────── */}
      <section className="border-b border-cream/10">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-16 md:py-20">
          <Reveal className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { v: "3.918", l: "Cumulative GPA · TAMU honors" },
              { v: "7+", l: "Awards & recognitions" },
              { v: "3×", l: "FRC World Championships" },
              { v: "1M+", l: "Lifetime YouTube views" },
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
          </Reveal>
        </div>
      </section>

      {/* ───────────── CASE STUDIES ───────────── */}
      <section className="mx-auto max-w-[1600px] px-6 md:px-10 py-24 md:py-32 space-y-32 md:space-y-48">
        {PROJECTS.map((p, idx) => {
          const hero = p.heroes[0];
          const odd = idx % 2 === 1;
          return (
            <article key={p.slug} id={p.slug} className="scroll-mt-32">
              <div className="grid grid-cols-12 gap-x-8 gap-y-10">
                <div
                  className={`col-span-12 md:col-span-7 ${odd ? "md:order-2" : ""}`}
                >
                  <Reveal>
                    {hero && (
                      <ProjectHero
                        src={hero.src}
                        alt={p.title}
                        displayMode={p.displayMode}
                        screenshotBg={p.screenshotBg}
                        className="aspect-[16/10]"
                        sizes="(max-width: 768px) 100vw, 60vw"
                        badge={`CASE ${String(idx + 1).padStart(2, "0")}`}
                      />
                    )}
                  </Reveal>
                </div>

                <div
                  className={`col-span-12 md:col-span-5 ${odd ? "md:order-1" : ""}`}
                >
                  <Reveal delay={0.05}>
                    <p className="eyebrow text-acid">{scaleLabel(p.scale)}</p>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <h2 className="mt-5 display-xl text-[clamp(1.7rem,3.3vw,3rem)] tracking-tight leading-[1.05]">
                      {p.title}
                    </h2>
                  </Reveal>
                  <Reveal delay={0.15}>
                    <p className="mt-3 font-mono text-xs uppercase tracking-[0.18em] text-cream/55">
                      {p.role} · {p.org}
                    </p>
                  </Reveal>
                  <Reveal delay={0.2}>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-cream/45">
                      {p.location} — {p.period}
                    </p>
                  </Reveal>
                  <Reveal delay={0.25}>
                    <p className="mt-6 font-serif italic text-xl md:text-2xl leading-snug">
                      {p.tagline}
                    </p>
                  </Reveal>
                  <Reveal delay={0.3}>
                    <ul className="mt-7 space-y-3 text-cream/75 leading-relaxed">
                      {p.body.map((line) => (
                        <li key={line} className="flex gap-3">
                          <span className="text-acid font-mono mt-1 text-xs">▸</span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </Reveal>

                  {p.metrics && (
                    <Reveal delay={0.4}>
                      <div className="mt-8 grid grid-cols-3 gap-4 border-t border-cream/10 pt-6">
                        {p.metrics.map((m) => (
                          <div key={m.label}>
                            <p className="font-serif italic text-xl text-cream">{m.value}</p>
                            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream/50 mt-1">
                              {m.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    </Reveal>
                  )}

                  <Reveal delay={0.5}>
                    <div className="mt-8 flex flex-wrap gap-2">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-cream/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-cream/65"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </Reveal>

                  {p.link && (
                    <Reveal delay={0.55}>
                      <a
                        href={p.link.href}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor="link"
                        className="group mt-8 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-acid hover:text-cream"
                      >
                        <span>Visit live</span>
                        <span className="text-cream/45 truncate">
                          {p.link.label}
                        </span>
                        <span
                          aria-hidden
                          className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
                        >
                          ↗
                        </span>
                      </a>
                    </Reveal>
                  )}
                </div>
              </div>

              {p.heroes.length > 1 && (
                <Reveal delay={0.1} className="mt-10">
                  <HorizontalCarousel
                    items={p.heroes.slice(0, 8)}
                    displayMode={p.displayMode}
                    screenshotBg={p.screenshotBg}
                  />
                </Reveal>
              )}
            </article>
          );
        })}
      </section>

      {/* ───────────── TIMELINE ───────────── */}
      <section className="bg-ink-soft border-y border-cream/5 py-32 md:py-40">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <p className="eyebrow text-cream/50">§ — Experience Timeline</p>
              <h2 className="mt-4 display-xl text-[clamp(2rem,4.5vw,3.6rem)] tracking-tighter">
                <SplitWords text="Where I have been." />
              </h2>
            </div>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              data-cursor="link"
              className="hidden md:inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] hover:text-acid"
            >
              Full résumé .pdf
              <span aria-hidden>↗</span>
            </a>
          </div>

          <ol className="relative border-l border-cream/15 pl-6 md:pl-10 space-y-12">
            {EXPERIENCES.map((e, i) => (
              <Reveal key={`${e.role}-${i}`} delay={i * 0.03}>
                <li className="relative">
                  <span className="absolute -left-[34px] md:-left-[46px] top-2 size-2.5 rounded-full bg-acid ring-4 ring-ink-soft" />
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-cream/50">
                    {e.period}
                  </p>
                  <h3 className="mt-2 display-xl text-2xl md:text-3xl tracking-tight">
                    {e.role}
                  </h3>
                  <p className="mt-1 font-serif italic text-cream/70 text-lg">{e.org}</p>
                  <ul className="mt-4 space-y-2 text-cream/75 max-w-3xl">
                    {e.bullets.map((b) => (
                      <li key={b} className="flex gap-3">
                        <span className="text-acid font-mono text-xs mt-1">▸</span>
                        <span className="leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────────── AWARDS + EDUCATION ───────────── */}
      <section className="mx-auto max-w-[1600px] px-6 md:px-10 py-32 md:py-40 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-7">
          <p className="eyebrow text-cream/50 mb-6">§ — Awards & Recognition</p>
          <h2 className="display-xl text-[clamp(2rem,4.5vw,3.4rem)] tracking-tighter mb-12">
            <SplitWords text="Marks on the wall." />
          </h2>
          <ul className="divide-y divide-cream/10 border-y border-cream/10">
            {AWARDS.map((a, i) => (
              <Reveal key={a} delay={i * 0.04}>
                <li className="py-5 flex items-start gap-6">
                  <span className="font-mono text-xs text-acid pt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-cream/85 font-serif text-xl leading-snug">
                    {a}
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="md:col-span-5 md:pl-12 md:border-l md:border-cream/10">
          <p className="eyebrow text-cream/50 mb-6">§ — Education</p>
          <h3 className="display-xl text-3xl tracking-tight">Texas A&amp;M University</h3>
          <p className="mt-2 font-serif italic text-xl text-cream/80">
            B.S. Chemical Engineering · Minor in Mathematics
          </p>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.18em] text-cream/55">
            August 2024 — May 2028 · College Station, TX
          </p>
          <ul className="mt-8 space-y-3 text-cream/80">
            <li className="flex items-baseline gap-3">
              <span className="font-serif italic text-acid text-xl">3.918</span>
              <span className="text-cream/70">Cumulative GPA</span>
            </li>
            <li className="text-cream/75">
              Craig &amp; Galen Brown Engineering Honors · Aggies in Tech Business Certificate
            </li>
            <li className="text-cream/75">
              Dean&apos;s List · Chem-E Dept Scholarship · Lechner Scholarship
            </li>
          </ul>

          <div className="mt-12 border-t border-cream/10 pt-8">
            <p className="eyebrow text-cream/50 mb-4">§ — Skills</p>
            <div className="space-y-6">
              {Object.entries(SKILLS).map(([group, items]) => (
                <div key={group}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/55 mb-2">
                    {group}
                  </p>
                  <p className="text-cream/85 leading-relaxed">
                    {items.join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── CTA ───────────── */}
      <section className="mx-auto max-w-[1600px] px-6 md:px-10 py-32 md:py-40 border-t border-cream/10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
          <div className="md:col-span-7">
            <p className="eyebrow text-cream/50 mb-6">§ — Reach</p>
            <h2 className="display-mega text-[clamp(1.7rem,4.4vw,4.4rem)] tracking-tighter">
              <SplitWords text="Have a system" />
              <br />
              <SplitWords
                text="worth building?"
                delay={0.15}
                className="font-serif italic iris-text"
              />
            </h2>
          </div>

          <div className="md:col-span-5">
            <Reveal>
              <p className="eyebrow text-cream/50 mb-4">What to send</p>
              <ul className="divide-y divide-cream/10 border-y border-cream/10">
                {[
                  ["A prototype", "A repo, a screenshot, a rough sketch — anything tangible."],
                  ["A constraint", "What can't change. That's where the interesting work lives."],
                  ["A timeline", "Even rough. \"Some time this semester\" works."],
                ].map(([t, s]) => (
                  <li key={t} className="py-4 grid grid-cols-[1fr_2fr] gap-6 items-baseline">
                    <span className="font-serif italic text-2xl">{t}</span>
                    <span className="text-cream/70 leading-snug">{s}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap items-center gap-5">
                <Link
                  href="/contact"
                  data-cursor="link"
                  className="group inline-flex items-center gap-4 rounded-full border border-cream/20 bg-cream text-ink px-7 py-4 font-mono text-xs uppercase tracking-[0.22em] hover:bg-acid hover:text-ink transition-colors"
                >
                  Open a channel
                  <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
                <a
                  href="mailto:akvaithi.tech@gmail.com"
                  data-cursor="link"
                  className="font-mono text-xs uppercase tracking-[0.22em] text-cream/65 hover:text-cream"
                >
                  akvaithi.tech@gmail.com
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
