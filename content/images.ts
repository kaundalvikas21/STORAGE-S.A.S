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

const hub197: Photo = {
  src: u("1649313444539-a8900c5cdc54"),
  alt: "Hilera de minibodegas con puertas metálicas y acceso vehicular",
  credit: "Adam Winger · unsplash.com/photos/8Bsh8NnVCEo",
};
const hubToberin: Photo = {
  src: u("1694601618351-dbbbb2b8934f"),
  alt: "Minibodegas en hilera con puertas de persiana amarillas",
  credit: "Aga Adamek · unsplash.com/photos/a-row-of-storage-units-with-yellow-doors",
};
const hubSpring: Photo = {
  src: u("1638847868668-a05a2f69622f"),
  alt: "Edificio de bodegaje con puertas rojas de acceso independiente",
  credit: "Adam Winger · unsplash.com/photos/a-storage-building-with-red-doors-and-a-sky-background",
};
const hubPaloquemao: Photo = {
  src: u("1568632234157-ce7aecd03d0d"),
  alt: "Panorámica urbana de Bogotá con los cerros al fondo",
  credit: "Random Institute · unsplash.com/photos/GkacI-_mGlg",
};

/** Bodegaje featured cell (SiloDoors → ShowcaseCycler), 3 shots. Generated, storage-first images in the
 *  hero plate's style (checklist §1.3), local assets. Rendered in a 2:1 frame with object-cover. */
export const showcase: Photo[] = [
  {
    src: "/img/showcase-1.png",
    alt: "Pasillo de minibodegas con puertas de persiana amarillas y piso de concreto pulido",
    credit: "Imagen generada · pasillo de minibodegas amarillas",
  },
  {
    src: "/img/showcase-2.jpg",
    alt: "Minibodega abierta con cajas etiquetadas, un tapete, una lámpara y sillas, con candado en la puerta",
    credit: "Imagen generada · bodega abierta con pertenencias organizadas",
  },
  {
    src: "/img/showcase-3.png",
    alt: "Patio de carga con un montacargas llevando una estiba hacia minibodegas abiertas, con los cerros de Bogotá al fondo",
    credit: "Imagen generada · patio de carga con montacargas frente a Bogotá",
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

/** Hero backdrop (1672x941, local asset): the client-approved style reference (checklist §1).
 *  Bogotá hills and skyline behind a loading yard with a truck, a forklift and open storage
 *  units, so the first image says storage, not moving. The left third is an empty fog band,
 *  exactly where the H1 and CTAs sit. Decorative, hence the empty alt. */
export const heroBackdrop: Photo = {
  src: "/img/hero_img_bg_3.png",
  alt: "",
  credit: "Asset propio · patio de carga con minibodegas, montacargas y camión frente a los cerros de Bogotá",
};

/** ClosingBand background (renders under a dark scrim behind the frosted panel; text stays HTML).
 *  A night shot on purpose: the band is a `.dark-cell`, so a high-key daytime plate turns to mud
 *  under the scrim. Any client-supplied replacement should be dusk or night. */
export const ctaClosing: Photo = {
  src: u("1549829156-071604ac29a4", 1600),
  alt: "",
  credit: "Michael Schmid · unsplash.com/photos/MZC7xHEeKqw · Panorámica nocturna de Bogotá",
};

/** Declared for later client photos. SizeStrip stays illustration-driven by design. */
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

/** Keyed by sede id (content/site.ts sedes[]), one per physical point. PENDIENTE: fotos reales de
 *  cada punto. Until then placeholders rotate through the manifest so neighbouring cards (the three
 *  Toberín points) never repeat a picture. */
export const sedePhotos: Record<string, Photo> = {
  "autopista-norte-197": hub197,
  "toberin-1": hubToberin,
  "toberin-2": showcase[0],
  "toberin-4": reserve.sizeMedium,
  "spring-calle-135": hubSpring,
  "paloquemao-1": hubPaloquemao,
  "paloquemao-2": showcase[2],
};
