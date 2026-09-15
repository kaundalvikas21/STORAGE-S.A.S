// Directions deep links for a sede, by street address (the lat/lng in content/sedes.ts are approximate).
// Zero imports so it ports to a WordPress widget verbatim. The "(principal)" / "(PQ1)" suffixes in
// the addresses are labels for people, not geocodable, so they are dropped.
const clean = (address: string) => encodeURIComponent(address.replace(/\s*\(.*?\)\s*$/, ""));

export const directionsUrl = (address: string) => `https://www.google.com/maps/dir/?api=1&destination=${clean(address)}`;

export const wazeUrl = (address: string) => `https://waze.com/ul?q=${clean(address)}&navigate=yes`;
