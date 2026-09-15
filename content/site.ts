// Content entry point. Components import from here; data is split by domain (data-file rule in
// CLAUDE.md, spec P1: each file becomes an ACF field group):
//   facts.ts (URLs, company/NAP, size bands, stats) · sedes.ts · segments.ts · faqs.ts ·
//   conversion.ts (/cotizar/ + calculator copy) · engagement.ts (pop-ups, social feed).
// Values marked "PENDIENTE CONFIRMAR" are client deliverables: swap them in those files only.
import { CALC_URL, QUOTE_URL, SEDES_URL } from "./facts";

export * from "./facts";
export * from "./sedes";
export * from "./segments";
export * from "./faqs";
export * from "./conversion";
export * from "./engagement";

export const silos = {
  bodegaje: { title: "Bodegaje y minibodegas", lead: "Guarda lo que no cabe. Espacios desde 2 m³.", body: "Mini bodegas con candado propio, por meses y sin permanencia mínima.", href: "/bodegaje-bogota/" },
  sedes: { title: "Nuestras sedes", lead: "Encuentra la bodega más cercana a ti.", body: "Siete puntos en el norte, noroccidente, centro y Sabana Norte de Bogotá.", href: SEDES_URL },
  mudanzas: { title: "Mudanzas y trasteos", lead: "Nos encargamos del traslado completo.", body: "Empaque, transporte y almacenamiento temporal si lo necesitas.", href: "/mudanzas-bogota/" },
};

// "Cómo funciona" (ported from el-sistema, checklist §1). Calculas → calculator, Cotizas → quote form.
export const steps: { verb: string; body: string; href?: string }[] = [
  { verb: "Calculas", body: "Usa la calculadora y conoce tu tamaño en dos minutos.", href: CALC_URL },
  { verb: "Cotizas", body: "Recibe el valor exacto el mismo día.", href: QUOTE_URL },
  { verb: "Guardas con nosotros", body: "Llegas con tu candado y entras cuando quieras." },
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
