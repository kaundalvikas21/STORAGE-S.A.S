import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  icon?: boolean;
  className?: string;
};

/* Interaction matrix (MASTER.md §6b). Primary: lift + shadow bloom + brightness; active: scale .98; focus: 2px ring offset 2. */
const base =
  "group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-sm font-medium cursor-pointer select-none " +
  "transition-[transform,box-shadow,background-color,border-color,filter] duration-fast ease-premium active:scale-[0.98] " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

export const buttonVariants = {
  primary: "bg-primary text-on-primary hover:bg-primary-deep hover:-translate-y-[var(--hover-lift)] hover:shadow-3 hover:brightness-105",
  secondary: "border border-line bg-bg text-ink hover:border-muted-2 hover:bg-surface",
  ghost: "text-ink hover:bg-surface",
};

const sizes = { md: "px-5 py-2.5 text-[14px]", lg: "px-6 py-3 text-[15px]" };

export const buttonClass = (variant: keyof typeof buttonVariants = "primary", size: keyof typeof sizes = "lg") =>
  `${base} ${buttonVariants[variant]} ${sizes[size]}`;

export default function Button({ href, children, variant = "primary", size = "lg", icon = true, className = "" }: Props) {
  return (
    <Link href={href} className={`${buttonClass(variant, size)} ${className}`}>
      <span>{children}</span>
      {icon && <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-fast ease-premium group-hover:translate-x-1" />}
    </Link>
  );
}
