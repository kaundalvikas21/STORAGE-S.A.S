import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import SchemaScript from "@/components/SchemaScript";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import { CALC_URL, QUOTE_URL, SITE_URL, allAddresses, company, nav, social } from "@/content/site";
import { ogBase } from "@/lib/schema";

const display = Bricolage_Grotesque({ subsets: ["latin"], display: "swap", variable: "--font-display" });
const body = Inter({ subsets: ["latin"], display: "swap", variable: "--font-body" });

// Defaults only. Canonical + OpenGraph title live on each page (lib/schema.ts pageMeta), otherwise
// every inner page would canonicalize to "/".
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Storage S.A.S | Minibodegas y bodegaje en Bogotá",
  description:
    "7 sedes en Bogotá con más de 1000 minibodegas. Espacios desde 2 m³ para hogar y empresa, sin permanencia mínima. Calcula tu espacio y cotiza en línea.",
  openGraph: ogBase,
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: company.legalName,
    alternateName: company.brand,
    url: SITE_URL,
    logo: `${SITE_URL}/site-logo-storage-sas.png`,
    sameAs: social.profiles.map((p) => p.href),
    foundingDate: String(company.founded),
    telephone: company.phone,
    email: company.email,
    address: allAddresses.map((a) => ({
      "@type": "PostalAddress",
      name: a.label,
      streetAddress: a.address,
      addressLocality: "Bogotá",
      addressCountry: "CO",
    })),
    numberOfEmployees: { "@type": "QuantitativeValue", value: 22 },
    areaServed: { "@type": "City", name: "Bogotá" },
    openingHoursSpecification: company.openingHoursSpec.map((s) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: s.days,
      opens: s.opens,
      closes: s.closes,
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: company.brand,
    inLanguage: "es-CO",
    publisher: { "@id": `${SITE_URL}/#organization` },
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [...nav, { label: "Calcular mi espacio", href: CALC_URL }, { label: "Cotizar", href: QUOTE_URL }].map((n, i) => ({
      "@type": "SiteNavigationElement",
      position: i + 1,
      name: n.label,
      url: `${SITE_URL}${n.href}`,
    })),
  },
];

/** Root shell: fonts, skip link, site-wide JSON-LD and the WhatsApp bubble (every route, client
 *  checklist §5). Chrome lives in the route-group layouts (spec R8): app/(site) = full
 *  header/footer, app/(conversion) = simplified checkout chrome.
 *  Every page's <main> carries id="main" for the skip link and BackToTop focus. */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // data-scroll-behavior: Next 16 only turns off the CSS `scroll-behavior: smooth` during route changes
    // when asked. Without it the scroll-to-top animates and gets cut short, so pages open part-way down.
    <html lang="es-CO" data-scroll-behavior="smooth" className={`${display.variable} ${body.variable}`}>
      <body className="font-body">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-surface focus:px-4 focus:py-3 focus:text-[15px] focus:font-medium focus:text-ink focus:shadow-3 focus:outline-none focus:ring-2 focus:ring-ring"
        >
          Saltar al contenido
        </a>
        <SchemaScript data={jsonLd} />
        {children}
        <WhatsAppWidget />
      </body>
    </html>
  );
}
