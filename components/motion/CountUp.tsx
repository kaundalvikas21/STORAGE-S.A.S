"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type Props = { value: number; suffix?: string; className?: string };

/**
 * Trust-bar number: 0→value over 1.2s ease-out, once, when it enters the viewport. Tabular numerals so
 * the layout never shifts. SSR renders the final value; reduced motion and no-JS keep it static.
 */
export default function CountUp({ value, suffix = "", className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(value);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (reduce) return;
    /* eslint-disable react-hooks/set-state-in-effect -- one-time post-hydration reset: SSR shows the final value, the count must start at 0 */
    setN(0);
    setArmed(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [reduce]);

  useEffect(() => {
    if (!armed || !inView || reduce) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1200);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
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
