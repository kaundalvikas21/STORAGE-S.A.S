// Single source of truth for copy + NAP. Values marked "PENDIENTE CONFIRMAR" are
// client deliverables (spec: "Confirmed addresses / single phone / single WhatsApp").
// Swap them here only — nothing else in the page holds contact data.

export const QUOTE_URL = "/cotizar/";
export const CALC_URL = "/calculadora-de-espacio/";
export const SEDES_URL = "/sedes/";
export const SITE_URL = "https://storagebogota.com";

export const company = {
  legalName: "Bodegajes y Mudanzas Storage S.A.S",
  brand: "Storage S.A.S",
  founded: 2011,
  phone: "+57 601 000 0000", // PENDIENTE CONFIRMAR — única línea principal (PBX)
  phoneLabel: "(601) 000 0000",
  whatsapp: "+57 300 000 0000", // PENDIENTE CONFIRMAR — única línea WhatsApp (solo se muestra como texto; los CTA van a /cotizar/)
  whatsappLabel: "300 000 0000",
  hours: "Lun–Vie 8:00–17:30 · Sáb 8:00–13:30",
  openingHoursSpec: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "17:30" },
    { days: ["Saturday"], opens: "08:00", closes: "13:30" },
  ],
  email: "info@storagebogota.com", // PENDIENTE CONFIRMAR
};

export type Sede = {
  slug: string;
  name: string;
  zone: string;
  coverage: string;
  address: string;
  image: string;
  alt: string;
  badge?: string;
};

// COMMERCIAL RULE: Calle 197 is always first. Never sort, never randomize this array.
export const sedes: Sede[] = [
  {
    slug: "autopista-norte-197",
    name: "Calle 197",
    zone: "Autopista Norte",
    coverage: "Sabana Norte, Usaquén norte",
    address: "Autopista Norte con Calle 197, Bogotá — PENDIENTE CONFIRMAR nomenclatura exacta",
    image: "/img/sede-calle-197.svg",
    alt: "Fachada de la nueva sede Storage en la Autopista Norte con Calle 197, con acceso vehicular amplio",
    badge: "Nueva sede · mayor disponibilidad",
  },
  {
    slug: "toberin",
    name: "Toberín",
    zone: "Calle 163",
    coverage: "Usaquén, Cedritos, Santa Bárbara",
    address: "Calle 163 con Carrera 19B, Toberín, Bogotá — 3 puntos, PENDIENTE CONFIRMAR nomenclaturas",
    image: "/img/sede-toberin.svg",
    alt: "Pasillo de minibodegas en la sede Toberín con iluminación cálida y puertas numeradas",
  },
  {
    slug: "spring-calle-135",
    name: "Spring · Calle 135",
    zone: "Calle 135",
    coverage: "Suba, Colina, Niza, Pasadena",
    address: "Calle 135 # 46-55, Bogotá",
    image: "/img/sede-spring.svg",
    alt: "Entrada de la sede Spring en la Calle 135 con zona de cargue cubierta",
  },
  {
    slug: "paloquemao",
    name: "Paloquemao",
    zone: "Centro",
    coverage: "Centro, Puente Aranda, Los Mártires, Ricaurte",
    address: "Paloquemao, Bogotá — 2 puntos (Paloquemao 32 y 17), PENDIENTE CONFIRMAR nomenclaturas",
    image: "/img/sede-paloquemao.svg",
    alt: "Bodegas con acceso para carga en la sede Paloquemao, en el centro de Bogotá",
  },
];

// Footer lists the 7 physical addresses as text (spec §01-3). Same order rule.
export const allAddresses: { label: string; address: string }[] = [
  { label: "Autopista Norte · Calle 197", address: "Autopista Norte con Calle 197, Bogotá — PENDIENTE CONFIRMAR" },
  { label: "Toberín 1", address: "Calle 163 con Carrera 19B, Bogotá — PENDIENTE CONFIRMAR" },
  { label: "Toberín 2", address: "Calle 163 con Carrera 19B, Bogotá — PENDIENTE CONFIRMAR" },
  { label: "Toberín 3", address: "Calle 163 con Carrera 19B, Bogotá — PENDIENTE CONFIRMAR" },
  { label: "Spring · Calle 135", address: "Calle 135 # 46-55, Bogotá" },
  { label: "Paloquemao 32", address: "Paloquemao, Bogotá — PENDIENTE CONFIRMAR" },
  { label: "Paloquemao 17", address: "Paloquemao, Bogotá — PENDIENTE CONFIRMAR" },
];

export const zones = [
  { label: "Norte", href: "/sedes/toberin/" },
  { label: "Sabana Norte", href: "/sedes/autopista-norte-197/" },
  { label: "Noroccidente", href: "/sedes/spring-calle-135/" },
  { label: "Centro", href: "/sedes/paloquemao/" },
];

export const intentCards = [
  { id: "cajas", title: "Algunas cajas", range: "1–3 m³", hint: "Cajas, maletas, archivo" },
  { id: "apartaestudio", title: "Apartaestudio", range: "4–8 m³", hint: "Cama, nevera, escritorio" },
  { id: "apartamento", title: "Apartamento", range: "9–15 m³", hint: "Sala, comedor, 2 alcobas" },
  { id: "empresa", title: "Empresa", range: "16 m³ +", hint: "Inventario, mobiliario, archivo" },
] as const;

export const sizes = [
  { name: "Pequeñas", range: "1–5 m³", fits: "Cajas, archivo, objetos sueltos", href: "/bodegas-pequenas/" },
  { name: "Medianas", range: "6–15 m³", fits: "Apartamento de 1–2 alcobas", href: "/bodegas-medianas/" },
  { name: "Grandes", range: "16–50 m³", fits: "Casa completa, inventario", href: "/bodegas-grandes/" },
  { name: "Personalizados", range: "50 m³ +", fits: "Espacios a la medida de tu operación", href: "/espacios-personalizados/", differential: true },
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
  bodegaje: { title: "Bodegaje y minibodegas", lead: "Guarda lo que no cabe. Espacios desde 1 m³.", body: "Mini bodegas con candado propio, por meses y sin permanencia mínima.", href: "/bodegaje-bogota/" },
  sedes: { title: "Nuestras sedes", lead: "Encuentra la bodega más cercana a ti.", body: "Siete puntos en el norte, noroccidente, centro y Sabana Norte de Bogotá.", href: SEDES_URL },
  mudanzas: { title: "Mudanzas y trasteos", lead: "Nos encargamos del traslado completo.", body: "Empaque, transporte y almacenamiento temporal si lo necesitas.", href: "/mudanzas-bogota/" },
};

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
  { value: 500, suffix: "+", label: "Bodegas" },
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
    sede: "Spring · Calle 135",
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
    sede: "Calle 197",
    text: "Sede nueva, pasillos limpios y muy bien iluminados. Me ayudaron a escoger el tamaño exacto con la calculadora y no pagué espacio de más.",
  },
];

export const clients = [
  "Constructora Andina",
  "Farmacia Vital",
  "Logística del Norte",
  "Moda Urbana",
  "Colegio San Rafael",
  "Distribuciones Bogotá",
];

export const faq = [
  {
    q: "¿Cuánto cuesta una minibodega en Bogotá?",
    a: "Depende del tamaño y de la sede. Como referencia, una bodega pequeña (1–5 m³) suele estar entre $150.000 y $350.000 COP al mes; una mediana (6–15 m³) entre $350.000 y $750.000; y una grande (16–50 m³) desde $750.000. Cada espacio se cotiza según sede y tamaño, sin costos ocultos y sin permanencia mínima. Pide tu cotización y te enviamos el valor exacto el mismo día.",
  },
  {
    q: "¿Qué tamaño necesito?",
    a: "Algunas cajas y maletas caben en 1–3 m³. El contenido de un apartaestudio ocupa entre 4 y 8 m³, y el de un apartamento de dos alcobas entre 9 y 15 m³. Para inventario o mobiliario de empresa hablamos de 16 m³ en adelante. Usa la calculadora de espacio: en dos minutos te dice el tamaño recomendado y en qué sedes está disponible.",
  },
  {
    q: "¿Cómo accedo a mi bodega?",
    a: "Cada bodega es independiente y se cierra con tu propio candado. Entras libremente en el horario de atención de tu sede (Lun–Vie 8:00–17:30 · Sáb 8:00–13:30), con registro individual de ingreso y monitoreo por CCTV 24/7 que acompaña cada visita. Puedes cambiar de tamaño cuando lo necesites.",
  },
];

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
