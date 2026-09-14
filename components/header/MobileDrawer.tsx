"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import { CALC_URL, QUOTE_URL, company, nav } from "@/content/site";
import { CtaIcon, btnClass } from "@/components/Button";
import { focusRing, menus } from "@/components/header/MegaMenu";
import { snap } from "@/lib/motion";

type Props = { open: boolean; close: () => void };

/** Full-height drawer (<lg): accordion groups mirroring the mega-menu (Autopista Norte first),
 *  CTAs pinned at the bottom. Rendered as a sibling of <header> (a transformed header would
 *  hijack fixed positioning): z-[35] sits above the sticky bottom bar (30), below the header (40). */
export default function MobileDrawer({ open, close }: Props) {
  const reduce = useReducedMotion();
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="menu-movil"
          className="fixed inset-0 z-[35] flex flex-col bg-surface pt-24 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.18 }}
        >
          <nav aria-label="Menú móvil" className="w-full flex-1 overflow-y-auto px-6">
            <div className="mx-auto flex max-w-md flex-col pb-8">
              {nav.map((n, i) => {
                const cols = menus[n.href];
                return (
                  <motion.div
                    key={n.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={reduce ? { duration: 0 } : { ...snap, delay: 0.04 + i * 0.04 }}
                  >
                    {cols ? (
                      <details className="group border-b border-line">
                        <summary
                          className={`flex min-h-[44px] cursor-pointer list-none items-center justify-between px-2 py-4 text-2xl font-semibold text-ink ${focusRing}`}
                        >
                          {n.label}
                          <Plus size={20} weight="bold" aria-hidden="true" className="shrink-0 text-muted transition-transform duration ease-soft group-open:rotate-45" />
                        </summary>
                        <div className="px-2 pb-5">
                          {cols.map((col) => (
                            <div key={col.title}>
                              {cols.length > 1 && <p className="eyebrow mb-1 mt-3">{col.title}</p>}
                              <ul>
                                {col.items.map((it) => (
                                  <li key={it.href}>
                                    <Link
                                      href={it.href}
                                      onClick={close}
                                      className={`flex min-h-[44px] items-center gap-2 rounded-sm px-1 text-[16px] text-ink-2 hover:text-ink transition-colors duration-fast ease-soft cursor-pointer ${focusRing}`}
                                    >
                                      {it.label}
                                      {it.badge && <span className="rounded-full bg-accent px-2 py-0.5 text-[11px] font-medium text-on-accent">{it.badge}</span>}
                                    </Link>
                                  </li>
                                ))}
                                {col.more && (
                                  <li>
                                    <Link
                                      href={col.more.href}
                                      onClick={close}
                                      className={`flex min-h-[44px] items-center px-1 text-[15px] font-medium text-primary hover:text-primary-deep cursor-pointer ${focusRing}`}
                                    >
                                      {col.more.label}
                                    </Link>
                                  </li>
                                )}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </details>
                    ) : (
                      <Link
                        href={n.href}
                        onClick={close}
                        className={`block border-b border-line px-2 py-4 text-2xl font-semibold text-ink hover:bg-bg transition-colors duration-fast ease-soft cursor-pointer ${focusRing}`}
                      >
                        {n.label}
                      </Link>
                    )}
                  </motion.div>
                );
              })}
              <p className="tnum mt-6 px-2 text-[13px] text-muted">7 sedes en Bogotá · {company.hours}</p>
            </div>
          </nav>
          <div className="border-t border-line bg-surface p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
            <div className="mx-auto grid max-w-md grid-cols-1 gap-3 sm:grid-cols-2">
              <Link href={CALC_URL} onClick={close} className={btnClass("secondary", "md")}>
                <CtaIcon intent="calcular" />
                Calcular mi espacio
              </Link>
              <Link href={QUOTE_URL} onClick={close} className={btnClass("primary", "md")}>
                <CtaIcon intent="cotizar" />
                Cotizar
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
