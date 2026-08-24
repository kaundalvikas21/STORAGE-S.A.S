"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CaretDown, Clock, MapPin, Phone, ChatText } from "@phosphor-icons/react/dist/ssr";
import { CALC_URL, QUOTE_URL, SEDES_URL, company, footerCols, nav, needs, sedes, sizes } from "@/content/site";
import { spring } from "@/lib/motion";

type Col = { title: string; items: { label: string; href: string }[]; more?: { label: string; href: string } };

/* Dropdown contents — all derived from content/site.ts (Calle 197 first by array order). */
const menus: Record<string, Col[]> = {
  "/bodegaje-bogota/": [
    { title: "Por tamaño", items: sizes.map((s) => ({ label: s.name, href: s.href })) },
    { title: "Por necesidad", items: needs },
    { title: "Por sede", items: sedes.map((s) => ({ label: s.name, href: `/sedes/${s.slug}/` })), more: { label: "Ver las 7 sedes", href: SEDES_URL } },
  ],
  [SEDES_URL]: [{ title: "Sedes en Bogotá", items: sedes.map((s) => ({ label: `${s.name} · ${s.zone}`, href: `/sedes/${s.slug}/` })), more: { label: "Ver las 7 sedes", href: SEDES_URL } }],
  "/mudanzas-bogota/": [{ title: "Mudanzas", items: footerCols.mudanzas }],
  "/quienes-somos/": [{ title: "Empresa", items: footerCols.empresa }],
};

const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const closeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      setMenu(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const show = (href: string) => {
    window.clearTimeout(closeTimer.current);
    setMenu(href);
  };
  const hide = () => {
    closeTimer.current = window.setTimeout(() => setMenu(null), 120);
  };

  const t = reduce ? { duration: 0 } : spring;

  return (
    <header className="sticky top-0 z-40 pt-3 px-3 md:pt-4 md:px-5 pointer-events-none">
      <div className="mx-auto max-w-site">
        <p className="pointer-events-auto hidden md:flex items-center justify-end gap-x-3 pb-2 pr-4 text-[12px] text-muted">
          <span className="inline-flex items-center gap-1.5"><MapPin size={14} weight="light" aria-hidden="true" />7 sedes en Bogotá</span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1.5 tnum"><Clock size={14} weight="light" aria-hidden="true" />{company.hours}</span>
          <span aria-hidden="true">·</span>
          <a href={`tel:${company.phone.replace(/\s/g, "")}`} className={`inline-flex items-center gap-1.5 tnum hover:text-primary rounded ${focusRing}`}>
            <Phone size={14} weight="light" aria-hidden="true" />PBX {company.phoneLabel}
          </a>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1.5 tnum"><ChatText size={14} weight="light" aria-hidden="true" />WhatsApp {company.whatsappLabel}</span>
        </p>

        <div className="pointer-events-auto relative mx-auto flex items-center justify-between gap-4 rounded-full bg-surface/85 backdrop-blur-md ring-1 ring-line shadow-1 pl-5 pr-2 py-2" onMouseLeave={hide}>
          <Link href="/" className={`font-display text-lg font-semibold text-primary cursor-pointer rounded-full px-1 ${focusRing}`} aria-label={`${company.brand} — inicio`}>
            Storage <span className="text-accent">S.A.S</span>
          </Link>

          <nav aria-label="Principal" className="hidden lg:flex items-center gap-1">
            {nav.map((n) => {
              const cols = menus[n.href];
              const isOpen = menu === n.href;
              return (
                <div key={n.href} className="relative" onMouseEnter={() => cols && show(n.href)}>
                  <Link
                    href={n.href}
                    aria-expanded={cols ? isOpen : undefined}
                    aria-haspopup={cols ? "true" : undefined}
                    onFocus={() => cols && show(n.href)}
                    onClick={(e) => {
                      if (cols && !isOpen) {
                        e.preventDefault();
                        show(n.href);
                      }
                    }}
                    className={`inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[14px] font-medium text-ink-2 hover:text-primary hover:bg-primary-soft transition-colors duration-fast ease-soft cursor-pointer ${focusRing} ${isOpen ? "bg-primary-soft text-primary" : ""}`}
                  >
                    {n.label}
                    {cols && <CaretDown size={12} weight="bold" aria-hidden="true" className={`transition-transform duration-fast ease-soft ${isOpen ? "rotate-180" : ""}`} />}
                  </Link>
                </div>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Link href={CALC_URL} className={`rounded-full px-4 py-2.5 text-[14px] font-semibold text-primary ring-[1.5px] ring-inset ring-primary hover:bg-primary-soft transition-colors duration-fast ease-soft cursor-pointer ${focusRing}`}>
              Calcular espacio
            </Link>
            <Link href={QUOTE_URL} className={`rounded-full bg-accent px-4 py-2.5 text-[14px] font-semibold text-on-accent hover:bg-accent-deep transition-colors duration-fast ease-soft cursor-pointer ${focusRing} focus-visible:ring-offset-2`}>
              Cotizar
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className={`lg:hidden relative h-10 w-10 rounded-full bg-primary-soft cursor-pointer ${focusRing}`}
          >
            <span className={`absolute left-1/2 top-1/2 h-[1.5px] w-5 -translate-x-1/2 bg-primary transition-transform duration-DEFAULT ease-soft ${open ? "rotate-45" : "-translate-y-[4px]"}`} />
            <span className={`absolute left-1/2 top-1/2 h-[1.5px] w-5 -translate-x-1/2 bg-primary transition-transform duration-DEFAULT ease-soft ${open ? "-rotate-45" : "translate-y-[4px]"}`} />
          </button>

          <AnimatePresence>
            {menu && menus[menu] && (
              <motion.div
                key={menu}
                role="region"
                aria-label={`Submenú ${nav.find((n) => n.href === menu)?.label}`}
                className="absolute left-0 right-0 top-full mt-3 hidden lg:block rounded-xl bg-bg-deep ring-1 ring-line p-1.5 shadow-3"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={t}
                onMouseEnter={() => show(menu)}
                onMouseLeave={hide}
              >
                <div className={`rounded-xl-inner bg-surface shadow-inset p-6 grid gap-8 ${menus[menu].length === 3 ? "grid-cols-3" : "grid-cols-1"}`}>
                  {menus[menu].map((col) => (
                    <div key={col.title}>
                      <p className="eyebrow mb-3">{col.title}</p>
                      <ul className={menus[menu].length === 1 ? "grid grid-cols-2 gap-x-8" : ""}>
                        {col.items.map((it) => (
                          <li key={it.href}>
                            <Link href={it.href} onClick={() => setMenu(null)} className={`block rounded-md px-2 py-1.5 text-[14px] text-ink-2 hover:text-primary hover:bg-primary-soft transition-colors duration-fast ease-soft cursor-pointer ${focusRing}`}>
                              {it.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      {col.more && (
                        <Link href={col.more.href} onClick={() => setMenu(null)} className={`mt-3 inline-flex items-center gap-1.5 px-2 text-[14px] font-semibold text-primary cursor-pointer rounded ${focusRing}`}>
                          {col.more.label} <ArrowRight size={14} weight="bold" aria-hidden="true" />
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-movil"
            className="pointer-events-auto fixed inset-0 z-30 bg-bg/95 backdrop-blur-xl pt-24 px-6 pb-28 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.22 }}
          >
            <nav aria-label="Menú móvil" className="mx-auto max-w-md flex flex-col gap-1">
              {[...nav, { label: "Calcular mi espacio", href: CALC_URL }, { label: "Cotizar", href: QUOTE_URL }].map((n, i) => (
                <motion.div key={n.href} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={reduce ? { duration: 0 } : { ...spring, delay: 0.05 + i * 0.05 }}>
                  <Link href={n.href} onClick={() => setOpen(false)} className={`block rounded-2xl px-4 py-4 font-display text-2xl font-semibold text-ink hover:bg-surface hover:text-primary transition-colors duration-fast ease-soft cursor-pointer ${focusRing}`}>
                    {n.label}
                  </Link>
                </motion.div>
              ))}
              <p className="mt-8 text-sm text-muted px-4 tnum">7 sedes en Bogotá · {company.hours}</p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
