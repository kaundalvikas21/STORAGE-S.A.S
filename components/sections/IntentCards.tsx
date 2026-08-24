"use client";
import { ArrowRight, Armchair, Bed, Buildings, Package } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import Reveal, { RevealItem } from "@/components/Reveal";
import { CALC_URL, intentCards } from "@/content/site";
import { profileFor, setM3, useM3 } from "@/lib/calc-store";

const icons = { cajas: Package, apartaestudio: Bed, apartamento: Armchair, empresa: Buildings } as const;

/**
 * Interactive moment 2: calculator entry. Selecting a cell pushes its preset into
 * the shared store, so the hero visualizer above visibly morphs to that intent.
 */
export default function IntentCards() {
  const selected = profileFor(useM3()).id;
  return (
    <section aria-labelledby="intent-title" className="order-2">
      <div className="mx-auto max-w-site px-5 pb-14 md:px-8 md:pb-16 lg:px-10">
        <h2 id="intent-title" className="sr-only">
          Entrada a la calculadora de espacio
        </h2>
        <Reveal as="ul" group className="grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4">
          {intentCards.map((card) => {
            const Icon = icons[card.id];
            const active = selected === card.id;
            return (
              <RevealItem as="li" key={card.id}>
                <button
                  type="button"
                  onClick={() => setM3(card.m3)}
                  aria-pressed={active}
                  className={`group flex min-h-[44px] w-full cursor-pointer flex-col items-start gap-2 rounded-lg border p-5 text-left transition-all duration ease-soft active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring md:p-6 ${
                    active
                      ? "border-primary bg-primary-soft shadow-2"
                      : "border-line bg-surface shadow-1 hover:-translate-y-0.5 hover:shadow-2"
                  }`}
                >
                  <Icon size={24} aria-hidden className={active ? "text-primary" : "text-muted"} />
                  <span className="font-display font-semibold text-ink">{card.title}</span>
                  <span className="tnum text-sm text-muted">{card.range}</span>
                  <span className="text-sm text-muted-2">{card.hint}</span>
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
