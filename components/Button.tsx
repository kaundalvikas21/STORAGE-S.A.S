import Link from "next/link";
import { Calculator, EnvelopeSimple, MapPin, Phone, Receipt, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";

/** One intent, one icon, everywhere (MASTER.md §7). Mirrors the icons the same intents already use
 *  on the page: Calculas step (Calculator), Cotizas step (Receipt), utility bar sedes (MapPin). */
export const ctaIcons = {
  calcular: Calculator,
  cotizar: Receipt,
  sedes: MapPin,
  llamar: Phone,
  whatsapp: WhatsappLogo,
  suscribir: EnvelopeSimple,
} as const;
export type CtaIntent = keyof typeof ctaIcons;

/** Leading semantic icon for any CTA (Button or a `btnClass` link): lifts slightly on hover.
 *  `className` adds responsive visibility where a row is tight (the header at lg). */
export function CtaIcon({ intent, className = "" }: { intent: CtaIntent; className?: string }) {
  const Icon = ctaIcons[intent];
  return <Icon size={18} weight="regular" aria-hidden="true" className={`shrink-0 transition-transform duration-fast ease-soft group-hover:-translate-y-0.5 ${className}`} />;
}

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  /** Leading icon for the button's intent. Buttons never carry a trailing arrow (text links do). */
  intent?: CtaIntent;
  className?: string;
};

const base =
  "group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md font-medium cursor-pointer select-none transition-all duration-fast ease-soft active:scale-[0.98] " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const variants = {
  // Logo palette: yellow fill + near-black label (10-14:1); the deeper-yellow border gives the
  // shape an edge on white. Secondary is the near-black outline, inverting on hover.
  primary: "border border-brand-deep bg-brand text-on-brand shadow-1 hover:bg-brand-deep hover:shadow-2 hover:-translate-y-0.5",
  secondary: "border border-ink bg-surface text-ink shadow-1 hover:bg-ink hover:text-surface",
  ghost: "border border-transparent text-ink hover:bg-bg hover:border-line",
};

const sizes = { md: "px-5 py-2.5 text-[14px]", lg: "px-6 py-3 text-[15px]" };

// Single source for CTA styling: Header/MobileStickyBar consume this instead of re-typing the classes.
export const btnClass = (variant: keyof typeof variants, size: keyof typeof sizes = "lg") =>
  `${base} ${variants[variant]} ${sizes[size]}`;

export default function Button({ href, children, variant = "primary", size = "lg", intent, className = "" }: Props) {
  return (
    <Link href={href} className={`${btnClass(variant, size)} ${className}`}>
      {intent && <CtaIcon intent={intent} />}
      <span>{children}</span>
    </Link>
  );
}
