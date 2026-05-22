import Image from "next/image";
import Link from "next/link";
import { Reveal, MaskedLines, SplitWords } from "@/components/Reveal";
import { ParallaxImage } from "@/components/ParallaxImage";
import { Marquee } from "@/components/Marquee";
import { Clock } from "@/components/Clock";
import { CyclingTile } from "@/components/CyclingTile";
import { ProjectHero } from "@/components/ProjectHero";
import { HDRImage } from "@/components/HDRImage";
import { Footer } from "@/components/Footer";
import { PROJECTS } from "@/data/projects";
import { PHOTOS } from "@/data/photos";

function pick(arr: typeof PHOTOS, predicate: (p: (typeof PHOTOS)[number]) => boolean) {
  return arr.find(predicate);
}

const HERO =
  pick(PHOTOS, (p) => p.year === "2025" && p.category === "Landscapes") ??
  PHOTOS[0];

// Pool of landscape frames for the cycling "Through the Lens" mosaic. Kept
// intentionally small — each tile cycles through this subset, and every
// new entry burns one round-trip + image decode, so we'd rather show 18
// strong frames in rotation than dilute it across 90 average ones.
const LANDSCAPE_POOL = PHOTOS.filter(
  (p) => p.category === "Landscapes" && p.year >= "2024"
)
  .slice(0, 18)
  .map((p) => p.src);

// Use a moodier landscape (not a portrait or random gallery image) so the
// "Operator" section reads as a cinematic vignette, not a stray person photo.
const OPERATOR_LANDSCAPE =
  PHOTOS.find(
    (p) =>
      p.category === "Landscapes" &&
      p.year === "2024" &&
      p.src.includes("Landscapes - 12")
  )?.src ??
  PHOTOS.find((p) => p.category === "Landscapes" && p.year === "2024")?.src ??
  PHOTOS.find((p) => p.category === "Landscapes")?.src;

export default function Home() {
  const featured = PROJECTS.slice(0, 3);

  return (
    <>
      {/* ───────────── HERO ───────────── */}
      <section className="relative h-screen min-h-[760px] w-full overflow-hidden">
        <div className="absolute inset-0">
          {HERO && (
            <HDRImage
              src={HERO.src}
              sdrSrc={HERO.sdrSrc}
              alt="Atmosphere — a landscape from the personal archive"
              fill
              priority
              sizes="100vw"
              className="object-cover drift"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/20 to-ink" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent" />
        </div>

        {/* HUD overlays */}
        <div className="absolute inset-x-0 top-24 z-10 mx-auto flex max-w-[1600px] items-center justify-between px-6 font-mono text-[10px] uppercase tracking-[0.22em] text-cream/70 md:px-10">
          <span>30.628° N · 96.334° W</span>
          <span className="hidden md:inline">
            COLLEGE STATION — LOCAL TIME <Clock />
          </span>
          <span>v1 — May 2026</span>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 mx-auto max-w-[1600px] px-6 pb-16 md:px-10 md:pb-24">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-9">
              <Reveal delay={0.4} y={0}>
                <p className="eyebrow text-acid mb-6">
                  ✦ Portfolio · Arun Keshav Vaithianathan · Multi-Scale Builder
                </p>
              </Reveal>
              <h1 className="display-mega text-[clamp(2.6rem,8.5vw,9rem)] tracking-tighter">
                <MaskedLines lines={["Arun", "Vaithianathan"]} eager />
              </h1>
              <Reveal delay={0.9}>
                <p className="mt-8 max-w-2xl text-cream/80 text-base md:text-lg leading-relaxed">
                  Chemical engineer at Texas A&amp;M. I build at three scales —
                  <span className="text-cream"> molecular</span>,
                  <span className="text-cream"> digital</span>, and
                  <span className="text-cream"> creative</span> — synthesizing graphite from refinery
                  byproduct, stabilizing underwater robots, shipping web tools used by 3,000+ peers,
                  and shooting commercial photography on the side.
                </p>
              </Reveal>
            </div>
            <div className="hidden md:flex col-span-3 flex-col items-end justify-end gap-3 text-right">
              <Reveal delay={1.1} y={0}>
                <p className="eyebrow text-cream/50">Now</p>
                <p className="font-serif italic text-2xl leading-snug">
                  Catalytic graphite,
                  <br />
                  underwater PID,
                  <br />
                  field photography.
                </p>
              </Reveal>
            </div>
          </div>
        </div>

        {/* scroll cue */}
        <Reveal delay={1.2} y={0}>
          <div className="absolute left-1/2 bottom-4 z-10 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.22em] text-cream/60">
            scroll ↓
          </div>
        </Reveal>
      </section>

      {/* ───────────── MARQUEE STRIP ───────────── */}
      <div className="border-y border-cream/10 bg-ink py-6">
        <Marquee speed={50}>
          {[
            "Chemical Engineering",
            "|",
            "Control Systems",
            "|",
            "Material Synthesis",
            "|",
            "Photography",
            "|",
            "Climate Tech",
            "|",
            "0 → 1 Software",
            "|",
            "Photogrammetry",
            "|",
            "Self-Hosted Infra",
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

      {/* ───────────── THESIS ───────────── */}
      <section className="relative mx-auto max-w-[1600px] px-6 py-32 md:px-10 md:py-48">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow text-cream/50 sticky top-28">§ 01 — Thesis</p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2 className="font-serif text-[clamp(2rem,5vw,4.4rem)] italic leading-[1.02] tracking-tight measure">
              <SplitWords text="Most people choose a domain." />
              <br />
              <SplitWords
                text="I chose the seams between them."
                delay={0.2}
                className="iris-text"
              />
            </h2>
            <Reveal delay={0.3} className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
              <p className="text-cream/75 leading-relaxed text-lg">
                My brain lives at the intersection of <em>molecular design</em>, <em>closed-loop
                software</em>, and <em>high-production media</em>. I treat every project — a graphite
                synthesis, a PID loop, a frame on a card — as a system to be optimized end-to-end.
              </p>
              <p className="text-cream/75 leading-relaxed text-lg">
                I don&apos;t wait for permission. I build the CLI, deploy the web app, wire the
                breadboard, or roll cameras to validate the concept. The highest leverage comes
                from being able to sit with process engineers, software developers, and VCs and
                speak all three languages fluently.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────── THE THREE SCALES ───────────── */}
      <section className="bg-ink-soft py-32 md:py-48 border-y border-cream/5">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <div className="mb-16 flex items-end justify-between">
            <p className="eyebrow text-cream/50">§ 02 — Three Scales of Engineering</p>
            <p className="hidden md:block font-mono text-xs uppercase tracking-[0.22em] text-cream/50">
              I.  Molecular &nbsp;·&nbsp; II.  Digital &nbsp;·&nbsp; III.  Creative
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
            {[
              {
                num: "I",
                title: "Molecular & Physical",
                body: "Synthesizing battery-grade graphite from waste petroleum coke. Assessing carbon-capture and hydrogen tech. Designing SIL-rated industrial safety interlocks.",
                stack: ["Tube furnace 1600 °C", "XRD", "SIL · 2oo2", "SAE J1939"],
              },
              {
                num: "II",
                title: "Digital & System",
                body: "Closed-loop PID for an underwater ROV. Real-time photogrammetry into RealityKit. Web tools indexing 1,770+ faculty profiles for 3,000+ users.",
                stack: ["Python · ArduSub", "Pi 5 + Navigator", "Next.js · Vercel", "RTSP · OpenCV"],
              },
              {
                num: "III",
                title: "Distribution & Creative",
                body: "Commercial photography, brand storytelling, and a self-hosted education channel with 2.2k subscribers and 1M+ views. 80+ client engagements.",
                stack: ["Commercial photography", "Color · Editorial", "YouTube · 1M+ views", "Brand systems"],
              },
            ].map((scale, i) => (
              <Reveal
                key={scale.num}
                delay={i * 0.1}
                className="relative flex flex-col gap-6 border-t border-cream/15 pt-8"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-serif italic text-acid text-4xl">{scale.num}</span>
                  <span className="eyebrow text-cream/40">
                    {String(i + 1).padStart(2, "0")} / 03
                  </span>
                </div>
                <h3 className="display-xl text-3xl md:text-4xl tracking-tight">
                  {scale.title}
                </h3>
                <p className="text-cream/75 leading-relaxed">{scale.body}</p>
                <ul className="mt-auto flex flex-wrap gap-x-3 gap-y-2 font-mono text-[10px] uppercase tracking-[0.18em] text-cream/55">
                  {scale.stack.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-cream/10 px-2.5 py-1"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── BIG FEATURED IMAGE EDITORIAL ───────────── */}
      <section className="relative">
        <div className="grid grid-cols-12 gap-0 min-h-[80vh]">
          <div className="col-span-12 md:col-span-7 relative">
            {OPERATOR_LANDSCAPE && (
              <ParallaxImage
                src={OPERATOR_LANDSCAPE}
                alt="Atmosphere — landscape from the personal archive"
                className="h-[60vh] md:h-full w-full"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
            )}
          </div>
          <div className="col-span-12 md:col-span-5 bg-cream text-ink flex items-center">
            <div className="px-8 py-20 md:px-14">
              <p className="eyebrow text-ink/60 mb-8">§ 03 — Operator</p>
              <h3 className="font-serif italic text-[clamp(2.4rem,4.5vw,4rem)] leading-[1] tracking-tight">
                <SplitWords text="Move fast." />
                <br />
                <SplitWords text="Build the prototype." delay={0.15} />
                <br />
                <SplitWords text="Bridge the room." delay={0.3} className="text-rust" />
              </h3>
              <p className="mt-10 text-ink/75 leading-relaxed text-lg measure">
                The fastest way to learn is to put something into the wild — a CLI, a deployment,
                a breadboard, a video. Outside of building you&apos;ll find me on the road,
                hacking self-hosted infrastructure, or out shooting with a camera.
              </p>
              <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 font-mono text-xs uppercase tracking-[0.18em] text-ink/70">
                <span>YouTube · 2.2k subs</span>
                <span>1M+ views</span>
                <span>80+ client shoots</span>
                <span>FRC World Champ · 3 yrs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── FEATURED PROJECTS ───────────── */}
      <section className="mx-auto max-w-[1600px] px-6 py-32 md:px-10 md:py-48">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <p className="eyebrow text-cream/50">§ 04 — Selected Work</p>
            <h2 className="mt-4 display-xl text-[clamp(2.2rem,5vw,4rem)] tracking-tighter">
              <SplitWords text="Selected case studies." />
            </h2>
          </div>
          <Link
            href="/professional"
            data-cursor="link"
            className="hidden md:inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] hover:text-acid"
          >
            See all work
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-16 md:gap-24">
          {featured.map((p, i) => {
            const hero = p.heroes[0];
            return (
              <Reveal key={p.slug} delay={i * 0.05} className="">
                <Link
                  href="/professional"
                  data-cursor="media"
                  data-cursor-label="View"
                  className="group grid grid-cols-12 gap-6 items-start"
                >
                  <div className="col-span-12 md:col-span-7">
                    {hero && (
                      <ProjectHero
                        src={hero.src}
                        alt={p.title}
                        displayMode={p.displayMode}
                        screenshotBg={p.screenshotBg}
                        className="aspect-[16/10]"
                        sizes="(max-width: 768px) 100vw, 60vw"
                        badge={`0${i + 1}`}
                      />
                    )}
                  </div>
                  <div className="col-span-12 md:col-span-5">
                    <p className="eyebrow text-acid">
                      {p.scale === "molecular"
                        ? "I — Molecular"
                        : p.scale === "digital"
                          ? "II — Digital"
                          : "III — Creative"}
                    </p>
                    <h3 className="mt-4 display-xl text-3xl md:text-4xl tracking-tight leading-[1.05]">
                      {p.title}
                    </h3>
                    <p className="mt-3 font-mono text-xs uppercase tracking-[0.18em] text-cream/55">
                      {p.org} · {p.period}
                    </p>
                    <p className="mt-6 text-cream/75 leading-relaxed">{p.tagline}</p>
                    {p.metrics && (
                      <div className="mt-8 grid grid-cols-3 gap-4 border-t border-cream/10 pt-6">
                        {p.metrics.slice(0, 3).map((m) => (
                          <div key={m.label}>
                            <p className="font-serif italic text-2xl text-cream">
                              {m.value}
                            </p>
                            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream/50 mt-1">
                              {m.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ───────────── PHOTOGRAPHY MOSAIC LEAD-IN ───────────── */}
      <section className="bg-ink-soft py-24 md:py-32 border-y border-cream/5">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="eyebrow text-cream/50">§ 05 — Through the Lens</p>
              <h2 className="mt-4 display-xl text-[clamp(2.2rem,5vw,4rem)] tracking-tighter">
                <SplitWords text="A second discipline." />
              </h2>
            </div>
            <Link
              href="/creative"
              data-cursor="link"
              className="hidden md:inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] hover:text-acid"
            >
              Enter the archive
              <span aria-hidden>→</span>
            </Link>
          </div>

          {/* Six landscape tiles. Static next/image inside a CSS grid — no
              cycling, no IntersectionObserver, no Framer Motion wrapping.
              Earlier versions with simultaneous mount + crossfade were the
              proximate cause of a JS-thread freeze on first scroll. */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4">
            {[
              { src: LANDSCAPE_POOL[0],  span: "col-span-2 md:col-span-3 aspect-[16/10]", sizes: "(max-width: 768px) 100vw, 50vw" },
              { src: LANDSCAPE_POOL[3],  span: "col-span-1 md:col-span-1 aspect-[3/4]",   sizes: "(max-width: 768px) 50vw, 17vw" },
              { src: LANDSCAPE_POOL[6],  span: "col-span-1 md:col-span-1 aspect-[3/4]",   sizes: "(max-width: 768px) 50vw, 17vw" },
              { src: LANDSCAPE_POOL[9],  span: "col-span-2 md:col-span-3 aspect-[16/10]", sizes: "(max-width: 768px) 100vw, 50vw" },
              { src: LANDSCAPE_POOL[12], span: "col-span-1 md:col-span-1 aspect-[3/4]",   sizes: "(max-width: 768px) 50vw, 17vw" },
              { src: LANDSCAPE_POOL[15], span: "col-span-1 md:col-span-1 aspect-[3/4]",   sizes: "(max-width: 768px) 50vw, 17vw" },
            ].map((tile, i) => (
              <div key={i} className={`${tile.span} relative overflow-hidden rounded-sm bg-ink-soft`}>
                {tile.src && (
                  <Image
                    src={tile.src}
                    alt={`Landscape ${i + 1}`}
                    fill
                    loading="lazy"
                    decoding="async"
                    sizes={tile.sizes}
                    className="object-cover transition-transform duration-[1.4s] ease-out hover:scale-[1.04]"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 md:hidden">
            <Link
              href="/creative"
              data-cursor="link"
              className="font-mono text-xs uppercase tracking-[0.22em] text-acid"
            >
              Enter the archive →
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────── CTA ───────────── */}
      <section className="mx-auto max-w-[1600px] px-6 py-40 md:px-10 md:py-56 relative">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-2">
            <p className="eyebrow text-cream/50 sticky top-28">§ 06 — Reach</p>
          </div>
          <div className="col-span-12 md:col-span-10">
            <h2 className="display-mega text-[clamp(2.2rem,6.5vw,7rem)] tracking-tighter">
              <SplitWords text="If you're" />
              <br />
              <SplitWords
                text="building something"
                delay={0.1}
                className="font-serif italic iris-text"
              />
              <br />
              <SplitWords text="that shouldn't exist yet —" delay={0.2} />
            </h2>
            <div className="mt-12 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                data-cursor="link"
                className="group inline-flex items-center gap-4 rounded-full border border-cream/20 bg-cream text-ink px-7 py-4 font-mono text-xs uppercase tracking-[0.22em] hover:bg-acid transition-colors"
              >
                Open a channel
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
              <a
                href="mailto:akvaithi.tech@gmail.com"
                data-cursor="link"
                className="font-mono text-xs uppercase tracking-[0.22em] text-cream/70 hover:text-cream"
              >
                akvaithi.tech@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
