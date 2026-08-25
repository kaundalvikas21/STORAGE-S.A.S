import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Photo from "@/components/Photo";
import Reveal, { RevealItem, RevealRule } from "@/components/Reveal";
import SedeMap from "@/components/sections/SedeMap";
import { sedePhotos } from "@/content/images";
import { SEDES_URL, sedes } from "@/content/site";

/** Map-first locator: Leaflet map cell (lg only) + sede card list. Card hover/focus
 *  highlights its pin (CSS :has on `.sede-band`). The photo is the card: 4:3, with the sede
 *  name, zone and availability badge riding its scrim, so the image carries the identity and
 *  the body is left with only the address plus a divided availability band. Same card height
 *  as the old text-stacked version with a 70% larger image. Calle 197 first (content/site.ts). */
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

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.05fr_1fr] lg:gap-5">
          <SedeMap />
          <Reveal group as="ul" className="grid gap-4 sm:grid-cols-2" role="list">
            {sedes.map((s) => (
              <RevealItem as="li" key={s.slug}>
                <Link
                  href={`/sedes/${s.slug}/`}
                  data-sede={s.slug}
                  className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-lg border border-line bg-surface shadow-1 transition-[transform,box-shadow,border-color] duration ease-soft hover:-translate-y-0.5 hover:border-muted-2 hover:shadow-2 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <span className="relative block">
                    <Photo img={sedePhotos[s.slug]} sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw" scrim="bottom" className="aspect-[4/3]" />
                    {s.badge && (
                      <span className="absolute left-4 top-4 rounded-full bg-accent px-2.5 py-0.5 text-[12px] font-medium text-on-accent">{s.badge}</span>
                    )}
                    {/* Name + zone ride the photo's own scrim. --on-primary is the palette's white;
                        the light card's --ink is near-black and would vanish here. */}
                    <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                      <span className="min-w-0">
                        <span className="block text-[12px] font-medium text-on-primary/75">{s.zone}</span>
                        <span className="block text-xl font-semibold leading-tight text-on-primary">{s.name}</span>
                      </span>
                      <ArrowRight size={16} aria-hidden="true" className="mb-1 shrink-0 text-on-primary/75 transition-transform duration-fast ease-soft group-hover:translate-x-1" />
                    </span>
                  </span>
                  <span className="flex flex-1 flex-col gap-1.5 p-4">
                    <address className="text-[13px] not-italic leading-relaxed text-muted">{s.address}</address>
                    <span className="mt-auto block border-t border-line pt-3 text-[13px] leading-snug text-ink-2">{s.sizesHint}</span>
                    <span className="block text-[13px] leading-snug text-muted">{s.coverage}</span>
                  </span>
                </Link>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
