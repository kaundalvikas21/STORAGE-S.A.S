"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Subtle parallax for featured photos only (hero, closing band): the child slides ≤6% on scroll.
 * The inner layer is oversized by the same 6% so the frame never shows a gap. Transform only.
 */
export default function Parallax({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y: reduce ? 0 : y }} className="absolute inset-x-0 -top-[6%] -bottom-[6%]">
        {children}
      </motion.div>
    </div>
  );
}
