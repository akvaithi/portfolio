"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

type Props = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  innerClassName?: string;
  amount?: number;
  sizes?: string;
};

export function ParallaxImage({
  src,
  alt,
  priority,
  className,
  innerClassName,
  amount = 80,
  sizes,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-amount, amount]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1.12, 1.08]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ""}`}>
      <motion.div style={{ y, scale }} className={`absolute inset-0 ${innerClassName ?? ""}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes ?? "100vw"}
          unoptimized
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}
