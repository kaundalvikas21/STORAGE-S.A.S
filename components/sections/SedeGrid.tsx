import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Button from "@/components/Button";
import Photo from "@/components/Photo";
import Reveal, { RevealRule } from "@/components/Reveal";
import SedeList from "@/components/sections/SedeList";
import SedeMap from "@/components/sections/SedeMap";
import { sedePhotos } from "@/content/images";
import { QUOTE_URL, SEDES_URL, sedes } from "@/content/site";

const card =
  "group flex h-full cursor-pointer items-center gap-3 rounded-md border border-line bg-surface p-2 pr-3 shadow-1 transition-[transform,box-shadow,border-color] duration ease-soft hover:-translate-y-0.5 hover:border-muted-2 hover:shadow-2 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

/** Compact map-first locator (client checklist §2, approved artifact v2): the dark map cell on
 *  the left (lg only) and the 7 physical points as slim cards on the right, one card per pin,
 *  same name and address on both. Card hover/focus highlights its pin (CSS :has on `.sede-band`,
 *  keyed by id). Cards, heading and map render here on the server; SedeList lays them out (sort
 *  button inline with the "Ver las 7 sedes" link, approved artifact) and only reorders the cards. Autopista Norte first by default (content/site.ts). A slim quote
 *  row closes the section for zones without a sede. About half the height of the old photo cards. */
export default function SedeGrid() {
  const items = sedes.map((s) => ({
    id: s.id,
    lat: s.lat,
    lng: s.lng,
    card: (
      <Link href={`/sedes/${s.slug}/`} data-sede={s.id} className={card}>
        <Photo img={sedePhotos[s.id]} sizes="48px" className="aspect-square w-11 shrink-0 rounded-sm border border-line" />
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <span className="text-[15px] font-semibold leading-tight text-ink transition-colors duration-fast ease-soft group-hover:text-primary-deep">{s.name}</span>
            <span className="text-[12px] font-medium text-muted">{s.zone}</span>
            {s.badge && <span className="rounded-full bg-accent px-2 py-px text-[11px] font-medium text-on-accent">{s.badge}</span>}
          </span>
          <address className="text-[13px] not-italic leading-snug text-muted">{s.address}</address>
          <span className="hidden text-[12px] leading-snug text-ink-2 xl:block">{s.sizesHint}</span>
        </span>
        <ArrowRight size={16} aria-hidden="true" className="shrink-0 text-primary transition-transform duration-fast ease-soft group-hover:translate-x-1" />
      </Link>
    ),
  }));

  return (
    <section aria-labelledby="sedes-title" className="sede-band order-5">
      <div className="mx-auto max-w-site px-5 py-14 md:px-8 md:py-20 lg:px-10 lg:py-24">
        <SedeList
          items={items}
          map={<SedeMap />}
          heading={
            <div>
              <p className="eyebrow mb-3">Red de sedes</p>
              <h2 id="sedes-title" className="max-w-[20ch] font-display text-3xl font-semibold text-ink">Una bodega cerca de donde estás</h2>
              <p className="mt-3 max-w-[52ch] text-[15px] text-muted">Siete sedes en el norte, noroccidente, centro y Sabana Norte de Bogotá.<span className="hidden lg:inline"> Pasa el cursor por una sede para ubicarla en el mapa.</span></p>
              <RevealRule className="mt-5 max-w-[320px]" />
            </div>
          }
          link={
            <Link href={SEDES_URL} className="group inline-flex min-h-[44px] items-center gap-1.5 rounded-[2px] text-[14px] font-medium text-primary hover:text-primary-deep cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <span className="link-draw">Ver las 7 sedes</span> <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-fast ease-soft group-hover:translate-x-1" />
            </Link>
          }
        />

        <Reveal className="mt-5 flex flex-col items-start gap-4 rounded-lg border border-line bg-surface p-5 shadow-1 sm:flex-row sm:items-center sm:justify-between md:px-6">
          <p className="text-[15px] text-ink-2">¿No ves una sede en tu zona? Te recomendamos la más conveniente para ti.</p>
          <Button href={QUOTE_URL} size="md" intent="cotizar" className="shrink-0">
            Cotizar
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
