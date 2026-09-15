// /seguridad/ copy (spec T6 Info, targets "seguridad minibodegas"). metaTitle and description are the
// spec's strings; the h1 is the brief's. Capability, never fear (R5, spec Sheet 9 Q7): each block says
// what the measure does for the client, never what it protects against.
import { SEDES_URL, company, securityLine } from "./facts";
import { seguridadFaq } from "./faqs";

export type SecurityId = "cctv" | "registro" | "humo" | "candado" | "personal";

export const seguridadPage = {
  path: "/seguridad/",
  metaTitle: "Seguridad en Nuestras Bodegas | Storage S.A.S",
  description: "CCTV 24/7, sensores de humo, registro individual de ingreso y candado propio del cliente en todas nuestras sedes de Bogotá.",
  crumb: "Seguridad",
  h1: "Seguridad en nuestras bodegas",
  intro: [
    `${securityLine} Todas nuestras sedes en Bogotá cuentan además con sensores de humo y personal en sede durante el horario de atención.`,
    "Así sabes quién entra y cuándo, y solo tú tienes la llave de tu bodega. Guardas en un espacio vigilado, en la sede que te quede más cerca.",
  ],
  link: { label: "Conoce el bodegaje en Bogotá", href: "/bodegaje-bogota/" },
  featuresTitle: "Cómo cuidamos lo que guardas",
  features: [
    { id: "cctv", title: "CCTV 24/7", body: "Cámaras que graban día y noche, también fuera del horario de atención, y acompañan cada visita a tu bodega." },
    { id: "registro", title: "Registro individual de ingreso", body: "Cada ingreso queda registrado, así hay trazabilidad de quién accede a cada bodega y cuándo." },
    { id: "humo", title: "Sensores de humo", body: "Detectan humo a tiempo para actuar antes de que llegue a lo que guardas." },
    { id: "candado", title: "Candado propio", body: "Tu bodega se cierra con tu candado. La llave es solo tuya." },
    // PENDIENTE CONFIRMAR personal en cada sede durante todo el horario de atención.
    { id: "personal", title: "Personal en sede", body: `Un equipo te recibe en el horario de atención (${company.hours}) y te orienta en cada ingreso.` },
  ] satisfies { id: SecurityId; title: string; body: string }[],
  sedesLink: { label: "Ver las 7 sedes", href: SEDES_URL },
  faqTitle: "Preguntas sobre seguridad",
  faq: seguridadFaq,
  cta: {
    title: "Guarda con tranquilidad",
    body: "Cuéntanos qué necesitas guardar y en qué zona. Te recomendamos la sede y el tamaño, y te enviamos el valor el mismo día.",
  },
};
