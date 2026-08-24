import Link from "next/link";
import { House, Buildings } from "@phosphor-icons/react/dist/ssr";
import Reveal, { RevealItem } from "@/components/Reveal";
import { segments } from "@/content/site";

const icons = [House, Buildings];

export default function SegmentStrip() {
  return (
    <section aria-labelledby="segments-title" className="order-7">
      <div className="mx-auto max-w-site px-5 md:px-8 lg:px-10 py-14 md:py-20 lg:py-24">
        <Reveal>
          <h2 id="segments-title" className="font-display text-3xl font-bold uppercase text-ink max-w-[18ch]">Espacio para tu hogar o tu empresa</h2>
        </Reveal>
        <Reveal group as="ul" className="mt-8 grid md:grid-cols-2 gap-px border-[1.5px] border-ink bg-ink" role="list">
          {segments.map((s, i) => {
            const Icon = icons[i];
            return (
              <RevealItem as="li" key={s.href} className="bg-surface">
                <Link href={s.href} className="group flex h-full flex-col p-6 md:p-9 hover:bg-bg-deep transition-colors duration-fast ease-soft cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring">
                  <Icon size={28} weight="regular" aria-hidden="true" className="text-primary-deep" />
                  <h3 className="mt-4 font-display text-2xl md:text-3xl font-bold uppercase text-ink">{s.title}</h3>
                  <p className="mt-3 text-[15px] text-ink-2 leading-relaxed max-w-[46ch]">{s.body}</p>
                  <span className="mt-auto pt-6 font-mono text-[13px] font-medium uppercase tracking-[0.08em] text-ink group-hover:text-primary-deep">Conocer más →</span>
                </Link>
              </RevealItem>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
