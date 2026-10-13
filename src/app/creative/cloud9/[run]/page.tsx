import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { RunGallery } from "@/components/RunGallery";
import { RUNS, coverUrl, highlightsFor, rawFramesFor, zipUrl } from "@/data/cloud9";

export const dynamicParams = false;

export function generateStaticParams() {
  return RUNS.map((r) => ({ run: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ run: string }>;
}): Promise<Metadata> {
  const { run: slug } = await params;
  const run = RUNS.find((r) => r.slug === slug);
  if (!run) return {};
  const title = `Cloud 9 × ${run.title} — ${run.dateLabel}`;
  return {
    title,
    description: `Cloud 9 run photos from ${run.dateLabel}, by Arun Vaithianathan. Free to download.`,
    alternates: { canonical: `/creative/cloud9/${run.slug}` },
    robots: { index: false, follow: true },
    openGraph: {
      title,
      url: `https://akvaithi.page/creative/cloud9/${run.slug}`,
      images: [coverUrl(run)],
      type: "website",
    },
  };
}

export default async function RunPage({ params }: { params: Promise<{ run: string }> }) {
  const { run: slug } = await params;
  const run = RUNS.find((r) => r.slug === slug);
  if (!run) notFound();
  const frames = rawFramesFor(run.slug);

  return (
    <>
      <section className="relative h-[78vh] min-h-[560px] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={coverUrl(run)}
          alt=""
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/20 to-ink" />

        <div className="absolute inset-x-0 top-24 z-10 mx-auto max-w-[1600px] px-6 md:px-10 font-mono text-[10px] uppercase tracking-[0.22em] text-cream/75">
          <Link href="/" data-cursor="link" className="hover:text-acid">
            Home
          </Link>
          <span className="mx-3 text-cream/35">/</span>
          <Link href="/creative" data-cursor="link" className="hover:text-acid">
            Creative
          </Link>
          <span className="mx-3 text-cream/35">/</span>
          <Link href="/creative/cloud9" data-cursor="link" className="hover:text-acid">
            Cloud 9
          </Link>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 mx-auto max-w-[1600px] px-6 pb-14 md:px-10 md:pb-20">
          <p className="eyebrow text-cream/70">{run.dateLabel}</p>
          <h1 className="mt-4 display-mega text-[clamp(2.4rem,8vw,7.5rem)] tracking-tighter">
            Cloud 9 <span className="font-serif italic iris-text">×</span> {run.title}
          </h1>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={zipUrl(run)}
              data-cursor="link"
              className="rounded-full bg-cream text-ink px-6 py-3 font-mono text-xs uppercase tracking-[0.22em] hover:bg-acid transition-colors"
            >
              Download all ↓
            </a>
            <Link
              href="/creative/cloud9"
              data-cursor="link"
              className="rounded-full border border-cream/30 px-6 py-3 font-mono text-xs uppercase tracking-[0.22em] hover:bg-cream hover:text-ink transition-colors"
            >
              ← All runs
            </Link>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/55 ml-2">
              {frames.length} frames · full resolution
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 md:px-10 pt-10 pb-10">
        <RunGallery
          slug={run.slug}
          raw={frames}
          highlights={highlightsFor(run.slug)}
          label={`Cloud 9 ${run.title}, ${run.dateLabel}`}
        />
      </section>

      <Footer />
    </>
  );
}
