import Link from "next/link";
import { ArrowUp, ChatText, Clock, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import FooterNav from "@/components/footer/FooterNav";
import SedeIndex from "@/components/footer/SedeIndex";
import { QUOTE_URL, company, footerCols, sedes } from "@/content/site";

const linkCls =
  "link-draw text-[13px] text-bg/75 hover:text-bg active:opacity-70 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

/**
 * NAP labels sit in orange ON INK (5.14:1). They must never move onto an orange surface and
 * must never carry an alpha: ink-on-orange starts at 5.14:1, so ink/90 drops to 4.68 and
 * ink/80 to 4.12 — below AA. See design-system/MASTER.md §10.
 */
const napLabel = "mb-1.5 flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.1em] text-primary";

const list = (items: { label: string; href: string }[]) => (
  <ul className="space-y-2.5" role="list">
    {items.map((l) => (
      <li key={l.href}>
        <Link href={l.href} className={linkCls}>{l.label}</Link>
      </li>
    ))}
  </ul>
);

export default function Footer() {
  const columns = [
    { title: "Bodegaje", body: list(footerCols.bodegaje) },
    { title: "Mudanzas", body: list(footerCols.mudanzas) },
    { title: "Empresa · Legales · PQRS", body: list(footerCols.empresa) },
    { title: "Sedes en Bogotá", body: <SedeIndex />, full: true },
  ];

  return (
    <footer className="border-t border-bg/25 bg-ink text-bg pb-24 md:pb-0">
      <div className="mx-auto max-w-site px-5 md:px-8 lg:px-10 py-12 md:py-16">
        <div className="mb-10 flex items-center justify-between gap-4 border-b border-bg/15 pb-6">
          <p className="font-display text-lg font-bold uppercase tracking-[-0.01em]">
            Storage <span className="text-primary">S.A.S</span>
          </p>
          {/* Plain anchor: no JS, and html{scroll-behavior} already flips to auto under reduced motion. */}
          <a
            href="#top"
            className="inline-flex min-h-[44px] items-center gap-2 border border-bg/40 px-4 font-mono text-[12px] uppercase tracking-[0.08em] text-bg hover:bg-bg hover:text-ink active:opacity-80 transition-colors duration-fast ease-soft cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            Volver arriba <ArrowUp size={14} weight="bold" aria-hidden="true" />
          </a>
        </div>

        <FooterNav columns={columns} />

        {/*
          NAP plate. Orange survives as the keyline and as label text on ink, never as a fill —
          a full orange slab is both visually intense and impossible to set small text on.
          Every value reads from `company` in content/site.ts, the same object that renders the
          Organization JSON-LD in app/layout.tsx, so the visible NAP and the schema cannot drift.
          LAUNCH BLOCKER (spec Open Item 7): phone and WhatsApp below are placeholders. They MUST
          match the Google Business Profiles character for character before launch; a single
          confirmed number is still pending. Swap them in content/site.ts only.
        */}
        <div className="mt-12 border-[1.5px] border-bg/25">
          <div className="h-2 bg-primary" aria-hidden="true" />
          <div className="p-6 md:p-8 grid gap-7 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
            <div>
              <p className="font-display text-lg font-bold uppercase leading-tight">{company.legalName}</p>
              <p className="mt-2 text-[13px] text-bg/75">Minibodegas, bodegaje y mudanzas en Bogotá desde {company.founded}.</p>
              <p className="mt-3 flex items-start gap-2 text-bg/75">
                <MapPin size={16} weight="regular" aria-hidden="true" className="mt-0.5 shrink-0 text-primary" />
                <span className="font-mono text-[12px] leading-relaxed">Sede principal: {sedes[0].address}</span>
              </p>
            </div>
            <div>
              <p className={napLabel}><Phone size={15} weight="regular" aria-hidden="true" />Teléfono</p>
              <a href={`tel:${company.phone.replace(/\s/g, "")}`} className={`${linkCls} font-mono text-[14px] font-medium tnum text-bg`}>
                {company.phoneLabel}
              </a>
            </div>
            <div>
              <p className={napLabel}><ChatText size={15} weight="regular" aria-hidden="true" />WhatsApp</p>
              <p className="font-mono text-[14px] font-medium tnum">{company.whatsappLabel}</p>
              <Link href={QUOTE_URL} className={`${linkCls} mt-1 inline-block`}>Escríbenos desde el formulario</Link>
            </div>
            <div>
              <p className={napLabel}><Clock size={15} weight="regular" aria-hidden="true" />Horario</p>
              <p className="font-mono text-[13px] font-medium leading-relaxed tnum">{company.hours}</p>
            </div>
          </div>
        </div>

        <p className="mt-8 font-mono text-[12px] text-bg/55 tnum">
          © {new Date().getFullYear()} {company.legalName} · Bogotá, Colombia
        </p>
      </div>
    </footer>
  );
}
