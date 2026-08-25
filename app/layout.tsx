import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/MobileStickyBar";
import { CALC_URL, QUOTE_URL, SITE_URL, allAddresses, company, nav } from "@/content/site";

const display = Space_Grotesk({ subsets: ["latin"], display: "swap", variable: "--font-display" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "700"], display: "swap", variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Storage S.A.S | Minibodegas y bodegaje en Bogotá",
  description:
    "7 sedes en Bogotá con más de 500 minibodegas. Espacios desde 1 m³ para hogar y empresa, sin permanencia mínima. Calcula tu espacio y cotiza en línea.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: company.brand,
    title: "Minibodegas y bodegaje en Bogotá | Storage S.A.S",
    description: "7 sedes · más de 500 bodegas · desde 1 m³ · sin permanencia mínima.",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: company.legalName,
    alternateName: company.brand,
    url: SITE_URL,
    foundingDate: String(company.founded),
    telephone: company.phone,
    email: company.email,
    // Same constant that renders the visible hours line in the footer NAP block.
    openingHoursSpecification: company.openingHoursSpec.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    address: allAddresses.map((a) => ({
      "@type": "PostalAddress",
      name: a.label,
      streetAddress: a.address,
      addressLocality: "Bogotá",
      addressCountry: "CO",
    })),
    numberOfEmployees: { "@type": "QuantitativeValue", value: 22 },
    areaServed: { "@type": "City", name: "Bogotá" },
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CO" className={`${display.variable} ${mono.variable}`}>
      <head>
        {/* Scroll reveals are framer-motion driven, so their hidden state is serialised into the
            SSR markup. With JS disabled nothing would ever run the show variant — this restores
            every revealed block so the whole page stays readable. */}
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
      </head>
      <body className="font-body">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {/* Non-sticky anchor at document position 0 for the footer's "Volver arriba".
            The header cannot serve as the target: once stuck it is always in view, so the
            browser considers the anchor reached and barely scrolls. */}
        <span id="top" aria-hidden="true" />
        <Header />
        {children}
        <Footer />
        <MobileStickyBar />
      </body>
    </html>
  );
}
