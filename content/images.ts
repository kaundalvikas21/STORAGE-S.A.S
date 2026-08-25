// Image manifest: every photo slot on the homepage, keyed by a semantic name.
// This is the swap point for the client's real sede photographs (spec Open Item 1):
// replace `src` (and `credit`) here, nothing else changes. All current sources are
// Unsplash License (free, commercial, no attribution required); `credit` is kept for the record.
// `blur` is the image's dominant colour, used to build the blurDataURL placeholder.

export type ImageSlot = { src: string; alt: string; credit: string; blur: string };

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop`;

export const images = {
  heroMain: {
    src: "/img/hero_img_bg_2.png",
    alt: "Equipo de mudanzas de Storage cargando un sofá y cajas en el camión frente a un edificio en Bogotá",
    credit: "Storage S.A.S",
    blur: "#eeece8",
  },
  sedeCalle197: {
    src: unsplash("1649313444539-a8900c5cdc54"),
    alt: "Hilera de bodegas con puertas enrollables y acceso vehicular en la sede Calle 197",
    credit: "Adam Winger, Unsplash",
    blur: "#528e8b",
  },
  sedeToberin: {
    src: unsplash("1770720086655-22f3d1205dc2"),
    alt: "Corredor interior de minibodegas con puertas numeradas en la sede Toberín",
    credit: "Storage World, Unsplash",
    blur: "#ab9866",
  },
  sedeSpring: {
    src: unsplash("1694601618351-dbbbb2b8934f"),
    alt: "Puertas de minibodegas en fila dentro de la sede Spring, Calle 135",
    credit: "Aga Adamek, Unsplash",
    blur: "#988c6e",
  },
  sedePaloquemao: {
    src: unsplash("1649313522492-ffb2ab3c7dac"),
    alt: "Bodegas con zona de cargue frente a las puertas en la sede Paloquemao",
    credit: "Adam Winger, Unsplash",
    blur: "#ac8e77",
  },
  siloBodegaje: {
    src: unsplash("1517490232338-06b912a786b5"),
    alt: "Puertas enrollables numeradas de minibodegas, cerradas con candado",
    credit: "Steve A Johnson, Unsplash",
    blur: "#68a798",
  },
  siloSedes: {
    src: unsplash("1568632234157-ce7aecd03d0d"),
    alt: "Edificios de Bogotá con los cerros orientales al fondo",
    credit: "Random Institute, Unsplash",
    blur: "#996b57",
  },
  siloMudanzas: {
    src: unsplash("1698917414969-feade59e3343"),
    alt: "Operario descargando muebles desde la parte trasera de un camión de mudanzas",
    credit: "Egor Ivlev, Unsplash",
    blur: "#77888a",
  },
  segmentHogar: {
    src: unsplash("1758523670991-ee93bc48d81d"),
    alt: "Pareja cargando cajas de cartón y una planta al entrar a su nuevo apartamento",
    credit: "Vitaly Gariev, Unsplash",
    blur: "#879aa6",
  },
  segmentEmpresa: {
    src: unsplash("1644079446600-219068676743"),
    alt: "Bodega empresarial con estanterías metálicas llenas de inventario",
    credit: "Lance Chang, Unsplash",
    blur: "#6c8498",
  },
  ctaClosing: {
    src: unsplash("1662320154145-7263e998e7a2"),
    alt: "Pasillo de minibodegas con puertas metálicas y luz uniforme",
    credit: "Beatriz Reynolds, Unsplash",
    blur: "#66858b",
  },
  // Size illustrations: transparent PNGs, rendered with fit="contain" over the .illus-wash gradient.
  sizeSmall: {
    src: "/img/small.png",
    alt: "Ilustración de una bodega pequeña: tres cajas, una lámpara, libros, una planta y un tapete enrollado",
    credit: "Storage S.A.S",
    blur: "#f7f7f5",
  },
  sizeMedium: {
    src: "/img/medium.png",
    alt: "Ilustración de una bodega mediana: sofá de dos puestos, sillón, mesa auxiliar, maleta y cajas de trasteo",
    credit: "Storage S.A.S",
    blur: "#f7f7f5",
  },
  sizeLarge: {
    src: "/img/big.png",
    alt: "Ilustración de una bodega grande: nevera, colchón, cama, cómoda, sofá, mesa de centro y muchas cajas",
    credit: "Storage S.A.S",
    blur: "#f7f7f5",
  },
  sizeCustom: {
    src: "/img/customized.png",
    alt: "Ilustración de un espacio personalizado: estantería industrial con estibas, canastas, escalera y montacargas manual",
    credit: "Storage S.A.S",
    blur: "#f7f7f5",
  },
} satisfies Record<string, ImageSlot>;

export type ImageKey = keyof typeof images;

/** Tiny dominant-colour SVG as a data URL: the blur placeholder needs no fetch and never shifts layout. */
export const blurDataURL = (hex: string) =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="8" height="6"><rect width="8" height="6" fill="${hex}"/></svg>`)}`;
