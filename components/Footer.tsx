import Link from "next/link";
import { MapPin, Phone, ChatText, Clock } from "@phosphor-icons/react/dist/ssr";
import { allAddresses, company, footerCols, sedes, QUOTE_URL } from "@/content/site";

const linkCls =
  "text-[13px] text-bg/75 hover:text-bg transition-colors duration-fast ease-soft cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const colTitle = "font-display text-[15px] font-bold uppercase tracking-[0.06em] border-b border-bg/25 pb-2 mb-4";
const napLabel = "text-bg/60 mb-1 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em]";

export default function Footer() {
  return (
    <footer className="border-t border-bg/25 bg-ink text-bg pb-24 md:pb-0">
      <div className="mx-auto max-w-site px-5 md:px-8 lg:px-10 py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className={colTitle}>Bodegaje</h2>
            <ul className="space-y-2.5">
              {footerCols.bodegaje.map((l) => (
                <li key={l.href}><Link href={l.href} className={linkCls}>{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={colTitle}>Sedes</h2>
            <ul className="space-y-3">
              {allAddresses.map((a) => (
                <li key={a.label} className="text-[13px]">
                  <span className="block font-medium text-bg">{a.label}</span>
                  <address className="not-italic font-mono text-[12px] leading-relaxed text-bg/65">{a.address}</address>
                </li>
              ))}
              <li className="pt-1">
                <Link href="/sedes/" className={`${linkCls} font-mono text-[12px] uppercase tracking-[0.08em] text-primary hover:text-bg`}>Ver las 7 sedes →</Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className={colTitle}>Mudanzas</h2>
            <ul className="space-y-2.5">
              {footerCols.mudanzas.map((l) => (
                <li key={l.href}><Link href={l.href} className={linkCls}>{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={colTitle}>Empresa · Legales · PQRS</h2>
            <ul className="space-y-2.5">
              {footerCols.empresa.map((l) => (
                <li key={l.href}><Link href={l.href} className={linkCls}>{l.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-[1.5px] border-bg/30 p-6 md:p-8 grid gap-6 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-lg font-bold uppercase">{company.legalName}</p>
            <p className="mt-1 text-[13px] text-bg/70">Minibodegas, bodegaje y mudanzas en Bogotá desde {company.founded}.</p>
            <p className="mt-3 text-[13px] text-bg/70 flex items-start gap-2">
              <MapPin size={18} weight="regular" aria-hidden="true" className="mt-0.5 shrink-0" />
              <span className="font-mono text-[12px]">Sede principal: {sedes[0].address}</span>
            </p>
          </div>
          <div className="text-[13px]">
            <p className={napLabel}><Phone size={16} weight="regular" aria-hidden="true" />Teléfono</p>
            <a href={`tel:${company.phone.replace(/\s/g, "")}`} className={`${linkCls} font-mono font-medium text-bg`}>{company.phoneLabel}</a>
          </div>
          <div className="text-[13px]">
            <p className={napLabel}><ChatText size={16} weight="regular" aria-hidden="true" />WhatsApp</p>
            <p className="font-mono font-medium">{company.whatsappLabel}</p>
            <Link href={QUOTE_URL} className={`${linkCls} text-primary hover:text-bg`}>Escríbenos desde el formulario →</Link>
          </div>
          <div className="text-[13px]">
            <p className={napLabel}><Clock size={16} weight="regular" aria-hidden="true" />Horario</p>
            <p className="font-mono font-medium">{company.hours}</p>
          </div>
        </div>

        <p className="mt-8 font-mono text-[12px] text-bg/55">
          © {new Date().getFullYear()} {company.legalName} · Bogotá, Colombia
        </p>
      </div>
    </footer>
  );
}
