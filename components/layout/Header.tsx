"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { CaretDown, ChatText, Clock, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import { buttonClass } from "@/components/Button";
import MegaMenu from "@/components/layout/MegaMenu";
import MobileDrawer from "@/components/layout/MobileDrawer";
import { navItems } from "@/content/menus";
import { CALC_URL, QUOTE_URL } from "@/content/site";
import { company } from "@/lib/company";

export const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-[2px]";
const navLink = `link-draw inline-flex items-center gap-1 px-3 py-2 text-[14px] font-medium text-ink-2 hover:text-ink cursor-pointer ${focusRing}`;

/**
 * Wireframe §01 Global header. A: utility bar (hides on scroll down, returns on scroll up, transform only).
 * B: sticky nav: Bodegaje ▾ · Sedes ▾ · Mudanzas ▾ · Precios · Empresa ▾ + Calcular espacio / Cotizar.
 * C: mega-menu per item (components/layout/MegaMenu.tsx). <1024px: hamburger → MobileDrawer.
 */
export default function Header() {
  const pathname = usePathname();
  const [compact, setCompact] = useState(false);
  const [hideBar, setHideBar] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const lastY = useRef(0);
  const closeTimer = useRef<number | undefined>(undefined);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setCompact(y > 24);
    setHideBar(y > 80 && y > lastY.current);
    lastY.current = y;
  });

  /* Escape closes and returns focus to the trigger; pointer outside the bar closes. */
  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMenu(null);
      barRef.current?.querySelector<HTMLElement>(`[data-trigger="${menu}"]`)?.focus();
    };
    const onDown = (e: PointerEvent) => {
      if (!barRef.current?.contains(e.target as Node)) setMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [menu]);

  const show = (label: string) => {
    window.clearTimeout(closeTimer.current);
    setMenu(label);
  };
  const hide = () => {
    closeTimer.current = window.setTimeout(() => setMenu(null), 120);
  };

  return (
    <header
      className={`sticky top-0 z-40 border-b border-line transition-[transform,box-shadow,background-color] duration-fast ease-premium ${
        hideBar ? "lg:-translate-y-[var(--utility-h)]" : ""
      } ${compact ? "bg-bg/85 shadow-2 backdrop-blur-md" : "bg-bg"}`}
    >
      <div className="mx-auto max-w-site px-5 md:px-8 lg:px-10">
        {/* A. Utility bar */}
        <div className="hidden h-utility items-center justify-between gap-4 border-b border-line text-[13px] text-muted lg:flex">
          <p className="tnum inline-flex items-center gap-1.5">
            <MapPin size={13} weight="regular" aria-hidden="true" />
            7 sedes en Bogotá <span aria-hidden="true">·</span> <Clock size={13} weight="regular" aria-hidden="true" /> {company.hours}
          </p>
          <p className="tnum flex items-center gap-4">
            <a href={company.phoneHref} className={`link-draw inline-flex items-center gap-1.5 hover:text-ink ${focusRing}`}>
              <Phone size={13} weight="regular" aria-hidden="true" />
              PBX {company.phone}
            </a>
            <span className="inline-flex items-center gap-1.5">
              <ChatText size={13} weight="regular" aria-hidden="true" />
              WhatsApp {company.whatsapp}
            </span>
          </p>
        </div>

        {/* B. Main nav bar */}
        <div
          ref={barRef}
          className={`relative flex items-center justify-between gap-4 transition-[padding] duration-fast ease-premium ${compact ? "py-2" : "py-3"}`}
          onMouseLeave={hide}
          onBlur={(e) => {
            if (!barRef.current?.contains(e.relatedTarget as Node)) setMenu(null);
          }}
        >
          <Link href="/" className={`font-display text-lg font-semibold text-ink cursor-pointer ${focusRing}`} aria-label={`${company.brand}, inicio`}>
            STORAGE <span className="text-primary">S.A.S</span>
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
            {navItems.map((n) => {
              const open = menu === n.label;
              const current = pathname === n.href;
              return (
                <div key={n.href} onMouseEnter={() => n.columns && show(n.label)}>
                  <Link
                    href={n.href}
                    data-trigger={n.label}
                    aria-current={current ? "page" : undefined}
                    aria-haspopup={n.columns ? "true" : undefined}
                    aria-expanded={n.columns ? open : undefined}
                    aria-controls={n.columns ? `menu-${n.label}` : undefined}
                    onFocus={() => n.columns && show(n.label)}
                    onKeyDown={(e) => {
                      if (!n.columns || e.key !== "ArrowDown") return;
                      e.preventDefault();
                      show(n.label);
                      requestAnimationFrame(() => barRef.current?.querySelector<HTMLElement>(`#menu-${n.label} a`)?.focus());
                    }}
                    className={`${navLink} ${open || current ? "text-primary" : ""}`}
                  >
                    {n.label}
                    {n.columns && <CaretDown size={12} weight="bold" aria-hidden="true" className={`transition-transform duration-fast ease-premium ${open ? "rotate-180" : ""}`} />}
                  </Link>
                  {n.columns && <MegaMenu item={n} open={open} onClose={() => setMenu(null)} onEnter={() => show(n.label)} onLeave={hide} />}
                </div>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Link href={CALC_URL} className={buttonClass("secondary", "md")}>
              Calcular espacio
            </Link>
            <Link href={QUOTE_URL} className={buttonClass("primary", "md")}>
              Cotizar
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setDrawer((v) => !v)}
            aria-expanded={drawer}
            aria-controls="menu-movil"
            aria-label={drawer ? "Cerrar menú" : "Abrir menú"}
            className={`relative h-11 w-11 rounded-sm border border-line bg-bg cursor-pointer transition-colors duration-fast ease-premium hover:border-muted-2 hover:bg-surface active:scale-[0.98] lg:hidden ${focusRing}`}
          >
            <span className={`absolute left-1/2 top-1/2 h-[1.5px] w-5 -translate-x-1/2 bg-ink transition-transform duration-base ease-premium ${drawer ? "rotate-45" : "-translate-y-[4px]"}`} />
            <span className={`absolute left-1/2 top-1/2 h-[1.5px] w-5 -translate-x-1/2 bg-ink transition-transform duration-base ease-premium ${drawer ? "-rotate-45" : "translate-y-[4px]"}`} />
          </button>
        </div>
      </div>

      <MobileDrawer open={drawer} onClose={() => setDrawer(false)} />
    </header>
  );
}
