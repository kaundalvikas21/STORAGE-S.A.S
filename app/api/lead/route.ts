import { sedes, sizes } from "@/content/site";
import { LEAD_FIELDS, normalizeCelular, validateLead, type LeadAnswers } from "@/lib/lead";

const known = { sedes: sedes.map((s) => s.id), tamanos: sizes.map((b) => b.id) };
const clip = (v: unknown, max: number) => String(v ?? "").slice(0, max);

/**
 * Lead intake for /cotizar/ (spec T7). A plain Web Request/Response handler, so it maps 1:1 to a
 * WordPress form-plugin webhook. The browser opens WhatsApp whatever this returns (lib/lead.ts):
 * a failure here costs the CRM copy, never the lead.
 */
export async function POST(req: Request) {
  const raw: unknown = await req.json().catch(() => null);
  if (!raw || typeof raw !== "object") return Response.json({ ok: false }, { status: 400 });
  const body = raw as Record<string, unknown>;

  // Trust boundary: the same validation as the form, against the same content lists.
  const answers = Object.fromEntries(LEAD_FIELDS.map((k) => [k, clip(body[k], 200)])) as LeadAnswers;
  const errors = validateLead(answers, known);
  if (Object.keys(errors).length) return Response.json({ ok: false, errors }, { status: 400 });

  const utmEntries = body.utm && typeof body.utm === "object" ? Object.entries(body.utm).slice(0, 12) : [];
  const lead = {
    ...answers,
    nombre: answers.nombre.trim(),
    celular: normalizeCelular(answers.celular),
    page: clip(body.page, 200),
    referrer: clip(body.referrer, 500),
    utm: Object.fromEntries(utmEntries.map(([k, v]) => [k.slice(0, 40), clip(v, 200)])),
    receivedAt: new Date().toISOString(),
  };

  // TODO: CRM webhook. Endpoint and field mapping are spec Open Item 12 (pending with the client).
  const hook = process.env.LEAD_WEBHOOK_URL;
  if (!hook) {
    // Name and phone stay out of the logs.
    console.info("[lead] PENDIENTE: sin LEAD_WEBHOOK_URL, no se reenvió", { sede: lead.sede, tamano: lead.tamano, cuando: lead.cuando });
    return Response.json({ ok: true, forwarded: false });
  }
  const res = await fetch(hook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
    signal: AbortSignal.timeout(8000),
  }).catch(() => null);
  if (!res?.ok) {
    console.error("[lead] el webhook del CRM falló", res?.status ?? "sin respuesta");
    return Response.json({ ok: false }, { status: 502 });
  }
  return Response.json({ ok: true, forwarded: true });
}
