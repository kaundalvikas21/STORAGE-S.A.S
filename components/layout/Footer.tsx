import Link from "next/link";
import { ChatText, Clock, Phone } from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/motion/Reveal";
import RevealStagger, { RevealItem } from "@/components/motion/RevealStagger";
import { QUOTE_URL, SEDES_URL, footerCols } from "@/content/site";
import { allAddresses, company } from "@/lib/company";

const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-[2px]";
const linkCls = `link-draw text-[13px] text-muted hover:text-ink cursor-pointer ${focusRing}`;
const colTitle = "mb-4 border-b border-line pb-2 text-[14px] font-semibold text-ink";
const napLabel = "mb-1 flex items-center gap-2 text-[12px] font-medium text-muted";

function Col({ id, title, links }: { id: string; title: string; links: { label: string; href: string }[] }) {
  return (
    <nav aria-labelledby={id}>
      <h2 id={id} className={colTitle}>
        {title}
      </h2>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className={linkCls}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/**
 * Wireframe §01 blocks 3-4. A: four link columns; the Sedes column writes all 7 addresses out in full
 * (local-SEO consistency signal, do not abbreviate). B: NAP band, same constants as the Organization JSON-LD.
 */
export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface pb-24 text-ink md:pb-0">
      <div className="mx-auto max-w-site px-5 py-14 md:px-8 md:py-20 lg:px-10">
        <RevealStagger className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <RevealItem>
            <Col id="f-bodegaje" title="Bodegaje" links={footerCols.bodegaje} />
          </RevealItem>
          <RevealItem>
            <h2 id="f-sedes" className={colTitle}>
              Sedes
            </h2>
            <ul className="space-y-3" aria-labelledby="f-sedes">
              {allAddresses.map((a) => (
                <li key={a.label} className="text-[13px]">
                  <span className="block font-medium text-ink">{a.label}</span>
                  <address className="not-italic leading-relaxed text-muted">{a.address}</address>
                </li>
              ))}
              <li className="pt-1">
                <Link href={SEDES_URL} className={`link-draw text-[13px] font-medium text-primary hover:text-primary-deep cursor-pointer ${focusRing}`}>
                  Ver las 7 sedes →
                </Link>
              </li>
            </ul>
          </RevealItem>
          <RevealItem>
            <Col id="f-mudanzas" title="Mudanzas" links={footerCols.mudanzas} />
          </RevealItem>
          <RevealItem>
            <Col id="f-empresa" title="Empresa" links={footerCols.empresa} />
          </RevealItem>
        </RevealStagger>

        {/* NAP band. Values come from lib/company.ts and MUST match the Google Business Profiles before launch. */}
        <Reveal className="mt-14 grid gap-6 rounded-lg border border-primary/20 bg-primary-soft p-6 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:p-8">
          <div>
            <p className="text-lg font-semibold text-ink">{company.legalName}</p>
            <p className="mt-1 text-[13px] text-muted">Minibodegas, bodegaje y mudanzas en Bogotá desde {company.founded}.</p>
          </div>
          <div className="text-[13px]">
            <p className={napLabel}>
              <Phone size={16} weight="regular" aria-hidden="true" />
              Teléfono
            </p>
            <a href={company.phoneHref} className={`tnum link-draw text-[14px] font-medium text-ink hover:text-primary-deep cursor-pointer ${focusRing}`}>
              {company.phone}
            </a>
          </div>
          <div className="text-[13px]">
            <p className={napLabel}>
              <ChatText size={16} weight="regular" aria-hidden="true" />
              WhatsApp
            </p>
            <p className="tnum text-[14px] font-medium text-ink">{company.whatsapp}</p>
            <Link href={QUOTE_URL} className={`link-draw text-[13px] font-medium text-primary hover:text-primary-deep cursor-pointer ${focusRing}`}>
              Escríbenos desde el formulario →
            </Link>
          </div>
          <div className="text-[13px]">
            <p className={napLabel}>
              <Clock size={16} weight="regular" aria-hidden="true" />
              Horario
            </p>
            <p className="tnum text-[14px] font-medium text-ink">{company.hours}</p>
          </div>
        </Reveal>

        <p className="mt-8 text-[13px] text-muted">
          © {new Date().getFullYear()} {company.legalName} · Bogotá, Colombia
        </p>
      </div>
    </footer>
  );
}
