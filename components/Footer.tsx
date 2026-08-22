import Link from "next/link";
import { MapPin, Phone, ChatText, Clock } from "@phosphor-icons/react/dist/ssr";
import { allAddresses, company, footerCols, sedes, QUOTE_URL } from "@/content/site";

const linkCls =
  "text-[14px] text-on-primary/80 hover:text-on-primary transition-colors duration-fast ease-soft cursor-pointer rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export default function Footer() {
  return (
    <footer className="bg-primary-deep text-on-primary pb-24 md:pb-0">
      <div className="mx-auto max-w-site px-5 md:px-8 lg:px-10 py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="font-display text-lg font-semibold mb-4">Bodegaje</h2>
            <ul className="space-y-2.5">
              {footerCols.bodegaje.map((l) => (
                <li key={l.href}><Link href={l.href} className={linkCls}>{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold mb-4">Sedes</h2>
            <ul className="space-y-3">
              {allAddresses.map((a) => (
                <li key={a.label} className="text-[14px]">
                  <span className="block font-medium text-on-primary">{a.label}</span>
                  <address className="not-italic text-on-primary/75">{a.address}</address>
                </li>
              ))}
              <li className="pt-1">
                <Link href="/sedes/" className={`${linkCls} font-medium text-accent hover:text-accent-soft`}>Ver las 7 sedes →</Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold mb-4">Mudanzas</h2>
            <ul className="space-y-2.5">
              {footerCols.mudanzas.map((l) => (
                <li key={l.href}><Link href={l.href} className={linkCls}>{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold mb-4">Empresa · Legales · PQRS</h2>
            <ul className="space-y-2.5">
              {footerCols.empresa.map((l) => (
                <li key={l.href}><Link href={l.href} className={linkCls}>{l.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 rounded-xl bg-on-primary/[0.06] ring-1 ring-on-primary/10 p-1.5">
          <div className="rounded-xl-inner bg-on-primary/[0.04] p-6 md:p-8 grid gap-6 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
            <div>
              <p className="font-display text-xl font-semibold">{company.legalName}</p>
              <p className="mt-1 text-[14px] text-on-primary/75">Minibodegas, bodegaje y mudanzas en Bogotá desde {company.founded}.</p>
              <p className="mt-3 text-[14px] text-on-primary/75 flex items-start gap-2">
                <MapPin size={18} weight="light" aria-hidden="true" className="mt-0.5 shrink-0" />
                <span>Sede principal: {sedes[0].address}</span>
              </p>
            </div>
            <div className="text-[14px]">
              <p className="text-on-primary/60 mb-1 flex items-center gap-2"><Phone size={18} weight="light" aria-hidden="true" />Teléfono</p>
              <a href={`tel:${company.phone.replace(/\s/g, "")}`} className={`${linkCls} tnum font-medium text-on-primary`}>{company.phoneLabel}</a>
            </div>
            <div className="text-[14px]">
              <p className="text-on-primary/60 mb-1 flex items-center gap-2"><ChatText size={18} weight="light" aria-hidden="true" />WhatsApp</p>
              <p className="tnum font-medium">{company.whatsappLabel}</p>
              <Link href={QUOTE_URL} className={`${linkCls} text-accent hover:text-accent-soft`}>Escríbenos desde el formulario →</Link>
            </div>
            <div className="text-[14px]">
              <p className="text-on-primary/60 mb-1 flex items-center gap-2"><Clock size={18} weight="light" aria-hidden="true" />Horario</p>
              <p className="tnum font-medium">{company.hours}</p>
            </div>
          </div>
        </div>

        <p className="mt-8 text-[13px] text-on-primary/55">
          © {new Date().getFullYear()} {company.legalName} · Bogotá, Colombia
        </p>
      </div>
    </footer>
  );
}
