import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  displayMode?: "photo" | "screenshot";
  screenshotBg?: "cream" | "ink";
  // Tailwind className for the wrapping aspect box.
  className?: string;
  sizes?: string;
  priority?: boolean;
  // Adds a corner index label like "CASE 01".
  badge?: string;
};

/**
 * One uniform hero renderer for project case studies, carousels, and grids.
 * - photo: full-bleed cover crop, slight tonal overlay.
 * - screenshot: contained inside a faux browser window with cream or dark
 *   chrome so software UI doesn't get awkwardly cropped by object-cover.
 */
export function ProjectHero({
  src,
  alt,
  displayMode = "photo",
  screenshotBg = "ink",
  className,
  sizes = "100vw",
  priority,
  badge,
}: Props) {
  if (displayMode === "screenshot") {
    const isCream = screenshotBg === "cream";
    return (
      <div
        className={`relative overflow-hidden rounded-sm group ${
          isCream ? "bg-cream-mute" : "bg-ink-soft"
        } ${className ?? ""}`}
      >
        {/* faux browser chrome */}
        <div
          className={`absolute inset-x-0 top-0 z-10 flex items-center gap-1.5 px-4 py-2.5 border-b ${
            isCream ? "bg-cream border-ink/10" : "bg-ink-mute border-cream/10"
          }`}
        >
          <span className="size-2.5 rounded-full bg-rust/70" />
          <span className="size-2.5 rounded-full bg-acid/70" />
          <span className="size-2.5 rounded-full bg-acid-cool/70" />
          <span
            className={`ml-3 font-mono text-[10px] uppercase tracking-[0.22em] ${
              isCream ? "text-ink/55" : "text-cream/55"
            }`}
          >
            {alt}
          </span>
        </div>

        {/* contained screenshot */}
        <div className="absolute inset-x-4 top-10 bottom-4">
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-contain object-top"
          />
        </div>

        {badge && (
          <div className="absolute right-4 top-12 z-10 font-mono text-[10px] uppercase tracking-[0.22em] text-cream/0">
            {badge}
          </div>
        )}
      </div>
    );
  }

  // photo (default)
  return (
    <div className={`relative overflow-hidden rounded-sm group ${className ?? ""}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ink/30 via-transparent to-transparent" />
      {badge && (
        <div className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.22em] text-cream/85">
          {badge}
        </div>
      )}
    </div>
  );
}
