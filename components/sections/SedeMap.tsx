"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { Sede } from "@/content/sedes";

const LazyMap = dynamic(() => import("@/components/sections/SedeLeafletMap"), {
  ssr: false,
  loading: () => <div aria-hidden="true" className="h-full w-full animate-pulse bg-surface" />,
});

/**
 * Interactive Bogotá map cell (Leaflet) as a `.dark-cell`, in the spirit of the client's
 * "Estamos en toda Bogotá" banner: dark tiles, yellow pins, the banner's headline as a caption.
 * Every breakpoint: stacked above the cards below lg (340px on phones, 440px on tablets), beside
 * them from lg. The box is reserved (no CLS) and the Leaflet chunk and tiles load only once the
 * cell comes within 300px of the viewport, so the first paint never pays for the map. Touch
 * devices scroll the page with one finger and pinch to zoom (SedeLeafletMap).
 * `points` (sede pages): only that page's pins, and no "toda Bogotá" caption.
 */
export default function SedeMap({ points }: { points?: Sede[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setNear(true);
        io.disconnect();
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      role="region"
      aria-label={points ? "Mapa de la sede" : "Mapa de las 7 sedes en Bogotá"}
      className="dark-cell relative h-[340px] overflow-hidden rounded-lg shadow-3 sm:h-[440px] lg:h-full lg:min-h-[480px]"
    >
      {near && <LazyMap points={points} />}
      {/* Caption over the map (z above Leaflet's isolated stack): the banner's own line. */}
      {!points && (
        <div aria-hidden="true" className="pointer-events-none absolute left-5 top-4 z-10 max-w-[60%]">
          <p className="font-display text-xl font-semibold leading-tight text-ink lg:text-2xl">
            Estamos en <span className="text-brand">toda Bogotá</span>
          </p>
          <p className="mt-1 hidden text-[13px] text-muted sm:block">7 sedes, estratégicamente ubicadas para estar siempre cerca de ti.</p>
        </div>
      )}
    </div>
  );
}
