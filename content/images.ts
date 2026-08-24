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
  heroMain: {
    src: u("1618438502398-195e47778d6c", 1400),
    alt: "Pasillo iluminado de un edificio de minibodegas con puertas metálicas a lado y lado",
    credit: "Raphael · unsplash.com/photos/empty-hallway-with-lights-turned-on-in-the-middle",
  },

  sedeCalle197: {
    src: u("1649313444539-a8900c5cdc54"),
    alt: "Hilera de minibodegas con puertas metálicas y acceso vehicular amplio",
    credit: "Adam Winger · unsplash.com/photos/8Bsh8NnVCEo",
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
    src: u("1770720086655-22f3d1205dc2", 1400),
    alt: "Pasillo de minibodegas con puertas de persiana e iluminación uniforme",
    credit: "Storage World Self Storage · unsplash.com/photos/_xTJQe5ycZc",
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

  sizeSmall: {
    src: u("1757837593538-b4a8654132f1", 800),
    alt: "Cajas de cartón apiladas y organizadas dentro de una bodega",
    credit: "Declan Sun · unsplash.com/photos/6N6EXN0x_E4",
  },
  sizeMedium: {
    src: u("1617782674367-341cf5f527c9", 800),
    alt: "Puerta de persiana metálica cerrada de una bodega mediana",
    credit: "the blowup · unsplash.com/photos/gray-roll-up-door-closed",
  },
  sizeLarge: {
    src: u("1771530789155-b1f03fbf82b5", 800),
    alt: "Interior de bodega amplia con piso pulido e iluminación clara",
    credit: "Craftsman Concrete Floors · unsplash.com/photos/3lkaszxWfGc",
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

/** SizeStrip: "Personalizados" is the dark differential cell and stays photo-less (MASTER.md §8.5). */
export const sizePhotos: Record<string, Photo> = {
  "/bodegas-pequenas/": photos.sizeSmall,
  "/bodegas-medianas/": photos.sizeMedium,
  "/bodegas-grandes/": photos.sizeLarge,
};
