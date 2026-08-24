"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { Calculator, CaretDown, Clock, FileText, MapPin, Phone, Warehouse, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import MegaMenu from "@/components/header/MegaMenu";
import MobileDrawer from "@/components/header/MobileDrawer";
import { menus } from "@/components/header/menu-data";
import { CALC_URL, QUOTE_URL, company, nav } from "@/content/site";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

export default function Header() {
  const [drawer, setDrawer] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  // Escape restores focus to the trigger, whose onFocus would otherwise re-open the menu.
  const suppressFocusOpen = useRef(false);

  const closeMenu = useCallback(() => setMenu(null), []);
  const show = (href: string) => {
    window.clearTimeout(closeTimer.current);
    setMenu(href);
  };
  const hide = () => {
    closeTimer.current = window.setTimeout(closeMenu, 120);
  };

  const { scrollY } = useScroll();
  // Runs on every scroll frame, so it must stay cheap. Both updaters return the identical value
  // when nothing changed, which React bails out of without re-rendering the header.
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
    setMenu((open) => (open === null ? open : null));
  });

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setDrawer(false);
      if (menu) {
        suppressFocusOpen.current = true;
        document.getElementById(`nav-${menu}`)?.focus();
        window.setTimeout(() => (suppressFocusOpen.current = false), 0);
      }
      closeMenu();
    };
    const onDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) closeMenu();
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [menu, closeMenu]);

  return (
    <>
      {/* Utility bar sits in normal flow, NOT inside the sticky element: it scrolls away for
          good and only the nav pill below stays pinned. No transform, so nothing to measure. */}
      <div className="hidden lg:block bg-primary text-on-primary">
        <div className="mx-auto max-w-site px-5 md:px-8 lg:px-10 flex items-center justify-between gap-4 py-2.5 text-[12px]">
          <p className="flex items-center gap-x-5">
            <span className="inline-flex items-center gap-1.5"><MapPin size={15} weight="light" aria-hidden="true" className="text-accent" />7 sedes en Bogotá</span>
            <span className="inline-flex items-center gap-1.5 tnum"><Clock size={15} weight="light" aria-hidden="true" className="text-accent" />{company.hours}</span>
          </p>
          <p className="flex items-center gap-x-4">
            <a href={`tel:${company.phone.replace(/\s/g, "")}`} className={`link-underline inline-flex items-center gap-1.5 tnum rounded-sm hover:text-accent transition-colors duration-fast ease-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary`}>
              <Phone size={15} weight="light" aria-hidden="true" className="text-accent" />PBX {company.phoneLabel}
            </a>
            <span aria-hidden="true" className="h-3.5 w-px bg-on-primary/25" />
            {/* Text, never a wa.me link: every CTA routes through /cotizar/ so the form is not bypassed. */}
            <span className="inline-flex items-center gap-1.5 tnum"><WhatsappLogo size={15} weight="light" aria-hidden="true" className="text-accent" />WhatsApp {company.whatsappLabel}</span>
          </p>
        </div>
      </div>

      {/* h-0: the sticky pill takes no flow height, so the hero photo runs full-bleed underneath
          it and the nav floats over the image. The hero pays for the clearance with its own
          top padding; every later section simply scrolls under the blurred pill. */}
      <header className="sticky top-0 z-50 h-0 pointer-events-none">
        <div className="mx-auto max-w-site px-3 pt-3 md:px-5 md:pt-4">
          <div
            ref={navRef}
            onMouseLeave={hide}
            className={`pointer-events-auto relative flex items-center justify-between gap-4 rounded-full bg-surface/95 backdrop-blur-sm ring-1 ring-line pl-3 pr-2 py-2 transition-shadow duration-fast ease-premium ${scrolled ? "shadow-2" : "shadow-1"}`}
          >
            <Link href="/" className={`group inline-flex items-center gap-2.5 rounded-full pl-1 pr-2 py-1.5 ${focusRing}`} aria-label={`${company.brand} — inicio`}>
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary-soft text-primary transition-colors duration-fast ease-premium group-hover:bg-primary group-hover:text-on-primary">
                <Warehouse size={20} weight="light" aria-hidden="true" />
              </span>
              <span className="font-display text-lg font-semibold text-primary">
                Storage <span className="text-accent">S.A.S</span>
              </span>
            </Link>

            <nav aria-label="Principal" className="hidden lg:flex items-center gap-1">
              {nav.map((n) => {
                const cols = menus[n.href];
                const isOpen = menu === n.href;
                const current = pathname === n.href;
                return (
                  <div key={n.href} onMouseEnter={() => cols && show(n.href)}>
                    <Link
                      id={`nav-${n.href}`}
                      href={n.href}
                      aria-expanded={cols ? isOpen : undefined}
                      aria-haspopup={cols ? "true" : undefined}
                      aria-current={current ? "page" : undefined}
                      onFocus={() => cols && !suppressFocusOpen.current && show(n.href)}
                      onKeyDown={(e) => {
                        if (!cols || e.key !== "ArrowDown") return;
                        e.preventDefault();
                        show(n.href);
                        requestAnimationFrame(() => navRef.current?.querySelector<HTMLAnchorElement>('[role="region"] a[href]')?.focus());
                      }}
                      onClick={(e) => {
                        if (cols && !isOpen) {
                          e.preventDefault();
                          show(n.href);
                        }
                      }}
                      className={`link-underline inline-flex items-center gap-1 rounded-full px-3.5 py-2.5 text-[14px] font-medium transition-colors duration-fast ease-premium cursor-pointer ${focusRing} ${isOpen || current ? "text-primary" : "text-ink-2 hover:text-primary"}`}
                    >
                      {n.label}
                      {cols && <CaretDown size={12} weight="bold" aria-hidden="true" className={`transition-transform duration-fast ease-premium ${isOpen ? "rotate-180" : ""}`} />}
                    </Link>
                  </div>
                );
              })}
            </nav>

            <div className="hidden md:flex items-center gap-2">
              <Link href={CALC_URL} className={`group inline-flex min-h-11 items-center gap-2 rounded-full px-4 py-2.5 text-[14px] font-semibold text-primary ring-[1.5px] ring-inset ring-primary hover:bg-primary-soft hover:ring-primary-deep transition-[background-color,box-shadow,transform] duration-fast ease-premium active:scale-press cursor-pointer ${focusRing}`}>
                <Calculator size={17} weight="light" aria-hidden="true" className="transition-transform duration-fast ease-premium group-hover:-translate-y-px" />
                Calcular espacio
              </Link>
              <Link href={QUOTE_URL} className={`group inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-[14px] font-semibold text-on-accent shadow-1 hover:bg-accent-deep hover:shadow-brass hover:-translate-y-lift transition-[background-color,box-shadow,transform] duration-fast ease-premium active:translate-y-0 active:scale-press cursor-pointer ${focusRing}`}>
                <FileText size={17} weight="light" aria-hidden="true" className="transition-transform duration-fast ease-premium group-hover:-translate-y-px" />
                Cotizar
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setDrawer((v) => !v)}
              aria-expanded={drawer}
              aria-controls="menu-movil"
              aria-label={drawer ? "Cerrar menú" : "Abrir menú"}
              className={`lg:hidden relative h-11 w-11 rounded-full bg-primary-soft cursor-pointer transition-transform duration-fast ease-premium active:scale-press ${focusRing}`}
            >
              <span className={`absolute left-1/2 top-1/2 h-[1.5px] w-5 -translate-x-1/2 bg-primary transition-transform duration-DEFAULT ease-premium ${drawer ? "rotate-45" : "-translate-y-[4px]"}`} />
              <span className={`absolute left-1/2 top-1/2 h-[1.5px] w-5 -translate-x-1/2 bg-primary transition-transform duration-DEFAULT ease-premium ${drawer ? "-rotate-45" : "translate-y-[4px]"}`} />
            </button>

            <AnimatePresence>
              {menu && menus[menu] && (
                <MegaMenu
                  key={menu}
                  cols={menus[menu]}
                  label={nav.find((n) => n.href === menu)?.label ?? ""}
                  onClose={closeMenu}
                  onHoverIn={() => show(menu)}
                  onHoverOut={hide}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Sibling of the sticky shell so its fixed positioning is never captured. */}
      <AnimatePresence>{drawer && <MobileDrawer onNavigate={() => setDrawer(false)} />}</AnimatePresence>
    </>
  );
}
