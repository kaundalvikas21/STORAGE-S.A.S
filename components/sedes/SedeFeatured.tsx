import { NavigationArrow } from "@phosphor-icons/react/dist/ssr";
import Button from "@/components/Button";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import { sedePhotos } from "@/content/images";
import { sedePages, sedesHub } from "@/content/sedes";

/** Google Maps directions by street address (the lat/lng in sedes.ts are approximate). */
export const directionsUrl = (address: string) => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

/** /sedes/ block 2: the first sede page (Autopista Norte, by array order, spec rule 5) as a split
 *  card. `data-sede` lights its map pin on hover through the `.sede-band` :has() rules. */
export default function SedeFeatured() {
  const s = sedePages[0];
  const t = sedesHub.featured;
  return (
    <section aria-labelledby="featured-title" className="mx-auto max-w-site px-5 pb-12 md:px-8 md:pb-16 lg:px-10">
      <Reveal>
        <article data-sede={s.id} className="grid overflow-hidden rounded-lg border border-line bg-surface shadow-1 md:grid-cols-[1.1fr_1fr]">
          <Photo img={sedePhotos[s.id]} sizes="(min-width: 768px) 55vw, 100vw" zoom={false} className="aspect-[4/3] w-full md:aspect-auto md:h-full md:min-h-[340px]" />
          <div className="flex flex-col items-start p-6 md:p-8">
            <span className="rounded-full bg-accent px-2.5 py-1 text-[12px] font-medium text-on-accent">{t.badge}</span>
            <h2 id="featured-title" className="mt-4 font-display text-3xl font-semibold text-ink">{s.title}</h2>
            <address className="mt-2 text-[15px] not-italic text-ink-2">{s.address}</address>
            <p className="tnum mt-4 text-[15px] font-medium text-ink">{t.facts}</p>
            <p className="mt-2 max-w-[48ch] text-[15px] text-ink-2">{t.catchment}</p>
            <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-7">
              <Button href={`/sedes/${s.slug}/`} variant="secondary" intent="sedes">{t.view}</Button>
              <a
                href={directionsUrl(s.address)}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-sm text-[15px] font-medium text-primary hover:text-primary-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <NavigationArrow size={16} aria-hidden="true" />
                <span className="link-draw">{t.directions}</span>
              </a>
            </div>
          </div>
        </article>
      </Reveal>
    </section>
  );
}
