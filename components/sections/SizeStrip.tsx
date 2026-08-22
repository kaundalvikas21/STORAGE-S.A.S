import Link from "next/link";
import { ArrowUpRight, Star } from "@phosphor-icons/react/dist/ssr";
import Reveal, { RevealItem } from "@/components/Reveal";
import { sizes } from "@/content/site";

export default function SizeStrip() {
  return (
    <section aria-labelledby="sizes-title" className="order-6 bg-bg-deep/60">
      <div className="mx-auto max-w-site px-5 md:px-8 lg:px-10 py-20 md:py-28 lg:py-36">
        <Reveal>
          <p className="eyebrow mb-3">Por tamaño</p>
          <h2 id="sizes-title" className="font-display text-3xl font-semibold text-ink max-w-[18ch]">Minibodegas del tamaño justo</h2>
          <p className="mt-3 text-[15px] text-muted max-w-[52ch]">Bodegas por meses desde 1 m³. Cambias de tamaño cuando tu necesidad cambia.</p>
        </Reveal>

        <Reveal group as="ul" className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" role="list">
          {sizes.map((s) => (
            <RevealItem as="li" key={s.href}>
              <Link href={s.href} className={`group block h-full rounded-lg p-5 md:p-6 cursor-pointer transition-[transform,box-shadow] duration-DEFAULT ease-soft hover:-translate-y-0.5 hover:shadow-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${s.differential ? "bg-primary text-on-primary shadow-1" : "bg-surface ring-1 ring-line shadow-1"}`}>
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h3 className={`font-display text-xl font-semibold break-words ${s.differential ? "text-on-primary" : "text-ink"}`}>{s.name}</h3>
                  {s.differential && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-[0.14em] text-on-accent">
                      <Star size={11} weight="fill" aria-hidden="true" /> Diferencial
                    </span>
                  )}
                </div>
                <p className={`tnum mt-3 text-2xl font-semibold ${s.differential ? "text-accent" : "text-primary"}`}>{s.range}</p>
                <p className={`mt-2 text-[14px] ${s.differential ? "text-on-primary/80" : "text-ink-2"}`}>{s.fits}</p>
                <span className={`mt-5 inline-flex items-center gap-2 text-[14px] font-semibold ${s.differential ? "text-on-primary" : "text-primary"}`}>
                  Ver {s.name.toLowerCase()}
                  <span className={`flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-DEFAULT ease-soft group-hover:translate-x-0.5 group-hover:-translate-y-px ${s.differential ? "bg-on-primary/15" : "bg-primary/10"}`}>
                    <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
                  </span>
                </span>
              </Link>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
