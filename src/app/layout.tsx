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
  title: "Arun Vaithianathan — Multi-Scale Builder",
  description:
    "Chemical engineer, control-systems builder, and cinematographer. Working across molecular, digital, and creative scales.",
  metadataBase: new URL("https://akvaithi.tech"),
  openGraph: {
    title: "Arun Vaithianathan — Multi-Scale Builder",
    description:
      "Synthesizing graphite, stabilizing ROVs, shipping web tools, and producing cinema.",
    type: "website",
  },
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
