import type { Transition, Variants } from "framer-motion";

/* «El Calculista»: springy but disciplined — 300ms springs, 60ms staggers. */
export const snap: Transition = { type: "spring", duration: 0.3, bounce: 0.2 };

export const rise: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: snap },
};

/** Same targets, no embedded transition — used with `transition={{ duration: 0 }}` under prefers-reduced-motion. */
export const riseInstant: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

/** Hairline rule line-draw (RevealRule). */
export const draw: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
};

export const stagger = (delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren } },
});

export const noStagger: Variants = { hidden: {}, show: {} };
