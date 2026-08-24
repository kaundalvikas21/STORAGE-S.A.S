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

const base =
  "group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md font-medium cursor-pointer select-none transition-colors duration-fast ease-soft active:scale-[0.98] " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const variants = {
  primary: "bg-primary text-on-primary shadow-1 hover:bg-primary-deep",
  secondary: "border border-line bg-surface text-ink shadow-1 hover:border-muted-2",
  ghost: "text-ink hover:bg-surface",
};

const sizes = { md: "px-5 py-2.5 text-[14px]", lg: "px-6 py-3 text-[15px]" };

export default function Button({ href, children, variant = "primary", size = "lg", icon = true, className = "" }: Props) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}>
      <span>{children}</span>
      {icon && (
        <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-fast ease-soft group-hover:translate-x-1" />
      )}
    </Link>
  );
}
