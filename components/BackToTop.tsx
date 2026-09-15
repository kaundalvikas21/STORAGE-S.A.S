"use client";
import { useState } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { ArrowUp } from "@phosphor-icons/react/dist/ssr";

/**
 * Back-to-top button, stacked above the WhatsApp bubble (rendered inside WhatsAppWidget's fixed
 * column so the two never overlap). Appears after one viewport of scroll (framer useScroll, no
 * window scroll listener). Smooth scroll to the top, instant under reduced motion; focus moves to
 * the page's <main id="main"> so keyboard users continue from the top on any route. Hidden state
 * uses `invisible`, which also takes it out of the tab order.
 */
export default function BackToTop() {
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > window.innerHeight));

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    document.getElementById("main")?.focus({ preventScroll: true });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Volver arriba"
      className={`mr-1.5 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line bg-surface text-ink shadow-2 transition-[opacity,transform,visibility,background-color,color] duration ease-soft hover:-translate-y-0.5 hover:border-brand-deep hover:bg-brand hover:text-on-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
        show ? "visible opacity-100" : "invisible translate-y-2 opacity-0"
      }`}
    >
      <ArrowUp size={20} weight="bold" aria-hidden="true" />
    </button>
  );
}
