"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { CALC_URL, intentCards } from "@/content/site";
import { fade } from "@/lib/motion";

const swap = { duration: 0.15, ease: [0.22, 1, 0.36, 1] as const };

type Id = (typeof intentCards)[number]["id"];

/**
 * Hero mini size-checker — signature moment #1 (MASTER.md §6).
 * SSRs with the first profile selected so the answer line is never empty;
 * hydrates below the static H1, so it cannot delay the LCP text.
 */
export default function SizeChecker() {
  const [id, setId] = useState<Id>("cajas");
  const reduce = useReducedMotion();
  const active = intentCards.find((c) => c.id === id) ?? intentCards[0];

  return (
    <div className="mt-10 max-w-2xl">
      <p id="size-checker-label" className="text-[14px] font-medium text-muted lg:text-on-photo/80">
        ¿Qué necesitas guardar?
      </p>
      <div
        role="group"
        aria-labelledby="size-checker-label"
        className="mt-3 grid grid-cols-2 gap-1 rounded-sm border border-line bg-surface p-1 sm:inline-flex"
      >
        {intentCards.map((card) => {
          const selected = card.id === id;
          return (
            <button
              key={card.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setId(card.id)}
              className={`min-h-[44px] cursor-pointer rounded-[4px] px-4 text-[14px] font-medium transition-[color,background-color,transform] duration-fast ease-premium active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                selected ? "bg-bg text-ink shadow-1" : "text-muted hover:text-ink"
              }`}
            >
              {card.title}
            </button>
          );
        })}
      </div>
      <p aria-live="polite" className="mt-4 text-[15px] text-ink-2 lg:text-on-photo/90">
        <motion.span
          key={active.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={reduce ? fade : swap}
          className="tnum"
        >
          → {active.answer} ({active.range}).{" "}
          <Link
            href={`${CALC_URL}?perfil=${active.id}`}
            className="link-draw inline-flex items-center gap-1 font-medium text-primary hover:text-primary-deep lg:text-on-photo lg:underline lg:underline-offset-4 lg:decoration-on-photo/50 lg:hover:text-on-photo lg:hover:decoration-on-photo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-[2px]"
          >
            Confirmar en la calculadora
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </motion.span>
      </p>
    </div>
  );
}
