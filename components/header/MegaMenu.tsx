"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkle } from "@phosphor-icons/react/dist/ssr";
import { spring } from "@/lib/motion";
import type { MenuCol } from "./menu-data";

type Props = {
  cols: MenuCol[];
  label: string;
  onClose: () => void;
  onHoverIn: () => void;
  onHoverOut: () => void;
};

const link =
  "link-underline block w-fit rounded-sm px-2 py-1.5 text-[14px] text-ink-2 hover:text-primary transition-colors duration-fast ease-premium cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface";

/** Arrow keys walk the panel's links; Escape is handled by the parent so focus returns to the trigger. */
function roving(e: React.KeyboardEvent<HTMLDivElement>, root: HTMLElement | null) {
  if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
  const items = Array.from(root?.querySelectorAll<HTMLAnchorElement>("a[href]") ?? []);
  if (!items.length) return;
  e.preventDefault();
  const i = items.indexOf(document.activeElement as HTMLAnchorElement);
  const next = e.key === "ArrowDown" ? i + 1 : i - 1;
  items[(next + items.length) % items.length].focus();
}

export default function MegaMenu({ cols, label, onClose, onHoverIn, onHoverOut }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      role="region"
      aria-label={`Submenú ${label}`}
      className="absolute left-0 right-0 top-full mt-3 hidden lg:block rounded-xl bg-bg-deep ring-1 ring-line p-1.5 shadow-3"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={reduce ? { duration: 0 } : spring}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
      onKeyDown={(e) => roving(e, ref.current)}
    >
      <div className={`rounded-xl-inner bg-surface shadow-inset p-6 grid gap-6 ${cols.length === 3 ? "grid-cols-3" : "grid-cols-1"}`}>
        {cols.map((col) => (
          <div key={col.title} className={col.priority ? "rounded-lg bg-accent-soft/60 ring-1 ring-accent/35 p-4 -m-1" : ""}>
            <p className="eyebrow mb-3">{col.title}</p>
            <ul className={cols.length === 1 ? "grid grid-cols-2 gap-x-8" : ""}>
              {col.items.map((it) => (
                <li key={it.href}>
                  <Link href={it.href} onClick={onClose} className={link}>
                    <span className="inline-flex items-center gap-2">
                      {it.label}
                      {it.badge && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-on-accent">
                          <Sparkle size={10} weight="fill" aria-hidden="true" />
                          {it.badge}
                        </span>
                      )}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            {col.more && (
              <Link href={col.more.href} onClick={onClose} className={`${link} mt-3 font-semibold text-primary`}>
                <span className="inline-flex items-center gap-1.5">
                  {col.more.label} <ArrowRight size={14} weight="bold" aria-hidden="true" />
                </span>
              </Link>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
