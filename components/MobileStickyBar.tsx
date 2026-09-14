import Link from "next/link";
import { CtaIcon, btnClass } from "@/components/Button";
import { QUOTE_URL, company } from "@/content/site";

/** Fixed bottom bar <768px. Cotizar → qualifying form (never a chat deep link). Llamar → tel:. */
export default function MobileStickyBar() {
  return (
    <nav
      aria-label="Acciones rápidas"
      className="fixed inset-x-0 bottom-0 z-30 md:hidden border-t border-line bg-surface pb-[env(safe-area-inset-bottom)]"
    >
      <div className="grid grid-cols-2 gap-2 p-2">
        <Link href={QUOTE_URL} className={btnClass("primary", "md")}>
          <CtaIcon intent="cotizar" />
          Cotizar
        </Link>
        <a href={`tel:${company.phone.replace(/\s/g, "")}`} className={btnClass("secondary", "md")}>
          <CtaIcon intent="llamar" />
          Llamar
        </a>
      </div>
    </nav>
  );
}
