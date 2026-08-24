import Link from "next/link";
import { ArrowRight, MapTrifold, Truck, Vault } from "@phosphor-icons/react/dist/ssr";
import Reveal, { RevealItem } from "@/components/Reveal";
import ShowcaseCycler from "@/components/sections/ShowcaseCycler";
import { silos } from "@/content/site";

const cell =
  "group flex h-full flex-col rounded-lg border border-line bg-surface p-7 shadow-1 cursor-pointer transition-all duration ease-soft hover:-translate-y-0.5 hover:shadow-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const cta = "mt-auto inline-flex items-center gap-1.5 pt-6 text-[14px] font-medium text-primary group-hover:text-primary-deep";

const arrow = "transition-transform duration-fast ease-soft group-hover:translate-x-1";

/** Bento band: Bodegaje (the money silo) is the dark 2x2 featured cell with the
 *  photo showcase; Sedes and Mudanzas are 1x1 cells with a subtle icon lift on hover. */
export default function SiloDoors() {
  return (
    <section aria-labelledby="silos-title" className="order-4">
      <div className="mx-auto max-w-site px-5 py-14 md:px-8 md:py-20 lg:px-10 lg:py-24">
        <Reveal>
          <h2 id="silos-title" className="max-w-[22ch] font-display text-3xl font-semibold text-ink">
            Bodegaje, sedes y mudanzas en un solo lugar
          </h2>
        </Reveal>

        <Reveal group delay={0.1} className="mt-10 grid gap-4 md:grid-cols-3 md:grid-rows-2 md:gap-5">
          <RevealItem className="md:col-span-2 md:row-span-2">
            <Link href={silos.bodegaje.href} className="dark-cell group flex h-full cursor-pointer flex-col rounded-lg p-7 shadow-3 transition-all duration ease-soft hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:p-9">
              <div className="flex items-center justify-between">
                <Vault size={26} weight="regular" aria-hidden="true" className="text-primary" />
                <span className="rounded-full bg-accent px-2.5 py-1 text-[12px] font-medium text-on-accent">Recomendado</span>
              </div>
              <h3 className="mt-5 font-display text-2xl font-semibold text-ink">{silos.bodegaje.title}</h3>
              <p className="mt-2 max-w-[52ch] text-[15px] leading-relaxed text-ink-2">
                {silos.bodegaje.lead} {silos.bodegaje.body}
              </p>
              <ShowcaseCycler />
              <span className={cta}>
                Ver bodegaje <ArrowRight size={15} aria-hidden="true" className={arrow} />
              </span>
            </Link>
          </RevealItem>

          <RevealItem>
            <Link href={silos.sedes.href} className={cell}>
              <MapTrifold size={24} weight="regular" aria-hidden="true" className="text-primary transition-transform duration ease-soft group-hover:-translate-y-1.5" />
              <h3 className="mt-5 text-xl font-semibold text-ink">{silos.sedes.title}</h3>
              <p className="mt-2 text-[15px] text-ink-2">{silos.sedes.lead} {silos.sedes.body}</p>
              <span className={cta}>
                Ver sedes <ArrowRight size={15} aria-hidden="true" className={arrow} />
              </span>
            </Link>
          </RevealItem>

          <RevealItem>
            <Link href={silos.mudanzas.href} className={cell}>
              <Truck size={24} weight="regular" aria-hidden="true" className="text-primary transition-transform duration ease-soft group-hover:-translate-y-1.5" />
              <h3 className="mt-5 text-xl font-semibold text-ink">{silos.mudanzas.title}</h3>
              <p className="mt-2 text-[15px] text-ink-2">{silos.mudanzas.lead} {silos.mudanzas.body}</p>
              <span className={cta}>
                Ver mudanzas <ArrowRight size={15} aria-hidden="true" className={arrow} />
              </span>
            </Link>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}
