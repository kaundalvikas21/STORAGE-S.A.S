import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { SEDES_URL, allAddresses } from "@/content/site";

/**
 * Zone index for the footer's Sedes column.
 *
 * Groups the seven points by zone so the column is scannable, but every one of the seven
 * still renders as its own `label + <address>` pair — including the three identical Toberín
 * strings. That repetition is the deliberate local-SEO consistency signal from the spec
 * (content/site.ts), so grouping here is purely visual. Never dedupe these.
 *
 * Grouping also keeps us clear of the CLAUDE.md ban on a bordered rule under every row of a
 * list longer than five items: the rules sit on four zone blocks, not on seven addresses.
 */
export default function SedeIndex() {
  const zones = allAddresses.reduce<Record<string, typeof allAddresses>>((acc, a) => {
    (acc[a.zone] ||= []).push(a);
    return acc;
  }, {});

  return (
    <div>
      <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2 md:grid-cols-1" role="list">
        {Object.entries(zones).map(([zone, points]) => (
          <li key={zone}>
            <p className="mb-3 flex items-baseline gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-primary">
              {zone}
              <span className="tnum text-bg/55" aria-label={`${points.length} ${points.length === 1 ? "punto" : "puntos"}`}>
                · {points.length}
              </span>
            </p>
            <ul className="space-y-2.5" role="list">
              {points.map((a) => (
                <li
                  key={a.label}
                  className="border-l-[3px] border-l-transparent pl-3 transition-colors duration-fast ease-soft hover:border-l-primary"
                >
                  <span className="block text-[13px] font-medium text-bg">{a.label}</span>
                  <address className="not-italic font-mono text-[12px] leading-relaxed text-bg/65">{a.address}</address>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <Link
        href={SEDES_URL}
        className="link-draw mt-5 inline-flex min-h-[44px] items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.08em] text-primary hover:text-bg active:opacity-70 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Ver las 7 sedes <ArrowRight size={13} weight="bold" aria-hidden="true" />
      </Link>
    </div>
  );
}
