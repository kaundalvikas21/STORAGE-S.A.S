"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import { CALC_URL, QUOTE_URL, company, nav } from "@/content/site";
import { menus } from "./menu-data";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

/**
 * Sibling of <header>, never a child: the header's utility bar animates with a transform,
 * which would otherwise become the containing block for this fixed panel.
 * z-40 sits above MobileStickyBar (z-30) and below the header shell (z-50).
 */
export default function MobileDrawer({ onNavigate }: { onNavigate: () => void }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      id="menu-movil"
      className="fixed inset-0 z-40 lg:hidden flex flex-col bg-bg/95 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.22 }}
    >
      <nav aria-label="Menú móvil" className="flex-1 overflow-y-auto px-6 pt-24 pb-6">
        <ul className="mx-auto max-w-md flex flex-col gap-1" role="list">
          {nav.map((n) => {
            const cols = menus[n.href];
            if (!cols) {
              return (
                <li key={n.href}>
                  <Link href={n.href} onClick={onNavigate} className={`block rounded-2xl px-4 py-4 font-display text-2xl font-semibold text-ink hover:bg-surface hover:text-primary transition-colors duration-fast ease-premium cursor-pointer ${focusRing}`}>
                    {n.label}
                  </Link>
                </li>
              );
            }
            return (
              <li key={n.href}>
                <details className="group rounded-2xl open:bg-surface open:shadow-1">
                  <summary className={`flex items-center justify-between gap-3 rounded-2xl px-4 py-4 font-display text-2xl font-semibold text-ink cursor-pointer transition-colors duration-fast ease-premium hover:text-primary ${focusRing}`}>
                    {n.label}
                    <span className="details-caret flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary transition-transform duration-DEFAULT ease-premium">
                      <CaretDown size={16} weight="bold" aria-hidden="true" />
                    </span>
                  </summary>
                  <div className="px-4 pb-4 flex flex-col gap-4">
                    {cols.map((col) => (
                      <div key={col.title} className={col.priority ? "rounded-lg bg-accent-soft/60 ring-1 ring-accent/35 p-3" : ""}>
                        <p className="eyebrow mb-2">{col.title}</p>
                        <ul className="flex flex-col" role="list">
                          {[...col.items, ...(col.more ? [col.more] : [])].map((it) => (
                            <li key={it.href}>
                              <Link href={it.href} onClick={onNavigate} className={`block rounded-md px-2 py-2.5 text-[15px] text-ink-2 hover:text-primary transition-colors duration-fast ease-premium cursor-pointer ${focusRing}`}>
                                {it.label}
                                {it.badge && <span className="ml-2 rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-on-accent">{it.badge}</span>}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </details>
              </li>
            );
          })}
        </ul>
        <p className="mx-auto max-w-md mt-8 px-4 text-sm text-muted tnum">7 sedes en Bogotá · {company.hours}</p>
      </nav>

      {/* Pinned action shelf — replaces MobileStickyBar while the drawer is open. */}
      <div className="shrink-0 border-t border-line bg-surface/95 px-6 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
        <div className="mx-auto max-w-md grid grid-cols-2 gap-2">
          <Link href={CALC_URL} onClick={onNavigate} className={`inline-flex items-center justify-center rounded-full px-4 py-3 text-[15px] font-semibold text-primary ring-[1.5px] ring-inset ring-primary transition-[background-color,transform] duration-fast ease-premium active:scale-press cursor-pointer ${focusRing}`}>
            Calcular espacio
          </Link>
          <Link href={QUOTE_URL} onClick={onNavigate} className={`inline-flex items-center justify-center rounded-full bg-accent px-4 py-3 text-[15px] font-semibold text-on-accent transition-[background-color,transform] duration-fast ease-premium hover:bg-accent-deep active:scale-press cursor-pointer ${focusRing}`}>
            Cotizar
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
