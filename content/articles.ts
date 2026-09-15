// Blog silo 5 (spec T9 + tab 06 "Six launch blog articles"): the light index, featured first. Bodies live in
// content/blog/{slug}.ts (one WordPress post each, spec P1), gathered in content/blog/index.ts, which only
// pages import, so client bundles never carry post bodies.
// Silo law (R3): articles link UP into silo 1 and the conversion layer (the mudanza article also to
// /mudanzas-bogota/: the spec names it the bridge article between the two silos). Commercial pages reach the
// blog only through the segment BlogTeasers. Facts lockdown: no prices, no bylines, no phone numbers.
// Slugs: the spec gives none; short keyword slugs decided 2026-09-15. PENDIENTE CONFIRMAR.
import { articlePhotos, type Photo } from "./images";

export type BlogCategory = "tamanos" | "empaque" | "mudanzas" | "empresas" | "organizacion";

// The wireframe's real categories, in its order; WordPress's "Uncategorized" default never appears (T9 note 1).
export const blogCategoryLabels: Record<BlogCategory, string> = {
  tamanos: "Tamaños",
  empaque: "Empaque",
  mudanzas: "Mudanzas",
  empresas: "Empresas",
  organizacion: "Organización",
};

/** Inline links inside `text` and `items` are written [label](/ruta/) (lib/articles.ts splitLinks).
 *  `cta` is the mid-article InlineCta, always with the site's own wording for that intent (R4). */
export type Block =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[]; mark?: "check" | "x" }
  | { type: "cta"; text: string; intent: "calcular" | "cotizar" };

export type ArticleContent = {
  body: Block[];
  /** NextStepBand, required on every post: links up into commercial pages (the article's silo job). */
  next: { title: string; body: string; links: { label: string; href: string }[] };
};

export type ArticleSlug =
  | "cuanto-espacio-necesito"
  | "como-empacar-muebles"
  | "almacenamiento-durante-una-mudanza"
  | "que-se-puede-guardar-en-una-minibodega"
  | "almacenamiento-para-pymes"
  | "como-organizar-tu-bodega";

export type ArticleMeta = {
  slug: ArticleSlug;
  path: string;
  /** The h1: tab 06's exact title. */
  title: string;
  metaTitle: string;
  description: string;
  excerpt: string;
  category: BlogCategory;
  photo: Photo;
  /** ISO date for Article JSON-LD. */
  published: string;
};

const PUBLISHED = "2026-09-15"; // PENDIENTE CONFIRMAR: fecha real de publicación de cada artículo.

const post = (slug: ArticleSlug, m: Pick<ArticleMeta, "title" | "metaTitle" | "description" | "excerpt" | "category">): ArticleMeta => ({
  slug,
  path: `/blog/${slug}/`,
  photo: articlePhotos[slug],
  published: PUBLISHED,
  ...m,
});

// Tab 02 /blog/ row: title "Blog | Consejos de Almacenamiento y Mudanzas", h1 and description verbatim.
export const blogHub = {
  path: "/blog/",
  metaTitle: "Consejos de Almacenamiento y Mudanzas | Storage S.A.S",
  description: "Guías prácticas sobre almacenamiento, mudanzas, empaque y organización de espacios en Bogotá.",
  crumb: "Blog",
  h1: "Recursos y consejos",
  intro: [
    "Guías prácticas sobre almacenamiento, mudanzas, empaque y organización de espacios en Bogotá: cuánto espacio necesitas, cómo preparar tus muebles y cómo sacarle provecho a tu bodega.",
  ],
  index: { gridTitle: "Artículos", filter: "Filtrar artículos por tema", all: "Todos", results: "artículos", cardLink: "Leer artículo" },
  minutes: "min de lectura",
  toc: "En este artículo",
  nextLabel: "Tu siguiente paso",
  cta: {
    title: "¿Cuánto espacio vas a necesitar?",
    body: "Suma tus muebles y cajas en la calculadora y conoce el tamaño de bodega recomendado. Después cotizas con ese tamaño ya elegido.",
  },
};

export const articles: ArticleMeta[] = [
  post("cuanto-espacio-necesito", {
    title: "¿Cuánto espacio necesito? Guía de tamaños de bodega en m³",
    metaTitle: "¿Cuánto espacio necesito? Guía de tamaños en m³ | Storage",
    description: "Calcula el espacio de bodega que necesitas en m³: cuánto ocupan tus muebles, los cuatro tamaños de bodega y los errores más comunes.",
    excerpt: "Cuánto ocupan tus muebles en m³, qué tamaño de bodega corresponde a cada situación y cómo evitar pagar espacio de más.",
    category: "tamanos",
  }),
  post("como-empacar-muebles", {
    title: "Cómo empacar muebles para almacenamiento prolongado",
    metaTitle: "Cómo empacar muebles para guardarlos en bodega | Storage",
    description: "Cómo empacar muebles antes de guardarlos por meses: limpieza, desarme, protección por material, cajas rotuladas y acomodo en la bodega.",
    excerpt: "Limpiar, desarmar, proteger cada material y rotular las cajas: lo que evita rayones, humedad y piezas perdidas cuando guardas por meses.",
    category: "empaque",
  }),
  post("almacenamiento-durante-una-mudanza", {
    title: "Almacenamiento durante una mudanza: cómo coordinar ambos servicios",
    metaTitle: "Almacenamiento durante una mudanza en Bogotá | Storage",
    description: "Cuándo necesitas una bodega durante tu mudanza y cómo coordinar el trasteo y el almacenamiento en Bogotá: etapas, volumen y fechas.",
    excerpt: "Si las fechas no coinciden o el lugar nuevo no está listo, planear el trasteo en dos etapas evita cargar el camión dos veces con prisa.",
    category: "mudanzas",
  }),
  post("que-se-puede-guardar-en-una-minibodega", {
    title: "Qué se puede y qué no se puede guardar en una minibodega",
    metaTitle: "Qué se puede guardar en una minibodega | Storage S.A.S",
    description: "Qué objetos puedes guardar en una minibodega en Bogotá, cuáles están restringidos por seguridad y qué casos conviene consultar antes.",
    excerpt: "Muebles, cajas, archivo e inventario sí. Perecederos, inflamables y armas no. Las reglas protegen tu bodega y las de los demás.",
    category: "empaque",
  }),
  post("almacenamiento-para-pymes", {
    title: "Almacenamiento para pymes: cuándo deja de ser rentable alquilar oficina",
    metaTitle: "Almacenamiento para pymes en Bogotá | Storage S.A.S",
    description: "Cuándo le conviene a una pyme sacar archivo, inventario y mobiliario de la oficina a una bodega: señales, cómo hacer la cuenta y qué tamaño elegir.",
    excerpt: "Si el archivo o el inventario ocupan la oficina, pagas arriendo de oficina para guardar cajas. Así haces la cuenta.",
    category: "empresas",
  }),
  post("como-organizar-tu-bodega", {
    title: "Cómo organizar tu bodega para aprovechar cada metro cúbico",
    metaTitle: "Cómo organizar tu bodega y aprovechar cada m³ | Storage",
    description: "Ideas para organizar tu minibodega: planear antes de cargar, usar la altura, dejar un pasillo, rotular y ordenar el inventario por rotación.",
    excerpt: "Usar la altura, dejar un pasillo y llevar un inventario de cajas: una bodega ordenada guarda más y te deja encontrar todo.",
    category: "organizacion",
  }),
];
