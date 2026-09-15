import Image from "next/image";
import Link from "next/link";
import { Phone } from "@phosphor-icons/react/dist/ssr";
import { company } from "@/content/site";

const focus = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

/** Checkout-style chrome for the conversion pages (spec T7): logo + phone, no nav, no mega-menu,
 *  so the page keeps one job. Same logo file and sizing as `Header`. */
export default function ConversionHeader() {
  return (
    <header className="border-b border-line bg-surface">
      <div className="mx-auto flex max-w-site items-center justify-between gap-4 px-5 py-3 md:px-8 lg:px-10">
        <Link href="/" aria-label={`${company.brand}, inicio`} className={`flex shrink-0 cursor-pointer items-center rounded-sm ${focus}`}>
          <Image src="/site-logo-storage-sas.png" alt="" width={189} height={94} priority className="h-12 w-auto md:h-14" />
        </Link>
        <a
          href={`tel:${company.phone.replace(/\s/g, "")}`}
          className={`tnum inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-sm text-[15px] font-medium text-ink transition-colors duration-fast ease-soft hover:text-primary-deep ${focus}`}
        >
          <Phone size={18} weight="regular" aria-hidden="true" />
          <span className="sr-only sm:not-sr-only">Llámanos al</span>
          {company.phoneLabel}
        </a>
      </div>
    </header>
  );
}
