import type { Transition, Variants } from "framer-motion";

export const spring: Transition = { type: "spring", stiffness: 260, damping: 28, mass: 0.9 };

export const rise: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: spring },
};

/** Same targets, no embedded transition — used with `transition={{ duration: 0 }}` under prefers-reduced-motion. */
export const riseInstant: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

export const stagger = (delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren } },
});

export const noStagger: Variants = { hidden: {}, show: {} };
