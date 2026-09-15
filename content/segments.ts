// Segments and need profiles (spec silo 1A).

// `m3` is the preset an intent card pushes into the calc store; `answer` and `sizeLabel`
// are the availability copy for the selected profile. Ranges follow the client's size table
// (Pequeñas 2-10, Medianas 15-20, Grandes 25-60, Personalizados 60+); lib/calc-store.ts mirrors them.
// Autopista Norte always named first (commercial rule).
export const intentCards = [
  { id: "cajas", title: "Algunas cajas", range: "2-5 m³", m3: 3, sizeLabel: "Bodega pequeña", hint: "Cajas, maletas, archivo", answer: "Bodega pequeña, disponible en Autopista Norte y Toberín" },
  { id: "apartaestudio", title: "Apartaestudio", range: "6-10 m³", m3: 8, sizeLabel: "Bodega pequeña", hint: "Cama, nevera, escritorio", answer: "Bodega pequeña, disponible en Autopista Norte y Toberín" },
  { id: "apartamento", title: "Apartamento", range: "15-20 m³", m3: 18, sizeLabel: "Bodega mediana", hint: "Sala, comedor, 2 alcobas", answer: "Bodega mediana, disponible en Autopista Norte y Spring" },
  { id: "empresa", title: "Empresa", range: "25 m³ +", m3: 40, sizeLabel: "Bodega grande", hint: "Inventario, mobiliario, archivo", answer: "Bodega grande o personalizada, disponible en Autopista Norte y Paloquemao" },
] as const;

export const segments = [
  {
    title: "Para tu hogar",
    body: "Mudanzas, remodelaciones, viajes, falta de espacio.",
    href: "/minibodegas-para-hogar/",
  },
  {
    title: "Para tu empresa",
    body: "Inventario, archivo, mobiliario, espacios productivos.",
    href: "/minibodegas-para-empresas/",
  },
];

export const needs = [
  { label: "Hogar", href: "/minibodegas-para-hogar/" },
  { label: "Empresas", href: "/minibodegas-para-empresas/" },
  { label: "E-commerce", href: "/bodegas-para-ecommerce/" },
  { label: "Archivo", href: "/almacenamiento-de-archivo-y-documentos/" },
  { label: "Obra", href: "/bodegas-para-constructoras/" },
];
