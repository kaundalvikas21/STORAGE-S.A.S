"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { menus } from "@/components/nav/menus";
import { CALC_URL, QUOTE_URL, company, nav } from "@/content/site";
import { snap } from "@/lib/motion";

const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

/** Full-height drawer under 1024px. Accordion groups mirror the mega-menu, Calle 197 first. */
export default function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduce = useReducedMotion();
  return (
  <AnimatePresence>
    {open && (
      <motion.div
        id="menu-movil"
        className="fixed inset-0 z-0 bg-bg pt-24 px-6 overflow-y-auto overscroll-contain"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduce ? 0 : 0.18 }}
      >
        <nav aria-label="Menú móvil" className="mx-auto flex min-h-full max-w-md flex-col">
          {nav.map((n, i) => {
            const cols = menus[n.href];
            return (
              <motion.div key={n.href} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={reduce ? { duration: 0 } : { ...snap, delay: 0.04 + i * 0.04 }}>
                {cols ? (
                  <details className="group border-b border-line">
                    <summary className={`flex items-center justify-between px-2 py-4 font-display text-2xl font-bold uppercase text-ink ${focusRing}`}>
                      {n.label}
                      <span className="font-mono text-2xl leading-none transition-transform duration ease-soft group-open:rotate-45" aria-hidden="true">+</span>
                    </summary>
                    <ul className="pb-3">
                      {cols.flatMap((c) => c.items).map((it) => (
                        <li key={`${n.href}${it.href}`}>
                          <Link href={it.href} onClick={() => onClose()} className={`flex items-center gap-2 px-2 py-3 text-[15px] text-ink-2 active:opacity-80 cursor-pointer ${focusRing}`}>
                            {it.label}
                            {it.badge && <span className="border-[1.5px] border-ink bg-primary px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase text-on-primary">{it.badge}</span>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <Link href={n.href} onClick={() => onClose()} className={`block border-b border-line px-2 py-4 font-display text-2xl font-bold uppercase text-ink hover:bg-bg-deep active:opacity-80 transition-colors duration-fast ease-soft cursor-pointer ${focusRing}`}>
                    {n.label}
                  </Link>
                )}
              </motion.div>
            );
          })}
          {/* CTAs pinned to the bottom of the drawer, clear of the site-wide sticky bar. */}
          <div className="sticky bottom-0 mt-auto -mx-6 border-t-[1.5px] border-ink bg-bg px-6 pt-4 pb-6 flex flex-col gap-3">
            <Link href={CALC_URL} onClick={() => onClose()} className={`inline-flex min-h-[48px] items-center justify-center border-[1.5px] border-ink bg-surface px-4 text-[15px] font-semibold uppercase tracking-[0.04em] text-ink active:opacity-80 cursor-pointer ${focusRing}`}>
              Calcular mi espacio
            </Link>
            <Link href={QUOTE_URL} onClick={() => onClose()} className={`press inline-flex min-h-[48px] items-center justify-center border-[1.5px] border-ink bg-primary px-4 text-[15px] font-semibold uppercase tracking-[0.04em] text-on-primary cursor-pointer ${focusRing}`}>
              Cotizar
            </Link>
            <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-muted tnum">7 sedes en Bogotá · {company.hours}</p>
          </div>
        </nav>
      </motion.div>
    )}
  </AnimatePresence>
  );
}
