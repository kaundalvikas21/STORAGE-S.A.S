import Link from "next/link";
import { ArrowRight, Package, Door, Garage, Ruler } from "@phosphor-icons/react/dist/ssr";
import Reveal, { RevealItem } from "@/components/Reveal";
import { sizes } from "@/content/site";

const icons = [Package, Door, Garage, Ruler];

/** Comparison row: 4 typographic size cards, tabular ranges carry the visual weight. */
export default function SizeStrip() {
  return (
    <section aria-labelledby="sizes-title" className="order-6 border-y border-line bg-surface">
      <div className="mx-auto max-w-site px-5 md:px-8 lg:px-10 py-14 md:py-20 lg:py-24">
        <Reveal>
          <h2 id="sizes-title" className="font-display text-3xl font-semibold text-ink max-w-[20ch]">Minibodegas del tamaño justo</h2>
          <p className="mt-3 text-[15px] text-muted max-w-[52ch]">Bodegas por meses desde 1 m³. Cambias de tamaño cuando tu necesidad cambia.</p>
        </Reveal>

        <Reveal group as="ul" className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" role="list">
          {sizes.map((s, i) => {
            const Icon = icons[i];
            return (
              <RevealItem as="li" key={s.href}>
                <Link
                  href={s.href}
                  className="group flex h-full flex-col rounded-lg border border-line bg-bg p-6 transition-colors duration-fast ease-soft hover:border-muted-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <Icon size={22} weight="regular" aria-hidden="true" className="text-primary" />
                    {s.differential && (
                      <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-[12px] font-medium text-primary-deep">Diferencial</span>
                    )}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-ink break-words">{s.name}</h3>
                  <p className="tnum mt-1 text-2xl font-semibold text-ink">{s.range}</p>
                  <p className="mt-3 text-[14px] text-ink-2">Cabe aprox.: {s.fits}</p>
                  <p className="mt-1 text-[13px] text-muted">{s.hint}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[14px] font-medium text-primary group-hover:text-primary-deep">
                    Ver bodegas <ArrowRight size={14} aria-hidden="true" className="transition-transform duration-fast ease-soft group-hover:translate-x-1" />
                  </span>
                </Link>
              </RevealItem>
            );
          })}
        </Reveal>
        <p className="mt-6 text-[13px] text-muted">Los espacios personalizados son un diferencial de Storage: ningún competidor los ofrece.</p>
      </div>
    </section>
  );
}
