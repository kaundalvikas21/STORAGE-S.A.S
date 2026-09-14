import type { Config } from "tailwindcss";

// Every color/radius/shadow maps to a CSS variable from app/globals.css (mirror of design-system/MASTER.md).
// Tokens are alpha-capable (`bg-primary/85`) via color-mix, since Tailwind cannot apply opacity to a bare var().
const token =
  (v: string) =>
  ({ opacityValue }: { opacityValue?: string }) =>
    opacityValue === undefined || opacityValue === "1"
      ? `var(${v})`
      : `color-mix(in srgb, var(${v}) calc(${opacityValue} * 100%), transparent)`;
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: Object.fromEntries(
        ["bg", "bg-deep", "surface", "ink", "ink-2", "muted", "muted-2", "line", "brand", "brand-deep", "on-brand", "primary", "primary-deep", "primary-soft", "on-primary", "accent", "accent-deep", "accent-soft", "on-accent", "ring", "whatsapp", "whatsapp-deep"].map((n) => [n, token(`--${n}`)]),
      ) as unknown as Record<string, string>,
      borderRadius: {
        sm: "var(--r-sm)",
        md: "var(--r-md)",
        lg: "var(--r-lg)",
        xl: "var(--r-xl)",
        "xl-inner": "var(--r-md)",
        "lg-inner": "var(--r-md)",
      },
      boxShadow: {
        1: "var(--sh-1)",
        2: "var(--sh-2)",
        3: "var(--sh-3)",
        brass: "var(--sh-brass)",
        inset: "inset 0 1px 0 rgba(255,255,255,0.6)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        display: ["var(--t-display)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "3xl": ["var(--t-3xl)", { lineHeight: "1.1" }],
        "2xl": ["var(--t-2xl)", { lineHeight: "1.15" }],
      },
      transitionTimingFunction: {
        soft: "var(--ease)",
      },
      transitionDuration: {
        fast: "var(--d-fast)",
        DEFAULT: "var(--d)",
        slow: "var(--d-slow)",
      },
      maxWidth: {
        site: "1280px",
      },
      scale: {
        zoom: "var(--photo-zoom)",
        card: "var(--hover-scale)",
      },
      translate: {
        lift: "var(--hover-lift)",
      },
    },
  },
  plugins: [],
};
export default config;
