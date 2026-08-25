/**
 * Photo manifest: every image slot on the page maps here, and ONLY here.
 * This is the swap point for the client's real sede photographs (spec Open Item 1):
 * replace `src` + `alt` per slot and drop the credit. Until then: license-free Unsplash
 * photography. `credit` is attribution bookkeeping, never rendered on the page.
 * No image ever carries text - HTML copy carries the message (hard SEO rule).
 */

export type Photo = { src: string; alt: string; credit: string };

const u = (id: string, w = 1200) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

/** Shared blur placeholder: --bg-deep, so every photo fades up out of the page's own warm ground. */
export const BLUR =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='10'%3E%3Crect width='16' height='10' fill='%23F3EFE9'/%3E%3C/svg%3E";

export const photos = {
  /**
   * PENDIENTE: reemplazar por la foto real de sede del cliente.
   * Swap point - drop the file in public/img/ and set `src: "/img/<archivo>"`; nothing else changes.
   */
  heroMain: {
    src: "/img/hero_img_bg_3.png",
    alt: "Patio de carga de minibodegas con montacargas, camión de mudanzas y Bogotá al fondo",
    credit: "Storage S.A.S",
  },

  sedeCalle197: {
    src: u("1770720086655-22f3d1205dc2"),
    alt: "Pasillo luminoso de minibodegas con puertas de persiana y señalización clara",
    credit: "Storage World Self Storage · unsplash.com/photos/_xTJQe5ycZc",
  },
  sedeToberin: {
    src: u("1694601618351-dbbbb2b8934f"),
    alt: "Minibodegas en hilera con puertas de persiana amarillas",
    credit: "Aga Adamek · unsplash.com/photos/a-row-of-storage-units-with-yellow-doors",
  },
  sedeSpring: {
    src: u("1638847868668-a05a2f69622f"),
    alt: "Edificio de bodegaje con puertas rojas de acceso independiente",
    credit: "Adam Winger · unsplash.com/photos/a-storage-building-with-red-doors-and-a-sky-background",
  },
  sedePaloquemao: {
    src: u("1568632234157-ce7aecd03d0d"),
    alt: "Panorámica urbana de Bogotá con los cerros orientales al fondo",
    credit: "Random Institute · unsplash.com/photos/GkacI-_mGlg",
  },

  siloBodegaje: {
    src: u("1618438502398-195e47778d6c", 1400),
    alt: "Pasillo de minibodegas con puertas metálicas a lado y lado y luz cenital",
    credit: "Raphael · unsplash.com/photos/empty-hallway-with-lights-turned-on-in-the-middle",
  },
  siloMudanzas: {
    src: u("1710749093416-1e9cdde8d080"),
    alt: "Camión de mudanzas cargado con cajas de cartón",
    credit: "Dmitry Kropachev · unsplash.com/photos/JehUq4NBfwE",
  },

  segmentHogar: {
    src: u("1714647211902-bb711d643a17"),
    alt: "Persona empacando cajas de mudanza en la sala de su casa",
    credit: "Vitaly Gariev · unsplash.com/photos/wS40ELZROLE",
  },
  segmentEmpresa: {
    src: u("1587293852726-70cdb56c2866"),
    alt: "Cajas de cartón organizadas sobre estanterías metálicas en una bodega",
    credit: "CHUTTERSNAP · unsplash.com/photos/brown-cardboard-boxes-on-white-metal-rack",
  },

  /** Transparent PNG illustrations: SizeStrip renders them with `fit="contain"` over a gradient well. */
  sizeSmall: {
    src: "/img/small.png",
    alt: "Cajas de cartón, libros, una lámpara y una planta: lo que cabe en una bodega pequeña",
    credit: "Storage S.A.S",
  },
  sizeMedium: {
    src: "/img/medium.png",
    alt: "Sofá, sillón, maleta y cajas: el contenido de un apartamento de 1 a 2 alcobas",
    credit: "Storage S.A.S",
  },
  sizeLarge: {
    src: "/img/big.png",
    alt: "Mobiliario de casa completa con cajas apiladas y electrodomésticos",
    credit: "Storage S.A.S",
  },
  sizeCustom: {
    src: "/img/customized.png",
    alt: "Estantería industrial con estibas, cajas y un montacargas: espacio a la medida de una operación",
    credit: "Storage S.A.S",
  },

  /** Renders under a dark scrim behind HTML text: decorative, so alt stays empty. */
  ctaClosing: {
    src: u("1549829156-071604ac29a4", 1800),
    alt: "",
    credit: "Michael Schmid · unsplash.com/photos/MZC7xHEeKqw · panorámica nocturna de Bogotá",
  },
} satisfies Record<string, Photo>;

/** SedeGrid renders content/site.ts `sedes[]` in commercial order; this keys the slots to it. */
export const sedePhotos: Record<string, Photo> = {
  "autopista-norte-197": photos.sedeCalle197,
  toberin: photos.sedeToberin,
  "spring-calle-135": photos.sedeSpring,
  paloquemao: photos.sedePaloquemao,
};

/** SizeStrip: keyed by `sizes[].href`. "Personalizados" keeps its dark differential shell around its illustration. */
export const sizePhotos: Record<string, Photo> = {
  "/bodegas-pequenas/": photos.sizeSmall,
  "/bodegas-medianas/": photos.sizeMedium,
  "/bodegas-grandes/": photos.sizeLarge,
  "/espacios-personalizados/": photos.sizeCustom,
};
