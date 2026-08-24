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

/** Shared grid choreography: children 70ms apart, 100ms after the parent lands. */
export const stagger = (extraDelay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 + extraDelay } },
});

export const noStagger: Variants = { hidden: {}, show: {} };
