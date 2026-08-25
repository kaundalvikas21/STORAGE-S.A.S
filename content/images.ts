/**
 * Photo manifest: every image slot on the page maps here, and ONLY here.
 * This is the swap point for the client's real sede photographs (spec Open Item 1):
 * replace src/alt per slot, delete the credit. Until then: license-free Unsplash
 * photography, every URL verified live (HTTP 200) at build time of this manifest.
 * Credits are data for attribution bookkeeping, never rendered on the page.
 */

export type Photo = { src: string; alt: string; credit: string };

const u = (id: string, w = 1200) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

/** Shared blur placeholder: solid --line color, so every photo fades in from the page's own neutral. */
export const BLUR =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='10'%3E%3Crect width='16' height='10' fill='%23E3E6EC'/%3E%3C/svg%3E";

/** Keyed by sede slug (content/site.ts sedes[]). PENDIENTE: fotos reales de cada sede. */
export const sedePhotos: Record<string, Photo> = {
  "autopista-norte-197": {
    src: u("1649313444539-a8900c5cdc54"),
    alt: "Hilera de minibodegas con puertas metálicas y acceso vehicular",
    credit: "Adam Winger · unsplash.com/photos/8Bsh8NnVCEo",
  },
  toberin: {
    src: u("1694601618351-dbbbb2b8934f"),
    alt: "Minibodegas en hilera con puertas de persiana amarillas",
    credit: "Aga Adamek · unsplash.com/photos/a-row-of-storage-units-with-yellow-doors",
  },
  "spring-calle-135": {
    src: u("1638847868668-a05a2f69622f"),
    alt: "Edificio de bodegaje con puertas rojas de acceso independiente",
    credit: "Adam Winger · unsplash.com/photos/a-storage-building-with-red-doors-and-a-sky-background",
  },
  paloquemao: {
    src: u("1568632234157-ce7aecd03d0d"),
    alt: "Panorámica urbana de Bogotá con los cerros al fondo",
    credit: "Random Institute · unsplash.com/photos/GkacI-_mGlg",
  },
};

/** Bodegaje featured cell (SiloDoors → ShowcaseCycler), 3 shots. */
export const showcase: Photo[] = [
  {
    src: u("1770720086655-22f3d1205dc2"),
    alt: "Pasillo de minibodegas con puertas de persiana e iluminación uniforme",
    credit: "Storage World Self Storage · unsplash.com/photos/_xTJQe5ycZc",
  },
  {
    src: u("1757837593538-b4a8654132f1"),
    alt: "Bodega con cajas de cartón apiladas y organizadas",
    credit: "Declan Sun · unsplash.com/photos/6N6EXN0x_E4",
  },
  {
    src: u("1771530789155-b1f03fbf82b5"),
    alt: "Interior de bodega amplia con piso pulido e iluminación clara",
    credit: "Craftsman Concrete Floors · unsplash.com/photos/3lkaszxWfGc",
  },
];

/** SiloDoors, celda Mudanzas. */
export const siloMudanzas: Photo = {
  src: u("1710749093416-1e9cdde8d080"),
  alt: "Camión de mudanzas cargado con cajas de cartón",
  credit: "Dmitry Kropachev · unsplash.com/photos/JehUq4NBfwE",
};

/** SegmentStrip: Hogar / Empresa. */
export const segmentHogar: Photo = {
  src: u("1714647211902-bb711d643a17"),
  alt: "Persona empacando cajas de mudanza en la sala de su casa",
  credit: "Vitaly Gariev · unsplash.com/photos/wS40ELZROLE",
};
export const segmentEmpresa: Photo = {
  src: u("1587293852726-70cdb56c2866"),
  alt: "Cajas de cartón sobre estanterías metálicas en una bodega",
  credit: "CHUTTERSNAP · unsplash.com/photos/brown-cardboard-boxes-on-white-metal-rack",
};

/** Hero backdrop: a purpose-shot minibodega corridor (1672x941, local asset). The plate is
 *  built with an empty light wall on the left, which is exactly where the H1 and CTAs sit;
 *  the units and the city view fall behind the visualizer column. Rendered under a light
 *  `--bg` veil so it reads as depth, not subject, and the page theme stays light.
 *  Decorative, hence the empty alt. */
export const heroBackdrop: Photo = {
  src: "/img/hero_img_bg.png",
  alt: "",
  credit: "Asset propio · pasillo de minibodegas con puertas enrollables y vista a la ciudad",
};

/** ClosingBand background (renders under a dark scrim behind the frosted panel; text stays HTML).
 *  A night shot on purpose: the band is a `.dark-cell`, so a high-key daytime plate turns to mud
 *  under the scrim. Any client-supplied replacement should be dusk or night. */
export const ctaClosing: Photo = {
  src: u("1549829156-071604ac29a4", 1600),
  alt: "",
  credit: "Michael Schmid · unsplash.com/photos/MZC7xHEeKqw · Panorámica nocturna de Bogotá",
};

/** Declared for later client photos. NOT rendered anywhere yet: SizeStrip stays icon-driven by design. */
export const reserve: Record<string, Photo> = {
  sizeSmall: {
    src: u("1606824722920-4c652a70f348"),
    alt: "Cajas pequeñas etiquetadas y organizadas en estantes",
    credit: "Egor Litvinov · unsplash.com/photos/ncKxCn5SI3A",
  },
  sizeMedium: {
    src: u("1617782674367-341cf5f527c9"),
    alt: "Puerta de persiana metálica de una bodega mediana",
    credit: "the blowup · unsplash.com/photos/gray-roll-up-door-closed",
  },
  sizeLarge: {
    src: u("1507035159636-7a86eb324885"),
    alt: "Persiana enrollable blanca de una bodega grande",
    credit: "Kyle Head · unsplash.com/photos/white-roller-shutter",
  },
};
