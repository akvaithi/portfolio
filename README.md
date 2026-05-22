# akvaithi.tech — personal portfolio

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

The Creative gallery (~428 frames) and the Professional case-study heroes are sourced from `public/images/`. Whenever the folder contents change, regenerate the typed catalog:

```bash
node scripts/build-catalog.mjs
```

This writes `src/data/photos.ts` and `src/data/heroes.ts`, which the pages consume directly.

## Deployment

Production deployment runs on Vercel.

## License

All code is MIT-licensed. Photography and hero imagery in `public/images/` is © Arun Vaithianathan — all rights reserved.
