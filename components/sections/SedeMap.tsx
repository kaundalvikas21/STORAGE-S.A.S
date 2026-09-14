"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const LazyMap = dynamic(() => import("@/components/sections/SedeLeafletMap"), {
  ssr: false,
  loading: () => <div aria-hidden="true" className="h-full w-full animate-pulse bg-surface" />,
});

/**
 * Interactive Bogotá map cell (Leaflet) as a `.dark-cell`, in the spirit of the client's
 * "Estamos en toda Bogotá" banner: dark tiles, yellow pins, the banner's headline as a caption.
 * Desktop-only: the sede card list alone carries all the information, the map is a faster way in.
 * Mounted only at lg+ so mobile never downloads the map chunk or a single tile.
 * ponytail: initial matchMedia check only; a mid-session resize past 1024px needs a reload.
 */
export default function SedeMap() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- deliberate post-hydration gate: mobile must not download the map chunk
    setDesktop(window.matchMedia("(min-width: 1024px)").matches);
  }, []);
  return (
    <div
      role="region"
      aria-label="Mapa de las 7 sedes en Bogotá"
      className="dark-cell relative hidden h-full min-h-[480px] overflow-hidden rounded-lg shadow-3 lg:block"
    >
      {desktop && <LazyMap />}
      {/* Caption over the map (z above Leaflet's isolated stack): the banner's own line. */}
      <div aria-hidden="true" className="pointer-events-none absolute left-5 top-4 z-10 max-w-[60%]">
        <p className="font-display text-2xl font-semibold leading-tight text-ink">
          Estamos en <span className="text-brand">toda Bogotá</span>
        </p>
        <p className="mt-1 text-[13px] text-muted">7 sedes, estratégicamente ubicadas para estar siempre cerca de ti.</p>
      </div>
    </div>
  );
}
