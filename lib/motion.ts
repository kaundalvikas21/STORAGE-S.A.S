import type { Transition, Variants } from "framer-motion";

/* «El Sistema»: barely-there ease-out fades. No springs. */
export const snap: Transition = { duration: 0.15, ease: [0, 0, 0.2, 1] };

export const rise: Variants = {
  hidden: { opacity: 0, y: 4 },
  show: { opacity: 1, y: 0, transition: snap },
};

/** Same targets, no embedded transition — used with `transition={{ duration: 0 }}` under prefers-reduced-motion. */
export const riseInstant: Variants = {
  hidden: { opacity: 0, y: 4 },
  show: { opacity: 1, y: 0 },
};

/** Hairline rule line-draw — signature moment #2 (HowItWorks). */
export const draw: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.3, ease: [0, 0, 0.2, 1] } },
};

export const stagger = (delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren } },
});

export const noStagger: Variants = { hidden: {}, show: {} };
