import Link from "next/link";
import { MapPin } from "@phosphor-icons/react/dist/ssr";
import { SEDES_URL, zones } from "@/content/site";

/** On mobile this sits directly under the hero (CSS order), on desktop it folds into the flow after intent cards. */
export default function ZoneSelector() {
  return (
    <section aria-labelledby="zona-title" className="order-1 md:order-3">
      <div className="mx-auto max-w-site px-5 md:px-8 lg:px-10 pt-14 md:pt-0 pb-12 md:pb-20">
        <div className="rounded-xl bg-bg-deep ring-1 ring-line p-1.5">
          <div className="rounded-xl-inner bg-surface shadow-inset px-5 py-5 md:px-8 md:py-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <div className="flex items-center gap-3 shrink-0">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-primary">
                <MapPin size={22} weight="light" aria-hidden="true" />
              </span>
              <h2 id="zona-title" className="font-display text-xl font-semibold text-ink">¿Dónde estás?</h2>
            </div>
            <ul className="flex flex-wrap gap-2" role="list">
              {zones.map((z) => (
                <li key={z.href}>
                  <Link href={z.href} className="inline-flex min-h-11 items-center rounded-full bg-primary-soft px-4 py-2 text-[14px] font-medium text-primary hover:bg-primary hover:text-on-primary transition-[color,background-color,box-shadow,transform] duration-fast ease-premium active:scale-press cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg">
                    {z.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={SEDES_URL} className="inline-flex min-h-11 items-center rounded-full px-4 py-2 text-[14px] font-medium text-ink-2 ring-1 ring-inset ring-line hover:text-primary hover:ring-primary transition-[color,background-color,box-shadow,transform] duration-fast ease-premium active:scale-press cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg">
                  Ver mapa de sedes
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
