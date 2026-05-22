"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function RotatingHero({
  images,
  interval = 4500,
  alt = "Featured frame",
  className,
}: {
  images: string[];
  interval?: number;
  alt?: string;
  className?: string;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => setI((n) => (n + 1) % images.length), interval);
    return () => clearInterval(id);
  }, [images.length, interval]);

  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      {images.map((src, idx) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity ease-out ${
            idx === i ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDuration: "1400ms" }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="100vw"
            priority={idx < 2}
            className="object-cover"
          />
        </div>
      ))}
      <div className="absolute bottom-3 right-3 flex gap-1 z-10">
        {images.map((_, j) => (
          <span
            key={j}
            className={`h-px transition-all duration-500 ${
              j === i ? "w-8 bg-cream" : "w-3 bg-cream/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
