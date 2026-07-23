import { ImageResponse } from "next/og";

// No `runtime = "edge"`: this image is static markup with no request-time
// data, so the default runtime prerenders it once at build instead of
// re-rasterizing on every hit (~4s cold). Social scrapers give up well before
// that, which is how you get link previews with no image.
export const alt =
  "Arun Vaithianathan — Chemical engineer, control-systems builder, photographer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "72px 80px",
          background:
            "linear-gradient(135deg, #0b0c14 0%, #14151f 50%, #1d1f2c 100%)",
          color: "#f2efe6",
          fontFamily: "sans-serif",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        {/* iris glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 700,
            height: 700,
            background:
              "radial-gradient(circle at 30% 30%, rgba(142,138,255,0.35) 0%, transparent 60%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: 600,
            height: 600,
            background:
              "radial-gradient(circle at 70% 70%, rgba(92,227,208,0.18) 0%, transparent 60%)",
          }}
        />

        {/* eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "rgba(242,239,230,0.7)",
            fontWeight: 500,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              background: "#8e8aff",
              borderRadius: 999,
            }}
          />
          Portfolio · akvaithi.page
        </div>

        {/* big name */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 140,
              fontWeight: 900,
              letterSpacing: -6,
              lineHeight: 0.95,
            }}
          >
            Arun
          </div>
          <div
            style={{
              fontSize: 140,
              fontWeight: 900,
              letterSpacing: -6,
              lineHeight: 0.95,
            }}
          >
            Vaithianathan
          </div>
        </div>

        {/* tagline */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 40,
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontStyle: "italic",
              lineHeight: 1.2,
              color: "rgba(242,239,230,0.85)",
              maxWidth: 720,
            }}
          >
            Chemical engineer · control-systems builder · photographer
          </div>
          <div
            style={{
              fontSize: 20,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(242,239,230,0.55)",
            }}
          >
            Texas A&M · College Station
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
