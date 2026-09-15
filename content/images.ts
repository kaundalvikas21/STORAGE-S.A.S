/**
 * Photo manifest: every image slot on the page maps here, and ONLY here.
 * All slots are local assets in public/img/: generated storage-first images in the hero plate's
 * style (client checklist §1.3). This is still the swap point for the client's real sede
 * photographs (spec Open Item 1): replace src/alt per slot. Credits are bookkeeping, never rendered.
 */

/** /bodegaje-bogota/ PillarIntro: a whole facility beside a Bogotá avenue, so the first picture says
 *  "a real place in the city". Not a specific sede. */
export const pillarPhoto: Photo = {
  src: "/img/sede-alt-1.png",
  alt: "Sede de minibodegas con franja amarilla y puertas de persiana junto a una avenida de Bogotá, con los cerros al fondo",
  credit: "Imagen generada · sede junto a avenida con los cerros",
};

export type Photo = { src: string; alt: string; credit: string };

/** /sedes/ CoverageProse ("¿Qué sede te queda más cerca?"): a sede beside a busy avenue with
 *  Monserrate behind, so the picture says "access by road, in the city". Not a specific sede. */
export const coveragePhoto: Photo = {
  src: "/img/sede-alt-3.png",
  alt: "Sede de minibodegas amarillas junto a una avenida de Bogotá, con Monserrate y los cerros al fondo",
  credit: "Imagen generada · sede junto a avenida con Monserrate",
};

/** /seguridad/ slots, 1536x1024 generated plates. Intro: the client's own padlock (capability, R5).
 *  CCTV bento cell: the camera sits top-centre so both the 16:10 phone crop and the tall lg crop keep it. */
export const seguridadPhoto: Photo = {
  src: "/img/seguridad-candado.png",
  alt: "Mano cerrando un candado propio en la puerta amarilla de una minibodega, con un pasillo de bodegas y los cerros de Bogotá al fondo",
  credit: "Imagen generada · candado propio del cliente",
};
export const cctvPhoto: Photo = {
  src: "/img/seguridad-cctv.png",
  alt: "Cámara de seguridad en el techo de un pasillo de minibodegas con puertas amarillas y un ventanal hacia los cerros de Bogotá",
  credit: "Imagen generada · CCTV en pasillo interior",
};

/** /precios/ intro: four open units growing left to right, so the picture says "the price follows the
 *  size". No numbers or price tags in the plate (spec Open Item 4). */
export const preciosPhoto: Photo = {
  src: "/img/precios-tamanos.png",
  alt: "Cuatro minibodegas abiertas de puertas amarillas, de menor a mayor tamaño, con cajas, estantería y muebles cubiertos con plástico",
  credit: "Imagen generada · cuatro tamaños de bodega",
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

/** Segment pages (spec T3) PageIntro photo, keyed by page slug. Hogar and empresas reuse the SegmentStrip
 *  plates. FOTOS PENDIENTES: drop each file into public/img/ and uncomment its slot; until then that intro
 *  renders as one column. */
export const segmentPhotos: Record<string, Photo | undefined> = {
  "minibodegas-para-hogar": segmentHogar,
  "minibodegas-para-empresas": segmentEmpresa,
  // "bodegas-para-ecommerce": {
  //   src: "/img/segment-ecommerce.png",
  //   alt: "Cajas de pedidos rotuladas y una estantería con producto dentro de una minibodega de puerta amarilla",
  //   credit: "Imagen generada · inventario de tienda en línea",
  // },
  // "almacenamiento-de-archivo-y-documentos": {
  //   src: "/img/segment-archivo.png",
  //   alt: "Cajas de archivo rotuladas en estanterías metálicas dentro de una minibodega de puerta amarilla",
  //   credit: "Imagen generada · archivo en estanterías",
  // },
  // "bodegas-para-constructoras": {
  //   src: "/img/segment-obra.png",
  //   alt: "Camioneta descargando herramienta y material de obra hacia una minibodega de puerta amarilla, con los cerros de Bogotá al fondo",
  //   credit: "Imagen generada · material de obra hacia minibodega",
  // },
};

/** /mudanzas-bogota/ Trasteos card: reuses the Usaquén catchment plate (a family loading moving boxes). */
export const trasteoPhoto: Photo = {
  src: "/img/zona-usaquen-cedritos.png",
  alt: "Familia cargando cajas de mudanza en un carro, en una calle arborizada de edificios de ladrillo con los cerros al fondo",
  credit: "Imagen generada · Usaquén y Cedritos",
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

/** Sede page galleries (spec T5 block 2), keyed by page slug, up to 4 photos, no photo repeated across
 *  pages. FOTOS REALES PENDIENTES · Open Item 1: every slot is a generated placeholder until the client's
 *  own photographs of that site arrive (swap src/alt per slot). SedeGallery shapes its bento to the count. */
export const sedeGallery: Record<string, Photo[]> = {
  "autopista-norte-197": [
    sedePhotos["autopista-norte-197"],
    {
      src: "/img/sede-alt-2.png",
      alt: "Minibodegas de puertas amarillas junto a la autopista, con patio de acceso vehicular y una bodega abierta con cajas",
      credit: "Imagen generada · fachada sobre autopista con patio vehicular",
    },
    {
      src: "/img/sede-autopista-norte-acceso.png",
      alt: "Hombre descargando cajas de una camioneta hacia una minibodega abierta de puertas amarillas, junto a la autopista",
      credit: "Imagen generada · acceso vehicular",
    },
    {
      src: "/img/sede-autopista-norte-pasillo.png",
      alt: "Pasillo interior amplio de minibodegas con puertas amarillas, piso de concreto pulido y ventanal hacia los cerros",
      credit: "Imagen generada · pasillo interior",
    },
  ],
  toberin: [
    sedePhotos["toberin-1"],
    sedePhotos["toberin-2"],
    sedePhotos["toberin-4"],
    {
      src: "/img/sede-toberin-pasillo.png",
      alt: "Pasillo de minibodegas con puertas amarillas y un carro de carga, con una ventana hacia la ciudad",
      credit: "Imagen generada · pasillo Toberín",
    },
  ],
  "spring-calle-135": [
    sedePhotos["spring-calle-135"],
    {
      src: "/img/sede-spring-entrada.png",
      alt: "Entrada de vidrio con recepción bajo una marquesina amarilla, en una calle residencial arborizada",
      credit: "Imagen generada · entrada Spring",
    },
    {
      src: "/img/sede-spring-pasillo.png",
      alt: "Pasillo iluminado de minibodegas amarillas con una bodega vacía abierta",
      credit: "Imagen generada · pasillo Spring",
    },
    {
      src: "/img/sede-spring-bodega.png",
      alt: "Minibodega abierta con cajas, estantería y muebles cubiertos con plástico, con candado en la puerta",
      credit: "Imagen generada · bodega abierta Spring",
    },
  ],
  paloquemao: [
    sedePhotos["paloquemao-1"],
    sedePhotos["paloquemao-2"],
    {
      src: "/img/segment-empresa-alt.png",
      alt: "Mujer revisando inventario con una tableta entre estanterías y minibodegas de puertas amarillas",
      credit: "Imagen generada · inventario comercial en bodega",
    },
    {
      src: "/img/sede-paloquemao-carga.png",
      alt: "Operario moviendo una estiba de cajas con un gato hidráulico frente a minibodegas amarillas, junto a un camión de carga",
      credit: "Imagen generada · muelle de carga Paloquemao",
    },
  ],
};

/** Blog (spec T9) cover per article, keyed by slug: card photo on /blog/ and the post's cover (its LCP).
 *  Existing plates reused until dedicated covers exist (FOTOS PENDIENTES: blog-{slug}.png); swap src/alt here. */
export const articlePhotos: Record<string, Photo> = {
  "cuanto-espacio-necesito": preciosPhoto,
  "como-empacar-muebles": segmentHogar,
  "almacenamiento-durante-una-mudanza": siloMudanzas,
  "que-se-puede-guardar-en-una-minibodega": sedeGallery["spring-calle-135"][3],
  "almacenamiento-para-pymes": segmentEmpresa,
  "como-organizar-tu-bodega": showcase[1],
};

/** ZonesServed band (sede pages): the catchment itself, not the building, so the photo says "we
 *  serve your area". Keyed by page slug, 1536x1024 generated placeholders. A slug without a photo
 *  keeps its band in one column. */
export const zonePhotos: Record<string, Photo | undefined> = {
  "autopista-norte-197": {
    src: "/img/zona-sabana-norte.png",
    alt: "Autopista saliendo de Bogotá hacia la Sabana entre eucaliptos y potreros verdes, con minibodegas de puertas amarillas junto a la vía",
    credit: "Imagen generada · Sabana Norte",
  },
  toberin: {
    src: "/img/zona-usaquen-cedritos.png",
    alt: "Familia cargando cajas de mudanza en un carro, en una calle arborizada de edificios de ladrillo con los cerros al fondo",
    credit: "Imagen generada · Usaquén y Cedritos",
  },
  "spring-calle-135": {
    src: "/img/zona-suba-colina.png",
    alt: "Conjuntos residenciales de ladrillo junto a un parque y una avenida arborizada, con los cerros al fondo",
    credit: "Imagen generada · Suba y Colina",
  },
  paloquemao: {
    src: "/img/zona-centro-paloquemao.png",
    alt: "Calle comercial del centro de Bogotá con puestos de flores y frutas y una furgoneta descargando cajas, con Monserrate al fondo",
    credit: "Imagen generada · Centro y Paloquemao",
  },
};
