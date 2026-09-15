import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, ChatText, Clock } from "@phosphor-icons/react/dist/ssr";
import { company, sedes, QUOTE_URL } from "@/content/site";

const napLabel = "text-muted mb-1 flex items-center gap-2 text-[12px] font-medium";

/** NAP band + copyright line. Shared by the full `Footer` and the simplified conversion footer
 *  (spec T7), so name, address and phone are rendered from one place. primary-soft, not
 *  accent-soft: the kraft accent is scoped to tags (MASTER.md §1/§7). */
export default function NapBand({ className = "" }: { className?: string }) {
  return (
    <>
      <div className={`rounded-lg border border-primary/20 bg-primary-soft p-6 md:p-8 grid gap-6 md:grid-cols-[1.2fr_1fr_1fr_1fr] ${className}`}>
        <div>
          <Link href="/" aria-label={`${company.brand}, inicio`} className="mb-4 inline-flex cursor-pointer rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <Image src="/site-logo-storage-sas.png" alt="" width={189} height={94} className="h-16 w-auto" />
          </Link>
          <p className="text-lg font-semibold text-ink">{company.legalName}</p>
          <p className="mt-1 text-[13px] text-muted">Minibodegas, bodegaje y mudanzas en Bogotá desde {company.founded}.</p>
          <p className="mt-3 text-[13px] text-muted flex items-start gap-2">
            <MapPin size={18} weight="regular" aria-hidden="true" className="mt-0.5 shrink-0" />
            <span>Sede principal: {sedes[0].address}</span>
          </p>
        </div>
        <div className="text-[13px]">
          <p className={napLabel}><Phone size={16} weight="regular" aria-hidden="true" />Teléfono</p>
          <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="tnum text-[14px] font-medium text-ink hover:text-primary-deep transition-colors duration-fast ease-soft cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{company.phoneLabel}</a>
        </div>
        <div className="text-[13px]">
          <p className={napLabel}><ChatText size={16} weight="regular" aria-hidden="true" />WhatsApp</p>
          <p className="tnum text-[14px] font-medium text-ink">{company.whatsappLabel}</p>
          <Link href={QUOTE_URL} className="link-draw text-[13px] font-medium text-primary hover:text-primary-deep transition-colors duration-fast ease-soft cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Escríbenos desde el formulario →</Link>
        </div>
        <div className="text-[13px]">
          <p className={napLabel}><Clock size={16} weight="regular" aria-hidden="true" />Horario</p>
          <p className="tnum text-[14px] font-medium text-ink">{company.hours}</p>
        </div>
      </div>

      <p className="mt-8 text-[13px] text-muted">
        © {new Date().getFullYear()} {company.legalName} · Bogotá, Colombia
      </p>
    </>
  );
}
