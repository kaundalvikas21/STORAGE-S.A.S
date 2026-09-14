"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { SEDES_URL, footerCols, nav, needs, sedePages, sizes } from "@/content/site";
import { snap } from "@/lib/motion";

type Col = {
  title: string;
  /** Wireframe: "Por sede" is the priority-styled column (accent border/background). */
  priority?: boolean;
  items: { label: string; href: string; badge?: string }[];
  more?: { label: string; href: string };
};

/* Dropdown contents, all derived from content/site.ts (Autopista Norte first by array order). */
export const menus: Record<string, Col[]> = {
  "/bodegaje-bogota/": [
    { title: "Por tamaño", items: sizes.map((s) => ({ label: s.name, href: s.href })) },
    { title: "Por necesidad", items: needs },
    {
      title: "Por sede",
      priority: true,
      items: sedePages.map((s) => ({ label: s.name, href: `/sedes/${s.slug}/`, badge: s.badge })),
      more: { label: "Ver las 7 sedes", href: SEDES_URL },
    },
  ],
  [SEDES_URL]: [
    {
      title: "Sedes en Bogotá",
      items: sedePages.map((s) => ({ label: s.name.includes(s.zone) ? s.name : `${s.name} · ${s.zone}`, href: `/sedes/${s.slug}/`, badge: s.badge })),
      more: { label: "Ver las 7 sedes", href: SEDES_URL },
    },
  ],
  "/mudanzas-bogota/": [{ title: "Mudanzas", items: footerCols.mudanzas }],
  "/quienes-somos/": [{ title: "Empresa", items: footerCols.empresa }],
};

export const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

type Props = { menu: string | null; show: (href: string) => void; hide: () => void; close: () => void };

/** Desktop mega-menu panel (lg+). Opens on hover/focus from Header's nav triggers. */
export default function MegaMenu({ menu, show, hide, close }: Props) {
  const reduce = useReducedMotion();
  const t = reduce ? { duration: 0 } : snap;
  return (
    <AnimatePresence>
      {menu && menus[menu] && (
        <motion.div
          key={menu}
          role="region"
          aria-label={`Submenú ${nav.find((n) => n.href === menu)?.label}`}
          className="absolute left-0 right-0 top-full hidden lg:block rounded-b-xl border border-line bg-surface shadow-3"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={t}
          onMouseEnter={() => show(menu)}
          onMouseLeave={hide}
        >
          <div className={`p-6 grid gap-6 ${menus[menu].length === 3 ? "grid-cols-3" : "grid-cols-1"}`}>
            {menus[menu].map((col) => (
              <div key={col.title} className={col.priority ? "rounded-md border border-accent-deep/40 bg-accent-soft px-4 py-3" : ""}>
                <p className="eyebrow border-b border-line pb-2 mb-3">{col.title}</p>
                <ul className={menus[menu].length === 1 ? "grid grid-cols-2 gap-x-8" : ""}>
                  {col.items.map((it) => (
                    <li key={it.href}>
                      <Link
                        href={it.href}
                        onClick={close}
                        className={`flex items-center gap-2 rounded-[4px] px-2 py-1.5 text-[14px] text-ink-2 hover:bg-bg hover:text-ink transition-colors duration-fast ease-soft cursor-pointer ${focusRing}`}
                      >
                        {it.label}
                        {it.badge && <span className="rounded-full bg-accent px-2 py-0.5 text-[11px] font-medium text-on-accent">{it.badge}</span>}
                      </Link>
                    </li>
                  ))}
                </ul>
                {col.more && (
                  <Link
                    href={col.more.href}
                    onClick={close}
                    className={`group mt-3 inline-flex items-center gap-1.5 px-2 text-[13px] font-medium text-primary hover:text-primary-deep cursor-pointer ${focusRing}`}
                  >
                    <span className="link-draw">{col.more.label}</span> <ArrowRight size={14} weight="bold" aria-hidden="true" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
