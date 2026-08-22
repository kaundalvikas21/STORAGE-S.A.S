import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkle } from "@phosphor-icons/react/dist/ssr";
import Reveal, { RevealItem } from "@/components/Reveal";
import { SEDES_URL, sedes } from "@/content/site";

export default function SedeGrid() {
  return (
    <section aria-labelledby="sedes-title" className="order-5">
      <div className="mx-auto max-w-site px-5 md:px-8 lg:px-10 py-20 md:py-28 lg:py-36">
        <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-3">7 sedes en Bogotá</p>
            <h2 id="sedes-title" className="font-display text-3xl font-semibold text-ink max-w-[18ch]">Una bodega cerca de donde estás</h2>
          </div>
          <Link href={SEDES_URL} className="inline-flex items-center gap-2 text-[15px] font-semibold text-primary cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Ver las 7 sedes <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </Link>
        </Reveal>

        {/* Order comes from content/site.ts — Calle 197 first, by commercial rule. */}
        <Reveal group as="ul" className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" role="list">
          {sedes.map((s) => (
            <RevealItem as="li" key={s.slug} className="sede-card">
              <Link href={`/sedes/${s.slug}/`} className="group block h-full rounded-xl bg-bg-deep ring-1 ring-line p-1.5 cursor-pointer transition-[transform,box-shadow] duration-DEFAULT ease-soft hover:-translate-y-0.5 hover:shadow-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <div className="h-full rounded-xl-inner bg-surface shadow-inset overflow-hidden flex flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={s.image}
                      alt={s.alt}
                      fill
                      sizes="(min-width: 1024px) 290px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-slow ease-soft group-hover:scale-[1.03]"
                    />
                    {s.badge && (
                      <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-on-accent shadow-1">
                        <Sparkle size={12} weight="fill" aria-hidden="true" />
                        {s.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-5 flex flex-col gap-2">
                    <h3 className="font-display text-xl font-semibold text-ink">{s.name}</h3>
                    <span className="inline-flex w-fit rounded-full bg-primary-soft px-3 py-1 text-[12px] font-medium text-primary">{s.zone}</span>
                    <p className="text-[13px] text-muted leading-snug">{s.coverage}</p>
                  </div>
                </div>
              </Link>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
