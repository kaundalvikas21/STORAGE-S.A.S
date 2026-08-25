import type { Transition, Variants } from "framer-motion";

/* Shared motion vocabulary (MASTER.md §6). Every primitive in components/motion/ reads from here. */
export const spring: Transition = { type: "spring", stiffness: 110, damping: 20 };

/** Reduced motion: a single 120ms opacity fade, no transforms. */
export const fade: Transition = { duration: 0.12 };

export const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: spring },
};

/* y: 0 is explicit so the SSR-rendered 24px offset (rendered before useReducedMotion resolves) is cleared. */
export const riseFade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, y: 0, transition: fade },
};

/** Hairline rule line-draw (scaleX 0→1), signature moment #2 in HowItWorks. */
export const draw: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
};

export const stagger = (gap = 0.07, delayChildren = 0.1): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren } },
});

export const noStagger: Variants = { hidden: {}, show: {} };
