"use client";

import { motion, useReducedMotion } from "framer-motion";
import { draw, noStagger, rise, riseInstant, snap, stagger } from "@/lib/motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "li" | "article";
  delay?: number;
  /** When true, children wrapped in <RevealItem> stagger 40ms apart. */
  group?: boolean;
  role?: string;
};

const instant = { duration: 0 };

/**
 * Scroll reveal: opacity + 10px hard rise, once.
 * Reduced motion: the same element jumps straight to the visible state on mount (duration 0),
 * which also clears the SSR-rendered hidden style — never swap component types here.
 */
export default function Reveal({ children, className, as = "div", delay = 0, group = false, role }: Props) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      role={role}
      initial="hidden"
      animate={reduce ? "show" : undefined}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={group ? (reduce ? noStagger : stagger(delay)) : reduce ? riseInstant : rise}
      transition={reduce ? instant : group ? undefined : { ...snap, delay }}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({ children, className, as = "div" }: Omit<Props, "delay" | "group" | "role">) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag className={className} variants={reduce ? riseInstant : rise} transition={reduce ? instant : undefined}>
      {children}
    </Tag>
  );
}

/** Signature move: hairline rule that draws in (scaleX 0→1). Place inside a <Reveal>. */
export function RevealRule({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden="true"
      className={`h-px origin-left bg-ink/30 ${className}`}
      variants={reduce ? noStagger : draw}
      transition={reduce ? instant : undefined}
    />
  );
}
