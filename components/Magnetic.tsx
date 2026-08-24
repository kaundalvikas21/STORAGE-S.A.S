"use client";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { ReactNode } from "react";

const clamp8 = (v: number) => Math.max(-8, Math.min(8, v));

/** Magnetic hover (≤8px attraction) via motion values only — never useState.
 *  Inert under reduced motion and for non-mouse pointers. */
export default function Magnetic({ children }: { children: ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <motion.div
      className="inline-block"
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set(clamp8((e.clientX - (r.left + r.width / 2)) / 6));
        y.set(clamp8((e.clientY - (r.top + r.height / 2)) / 6));
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
