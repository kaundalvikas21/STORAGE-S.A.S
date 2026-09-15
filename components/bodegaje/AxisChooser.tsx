import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Buildings, Package, Truck } from "@phosphor-icons/react/dist/ssr";
import Photo from "@/components/Photo";
import Reveal, { RevealItem } from "@/components/Reveal";
import { sizeArt } from "@/components/sections/SizeStrip";
import { sedePhotos, trasteoPhoto } from "@/content/images";
import { QUOTE_URL, SEDES_URL, bodegajePillar as t, mudanzasPillar, sedePages, sedesHub, sizes, type ServiceId } from "@/content/site";

const card =
  "group flex h-full cursor-pointer overflow-hidden rounded-lg border border-line bg-surface shadow-1 transition-[transform,box-shadow,border-color] duration ease-soft hover:-translate-y-0.5 hover:border-muted-2 hover:shadow-2 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
const arrow = "transition-transform duration-fast ease-soft group-hover:translate-x-1";
const cardLink = "mt-auto inline-flex items-center gap-1.5 pt-4 text-[14px] font-medium text-primary group-hover:text-primary-deep";

/** 4-up illustration cards, the homepage SizeStrip idiom (same art, same hover). */
function SizeCards() {
  return (
    <Reveal group as="ul" role="list" className="mt-10 grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
      {sizes.map((s, i) => (
        <RevealItem as="li" key={s.id} className="min-w-0">
          {/* SWAP to s.href when the T8 size pages ship; until then the card pre-selects the size on /cotizar/. */}
          <Link href={`${QUOTE_URL}?tamano=${s.id}`} className={`${card} flex-col`}>
            <div
              aria-hidden="true"
              className={`relative flex aspect-[16/10] items-end justify-center overflow-hidden bg-gradient-to-br to-surface ${
                s.hot ? "from-accent-soft via-accent-soft/40" : "from-primary-soft via-primary-soft/40"
              }`}
            >
              <Image
                src={sizeArt[i]}
                alt=""
                width={1254}
                height={1254}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="h-[118%] w-auto max-w-none translate-y-[8%] transition-transform duration-slow ease-soft group-hover:scale-zoom"
              />
            </div>
            <div className="flex flex-1 flex-col p-5 md:p-6">
              <h3 className="text-lg font-semibold text-ink transition-colors duration-fast ease-soft group-hover:text-primary">{s.name}</h3>
              <p className="tnum mt-1 text-2xl font-semibold text-ink">{s.range}</p>
              <p className="mt-2 text-[14px] text-ink-2">{s.fits}</p>
              <span className={cardLink}>
                {t.size.cardLink} <ArrowRight size={14} aria-hidden="true" className={arrow} />
              </span>
            </div>
          </Link>
        </RevealItem>
      ))}
    </Reveal>
  );
}

/** Thumbnail rows, one per sede page, in content/sedes.ts order: never sorted, 197 first and badged (R6). */
function SedeCards() {
  return (
    <>
      <Reveal group as="ul" role="list" className="mt-10 grid gap-4 md:grid-cols-2 md:gap-5">
        {sedePages.map((s) => (
          <RevealItem as="li" key={s.slug}>
            <Link href={`/sedes/${s.slug}/`} className={`${card} items-center gap-4 p-3 pr-5`}>
              <Photo img={sedePhotos[s.id]} sizes="96px" className="aspect-square w-20 shrink-0 rounded-md border border-line md:w-24" />
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <h3 className="font-display text-lg font-semibold text-ink transition-colors duration-fast ease-soft group-hover:text-primary-deep">{s.title}</h3>
                  {s.points.length > 1 && <span className="tnum text-[13px] font-medium text-muted">{s.points.length} {sedesHub.points}</span>}
                  {s.badge && <span className="rounded-full bg-accent px-2 py-px text-[11px] font-medium text-on-accent">{s.badge}</span>}
                </div>
                <address className="mt-1 flex flex-col text-[13px] not-italic leading-snug text-muted">
                  {s.points.map((p) => (
                    <span key={p.id}>{p.address}</span>
                  ))}
                </address>
              </div>
              <ArrowRight size={16} aria-hidden="true" className={`shrink-0 text-primary ${arrow}`} />
            </Link>
          </RevealItem>
        ))}
      </Reveal>
      <Link
        href={SEDES_URL}
        className="group mt-6 inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-[2px] text-[15px] font-medium text-primary hover:text-primary-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className="link-draw">{t.sede.all}</span> <ArrowRight size={15} aria-hidden="true" className={arrow} />
      </Link>
    </>
  );
}

const serviceIcons = { trasteos: Truck, empresariales: Buildings, mercancias: Package } satisfies Record<ServiceId, unknown>;

/** /mudanzas-bogota/ children (spec T2b). Trasteos, the highest-volume term, is the wide photo card; the
 *  other two sit beside it at lg (1.6fr/1fr/1fr, never three equal cards), under it at md, stacked on
 *  phones. The second cell is tinted for background rhythm. Hrefs are SWAP-marked in content/mudanzas.ts. */
function ServiceCards() {
  const s = mudanzasPillar.services;
  const [lead, ...rest] = s.items;
  const LeadIcon = serviceIcons[lead.id];
  return (
    <Reveal group as="ul" role="list" className="mt-10 grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-[1.6fr_1fr_1fr]">
      <RevealItem as="li" className="md:col-span-2 lg:col-span-1">
        <Link href={lead.href} className={`${card} flex-col`}>
          <Photo img={trasteoPhoto} sizes="(min-width: 1024px) 45vw, 100vw" className="aspect-[16/9] w-full lg:aspect-[2/1]" />
          <div className="flex flex-1 items-start gap-4 p-6 md:p-7">
            <LeadIcon size={26} aria-hidden="true" className="mt-1 shrink-0 text-primary" />
            <div className="flex h-full flex-1 flex-col">
              <h3 className="font-display text-2xl font-semibold text-ink transition-colors duration-fast ease-soft group-hover:text-primary">{lead.title}</h3>
              <p className="mt-2 max-w-[48ch] text-[15px] leading-relaxed text-ink-2">{lead.body}</p>
              <span className={cardLink}>
                {s.cardLink} <ArrowRight size={14} aria-hidden="true" className={arrow} />
              </span>
            </div>
          </div>
        </Link>
      </RevealItem>
      {rest.map((it, i) => {
        const Icon = serviceIcons[it.id];
        return (
          <RevealItem as="li" key={it.id}>
            <Link href={it.href} className={`${card} flex-col p-6 md:p-7 ${i === 0 ? "!bg-primary-soft" : ""}`}>
              <span aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-md border border-line bg-surface text-primary">
                <Icon size={24} />
              </span>
              <h3 className="mt-6 text-xl font-semibold text-ink transition-colors duration-fast ease-soft group-hover:text-primary">{it.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{it.body}</p>
              <span className={cardLink}>
                {s.cardLink} <ArrowRight size={14} aria-hidden="true" className={arrow} />
              </span>
            </Link>
          </RevealItem>
        );
      })}
    </Reveal>
  );
}

const grids = { size: SizeCards, sede: SedeCards, services: ServiceCards };
const copy = { size: t.size, sede: t.sede, services: mudanzasPillar.services };

/** Pillar choosers (spec T2): by size (1B) or sede (1C) on /bodegaje-bogota/, by service on /mudanzas-bogota/.
 *  Every card is an internal link DOWN into its silo (R3). Segment pages reuse the sede variant as their
 *  "nearest sede" block with their own `title`/`body`. Choose by segment (1A) is the homepage SegmentStrip. */
export default function AxisChooser({ variant, title = copy[variant].title, body = copy[variant].body }: { variant: keyof typeof grids; title?: string; body?: string }) {
  const Grid = grids[variant];
  return (
    <section aria-labelledby={`axis-${variant}`}>
      <div className="mx-auto max-w-site px-5 py-14 md:px-8 md:py-20 lg:px-10">
        <Reveal>
          <h2 id={`axis-${variant}`} className="max-w-[24ch] font-display text-3xl font-semibold text-ink">{title}</h2>
          <p className="mt-3 max-w-[65ch] text-[15px] text-muted">{body}</p>
        </Reveal>
        <Grid />
      </div>
    </section>
  );
}
