"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { CaretDown, ChatText, Clock, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import MegaMenu from "@/components/header/MegaMenu";
import MobileDrawer from "@/components/header/MobileDrawer";
import { menus } from "@/components/header/menu-data";
import { CALC_URL, QUOTE_URL, company, nav } from "@/content/site";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

export default function Header() {
  const [drawer, setDrawer] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [barH, setBarH] = useState(0);
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);
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

  // Measured after mount, never during render: the bar's height is how far the shell lifts.
  useEffect(() => setBarH(barRef.current?.offsetHeight ?? 0), []);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    if (Math.abs(y - prev) < 6) return; // hysteresis: stops the bar flapping on trackpad jitter
    setHidden(y > barH + 24 && y > prev);
    if (y !== prev) closeMenu();
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
      <header className="sticky top-0 z-50 pointer-events-none">
        {/* The shell lifts by exactly the utility bar's height, so the header box never resizes (no CLS). */}
        <motion.div
          className="mx-auto max-w-site px-3 pt-3 md:px-5 md:pt-4"
          animate={{ y: hidden ? -barH : 0 }}
          transition={reduce ? { duration: 0 } : { duration: 0.15, ease: [0.32, 0.72, 0, 1] }}
        >
          <div ref={barRef} className="pointer-events-auto hidden lg:flex items-center justify-between gap-4 pb-2 px-4 text-[12px] text-muted">
            <p className="flex items-center gap-x-3">
              <span className="inline-flex items-center gap-1.5"><MapPin size={14} weight="light" aria-hidden="true" />7 sedes en Bogotá</span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1.5 tnum"><Clock size={14} weight="light" aria-hidden="true" />{company.hours}</span>
            </p>
            <p className="flex items-center gap-x-3">
              <a href={`tel:${company.phone.replace(/\s/g, "")}`} className={`link-underline inline-flex items-center gap-1.5 tnum hover:text-primary rounded-sm ${focusRing}`}>
                <Phone size={14} weight="light" aria-hidden="true" />PBX {company.phoneLabel}
              </a>
              <span aria-hidden="true">·</span>
              {/* Text, never a wa.me link: every CTA routes through /cotizar/ so the qualifying form is not bypassed. */}
              <span className="inline-flex items-center gap-1.5 tnum"><ChatText size={14} weight="light" aria-hidden="true" />WhatsApp {company.whatsappLabel}</span>
            </p>
          </div>

          <div
            ref={navRef}
            onMouseLeave={hide}
            className={`pointer-events-auto relative flex items-center justify-between gap-4 rounded-full bg-surface/85 backdrop-blur-md ring-1 ring-line pl-5 pr-2 py-2 transition-shadow duration-fast ease-premium ${scrolled ? "shadow-2 ring-line" : "shadow-1"}`}
          >
            <Link href="/" className={`inline-block font-display text-lg font-semibold text-primary cursor-pointer rounded-full px-1 py-2 ${focusRing}`} aria-label={`${company.brand} — inicio`}>
              Storage <span className="text-accent">S.A.S</span>
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
                      className={`link-underline inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[14px] font-medium transition-colors duration-fast ease-premium cursor-pointer ${focusRing} ${isOpen || current ? "text-primary" : "text-ink-2 hover:text-primary"}`}
                    >
                      {n.label}
                      {cols && <CaretDown size={12} weight="bold" aria-hidden="true" className={`transition-transform duration-fast ease-premium ${isOpen ? "rotate-180" : ""}`} />}
                    </Link>
                  </div>
                );
              })}
            </nav>

            <div className="hidden md:flex items-center gap-2">
              <Link href={CALC_URL} className={`rounded-full px-4 py-2.5 text-[14px] font-semibold text-primary ring-[1.5px] ring-inset ring-primary hover:bg-primary-soft hover:ring-primary-deep transition-[background-color,box-shadow,transform] duration-fast ease-premium active:scale-press cursor-pointer ${focusRing}`}>
                Calcular espacio
              </Link>
              <Link href={QUOTE_URL} className={`rounded-full bg-accent px-4 py-2.5 text-[14px] font-semibold text-on-accent shadow-1 hover:bg-accent-deep hover:shadow-brass hover:-translate-y-lift transition-[background-color,box-shadow,transform] duration-fast ease-premium active:translate-y-0 active:scale-press cursor-pointer ${focusRing}`}>
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
        </motion.div>
      </header>

      {/* Sibling, not a child: the shell above animates with a transform. */}
      <AnimatePresence>{drawer && <MobileDrawer onNavigate={() => setDrawer(false)} />}</AnimatePresence>
    </>
  );
}
