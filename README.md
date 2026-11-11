# akvaithi.page — personal portfolio

The portfolio site for [Arun Vaithianathan](https://linkedin.com/in/akvaithi) — chemical engineer, control-systems builder, and commercial photographer at Texas A&M.

Built across four pages — **Home · Professional · Creative · Contact** — with editorial-dark visual direction, smooth scroll, cinematic image rotations, and an iridescent accent palette.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind v4** for styling
- **Framer Motion** for entrance reveals, page transitions, and magnetic hover
- **Lenis** for the smooth-scroll layer
- A typed photo + hero catalog generated from `public/images/`

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build — all four pages prerender as static
```

## Asset pipeline

The Creative gallery and the Professional case-study heroes are sourced from `public/images/`. Whenever the folder contents change, regenerate the typed catalog:

```bash
node scripts/build-catalog.mjs
```

This writes `src/data/photos.ts` and `src/data/heroes.ts`, which the pages consume directly.

### HDR + SDR pairing

Source files in `public/images/` are HDR AVIFs. Multiple HDR images on the same screen saturates the EDR (Extended Dynamic Range) GPU pipeline on macOS, causing tab freezes. To get HDR where it shines without breaking the rest of the site, the runtime targets HDR **only on page heroes and the gallery lightbox** (one HDR image at a time, full-bleed).

For each AVIF you want to show in HDR, export a sibling SDR fallback into the same directory with a `.sdr.webp` (preferred) or `.sdr.jpg` extension:

```
public/images/2025/Landscapes/
  Landscapes - 01 of 48.avif       ← HDR source (gain-map-free preferred)
  Landscapes - 01 of 48.sdr.webp   ← SDR fallback
```

After dropping in new variants, re-run `node scripts/build-catalog.mjs`. The catalog will pair them automatically and emit them in `photos.ts` / `heroes.ts`. The runtime `<HDRImage>` then renders a `<picture>` with a `(dynamic-range: high)` media query — HDR displays get the AVIF, everything else gets the optimized SDR path.

**If an AVIF has no SDR sibling**, the image still renders — just via Next.js's image optimizer, which transcodes to SDR WebP on the fly. Safe by default.

**Multi-image surfaces** (the home mosaic, the creative gallery thumbnails, professional carousels) are intentionally SDR-only regardless of sibling presence, to keep the EDR composer from saturating.

## Deployment

Self-hosted on **akvcloud**. One Caddy container (`portfolio-web`, `127.0.0.1:8100`) fronts the Next.js
standalone server (`portfolio-app`). The same Caddy serves the Cloud 9 photos straight from disk under
`/cloud9/`, plus the cookieless analytics script from the akvcloud beacon. Cloudflare Tunnel routes
`akvaithi.page`, `www.` and `photos.` to it. `photos.` permanently redirects to `/cloud9/…`, so old links
keep working.

```bash
ssh akvcloud /srv/fast/apps/portfolio/repo/deploy/akvcloud/update.sh   # pull, build, ship
```

`deploy/akvcloud/` holds the Caddyfile, the compose file and `update.sh`. Each build becomes
`releases/<sha>/`, and `releases/current` points at the live one. The script keeps the last three
releases, so rolling back is a symlink change plus `docker restart portfolio-app`.

## License

All code is MIT-licensed. Photography and hero imagery in `public/images/` is © Arun Vaithianathan — all rights reserved.
