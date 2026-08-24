import Image from "next/image";
import Link from "next/link";
import { MapTrifold, Truck } from "@phosphor-icons/react/dist/ssr";
import Reveal, { RevealItem } from "@/components/Reveal";
import { silos } from "@/content/site";

const cellLink =
  "group block h-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export default function SiloDoors() {
  return (
    <section aria-labelledby="silos-title" className="order-4 border-y-[1.5px] border-ink bg-bg-deep/60">
      <div className="mx-auto max-w-site px-5 md:px-8 lg:px-10 py-14 md:py-20 lg:py-24">
        <Reveal>
          <h2 id="silos-title" className="font-display text-3xl font-bold uppercase text-ink max-w-[20ch]">Bodegaje, sedes y mudanzas en un solo lugar</h2>
        </Reveal>

        <Reveal group delay={0.1} className="mt-10 grid gap-4 md:gap-5 md:grid-cols-12">
          <RevealItem className="md:col-span-7 md:row-span-2">
            <Link href={silos.bodegaje.href} className={cellLink}>
              <div className="relative h-full min-h-[380px] md:min-h-[520px] overflow-hidden border-[1.5px] border-ink">
                <Image
                  src="/img/bodegaje-pasillo.svg"
                  alt="Pasillo amplio de minibodegas con puertas numeradas en una sede Storage de Bogotá"
                  fill
                  sizes="(min-width: 768px) 700px, 100vw"
                  className="object-cover grayscale contrast-125"
                />
                <div className="absolute inset-0 bg-accent/50 mix-blend-multiply" aria-hidden="true" />
                <span className="absolute left-0 top-0 bg-primary px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-on-primary">
                  Silo principal
                </span>
                <div className="absolute inset-x-0 bottom-0 bg-ink/90 p-6 md:p-8 text-bg">
                  <h3 className="font-display text-2xl md:text-3xl font-bold uppercase">{silos.bodegaje.title}</h3>
                  <p className="mt-2 max-w-[46ch] text-[15px] md:text-base text-bg/80">{silos.bodegaje.lead} {silos.bodegaje.body}</p>
                  <span className="mt-4 inline-block font-mono text-[13px] font-medium uppercase tracking-[0.08em] text-primary group-hover:text-bg">Ver bodegaje →</span>
                </div>
              </div>
            </Link>
          </RevealItem>

          <RevealItem className="md:col-span-5">
            <Link href={silos.sedes.href} className={cellLink}>
              <div className="h-full border-[1.5px] border-ink bg-surface p-6 md:p-7 flex flex-col transition-colors duration-fast ease-soft group-hover:bg-bg-deep">
                <MapTrifold size={26} weight="regular" aria-hidden="true" className="text-primary-deep" />
                <h3 className="mt-4 font-display text-xl md:text-2xl font-bold uppercase text-ink">{silos.sedes.title}</h3>
                <p className="mt-2 text-[15px] text-ink-2">{silos.sedes.lead} {silos.sedes.body}</p>
                <span className="mt-auto pt-5 font-mono text-[13px] font-medium uppercase tracking-[0.08em] text-ink group-hover:text-primary-deep">Ver sedes →</span>
              </div>
            </Link>
          </RevealItem>

          <RevealItem className="md:col-span-5">
            <Link href={silos.mudanzas.href} className={cellLink}>
              <div className="h-full border-[1.5px] border-ink bg-surface p-6 md:p-7 flex flex-col transition-colors duration-fast ease-soft group-hover:bg-bg-deep">
                <Truck size={26} weight="regular" aria-hidden="true" className="text-primary-deep" />
                <h3 className="mt-4 font-display text-xl md:text-2xl font-bold uppercase text-ink">{silos.mudanzas.title}</h3>
                <p className="mt-2 text-[15px] text-ink-2">{silos.mudanzas.lead} {silos.mudanzas.body}</p>
                <span className="mt-auto pt-5 font-mono text-[13px] font-medium uppercase tracking-[0.08em] text-ink group-hover:text-primary-deep">Ver mudanzas →</span>
              </div>
            </Link>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}
