import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Warehouse, MapTrifold, Truck } from "@phosphor-icons/react/dist/ssr";
import Reveal, { RevealItem } from "@/components/Reveal";
import { silos } from "@/content/site";

export default function SiloDoors() {
  return (
    <section aria-labelledby="silos-title" className="order-4 bg-bg-deep/60">
      <div className="mx-auto max-w-site px-5 md:px-8 lg:px-10 py-20 md:py-28 lg:py-36">
        <Reveal>
          <p className="eyebrow mb-3">Tres formas de empezar</p>
          <h2 id="silos-title" className="font-display text-3xl font-semibold text-ink max-w-[20ch]">Bodegaje, sedes y mudanzas en un solo lugar</h2>
        </Reveal>

        <Reveal group delay={0.1} className="mt-10 grid gap-4 md:gap-5 md:grid-cols-12">
          <RevealItem className="md:col-span-7 md:row-span-2">
            <Link href={silos.bodegaje.href} className="group block h-full rounded-xl bg-bg-deep ring-1 ring-line p-1.5 cursor-pointer transition-[transform,box-shadow] duration-DEFAULT ease-soft hover:-translate-y-0.5 hover:shadow-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <div className="relative h-full min-h-[380px] md:min-h-[520px] overflow-hidden rounded-xl-inner">
                <Image
                  src="/img/bodegaje-pasillo.svg"
                  alt="Pasillo amplio de minibodegas con puertas numeradas y luz cálida en una sede Storage"
                  fill
                  sizes="(min-width: 768px) 700px, 100vw"
                  className="object-cover transition-transform duration-slow ease-soft group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-deep via-primary-deep/55 to-transparent" />
                <div className="absolute inset-0 p-6 md:p-9 flex flex-col justify-end text-on-primary">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full bg-accent px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-on-accent">
                    <Warehouse size={14} weight="light" aria-hidden="true" /> Servicio principal
                  </span>
                  <h3 className="mt-4 font-display text-2xl md:text-3xl font-semibold">{silos.bodegaje.title}</h3>
                  <p className="mt-2 max-w-[38ch] text-[15px] md:text-base text-on-primary/85">{silos.bodegaje.lead} {silos.bodegaje.body}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[15px] font-semibold">
                    Ver bodegaje
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-on-primary/15 transition-transform duration-DEFAULT ease-soft group-hover:translate-x-0.5 group-hover:-translate-y-px">
                      <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          </RevealItem>

          <RevealItem className="md:col-span-5">
            <Link href={silos.sedes.href} className="group block h-full rounded-xl bg-bg-deep ring-1 ring-line p-1.5 cursor-pointer transition-[transform,box-shadow] duration-DEFAULT ease-soft hover:-translate-y-0.5 hover:shadow-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <div className="h-full rounded-xl-inner bg-surface shadow-inset p-6 md:p-7 flex flex-col">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-soft text-primary">
                  <MapTrifold size={24} weight="light" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-xl md:text-2xl font-semibold text-ink">{silos.sedes.title}</h3>
                <p className="mt-2 text-[15px] text-ink-2">{silos.sedes.lead} {silos.sedes.body}</p>
                <span className="mt-auto pt-5 inline-flex items-center gap-2 text-[15px] font-semibold text-primary">
                  Ver sedes
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 transition-transform duration-DEFAULT ease-soft group-hover:translate-x-0.5 group-hover:-translate-y-px">
                    <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
                  </span>
                </span>
              </div>
            </Link>
          </RevealItem>

          <RevealItem className="md:col-span-5">
            <Link href={silos.mudanzas.href} className="group block h-full rounded-xl bg-bg-deep ring-1 ring-line p-1.5 cursor-pointer transition-[transform,box-shadow] duration-DEFAULT ease-soft hover:-translate-y-0.5 hover:shadow-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <div className="h-full rounded-xl-inner bg-surface shadow-inset p-6 md:p-7 flex flex-col">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-soft text-primary">
                  <Truck size={24} weight="light" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-xl md:text-2xl font-semibold text-ink">{silos.mudanzas.title}</h3>
                <p className="mt-2 text-[15px] text-ink-2">{silos.mudanzas.lead} {silos.mudanzas.body}</p>
                <span className="mt-auto pt-5 inline-flex items-center gap-2 text-[15px] font-semibold text-primary">
                  Ver mudanzas
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 transition-transform duration-DEFAULT ease-soft group-hover:translate-x-0.5 group-hover:-translate-y-px">
                    <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
                  </span>
                </span>
              </div>
            </Link>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}
