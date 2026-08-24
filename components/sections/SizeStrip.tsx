import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Reveal, { RevealItem } from "@/components/Reveal";
import { sizes } from "@/content/site";

/** Ledger rows: one data-table row per size, single hairline between rows. */
export default function SizeStrip() {
  return (
    <section aria-labelledby="sizes-title" className="order-6 border-y-[1.5px] border-ink bg-bg-deep/60">
      <div className="mx-auto max-w-site px-5 md:px-8 lg:px-10 py-14 md:py-20 lg:py-24">
        <Reveal>
          <h2 id="sizes-title" className="font-display text-3xl font-bold uppercase text-ink max-w-[18ch]">Minibodegas del tamaño justo</h2>
          <p className="mt-3 text-[15px] text-muted max-w-[52ch]">Bodegas por meses desde 1 m³. Cambias de tamaño cuando tu necesidad cambia.</p>
        </Reveal>

        <Reveal group as="ul" className="mt-8 border-[1.5px] border-ink bg-surface" role="list">
          {sizes.map((s, i) => (
            <RevealItem as="li" key={s.href} className={i > 0 ? "border-t border-line" : ""}>
              <Link
                href={s.href}
                className="group grid gap-3 p-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-8 md:px-7 hover:bg-bg-deep transition-colors duration-fast ease-soft cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-xl md:text-2xl font-bold uppercase text-ink break-words">{s.name}</h3>
                    {s.differential && (
                      <span className="border-[1.5px] border-ink bg-primary px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-on-primary">
                        Diferencial · Nadie más lo ofrece
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 text-[14px] text-ink-2 max-w-[60ch]">{s.fits}</p>
                </div>
                <div className="flex items-center gap-5 md:gap-6">
                  <span className="font-mono text-xl md:text-2xl font-bold tnum text-ink">{s.range}</span>
                  <ArrowUpRight size={20} weight="bold" aria-hidden="true" className="text-ink transition-colors duration-fast ease-soft group-hover:text-primary-deep" />
                </div>
              </Link>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
