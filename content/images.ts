/**
 * Photo manifest: every image slot on the page maps here, and ONLY here.
 * All slots are local assets in public/img/: generated storage-first images in the hero plate's
 * style (client checklist §1.3). This is still the swap point for the client's real sede
 * photographs (spec Open Item 1): replace src/alt per slot. Credits are bookkeeping, never rendered.
 * Unused alternates kept for quick swaps: /img/sede-alt-1..2.png, /img/segment-empresa-alt.png.
 */

export type Photo = { src: string; alt: string; credit: string };

/** /sedes/ CoverageProse ("¿Qué sede te queda más cerca?"): a sede beside a busy avenue with
 *  Monserrate behind, so the picture says "access by road, in the city". Not a specific sede. */
export const coveragePhoto: Photo = {
  src: "/img/sede-alt-3.png",
  alt: "Sede de minibodegas amarillas junto a una avenida de Bogotá, con Monserrate y los cerros al fondo",
  credit: "Imagen generada · sede junto a avenida con Monserrate",
};

/** Shared blur placeholder: solid --line color, so every photo fades in from the page's own neutral. */
export const BLUR =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='10'%3E%3Crect width='16' height='10' fill='%23E3E6EC'/%3E%3C/svg%3E";

/** Bodegaje featured cell (SiloDoors → ShowcaseCycler), 3 shots. Rendered in a 2:1 frame with object-cover. */
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

/** SiloDoors, celda Mudanzas: the unit is the subject, the truck supports it. */
export const siloMudanzas: Photo = {
  src: "/img/silo-mudanzas.png",
  alt: "Dos operarios descargan cajas de un camión hacia una minibodega de puertas amarillas, con los cerros de Bogotá al fondo",
  credit: "Imagen generada · descarga de camión hacia minibodega",
};

/** SegmentStrip: Hogar / Empresa. */
export const segmentHogar: Photo = {
  src: "/img/segment-hogar.png",
  alt: "Pareja empacando libros y pertenencias en cajas en su apartamento, con vista a Bogotá",
  credit: "Imagen generada · pareja empacando en casa",
};
export const segmentEmpresa: Photo = {
  src: "/img/segment-empresa.png",
  alt: "Mujer revisando inventario en una tableta dentro de una bodega con estanterías, junto a un pasillo de puertas amarillas",
  credit: "Imagen generada · inventario de empresa en bodega",
};

/** Hero backdrop (1672x941, local asset) in the client-approved style (checklist §1): a yellow-door
 *  storage facility with an open unit, a forklift carrying a pallet and a staff member walking in,
 *  Bogotá's hills and Monserrate behind. No truck: the first image says storage, not moving. The
 *  left 40% is an empty haze band, exactly where the H1 and CTAs sit. Decorative, hence the empty alt. */
export const heroBackdrop: Photo = {
  src: "/img/hero_bg.png",
  alt: "",
  credit: "Imagen generada · minibodegas amarillas con montacargas frente a los cerros de Bogotá y Monserrate",
};

/** ClosingBand background (renders under a dark scrim behind the frosted panel; text stays HTML).
 *  A night shot on purpose: the band is a `.dark-cell`, so a high-key daytime plate turns to mud
 *  under the scrim. Any replacement should be dusk or night. Decorative, hence the empty alt. */
export const ctaClosing: Photo = {
  src: "/img/cta-closing.png",
  alt: "",
  credit: "Imagen generada · minibodegas iluminadas de noche frente a Bogotá y Monserrate",
};

/** Keyed by sede id (content/site.ts sedes[]), one per physical point, no repeats.
 *  PENDIENTE: fotos reales de cada sede; until then generated facades. */
export const sedePhotos: Record<string, Photo> = {
  "autopista-norte-197": {
    src: "/img/sede-autopista-norte.png",
    alt: "Fachada amarilla de la sede Autopista Norte junto a la autopista, con una minibodega abierta",
    credit: "Imagen generada · fachada Autopista Norte",
  },
  "toberin-1": {
    src: "/img/sede-toberin-1.png",
    alt: "Edificio de minibodegas con fachada amarilla y ventanales en Toberín",
    credit: "Imagen generada · fachada Toberín 1",
  },
  "toberin-2": {
    src: "/img/sede-toberin-2.png",
    alt: "Sede de minibodegas con esquina amarilla y entrada de vidrio en Toberín",
    credit: "Imagen generada · fachada Toberín 2",
  },
  "toberin-4": {
    src: "/img/sede-toberin-4.png",
    alt: "Minibodegas de puertas amarillas con acceso vehicular cubierto en Toberín",
    credit: "Imagen generada · fachada Toberín 4",
  },
  "spring-calle-135": {
    src: "/img/sede-spring.png",
    alt: "Edificio de minibodegas amarillas de la sede Spring, con los cerros de Bogotá al fondo",
    credit: "Imagen generada · fachada Spring",
  },
  "paloquemao-1": {
    src: "/img/sede-paloquemao-1.png",
    alt: "Bodega amplia con fachada amarilla y puertas de persiana en Paloquemao",
    credit: "Imagen generada · fachada Paloquemao 1",
  },
  "paloquemao-2": {
    src: "/img/sede-paloquemao-2.png",
    alt: "Sede de minibodegas con franja amarilla y pasillo de acceso en Paloquemao",
    credit: "Imagen generada · fachada Paloquemao 2",
  },
};
