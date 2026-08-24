"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { CaretDown, ChatText, Clock, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import { CALC_URL, QUOTE_URL, company, nav } from "@/content/site";
import { btnClass } from "@/components/Button";
import MegaMenu, { focusRing, menus } from "@/components/header/MegaMenu";
import MobileDrawer from "@/components/header/MobileDrawer";

/**
 * Sticky header. Scroll behavior runs on framer's useScroll (no window scroll listener):
 * >24px adds shadow; scrolling down past 140px slides the whole header up by the utility
 * bar's height (transform only, zero layout work, so fast scrolling never jitters), any
 * deliberate scroll up brings it back. Solid bg-surface throughout (no backdrop-blur).
 */
export default function Header() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  // px to slide the header up (= the utility bar's height, measured at event time).
  const [lift, setLift] = useState(0);
  const closeTimer = useRef<number | undefined>(undefined);
  const utilRef = useRef<HTMLParagraphElement>(null);
  const lastY = useRef(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
    // Hysteresis: ignore sub-6px moves (trackpad inertia) so the bar never flaps at a threshold.
    const dy = y - lastY.current;
    if (Math.abs(dy) < 6) return;
    setLift(y > 140 && dy > 0 ? utilRef.current?.offsetHeight ?? 0 : 0);
    lastY.current = y;
  });

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

  // Transform-only collapse: a transformed ancestor would become the containing block for
  // the drawer's fixed positioning, so the drawer lives outside <header>.
  return (
    <>
    <header
      className={`sticky top-0 z-40 border-b border-line bg-surface transition-[transform,box-shadow] duration ease-soft ${scrolled ? "shadow-2" : ""}`}
      style={lift ? { transform: `translateY(-${lift}px)` } : undefined}
    >
      <div className="mx-auto max-w-site px-5 md:px-8 lg:px-10">
        <p ref={utilRef} className="hidden items-center justify-between gap-x-3 border-b border-line py-1.5 text-[13px] text-muted md:flex">
          <span className="flex items-center gap-x-3">
            <span className="inline-flex items-center gap-1.5"><MapPin size={13} weight="regular" aria-hidden="true" />7 sedes en Bogotá</span>
            <span aria-hidden="true">·</span>
            <span className="tnum inline-flex items-center gap-1.5"><Clock size={13} weight="regular" aria-hidden="true" />{company.hours}</span>
          </span>
          <span className="flex items-center gap-x-3">
            <a href={`tel:${company.phone.replace(/\s/g, "")}`} className={`tnum inline-flex items-center gap-1.5 hover:text-ink ${focusRing}`}>
              <Phone size={13} weight="regular" aria-hidden="true" />PBX {company.phoneLabel}
            </a>
            <span aria-hidden="true">·</span>
            <span className="tnum inline-flex items-center gap-1.5"><ChatText size={13} weight="regular" aria-hidden="true" />WhatsApp {company.whatsappLabel}</span>
          </span>
        </p>

        {/* The header (z-40) paints above the drawer (z-[35]), so logo + X stay clickable. */}
        <div className="relative flex items-center justify-between gap-4 py-3" onMouseLeave={hide}>
          <Link href="/" aria-current="page" className={`font-display text-lg font-semibold text-ink cursor-pointer ${focusRing}`} aria-label={`${company.brand}, inicio`}>
            Storage <span className="text-primary">S.A.S</span>
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
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
                    className={`group inline-flex items-center gap-1 rounded-sm px-3 py-2 text-[14px] font-medium text-ink-2 hover:text-ink transition-colors duration-fast ease-soft cursor-pointer ${focusRing} ${isOpen ? "text-primary" : ""}`}
                  >
                    <span className="link-draw">{n.label}</span>
                    {cols && <CaretDown size={12} weight="bold" aria-hidden="true" className={`transition-transform duration-fast ease-soft ${isOpen ? "rotate-180" : ""}`} />}
                  </Link>
                </div>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Link href={CALC_URL} className={btnClass("secondary", "md")}>
              Calcular mi espacio
            </Link>
            <Link href={QUOTE_URL} className={btnClass("primary", "md")}>
              Cotizar
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className={`relative h-11 w-11 cursor-pointer rounded-md border border-line bg-surface lg:hidden ${focusRing}`}
          >
            <span className={`absolute left-1/2 top-1/2 h-[1.5px] w-5 -translate-x-1/2 bg-ink transition-transform duration ease-soft ${open ? "rotate-45" : "-translate-y-[4px]"}`} />
            <span className={`absolute left-1/2 top-1/2 h-[1.5px] w-5 -translate-x-1/2 bg-ink transition-transform duration ease-soft ${open ? "-rotate-45" : "translate-y-[4px]"}`} />
          </button>

          <MegaMenu menu={menu} show={show} hide={hide} close={() => setMenu(null)} />
        </div>
      </div>
    </header>
    <MobileDrawer open={open} close={() => setOpen(false)} />
    </>
  );
}
