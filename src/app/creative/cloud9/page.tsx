import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { FRAMES } from "@/data/cloud9.frames";
import { RUNS, TOTAL_FRAMES, coverUrl } from "@/data/cloud9";

// Unlisted, like a client gallery: shared by link, kept out of search and the
// sitemap. `follow` stays on so the nav links back into the site still count.
export const metadata: Metadata = {
  title: "Cloud 9",
  description: "Cloud 9 run photos by Arun Vaithianathan. Free to view and download.",
  alternates: { canonical: "/creative/cloud9" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Cloud 9 · Arun Vaithianathan",
    description: "Run photos, free to view and download.",
    url: "https://akvaithi.page/creative/cloud9",
    type: "website",
  },
};

export default function Cloud9() {
  return (
    <>
      <section className="mx-auto max-w-[1600px] px-6 md:px-10 pt-36 md:pt-44 pb-14">
        <nav className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/50">
          <Link href="/" data-cursor="link" className="hover:text-acid">
            Home
          </Link>
          <span className="mx-3 text-cream/25">/</span>
          <Link href="/creative" data-cursor="link" className="hover:text-acid">
            Creative
          </Link>
          <span className="mx-3 text-cream/25">/</span>
          <span className="text-cream">Cloud 9</span>
        </nav>

        <div className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8 border-b border-cream/10 pb-10">
          <div>
            <p className="eyebrow text-cream/50">§ — Client Gallery</p>
            <h1 className="mt-4 display-mega text-[clamp(3rem,10vw,9rem)] tracking-tighter">
              Cloud <span className="font-serif italic iris-text">9</span>
            </h1>
          </div>
          <div className="md:text-right font-mono text-[10px] uppercase tracking-[0.22em] text-cream/55 space-y-2">
            <p>
              {RUNS.length} runs · {TOTAL_FRAMES.toLocaleString()} frames
            </p>
            <p>Free to download — tag @akvaithi.hdr if you post</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-14">
        {RUNS.map((run) => (
          <Link
            key={run.slug}
            href={`/creative/cloud9/${run.slug}`}
            data-cursor="media"
            data-cursor-label="Open"
            className="group block"
          >
            <div className="relative aspect-[3/2] overflow-hidden rounded-sm bg-ink-soft">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={coverUrl(run)}
                alt={`Cloud 9 ${run.title}, ${run.dateLabel}`}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
              />
            </div>
            <div className="mt-5 flex items-baseline justify-between gap-4">
              <h2 className="display-xl text-2xl md:text-3xl tracking-tight group-hover:text-acid transition-colors">
                Cloud 9 × {run.title}
              </h2>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/45 shrink-0">
                {FRAMES[run.slug]?.length ?? 0} frames
              </span>
            </div>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-cream/55">
              {run.dateLabel}
            </p>
          </Link>
        ))}
      </section>

      <section className="mx-auto max-w-[1600px] px-6 md:px-10 pt-24">
        <div className="border-t border-cream/10 pt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <p className="font-serif italic text-2xl leading-snug measure">
            Shot by Arun Vaithianathan. The rest of the work lives on the portfolio.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/creative"
              data-cursor="link"
              className="rounded-full border border-cream/20 px-6 py-3 font-mono text-xs uppercase tracking-[0.22em] hover:bg-cream hover:text-ink transition-colors"
            >
              See the archive
            </Link>
            <Link
              href="/contact"
              data-cursor="link"
              className="rounded-full bg-cream text-ink px-6 py-3 font-mono text-xs uppercase tracking-[0.22em] hover:bg-acid transition-colors"
            >
              Book a shoot →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
