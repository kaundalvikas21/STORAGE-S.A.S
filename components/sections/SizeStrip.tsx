import Link from "next/link";
import { ArrowUpRight, Star } from "@phosphor-icons/react/dist/ssr";
import Photo from "@/components/Photo";
import Reveal, { RevealItem } from "@/components/Reveal";
import { sizePhotos } from "@/content/images";
import { sizes } from "@/content/site";

const card =
  "group flex h-full flex-col overflow-hidden rounded-lg cursor-pointer transition-[transform,box-shadow] duration-DEFAULT ease-premium hover:-translate-y-lift hover:shadow-2 active:translate-y-0 active:scale-press focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

export default function SizeStrip() {
  return (
    <section aria-labelledby="sizes-title" className="order-6 bg-bg-deep/60">
      <div className="mx-auto max-w-site px-5 md:px-8 lg:px-10 py-20 md:py-28 lg:py-36">
        <Reveal>
          <p className="eyebrow mb-3">Por tamaño</p>
          <h2 id="sizes-title" className="font-display text-3xl font-semibold text-ink max-w-[18ch]">Minibodegas del tamaño justo</h2>
          <p className="mt-3 text-[15px] text-muted max-w-[52ch]">Bodegas por meses desde 1 m³. Cambias de tamaño cuando tu necesidad cambia.</p>
        </Reveal>

        {/* "Personalizados" is the dark differential cell: photo-less on purpose, so the row
            never reads as four identical cards (MASTER.md §8.5). */}
        <Reveal group as="ul" className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" role="list">
          {sizes.map((s) => {
            const img = sizePhotos[s.href];
            return (
              <RevealItem as="li" key={s.href}>
                <Link href={s.href} className={`${card} ${s.differential ? "bg-primary text-on-primary shadow-1" : "bg-surface ring-1 ring-line shadow-1"}`}>
                  {img && <Photo img={img} sizes="(min-width: 1024px) 290px, (min-width: 640px) 50vw, 100vw" className="aspect-[16/10]" />}
                  <div className="flex flex-1 flex-col p-5 md:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h3 className={`font-display text-xl font-semibold break-words ${s.differential ? "text-on-primary" : "text-ink"}`}>{s.name}</h3>
                      {s.differential && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-[0.14em] text-on-accent">
                          <Star size={11} weight="fill" aria-hidden="true" /> Diferencial
                        </span>
                      )}
                    </div>
                    <p className={`tnum mt-3 text-2xl font-semibold ${s.differential ? "text-accent" : "text-primary"}`}>{s.range}</p>
                    <p className={`mt-2 text-[14px] ${s.differential ? "text-on-primary/85" : "text-ink-2"}`}>{s.fits}</p>
                    <span className={`mt-auto pt-5 inline-flex items-center gap-2 text-[14px] font-semibold ${s.differential ? "text-on-primary" : "text-primary"}`}>
                      Ver {s.name.toLowerCase()}
                      <span className={`flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-DEFAULT ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-px ${s.differential ? "bg-on-primary/15" : "bg-primary/10"}`}>
                        <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
                      </span>
                    </span>
                  </div>
                </Link>
              </RevealItem>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
