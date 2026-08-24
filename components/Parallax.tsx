"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * The only parallax on the page (hero photo), capped at 6% so nothing detaches from its frame.
 * Reads window scroll rather than `useScroll({ target })`: the hero sits at the top of the page,
 * so a fixed 0-700px range is equivalent, and it avoids framer's element-measurement path
 * (which warns when the measured target's containing block is statically positioned).
 * Decorative — with JS off the child just renders in place.
 */
export default function Parallax({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], ["0%", "6%"], { clamp: true });

  return (
    <motion.div className={className} style={reduce ? undefined : { y }}>
      {children}
    </motion.div>
  );
}
