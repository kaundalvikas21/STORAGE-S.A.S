"use client";

import { useState } from "react";
import { Minus, Plus } from "@phosphor-icons/react/dist/ssr";
import Button from "@/components/Button";
import { QUOTE_URL, sizes } from "@/content/facts";
import { calcPage as t } from "@/content/conversion";
import { ITEMS, computeTotal, mapToBand, type Counts } from "@/lib/calculator";

const fmt = (n: number) => n.toLocaleString("es-CO", { maximumFractionDigits: 2 });
const roomId = (room: string) => `sala-${room.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase()}`;
// scroll-mb-40: a focused stepper scrolled into view never hides under the sticky total bar.
const step =
  "flex h-11 w-11 scroll-mb-40 cursor-pointer items-center justify-center rounded-md border border-line bg-surface text-ink transition-colors duration-fast ease-soft hover:border-ink aria-disabled:cursor-not-allowed aria-disabled:opacity-40 aria-disabled:hover:border-line focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

/**
 * Space calculator tool (spec T7): items grouped by room, − count + steppers, each item's m³ always
 * visible (transparency, no hover-only detail). Math lives in lib/calculator.ts. Server-renders
 * complete at zero so the page reads before hydration; state is in-page only (no storage). The
 * total bar (the page's one dark cell) is `sticky` to the bottom of the tool, above the mobile
 * sticky bar below md, and hands the band off to /cotizar/?tamano=.
 */
export default function Calculator() {
  const [counts, setCounts] = useState<Counts>({});
  const total = computeTotal(counts);
  const band = mapToBand(total, sizes);
  const bump = (id: string, d: number) => setCounts((c) => ({ ...c, [id]: Math.max(0, (c[id] ?? 0) + d) }));

  return (
    <div>
      {/* CSS columns, not a grid: 7 rooms of uneven length pack without an empty cell. */}
      <div className="gap-5 md:columns-2">
        {Object.entries(ITEMS).map(([room, items]) => (
          <section key={room} aria-labelledby={roomId(room)} className="mb-5 break-inside-avoid rounded-lg border border-line bg-surface p-5 shadow-1 md:p-6">
            <h2 id={roomId(room)} className="font-display text-2xl font-semibold text-ink">{room}</h2>
            <ul className="mt-3 grid gap-1">
              {items.map((it) => {
                const n = counts[it.id] ?? 0;
                return (
                  <li key={it.id} className="flex items-center justify-between gap-4 py-1.5">
                    <span className="min-w-0">
                      <span className="block text-[15px] text-ink">{it.name}</span>
                      <span className="tnum block text-[13px] text-ink-2">≈ {fmt(it.m3)} m³ cada uno</span>
                    </span>
                    <span className="flex shrink-0 items-center gap-1">
                      <button type="button" onClick={() => bump(it.id, -1)} aria-disabled={n === 0} aria-label={`Quitar: ${it.name}`} className={step}>
                        <Minus size={16} weight="bold" aria-hidden="true" />
                      </button>
                      <output aria-live="polite" className="tnum w-8 text-center text-[16px] font-semibold text-ink">
                        <span className="sr-only">{it.name}: </span>
                        {n}
                      </output>
                      <button type="button" onClick={() => bump(it.id, 1)} aria-label={`Agregar: ${it.name}`} className={step}>
                        <Plus size={16} weight="bold" aria-hidden="true" />
                      </button>
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      <div className="sticky bottom-[calc(env(safe-area-inset-bottom)+4.5rem)] z-20 md:bottom-4">
        {/* pr-20/md:pr-24: clear the fixed WhatsApp bubble column so it never covers the total or CTA. */}
        <div className="dark-cell flex flex-wrap items-center justify-between gap-x-6 gap-y-3 rounded-lg p-4 pr-20 shadow-3 md:p-6 md:pr-24">
          <div aria-live="polite" className="min-w-0">
            {band ? (
              <p className="text-[15px] text-muted">
                {t.total} <span className="tnum font-display text-2xl font-semibold text-ink">{fmt(total)} m³</span>{" "}
                <span aria-hidden="true">→</span> <span className="font-semibold text-accent">{t.band} {band.label}</span>
              </p>
            ) : (
              <p className="text-[15px] text-ink">{t.empty}</p>
            )}
            <p className="mt-1 hidden text-[13px] text-muted md:block">{t.availability}</p>
          </div>
          <Button href={band ? `${QUOTE_URL}?tamano=${band.id}` : QUOTE_URL} intent="cotizar" className="shrink-0">
            {t.cta}
          </Button>
        </div>
      </div>
    </div>
  );
}
