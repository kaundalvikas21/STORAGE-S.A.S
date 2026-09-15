// Business facts: the only source of company truth (spec P1: becomes an ACF options page 1:1).
// Values marked "PENDIENTE CONFIRMAR" are client deliverables (spec Open Items). Swap them here only.

export const QUOTE_URL = "/cotizar/";
export const CALC_URL = "/calculadora-de-espacio/";
export const SEDES_URL = "/sedes/";
export const SITE_URL = "https://storagebogota.com";

export const company = {
  legalName: "Bodegajes y Mudanzas Storage S.A.S",
  brand: "Storage S.A.S",
  founded: 2011,
  phone: "+57 601 000 0000", // PENDIENTE CONFIRMAR: única línea principal (PBX). DEBE coincidir carácter a carácter con el Google Business Profile (NAP, spec Open Item 7).
  phoneLabel: "(601) 000 0000",
  // Línea WhatsApp del sitio actual. Solo lib/lead.ts arma el enlace, después de enviar /cotizar/ (spec R4).
  whatsapp: "+57 314 404 2043",
  whatsappLabel: "314 404 2043",
  hours: "Lun-Vie 8:00-17:30 · Sáb 8:00-13:30",
  openingHoursSpec: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "17:30" },
    { days: ["Saturday"], opens: "08:00", closes: "13:30" },
  ],
  email: "info@storagebogota.com", // PENDIENTE CONFIRMAR
};

// Client values (checklist §3). PENDIENTE CONFIRMAR: the ranges leave gaps at 10-15 and 20-25 m³.
// `id` is the ?tamano= value (calculator → /cotizar/), `label` the singular used in sentences
// ("Bodega mediana"), `maxM3` the band ceiling lib/calculator.ts maps to; totals in a gap round up.
export const sizes = [
  { id: "pequena", label: "pequeña", maxM3: 10, name: "Pequeñas", range: "2-10 m³", fits: "Apartamento de 1 alcoba, cajas, archivo, objetos sueltos", hint: "Disponible en todas las sedes", href: "/bodegas-pequenas/" },
  { id: "mediana", label: "mediana", maxM3: 20, name: "Medianas", range: "15-20 m³", fits: "Apartamento de 2 alcobas", hint: "Disponible en todas las sedes", href: "/bodegas-medianas/" },
  { id: "grande", label: "grande", maxM3: 60, name: "Grandes", range: "25-60 m³", fits: "Apartamento de 3 o más alcobas, o casa", hint: "Autopista Norte · Alta disponibilidad", hot: true, href: "/bodegas-grandes/" },
  { id: "personalizada", label: "personalizada", maxM3: Infinity, name: "Personalizados", range: "60 m³ +", fits: "Oficinas, industria y casas de 4 o más alcobas", hint: "Se cotizan con visita técnica", href: "/espacios-personalizados/", differential: true },
];

export const trust = [
  { value: 2011, label: "Año de fundación" },
  { value: 7, label: "Sedes en Bogotá" },
  { value: 1000, suffix: "+", label: "Bodegas" },
  { value: 24, suffix: "/7", label: "CCTV y monitoreo" },
  { value: 22, label: "Profesionales" },
];

// Security as capability, never fear (spec R5). Every clause is already stated in faq[2].
export const securityLine = "Cada bodega se cierra con tu propio candado, con registro individual de ingreso y CCTV 24/7.";

// PENDIENTE CONFIRMAR minutos reales de respuesta.
export const reassurance = "Te respondemos en menos de 15 minutos en horario de atención.";
