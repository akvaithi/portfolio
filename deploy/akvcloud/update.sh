#!/bin/bash
# Build and ship akvaithi.page on akvcloud. Run as akvaithi (docker group), plain ssh is fine:
#   /srv/fast/apps/portfolio/repo/deploy/akvcloud/update.sh
set -euo pipefail
ROOT=/srv/fast/apps/portfolio
export PATH=/opt/node/bin:$PATH NEXT_TELEMETRY_DISABLED=1
cd "$ROOT/repo"
before=$(git rev-parse HEAD)
git pull --ff-only
changed=$(git diff --name-only "$before" HEAD)
npm ci --no-audit --no-fund
npm run build

sha=$(git rev-parse --short HEAD)
rel="$ROOT/releases/$sha"
rm -rf "$rel.tmp"
cp -a .next/standalone "$rel.tmp"
mkdir -p "$rel.tmp/.next"
cp -a .next/static "$rel.tmp/.next/static"
cp -al public "$rel.tmp/public"   # hard links: the 400 MB of images cost nothing per release
rm -rf "$rel"
mv "$rel.tmp" "$rel"
ln -sfn "$sha" "$ROOT/releases/current"

docker compose -f "$ROOT/repo/deploy/akvcloud/docker-compose.yml" up -d
docker restart portfolio-app >/dev/null
# Caddy reads its config only at start (admin API is off): restart it when the Caddyfile changed
if grep -q '^deploy/akvcloud/Caddyfile$' <<<"$changed"; then
	docker restart portfolio-web >/dev/null
fi

# keep the three newest releases
ls -1dt "$ROOT"/releases/*/ | grep -v '/current/$' | tail -n +4 | xargs -r rm -rf
for i in $(seq 1 30); do curl -fsS -o /dev/null http://127.0.0.1:8100/ && break; sleep 1; done
curl -fsS -o /dev/null -w "akvaithi.page origin: %{http_code}\n" http://127.0.0.1:8100/
echo "live: $sha"
