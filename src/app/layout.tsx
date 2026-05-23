import type { Metadata } from "next";
import { Inter_Tight, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/Nav";
import { Cursor } from "@/components/Cursor";
import { PageTransition } from "@/components/PageTransition";
import { HDRDebug } from "@/components/HDRDebug";

const sans = Inter_Tight({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const serif = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://akvaithi.tech"),
  title: {
    default: "Arun Vaithianathan — Multi-Scale Builder",
    template: "%s · Arun Vaithianathan",
  },
  description:
    "Chemical engineer at Texas A&M, control-systems builder, and photographer. Working across molecular synthesis, closed-loop software, and commissioned photography.",
  keywords: [
    "Arun Vaithianathan",
    "akvaithi",
    "Texas A&M",
    "chemical engineering",
    "control systems",
    "MATE ROV",
    "Aggie Research Finder",
    "petroleum coke graphite",
    "Greentown Labs",
    "Aggies in Tech",
    "photography",
    "portfolio",
  ],
  authors: [{ name: "Arun Vaithianathan", url: "https://akvaithi.tech" }],
  creator: "Arun Vaithianathan",
  publisher: "Arun Vaithianathan",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Arun Vaithianathan — Multi-Scale Builder",
    description:
      "Chemical engineer at Texas A&M. Synthesizing graphite, stabilizing underwater robots, shipping web tools, and shooting commercial photography.",
    type: "website",
    url: "https://akvaithi.tech",
    siteName: "akvaithi.tech",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arun Vaithianathan — Multi-Scale Builder",
    description:
      "Chemical engineer at Texas A&M. Multi-scale builder — molecular synthesis, closed-loop software, and commissioned photography.",
    creator: "@akvaithi",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Arun Vaithianathan",
  alternateName: ["Arun Keshav Vaithianathan", "akvaithi"],
  url: "https://akvaithi.tech",
  image: "https://akvaithi.tech/opengraph-image",
  email: "mailto:akvaithi.tech@gmail.com",
  jobTitle: "Chemical Engineering Student · Control Systems Lead · Photographer",
  affiliation: [
    {
      "@type": "CollegeOrUniversity",
      name: "Texas A&M University",
      url: "https://www.tamu.edu",
    },
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Texas A&M University",
  },
  knowsAbout: [
    "Chemical Engineering",
    "Control Systems",
    "PID tuning",
    "Materials Synthesis",
    "Computer Vision",
    "Photography",
    "Cinematography",
  ],
  sameAs: [
    "https://linkedin.com/in/akvaithi",
    "https://github.com/akvaithi",
    "https://www.youtube.com/@akvaithi",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} ${mono.variable} antialiased`}
    >
      <body className="bg-ink text-cream font-sans selection:bg-acid selection:text-ink overflow-x-hidden">
        {/* JSON-LD Person schema — feeds Google's knowledge graph so a
            search for "Arun Vaithianathan" can surface a rich result with
            name, role, affiliations, and links. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Cursor />
        <SmoothScroll>
          <Nav />
          <PageTransition>{children}</PageTransition>
        </SmoothScroll>
        <HDRDebug />
      </body>
    </html>
  );
}
