import Link from "next/link";
import { ArrowRight, MapTrifold, Truck, Vault } from "@phosphor-icons/react/dist/ssr";
import Photo from "@/components/Photo";
import Reveal, { RevealItem } from "@/components/Reveal";
import ShowcaseCycler from "@/components/sections/ShowcaseCycler";
import { siloMudanzas } from "@/content/images";
import { silos } from "@/content/site";

const cell =
  "group flex h-full flex-col rounded-lg border border-line bg-surface p-6 shadow-1 cursor-pointer transition-[transform,box-shadow,border-color] duration ease-soft hover:-translate-y-0.5 hover:border-muted-2 hover:shadow-2 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const title = "transition-colors duration-fast ease-soft group-hover:text-primary";

const cta = "mt-auto inline-flex items-center gap-1.5 pt-5 text-[14px] font-medium text-primary group-hover:text-primary-deep";

const arrow = "transition-transform duration-fast ease-soft group-hover:translate-x-1";

const icon = "text-primary transition-transform duration ease-soft group-hover:-translate-y-1.5";

/** Bento band: Bodegaje (the money silo) is the dark featured cell with the photo
 *  showcase; Sedes and Mudanzas share a side column that is 2-up below md and stacked
 *  above it. The side column uses `md:grid-rows-[auto_1fr]` rather than forced equal
 *  halves, so Sedes takes its natural height and the Mudanzas photo absorbs the rest. */
export default function SiloDoors() {
  return (
    <section aria-labelledby="silos-title" className="order-4">
      <div className="mx-auto max-w-site px-5 py-14 md:px-8 md:py-20 lg:px-10 lg:py-24">
        <Reveal>
          <h2 id="silos-title" className="max-w-[22ch] font-display text-3xl font-semibold text-ink">
            Bodegaje, sedes y mudanzas en un solo lugar
          </h2>
        </Reveal>

        <Reveal group delay={0.1} className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5">
          <RevealItem className="sm:col-span-2">
            {/* Not one big <Link>: the showcase has its own buttons (dots, pause), and interactive
                controls inside a link navigate on every click. The title link is stretched over the
                card (after:inset-0) and the showcase sits above it (z-10), so the card stays fully
                clickable while the controls only control the gallery. */}
            <div className="dark-cell group relative flex h-full flex-col rounded-lg p-6 shadow-3 transition-[transform,box-shadow] duration ease-soft hover:-translate-y-0.5 has-[a:active]:scale-[0.98] has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-ring has-[a:focus-visible]:ring-offset-2 md:p-8">
              <div className="flex items-center justify-between">
                <Vault size={26} weight="regular" aria-hidden="true" className={icon} />
                <span className="rounded-full bg-accent px-2.5 py-1 text-[12px] font-medium text-on-accent">Recomendado</span>
              </div>
              <h3 className={`mt-5 font-display text-2xl font-semibold text-ink ${title}`}>
                <Link href={silos.bodegaje.href} className="cursor-pointer after:absolute after:inset-0 after:rounded-lg focus-visible:outline-none">
                  {silos.bodegaje.title}
                </Link>
              </h3>
              <p className="mt-2 max-w-[52ch] text-[15px] leading-relaxed text-ink-2">
                {silos.bodegaje.lead} {silos.bodegaje.body}
              </p>
              <ShowcaseCycler />
              <span aria-hidden="true" className={cta}>
                Ver bodegaje <ArrowRight size={15} aria-hidden="true" className={arrow} />
              </span>
            </div>
          </RevealItem>

          <div className="grid gap-4 sm:col-span-2 sm:grid-cols-2 md:col-span-1 md:grid-cols-1 md:grid-rows-[auto_1fr] md:gap-5">
            <RevealItem>
              <Link href={silos.sedes.href} className={cell}>
                <MapTrifold size={24} weight="regular" aria-hidden="true" className={icon} />
                <h3 className={`mt-5 text-xl font-semibold text-ink ${title}`}>{silos.sedes.title}</h3>
                <p className="mt-2 text-[15px] text-ink-2">{silos.sedes.lead} {silos.sedes.body}</p>
                <span className={cta}>
                  Ver sedes <ArrowRight size={15} aria-hidden="true" className={arrow} />
                </span>
              </Link>
            </RevealItem>

            <RevealItem>
              <Link href={silos.mudanzas.href} className={cell}>
                <Truck size={24} weight="regular" aria-hidden="true" className={icon} />
                <h3 className={`mt-5 text-xl font-semibold text-ink ${title}`}>{silos.mudanzas.title}</h3>
                <p className="mt-2 text-[15px] text-ink-2">{silos.mudanzas.lead} {silos.mudanzas.body}</p>
                <Photo img={siloMudanzas} sizes="(min-width: 768px) 33vw, 50vw" className="mt-5 min-h-[140px] flex-1 rounded-md border border-line" />
                <span className={cta}>
                  Ver mudanzas <ArrowRight size={15} aria-hidden="true" className={arrow} />
                </span>
              </Link>
            </RevealItem>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
