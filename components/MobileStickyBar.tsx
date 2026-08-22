import Link from "next/link";
import { Phone, ChatText } from "@phosphor-icons/react/dist/ssr";
import { QUOTE_URL, company } from "@/content/site";

/** Fixed bottom bar <768px. Cotizar → qualifying form (never a chat deep link). Llamar → tel:. */
export default function MobileStickyBar() {
  return (
    <nav
      aria-label="Acciones rápidas"
      className="fixed inset-x-0 bottom-0 z-30 md:hidden border-t border-line bg-surface/95 backdrop-blur-sm pb-[env(safe-area-inset-bottom)]"
    >
      <div className="grid grid-cols-2 gap-2 p-2">
        <Link
          href={QUOTE_URL}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-4 py-3 text-[15px] font-semibold text-on-accent cursor-pointer transition-[transform,box-shadow] duration-DEFAULT ease-soft active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <ChatText size={20} weight="light" aria-hidden="true" />
          Cotizar
        </Link>
        <a
          href={`tel:${company.phone.replace(/\s/g, "")}`}
          className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-[15px] font-semibold text-primary ring-[1.5px] ring-inset ring-primary cursor-pointer transition-[transform,background-color] duration-DEFAULT ease-soft active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Phone size={20} weight="light" aria-hidden="true" />
          Llamar
        </a>
      </div>
    </nav>
  );
}
