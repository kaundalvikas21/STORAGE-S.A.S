import Link from "next/link";
import Reveal, { RevealItem } from "@/components/Reveal";
import NapBand from "@/components/NapBand";
import { SEDES_URL, allAddresses, footerCols } from "@/content/site";

const linkCls =
  "link-draw text-[13px] text-muted hover:text-ink transition-colors duration-fast ease-soft cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const colTitle = "text-[14px] font-semibold text-ink border-b border-line pb-2 mb-4";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface text-ink pb-24 md:pb-0">
      <div className="mx-auto max-w-site px-5 md:px-8 lg:px-10 py-14 md:py-20">
        <Reveal group className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <RevealItem>
            <h2 className={colTitle}>Bodegaje</h2>
            <ul className="space-y-2.5">
              {footerCols.bodegaje.map((l) => (
                <li key={l.href}><Link href={l.href} className={linkCls}>{l.label}</Link></li>
              ))}
            </ul>
          </RevealItem>

          <RevealItem>
            <h2 className={colTitle}>Sedes</h2>
            <ul className="space-y-3">
              {allAddresses.map((a) => (
                <li key={a.label} className="text-[13px]">
                  <Link href={a.href} className="link-draw font-medium text-ink hover:text-primary-deep transition-colors duration-fast ease-soft cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{a.label}</Link>
                  <address className="not-italic text-[13px] leading-relaxed text-muted">{a.address}</address>
                </li>
              ))}
              <li className="pt-1">
                <Link href={SEDES_URL} className="link-draw text-[13px] font-medium text-primary hover:text-primary-deep transition-colors duration-fast ease-soft cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Ver las 7 sedes →</Link>
              </li>
            </ul>
          </RevealItem>

          <RevealItem>
            <h2 className={colTitle}>Soluciones</h2>
            <ul className="space-y-2.5">
              {footerCols.soluciones.map((l) => (
                <li key={l.href}><Link href={l.href} className={linkCls}>{l.label}</Link></li>
              ))}
            </ul>
          </RevealItem>

          <RevealItem>
            <h2 className={colTitle}>Empresa</h2>
            <ul className="space-y-2.5">
              {footerCols.empresa.map((l) => (
                <li key={l.href}><Link href={l.href} className={linkCls}>{l.label}</Link></li>
              ))}
            </ul>
          </RevealItem>
        </Reveal>

        {/* NAP band: the wireframe's "hot" block, shared with the conversion footer. */}
        <NapBand className="mt-14" />
      </div>
    </footer>
  );
}
