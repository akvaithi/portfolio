import Link from "next/link";
import { Reveal, MaskedLines, SplitWords } from "@/components/Reveal";
import { Marquee } from "@/components/Marquee";
import { ProjectHero } from "@/components/ProjectHero";
import { HDRImage } from "@/components/HDRImage";
import { Footer } from "@/components/Footer";
import { PROJECTS } from "@/data/projects";
import { PHOTOS } from "@/data/photos";
import { thumbSrc, thumbSrcSet } from "@/lib/thumbs";

// Dedicated home hero — lives at /public/images/HERO Home.avif (not in a
// year folder so the catalog doesn't pick it up). We use the AVIF directly
// for the gain-map HDR pop on capable displays.
const HOME_HERO_SRC = "/images/HERO Home.avif";

// Four recent landscapes for the photography strip. Pre-built SDR
// thumbnails, so the strip stays out of the HDR pipeline (several HDR images
// on screen at once saturate the EDR compositor) and costs ~40 KB a tile.
const STRIP = PHOTOS.filter((p) => p.category === "Landscapes" && p.year >= "2024" && p.thumb)
  .filter((_, i) => i % 3 === 0)
  .slice(0, 4);

const MARQUEE = [
  "Chemical Engineering",
  "Battery Materials",
  "Scale-Up",
  "Control Systems",
  "Software Tools",
  "Photography",
];

const year = (period: string) => period.match(/\d{4}/)?.[0] ?? "";

export default function Home() {
  const [lead, ...rest] = PROJECTS;
  const cards = rest.slice(0, 3);
  const leadHero = lead.heroes[0];

  return (
    <>
      {/* ───────────── HERO ───────────── */}
      <section className="relative h-svh min-h-[640px] max-h-[1100px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <HDRImage
            src={HOME_HERO_SRC}
            sdrSrc={null}
            alt="Portrait of Arun Vaithianathan, shown in HDR on supported displays"
            fill
            preload
            fetchPriority="high"
            sizes="100vw"
            // Shift the image left on mobile so the right portion stays
            // visible (where the subject sits in this composition); recenter
            // on tablet+ where the full frame fits.
            className="object-cover object-[75%_center] md:object-center drift"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/20 via-ink/30 to-ink" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/55 via-transparent to-transparent" />
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 mx-auto max-w-[1440px] px-4 pb-14 sm:px-6 md:px-10 md:pb-20">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div className="min-w-0 flex-[1_1_560px]">
              <h1 className="display-mega text-[clamp(3.2rem,9vw,8.5rem)]">
                <MaskedLines lines={["Arun", "Vaithianathan"]} eager />
              </h1>
              <Reveal delay={0.5} eager>
                <p className="mt-7 max-w-[38rem] text-cream/85 text-base md:text-lg leading-relaxed">
                  Chemical engineering junior at Texas A&amp;M, 3.92 GPA. I research catalytic
                  graphitization of petroleum coke in the Green Lab, lead guidance and control on
                  the MATE ROV team, co-founded STEM Research Finder, and run a photography
                  business.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.7} y={0} eager className="hidden md:block text-right">
              <p className="font-serif italic text-[1.7rem] leading-tight text-cream/90">
                Battery graphite,
                <br />
                ROV control,
                <br />
                <span className="iris-text">photography.</span>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────── MARQUEE ───────────── */}
      <div className="border-y border-cream/10 py-4">
        <Marquee speed={48}>
          {MARQUEE.map((t) => (
            <span key={t} className="flex items-center gap-12">
              <span className="font-mono text-[13px] uppercase tracking-[0.2em] text-cream/65">
                {t}
              </span>
              <span aria-hidden className="text-acid">/</span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* ───────────── SELECTED WORK ───────────── */}
      <section className="mx-auto max-w-[1440px] px-4 pt-28 pb-12 sm:px-6 md:px-10 md:pt-36">
        <div className="mb-12 flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="display-xl text-[clamp(2.2rem,4.6vw,3.8rem)]">
            <SplitWords text="Selected work" />
          </h2>
          <Link
            href="/professional"
            data-cursor="link"
            className="font-mono text-xs uppercase tracking-[0.16em] text-cream/75 hover:text-acid"
          >
            All work →
          </Link>
        </div>

        {/* lead project */}
        <Reveal>
          <Link
            href={`/professional#${lead.slug}`}
            data-cursor="media"
            data-cursor-label="Read"
            className="group grid grid-cols-1 items-center gap-10 border-t border-cream/12 py-10 md:grid-cols-12 md:gap-12"
          >
            <div className="md:col-span-7">
              {leadHero && (
                <ProjectHero
                  src={leadHero.src}
                  alt={lead.title}
                  displayMode={lead.displayMode}
                  screenshotBg={lead.screenshotBg}
                  className="aspect-[16/10]"
                  sizes="(max-width: 768px) 100vw, 58vw"
                />
              )}
            </div>
            <div className="md:col-span-5">
              <p className="eyebrow text-acid">
                Research · {lead.period}
              </p>
              <h3 className="mt-4 display-xl text-[clamp(1.8rem,3vw,2.5rem)] group-hover:text-acid transition-colors">
                {lead.title}
              </h3>
              <p className="mt-5 text-cream/80 leading-relaxed">{lead.tagline}</p>
              {lead.metrics && (
                <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-cream/12 pt-5">
                  {lead.metrics.slice(0, 3).map((m) => (
                    <div key={m.label}>
                      <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-cream/60">
                        {m.label}
                      </dt>
                      <dd className="mt-1.5 font-serif italic text-2xl">{m.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </Link>
        </Reveal>

        {/* three more */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-12 border-t border-cream/12 pt-10 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((p, i) => {
            const hero = p.heroes[0];
            return (
              <Reveal key={p.slug} delay={i * 0.08}>
                <Link
                  href={`/professional#${p.slug}`}
                  data-cursor="media"
                  data-cursor-label="Read"
                  className="group block"
                >
                  {hero && (
                    <ProjectHero
                      src={hero.src}
                      alt={p.title}
                      displayMode={p.displayMode}
                      screenshotBg={p.screenshotBg}
                      className="aspect-[4/3]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  )}
                  <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-cream/60">
                    {p.role.split(",")[0]} · {year(p.period)}
                  </p>
                  <h3 className="mt-2 text-2xl font-bold tracking-tight group-hover:text-acid transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-cream/75">{p.summary}</p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ───────────── ABOUT ───────────── */}
      <section className="mx-auto max-w-[1440px] px-4 py-24 sm:px-6 md:px-10 md:py-32">
        <div className="grid grid-cols-1 gap-10 border-t border-cream/12 pt-14 md:grid-cols-12">
          <h2 className="md:col-span-7 font-serif italic text-[clamp(2rem,4.2vw,3.6rem)] leading-[1.04] tracking-tight">
            <SplitWords text="I work on battery materials" />{" "}
            <SplitWords text="and build the tools around them." delay={0.2} className="iris-text" />
          </h2>
          <Reveal delay={0.2} className="md:col-span-5 space-y-5 text-cream/80 leading-relaxed md:pt-3">
            <p>
              I&apos;m a chemical engineering student at Texas A&amp;M. Most of my time goes to
              three things: graphitization research in the Green Lab, control software for the
              ROV team, and photography.
            </p>
            <p>
              I started in computer science and switched to chemical engineering, but kept the
              habit: when the lab needed a faster way to read XRD scans or program a furnace, I
              wrote the tool. The aim is battery and energy-transition materials, from the bench
              toward scale-up.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ───────────── PHOTOGRAPHY ───────────── */}
      <section className="mx-auto max-w-[1440px] px-4 pb-28 sm:px-6 md:px-10 md:pb-36">
        <div className="mb-10 flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="font-serif italic text-[clamp(2.2rem,4.6vw,3.8rem)] tracking-tight">
            <SplitWords text="Photography" />
          </h2>
          <Link
            href="/creative"
            data-cursor="link"
            className="font-mono text-xs uppercase tracking-[0.16em] text-cream/75 hover:text-acid"
          >
            Full gallery · HDR →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {STRIP.map((p, i) => (
            <Link
              key={p.src}
              href="/creative"
              data-cursor="media"
              data-cursor-label="View"
              className="group relative block aspect-[4/5] overflow-hidden rounded-sm"
              style={{ backgroundColor: p.tone ?? undefined }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={thumbSrc(p.thumb!)}
                srcSet={thumbSrcSet(p.thumb!)}
                sizes="(max-width: 768px) 50vw, 25vw"
                alt={`Landscape ${i + 1}, ${p.year}`}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
              />
            </Link>
          ))}
        </div>
      </section>

      {/* ───────────── CONTACT ───────────── */}
      <section className="mx-auto max-w-[1440px] px-4 pb-28 sm:px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-10 border-t border-cream/12 pt-16">
          <h2 className="display-mega text-[clamp(2.6rem,6vw,5.4rem)]">
            <SplitWords text="Hiring for" />
            <br />
            <SplitWords text="Summer 2027?" delay={0.1} className="font-serif italic iris-text" />
          </h2>
          <div className="flex flex-wrap items-center gap-5">
            <a
              href="mailto:akvaithi.tech@gmail.com"
              data-cursor="link"
              className="group inline-flex min-h-13 items-center gap-4 rounded-full bg-cream px-8 font-mono text-sm uppercase tracking-[0.14em] text-ink hover:bg-acid transition-colors"
            >
              Email me
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              data-cursor="link"
              className="font-mono text-sm uppercase tracking-[0.14em] text-cream/75 hover:text-cream"
            >
              Résumé .pdf ↗
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
