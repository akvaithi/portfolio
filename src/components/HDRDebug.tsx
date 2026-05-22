"use client";

import { useEffect, useState } from "react";

type Mode = "auto" | "force-hdr" | "force-sdr";

/**
 * Debug HUD: shows the browser's reported dynamic-range, current
 * force-mode (from ?hdr=force / ?hdr=sdr), and a one-click toggle.
 *
 * Activates when the page is loaded with any `hdr=*` or `debug=1` query
 * param. Otherwise stays out of the way.
 *
 * The force-mode itself is read by HDRImage via the same query param,
 * so flipping the toggle here re-renders the page accordingly.
 */
export function HDRDebug() {
  const [active, setActive] = useState(false);
  const [drHigh, setDrHigh] = useState<boolean | null>(null);
  const [mode, setMode] = useState<Mode>("auto");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const want = params.get("hdr");
    const dbg = params.get("debug");
    if (want || dbg) setActive(true);
    if (want === "force") setMode("force-hdr");
    else if (want === "sdr") setMode("force-sdr");
    else setMode("auto");

    const mq = window.matchMedia("(dynamic-range: high)");
    setDrHigh(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setDrHigh(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (!active) return null;

  const switchTo = (m: Mode) => {
    const url = new URL(window.location.href);
    if (m === "force-hdr") url.searchParams.set("hdr", "force");
    else if (m === "force-sdr") url.searchParams.set("hdr", "sdr");
    else url.searchParams.delete("hdr");
    window.location.href = url.toString();
  };

  return (
    <div className="fixed bottom-5 left-5 z-[150] rounded-lg border border-cream/15 bg-ink/90 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-cream/85 shadow-2xl backdrop-blur-md">
      <div className="flex items-center gap-3 mb-2">
        <span className="inline-block size-2 rounded-full bg-acid animate-pulse" />
        <span className="text-acid">HDR DEBUG</span>
      </div>
      <div className="space-y-1 mb-3">
        <div>
          dynamic-range:{" "}
          <span className={drHigh ? "text-acid-cool" : "text-rust"}>
            {drHigh === null ? "…" : drHigh ? "HIGH ✓" : "STANDARD ✗"}
          </span>
          <span className="text-cream/45"> (informational only)</span>
        </div>
        <div>
          mode: <span className="text-acid">{mode}</span>
        </div>
        <div className="text-cream/55 max-w-[16rem]">
          gain-map AVIFs are served to all AVIF-capable browsers; macOS uses
          display headroom to render HDR. dynamic-range query above is just
          informational.
        </div>
      </div>
      <div className="flex gap-1">
        <button
          type="button"
          onClick={() => switchTo("auto")}
          className={`px-2 py-1 rounded border border-cream/20 ${
            mode === "auto" ? "bg-cream text-ink" : "hover:bg-cream/10"
          }`}
        >
          auto
        </button>
        <button
          type="button"
          onClick={() => switchTo("force-hdr")}
          className={`px-2 py-1 rounded border border-cream/20 ${
            mode === "force-hdr" ? "bg-cream text-ink" : "hover:bg-cream/10"
          }`}
        >
          force HDR
        </button>
        <button
          type="button"
          onClick={() => switchTo("force-sdr")}
          className={`px-2 py-1 rounded border border-cream/20 ${
            mode === "force-sdr" ? "bg-cream text-ink" : "hover:bg-cream/10"
          }`}
        >
          force SDR
        </button>
      </div>
    </div>
  );
}
