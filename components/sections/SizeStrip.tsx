import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Photo from "@/components/Photo";
import Reveal, { RevealItem, RevealStagger } from "@/components/motion/Reveal";
import { sizes } from "@/content/site";

/**
 * Four size tiers as illustration-first cards. Each card opens with a wide "well" that blends
 * the transparent PNG into the paper palette (cream to deep cream; the differential tier gets
 * a primary-soft flush), then the ledger data underneath: name, range, what fits.
 */
export default function SizeStrip() {
  return (
    <section aria-labelledby="sizes-title" className="order-6 border-y-[1.5px] border-ink bg-bg-deep/60">
      <div className="mx-auto max-w-site px-5 md:px-8 lg:px-10 py-14 md:py-20 lg:py-24">
        <Reveal>
          <h2 id="sizes-title" className="font-display text-3xl font-bold uppercase text-ink max-w-[18ch]">Minibodegas del tamaño justo</h2>
          <p className="mt-3 text-[15px] text-muted max-w-[52ch]">Bodegas por meses desde 1 m³. Cambias de tamaño cuando tu necesidad cambia.</p>
        </Reveal>

        <RevealStagger as="ul" className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5" role="list">
          {sizes.map((s) => (
            <RevealItem as="li" key={s.href} className="flex">
              <Link
                href={s.href}
                className="group flex w-full flex-col border-[1.5px] border-ink bg-surface transition-[transform,box-shadow] duration-fast ease-soft hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
              >
                <div
                  className={`relative border-b-[1.5px] border-ink bg-gradient-to-b ${
                    s.differential ? "from-primary-soft via-primary-soft/40 to-surface" : "from-surface via-bg to-bg-deep"
                  }`}
                >
                  <div className="p-[7%]">
                    <Photo slot={s.img} className="relative aspect-[5/4] w-full" sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw" contain scrim="none" />
                  </div>
                  {s.differential && (
                    <span className="absolute left-3 top-3 border-[1.5px] border-ink bg-primary px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.08em] text-on-primary">
                      Diferencial
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="min-w-0 font-display text-xl lg:text-[clamp(1.05rem,1.6vw,1.5rem)] leading-tight font-bold uppercase text-ink group-hover:text-primary-deep transition-colors duration-fast ease-soft">{s.name}</h3>
                    <ArrowUpRight size={20} weight="bold" aria-hidden="true" className="mt-1 shrink-0 text-ink transition-transform duration-fast ease-soft group-hover:text-primary-deep group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                  <span className="mt-1 font-mono text-lg font-bold tnum text-ink">{s.range}</span>
                  <p className="mt-2 text-[14px] text-ink-2">{s.fits}</p>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
