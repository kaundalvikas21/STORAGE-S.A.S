import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Reveal, { RevealItem, RevealRule } from "@/components/Reveal";
import { SEDES_URL, sedes } from "@/content/site";

/** List-cards. Order comes from content/site.ts — Calle 197 first, by commercial rule. */
export default function SedeGrid() {
  return (
    <section aria-labelledby="sedes-title" className="order-5">
      <div className="mx-auto max-w-site px-5 md:px-8 lg:px-10 py-14 md:py-20 lg:py-24">
        <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-3">Red de sedes</p>
            <h2 id="sedes-title" className="font-display text-3xl font-semibold text-ink max-w-[20ch]">Una bodega cerca de donde estás</h2>
            <RevealRule className="mt-5 max-w-[320px]" />
          </div>
          <Link href={SEDES_URL} className="group inline-flex items-center gap-1.5 text-[14px] font-medium text-primary hover:text-primary-deep cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-[2px]">
            Ver las 7 sedes <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-fast ease-soft group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <Reveal group as="ul" className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" role="list">
          {sedes.map((s) => (
            <RevealItem as="li" key={s.slug}>
              <Link
                href={`/sedes/${s.slug}/`}
                className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-bg cursor-pointer transition-colors duration-fast ease-soft hover:border-muted-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <div className="relative aspect-[4/3] overflow-hidden border-b border-line">
                  <Image
                    src={s.image}
                    alt={s.alt}
                    fill
                    sizes="(min-width: 1024px) 290px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <div className="flex items-center gap-2">
                    {s.badge && (
                      <>
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                        <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-[12px] font-medium text-primary-deep">{s.badge}</span>
                      </>
                    )}
                    <span className="rounded-full border border-line bg-surface px-2.5 py-0.5 text-[12px] font-medium text-muted">{s.zone}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-ink">{s.name}</h3>
                  <address className="not-italic text-[14px] leading-relaxed text-muted">{s.address}</address>
                  <p className="text-[13px] text-muted leading-snug">{s.coverage}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-[14px] font-medium text-primary group-hover:text-primary-deep">
                    Cómo llegar <ArrowRight size={14} aria-hidden="true" className="transition-transform duration-fast ease-soft group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
