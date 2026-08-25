"use client";

import { motion, useReducedMotion } from "framer-motion";
import { rise, riseFade, stagger } from "@/lib/motion";
import type { ReactNode } from "react";

type Tag = "div" | "ul" | "ol" | "li" | "article" | "footer";
type Props = { children: ReactNode; className?: string; as?: Tag; role?: string; gap?: number; delay?: number };

/**
 * Parent/children variant pair for every card grid: children wrapped in <RevealItem> rise 0.07s apart
 * (delayChildren 0.1s), once. Reduced motion keeps the stagger but swaps each item to a 120ms fade.
 */
export default function RevealStagger({ children, className, as = "div", role, gap = 0.07, delay = 0.1 }: Props) {
  const Tag = motion[as];
  return (
    <Tag className={className} role={role} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-12% 0px" }} variants={stagger(gap, delay)}>
      {children}
    </Tag>
  );
}

export function RevealItem({ children, className, as = "div" }: Omit<Props, "gap" | "delay" | "role">) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag data-motion="" className={className} variants={reduce ? riseFade : rise}>
      {children}
    </Tag>
  );
}
