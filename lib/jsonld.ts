import { allAddresses, company } from "@/lib/company";
import { CALC_URL, QUOTE_URL, SITE_URL, faq, nav } from "@/content/site";

/** Organization + WebSite + SiteNavigation. NAP fields come from lib/company.ts, same as the visible footer. */
export const siteLd = [
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
    numberOfEmployees: { "@type": "QuantitativeValue", value: company.employees },
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
    itemListElement: [...nav, { label: "Calcular espacio", href: CALC_URL }, { label: "Cotizar", href: QUOTE_URL }].map((n, i) => ({
      "@type": "SiteNavigationElement",
      position: i + 1,
      name: n.label,
      url: `${SITE_URL}${n.href}`,
    })),
  },
];

export const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};
