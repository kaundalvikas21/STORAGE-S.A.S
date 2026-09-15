// FAQs. `q`/`a` also feed FAQPage JSON-LD (lib/schema.ts faqPage), so edits propagate to schema.
import { CALC_URL } from "./facts";

export type FaqItem = { q: string; a: string; link?: { label: string; href: string } };

// Homepage. `link` is UI-only (deep link at the end of each answer); FAQPage JSON-LD reads q/a alone.
export const faq: FaqItem[] = [
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

// FAQ dark cell: the honest range from faq[0], restated as a scannable line.
export const priceSummary = "Pequeña $150.000-$350.000 · Mediana $350.000-$750.000 · Grande desde $750.000 COP/mes";

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
