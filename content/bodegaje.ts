// /bodegaje-bogota/ copy (spec T2 silo pillar). h1 and description are the spec's exact strings. Every
// sentence restates facts already in facts.ts, faqs.ts or sedes.ts: no prices, no cheapest claim, no
// new dimensions (R5). Price intent is answered with the quote, never with numbers.
import { company, securityLine } from "./facts";
import { faq, type FaqItem } from "./faqs";

export type IncludedId = "seguridad" | "acceso" | "flexibilidad";

const included: { id: IncludedId; title: string; body: string }[] = [
  { id: "seguridad", title: "Seguridad", body: securityLine },
  { id: "acceso", title: "Acceso", body: `Entras libremente en el horario de atención de tu sede: ${company.hours}.` },
  { id: "flexibilidad", title: "Flexibilidad", body: "Pagas por meses, sin permanencia mínima, y cambias de tamaño cuando tu necesidad cambia." },
];

const faqItems: FaqItem[] = [
  {
    q: faq[0].q,
    a: "Depende del tamaño, de la sede y del tiempo que guardes. Cada espacio se cotiza según lo que necesitas, sin costos ocultos y sin permanencia mínima. Pide tu cotización y te enviamos el valor exacto el mismo día.",
    link: faq[0].link,
  },
  faq[1],
  // Homepage answer without its /seguridad/ link: cross-silo links stay in header/footer (R3).
  { q: faq[2].q, a: faq[2].a },
  {
    q: "¿Hay permanencia mínima?",
    a: "No. Los contratos son flexibles y por meses: guardas el tiempo que necesites y puedes cambiar de tamaño cuando lo necesites.",
  },
];

export const bodegajePillar = {
  // Spec title reads "desde 1 m³"; the client's size bands start at 2 m³ (facts.ts sizes). PENDIENTE CONFIRMAR.
  metaTitle: "Bodegaje en Bogotá | Minibodegas desde 2 m³",
  description: "Bodegaje seguro en 7 sedes de Bogotá. Minibodegas independientes con candado propio, CCTV 24/7 y contratos flexibles. Cotiza hoy.",
  crumb: "Bodegaje",
  h1: "Bodegaje y minibodegas en Bogotá",
  // The future search snippet: qué es, quién lo usa, qué ofrece Storage. 150-200 words, zero preamble.
  intro: [
    "El bodegaje es el alquiler de un espacio cerrado e independiente para guardar muebles, cajas, inventario o archivo durante el tiempo que lo necesites. En Storage S.A.S, que opera en Bogotá desde 2011, cada minibodega se cierra con tu propio candado, con registro individual de ingreso y CCTV 24/7.",
    "Lo usan hogares que se mudan, remodelan o viajan, y empresas que necesitan espacio para mercancía, mobiliario o documentos sin arrendar una bodega industrial. Tenemos siete sedes en Bogotá: Autopista Norte con Calle 197, Toberín, Spring en la Calle 135 y Paloquemao, con espacios desde 2 m³ hasta áreas personalizadas de más de 60 m³, que se cotizan con visita técnica.",
    "Pagas por meses, sin permanencia mínima, y cambias de tamaño cuando tu necesidad cambia. Entras a tu bodega libremente en el horario de atención de tu sede, de lunes a sábado. Usa la calculadora para saber qué tamaño necesitas, o cotiza y recibe el valor exacto el mismo día.",
  ],
  size: { title: "Elige tu bodega por tamaño", body: "Cuatro tamaños por meses, desde 2 m³ hasta espacios personalizados de más de 60 m³.", cardLink: "Ver bodegas" },
  segment: { title: "Minibodegas para hogar y empresa", body: "Mudanzas y remodelaciones en casa, o inventario y archivo en tu negocio." },
  sede: { title: "Elige tu sede", body: "Siete puntos en cuatro sedes. Autopista Norte con Calle 197 tiene la mayor disponibilidad.", all: "Ver todas las sedes" },
  included: { title: "Qué incluye tu minibodega", items: included },
  price: {
    title: "¿Cuánto cuesta el bodegaje?",
    body: "No hay un precio único: el valor depende del tamaño, la sede y el tiempo que guardes. Cotiza en línea y te enviamos el valor exacto el mismo día, sin costos ocultos.",
    link: { label: "Ver precios y tarifas", href: "/precios/" },
  },
  faqTitle: "Preguntas sobre bodegaje",
  faq: faqItems,
  cta: {
    title: "Guarda lo que no cabe",
    body: "Cuéntanos qué necesitas guardar y en qué zona. Te recomendamos la sede y el tamaño que mejor se ajustan, el mismo día.",
  },
};
