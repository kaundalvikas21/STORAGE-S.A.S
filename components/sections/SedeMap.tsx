"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const LazyMap = dynamic(() => import("@/components/sections/SedeLeafletMap"), {
  ssr: false,
  loading: () => <div aria-hidden="true" className="h-full w-full animate-pulse bg-bg" />,
});

/**
 * Interactive Bogotá map cell (Leaflet). Desktop-only: the sede card list alone
 * carries all the information, the map is a faster way in. Mounted only at lg+
 * so mobile never downloads the map chunk or a single tile.
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
      aria-label="Mapa de sedes en Bogotá"
      className="relative hidden h-full min-h-[420px] overflow-hidden rounded-lg border border-line bg-surface shadow-1 lg:block"
    >
      {desktop && <LazyMap />}
    </div>
  );
}
