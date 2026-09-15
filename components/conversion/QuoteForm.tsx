"use client";

import Link from "next/link";
import { useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight, CheckCircle, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { CtaIcon, btnClass } from "@/components/Button";
import { CALC_URL, company, sizes } from "@/content/facts";
import { sedes } from "@/content/sedes";
import { quotePage as t } from "@/content/conversion";
import { CUANDO, LEAD_FIELDS, NEAREST, UNSURE, buildLeadPayload, buildWhatsAppUrl, submitLead, validateLead, type LeadAnswers } from "@/lib/lead";

const known = { sedes: sedes.map((s) => s.id), tamanos: sizes.map((b) => b.id) };
const focus = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
// Input + label classes mirror the newsletter form (components/Popups.tsx, MASTER.md §7 Pop-ups).
const field = `min-h-[48px] w-full rounded-md border border-muted-2 bg-surface px-4 text-base text-ink ${focus}`;
const legend = "mb-2 text-[14px] font-medium text-ink";
// Radio cards/chips: visually hidden native radios, so arrow keys and screen readers work as usual.
// Selected state reuses the IntentCards idiom (primary border + primary-soft fill).
const choice = "flex cursor-pointer border bg-surface transition-[border-color,background-color,box-shadow] duration-fast ease-soft hover:border-muted-2 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2";
const state = (on: boolean) => (on ? "border-primary bg-primary-soft shadow-2" : "border-line");

function ErrorLine({ id, children }: { id: string; children?: ReactNode }) {
  if (!children) return null;
  return (
    <p id={id} role="alert" className="flex items-center gap-2 text-[14px] text-ink">
      <WarningCircle size={18} aria-hidden="true" className="shrink-0" />
      {children}
    </p>
  );
}

/**
 * The four-field qualifying form (spec T7): sede → tamaño → cuándo → nombre y celular, one screen.
 * Validation, payload and the WhatsApp hand-off live in lib/lead.ts (framework-free). Errors show
 * inline after the first submit and update as the visitor fixes them; focus jumps to the first one.
 */
export default function QuoteForm({ initial }: { initial: { sede: string; tamano: string } }) {
  const [a, setA] = useState<LeadAnswers>({ sede: initial.sede, tamano: initial.tamano, cuando: "", nombre: "", celular: "" });
  const [tried, setTried] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const errors = tried ? validateLead(a, known) : {};
  const set = (k: keyof LeadAnswers) => (e: { target: { value: string } }) => setA((p) => ({ ...p, [k]: e.target.value }));
  const errId = (k: keyof LeadAnswers) => (errors[k] ? `q-${k}-error` : undefined);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTried(true);
    const firstError = LEAD_FIELDS.find((k) => validateLead(a, known)[k]);
    if (firstError) {
      document.querySelector<HTMLElement>(`[data-field="${firstError}"]`)?.focus();
      return;
    }
    const labels = { sedeName: sedes.find((s) => s.id === a.sede)?.name ?? "", bandLabel: sizes.find((b) => b.id === a.tamano)?.label ?? "" };
    const payload = buildLeadPayload(a, { page: location.pathname, search: location.search, referrer: document.referrer });
    setStatus("sending");
    // Synchronous call inside the submit gesture: submitLead opens the WhatsApp tab before awaiting.
    void submitLead(payload, buildWhatsAppUrl(a, { ...labels, phone: company.whatsapp })).then(() => setStatus("done"));
  };

  return (
    <form onSubmit={submit} noValidate className="grid gap-7">
      <div className="grid gap-2">
        <label htmlFor="q-sede" className="text-[14px] font-medium text-ink">{t.sede.label}</label>
        <select id="q-sede" data-field="sede" value={a.sede} onChange={set("sede")} aria-invalid={!!errors.sede} aria-describedby={errId("sede")} className={`${field} cursor-pointer`}>
          <option value="" disabled>{t.sede.placeholder}</option>
          {sedes.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} · {s.zone}{s.badge ? ` (${s.badge})` : ""}
            </option>
          ))}
          <option value={NEAREST}>{t.sede.nearest}</option>
        </select>
        <ErrorLine id="q-sede-error">{errors.sede}</ErrorLine>
      </div>

      <fieldset aria-describedby={errId("tamano")} className="grid gap-2">
        <legend className={legend}>{t.tamano.label}</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {sizes.map((b, i) => (
            <label key={b.id} className={`${choice} ${state(a.tamano === b.id)} flex-col rounded-md px-4 py-3`}>
              <input type="radio" name="tamano" value={b.id} checked={a.tamano === b.id} onChange={set("tamano")} data-field={i === 0 ? "tamano" : undefined} className="sr-only" />
              <span className="text-[15px] font-semibold text-ink">{b.name}</span>
              <span className="tnum text-[13px] text-ink-2">{b.range}</span>
            </label>
          ))}
          <label className={`${choice} ${state(a.tamano === UNSURE)} flex-col rounded-md px-4 py-3 sm:col-span-2`}>
            <input type="radio" name="tamano" value={UNSURE} checked={a.tamano === UNSURE} onChange={set("tamano")} className="sr-only" />
            <span className="text-[15px] font-semibold text-ink">{t.tamano.unsure}</span>
            <span className="text-[13px] text-ink-2">{t.tamano.unsureHint}</span>
          </label>
        </div>
        <Link href={CALC_URL} className={`group inline-flex min-h-[44px] w-fit items-center gap-1.5 rounded-sm text-[14px] font-medium text-primary hover:text-primary-deep ${focus}`}>
          <span className="link-draw">{t.tamano.calcLink}</span>
          <ArrowRight size={14} aria-hidden="true" className="transition-transform duration-fast ease-soft group-hover:translate-x-1" />
        </Link>
        <ErrorLine id="q-tamano-error">{errors.tamano}</ErrorLine>
      </fieldset>

      <fieldset aria-describedby={errId("cuando")} className="grid gap-2">
        <legend className={legend}>{t.cuando.label}</legend>
        <div className="flex flex-wrap gap-2">
          {Object.entries(CUANDO).map(([value, text], i) => (
            <label key={value} className={`${choice} ${state(a.cuando === value)} min-h-[44px] items-center rounded-sm px-4 text-[15px] font-medium text-ink`}>
              <input type="radio" name="cuando" value={value} checked={a.cuando === value} onChange={set("cuando")} data-field={i === 0 ? "cuando" : undefined} className="sr-only" />
              {text}
            </label>
          ))}
        </div>
        <ErrorLine id="q-cuando-error">{errors.cuando}</ErrorLine>
      </fieldset>

      <fieldset className="grid gap-2">
        <legend className={legend}>{t.contacto.label}</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid content-start gap-2">
            <label htmlFor="q-nombre" className="text-[13px] text-ink-2">{t.contacto.nombre}</label>
            <input id="q-nombre" data-field="nombre" autoComplete="name" value={a.nombre} onChange={set("nombre")} aria-invalid={!!errors.nombre} aria-describedby={errId("nombre")} className={field} />
            <ErrorLine id="q-nombre-error">{errors.nombre}</ErrorLine>
          </div>
          <div className="grid content-start gap-2">
            <label htmlFor="q-celular" className="text-[13px] text-ink-2">{t.contacto.celular}</label>
            <input
              id="q-celular"
              data-field="celular"
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              value={a.celular}
              onChange={set("celular")}
              aria-invalid={!!errors.celular}
              aria-describedby={["q-celular-hint", errId("celular")].filter(Boolean).join(" ")}
              className={`${field} tnum`}
            />
            <p id="q-celular-hint" className="text-[13px] text-ink-2">{t.contacto.celularHint}</p>
            <ErrorLine id="q-celular-error">{errors.celular}</ErrorLine>
          </div>
        </div>
      </fieldset>

      <div className="grid gap-3">
        <button type="submit" disabled={status === "sending"} className={`${btnClass("primary")} w-full disabled:cursor-wait disabled:opacity-70`}>
          {status !== "sending" && <CtaIcon intent="whatsapp" />}
          {status === "sending" ? t.sending : t.submit}
        </button>
        {status === "done" && (
          <p role="status" className="flex items-center gap-2 text-[14px] font-medium text-ink">
            <CheckCircle size={18} aria-hidden="true" className="shrink-0 text-primary" />
            {t.done}
          </p>
        )}
        <p className="text-[14px] text-ink-2">
          {t.response}{" "}
          {company.hours.split(" · ").map((h, i) => (
            <span key={h} className="tnum whitespace-nowrap">
              {i > 0 && " · "}
              {h}
            </span>
          ))}
          .
        </p>
        <p className="text-[13px] text-muted">
          {t.consent}{" "}
          <Link href="/politica-tratamiento-de-datos/" className="underline underline-offset-2 hover:text-ink">{t.consentLink}</Link>.
        </p>
      </div>
    </form>
  );
}
