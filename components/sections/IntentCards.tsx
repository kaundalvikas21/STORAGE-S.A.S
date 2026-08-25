"use client";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import Reveal, { RevealItem } from "@/components/Reveal";
import IsoBox, { type Item } from "@/components/sections/IsoBox";
import { CALC_URL, intentCards } from "@/content/site";
import { profileFor, setM3, useM3 } from "@/lib/calc-store";

/** What sits inside each unit, mirroring the card's hint copy: cajas → two boxes;
 *  apartaestudio → bed + nevera; apartamento → sofá + mesa + caja; empresa → estibas apiladas.
 *  Each entry is [x, y, w, d, h] in the unit's own space (unit floor spans x 10-62, y 28-56). */
const contents = {
  cajas: [[30, 50, 8, 8, 8], [40, 46, 7, 7, 7]],
  apartaestudio: [[22, 50, 16, 9, 5], [44, 46, 7, 7, 16]],
  apartamento: [[20, 51, 13, 7, 7], [36, 51, 9, 9, 5], [45, 43, 6, 6, 6]],
  empresa: [[24, 51, 10, 10, 8], [24, 43, 10, 10, 8], [36, 46, 10, 10, 8], [36, 38, 10, 10, 8]],
} as const satisfies Record<string, readonly Item[]>;

const scale = { cajas: 0.55, apartaestudio: 0.7, apartamento: 0.85, empresa: 1 } as const;

/**
 * Calculator entry: four volume tiers as a size ladder. Selecting a cell pushes its preset
 * into the calc store, which drives the pressed state and pre-fills the calculator deep link.
 * The m³ range is the primary figure on each card; the open iso unit grows with it and
 * holds the contents the hint copy names, so the picture and the words agree.
 */
export default function IntentCards() {
  const selected = profileFor(useM3()).id;
  return (
    <section aria-labelledby="intent-title" className="order-2">
      <div className="mx-auto max-w-site px-5 py-14 md:px-8 md:py-20 lg:px-10 lg:py-24">
        <h2 id="intent-title" className="sr-only">
          Entrada a la calculadora de espacio
        </h2>
        <Reveal as="ul" group className="grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4">
          {intentCards.map((card) => {
            const active = selected === card.id;
            return (
              <RevealItem as="li" key={card.id}>
                <button
                  type="button"
                  onClick={() => setM3(card.m3)}
                  aria-pressed={active}
                  className={`group flex h-full min-h-[44px] w-full cursor-pointer flex-col items-start rounded-lg border p-5 text-left transition-all duration ease-soft active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring md:p-6 ${
                    active
                      ? "border-primary bg-primary-soft shadow-2"
                      : "border-line bg-surface shadow-1 hover:-translate-y-0.5 hover:border-muted-2 hover:shadow-2"
                  }`}
                >
                  <span className="flex w-full flex-col items-start gap-2 md:flex-row md:items-end md:justify-between md:gap-3">
                    <IsoBox items={contents[card.id]} k={scale[card.id]} active={active} />
                    <span className={`tnum whitespace-nowrap font-display text-2xl font-semibold leading-none ${active ? "text-primary-deep" : "text-ink"}`}>{card.range}</span>
                  </span>
                  <span className="mt-4 font-semibold text-ink">{card.title}</span>
                  <span className="mt-1 text-sm text-muted-2">{card.hint}</span>
                </button>
              </RevealItem>
            );
          })}
        </Reveal>
        <Link
          href={`${CALC_URL}?perfil=${selected}`}
          className="group mt-5 inline-flex min-h-[44px] items-center gap-1.5 rounded-sm text-sm font-medium text-primary hover:text-primary-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <span className="link-draw">Ir a la calculadora</span>
          <ArrowRight size={16} aria-hidden className="transition-transform duration-fast ease-soft group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
