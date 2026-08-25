import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Photo from "@/components/Photo";
import Reveal, { RevealItem, RevealStagger } from "@/components/motion/Reveal";
import { segments } from "@/content/site";

export default function SegmentStrip() {
  return (
    <section aria-labelledby="segments-title" className="order-7">
      <div className="mx-auto max-w-site px-5 md:px-8 lg:px-10 py-14 md:py-20 lg:py-24">
        <Reveal>
          <h2 id="segments-title" className="font-display text-3xl font-bold uppercase text-ink max-w-[18ch]">Espacio para tu hogar o tu empresa</h2>
        </Reveal>
        <RevealStagger as="ul" className="mt-8 grid md:grid-cols-2 gap-px border-[1.5px] border-ink bg-ink" role="list">
          {segments.map((s) => (
            <RevealItem as="li" key={s.href} className="bg-surface">
              <Link href={s.href} className="group flex h-full flex-col hover:bg-bg-deep transition-colors duration-fast ease-soft cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring">
                <Photo slot={s.img} className="relative aspect-[16/9] w-full" sizes="(min-width: 768px) 620px, 100vw" scrim="soft" />
                <div className="flex flex-1 flex-col p-6 md:p-9">
                  <h3 className="font-display text-2xl md:text-3xl font-bold uppercase text-ink group-hover:text-primary-deep transition-colors duration-fast ease-soft">{s.title}</h3>
                  <p className="mt-3 text-[15px] text-ink-2 leading-relaxed max-w-[46ch]">{s.body}</p>
                  <span className="mt-auto pt-6 inline-flex items-center gap-1.5 font-mono text-[13px] font-medium uppercase tracking-[0.08em] text-ink group-hover:text-primary-deep transition-colors duration-fast ease-soft">
                    Conocer más <ArrowRight size={14} weight="bold" aria-hidden="true" className="transition-transform duration-fast ease-soft group-hover:translate-x-1" />
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
