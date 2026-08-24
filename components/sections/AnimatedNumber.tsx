"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";

type Props = { value: number; suffix?: string; className?: string };

/** Count-up on scroll via motion values — framer writes the DOM node directly, no
 *  per-frame React state. SSR renders the final value; reduced motion keeps it static. */
export default function AnimatedNumber({ value, suffix = "", className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const mv = useMotionValue(value);
  const text = useTransform(mv, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (reduce || !inView) return;
    mv.set(0);
    const controls = animate(mv, value, { duration: 1.2, ease: "easeOut" });
    return () => controls.stop();
  }, [inView, reduce, mv, value]);

  return (
    <motion.span ref={ref} className={`tnum ${className}`}>
      {text}
    </motion.span>
  );
}
