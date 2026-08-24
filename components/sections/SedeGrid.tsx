import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Photo from "@/components/Photo";
import Reveal, { RevealItem, RevealRule } from "@/components/Reveal";
import SedeMap from "@/components/sections/SedeMap";
import { sedePhotos } from "@/content/images";
import { SEDES_URL, sedes } from "@/content/site";

/** Map-first bento: SVG map cell + card list. Card hover/focus highlights its pin
 *  (CSS :has on `.sede-band`). Order comes from content/site.ts — Calle 197 first. */
export default function SedeGrid() {
  return (
    <section aria-labelledby="sedes-title" className="sede-band order-5">
      <div className="mx-auto max-w-site px-5 py-14 md:px-8 md:py-20 lg:px-10 lg:py-24">
        <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-3">Red de sedes</p>
            <h2 id="sedes-title" className="max-w-[20ch] font-display text-3xl font-semibold text-ink">Una bodega cerca de donde estás</h2>
            <RevealRule className="mt-5 max-w-[320px]" />
          </div>
          <Link href={SEDES_URL} className="group inline-flex items-center gap-1.5 rounded-[2px] text-[14px] font-medium text-primary hover:text-primary-deep cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><span className="link-draw">
            Ver las 7 sedes</span> <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-fast ease-soft group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1.05fr_1fr] lg:gap-5">
          <SedeMap />
          <Reveal group as="ul" className="grid gap-4 sm:grid-cols-2" role="list">
            {sedes.map((s) => (
              <RevealItem as="li" key={s.slug}>
                <Link
                  href={`/sedes/${s.slug}/`}
                  data-sede={s.slug}
                  className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-lg border border-line bg-surface shadow-1 transition-all duration ease-soft hover:-translate-y-0.5 hover:shadow-2 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <Photo img={sedePhotos[s.slug]} sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw" className="aspect-video border-b border-line" />
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <div className="flex flex-wrap items-center gap-2">
                      {s.badge && <span className="rounded-full bg-accent px-2.5 py-0.5 text-[12px] font-medium text-on-accent">{s.badge}</span>}
                      <span className="rounded-full border border-line bg-bg px-2.5 py-0.5 text-[12px] font-medium text-muted">{s.zone}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-ink transition-colors duration-fast ease-soft group-hover:text-primary">{s.name}</h3>
                    <address className="text-[14px] not-italic leading-relaxed text-muted">{s.address}</address>
                    <p className="text-[13px] leading-snug text-ink-2">{s.sizesHint}</p>
                    <p className="text-[13px] leading-snug text-muted">{s.coverage}</p>
                    <span className="hover-row mt-auto inline-flex items-center gap-1.5 pt-3 text-[14px] font-medium text-primary group-hover:text-primary-deep">
                      Cómo llegar <ArrowRight size={14} aria-hidden="true" className="transition-transform duration-fast ease-soft group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
