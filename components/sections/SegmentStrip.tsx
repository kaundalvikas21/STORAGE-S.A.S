import Link from "next/link";
import { ArrowRight, House, Buildings } from "@phosphor-icons/react/dist/ssr";
import Photo from "@/components/Photo";
import Reveal, { RevealItem } from "@/components/Reveal";
import { segmentEmpresa, segmentHogar } from "@/content/images";
import { segments } from "@/content/site";

const icons = [House, Buildings];
const photos = [segmentHogar, segmentEmpresa];

export default function SegmentStrip() {
  return (
    <section aria-labelledby="segments-title" className="order-7">
      <div className="mx-auto max-w-site px-5 md:px-8 lg:px-10 py-14 md:py-20 lg:py-24">
        <Reveal>
          <h2 id="segments-title" className="font-display text-3xl font-semibold text-ink max-w-[20ch]">Espacio para tu hogar o tu empresa</h2>
        </Reveal>
        <Reveal group as="ul" className="mt-10 grid md:grid-cols-2 gap-5" role="list">
          {segments.map((s, i) => {
            const Icon = icons[i];
            return (
              <RevealItem as="li" key={s.href}>
                <Link href={s.href} className={`group flex h-full flex-col rounded-lg border border-line p-8 shadow-1 md:p-10 transition-all duration ease-soft hover:-translate-y-0.5 hover:shadow-2 active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${i === 1 ? "bg-primary-soft" : "bg-surface"}`}>
                  <Icon size={26} weight="regular" aria-hidden="true" className="text-primary" />
                  <h3 className="mt-5 text-2xl font-semibold text-ink transition-colors duration-fast ease-soft group-hover:text-primary">{s.title}</h3>
                  <p className="mt-3 text-[15px] text-ink-2 leading-relaxed max-w-[46ch]">{s.body}</p>
                  <Photo img={photos[i]} sizes="(min-width: 768px) 50vw, 100vw" className="mt-6 aspect-[16/9] rounded-md border border-line" />
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[14px] font-medium text-primary group-hover:text-primary-deep">
                    Conocer más <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-fast ease-soft group-hover:translate-x-1" />
                  </span>
                </Link>
              </RevealItem>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
