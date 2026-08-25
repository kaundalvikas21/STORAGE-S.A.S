import Link from "next/link";
import { ArrowRight, MapTrifold, Truck, Vault } from "@phosphor-icons/react/dist/ssr";
import Photo from "@/components/Photo";
import Reveal from "@/components/motion/Reveal";
import RevealStagger, { RevealItem } from "@/components/motion/RevealStagger";
import type { ImageKey } from "@/content/images";
import { silos } from "@/content/site";

const cards = [
  { ...silos.bodegaje, slot: "siloBodegaje" as ImageKey, Icon: Vault, cta: "Ver bodegaje", featured: true },
  { ...silos.sedes, slot: "siloSedes" as ImageKey, Icon: MapTrifold, cta: "Ver sedes", featured: false },
  { ...silos.mudanzas, slot: "siloMudanzas" as ImageKey, Icon: Truck, cta: "Ver mudanzas", featured: false },
];

/** Three photo-led cards. Bodegaje (the money silo) is the only differentiated one: accent top border + Recomendado. */
export default function SiloDoors() {
  return (
    <section aria-labelledby="silos-title" className="order-4">
      <div className="mx-auto max-w-site px-5 py-14 md:px-8 md:py-20 lg:px-10 lg:py-24">
        <Reveal>
          <h2 id="silos-title" className="font-display text-3xl font-semibold text-ink max-w-[22ch]">
            Bodegaje, sedes y mudanzas en un solo lugar
          </h2>
        </Reveal>

        <RevealStagger as="ul" role="list" className="mt-10 grid gap-5 md:grid-cols-3">
          {cards.map(({ slot, Icon, cta, featured, title, lead, body, href }) => (
            <RevealItem as="li" key={href}>
              <Link href={href} className={`card h-full ${featured ? "border-t-2 border-t-primary" : ""}`}>
                <Photo slot={slot} className="aspect-[16/10] border-b border-line" sizes="(min-width: 768px) 33vw, 100vw" />
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between">
                    <Icon size={24} weight="regular" aria-hidden="true" className="text-primary" />
                    {featured && <span className="text-[13px] font-medium text-primary">Recomendado</span>}
                  </div>
                  <h3 className="card-title mt-4 text-xl font-semibold text-ink">{title}</h3>
                  <p className="mt-2 text-[15px] text-ink-2">
                    {lead} {body}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[14px] font-medium text-primary">
                    {cta} <ArrowRight size={15} aria-hidden="true" className="card-arrow" />
                  </span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
