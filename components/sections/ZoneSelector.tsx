import Link from "next/link";
import { MapPin } from "@phosphor-icons/react/dist/ssr";
import { SEDES_URL, zones } from "@/content/site";

/** On mobile this sits directly under the hero (CSS order), on desktop it folds into the flow after intent cards. */
export default function ZoneSelector() {
  return (
    <section aria-labelledby="zona-title" className="order-1 md:order-3">
      <div className="mx-auto max-w-site px-5 md:px-8 lg:px-10 pb-12 md:pb-16">
        <div className="border-[1.5px] border-ink bg-surface px-5 py-5 md:px-8 md:py-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
          <div className="flex items-center gap-3 shrink-0">
            <MapPin size={22} weight="regular" aria-hidden="true" className="text-primary-deep" />
            <h2 id="zona-title" className="font-display text-xl font-bold uppercase text-ink">¿Dónde estás?</h2>
          </div>
          <ul className="flex flex-wrap gap-2" role="list">
            {zones.map((z) => (
              <li key={z.href}>
                <Link href={z.href} className="inline-flex min-h-[44px] items-center border border-ink bg-bg px-4 font-mono text-[13px] uppercase tracking-[0.06em] text-ink hover:bg-ink hover:text-bg transition-colors duration-fast ease-soft active:opacity-80 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  {z.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={SEDES_URL} className="inline-flex min-h-[44px] items-center border border-line bg-bg px-4 font-mono text-[13px] uppercase tracking-[0.06em] text-muted hover:border-ink hover:text-ink transition-colors duration-fast ease-soft active:opacity-80 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                Ver mapa de sedes
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
