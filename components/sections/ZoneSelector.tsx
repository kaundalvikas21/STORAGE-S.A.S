import Link from "next/link";
import { MapPin } from "@phosphor-icons/react/dist/ssr";
import { SEDES_URL, zones } from "@/content/site";

/** On mobile this sits directly under the hero (CSS order), on desktop it folds into the flow after IntentCards. */
export default function ZoneSelector() {
  return (
    <section aria-labelledby="zona-title" className="order-1 md:order-3">
      <div className="mx-auto max-w-site px-5 md:px-8 lg:px-10 pb-12 md:pb-16">
        <div className="flex flex-col gap-4 rounded-lg border border-line bg-surface px-5 py-5 shadow-1 md:flex-row md:items-center md:gap-8 md:px-8 md:py-6">
          <div className="flex items-center gap-3 shrink-0">
            <MapPin size={22} weight="regular" aria-hidden="true" className="text-primary" />
            <h2 id="zona-title" className="text-xl font-semibold text-ink">¿Dónde estás?</h2>
          </div>
          <ul className="flex flex-wrap gap-2" role="list">
            {zones.map((z) => (
              <li key={z.href}>
                <Link href={z.href} className="inline-flex min-h-[44px] items-center rounded-sm border border-line bg-bg px-4 text-[14px] font-medium text-ink hover:border-ink transition-colors duration-fast ease-soft cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  {z.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={SEDES_URL} className="inline-flex min-h-[44px] items-center rounded-sm px-4 text-[14px] font-medium text-primary hover:text-primary-deep transition-colors duration-fast ease-soft cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                Ver mapa de sedes
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
