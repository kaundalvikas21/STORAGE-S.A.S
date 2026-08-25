"use client";

import { motion, useReducedMotion } from "framer-motion";
import { draw, fade, noStagger, spring } from "@/lib/motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "ul" | "li" | "article" | "p" | "h2";
  delay?: number;
  y?: number;
  role?: string;
};

/**
 * Scroll reveal: opacity 0→1 + y 24→0 on a soft spring, once, when the block is ~12% into the viewport.
 * Reduced motion: a 120ms opacity fade, no transform.
 * No-JS: app/layout.tsx ships a <noscript> rule that forces [data-motion] visible.
 */
export default function Reveal({ children, className, as = "div", delay = 0, y = 24, role }: Props) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      data-motion=""
      className={className}
      role={role}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={reduce ? fade : { ...spring, delay }}
    >
      {children}
    </Tag>
  );
}

/** Hairline rule that draws in (scaleX 0→1). Place inside a <RevealStagger>. */
export function RevealRule({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  return <motion.div aria-hidden="true" data-motion="" className={`h-px origin-left bg-line ${className}`} variants={reduce ? noStagger : draw} />;
}
