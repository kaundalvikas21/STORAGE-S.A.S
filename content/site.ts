// Single source of truth for copy + NAP. Values marked "PENDIENTE CONFIRMAR" are
// client deliverables (spec: "Confirmed addresses / single phone / single WhatsApp").
// Swap them here only: nothing else in the page holds contact data.

export const QUOTE_URL = "/cotizar/";
export const CALC_URL = "/calculadora-de-espacio/";
export const SEDES_URL = "/sedes/";
export const SITE_URL = "https://storagebogota.com";

export const company = {
  legalName: "Bodegajes y Mudanzas Storage S.A.S",
  brand: "Storage S.A.S",
  founded: 2011,
  phone: "+57 601 000 0000", // PENDIENTE CONFIRMAR: única línea principal (PBX). DEBE coincidir carácter a carácter con el Google Business Profile (NAP, spec Open Item 7).
  phoneLabel: "(601) 000 0000",
  whatsapp: "+57 314 404 2043", // Línea WhatsApp del sitio actual (wa.me/573144042043). Todo enlace de chat pasa por waLink().
  whatsappLabel: "314 404 2043",
  hours: "Lun-Vie 8:00-17:30 · Sáb 8:00-13:30",
  openingHoursSpec: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "17:30" },
    { days: ["Saturday"], opens: "08:00", closes: "13:30" },
  ],
  email: "info@storagebogota.com", // PENDIENTE CONFIRMAR
};

/** The only way to build a WhatsApp chat link (checklist §5): number from `company`, prefilled text. */
export const waLink = (text: string) => `https://wa.me/${company.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;

// Photos and alts live in content/images.ts (sedePhotos, keyed by id).
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
// order. The only re-sort is SedeList's "Ordenar por cercanía", after the visitor shares location.
// One entry per physical point: every card has its map pin (checklist §2). Names and street
// addresses come from the client's own "Estamos en toda Bogotá" banner (storagebogota.com, 2026-06);
// PENDIENTE CONFIRMAR nomenclatura final y coordenadas exactas (the lat/lng are approximate).
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

// `m3` is the preset an intent card pushes into the calc store; `answer` and `sizeLabel`
// are the availability copy for the selected profile. Ranges follow the client's size table
// (Pequeñas 2-10, Medianas 15-20, Grandes 25-60, Personalizados 60+); lib/calc-store.ts mirrors them.
// Autopista Norte always named first (commercial rule).
export const intentCards = [
  { id: "cajas", title: "Algunas cajas", range: "2-5 m³", m3: 3, sizeLabel: "Bodega pequeña", hint: "Cajas, maletas, archivo", answer: "Bodega pequeña, disponible en Autopista Norte y Toberín" },
  { id: "apartaestudio", title: "Apartaestudio", range: "6-10 m³", m3: 8, sizeLabel: "Bodega pequeña", hint: "Cama, nevera, escritorio", answer: "Bodega pequeña, disponible en Autopista Norte y Toberín" },
  { id: "apartamento", title: "Apartamento", range: "15-20 m³", m3: 18, sizeLabel: "Bodega mediana", hint: "Sala, comedor, 2 alcobas", answer: "Bodega mediana, disponible en Autopista Norte y Spring" },
  { id: "empresa", title: "Empresa", range: "25 m³ +", m3: 40, sizeLabel: "Bodega grande", hint: "Inventario, mobiliario, archivo", answer: "Bodega grande o personalizada, disponible en Autopista Norte y Paloquemao" },
] as const;

// Client values (checklist §3). PENDIENTE CONFIRMAR: the ranges leave gaps at 10-15 and 20-25 m³.
export const sizes = [
  { name: "Pequeñas", range: "2-10 m³", fits: "Apartamento de 1 alcoba, cajas, archivo, objetos sueltos", hint: "Disponible en todas las sedes", href: "/bodegas-pequenas/" },
  { name: "Medianas", range: "15-20 m³", fits: "Apartamento de 2 alcobas", hint: "Disponible en todas las sedes", href: "/bodegas-medianas/" },
  { name: "Grandes", range: "25-60 m³", fits: "Apartamento de 3 o más alcobas, o casa", hint: "Autopista Norte · Alta disponibilidad", hot: true, href: "/bodegas-grandes/" },
  { name: "Personalizados", range: "60 m³ +", fits: "Oficinas, industria y casas de 4 o más alcobas", hint: "Se cotizan con visita técnica", href: "/espacios-personalizados/", differential: true },
];

export const segments = [
  {
    title: "Para tu hogar",
    body: "Mudanzas, remodelaciones, viajes, falta de espacio.",
    href: "/minibodegas-para-hogar/",
  },
  {
    title: "Para tu empresa",
    body: "Inventario, archivo, mobiliario, espacios productivos.",
    href: "/minibodegas-para-empresas/",
  },
];

export const silos = {
  bodegaje: { title: "Bodegaje y minibodegas", lead: "Guarda lo que no cabe. Espacios desde 2 m³.", body: "Mini bodegas con candado propio, por meses y sin permanencia mínima.", href: "/bodegaje-bogota/" },
  sedes: { title: "Nuestras sedes", lead: "Encuentra la bodega más cercana a ti.", body: "Siete puntos en el norte, noroccidente, centro y Sabana Norte de Bogotá.", href: SEDES_URL },
  mudanzas: { title: "Mudanzas y trasteos", lead: "Nos encargamos del traslado completo.", body: "Empaque, transporte y almacenamiento temporal si lo necesitas.", href: "/mudanzas-bogota/" },
};

// "Cómo funciona" (ported from el-sistema, checklist §1). Calculas → calculator, Cotizas → WhatsApp chat.
export const steps: { verb: string; body: string; href?: string; external?: boolean }[] = [
  { verb: "Calculas", body: "Usa la calculadora y conoce tu tamaño en dos minutos.", href: CALC_URL },
  { verb: "Cotizas", body: "Recibe el valor exacto el mismo día.", href: waLink("Hola, quiero cotizar una minibodega."), external: true },
  { verb: "Guardas con nosotros", body: "Llegas con tu candado y entras cuando quieras." },
];

export const needs = [
  { label: "Hogar", href: "/minibodegas-para-hogar/" },
  { label: "Empresas", href: "/minibodegas-para-empresas/" },
  { label: "E-commerce", href: "/bodegas-para-ecommerce/" },
  { label: "Archivo", href: "/almacenamiento-de-archivo-y-documentos/" },
  { label: "Obra", href: "/bodegas-para-constructoras/" },
];

export const trust = [
  { value: 2011, label: "Año de fundación" },
  { value: 7, label: "Sedes en Bogotá" },
  { value: 1000, suffix: "+", label: "Bodegas" },
  { value: 24, suffix: "/7", label: "CCTV y monitoreo" },
  { value: 22, label: "Profesionales" },
];

export type Review = { author: string; rating: number; text: string; date: string; sede?: string };

// Seed data with the same shape a Google Places / reviews API will return. Replace via the `reviews` prop.
export const reviews: Review[] = [
  {
    author: "Carolina M.",
    rating: 5,
    date: "2026-06",
    sede: "Spring",
    text: "Guardé el trasteo completo mientras terminaba la remodelación. El proceso fue claro desde la cotización y pude entrar a mi bodega cuando lo necesité.",
  },
  {
    author: "Andrés R.",
    rating: 5,
    date: "2026-05",
    sede: "Toberín",
    text: "Tenemos el inventario de la tienda en una bodega mediana. La atención es rápida y el acceso para cargar mercancía es muy cómodo.",
  },
  {
    author: "Laura P.",
    rating: 5,
    date: "2026-04",
    sede: "Autopista Norte",
    text: "Sede nueva, pasillos limpios y muy bien iluminados. Me ayudaron a escoger el tamaño exacto con la calculadora y no pagué espacio de más.",
  },
];

// Client and partner logos, taken from storagebogota.com (public/client_logos). w/h are the PNGs'
// intrinsic pixels. PENDIENTE: vector (SVG) versions for sharper rendering on 2x screens.
export const clients = [
  { name: "Subway", src: "/client_logos/logos-clientes-02.png", w: 185, h: 65 },
  { name: "Emermédica", src: "/client_logos/logos-clientes-04.png", w: 184, h: 97 },
  { name: "Federación Colombiana de Fútbol", src: "/client_logos/logos-clientes-05-1.png", w: 129, h: 130 },
  { name: "RSA", src: "/client_logos/logos-clientes-06.png", w: 187, h: 106 },
  { name: "Semana", src: "/client_logos/logos-aliados-07.png", w: 188, h: 65 },
];

// `link` is UI-only (deep link at the end of each answer); FAQPage JSON-LD reads q/a alone.
export const faq = [
  {
    q: "¿Cuánto cuesta una minibodega en Bogotá?",
    a: "Depende del tamaño y de la sede. Como referencia, una bodega pequeña (2-10 m³) suele estar entre $150.000 y $350.000 COP al mes; una mediana (15-20 m³) entre $350.000 y $750.000; y una grande (25-60 m³) desde $750.000. Cada espacio se cotiza según sede y tamaño, sin costos ocultos y sin permanencia mínima. Pide tu cotización y te enviamos el valor exacto el mismo día.",
    link: { label: "Ver precios y tarifas", href: "/precios/" },
  },
  {
    q: "¿Qué tamaño necesito?",
    a: "Una bodega pequeña (2-10 m³) guarda cajas, archivo o el contenido de un apartamento de una alcoba. Para un apartamento de dos alcobas recomendamos una mediana (15-20 m³), y para tres o más alcobas o una casa, una grande (25-60 m³). Oficinas, industria y casas de cuatro o más alcobas se resuelven con espacios personalizados desde 60 m³. Usa la calculadora de espacio: en dos minutos te dice el tamaño recomendado y en qué sedes está disponible.",
    link: { label: "Ir a la calculadora", href: CALC_URL },
  },
  {
    q: "¿Cómo accedo a mi bodega?",
    a: "Cada bodega es independiente y se cierra con tu propio candado. Entras libremente en el horario de atención de tu sede (Lun-Vie 8:00-17:30 · Sáb 8:00-13:30), con registro individual de ingreso y monitoreo por CCTV 24/7 que acompaña cada visita. Puedes cambiar de tamaño cuando lo necesites.",
    link: { label: "Cómo cuidamos tu bodega", href: "/seguridad/" },
  },
];

// PENDIENTE CONFIRMAR minutos reales de respuesta.
export const reassurance = "Te respondemos en menos de 15 minutos en horario de atención.";

// FAQ dark cell: the honest range from faq[0], restated as a scannable line.
export const priceSummary = "Pequeña $150.000-$350.000 · Mediana $350.000-$750.000 · Grande desde $750.000 COP/mes";

export const nav = [
  { label: "Bodegaje", href: "/bodegaje-bogota/" },
  { label: "Sedes", href: SEDES_URL },
  { label: "Mudanzas", href: "/mudanzas-bogota/" },
  { label: "Precios", href: "/precios/" },
  { label: "Empresa", href: "/quienes-somos/" },
];

export const footerCols = {
  bodegaje: [
    { label: "Bodegaje y minibodegas en Bogotá", href: "/bodegaje-bogota/" },
    { label: "Bodegas pequeñas", href: "/bodegas-pequenas/" },
    { label: "Bodegas medianas", href: "/bodegas-medianas/" },
    { label: "Bodegas grandes", href: "/bodegas-grandes/" },
    { label: "Espacios personalizados", href: "/espacios-personalizados/" },
    { label: "Minibodegas para hogar", href: "/minibodegas-para-hogar/" },
    { label: "Minibodegas para empresas", href: "/minibodegas-para-empresas/" },
    { label: "Precios y tarifas", href: "/precios/" },
  ],
  mudanzas: [
    { label: "Mudanzas en Bogotá", href: "/mudanzas-bogota/" },
    { label: "Trasteos en Bogotá", href: "/trasteos-bogota/" },
    { label: "Mudanzas empresariales", href: "/mudanzas-empresariales/" },
    { label: "Transporte de mercancías", href: "/transporte-de-mercancias/" },
    { label: "Empaque y embalaje", href: "/empaque-y-embalaje/" },
  ],
  empresa: [
    { label: "Quiénes somos", href: "/quienes-somos/" },
    { label: "Seguridad", href: "/seguridad/" },
    { label: "Preguntas frecuentes", href: "/preguntas-frecuentes/" },
    { label: "Contacto", href: "/contacto/" },
    { label: "Términos y condiciones", href: "/terminos-y-condiciones/" },
    { label: "Tratamiento de datos", href: "/politica-tratamiento-de-datos/" },
    { label: "PQRS", href: "/pqrs/" },
  ],
};

// Pop-ups and social feed config (split by domain, data-file rule in CLAUDE.md).
export * from "./engagement";
