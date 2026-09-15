// Segments and need profiles (spec silo 1A).
import { CALC_URL, company, sizes } from "./facts";
import type { FaqItem } from "./faqs";

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

export const needs = [
  { label: "Hogar", href: "/minibodegas-para-hogar/" },
  { label: "Empresas", href: "/minibodegas-para-empresas/" },
  { label: "E-commerce", href: "/bodegas-para-ecommerce/" },
  { label: "Archivo", href: "/almacenamiento-de-archivo-y-documentos/" },
  { label: "Obra", href: "/bodegas-para-constructoras/" },
];

// ---------------------------------------------------------------------------------------------------
// Segment pages (spec T3), one entry per URL, rendered by components/segmento/SegmentPage.tsx.
// metaTitle and description are the spec's strings (tab 02), "desde 1 m³" read as 2 m³ (facts.ts sizes);
// h1s are the brief's. Every page opens on the visitor's situation and says only what facts.ts, faqs.ts
// and sedes.ts already state: no prices, no dimensions beyond the m³ bands, no names (R5).
// Links: up to /bodegaje-bogota/, sideways to the size and sede axes, plus the brief's /seguridad/ teaser.

/** IsoBox contents shown in an M3Guide unit (components/sections/IsoBox.tsx unitContents). */
export type ArtId = "cajas" | "apartaestudio" | "apartamento" | "empresa";
type RowId = "pequena" | "mediana" | "grande";
type Teaser = { title: string; href?: string };

export type SegmentCopy = {
  path: string;
  metaTitle: string;
  description: string;
  crumb: string;
  h1: string;
  intro: string[];
  useCases: { title: string; items: string[] };
  /** Three units in m³ inside the client's bands; M3Guide derives the band label from `sizes`. */
  guide: { title: string; body: string; tiers: { m3: number; art: ArtId; fits: string[] }[] };
  recommender: { title: string; body: string; recommended: RowId; rows: Record<RowId, string> };
  security: { title: string; body: string };
  sede: { title: string; body: string };
  blog: { title: string; teasers: Teaser[] };
  faqTitle: string;
  faq: FaqItem[];
  cta: { title: string; body: string };
};

export const segmentLabels = {
  up: { label: "Conoce el bodegaje en Bogotá", href: "/bodegaje-bogota/" },
  band: "Bodega",
  fits: "Cabe aproximadamente",
  calcLink: "Ir a la calculadora",
  recommended: "Recomendado",
  sizeLink: "Ver bodegas",
  // Cross-silo on purpose: the brief's T3 security block (same standing as the pillar's /precios/ link).
  security: { label: "Cómo cuidamos tu bodega", href: "/seguridad/" },
};

// Spec tab 06 launch articles. SWAP (T9): add each `href` when /blog/ ships; BlogTeasers renders nothing until then.
const articles = {
  espacio: { title: "¿Cuánto espacio necesito? Guía de tamaños de bodega en m³" },
  empacar: { title: "Cómo empacar muebles para almacenamiento prolongado" },
  guardar: { title: "Qué se puede y qué no se puede guardar en una minibodega" },
  pymes: { title: "Almacenamiento para pymes: cuándo deja de ser rentable alquilar oficina" },
  organizar: { title: "Cómo organizar tu bodega para aprovechar cada metro cúbico" },
} satisfies Record<string, Teaser>;

const [pequena, mediana, grande] = sizes;
const calculadora = { label: "Ir a la calculadora", href: CALC_URL };
const guideTitle = "Qué cabe en cada espacio";

export const segmentPages = {
  "minibodegas-para-hogar": {
    path: "/minibodegas-para-hogar/",
    metaTitle: "Minibodegas para Hogar en Bogotá | Storage S.A.S",
    description: "Guarda muebles, trasteos y objetos del hogar en minibodegas seguras en Bogotá. Espacios desde 2 m³, sin permanencia mínima.",
    crumb: "Para hogar",
    h1: "Minibodegas para hogar en Bogotá",
    intro: [
      "Te mudas y el nuevo apartamento todavía no está listo. Estás remodelando y los muebles estorban. Heredaste cosas que no quieres vender, o simplemente ya no caben en la casa. Para esos momentos existe una minibodega: un espacio cerrado, solo tuyo, donde tus cosas esperan el tiempo que haga falta.",
      `En Storage S.A.S guardas por meses y sin permanencia mínima, desde 2 m³ para unas cajas hasta bodegas grandes para el contenido de una casa. Cada bodega se cierra con tu propio candado y entras en el horario de atención de tu sede: ${company.hours}.`,
    ],
    useCases: { title: "¿Por qué necesitas espacio?", items: ["Mudanza", "Remodelación", "Viaje largo", "Herencia", "Falta de espacio"] },
    guide: {
      title: guideTitle,
      body: "Nadie sabe cuánto son 8 m³ hasta que lo ve. Son referencias aproximadas: la calculadora suma tus objetos uno por uno.",
      tiers: [
        { m3: 3, art: "cajas", fits: ["Cajas, maletas y ropa de temporada", "Adornos, libros y juguetes", "Una bicicleta"] },
        { m3: 8, art: "apartaestudio", fits: ["Cama doble y nevera", "Escritorio y silla", "Las cajas de un apartaestudio"] },
        { m3: 15, art: "apartamento", fits: ["Sala y comedor", "Dos alcobas con sus camas", "Lavadora, nevera y cajas"] },
      ],
    },
    recommender: {
      title: "¿Qué tamaño te sirve?",
      body: "Según lo que vayas a guardar de tu casa.",
      recommended: "mediana",
      rows: {
        pequena: "Cajas, maletas o el contenido de un apartaestudio mientras viajas.",
        mediana: "Un apartamento de dos alcobas durante la mudanza o la remodelación.",
        grande: "Una casa completa o un apartamento de tres o más alcobas.",
      },
    },
    security: { title: "Tus cosas, bajo tu propio candado", body: "Solo tú tienes la llave: nadie más abre tu bodega mientras viajas o terminas la obra." },
    sede: { title: "Una sede cerca de tu casa", body: "Cuatro sedes en el norte, el noroccidente y el centro de Bogotá. Autopista Norte con Calle 197 queda a la entrada desde la Sabana." },
    blog: { title: "Consejos para guardar las cosas de tu casa", teasers: [articles.empacar, articles.guardar, articles.organizar] },
    faqTitle: "Preguntas sobre minibodegas para hogar",
    faq: [
      { q: "¿Puedo guardar mis muebles mientras me mudo o remodelo?", a: "Sí. Guardas por meses y sin permanencia mínima, así que retiras tus cosas cuando el nuevo lugar esté listo o termine la obra. Si lo que guardas crece, cambias de tamaño según la disponibilidad de tu sede." },
      { q: "¿Qué tamaño necesito para un apartamento?", a: `Como guía, el contenido de un apartamento de una alcoba cabe en una bodega ${pequena.label} (${pequena.range}), el de dos alcobas en una ${mediana.label} (${mediana.range}) y el de tres o más alcobas o una casa en una ${grande.label} (${grande.range}). La calculadora suma tus muebles y te dice el tamaño recomendado.`, link: calculadora },
      { q: "¿Puedo sacar algo de mi bodega antes de terminar?", a: `Sí. Entras a tu bodega cuando lo necesites dentro del horario de atención de tu sede (${company.hours}) y sacas o guardas lo que quieras.` },
    ],
    cta: { title: "Haz espacio en casa", body: "Suma tus muebles y cajas en la calculadora y conoce el tamaño que necesitas. Después cotizas con ese tamaño ya elegido." },
  },

  "minibodegas-para-empresas": {
    path: "/minibodegas-para-empresas/",
    metaTitle: "Bodegas para Empresas en Bogotá | Storage S.A.S",
    // PENDIENTE CONFIRMAR "operación logística" y "asesoría dedicada" (spec text, not yet confirmed by the client).
    description: "Almacenamiento empresarial en Bogotá: inventario, archivo, mobiliario y operación logística. Espacios flexibles y asesoría dedicada.",
    crumb: "Para empresas",
    h1: "Minibodegas y bodegas para empresas",
    intro: [
      "La bodega del local se llenó, el archivo ocupa una oficina que podría producir o el mobiliario de un proyecto terminado no tiene dónde quedarse. Arrendar una bodega industrial para eso es demasiado espacio y demasiado contrato.",
      "Storage S.A.S opera en Bogotá desde 2011 con bodegas por meses para inventario, archivo y mobiliario: desde bodegas pequeñas hasta espacios personalizados de más de 60 m³, que se cotizan con visita técnica. Sin permanencia mínima, el espacio crece o se reduce con tu operación.",
    ],
    useCases: { title: "Para qué la usan las empresas", items: ["Inventario", "Archivo", "Mobiliario de oficina", "Proyectos temporales", "Espacios productivos"] },
    guide: {
      title: guideTitle,
      body: "Referencias aproximadas para una operación. Para más de 60 m³ diseñamos un espacio personalizado con visita técnica.",
      tiers: [
        { m3: 5, art: "cajas", fits: ["Cajas de archivo", "Material publicitario", "Equipos de cómputo en desuso"] },
        { m3: 18, art: "apartamento", fits: ["Escritorios y sillas de un equipo pequeño", "Archivadores", "El mobiliario de un stand"] },
        { m3: 40, art: "empresa", fits: ["Estibas de inventario", "El mobiliario de una oficina completa", "Mercancía de temporada"] },
      ],
    },
    recommender: {
      title: "¿Qué tamaño necesita tu empresa?",
      body: "Según el volumen de tu operación.",
      recommended: "grande",
      rows: {
        pequena: "Archivo, papelería y material de mercadeo.",
        mediana: "El mobiliario de una oficina pequeña o el surtido de un local.",
        grande: "Inventario en estibas o el mobiliario de una sede completa.",
      },
    },
    security: { title: "Trazabilidad en cada ingreso", body: "Solo tu empresa tiene la llave, y el registro de ingreso deja constancia de quién entró y cuándo." },
    sede: { title: "Una sede cerca de tu operación", body: "Autopista Norte con Calle 197 recibe carga con acceso vehicular, y Paloquemao queda en el centro, cerca del comercio." },
    blog: { title: "Guías para empresas", teasers: [articles.pymes, articles.organizar] },
    faqTitle: "Preguntas sobre bodegas para empresas",
    faq: [
      { q: "¿Qué espacios tienen para empresas?", a: `Desde bodegas pequeñas (${pequena.range}) para archivo hasta grandes (${grande.range}) para inventario y mobiliario. Para oficinas e industria con más de 60 m³ diseñamos un espacio personalizado, que se cotiza con visita técnica.` },
      { q: "¿El contrato se ajusta si la operación cambia?", a: "Sí. Pagas por meses, sin permanencia mínima, y cambias de tamaño cuando lo necesites según la disponibilidad de la sede." },
      { q: "¿Cómo se controla el ingreso a la bodega?", a: "La bodega se cierra con el candado de tu empresa, cada ingreso queda registrado y el CCTV 24/7 acompaña cada visita." },
    ],
    cta: { title: "Espacio para tu operación", body: "Suma el mobiliario y las cajas en la calculadora, o cuéntanos qué necesita guardar tu empresa y te recomendamos la sede y el tamaño." },
  },

  "bodegas-para-ecommerce": {
    path: "/bodegas-para-ecommerce/",
    metaTitle: "Bodegas para E-commerce en Bogotá | Storage S.A.S",
    // PENDIENTE CONFIRMAR "despacha desde nuestras sedes": whether dispatching from a unit is allowed (spec text).
    description: "Almacena y despacha tu inventario desde nuestras sedes en Bogotá. Espacios flexibles que crecen con tus ventas.",
    crumb: "Para e-commerce",
    h1: "Bodegas para e-commerce en Bogotá",
    intro: [
      "Empezaste vendiendo desde la sala y ahora las cajas ocupan el apartamento. Llega la temporada alta y no hay dónde poner el surtido, pero arrendar un local solo para eso todavía no tiene sentido.",
      `Una minibodega te da ese espacio por meses, sin permanencia mínima: empiezas pequeño y cambias de tamaño a medida que crecen tus ventas. Entras a sacar pedidos o reponer inventario en el horario de atención de tu sede, ${company.hours}.`,
    ],
    useCases: { title: "Cuándo la necesita tu tienda", items: ["Inventario de temporada", "Surtido para despachos", "Devoluciones", "Material de empaque", "Crecer sin arrendar local"] },
    guide: {
      title: guideTitle,
      body: "Referencias aproximadas para una tienda en línea. Si también guardas estanterías o muebles, la calculadora los suma.",
      tiers: [
        { m3: 3, art: "cajas", fits: ["Surtido en cajas pequeñas", "Material de empaque", "Devoluciones por revisar"] },
        { m3: 8, art: "apartaestudio", fits: ["Una estantería con inventario", "Cajas de producto por referencia", "Rollos de cartón y plástico"] },
        { m3: 15, art: "apartamento", fits: ["Varias estanterías de inventario", "El surtido de temporada alta", "Producto voluminoso"] },
      ],
    },
    recommender: {
      title: "¿Qué tamaño necesita tu tienda?",
      body: "Según el volumen de tu inventario.",
      recommended: "pequena",
      rows: {
        pequena: "Una tienda que empieza, con surtido en cajas y material de empaque.",
        mediana: "Inventario en estanterías o la temporada alta de una tienda que ya vende a diario.",
        grande: "Producto voluminoso o un catálogo con muchas referencias.",
      },
    },
    security: { title: "Tu inventario, bajo tu candado", body: "Solo tú abres la bodega, y cada ingreso queda registrado: sabes quién entró y cuándo." },
    sede: { title: "Una sede en tu ruta de despachos", body: "Elige la que te quede más cerca. Autopista Norte con Calle 197 tiene acceso vehicular y Paloquemao queda en el centro, cerca del comercio." },
    blog: { title: "Guías para tu inventario", teasers: [articles.organizar, articles.guardar] },
    faqTitle: "Preguntas sobre bodegas para e-commerce",
    faq: [
      { q: "¿En qué horario puedo sacar pedidos de mi bodega?", a: `De lunes a sábado, en el horario de atención de tu sede: ${company.hours}. Entras con tu propio candado y cada ingreso queda registrado.` },
      { q: "¿Qué pasa si mi inventario crece en temporada alta?", a: "Cambias a un tamaño mayor según la disponibilidad de tu sede y vuelves al anterior cuando baje la temporada. Pagas por meses, sin permanencia mínima." },
    ],
    cta: { title: "Espacio para tu tienda", body: "Suma tu inventario en la calculadora y conoce el tamaño que necesitas, o cotiza y te recomendamos la sede más cerca de tu ruta." },
  },

  "almacenamiento-de-archivo-y-documentos": {
    path: "/almacenamiento-de-archivo-y-documentos/",
    metaTitle: "Almacenamiento de Archivo y Documentos | Bogotá",
    // PENDIENTE CONFIRMAR "espacios secos" (spec text; no humidity control is stated anywhere else yet).
    description: "Custodia de archivo físico y documentación empresarial en Bogotá. Espacios secos, seguros y de acceso controlado.",
    crumb: "Archivo y documentos",
    h1: "Almacenamiento de archivo y documentos",
    intro: [
      "Las cajas de archivo contable, los contratos de años anteriores y los expedientes que debes conservar terminan ocupando la mejor oficina. Nadie los consulta a diario, pero tienen que estar a mano y bajo control.",
      "En una minibodega de Storage S.A.S tu archivo queda en un espacio cerrado que solo tu empresa abre, con registro individual de ingreso y CCTV 24/7. Guardas el tiempo que necesites, pagando por meses, y consultas tus documentos en el horario de atención de la sede.",
    ],
    useCases: { title: "Qué archivo se guarda", items: ["Archivo contable", "Contratos y facturas", "Expedientes de clientes", "Archivo inactivo", "Liberar la oficina"] },
    guide: {
      title: guideTitle,
      body: "Referencias aproximadas para archivo físico. Deja espacio para moverte entre las cajas cuando consultes un documento.",
      tiers: [
        { m3: 3, art: "cajas", fits: ["Las cajas de archivo de un área", "Carpetas AZ", "Libros contables"] },
        { m3: 8, art: "apartaestudio", fits: ["Archivo de varios años", "Un archivador metálico", "Estantería con cajas rotuladas"] },
        { m3: 15, art: "apartamento", fits: ["El archivo de una empresa completa", "Varias estanterías de cajas", "Archivadores y planos"] },
      ],
    },
    recommender: {
      title: "¿Qué tamaño necesita tu archivo?",
      body: "Según cuánto archivo guardas.",
      recommended: "pequena",
      rows: {
        pequena: "El archivo de un área o de una empresa pequeña.",
        mediana: "Varios años de archivo organizados en estanterías.",
        grande: "El archivo completo de una empresa con varias áreas.",
      },
    },
    security: { title: "Acceso controlado a tu archivo", body: "Cada consulta queda registrada: sabes quién entró a la bodega y cuándo, y solo tu empresa tiene la llave." },
    sede: { title: "Tu archivo cerca de la oficina", body: "Elige la sede más cercana para consultar documentos sin perder la mañana. Autopista Norte con Calle 197 tiene la mayor disponibilidad." },
    blog: { title: "Guías para organizar tu archivo", teasers: [articles.organizar, articles.guardar] },
    faqTitle: "Preguntas sobre almacenamiento de archivo",
    faq: [
      { q: "¿Quién puede entrar a consultar el archivo?", a: "La bodega se cierra con el candado de tu empresa, así que solo quien tenga la llave la abre. Cada ingreso queda registrado y el CCTV 24/7 acompaña cada visita." },
      { q: "¿Por cuánto tiempo puedo guardar documentos?", a: "El tiempo que necesites. Pagas por meses, sin permanencia mínima, y cambias de tamaño si tu archivo crece." },
      { q: "¿Puedo consultar un documento cuando lo necesite?", a: `Sí, en el horario de atención de tu sede: ${company.hours}.` },
    ],
    cta: { title: "Libera la oficina", body: "Calcula el espacio de tus cajas y archivadores, o cotiza y te recomendamos la sede más cerca de tu oficina." },
  },

  "bodegas-para-constructoras": {
    path: "/bodegas-para-constructoras/",
    metaTitle: "Bodegas para Constructoras y Remodelación | Bogotá",
    // Spec text ends "Contratos por proyecto." (PENDIENTE CONFIRMAR); replaced with the confirmed monthly terms.
    description: "Guarda materiales, herramienta y mobiliario durante obras y remodelaciones en Bogotá. Por meses, sin permanencia mínima.",
    crumb: "Para constructoras",
    h1: "Bodegas para constructoras y obra",
    intro: [
      "La obra avanza y la herramienta, el material sobrante y los muebles del cliente no tienen dónde quedarse. Dejarlos en el sitio estorba el trabajo, y moverlos cada semana cuesta tiempo.",
      "Con una bodega de Storage S.A.S guardas mientras dura el proyecto: pagas por meses, sin permanencia mínima, y la entregas cuando termina la obra. En Autopista Norte con Calle 197 el acceso vehicular deja descargar el camión junto a la bodega.",
    ],
    // PENDIENTE CONFIRMAR con el cliente qué materiales de obra se pueden guardar.
    useCases: { title: "Qué guardan las obras", items: ["Herramienta", "Material sobrante", "Muebles durante la remodelación", "Equipos de obra", "Cierre de proyecto"] },
    guide: {
      title: guideTitle,
      body: "Referencias aproximadas para una obra. Si el material ocupa más de 60 m³, cotizamos un espacio personalizado con visita técnica.",
      tiers: [
        { m3: 3, art: "cajas", fits: ["Herramienta menor en cajas", "Tornillería y accesorios", "Equipos eléctricos portátiles"] },
        { m3: 15, art: "apartamento", fits: ["Los muebles de un apartamento en remodelación", "Puertas y enchapes sin instalar", "Andamios desarmados"] },
        { m3: 40, art: "empresa", fits: ["Material en estibas", "El mobiliario de una casa completa", "Equipos de varias obras"] },
      ],
    },
    recommender: {
      title: "¿Qué tamaño necesita tu obra?",
      body: "Según lo que vas a guardar durante el proyecto.",
      recommended: "grande",
      rows: {
        pequena: "La herramienta y los accesorios de una cuadrilla.",
        mediana: "Los muebles de un apartamento mientras lo remodelas.",
        grande: "Material en estibas o el mobiliario de una casa completa.",
      },
    },
    security: { title: "Tu herramienta, bajo tu candado", body: "Solo quien tiene la llave abre la bodega, y cada ingreso queda registrado: sabes quién entró por material y cuándo." },
    sede: { title: "Una sede en la ruta de tu obra", body: "Autopista Norte con Calle 197 tiene acceso vehicular para descargar junto a la bodega. Toberín, Spring y Paloquemao cubren el norte, el noroccidente y el centro." },
    blog: { title: "Guías para tu obra", teasers: [articles.espacio, articles.guardar] },
    faqTitle: "Preguntas sobre bodegas para obra",
    faq: [
      { q: "¿Puedo guardar solo mientras dura la obra?", a: "Sí. Pagas por meses, sin permanencia mínima, y entregas la bodega cuando termina el proyecto. Si el material crece a mitad de obra, cambias de tamaño según la disponibilidad de la sede." },
      { q: "¿Qué sede sirve para descargar con camión?", a: "Autopista Norte con Calle 197 tiene acceso vehicular: el carro o el camión descarga junto a la bodega. En las demás sedes te confirmamos el acceso para carga en la cotización." },
    ],
    cta: { title: "Espacio para tu obra", body: "Calcula el volumen de lo que vas a guardar, o cotiza y te recomendamos la sede más cerca de la obra." },
  },
} satisfies Record<string, SegmentCopy>;

export type SegmentSlug = keyof typeof segmentPages;
