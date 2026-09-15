// /precios/ copy (spec T6 Info, targets "cuánto cuesta una minibodega en bogotá"). metaTitle and
// description are the spec's strings; the h1 is the brief's. Ranges, not a lowest-price claim (R5), and
// no figure is published until the client supplies them (spec Open Item 4).
import { company, sizes } from "./facts";
import { preciosFaq } from "./faqs";

export type FactorId = "tamano" | "sede" | "permanencia" | "servicios";

/** One row per size band. PENDIENTE CONFIRMAR rango mensual por tamaño (Open Item 4): fill `priceRange`
 *  (e.g. "$X - $Y COP") on a row and its cell shows the range instead of the quote link. Data-only swap. */
export type PriceRow = (typeof sizes)[number] & { priceRange?: string };
const rows: PriceRow[] = sizes.map((s) => ({ ...s }));

export const preciosPage = {
  path: "/precios/",
  metaTitle: "Precios de Minibodegas en Bogotá | Storage S.A.S",
  description: "Conoce el rango de precios de nuestras minibodegas en Bogotá según tamaño y sede. Sin costos ocultos. Cotización personalizada.",
  crumb: "Precios",
  h1: "Precios y tarifas de minibodegas en Bogotá",
  intro: [
    "El precio de una minibodega depende de cuatro cosas: el tamaño, la sede, el tiempo que guardes y los servicios extra que pidas. Pagas por meses, sin permanencia mínima y sin costos ocultos. Cotiza con el tamaño que necesitas y te enviamos el valor exacto el mismo día.",
    "Abajo ves los cuatro tamaños, desde 2 m³ hasta espacios personalizados de más de 60 m³, qué incluye cada bodega y qué se cotiza aparte. Si no sabes qué tamaño necesitas, la calculadora te lo dice en dos minutos.",
  ],
  link: { label: "Conoce el bodegaje en Bogotá", href: "/bodegaje-bogota/" },
  table: {
    title: "Precios por tamaño",
    body: "El valor mensual de cada tamaño depende de la sede que elijas. Cotiza el tuyo y te lo enviamos el mismo día.",
    caption: "Rango mensual por tamaño de minibodega",
    cols: ["Tamaño", "Rango m³", "Rango mensual", "Ideal para"],
    // The brief's wording, a text link inside the table only (MASTER.md §8.18).
    quoteLink: "Cotiza tu tarifa",
    rows,
  },
  factors: {
    title: "Qué define el precio",
    items: [
      { id: "tamano", title: "Tamaño", body: "Los m³ que ocupa lo que guardas, desde 2 m³ hasta espacios personalizados." },
      { id: "sede", title: "Sede", body: "La sede que elijas y la disponibilidad del tamaño en ella." },
      { id: "permanencia", title: "Permanencia", body: "Los meses que guardes. No hay permanencia mínima." },
      { id: "servicios", title: "Servicios extra", body: "Empaque, transporte o una póliza ampliada, solo si los pides." },
    ] satisfies { id: FactorId; title: string; body: string }[],
  },
  // Wireframe T6 block 4. PENDIENTE CONFIRMAR con el cliente la lista final de incluidos y adicionales.
  included: {
    title: "Qué incluye y qué se cotiza aparte",
    in: {
      title: "Incluido sin costo extra",
      items: [
        "Bodega independiente que cierras con tu propio candado",
        "CCTV 24/7 en la sede",
        "Registro individual de ingreso",
        `Acceso en horario de atención: ${company.hours}`,
        "Asesoría para elegir tamaño y sede",
        "Sin permanencia mínima",
      ],
    },
    extra: {
      title: "Con costo adicional",
      items: ["Empaque y embalaje", "Transporte y mudanza", "Póliza ampliada para tus bienes"],
      note: "Se cotizan aparte y solo si los necesitas.",
    },
  },
  faqTitle: "Preguntas sobre precios",
  faq: preciosFaq,
  cta: {
    title: "Recibe tu precio exacto",
    body: "Cuéntanos qué necesitas guardar y en qué zona. Te enviamos el valor mensual en la sede y el tamaño que mejor se ajustan, el mismo día.",
  },
};
