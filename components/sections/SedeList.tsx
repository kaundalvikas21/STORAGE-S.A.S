"use client";
import { NavigationArrow } from "@phosphor-icons/react/dist/ssr";
import { useState, type ReactNode } from "react";
import Reveal, { RevealItem } from "@/components/Reveal";

type Point = { lat: number; lng: number };
type Item = Point & { id: string; card: ReactNode };
type Props = {
  items: Item[];
  /** Section heading block (eyebrow, h2, intro, rule), server-rendered by SedeGrid. */
  heading: ReactNode;
  /** "Ver las 7 sedes" link, sits inline with the sort button (approved artifact layout). */
  link: ReactNode;
  /** The map cell: beside the cards at lg, stacked above them below. */
  map: ReactNode;
};

/** Window event SedeLeafletMap listens to; detail = id of the nearest sede. */
export const NEAR_EVENT = "storage:sede-near";

// Great-circle distance in km (haversine): plenty to rank 7 points inside Bogotá.
function km(a: Point, b: Point) {
  const r = Math.PI / 180;
  const h = Math.sin(((b.lat - a.lat) * r) / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(((b.lng - a.lng) * r) / 2) ** 2;
  return 12742 * Math.asin(Math.sqrt(h));
}

const fmt = new Intl.NumberFormat("es-CO", { maximumFractionDigits: 1 });

/**
 * Locator body with an opt-in "nearest first" sort (client checklist §2). Lays out the section
 * header (heading left; sort button + link inline on the right), the status line, then the
 * map + card list band. Cards, heading and map arrive server-rendered; this only reorders cards.
 * Location is asked on click, never on load, so the default (and crawled) order keeps Autopista
 * Norte first. Browser Geolocation only, no IP service. Denied or unavailable: the default order
 * stays and the status line says so. The first card spans both columns at sm-md so seven cards
 * fill the grid with no empty cell.
 */
export default function SedeList({ items, heading, link, map }: Props) {
  const [dist, setDist] = useState<Record<string, number> | null>(null);
  const [status, setStatus] = useState<"idle" | "locating" | "error">("idle");
  const list = dist ? [...items].sort((a, b) => dist[a.id] - dist[b.id]) : items;

  const locate = () => {
    if (!navigator.geolocation) return setStatus("error");
    setStatus("locating");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const here = { lat: coords.latitude, lng: coords.longitude };
        const d = Object.fromEntries(items.map((i) => [i.id, km(here, i)]));
        setDist(d);
        setStatus("idle");
        const nearest = items.reduce((a, b) => (d[a.id] <= d[b.id] ? a : b));
        window.dispatchEvent(new CustomEvent(NEAR_EVENT, { detail: nearest.id }));
      },
      () => {
        setDist(null);
        setStatus("error");
      },
      { timeout: 10_000, maximumAge: 600_000 },
    );
  };

  return (
    <>
      <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        {heading}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <button
            type="button"
            onClick={locate}
            disabled={status === "locating"}
            className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-md border border-line bg-surface px-4 text-[14px] font-medium text-ink shadow-1 transition-colors duration-fast ease-soft hover:border-muted-2 disabled:cursor-wait focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <NavigationArrow size={16} aria-hidden="true" />
            {status === "locating" ? "Buscando tu ubicación" : "Ordenar por cercanía"}
          </button>
          {link}
        </div>
      </Reveal>
      <p role="status" className="mt-2 min-h-[1.5em] text-[13px] text-muted">
        {status === "error"
          ? "No pudimos obtener tu ubicación. Te mostramos el orden habitual."
          : dist
            ? "Primero la sede más cercana a ti."
            : ""}
      </p>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.05fr_1fr] lg:gap-5">
        {map}
        <Reveal group as="ul" role="list" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
          {list.map((i, idx) => (
            <RevealItem as="li" key={i.id} layout className={`relative ${idx === 0 ? "sm:col-span-2 lg:col-span-1" : ""}`}>
              {i.card}
              {dist && (
                <span className="tnum pointer-events-none absolute right-10 top-1/2 -translate-y-1/2 rounded-full bg-primary-soft px-2 py-0.5 text-[12px] font-medium text-ink-2">
                  {fmt.format(dist[i.id])} km
                </span>
              )}
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </>
  );
}
