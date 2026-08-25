"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import { buttonClass } from "@/components/Button";
import { navItems } from "@/content/menus";
import { CALC_URL, QUOTE_URL } from "@/content/site";
import { company } from "@/lib/company";
import { fade } from "@/lib/motion";

const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring";
const rowCls = `flex min-h-[48px] w-full items-center justify-between px-2 py-3 text-xl font-semibold text-ink transition-colors duration-fast ease-premium hover:bg-surface active:scale-[0.98] cursor-pointer ${focusRing}`;
const subCls = `link-draw inline-flex min-h-[44px] items-center gap-2 px-2 text-[15px] text-ink-2 hover:text-ink cursor-pointer ${focusRing} rounded-[2px]`;

/** <1024px: full-height drawer with native <details> accordions mirroring the mega-menu; CTAs pinned at the bottom. */
export default function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduce = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="menu-movil"
          className="fixed inset-0 z-30 flex flex-col bg-bg pt-[72px] lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={reduce ? fade : { duration: 0.18 }}
        >
          <nav aria-label="Menú móvil" className="flex-1 overflow-y-auto px-5 pb-6">
            {navItems.map((n, i) => (
              <motion.div
                key={n.href}
                className="border-b border-line"
                initial={{ opacity: 0, y: reduce ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={reduce ? fade : { duration: 0.2, ease: [0.22, 1, 0.36, 1], delay: 0.04 + i * 0.04 }}
              >
                {n.columns ? (
                  <details className="group">
                    <summary className={rowCls}>
                      {n.label}
                      <CaretDown size={18} aria-hidden="true" className="transition-transform duration-fast ease-premium group-open:rotate-180" />
                    </summary>
                    <div className="grid gap-5 px-2 pb-5 pt-1">
                      {n.columns.map((col) => (
                        <div key={col.title} className={col.priority ? "-mx-2 rounded-lg border border-primary/20 bg-primary-soft px-3 py-3" : ""}>
                          <p className="eyebrow mb-1">{col.title}</p>
                          <ul>
                            {col.items.map((it) => (
                              <li key={it.href}>
                                <Link href={it.href} onClick={onClose} className={subCls}>
                                  {it.label}
                                  {it.badge && <span className="rounded-full bg-primary px-2 py-0.5 text-[11px] font-medium text-on-primary">{it.badge}</span>}
                                </Link>
                              </li>
                            ))}
                            {col.more && (
                              <li>
                                <Link href={col.more.href} onClick={onClose} className={`${subCls} font-medium text-primary`}>
                                  {col.more.label} →
                                </Link>
                              </li>
                            )}
                          </ul>
                        </div>
                      ))}
                      <Link href={n.href} onClick={onClose} className={`${subCls} font-medium text-primary`}>
                        Ver {n.label.toLowerCase()} →
                      </Link>
                    </div>
                  </details>
                ) : (
                  <Link href={n.href} onClick={onClose} className={rowCls}>
                    {n.label}
                  </Link>
                )}
              </motion.div>
            ))}
            <p className="tnum mt-6 px-2 text-[13px] text-muted">
              7 sedes en Bogotá · {company.hours}
              <br />
              PBX {company.phone} · WhatsApp {company.whatsapp}
            </p>
          </nav>

          <div className="grid grid-cols-2 gap-2 border-t border-line bg-bg p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
            <Link href={CALC_URL} onClick={onClose} className={buttonClass("secondary", "md")}>
              Calcular espacio
            </Link>
            <Link href={QUOTE_URL} onClick={onClose} className={buttonClass("primary", "md")}>
              Cotizar
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
