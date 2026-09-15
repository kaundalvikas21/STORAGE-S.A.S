// FAQs. `q`/`a` also feed FAQPage JSON-LD (lib/schema.ts faqPage), so edits propagate to schema.
// `link` is UI-only: the deep link at the end of an answer (FaqList); FAQPage JSON-LD reads q/a alone.
// No price figures anywhere until the client confirms the ranges (spec Open Item 4, decided 2026-09-15):
// price questions are answered with what the price depends on and the same-day quote.
import { CALC_URL, SEDES_URL, sizes } from "./facts";

export type FaqItem = { q: string; a: string; link?: { label: string; href: string } };

const precios = { label: "Ver precios y tarifas", href: "/precios/" };
const calculadora = { label: "Ir a la calculadora", href: CALC_URL };
const seguridad = { label: "Cómo cuidamos tu bodega", href: "/seguridad/" };
const bodegaje = { label: "Conoce el bodegaje en Bogotá", href: "/bodegaje-bogota/" };
const [pequena, mediana, grande] = sizes;

// Homepage.
export const faq: FaqItem[] = [
  {
    q: "¿Cuánto cuesta una minibodega en Bogotá?",
    a: "Depende del tamaño, de la sede y del tiempo que guardes. Cada espacio se cotiza según lo que necesitas, sin costos ocultos y sin permanencia mínima. Pide tu cotización y te enviamos el valor exacto el mismo día.",
    link: precios,
  },
  {
    q: "¿Qué tamaño necesito?",
    a: "Una bodega pequeña (2-10 m³) guarda cajas, archivo o el contenido de un apartamento de una alcoba. Para un apartamento de dos alcobas recomendamos una mediana (15-20 m³), y para tres o más alcobas o una casa, una grande (25-60 m³). Oficinas, industria y casas de cuatro o más alcobas se resuelven con espacios personalizados desde 60 m³. Usa la calculadora de espacio: en dos minutos te dice el tamaño recomendado y en qué sedes está disponible.",
    link: calculadora,
  },
  {
    q: "¿Cómo accedo a mi bodega?",
    a: "Cada bodega es independiente y se cierra con tu propio candado. Entras libremente en el horario de atención de tu sede (Lun-Vie 8:00-17:30 · Sáb 8:00-13:30), con registro individual de ingreso y monitoreo por CCTV 24/7 que acompaña cada visita. Puedes cambiar de tamaño cuando lo necesites.",
    link: seguridad,
  },
];

// FAQ dark cell beside the homepage accordion: the size bands as a scannable line (no prices).
export const sizeSummary = sizes.map((s) => `${s.name} ${s.range}`).join(" · ");

// /calculadora-de-espacio/ (targets "cuánto espacio necesito bodega"). Restates the size table
// and the intent-card profiles only: no new facts.
export const calcFaq: FaqItem[] = [
  {
    q: "¿Cuánto espacio necesito en una bodega?",
    a: "Depende de lo que vas a guardar. Algunas cajas y maletas caben en 2 a 5 m³, el contenido de un apartaestudio en 6 a 10 m³ y el de un apartamento de dos alcobas en 15 a 20 m³. Un apartamento de tres o más alcobas o una casa necesita una bodega grande, de 25 a 60 m³. La calculadora suma el volumen aproximado de cada mueble y te recomienda el tamaño.",
  },
  {
    q: "¿Qué pasa si mi total queda entre dos tamaños?",
    a: "Te recomendamos el tamaño siguiente, para que tus cosas quepan con espacio para moverlas. El volumen de cada objeto es una aproximación: en la cotización confirmamos el tamaño exacto y la sede con disponibilidad.",
  },
];

export const permanenciaFaq: FaqItem = {
  q: "¿Hay permanencia mínima?",
  a: "No. Los contratos son flexibles y por meses: guardas el tiempo que necesites y puedes cambiar de tamaño cuando lo necesites.",
  link: precios,
};

// /precios/: the wireframe T6 questions, taken from the "bodegaje bogotá" People Also Ask data (spec tab 03).
export const preciosFaq: FaqItem[] = [
  {
    q: "¿Cuánto vale una bodega pequeña en Bogotá?",
    a: `Depende de la sede y de los meses que la necesites. Una bodega ${pequena.label} va de ${pequena.range} y guarda cajas, archivo o el contenido de un apartamento de una alcoba. Cotiza con ese tamaño y te enviamos el valor exacto el mismo día, sin costos ocultos.`,
    link: precios,
  },
  {
    q: "¿Cuánto cuesta guardar muebles?",
    a: `Depende del volumen de tus muebles, que define el tamaño de la bodega, y de la sede. Como guía, el contenido de un apartamento de dos alcobas cabe en una bodega ${mediana.label} (${mediana.range}) y el de tres o más alcobas o una casa, en una ${grande.label} (${grande.range}). Suma tus muebles en la calculadora y cotiza con el tamaño que te recomienda.`,
    link: calculadora,
  },
  permanenciaFaq,
  {
    q: "¿Cómo se paga?",
    // PENDIENTE CONFIRMAR medios de pago (transferencia, tarjeta, débito automático): until then the quote confirms them.
    a: "Pagas por meses, sin permanencia mínima. En tu cotización te confirmamos el valor mensual de tu bodega y los medios de pago disponibles.",
    link: precios,
  },
];

// /seguridad/: capability, never fear (R5). Every clause restates facts.ts securityLine or the spec's
// /seguridad/ description (sensores de humo en todas las sedes).
export const seguridadFaq: FaqItem[] = [
  faq[2],
  {
    q: "¿Quién puede abrir mi bodega?",
    a: "Solo tú. Cada bodega se cierra con tu propio candado, así que la llave es tuya. Además, cada ingreso queda registrado y el CCTV 24/7 acompaña cada visita.",
    link: seguridad,
  },
  {
    q: "¿Las sedes tienen sensores de humo?",
    a: "Sí. Todas nuestras sedes en Bogotá cuentan con sensores de humo, además de CCTV 24/7 y registro individual de ingreso.",
    link: seguridad,
  },
];

// /preguntas-frecuentes/ (spec T6 FAQ hub): every question above, grouped by theme, each answer ending
// in a deep link to its silo page (only pages that exist; the T8 size pages are not live yet).
export const faqHub = {
  path: "/preguntas-frecuentes/",
  metaTitle: "Preguntas Frecuentes | Minibodegas Storage Bogotá",
  // Spec text minus "y seguros": there is no insurance content until /seguros-y-polizas/ ships.
  description: "Resolvemos las dudas más comunes sobre minibodegas en Bogotá: precios, tamaños, seguridad, acceso y contratos.",
  crumb: "Preguntas frecuentes",
  h1: "Preguntas frecuentes",
  intro: [
    "Aquí respondemos lo que más nos preguntan antes de guardar: cuánto cuesta una minibodega, qué tamaño necesitas, cómo entras a tu bodega y cómo funcionan los contratos. Cada respuesta te lleva a la página con el detalle.",
    "Si tu pregunta no está, cotiza y te respondemos con la sede y el tamaño que mejor se ajustan, el mismo día.",
  ],
  indexLabel: "Temas",
  countLabel: "preguntas",
  groups: [
    { id: "precios", title: "Precios", items: [faq[0], preciosFaq[0], preciosFaq[1]] },
    {
      id: "tamanos",
      title: "Tamaños",
      items: [
        faq[1],
        { ...calcFaq[1], link: calculadora },
        {
          q: "¿Qué es un espacio personalizado?",
          a: "Es un área de más de 60 m³ para oficinas, industria o casas de cuatro o más alcobas. Se cotiza con visita técnica, para ajustar el espacio a lo que vas a guardar.",
          link: bodegaje,
        },
      ],
    },
    {
      id: "acceso",
      title: "Acceso y seguridad",
      items: [
        ...seguridadFaq,
        {
          q: "¿En qué sedes puedo guardar?",
          a: "Tenemos siete puntos en Bogotá: Autopista Norte con Calle 197, tres en Toberín, Spring en la Calle 135 y dos en Paloquemao. En todos entras en el horario de atención de tu sede.",
          link: { label: "Ver las 7 sedes", href: SEDES_URL },
        },
      ],
    },
    {
      id: "contratos",
      title: "Contratos",
      items: [
        permanenciaFaq,
        preciosFaq[3],
        {
          q: "¿Puedo cambiar de tamaño?",
          a: "Sí. Si lo que guardas crece o disminuye, cambias de tamaño cuando lo necesites, según la disponibilidad de tu sede y sin permanencia mínima.",
          link: bodegaje,
        },
      ],
    },
  ],
  cta: {
    title: "¿No encontraste tu pregunta?",
    body: "Cuéntanos qué necesitas guardar y en qué zona. Te respondemos con la sede y el tamaño que mejor se ajustan, el mismo día.",
  },
};
