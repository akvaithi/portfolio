# cloud9-photos (ZimaOS box)

Serves the Cloud 9 gallery photos at `photos.akvaithi.page`. The pages are on
Vercel; only the image files live on the box (~12 GB, too big for a Hobby deploy).

- Compose + nginx config: `/DATA/.casaos/apps/cloud9-photos/` (copies of this folder)
- Files: `/DATA/AppData/cloud9-photos/<run>/` originals, `<run>/web/` derived
  `.webp` + `.thumb.webp`, `zips/Cloud9-<run>.zip`
- Public route: Cloudflare tunnel public hostname `photos` → `http://172.17.0.1:8093`

Adding a run: derive 2400px `.webp` and 800px `.thumb.webp` per frame, rsync
originals and derivatives to the box, build the zip with `zip -0`, then
`node scripts/build-cloud9.mjs <derived-dir>` and add the run to `src/data/cloud9.ts`.
