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
// `title` is the bare page name ("Toberín"), `points` the physical sedes that page lists.
export const sedePages = sedes
  .filter((s, i, all) => all.findIndex((x) => x.slug === s.slug) === i)
  .map((s) => {
    const points = sedes.filter((x) => x.slug === s.slug);
    const title = points.length > 1 ? s.name.replace(/ \d+$/, "") : s.name;
    return { ...s, title, points, name: points.length > 1 ? `${title} (${points.length} puntos)` : s.name };
  });

// /sedes/ hub copy (spec T4). Title, description and h1 are the spec's exact strings. The coverage
// prose only restates each sede's `coverage` above; nothing about areas between sedes is promised.
export const sedesHub = {
  metaTitle: "Nuestras Sedes | 7 Bodegas en Bogotá | Storage",
  description: "7 sedes de minibodegas en Bogotá: Toberín, Spring Calle 135, Paloquemao y Autopista Norte Calle 197. Encuentra la más cercana.",
  crumb: "Sedes",
  h1: "Nuestras sedes en Bogotá",
  intro: "Siete puntos en el norte, noroccidente, centro y Sabana Norte de Bogotá, agrupados en cuatro sedes. Elige la que te quede más cerca de tu casa o tu negocio.",
  featured: {
    badge: "Nueva sede · mayor disponibilidad",
    facts: "~200 bodegas · acceso vehicular · CCTV 24/7", // PENDIENTE CONFIRMAR número de bodegas (spec Open Item 3)
    catchment: "Atiende Sabana Norte: Chía, Cajicá, Cota, Sopó.",
    view: "Ver sede",
    directions: "Cómo llegar",
  },
  gridTitle: "Más sedes en Bogotá",
  points: "puntos",
  zonesLabel: "Zonas que atiende",
  cardLink: "Ver detalles",
  coverageTitle: "¿Qué sede te queda más cerca?",
  coverage: [
    "Si vives o trabajas en Chía, Cajicá, Cota, Sopó o en el norte de Usaquén, la sede Autopista Norte con Calle 197 es la más directa: está sobre la autopista, a la entrada de Bogotá desde la Sabana.",
    "Para Usaquén, Cedritos, Toberín y Santa Bárbara están los tres puntos de Toberín, a pocas cuadras entre sí sobre la Calle 163 y la Carrera 19B. Desde Suba, Colina, Niza o Pasadena, la sede Spring en la Calle 135 suele ser la opción más cómoda.",
    "En el centro, los dos puntos de Paloquemao atienden Puente Aranda, Los Mártires y Ricaurte. Si estás en Chapinero, Teusaquillo u otra zona entre sedes, la mejor opción depende de tu ruta: en la cotización elige «La más cercana a mí» y te recomendamos la sede y el tamaño.",
  ],
  cta: {
    title: "¿No sabes qué sede elegir?",
    body: "Cuéntanos qué necesitas guardar y en qué zona. Te recomendamos la sede y el tamaño que mejor se ajustan, el mismo día.",
  },
};

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
