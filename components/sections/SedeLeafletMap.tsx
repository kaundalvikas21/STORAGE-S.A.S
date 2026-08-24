"use client";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useRef } from "react";
import { mapTiles, sedePins } from "@/content/site";

const FEATURED = sedePins[0].slug;

// divIcon DOM lives inside `.sede-band`, so the existing CSS :has() rules keep
// highlighting pins from card hover/focus with zero JS sync (interactive moment 3).
const pinHtml = (slug: string, featured: boolean) =>
  `<span data-pin="${slug}" class="map-pin${featured ? " map-pin-featured pin-pulse" : ""}"></span>`;

/** Real Bogotá map: OSM-style tiles (grayscale via .sede-tiles), branded divIcon
 *  markers, styled popups. Scroll-zoom off (no scroll-jack); pan + buttons only. */
export default function SedeLeafletMap() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const map = L.map(ref.current, { scrollWheelZoom: false });
    L.tileLayer(mapTiles.url, { attribution: mapTiles.attribution, className: "sede-tiles", maxZoom: 18 }).addTo(map);
    map.fitBounds(
      L.latLngBounds(sedePins.map((p) => [p.lat, p.lng])),
      { padding: [40, 40] },
    );

    sedePins.forEach((p) => {
      const featured = p.slug === FEATURED;
      const size = featured ? 26 : 16;
      const marker = L.marker([p.lat, p.lng], {
        icon: L.divIcon({
          html: pinHtml(p.slug, featured),
          className: "map-pin-wrap",
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
        }),
        alt: p.label,
      }).addTo(map);
      marker.bindPopup(`<strong>${p.label}</strong><br/><a href="/sedes/${p.slug}/">Cómo llegar →</a>`);
      if (featured) {
        marker.bindTooltip("Nueva sede · Alta disponibilidad", {
          permanent: true,
          direction: "right",
          offset: [16, 0],
          className: "map-tag",
        });
      }
    });

    return () => {
      map.remove();
    };
  }, []);

  return <div ref={ref} className="h-full w-full" />;
}
