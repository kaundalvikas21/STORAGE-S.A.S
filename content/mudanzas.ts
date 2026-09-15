// /mudanzas-bogota/ copy (spec T2b, supporting silo pillar). metaTitle and description are the spec's
// strings; the h1 is the brief's. No prices, no fleet size, no coverage promises beyond Bogotá (R5).
// Silo law: this pillar links down to its three children and holds the ONE bridge into the bodegaje
// silo (components/mudanzas/BridgeToBodegaje). Nothing in the bodegaje silo links back here in body copy.
// Skipped spec blocks: "Fleet and team" and "Reviews" (no confirmed fleet facts, no mudanzas reviews yet).
import type { IncludedItem } from "./bodegaje";
import { CALC_URL, QUOTE_URL } from "./facts";
import type { FaqItem } from "./faqs";
import type { Step } from "./site";

export type ServiceId = "trasteos" | "empresariales" | "mercancias";

export const mudanzasPillar = {
  path: "/mudanzas-bogota/",
  metaTitle: "Mudanzas en Bogotá | Empresa desde 2011 | Storage",
  // PENDIENTE CONFIRMAR "personal propio, empaque y seguro" (spec text, not yet confirmed by the client).
  description: "Mudanzas locales y empresariales en Bogotá con personal propio, empaque y seguro. Más de 10 años moviendo hogares y oficinas.",
  crumb: "Mudanzas",
  h1: "Mudanzas y trasteos en Bogotá",
  intro: [
    "Una mudanza en Bogotá es más que subir cajas a un camión: hay que proteger los muebles, cargar sin dañar nada, cruzar la ciudad y descargar en el nuevo lugar. En Storage S.A.S, que opera en Bogotá desde 2011, nos encargamos del traslado completo de hogares y oficinas.",
    "Hacemos trasteos de apartamentos y casas, mudanzas empresariales de oficinas, archivo y mobiliario, y transporte de mercancía dentro de la ciudad. Sumas empaque y embalaje o una póliza ampliada para tus bienes solo si los necesitas.",
    "Usa la calculadora para estimar el volumen de lo que vas a mover, o cotiza y te enviamos la propuesta para tu mudanza.",
  ],
  services: {
    title: "Elige tu tipo de mudanza",
    body: "Trasteos para hogares, traslados de oficina y transporte de mercancía en Bogotá.",
    cardLink: "Ver servicio",
    // SWAP: point each href at its own route when /trasteos-bogota/, /mudanzas-empresariales/ and
    // /transporte-de-mercancias/ ship; until then every card opens the quote form (R4).
    items: [
      { id: "trasteos", title: "Trasteos en Bogotá", body: "Apartamentos, casas y apartaestudios: cargamos, transportamos y descargamos en tu nuevo lugar, con empaque si lo necesitas.", href: QUOTE_URL },
      { id: "empresariales", title: "Mudanzas empresariales", body: "Oficinas, archivo y mobiliario corporativo, planeados para interrumpir lo menos posible tu operación.", href: QUOTE_URL },
      { id: "mercancias", title: "Transporte de mercancías", body: "Traslado de inventario y mercancía entre puntos de Bogotá.", href: QUOTE_URL },
    ] satisfies { id: ServiceId; title: string; body: string; href: string }[],
  },
  included: {
    title: "Qué hacemos en tu mudanza",
    items: [
      // PENDIENTE CONFIRMAR personal propio en cada mudanza (spec description).
      { id: "equipo", title: "Equipo propio", body: "Personal de Storage carga, transporta y descarga tus muebles y cajas, del punto de salida a tu nuevo lugar." },
      { id: "empaque", title: "Empaque y embalaje", body: "Protegemos muebles y electrodomésticos con material de embalaje. Se cotiza aparte, solo si lo pides." },
      { id: "poliza", title: "Póliza para tus bienes", body: "Suma una póliza ampliada para tus bienes si la necesitas. También se cotiza aparte." },
    ] satisfies IncludedItem[],
  },
  steps: [
    { verb: "Calculas", body: "Suma tus muebles y cajas en la calculadora y conoce el volumen de tu trasteo.", href: CALC_URL, icon: "calcular" },
    { verb: "Cotizas", body: "Cotiza en línea y te enviamos la propuesta para tu mudanza.", href: QUOTE_URL, icon: "cotizar" },
    { verb: "Nos movemos", body: "Llegamos el día acordado, cargamos y descargamos en tu nuevo lugar.", icon: "mover" },
  ] satisfies Step[],
  // The one cross-silo bridge (spec tab 06 rule 2). One direction only: mudanzas → bodegaje.
  bridge: {
    title: "¿Tu mudanza necesita almacenamiento temporal?",
    body: "Si tu nuevo lugar no está listo o no todo cabe, guardamos tus cosas en una minibodega con tu propio candado, por meses y sin permanencia mínima.",
    cta: "Conoce nuestras minibodegas",
    href: "/bodegaje-bogota/",
  },
  price: {
    title: "¿Cuánto cuesta una mudanza en Bogotá?",
    body: "Depende del volumen que muevas, de la distancia entre los dos puntos y de los servicios que sumes, como empaque o póliza. Cotiza en línea y te enviamos el valor, sin costos ocultos.",
  },
  faqTitle: "Preguntas sobre mudanzas",
  faq: [
    {
      q: "¿Cuánto cuesta un trasteo en Bogotá?",
      a: "Depende del volumen de tus cosas, de la distancia entre el punto de carga y el de descarga, y de si sumas empaque o una póliza ampliada. Usa la calculadora para estimar el volumen y cotiza: te enviamos el valor de tu trasteo.",
      link: { label: "Ir a la calculadora", href: CALC_URL },
    },
    {
      q: "¿Hacen mudanzas de oficinas?",
      a: "Sí. Trasladamos oficinas, archivo y mobiliario corporativo en Bogotá, y planeamos el traslado con tu empresa para interrumpir lo menos posible la operación.",
    },
    {
      // No link: the bridge block is this page's one way into the bodegaje silo.
      q: "¿Pueden guardar mis cosas durante la mudanza?",
      a: "Sí. Si tu nuevo lugar no está listo, guardas tus cosas en una minibodega con tu propio candado, por meses y sin permanencia mínima, en cualquiera de nuestras siete sedes en Bogotá.",
    },
  ] satisfies FaqItem[],
  cta: {
    title: "Cotiza tu mudanza",
    body: "Cuéntanos qué vas a mover y cuándo. Te enviamos la propuesta para tu mudanza en Bogotá.",
  },
};
