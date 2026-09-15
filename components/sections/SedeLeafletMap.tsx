"use client";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useRef } from "react";
import { NEAR_EVENT } from "@/components/sections/SedeList";
import { mapTiles, sedes, type Sede } from "@/content/site";

const FEATURED = sedes[0].id;

// divIcon DOM lives inside `.sede-band`, so the CSS :has() rules keep highlighting pins from
// card hover/focus with zero JS sync (interactive moment 3). Keyed by sede id: one pin per card.
const pinHtml = (id: string, featured: boolean) =>
  `<span data-pin="${id}" class="map-pin${featured ? " map-pin-featured pin-pulse" : ""}"></span>`;

/** Real Bogotá map on Esri dark gray tiles (further muted via .sede-tiles), logo-yellow divIcon
 *  markers, dashed arcs linking the sedes (like the client's banner), token-styled popups with the
 *  sede's name and address. Scroll-zoom off (no scroll-jack); pan + buttons only. When SedeList
 *  finds the visitor's nearest sede it fires NEAR_EVENT and the map centres on that pin. */
export default function SedeLeafletMap({ points: list = sedes }: { points?: Sede[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    // Touch (phones and tablets, any width): one-finger drag off so a swipe over the map scrolls the
    // page instead of trapping it; two-finger pinch still zooms (touchZoom) and a tap opens a popup.
    const touch = window.matchMedia("(pointer: coarse)").matches;
    const narrow = ref.current.clientWidth < 640;
    // Zoom buttons bottom-left: the top-left corner holds SedeMap's caption.
    const map = L.map(ref.current, { scrollWheelZoom: false, zoomControl: false, dragging: !touch });
    L.control.zoom({ position: "bottomleft" }).addTo(map);
    L.tileLayer(mapTiles.url, { attribution: mapTiles.attribution, className: "sede-tiles", maxZoom: 16 }).addTo(map);
    const points = list.map((s) => [s.lat, s.lng] as [number, number]);
    // Top padding clears SedeMap's caption and the featured pin's tag above it (it is the
    // north-most pin, so nothing sits above it); tighter on a phone-width map. maxZoom: a one-pin
    // sede page stays at street level.
    const padding = narrow ? { paddingTopLeft: [24, 96], paddingBottomRight: [24, 40] } : { paddingTopLeft: [40, 120], paddingBottomRight: [40, 56] };
    map.fitBounds(L.latLngBounds(points), { ...(padding as L.FitBoundsOptions), maxZoom: 15 });
    // Colour comes from the CSS class (stroke: var(--brand)); Leaflet's own `color` is overridden.
    L.polyline(points, { className: "sede-arc", weight: 1.5, interactive: false }).addTo(map);

    const markers = new Map<string, L.Marker>();
    list.forEach((s) => {
      const featured = s.id === FEATURED;
      const size = featured ? 24 : 16;
      const marker = L.marker([s.lat, s.lng], {
        icon: L.divIcon({
          html: pinHtml(s.id, featured),
          className: "map-pin-wrap",
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
        }),
        alt: s.name,
      }).addTo(map);
      marker.bindPopup(`<strong>${s.name}</strong><br/>${s.address}<br/><a href="/sedes/${s.slug}/">Cómo llegar →</a>`);
      // Callout on the pin: the featured one is permanent (its badge), the others open on pin
      // hover (Leaflet) and on card hover/focus (listeners below), like the approved artifact.
      // Touch has no hover, so there the others rely on the tap popup alone.
      if (featured || !touch) marker.bindTooltip(
        featured ? `<strong>${s.name}</strong>Nueva sede · Alta disponibilidad` : `<strong>${s.name}</strong>${s.address}`,
        // Hover callouts open to the LEFT: the pins sit in the map's right half, so the left is
        // free, and they never cover the featured tag above the Autopista Norte pin.
        { permanent: featured, direction: featured ? "top" : "left", offset: featured ? [0, -16] : [-14, 0], className: "map-tag" },
      );
      markers.set(s.id, marker);
    });

    // Card ↔ pin callout sync. The band wraps both, so one listener pair covers all seven cards.
    const band = ref.current.closest(".sede-band");
    const idOf = (e: Event) => (e.target as Element).closest?.("[data-sede]")?.getAttribute("data-sede") ?? "";
    const show = (e: Event) => markers.get(idOf(e))?.openTooltip();
    const hide = (e: Event) => {
      const id = idOf(e);
      if (id && id !== FEATURED) markers.get(id)?.closeTooltip();
    };
    band?.addEventListener("mouseover", show);
    band?.addEventListener("mouseout", hide);
    band?.addEventListener("focusin", show);
    band?.addEventListener("focusout", hide);

    const onNear = (e: Event) => {
      const marker = markers.get((e as CustomEvent<string>).detail);
      if (!marker) return;
      map.setView(marker.getLatLng(), 14);
      marker.openPopup();
    };
    window.addEventListener(NEAR_EVENT, onNear);

    return () => {
      window.removeEventListener(NEAR_EVENT, onNear);
      band?.removeEventListener("mouseover", show);
      band?.removeEventListener("mouseout", hide);
      band?.removeEventListener("focusin", show);
      band?.removeEventListener("focusout", hide);
      map.remove();
    };
  }, [list]);

  return <div ref={ref} className="h-full w-full" />;
}
