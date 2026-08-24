import { CALC_URL, QUOTE_URL, SITE_URL, allAddresses, company, nav } from "@/content/site";

/**
 * Structured data for the business. Every field reads from content/site.ts — the same
 * constants the footer NAP block renders — so the visible NAP and the schema cannot drift.
 * PENDIENTE: phone, WhatsApp and six of the seven addresses are placeholders. They MUST match
 * the Google Business Profiles character for character before launch (spec Open Item 7).
 */
const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: company.legalName,
  alternateName: company.brand,
  url: SITE_URL,
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
  openingHoursSpecification: company.openingHoursSpec.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.days,
    opens: h.opens,
    closes: h.closes,
  })),
  numberOfEmployees: { "@type": "QuantitativeValue", value: 22 },
  areaServed: { "@type": "City", name: "Bogotá" },
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: company.brand,
  inLanguage: "es-CO",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

const navLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: [...nav, { label: "Calcular mi espacio", href: CALC_URL }, { label: "Cotizar", href: QUOTE_URL }].map((n, i) => ({
    "@type": "SiteNavigationElement",
    position: i + 1,
    name: n.label,
    url: `${SITE_URL}${n.href}`,
  })),
};

export const siteJsonLd = [organizationLd, websiteLd, navLd];
