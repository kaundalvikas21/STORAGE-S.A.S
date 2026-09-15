import Link from "next/link";
import { CtaIcon, btnClass } from "@/components/Button";
import { QUOTE_URL, company } from "@/content/site";

/** Fixed bottom bar <768px on every route (spec R7). Cotizar → qualifying form (never a chat deep
 *  link). Llamar → tel:. `quote={false}` on the conversion pages, where Cotizar would point at the
 *  page itself or compete with the calculator's own CTA. */
export default function MobileStickyBar({ quote = true }: { quote?: boolean }) {
  return (
    <nav
      aria-label="Acciones rápidas"
      className="fixed inset-x-0 bottom-0 z-30 md:hidden border-t border-line bg-surface pb-[env(safe-area-inset-bottom)]"
    >
      <div className={`grid gap-2 p-2 ${quote ? "grid-cols-2" : "grid-cols-1"}`}>
        {quote && (
          <Link href={QUOTE_URL} className={btnClass("primary", "md")}>
            <CtaIcon intent="cotizar" />
            Cotizar
          </Link>
        )}
        <a href={`tel:${company.phone.replace(/\s/g, "")}`} className={btnClass("secondary", "md")}>
          <CtaIcon intent="llamar" />
          Llamar
        </a>
      </div>
    </nav>
  );
}
