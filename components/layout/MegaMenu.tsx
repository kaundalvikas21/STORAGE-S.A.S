"use client";

import Link from "next/link";
import { useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { MenuColumn, NavItem } from "@/content/menus";
import { fade } from "@/lib/motion";

type Props = { item: NavItem; open: boolean; onClose: () => void; onEnter: () => void; onLeave: () => void };

const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const itemCls = `flex items-center gap-2 rounded-[4px] px-2 py-1.5 text-[14px] text-ink-2 transition-colors duration-fast ease-premium hover:bg-surface hover:text-ink cursor-pointer ${focusRing}`;

/** Desktop dropdown / mega-menu panel: 150ms fade+rise, arrow-key roving focus. Escape + outside click live in Header. */
export default function MegaMenu({ item, open, onClose, onEnter, onLeave }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const wide = (item.columns?.length ?? 0) > 1;

  const onKeyDown = (e: React.KeyboardEvent) => {
    const links = Array.from(ref.current?.querySelectorAll<HTMLElement>("a") ?? []);
    const i = links.indexOf(document.activeElement as HTMLElement);
    const go = (n: number) => {
      e.preventDefault();
      links[(n + links.length) % links.length]?.focus();
    };
    if (e.key === "ArrowDown") go(i + 1);
    else if (e.key === "ArrowUp") go(i - 1);
    else if (e.key === "Home") go(0);
    else if (e.key === "End") go(links.length - 1);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          id={`menu-${item.label}`}
          role="region"
          aria-label={`Submenú ${item.label}`}
          onKeyDown={onKeyDown}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          className={`absolute top-full z-50 hidden rounded-b-xl border border-line bg-bg shadow-3 lg:block ${wide ? "inset-x-0" : "min-w-[280px]"}`}
          initial={{ opacity: 0, y: reduce ? 0 : 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduce ? 0 : 4 }}
          transition={reduce ? fade : { duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={`grid gap-6 p-5 ${wide ? "grid-cols-3 p-6" : "grid-cols-1"}`}>
            {item.columns?.map((col) => (
              <Column key={col.title} col={col} onClose={onClose} />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Column({ col, onClose }: { col: MenuColumn; onClose: () => void }) {
  return (
    <div className={col.priority ? "-m-2 rounded-lg border border-primary/20 bg-primary-soft p-4" : ""}>
      <p className="eyebrow mb-3 border-b border-line pb-2">{col.title}</p>
      <ul>
        {col.items.map((it) => (
          <li key={it.href}>
            <Link href={it.href} onClick={onClose} className={itemCls}>
              {it.label}
              {it.badge && <span className="rounded-full bg-primary px-2 py-0.5 text-[11px] font-medium text-on-primary">{it.badge}</span>}
            </Link>
          </li>
        ))}
      </ul>
      {col.more && (
        <Link href={col.more.href} onClick={onClose} className={`group mt-3 inline-flex items-center gap-1.5 px-2 text-[13px] font-medium text-primary hover:text-primary-deep cursor-pointer ${focusRing} rounded-[2px]`}>
          <span className="link-draw">{col.more.label}</span>
          <ArrowRight size={14} weight="bold" aria-hidden="true" className="transition-transform duration-fast ease-premium group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
