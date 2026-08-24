import Link from "next/link";
import { ArrowRight, MapTrifold, Truck, Vault } from "@phosphor-icons/react/dist/ssr";
import Reveal, { RevealItem } from "@/components/Reveal";
import { silos } from "@/content/site";

const card =
  "group flex h-full flex-col rounded-lg border border-line bg-surface p-7 cursor-pointer transition-colors duration-fast ease-soft hover:border-muted-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const cta =
  "mt-auto inline-flex items-center gap-1.5 pt-6 text-[14px] font-medium text-primary group-hover:text-primary-deep";

const arrow = "transition-transform duration-fast ease-soft group-hover:translate-x-1";

/** Three flat cards. Bodegaje (the money silo) is the only differentiated one: accent top border + Recomendado. */
export default function SiloDoors() {
  return (
    <section aria-labelledby="silos-title" className="order-4">
      <div className="mx-auto max-w-site px-5 md:px-8 lg:px-10 py-14 md:py-20 lg:py-24">
        <Reveal>
          <h2 id="silos-title" className="font-display text-3xl font-semibold text-ink max-w-[22ch]">
            Bodegaje, sedes y mudanzas en un solo lugar
          </h2>
        </Reveal>

        <Reveal group delay={0.1} className="mt-10 grid gap-5 md:grid-cols-3">
          <RevealItem>
            <Link href={silos.bodegaje.href} className={`${card} border-t-2 border-t-primary`}>
              <div className="flex items-center justify-between">
                <Vault size={24} weight="regular" aria-hidden="true" className="text-primary" />
                <span className="text-[13px] font-medium text-primary">Recomendado</span>
              </div>
              <h3 className="mt-5 text-xl font-semibold text-ink">{silos.bodegaje.title}</h3>
              <p className="mt-2 text-[15px] text-ink-2">{silos.bodegaje.lead} {silos.bodegaje.body}</p>
              <span className={cta}>Ver bodegaje <ArrowRight size={15} aria-hidden="true" className={arrow} /></span>
            </Link>
          </RevealItem>

          <RevealItem>
            <Link href={silos.sedes.href} className={card}>
              <MapTrifold size={24} weight="regular" aria-hidden="true" className="text-primary" />
              <h3 className="mt-5 text-xl font-semibold text-ink">{silos.sedes.title}</h3>
              <p className="mt-2 text-[15px] text-ink-2">{silos.sedes.lead} {silos.sedes.body}</p>
              <span className={cta}>Ver sedes <ArrowRight size={15} aria-hidden="true" className={arrow} /></span>
            </Link>
          </RevealItem>

          <RevealItem>
            <Link href={silos.mudanzas.href} className={card}>
              <Truck size={24} weight="regular" aria-hidden="true" className="text-primary" />
              <h3 className="mt-5 text-xl font-semibold text-ink">{silos.mudanzas.title}</h3>
              <p className="mt-2 text-[15px] text-ink-2">{silos.mudanzas.lead} {silos.mudanzas.body}</p>
              <span className={cta}>Ver mudanzas <ArrowRight size={15} aria-hidden="true" className={arrow} /></span>
            </Link>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}
