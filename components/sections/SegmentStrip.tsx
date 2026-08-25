import Link from "next/link";
import { ArrowRight, Buildings, House } from "@phosphor-icons/react/dist/ssr";
import Photo from "@/components/Photo";
import Reveal from "@/components/motion/Reveal";
import RevealStagger, { RevealItem } from "@/components/motion/RevealStagger";
import type { ImageKey } from "@/content/images";
import { segments } from "@/content/site";

const icons = [House, Buildings];
const slots: ImageKey[] = ["segmentHogar", "segmentEmpresa"];

export default function SegmentStrip() {
  return (
    <section aria-labelledby="segments-title" className="order-7">
      <div className="mx-auto max-w-site px-5 py-14 md:px-8 md:py-20 lg:px-10 lg:py-24">
        <Reveal>
          <h2 id="segments-title" className="font-display text-3xl font-semibold text-ink max-w-[20ch]">
            Espacio para tu hogar o tu empresa
          </h2>
        </Reveal>
        <RevealStagger as="ul" role="list" className="mt-10 grid gap-5 md:grid-cols-2">
          {segments.map((s, i) => {
            const Icon = icons[i];
            return (
              <RevealItem as="li" key={s.href}>
                <Link href={s.href} className="card h-full">
                  <Photo slot={slots[i]} className="aspect-[16/9] border-b border-line" sizes="(min-width: 768px) 50vw, 100vw" />
                  <div className="flex flex-1 flex-col p-8 md:p-10">
                    <Icon size={26} weight="regular" aria-hidden="true" className="text-primary" />
                    <h3 className="card-title mt-5 text-2xl font-semibold text-ink">{s.title}</h3>
                    <p className="mt-3 max-w-[46ch] text-[15px] leading-relaxed text-ink-2">{s.body}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[14px] font-medium text-primary">
                      Conocer más <ArrowRight size={15} aria-hidden="true" className="card-arrow" />
                    </span>
                  </div>
                </Link>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}
