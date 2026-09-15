// Quote lead (spec T7 /cotizar/). Plain TypeScript with no React and no imports: the same functions
// run in the form, in app/api/lead/route.ts and, verbatim, in a future WordPress widget. Data
// (sede names, band labels, WhatsApp number) comes in as arguments. This is the only file that
// builds a WhatsApp URL (`waChatUrl`).

export const LEAD_FIELDS = ["sede", "tamano", "cuando", "nombre", "celular"] as const;
export type LeadAnswers = Record<(typeof LEAD_FIELDS)[number], string>;
export type LeadErrors = Partial<LeadAnswers>;

export const NEAREST = "mas-cercana";
export const UNSURE = "no-seguro";
export const CUANDO: Record<string, string> = { ya: "Ya", "este-mes": "Este mes", "mas-adelante": "Más adelante" };

/** Colombian mobile: 10 digits starting with 3, optional +57. Returns "" when invalid. */
export function normalizeCelular(v: string) {
  const d = v.replace(/\D/g, "").replace(/^57(?=\d{10}$)/, "");
  return /^3\d{9}$/.test(d) ? d : "";
}

/** Known ids are passed in so the browser and the route handler validate against the same lists. */
export function validateLead(a: LeadAnswers, known: { sedes: string[]; tamanos: string[] }): LeadErrors {
  const e: LeadErrors = {};
  if (a.sede !== NEAREST && !known.sedes.includes(a.sede)) e.sede = "Elige una sede o la más cercana a ti.";
  if (a.tamano !== UNSURE && !known.tamanos.includes(a.tamano)) e.tamano = "Elige un tamaño o marca que no estás seguro.";
  if (!(a.cuando in CUANDO)) e.cuando = "Dinos cuándo lo necesitas.";
  const nombre = a.nombre.trim();
  if (nombre.length < 2 || nombre.length > 80) e.nombre = "Escribe tu nombre.";
  if (!normalizeCelular(a.celular)) e.celular = "Escribe un celular de 10 dígitos que empiece por 3.";
  return e;
}

type Labels = { sedeName: string; bandLabel: string };

export function buildWhatsAppMessage(a: LeadAnswers, { sedeName, bandLabel }: Labels) {
  const tamano = a.tamano === UNSURE ? "(tamaño por definir)" : bandLabel;
  const sede = a.sede === NEAREST ? "más cercana" : sedeName;
  return `Hola, soy ${a.nombre.trim()}. Necesito una bodega ${tamano} en la sede ${sede}, la necesito ${CUANDO[a.cuando].toLowerCase()}.`;
}

/** The single wa.me builder: the floating bubble (prefilled greeting) and the form hand-off both use it. */
export function waChatUrl(phone: string, text: string) {
  return `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
}

export function buildWhatsAppUrl(a: LeadAnswers, labels: Labels & { phone: string }) {
  return waChatUrl(labels.phone, buildWhatsAppMessage(a, labels));
}

/** Answers + attribution (the point of the form: campaign source survives the click). */
export function buildLeadPayload(a: LeadAnswers, ctx: { page: string; search: string; referrer: string }) {
  const params = [...new URLSearchParams(ctx.search)];
  const utm = Object.fromEntries(params.filter(([k]) => k.startsWith("utm_") || k === "gclid" || k === "fbclid"));
  return { ...a, nombre: a.nombre.trim(), celular: normalizeCelular(a.celular), page: ctx.page, referrer: ctx.referrer, utm };
}
export type LeadPayload = ReturnType<typeof buildLeadPayload>;

/** POST → conversion event → WhatsApp. Call synchronously from the submit handler. */
// Trailing slash: next.config has `trailingSlash: true`, so "/api/lead" would 308 first.
export async function submitLead(payload: LeadPayload, waUrl: string, endpoint = "/api/lead/") {
  // Open the tab inside the user gesture: after an await, browsers block window.open.
  const tab = window.open("", "_blank");
  if (tab) tab.opener = null;
  try {
    const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), signal: AbortSignal.timeout(4000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
  } catch (err) {
    // Never lose the lead: WhatsApp still opens with every answer. Only the CRM copy failed.
    console.error("[lead] no se pudo registrar en el CRM", err);
  }
  // TODO: GTM container ID. Name and phone stay out of analytics.
  const w = window as unknown as { dataLayer?: object[] };
  (w.dataLayer ??= []).push({ event: "lead_submit", sede: payload.sede, tamano: payload.tamano, cuando: payload.cuando, ...payload.utm });
  if (tab) tab.location.href = waUrl;
  else window.location.href = waUrl;
}
