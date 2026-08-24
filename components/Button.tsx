import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
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
  "press group inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-sm border-[1.5px] font-semibold uppercase tracking-[0.04em] cursor-pointer select-none " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const variants = {
  primary: "border-ink bg-primary text-on-primary hover:bg-primary-deep hover:text-bg",
  secondary: "border-ink bg-surface text-ink hover:bg-ink hover:text-bg",
  ghost: "border-bg bg-transparent text-bg hover:bg-bg hover:text-ink",
};

const sizes = { md: "px-5 py-2.5 text-[14px]", lg: "px-7 py-3 text-[15px]" };

export default function Button({ href, children, variant = "primary", size = "lg", icon = true, className = "" }: Props) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}>
      <span>{children}</span>
      {icon && <ArrowUpRight size={16} weight="bold" aria-hidden="true" />}
    </Link>
  );
}
