"use client";

import { motion, useReducedMotion } from "framer-motion";
import { noStagger, rise, riseInstant, spring, stagger } from "@/lib/motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "li" | "article";
  delay?: number;
  /** When true, children wrapped in <RevealItem> stagger 60ms apart. */
  group?: boolean;
  role?: string;
};

const instant = { duration: 0 };

/**
 * Scroll reveal: opacity + 8px rise, once.
 * Reduced motion: the same element jumps straight to the visible state on mount (duration 0),
 * which also clears the SSR-rendered hidden style — never swap component types here.
 * `data-reveal` is the hook the <noscript> rule in app/layout.tsx uses to force everything
 * visible when scripting is off; framer serializes `initial` as an inline opacity:0.
 */
export default function Reveal({ children, className, as = "div", delay = 0, group = false, role }: Props) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      data-reveal=""
      className={className}
      role={role}
      initial="hidden"
      animate={reduce ? "show" : undefined}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={group ? (reduce ? noStagger : stagger(delay)) : reduce ? riseInstant : rise}
      transition={reduce ? instant : group ? undefined : { ...spring, delay }}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({ children, className, as = "div" }: Omit<Props, "delay" | "group" | "role">) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag data-reveal="" className={className} variants={reduce ? riseInstant : rise} transition={reduce ? instant : undefined}>
      {children}
    </Tag>
  );
}
