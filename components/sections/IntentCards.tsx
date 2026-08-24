"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CALC_URL, intentCards } from "@/content/site";
import { snap } from "@/lib/motion";

type Id = (typeof intentCards)[number]["id"];

/** Ruled table-grid: 4 cells over razor-thin ink lines; hover/selection inverts the cell. */
export default function IntentCards() {
  const [selected, setSelected] = useState<Id | null>(null);
  const reduce = useReducedMotion();

  return (
    <section aria-labelledby="intent-title" className="order-2">
      <div className="mx-auto max-w-site px-5 md:px-8 lg:px-10 py-14 md:py-20">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between mb-8">
          <div>
            <p className="eyebrow mb-3">Calculadora de espacio</p>
            <h2 id="intent-title" className="font-display text-2xl font-bold uppercase text-ink">¿Qué necesitas guardar?</h2>
          </div>
          <p className="text-[15px] text-muted max-w-[40ch]">Elige la opción más cercana y la calculadora continúa desde ahí.</p>
        </div>

        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-px border-[1.5px] border-ink bg-ink" role="list">
          {intentCards.map((c, i) => {
            const active = selected === c.id;
            return (
              <motion.li
                key={c.id}
                className="bg-bg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={reduce ? { duration: 0 } : { ...snap, delay: 0.05 + i * 0.04 }}
              >
                <Link
                  href={`${CALC_URL}?perfil=${c.id}`}
                  onClick={() => setSelected(c.id)}
                  onFocus={() => setSelected(c.id)}
                  onMouseEnter={() => setSelected(c.id)}
                  onMouseLeave={() => setSelected(null)}
                  onBlur={() => setSelected(null)}
                  aria-current={active ? "true" : undefined}
                  className={`flex h-full min-h-[168px] flex-col p-5 md:p-6 cursor-pointer transition-colors duration-fast ease-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring ${
                    active ? "bg-ink text-bg" : "bg-bg text-ink"
                  }`}
                >
                  <span className={`font-mono text-2xl md:text-[2rem] leading-none font-bold tnum ${active ? "text-primary" : "text-ink"}`}>{c.range}</span>
                  <span className="mt-4 text-[14px] md:text-[15px] font-semibold uppercase tracking-[0.02em] leading-snug">{c.title}</span>
                  <span className={`mt-1.5 text-[12px] leading-snug ${active ? "text-bg/70" : "text-muted"}`}>{c.hint}</span>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
