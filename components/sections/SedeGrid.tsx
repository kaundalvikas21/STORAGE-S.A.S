import Link from "next/link";
import { ArrowRight, Clock, MapPin } from "@phosphor-icons/react/dist/ssr";
import Photo from "@/components/Photo";
import { RevealRule } from "@/components/motion/Reveal";
import RevealStagger, { RevealItem } from "@/components/motion/RevealStagger";
import { SEDES_URL, sedes } from "@/content/site";
import { company } from "@/lib/company";

const chip = "rounded-full px-2.5 py-1 text-[12px] font-medium";

/**
 * Photo-led sede cards: zone + badge chips float on the photo, coverage renders as tags, and the action row
 * (hours + "Cómo llegar") sits on a hairline. Order comes from content/site.ts: Calle 197 first, by commercial rule.
 */
export default function SedeGrid() {
  return (
    <section aria-labelledby="sedes-title" className="order-5">
      <div className="mx-auto max-w-site px-5 py-14 md:px-8 md:py-20 lg:px-10 lg:py-24">
        <RevealStagger className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <RevealItem>
            <p className="eyebrow mb-3">Red de sedes</p>
            <h2 id="sedes-title" className="font-display text-3xl font-semibold text-ink max-w-[20ch]">
              Una bodega cerca de donde estás
            </h2>
            <RevealRule className="mt-5 max-w-[320px]" />
          </RevealItem>
          <RevealItem>
            <Link href={SEDES_URL} className="group inline-flex items-center gap-1.5 text-[14px] font-medium text-primary hover:text-primary-deep cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-[2px]">
              <span className="link-draw">Ver las 7 sedes</span>
              <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-fast ease-premium group-hover:translate-x-1" />
            </Link>
          </RevealItem>
        </RevealStagger>

        <RevealStagger as="ul" role="list" className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {sedes.map((s) => (
            <RevealItem as="li" key={s.slug}>
              <Link href={`/sedes/${s.slug}/`} className="card h-full">
                <div className="relative">
                  <Photo slot={s.image} className="aspect-[4/3]" sizes="(min-width: 1024px) 290px, (min-width: 640px) 50vw, 100vw" />
                  <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
                    <span className={`${chip} border border-line/60 bg-bg/90 text-ink`}>{s.zone}</span>
                    {s.badge && <span className={`${chip} bg-primary text-on-primary`}>{s.badge}</span>}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="card-title flex items-center gap-2 text-xl font-semibold text-ink">
                    <MapPin size={18} weight="regular" aria-hidden="true" className="shrink-0 text-primary" />
                    {s.name}
                  </h3>
                  <address className="mt-2 not-italic text-[14px] leading-relaxed text-muted">{s.address}</address>
                  <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Zonas de cobertura">
                    {s.coverage.split(", ").map((z) => (
                      <li key={z} className={`${chip} bg-surface text-muted`}>
                        {z}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-line pt-4 mt-5">
                    <span className="tnum inline-flex items-center gap-1.5 text-[12px] text-muted">
                      <Clock size={14} weight="regular" aria-hidden="true" />
                      {company.hours}
                    </span>
                    <span className="card-reveal ml-auto inline-flex shrink-0 items-center gap-1.5 text-[14px] font-medium text-primary">
                      Cómo llegar <ArrowRight size={14} aria-hidden="true" className="card-arrow" />
                    </span>
                  </div>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
