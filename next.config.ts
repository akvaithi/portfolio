import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // local AVIF/JPEG inside /public/images already optimized — minimize processing
    deviceSizes: [480, 768, 1080, 1440, 1920, 2560],
    imageSizes: [128, 256, 384, 512, 768],
    // we ship one self-authored SVG (graphite stand-in); allow it through
    // the image optimizer. CSP keeps it from being script-executable.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "lenis"],
  },
};

export default nextConfig;
