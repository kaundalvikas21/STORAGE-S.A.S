import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Photo from "@/components/Photo";
import Reveal, { RevealItem, RevealStagger } from "@/components/motion/Reveal";
import { silos } from "@/content/site";

const cellLink =
  "group block h-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const affordance =
  "mt-auto pt-5 inline-flex items-center gap-1.5 font-mono text-[13px] font-medium uppercase tracking-[0.08em] text-ink group-hover:text-primary-deep transition-colors duration-fast ease-soft";

export default function SiloDoors() {
  return (
    <section aria-labelledby="silos-title" className="order-4 border-y-[1.5px] border-ink bg-bg-deep/60">
      <div className="mx-auto max-w-site px-5 md:px-8 lg:px-10 py-14 md:py-20 lg:py-24">
        <Reveal>
          <h2 id="silos-title" className="font-display text-3xl font-bold uppercase text-ink max-w-[20ch]">Bodegaje, sedes y mudanzas en un solo lugar</h2>
        </Reveal>

        <RevealStagger delay={0.1} className="mt-10 grid gap-4 md:gap-5 md:grid-cols-12">
          <RevealItem className="md:col-span-7 md:row-span-2">
            <Link href={silos.bodegaje.href} className={cellLink}>
              <div className="cell-hover relative h-full min-h-[380px] md:min-h-[520px] overflow-hidden border-[1.5px] border-ink">
                <Photo slot={silos.bodegaje.img} className="absolute inset-0" sizes="(min-width: 768px) 700px, 100vw" scrim="base" />
                <span className="absolute left-0 top-0 z-10 bg-primary px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-on-primary">
                  Silo principal
                </span>
                <div className="absolute inset-x-0 bottom-0 z-10 bg-ink/90 p-6 md:p-8 text-bg">
                  <h3 className="font-display text-2xl md:text-3xl font-bold uppercase">{silos.bodegaje.title}</h3>
                  <p className="mt-2 max-w-[46ch] text-[15px] md:text-base text-bg/80">{silos.bodegaje.lead} {silos.bodegaje.body}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[13px] font-medium uppercase tracking-[0.08em] text-primary group-hover:text-bg transition-colors duration-fast ease-soft">
                    Ver bodegaje <ArrowRight size={14} weight="bold" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </Link>
          </RevealItem>

          {[silos.sedes, silos.mudanzas].map((s) => (
            <RevealItem key={s.href} className="md:col-span-5">
              <Link href={s.href} className={cellLink}>
                <div className="cell-hover h-full border-[1.5px] border-ink bg-surface flex flex-col group-hover:bg-bg-deep">
                  <Photo slot={s.img} className="relative aspect-[16/7] w-full border-b-[1.5px] border-ink" sizes="(min-width: 768px) 480px, 100vw" scrim="soft" />
                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <h3 className="font-display text-xl md:text-2xl font-bold uppercase text-ink">{s.title}</h3>
                    <p className="mt-2 text-[15px] text-ink-2">{s.lead} {s.body}</p>
                    <span className={affordance}>
                      {s === silos.sedes ? "Ver sedes" : "Ver mudanzas"} <ArrowRight size={14} weight="bold" aria-hidden="true" />
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
