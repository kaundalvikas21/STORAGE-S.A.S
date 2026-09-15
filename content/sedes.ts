// Sedes (spec silo 1C). Photos and alts live in content/images.ts (sedePhotos, keyed by id).
// `id` is unique per physical point (card, map pin, :has() highlight); `slug` is the sede page
// it links to, so the three Toberín points share /sedes/toberin/.
export type Sede = {
  id: string;
  slug: string;
  name: string;
  zone: string;
  coverage: string;
  address: string;
  lat: number;
  lng: number;
  badge?: string;
  sizesHint: string;
};

const toberin = {
  slug: "toberin",
  zone: "Calle 163",
  coverage: "Usaquén, Cedritos, Santa Bárbara",
  sizesHint: "Bodegas pequeñas y medianas",
};
const paloquemao = {
  slug: "paloquemao",
  zone: "Centro",
  coverage: "Centro, Puente Aranda, Los Mártires, Ricaurte",
  sizesHint: "Bodegas medianas y grandes",
};

// COMMERCIAL RULE: Autopista Norte (the 197) is always first here and in the server-rendered
// order, including the /cotizar/ sede selector. The only re-sort is SedeList's "Ordenar por
// cercanía", after the visitor shares location. One entry per physical point: every card has its
// map pin (checklist §2). Names and street addresses come from the client's own "Estamos en toda
// Bogotá" banner (storagebogota.com, 2026-06); PENDIENTE CONFIRMAR nomenclatura final y
// coordenadas exactas (the lat/lng are approximate).
export const sedes: Sede[] = [
  {
    id: "autopista-norte-197",
    slug: "autopista-norte-197",
    name: "Autopista Norte",
    zone: "Sabana Norte",
    coverage: "Sabana Norte, Usaquén norte",
    address: "Autopista Norte # 197-10, Bogotá",
    lat: 4.7662,
    lng: -74.0459,
    badge: "Nueva sede",
    sizesHint: "Todos los tamaños y personalizados",
  },
  { id: "toberin-1", name: "Toberín 1", address: "Carrera 19B No 164 A-40, Bogotá (principal)", lat: 4.7451, lng: -74.0463, ...toberin },
  { id: "toberin-2", name: "Toberín 2", address: "Calle 163 A No 20-62, Bogotá", lat: 4.7439, lng: -74.0441, ...toberin },
  { id: "toberin-4", name: "Toberín 4", address: "Calle 163 No 20-27, Bogotá", lat: 4.7462, lng: -74.0489, ...toberin },
  {
    id: "spring-calle-135",
    slug: "spring-calle-135",
    name: "Spring",
    zone: "Calle 135",
    coverage: "Suba, Colina, Niza, Pasadena",
    address: "Calle 135 No 46-55, Bogotá",
    lat: 4.7256,
    lng: -74.0621,
    sizesHint: "Bodegas pequeñas, medianas y grandes",
  },
  { id: "paloquemao-1", name: "Paloquemao 1", address: "Carrera 32 No 15-87, Bogotá (PQ1)", lat: 4.6172, lng: -74.0843, ...paloquemao },
  { id: "paloquemao-2", name: "Paloquemao 2", address: "Calle 17 No 32 A-59, Bogotá (PQ2)", lat: 4.6136, lng: -74.0862, ...paloquemao },
];

// One entry per sede PAGE for navigation (mega menu, drawer): the three Toberín and two Paloquemao
// points share a page, so they collapse into "Toberín (3 puntos)". Same order, Autopista Norte first.
export const sedePages = sedes
  .filter((s, i, all) => all.findIndex((x) => x.slug === s.slug) === i)
  .map((s) => {
    const points = sedes.filter((x) => x.slug === s.slug).length;
    return { ...s, name: points > 1 ? `${s.name.replace(/ \d+$/, "")} (${points} puntos)` : s.name };
  });

// Footer + Organization JSON-LD list the 7 physical addresses (spec §01-3). Derived, so the
// footer, the cards and the map pins can never disagree.
export const allAddresses = sedes.map((s) => ({ label: s.name, address: s.address }));

// Map tiles: Esri World Light Gray Canvas (keyless, no watermark). tile.openstreetmap.org
// answered "Access blocked" (OSMF tile policy) and CARTO's keyless tiles now carry an
// "API KEY REQUIRED" watermark. PENDIENTE: Esri's terms expect an ArcGIS account for commercial
// traffic; before launch swap in the client's Esri, MapTiler or Stadia key URL. Here only.
export const mapTiles = {
  url: "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
  attribution: "Tiles &copy; Esri, HERE, Garmin, &copy; OpenStreetMap contributors",
};

export const zones = [
  { label: "Norte", href: "/sedes/toberin/" },
  { label: "Sabana Norte", href: "/sedes/autopista-norte-197/" },
  { label: "Noroccidente", href: "/sedes/spring-calle-135/" },
  { label: "Centro", href: "/sedes/paloquemao/" },
];
