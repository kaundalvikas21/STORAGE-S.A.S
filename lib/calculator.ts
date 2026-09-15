// Space calculator (spec T7). Plain TypeScript with no React and no imports, so it ports verbatim
// to a vanilla-JS WordPress widget. Volumes are common moving-volume references in m³ per piece:
// approximations to pick a unit size, not measurements of our bodegas.

export type Item = { id: string; name: string; m3: number };
export type Band = { id: string; maxM3: number };
export type Counts = Record<string, number>;

export const ITEMS: Record<string, Item[]> = {
  Sala: [
    { id: "sofa-3", name: "Sofá de 3 puestos", m3: 2 },
    { id: "sofa-2", name: "Sofá de 2 puestos", m3: 1.5 },
    { id: "sillon", name: "Sillón", m3: 0.8 },
    { id: "mesa-centro", name: "Mesa de centro", m3: 0.3 },
    { id: "mueble-tv", name: "Mueble de TV", m3: 0.6 },
    { id: "biblioteca", name: "Biblioteca", m3: 1 },
  ],
  Alcoba: [
    { id: "cama-doble", name: "Cama doble con colchón", m3: 2 },
    { id: "cama-sencilla", name: "Cama sencilla con colchón", m3: 1.2 },
    { id: "closet", name: "Clóset o armario", m3: 2 },
    { id: "comoda", name: "Cómoda", m3: 0.8 },
    { id: "nochero", name: "Nochero", m3: 0.2 },
    { id: "cuna", name: "Cuna", m3: 0.6 },
  ],
  Cocina: [
    { id: "alacena", name: "Alacena", m3: 0.8 },
    { id: "mesa-auxiliar", name: "Mesa auxiliar", m3: 0.3 },
    { id: "repisa", name: "Repisa o carrito", m3: 0.3 },
  ],
  Comedor: [
    { id: "comedor-4", name: "Mesa de comedor de 4 puestos", m3: 1 },
    { id: "comedor-6", name: "Mesa de comedor de 6 puestos", m3: 1.5 },
    { id: "silla", name: "Silla", m3: 0.3 },
    { id: "bife", name: "Bifé o vitrina", m3: 1 },
  ],
  Cajas: [
    { id: "caja-pequena", name: "Caja pequeña", m3: 0.05 },
    { id: "caja-mediana", name: "Caja mediana", m3: 0.1 },
    { id: "caja-grande", name: "Caja grande", m3: 0.15 },
    { id: "maleta", name: "Maleta", m3: 0.15 },
  ],
  Electrodomésticos: [
    { id: "nevera", name: "Nevera", m3: 1.2 },
    { id: "lavadora", name: "Lavadora", m3: 0.6 },
    { id: "secadora", name: "Secadora", m3: 0.6 },
    { id: "estufa", name: "Estufa", m3: 0.5 },
    { id: "microondas", name: "Microondas", m3: 0.1 },
    { id: "televisor", name: "Televisor", m3: 0.2 },
  ],
  Oficina: [
    { id: "escritorio", name: "Escritorio", m3: 1 },
    { id: "silla-oficina", name: "Silla de oficina", m3: 0.4 },
    { id: "archivador", name: "Archivador", m3: 0.5 },
    { id: "estanteria", name: "Estantería", m3: 0.8 },
  ],
};

/** Sum of count × m³ over every item, rounded to one decimal. */
export function computeTotal(counts: Counts) {
  const all = Object.values(ITEMS).flat();
  const sum = all.reduce((acc, item) => acc + (counts[item.id] ?? 0) * item.m3, 0);
  return Math.round(sum * 10) / 10;
}

/** First band whose ceiling holds the total. Totals in a gap between bands round up. */
export function mapToBand<B extends Band>(total: number, bands: readonly B[]): B | null {
  if (total <= 0) return null;
  return bands.find((b) => total <= b.maxM3) ?? bands[bands.length - 1];
}
