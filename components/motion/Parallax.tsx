"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * The only parallax on the page: the hero photograph drifts at most 6% of its own height
 * while the section scrolls past, and settles from a 1.04 scale on load.
 * Transform only — never opacity — so the photo is still visible with JavaScript disabled.
 */
export default function Parallax({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  return (
    <div ref={ref} className={className}>
      {/* Oversized 12% so a +/-3% drift never exposes the frame edge. */}
      <motion.div
        className="absolute inset-x-0 -top-[6%] h-[112%]"
        style={reduce ? undefined : { y }}
        initial={{ scale: reduce ? 1 : 1.04 }}
        animate={{ scale: 1 }}
        transition={reduce ? { duration: 0 } : { duration: 1.2, ease: [0, 0, 0.2, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
