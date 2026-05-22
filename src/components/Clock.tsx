"use client";

import { useEffect, useState } from "react";

export function Clock({ tz = "America/Chicago" }: { tz?: string }) {
  const [now, setNow] = useState<string>("");
  useEffect(() => {
    const update = () =>
      setNow(
        new Intl.DateTimeFormat("en-US", {
          timeZone: tz,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date())
      );
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [tz]);
  return (
    <span className="font-mono tabular-nums" suppressHydrationWarning>
      {now}
    </span>
  );
}
