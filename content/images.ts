// Image manifest — ONE entry per photographic slot on the homepage.
// This is the swap point for the client's real sede photographs (spec Open Item 1):
// replace `src` + `alt` + `credit` here and nothing else in the page changes.
//
// Until then every slot holds licence-free Unsplash photography chosen for this
// business (minibodegas, corredores, cajas de mudanza, bogotá), never generic office stock.
// The Unsplash licence does not require attribution; `credit` carries the source id so any
// photo can be traced back, and becomes the photographer credit when client photos land.
//
// `blur` is the photo's four dominant quadrant colours, decoded from Unsplash's own 8x8
// preview. <Photo> turns them into the blurDataURL, so no binary blobs live in this file.
// All `src` values share one query string because next.config.mjs matches `search` exactly.

export type ImageSlot = {
  src: string;
  /** Colombian Spanish, descriptive. Images illustrate; HTML text always carries the message. */
  alt: string;
  credit: string;
  /** Dominant colours, clockwise from top-left: TL, TR, BL, BR. */
  blur: [string, string, string, string];
};

export const images = {
  // Client-supplied editorial photograph (local asset, not a placeholder).
  heroMain: {
    src: "/img/hero_editorial_bg.png",
    alt: "Pasillo de minibodegas con puertas enrollables blancas y una bodega abierta con cajas apiladas sobre una estiba",
    credit: "Storage S.A.S",
    blur: ["#e2e1e1", "#bcb3aa", "#e6e6e6", "#b3a89d"],
  },
  siloBodegaje: {
    src: "https://images.unsplash.com/photo-1662320154145-7263e998e7a2?fm=jpg&fit=crop&w=2000&q=80",
    alt: "Corredor de bodegas individuales con puertas metálicas acanaladas y numeración por unidad",
    credit: "Unsplash · photo-1662320154145",
    blur: ["#798a90", "#6f7f83", "#769197", "#728c91"],
  },
  siloMudanzas: {
    src: "https://images.unsplash.com/photo-1694715669993-ea0022b470f7?fm=jpg&fit=crop&w=2000&q=80",
    alt: "Operario descargando cajas de un furgón blanco frente a la entrada de un edificio",
    credit: "Unsplash · photo-1694715669993",
    blur: ["#98887a", "#ab8d77", "#847769", "#9b8670"],
  },
  sedeCalle197: {
    src: "https://images.unsplash.com/photo-1638847868668-a05a2f69622f?fm=jpg&fit=crop&w=2000&q=80",
    alt: "Fachada de un centro de minibodegas con puertas enrollables y acceso vehicular amplio",
    credit: "Unsplash · photo-1638847868668",
    blur: ["#71afcb", "#96a8b1", "#8c7e8f", "#9e7677"],
  },
  sedeToberin: {
    src: "https://images.unsplash.com/photo-1694601618351-dbbbb2b8934f?fm=jpg&fit=crop&w=2000&q=80",
    alt: "Fila de minibodegas interiores con puertas enrollables numeradas y piso de concreto pulido",
    credit: "Unsplash · photo-1694601618351",
    blur: ["#b7a674", "#9a947c", "#937d45", "#8e7c60"],
  },
  sedeSpring: {
    src: "https://images.unsplash.com/photo-1649313444539-a8900c5cdc54?fm=jpg&fit=crop&w=2000&q=80",
    alt: "Bloque de bodegas de una planta con puertas enrollables y zona de cargue al frente",
    credit: "Unsplash · photo-1649313444539",
    blur: ["#4094d0", "#5e9ac4", "#b4b5ac", "#bfbaa6"],
  },
  sedePaloquemao: {
    src: "https://images.unsplash.com/photo-1517490232338-06b912a786b5?fm=jpg&fit=crop&w=2000&q=80",
    alt: "Tres puertas enrollables numeradas con bolardos de protección en la zona de cargue",
    credit: "Unsplash · photo-1517490232338",
    blur: ["#799792", "#7c9696", "#5f95a3", "#6495a9"],
  },
  segmentHogar: {
    src: "https://images.unsplash.com/photo-1714647211902-bb711d643a17?fm=jpg&fit=crop&w=2000&q=80",
    alt: "Mujer empacando cajas de cartón en la sala de su casa durante una mudanza",
    credit: "Unsplash · photo-1714647211902",
    blur: ["#99a29f", "#99a29e", "#796f6a", "#807670"],
  },
  segmentEmpresa: {
    src: "https://images.unsplash.com/photo-1644079446600-219068676743?fm=jpg&fit=crop&w=2000&q=80",
    alt: "Pasillo de estantería industrial con inventario paletizado en un centro de almacenamiento",
    credit: "Unsplash · photo-1644079446600",
    blur: ["#5a636a", "#677780", "#5d5e5a", "#667174"],
  },
  sizeSmall: {
    src: "https://images.unsplash.com/photo-1609143739217-01b60dad1c67?fm=jpg&fit=crop&w=2000&q=80",
    alt: "Torres de cajas de cartón organizadas sobre estibas contra una pared blanca",
    credit: "Unsplash · photo-1609143739217",
    blur: ["#b1a299", "#7c7160", "#b4a298", "#877865"],
  },
  sizeMedium: {
    src: "https://images.unsplash.com/photo-1663625318264-695d2d04f11a?fm=jpg&fit=crop&w=2000&q=80",
    alt: "Cajas de mudanza apiladas junto a la ventana de un apartamento",
    credit: "Unsplash · photo-1663625318264",
    blur: ["#635e5c", "#bcbbac", "#1d131c", "#6f6b68"],
  },
  sizeLarge: {
    src: "https://images.unsplash.com/photo-1757837593538-b4a8654132f1?fm=jpg&fit=crop&w=2000&q=80",
    alt: "Pared completa de cajas de inventario apiladas del piso al techo",
    credit: "Unsplash · photo-1757837593538",
    blur: ["#73777a", "#807d79", "#48413e", "#534c40"],
  },
  sizeCustom: {
    src: "https://images.unsplash.com/photo-1771530789155-b1f03fbf82b5?fm=jpg&fit=crop&w=2000&q=80",
    alt: "Nave industrial vacía de gran altura con piso pulido y estructura metálica a la vista",
    credit: "Unsplash · photo-1771530789155",
    blur: ["#7a7768", "#958b85", "#c1bfb7", "#d0ccc9"],
  },
  ctaClosing: {
    src: "https://images.unsplash.com/photo-1696976004140-3d547f62667b?fm=jpg&fit=crop&w=2000&q=80",
    alt: "Interior vacío de un contenedor de almacenamiento con paredes metálicas acanaladas",
    credit: "Unsplash · photo-1696976004140",
    blur: ["#7e5f6f", "#71677e", "#9a6c3f", "#846d4f"],
  },
  bogotaBand: {
    src: "https://images.unsplash.com/photo-1568632234157-ce7aecd03d0d?fm=jpg&fit=crop&w=2000&q=80",
    alt: "Vista aérea del centro de Bogotá con los cerros orientales al fondo",
    credit: "Unsplash · photo-1568632234157",
    blur: ["#71868d", "#98a7b1", "#7c786c", "#86827e"],
  },
} satisfies Record<string, ImageSlot>;

export type ImageKey = keyof typeof images;

