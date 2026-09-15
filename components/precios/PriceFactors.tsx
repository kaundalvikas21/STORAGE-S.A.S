import { CalendarBlank, MapPin, Package, Ruler } from "@phosphor-icons/react/dist/ssr";
import Reveal, { RevealItem } from "@/components/Reveal";
import { preciosPage, type FactorId } from "@/content/site";

const t = preciosPage.factors;
const icons = { tamano: Ruler, sede: MapPin, permanencia: CalendarBlank, servicios: Package } satisfies Record<FactorId, unknown>;

/** /precios/ block 2 (spec T6): what moves the price. A full-width white band with the four factors as
 *  a 2×2 list (one column on phones), not four cards. */
export default function PriceFactors() {
  return (
    <section aria-labelledby="factors-title" className="border-y border-line bg-surface">
      <div className="mx-auto max-w-site px-5 py-14 md:px-8 md:py-20 lg:px-10">
        <Reveal>
          <h2 id="factors-title" className="font-display text-3xl font-semibold text-ink">{t.title}</h2>
        </Reveal>
        <Reveal group as="ul" role="list" className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2">
          {t.items.map((f) => {
            const Icon = icons[f.id];
            return (
              <RevealItem as="li" key={f.id} className="flex items-start gap-4">
                <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary">
                  <Icon size={24} />
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-ink">{f.title}</h3>
                  <p className="mt-1 max-w-[44ch] text-[15px] leading-relaxed text-ink-2">{f.body}</p>
                </div>
              </RevealItem>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
