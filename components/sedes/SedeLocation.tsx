import { Car, NavigationArrow } from "@phosphor-icons/react/dist/ssr";
import Reveal, { RevealItem } from "@/components/Reveal";
import SedeMap from "@/components/sections/SedeMap";
import { sedePage as t, type SedePage } from "@/content/sedes";
import { directionsUrl, wazeUrl } from "@/lib/maps";

const link =
  "group inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-sm text-[15px] font-medium text-primary hover:text-primary-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

/** Sede page block 6 (spec T5): the hub's Leaflet map cell with only this page's pins (lg only, like
 *  the hub), plus one card per physical point with Google Maps and Waze deep links (spec note 5).
 *  `data-sede` lights the matching pin through the `.sede-band` rules on <main>. Several points: map
 *  left, cards right. One point: map full width, card below. Below lg the cards carry everything. */
export default function SedeLocation({ page }: { page: SedePage }) {
  const multi = page.points.length > 1;
  return (
    <section id="ubicacion" aria-labelledby="location-title" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-site px-5 py-14 md:px-8 md:py-20 lg:px-10">
        <h2 id="location-title" className="font-display text-3xl font-semibold text-ink">{t.locationTitle}</h2>
        <div className={`mt-8 grid gap-5 ${multi ? "lg:grid-cols-[1.6fr_1fr]" : ""}`}>
          <div className="hidden lg:block">
            <SedeMap points={page.points} />
          </div>
          <Reveal group as="ul" role="list" className={`grid gap-3 ${multi ? "md:grid-cols-2 lg:grid-cols-1 lg:content-start" : ""}`}>
            {page.points.map((p) => (
              <RevealItem as="li" key={p.id}>
                <article data-sede={p.id} className={`h-full rounded-lg border border-line bg-surface p-5 shadow-1 ${multi ? "" : "md:flex md:items-center md:justify-between md:gap-6"}`}>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ink">{p.name}</h3>
                    <address className="mt-1 text-[15px] not-italic text-ink-2">{p.address}</address>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-x-6 md:mt-0">
                    <a href={directionsUrl(p.address)} target="_blank" rel="noopener noreferrer" className={link}>
                      <NavigationArrow size={16} aria-hidden="true" />
                      <span className="link-draw">{t.maps}</span>
                    </a>
                    <a href={wazeUrl(p.address)} target="_blank" rel="noopener noreferrer" className={link}>
                      <Car size={16} aria-hidden="true" />
                      <span className="link-draw">{t.waze}</span>
                    </a>
                  </div>
                </article>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
