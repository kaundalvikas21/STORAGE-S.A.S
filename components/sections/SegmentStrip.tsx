import Link from "next/link";
import { ArrowRight, House, Buildings } from "@phosphor-icons/react/dist/ssr";
import Photo from "@/components/Photo";
import Reveal, { RevealItem } from "@/components/Reveal";
import { segmentEmpresa, segmentHogar } from "@/content/images";
import { segments } from "@/content/site";

const icons = [House, Buildings];
const photos = [segmentHogar, segmentEmpresa];

type More = { label: string; links: { label: string; href: string }[] };

/** Homepage segment cards; also the /bodegaje-bogota/ segment chooser. Inner pages pass their own
 *  `title`/`body`; `more` adds a text-link row to the other segment pages, so the pillar links down to
 *  all of silo 1A (R3). */
export default function SegmentStrip({ title = "Espacio para tu hogar o tu empresa", body, more }: { title?: string; body?: string; more?: More }) {
  return (
    <section aria-labelledby="segments-title" className="order-7">
      <div className="mx-auto max-w-site px-5 md:px-8 lg:px-10 py-14 md:py-20 lg:py-24">
        <Reveal>
          <h2 id="segments-title" className="font-display text-3xl font-semibold text-ink max-w-[20ch]">{title}</h2>
          {body && <p className="mt-3 max-w-[52ch] text-[15px] text-muted">{body}</p>}
        </Reveal>
        <Reveal group as="ul" className="mt-10 grid md:grid-cols-2 gap-5" role="list">
          {segments.map((s, i) => {
            const Icon = icons[i];
            return (
              <RevealItem as="li" key={s.href}>
                <Link href={s.href} className={`group flex h-full flex-col rounded-lg border border-line p-8 shadow-1 md:p-10 transition-[transform,box-shadow,border-color] duration ease-soft hover:-translate-y-0.5 hover:shadow-2 active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${i === 1 ? "bg-primary-soft" : "bg-surface"}`}>
                  {/* lg+: title left, link at the row's right end, body below. Narrower cards: title,
                      body, then link (DOM order), so the link never wedges between title and body.
                      The photo closes the card, so the padding reads the same on all four sides. */}
                  <div className="flex flex-col items-start lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-x-4">
                    <h3 className="flex items-center gap-3 text-2xl font-semibold text-ink transition-colors duration-fast ease-soft group-hover:text-primary lg:col-start-1 lg:row-start-1">
                      <Icon size={26} weight="regular" aria-hidden="true" className="shrink-0 text-primary" />
                      {s.title}
                    </h3>
                    <p className="mt-3 max-w-[46ch] text-[15px] leading-relaxed text-ink-2 lg:col-span-2 lg:row-start-2">{s.body}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-medium text-primary group-hover:text-primary-deep lg:col-start-2 lg:row-start-1 lg:mt-0">
                      Conocer más <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-fast ease-soft group-hover:translate-x-1" />
                    </span>
                  </div>
                  <div className="mt-6 flex flex-1 flex-col justify-end">
                    <Photo img={photos[i]} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[16/9] rounded-md border border-line" />
                  </div>
                </Link>
              </RevealItem>
            );
          })}
        </Reveal>
        {more && (
          <p className="mt-6 flex flex-wrap items-center gap-x-6 text-[15px]">
            <span className="text-muted">{more.label}</span>
            {more.links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-[2px] font-medium text-primary hover:text-primary-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="link-draw">{l.label}</span>
                <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-fast ease-soft group-hover:translate-x-1" />
              </Link>
            ))}
          </p>
        )}
      </div>
    </section>
  );
}
