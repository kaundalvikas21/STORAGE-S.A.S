"use client";

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { motion, useReducedMotion } from "framer-motion";
import { snap } from "@/lib/motion";
import type { MenuCol } from "./menus";

const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

/** Desktop dropdown panel. Fades + rises 150ms; Escape and outside click are handled by Header. */
export default function MegaMenu({
  cols,
  label,
  onNavigate,
  onEnter,
  onLeave,
}: {
  cols: MenuCol[];
  label: string;
  onNavigate: () => void;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      role="region"
      aria-label={`Submenú ${label}`}
      className="absolute left-0 right-0 top-full hidden lg:block border-[1.5px] border-ink bg-bg shadow-2"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={reduce ? { duration: 0 } : snap}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className={`grid gap-px bg-ink ${cols.length === 3 ? "grid-cols-3" : "grid-cols-1"}`}>
        {cols.map((col) => (
          <div key={col.title} className={`p-6 ${col.priority ? "bg-primary-soft" : "bg-bg"}`}>
            <p className={`eyebrow border-b pb-2 mb-3 ${col.priority ? "border-primary text-primary-deep" : "border-line"}`}>{col.title}</p>
            <ul className={cols.length === 1 ? "grid grid-cols-2 gap-x-8" : ""}>
              {col.items.map((it) => (
                <li key={it.href}>
                  <Link
                    href={it.href}
                    onClick={onNavigate}
                    className={`flex items-center gap-2 px-2 py-1.5 text-[14px] text-ink-2 hover:bg-ink hover:text-bg transition-colors duration-fast ease-soft cursor-pointer ${focusRing}`}
                  >
                    {it.label}
                    {it.badge && (
                      <span className="border-[1.5px] border-ink bg-primary px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-on-primary">
                        {it.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
            {col.more && (
              <Link
                href={col.more.href}
                onClick={onNavigate}
                className={`link-draw mt-3 inline-flex items-center gap-1.5 px-2 font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-primary-deep cursor-pointer ${focusRing}`}
              >
                {col.more.label} <ArrowRight size={14} weight="bold" aria-hidden="true" />
              </Link>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
