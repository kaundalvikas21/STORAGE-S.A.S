import Link from "next/link";
import { ArrowUpRight, House, Buildings } from "@phosphor-icons/react/dist/ssr";
import Photo from "@/components/Photo";
import Reveal, { RevealItem } from "@/components/Reveal";
import { photos } from "@/content/images";
import { segments } from "@/content/site";

const icons = [House, Buildings];
const art = [photos.segmentHogar, photos.segmentEmpresa];

export default function SegmentStrip() {
  return (
    <section aria-labelledby="segments-title" className="order-7">
      <div className="mx-auto max-w-site px-5 md:px-8 lg:px-10 py-20 md:py-28 lg:py-36">
        <Reveal>
          <p className="eyebrow mb-3">Para quién</p>
          <h2 id="segments-title" className="font-display text-3xl font-semibold text-ink max-w-[18ch]">Espacio para tu hogar o tu empresa</h2>
        </Reveal>
        <Reveal group as="ul" className="mt-10 grid gap-4 md:grid-cols-2" role="list">
          {segments.map((s, i) => {
            const Icon = icons[i];
            return (
              <RevealItem as="li" key={s.href}>
                <Link href={s.href} className="group block h-full rounded-xl bg-bg-deep ring-1 ring-line p-1.5 cursor-pointer transition-[transform,box-shadow] duration-DEFAULT ease-premium hover:-translate-y-lift hover:shadow-2 active:translate-y-0 active:scale-press focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg">
                  <div className="h-full rounded-xl-inner bg-surface shadow-inset overflow-hidden flex flex-col sm:flex-row">
                    <Photo
                      img={art[i]}
                      sizes="(min-width: 768px) 240px, 100vw"
                      className="h-40 shrink-0 sm:h-auto sm:w-[38%]"
                    />
                    <div className="flex flex-col p-6 md:p-8">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft text-primary">
                        <Icon size={26} weight="light" aria-hidden="true" />
                      </span>
                      <h3 className="mt-4 font-display text-2xl font-semibold text-ink">{s.title}</h3>
                      <p className="mt-2 text-[15px] text-ink-2 leading-relaxed">{s.body}</p>
                      <span className="mt-auto pt-5 inline-flex items-center gap-2 text-[15px] font-semibold text-primary">
                        Conocer más
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 transition-transform duration-DEFAULT ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-px">
                          <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
                        </span>
                      </span>
                    </div>
                  </div>
                </Link>
              </RevealItem>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
