"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { CaretDown, ChatText, Clock, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import MegaMenu from "@/components/nav/MegaMenu";
import MobileNav from "@/components/nav/MobileNav";
import { menus } from "@/components/nav/menus";
import { CALC_URL, QUOTE_URL, company, nav } from "@/content/site";

const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const [condensed, setCondensed] = useState(false);
  const [hideUtility, setHideUtility] = useState(false);
  const pathname = usePathname();
  const closeTimer = useRef<number | undefined>(undefined);
  const headerRef = useRef<HTMLElement>(null);

  /* Scroll state via framer-motion's scroll observer — never window.addEventListener("scroll"). */
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setCondensed(y > 24);
    setHideUtility(y > 24 && y > prev);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* Escape closes both layers; a click outside the header closes the mega-menu. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      setMenu(null);
    };
    const onClick = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setMenu(null);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  const show = (href: string) => {
    window.clearTimeout(closeTimer.current);
    setMenu(href);
  };
  const hide = () => {
    closeTimer.current = window.setTimeout(() => setMenu(null), 120);
  };

  return (
    /* Sticky offset moves, never the header's own height: the flow box is a constant size,
       so collapsing the utility bar cannot shift the document (CLS stays 0).
       The offset is --utility-h, which is 0 below md where the utility bar is not rendered,
       so the main bar is never clipped on mobile. */
    <header
      ref={headerRef}
      className={`sticky z-40 border-b-[1.5px] border-ink bg-bg transition-[top,box-shadow] duration-fast ease-soft ${condensed ? "shadow-1" : ""}`}
      style={{ top: hideUtility ? "calc(-1 * var(--utility-h))" : 0 }}
    >
      {/* Above the drawer: the drawer is a descendant of <header>, so without this the
          overlay would paint over the logo and the close button. */}
      <div className="relative z-10 mx-auto max-w-site px-5 md:px-8 lg:px-10 bg-bg">
        {/* Wireframe 01: coverage + hours sit left, contact sits right. */}
        <div
          className="hidden md:flex items-center justify-between gap-x-4 border-b border-line font-mono text-[11px] uppercase tracking-[0.08em] text-muted"
          style={{ height: "var(--utility-h)" }}
        >
          <p className="flex items-center gap-x-3">
            <span className="inline-flex items-center gap-1.5"><MapPin size={13} weight="regular" aria-hidden="true" />7 sedes en Bogotá</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1.5 tnum"><Clock size={13} weight="regular" aria-hidden="true" />{company.hours}</span>
          </p>
          <p className="flex items-center gap-x-3">
            <a href={`tel:${company.phone.replace(/\s/g, "")}`} className={`link-draw inline-flex items-center gap-1.5 tnum hover:text-ink ${focusRing}`}>
              <Phone size={13} weight="regular" aria-hidden="true" />PBX {company.phoneLabel}
            </a>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1.5 tnum"><ChatText size={13} weight="regular" aria-hidden="true" />WhatsApp {company.whatsappLabel}</span>
          </p>
        </div>

        <div className="relative flex items-center justify-between gap-4 py-3" onMouseLeave={hide}>
          <Link href="/" className={`font-display text-lg font-bold uppercase tracking-[-0.01em] text-ink cursor-pointer ${focusRing}`} aria-label={`${company.brand}, inicio`}>
            Storage <span className="text-primary-deep">S.A.S</span>
          </Link>

          <nav aria-label="Principal" className="hidden lg:flex items-center gap-1">
            {nav.map((n) => {
              const cols = menus[n.href];
              const isOpen = menu === n.href;
              const current = pathname === n.href;
              return (
                <div key={n.href} className="relative" onMouseEnter={() => cols && show(n.href)}>
                  <Link
                    href={n.href}
                    aria-expanded={cols ? isOpen : undefined}
                    aria-haspopup={cols ? "true" : undefined}
                    aria-current={current ? "page" : undefined}
                    onFocus={() => (cols ? show(n.href) : setMenu(null))}
                    onClick={(e) => {
                      if (cols && !isOpen) {
                        e.preventDefault();
                        show(n.href);
                      }
                    }}
                    className={`nav-item link-draw inline-flex items-center gap-1 px-3 py-2 font-mono text-[13px] uppercase tracking-[0.06em] cursor-pointer ${focusRing} ${
                      isOpen ? "bg-ink text-bg" : "text-ink-2 hover:text-ink"
                    }`}
                  >
                    {n.label}
                    {cols && <CaretDown size={12} weight="bold" aria-hidden="true" className={`transition-transform duration-fast ease-soft ${isOpen ? "rotate-180" : ""}`} />}
                  </Link>
                </div>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Link href={CALC_URL} className={`inline-flex min-h-[44px] items-center border-[1.5px] border-ink bg-surface px-4 text-[13px] font-semibold uppercase tracking-[0.04em] text-ink hover:bg-ink hover:text-bg active:opacity-80 transition-colors duration-fast ease-soft cursor-pointer ${focusRing} focus-visible:ring-offset-2`}>
              Calcular espacio
            </Link>
            <Link href={QUOTE_URL} className={`press inline-flex min-h-[44px] items-center border-[1.5px] border-ink bg-primary px-4 text-[13px] font-semibold uppercase tracking-[0.04em] text-on-primary hover:bg-primary-deep hover:text-bg cursor-pointer ${focusRing} focus-visible:ring-offset-2`}>
              Cotizar
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className={`lg:hidden relative h-11 w-11 border-[1.5px] border-ink bg-surface cursor-pointer active:opacity-80 ${focusRing}`}
          >
            <span className={`absolute left-1/2 top-1/2 h-[1.5px] w-5 -translate-x-1/2 bg-ink transition-transform duration ease-soft ${open ? "rotate-45" : "-translate-y-[4px]"}`} />
            <span className={`absolute left-1/2 top-1/2 h-[1.5px] w-5 -translate-x-1/2 bg-ink transition-transform duration ease-soft ${open ? "-rotate-45" : "translate-y-[4px]"}`} />
          </button>

          <AnimatePresence>
            {menu && menus[menu] && (
              <MegaMenu
                key={menu}
                cols={menus[menu]}
                label={nav.find((n) => n.href === menu)?.label ?? ""}
                onNavigate={() => setMenu(null)}
                onEnter={() => show(menu)}
                onLeave={hide}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      <MobileNav open={open} onClose={() => setOpen(false)} />

    </header>
  );
}
