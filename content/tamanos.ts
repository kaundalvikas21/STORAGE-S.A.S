// Size pages (spec T8, silo 1B), one entry per facts.ts `sizes[].id`; path, range and fits come from `sizes`.
// BLOCKED on spec Open Item 2 (occupancy file: exact m³ per unit, units per band, price per band), so the
// pages ship noindex (components/tamanos/SizePage.tsx has the unblock checklist). metaTitle, description and
// h1 are the spec's strings (tab 02), "desde 1 m³" read as 2 m³ and "una o dos habitaciones" as two (facts.ts
// sizes). Guide tiers are m³ references inside each band only; nothing here states a price or a dimension.
import { company, sizes } from "./facts";
import type { SegmentCopy } from "./segments";

export type SizeId = "pequena" | "mediana" | "grande" | "personalizada";
export type SizeCopy = {
  metaTitle: string;
  description: string;
  h1: string;
  intro: string[];
  guide: SegmentCopy["guide"];
  priceBody: string;
  cta: { title: string; body: string };
};

const [pequena, mediana, grande, personalizada] = sizes;
const measures = "Las medidas exactas de cada bodega cambian según la sede: te las confirmamos en la cotización.";
const guideBody = (range: string) => `Referencias aproximadas dentro del rango de ${range}. La calculadora suma tus objetos uno por uno.`;
const priceBody = (label: string) =>
  `No hay una tarifa única: el valor de una bodega ${label} depende de la sede y del tiempo que guardes. Cotiza en línea y te enviamos el valor exacto el mismo día, sin costos ocultos.`;
const cta = (label: string) => ({
  title: `¿Te sirve una bodega ${label}?`,
  body: "Cuéntanos qué necesitas guardar y en qué zona. Te confirmamos la medida, la sede y el valor, el mismo día.",
});

export const sizePages: Record<SizeId, SizeCopy> = {
  pequena: {
    metaTitle: "Bodegas Pequeñas en Arriendo Bogotá | Desde 2 m³",
    description: "Bodegas pequeñas en arriendo en Bogotá, ideales para cajas, archivo y objetos de un apartaestudio. Desde 2 m³.",
    h1: "Bodegas pequeñas",
    intro: [
      `Las bodegas pequeñas, de ${pequena.range}, guardan cajas, maletas, archivo y objetos sueltos, o el contenido de un apartamento de una alcoba. Guardas por meses, sin permanencia mínima, y la cierras con tu propio candado.`,
      `${measures} Si lo que guardas crece, cambias a una bodega mediana según la disponibilidad de tu sede.`,
    ],
    guide: {
      title: "Qué cabe en una bodega pequeña",
      body: guideBody(pequena.range),
      tiers: [
        { m3: 2, art: "cajas", fits: ["Cajas, maletas y ropa de temporada", "Adornos, libros y juguetes"] },
        { m3: 6, art: "apartaestudio", fits: ["Cama doble y nevera", "Escritorio y silla", "Las cajas de un apartaestudio"] },
        { m3: 10, art: "apartamento", fits: ["Sofá y mesa de comedor", "Cama, nevera y lavadora", "Las cajas de un apartamento de una alcoba"] },
      ],
    },
    priceBody: priceBody(pequena.label),
    cta: cta(pequena.label),
  },
  mediana: {
    metaTitle: "Bodegas Medianas en Bogotá | Storage S.A.S",
    description: "Bodegas medianas en Bogotá para el contenido de un apartamento de dos habitaciones. Acceso libre en horario de atención.",
    h1: "Bodegas medianas",
    intro: [
      `Las bodegas medianas, de ${mediana.range}, guardan el contenido de un apartamento de dos alcobas durante una mudanza, una remodelación o un viaje largo. También sirven a negocios que guardan mobiliario o archivo.`,
      `${measures} Entras libremente en el horario de atención de tu sede: ${company.hours}.`,
    ],
    guide: {
      title: "Qué cabe en una bodega mediana",
      body: guideBody(mediana.range),
      tiers: [
        { m3: 15, art: "apartamento", fits: ["Sala y comedor", "Dos alcobas con sus camas", "Lavadora, nevera y cajas"] },
        { m3: 18, art: "empresa", fits: ["Mobiliario de una oficina pequeña", "Archivo en cajas", "Mercancía en estibas"] },
        { m3: 20, art: "apartamento", fits: ["Un apartamento de dos alcobas completo", "Electrodomésticos", "Cajas y objetos sueltos"] },
      ],
    },
    priceBody: priceBody(mediana.label),
    cta: cta(mediana.label),
  },
  grande: {
    metaTitle: "Bodegas Grandes en Arriendo Bogotá | Storage",
    description: "Bodegas grandes en Bogotá para casas completas, inventario comercial y mobiliario de oficina. Acceso vehicular.",
    h1: "Bodegas grandes",
    intro: [
      `Las bodegas grandes, de ${grande.range}, guardan una casa completa o un apartamento de tres o más alcobas, inventario comercial o el mobiliario de una oficina.`,
      `La sede Autopista Norte con Calle 197 tiene alta disponibilidad de bodegas grandes y acceso vehicular: el carro o el camión de la mudanza descarga junto a la bodega. ${measures}`,
    ],
    guide: {
      title: "Qué cabe en una bodega grande",
      body: guideBody(grande.range),
      tiers: [
        { m3: 25, art: "apartamento", fits: ["Un apartamento de tres alcobas", "Sala, comedor y electrodomésticos"] },
        { m3: 40, art: "empresa", fits: ["Inventario comercial en estibas", "Mobiliario de oficina", "Archivo en cajas"] },
        { m3: 60, art: "apartamento", fits: ["Una casa completa", "Muebles de todas las alcobas", "Electrodomésticos y cajas"] },
      ],
    },
    priceBody: priceBody(grande.label),
    cta: cta(grande.label),
  },
  personalizada: {
    metaTitle: "Espacios Personalizados y Áreas Productivas | Storage",
    description: "Diseñamos el espacio a la medida de tu operación: áreas productivas, bodegas de gran formato y configuraciones especiales.",
    h1: "Espacios personalizados y áreas productivas",
    intro: [
      `Los espacios personalizados empiezan en ${personalizada.range.replace(" +", "")} y se diseñan a la medida: oficinas, industria, áreas productivas y casas de cuatro o más alcobas.`,
      "Se cotizan con visita técnica: vemos lo que necesitas guardar u operar y te proponemos el espacio y la sede que mejor se ajustan.",
    ],
    guide: {
      title: "Qué se diseña a la medida",
      body: `Espacios de ${personalizada.range}, sin una medida fija: cada uno se define en la visita técnica.`,
      tiers: [
        { name: "Casas", art: "apartamento", fits: ["Casas de 4 o más alcobas", "Muebles, electrodomésticos y cajas"] },
        { name: "Oficinas", art: "empresa", fits: ["Mobiliario y equipos", "Archivo de la empresa"] },
        { name: "Industria", art: "empresa", fits: ["Áreas productivas", "Bodegas de gran formato", "Configuraciones especiales"] },
      ],
    },
    priceBody: "Cada espacio personalizado se cotiza con visita técnica, según el área, la sede y el uso. Cotiza en línea y coordinamos la visita.",
    cta: {
      title: "¿Necesitas un espacio a la medida?",
      body: "Cuéntanos qué necesitas guardar u operar. Coordinamos la visita técnica y te enviamos la propuesta.",
    },
  },
};

// Labels shared by the four size pages. `availableHigh` is how sedes.ts "Disponible" reads on a size page.
export const sizePage = {
  // SWAP: show sizes[].priceRange here once Open Item 2/4 delivers price bands.
  priceTitle: "Cotiza tu tarifa",
  availabilityTitle: "Disponibilidad por sede",
  availabilityBody: "Autopista Norte con Calle 197 tiene la mayor disponibilidad. En las demás sedes te confirmamos el espacio en la cotización.",
  availableHigh: "Alta disponibilidad",
  allSedes: "Ver todas las sedes",
  compareTitle: "Compara con los otros tamaños",
};
