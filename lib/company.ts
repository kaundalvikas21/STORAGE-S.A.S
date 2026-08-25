// NAP single source of truth. The visible footer NAP block AND the Organization JSON-LD
// (lib/jsonld.ts) both read from here, so they cannot drift.
//
// PENDIENTE CONFIRMAR (spec Open Item 7): the phone and WhatsApp below are placeholders.
// Before launch they MUST match the Google Business Profiles character-for-character.
// A single confirmed number is still pending from the client.

export const company = {
  legalName: "Bodegajes y Mudanzas Storage S.A.S",
  brand: "Storage S.A.S",
  founded: 2011,
  phone: "+57 (601) XXX XXXX", // PENDIENTE CONFIRMAR: única línea principal (PBX), formato idéntico al GBP
  phoneHref: "tel:+57601XXXXXXX", // PENDIENTE CONFIRMAR: se reemplaza junto con `phone`
  whatsapp: "+57 3XX XXX XXXX", // PENDIENTE CONFIRMAR: se muestra solo como texto; los CTA van a /cotizar/
  hours: "Lun-Vie 8:00-17:30 · Sáb 8:00-13:30",
  openingHoursSpec: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "17:30" },
    { days: ["Saturday"], opens: "08:00", closes: "13:30" },
  ],
  email: "info@storagebogota.com", // PENDIENTE CONFIRMAR
  employees: 22,
};

// The 7 physical addresses, written out in full as text (spec §01-3, local-SEO consistency).
// Order rule: Calle 197 first, then Toberín ×3, Spring, Paloquemao ×2. Never sort.
export const allAddresses: { label: string; address: string }[] = [
  { label: "Autopista Norte · Calle 197", address: "Autopista Norte # 197-10, Bogotá" },
  { label: "Toberín 1", address: "Calle 163 con Carrera 19B, Toberín, Bogotá · PENDIENTE CONFIRMAR nomenclatura" },
  { label: "Toberín 2", address: "Calle 163 con Carrera 19B, Toberín, Bogotá · PENDIENTE CONFIRMAR nomenclatura" },
  { label: "Toberín 3", address: "Calle 163 con Carrera 19B, Toberín, Bogotá · PENDIENTE CONFIRMAR nomenclatura" },
  { label: "Spring · Calle 135", address: "Calle 135 # 46-55, Bogotá" },
  { label: "Paloquemao 32", address: "Paloquemao, Bogotá · PENDIENTE CONFIRMAR nomenclatura" },
  { label: "Paloquemao 17", address: "Paloquemao, Bogotá · PENDIENTE CONFIRMAR nomenclatura" },
];
