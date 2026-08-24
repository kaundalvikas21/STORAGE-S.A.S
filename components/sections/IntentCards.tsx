"use client";

import Link from "next/link";
import { useState, type JSX } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CALC_URL, intentCards } from "@/content/site";
import { spring } from "@/lib/motion";

type Id = (typeof intentCards)[number]["id"];

/* Line-art illustrations, growing in scale: cajas → apartaestudio → apartamento → empresa */
const art: Record<Id, JSX.Element> = {
  cajas: (
    <g>
      <rect x="22" y="30" width="20" height="16" rx="2" />
      <rect x="30" y="14" width="18" height="16" rx="2" />
      <path d="M22 38h20M30 22h18" />
    </g>
  ),
  apartaestudio: (
    <g>
      <rect x="12" y="14" width="40" height="32" rx="3" />
      <path d="M12 30h40M26 30v16M18 22h6M40 22h6" />
    </g>
  ),
  apartamento: (
    <g>
      <rect x="8" y="10" width="48" height="38" rx="3" />
      <path d="M8 28h48M24 10v38M40 28v20M14 18h6M30 18h6M46 18h4" />
    </g>
  ),
  empresa: (
    <g>
      <rect x="6" y="6" width="52" height="44" rx="3" />
      <path d="M6 20h52M6 34h52M19 6v44M32 6v44M45 6v44" />
    </g>
  ),
};

export default function IntentCards() {
  const [selected, setSelected] = useState<Id | null>(null);
  const reduce = useReducedMotion();

  return (
    <section aria-labelledby="intent-title" className="order-2">
      <div className="mx-auto max-w-site px-5 md:px-8 lg:px-10 pb-16 md:pb-24">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between mb-6">
          <div>
            <p className="eyebrow mb-3">Calculadora de espacio</p>
            <h2 id="intent-title" className="font-display text-2xl font-semibold text-ink">¿Qué necesitas guardar?</h2>
          </div>
          <p className="text-[15px] text-muted max-w-[40ch]">Elige la opción más cercana y la calculadora continúa desde ahí.</p>
        </div>

        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4" role="list">
          {intentCards.map((c, i) => {
            const active = selected === c.id;
            return (
              <motion.li
                key={c.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={reduce ? { duration: 0 } : { ...spring, delay: 0.08 + i * 0.06 }}
                whileTap={reduce ? undefined : { scale: 0.98 }}
              >
                <Link
                  href={`${CALC_URL}?perfil=${c.id}`}
                  onClick={() => setSelected(c.id)}
                  onFocus={() => setSelected(c.id)}
                  onMouseEnter={() => setSelected(c.id)}
                  aria-current={active ? "true" : undefined}
                  className={`group block h-full rounded-xl p-1.5 cursor-pointer transition-[box-shadow,transform] duration-DEFAULT ease-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${
                    active ? "bg-accent-soft ring-2 ring-accent shadow-2 -translate-y-0.5" : "bg-bg-deep ring-1 ring-line hover:shadow-2"
                  }`}
                >
                  <motion.div
                    animate={reduce ? undefined : { scale: active ? 1.015 : 1 }}
                    transition={spring}
                    className="h-full rounded-xl-inner bg-surface shadow-inset p-4 md:p-5 flex flex-col"
                  >
                    <svg viewBox="0 0 64 56" className="h-12 w-14 text-primary" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {art[c.id]}
                    </svg>
                    <span className="mt-4 font-semibold text-ink text-[15px] md:text-base leading-snug">{c.title}</span>
                    <span className="tnum text-[13px] md:text-sm text-primary font-medium mt-0.5">{c.range}</span>
                    <span className="text-[12px] text-muted mt-2 leading-snug">{c.hint}</span>
                  </motion.div>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
