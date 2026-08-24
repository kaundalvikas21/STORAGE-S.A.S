"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { CALC_URL, intentCards } from "@/content/site";
import { snap } from "@/lib/motion";

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
      <p id="size-checker-label" className="text-[14px] font-medium text-muted">
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
              className={`min-h-[44px] cursor-pointer rounded-[4px] px-4 text-[14px] font-medium transition-colors duration-fast ease-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                selected ? "bg-bg text-ink shadow-1" : "text-muted hover:text-ink"
              }`}
            >
              {card.title}
            </button>
          );
        })}
      </div>
      <p aria-live="polite" className="mt-4 text-[15px] text-ink-2">
        <motion.span
          key={active.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={reduce ? { duration: 0 } : snap}
          className="tnum"
        >
          → {active.answer} ({active.range}).{" "}
          <Link
            href={`${CALC_URL}?perfil=${active.id}`}
            className="inline-flex items-center gap-1 font-medium text-primary hover:text-primary-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-[2px]"
          >
            Confirmar en la calculadora
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </motion.span>
      </p>
    </div>
  );
}
