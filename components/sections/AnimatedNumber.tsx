"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type Props = { value: number; suffix?: string; className?: string };

/** Count-up on scroll. SSR renders the final value so the number exists before hydration; reduced motion keeps it static. */
export default function AnimatedNumber({ value, suffix = "", className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(value);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (reduce) return;
    setN(0);
    setArmed(true);
  }, [reduce]);

  useEffect(() => {
    if (!armed || !inView || reduce) return;
    const start = performance.now();
    const dur = 1100;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [armed, inView, reduce, value]);

  return (
    <span ref={ref} className={`tnum ${className}`}>
      {n}
      {suffix}
    </span>
  );
}
