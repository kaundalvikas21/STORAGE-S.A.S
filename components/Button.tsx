import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  /** Pass a Phosphor icon that means what the button does; `false` drops the badge entirely.
   *  Defaults to ArrowUpRight, which only ever means "go to this page". */
  icon?: PhosphorIcon | false;
  className?: string;
};

const base =
  "group inline-flex items-center justify-center gap-3 rounded-full font-semibold cursor-pointer select-none " +
  "transition-[transform,box-shadow,background-color,color,filter] duration-DEFAULT ease-premium " +
  "hover:-translate-y-lift hover:brightness-[1.02] active:translate-y-0 active:scale-press " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const variants = {
  primary: "bg-accent text-on-accent shadow-1 hover:bg-accent-deep hover:shadow-brass",
  secondary: "bg-transparent text-primary ring-[1.5px] ring-inset ring-primary hover:bg-primary-soft hover:ring-primary-deep hover:shadow-1",
  ghost: "bg-transparent text-on-primary ring-[1.5px] ring-inset ring-on-primary/70 hover:bg-on-primary/15 hover:ring-on-primary",
};

const sizes = { md: "px-5 py-2.5 text-[15px]", lg: "pl-6 pr-2 py-2 text-[15px]" };

export default function Button({ href, children, variant = "primary", size = "lg", icon = ArrowUpRight, className = "" }: Props) {
  const iconWrap =
    variant === "primary" ? "bg-ink/10" : variant === "ghost" ? "bg-on-primary/15" : "bg-primary/10";
  const Icon = icon || null;
  // Only the plain arrow slides forward; a meaningful glyph lifts instead, so it does not read as "next".
  const nudge = icon === ArrowUpRight ? "group-hover:translate-x-1 group-hover:-translate-y-px" : "group-hover:-translate-y-0.5";
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${Icon ? sizes[size] : "px-6 py-3 text-[15px]"} ${className}`}>
      <span>{children}</span>
      {Icon && (
        <span
          aria-hidden="true"
          className={`flex h-8 w-8 items-center justify-center rounded-full ${iconWrap} transition-transform duration-DEFAULT ease-premium ${nudge} group-hover:scale-swell`}
        >
          <Icon size={16} weight="bold" />
        </span>
      )}
    </Link>
  );
}
