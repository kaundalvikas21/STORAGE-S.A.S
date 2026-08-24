import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/MobileStickyBar";
import { SITE_URL, company } from "@/content/site";
import { siteJsonLd } from "@/lib/company";

const display = Fraunces({
  subsets: ["latin"],
  axes: ["opsz"],
  weight: "variable",
  display: "swap",
  variable: "--font-display",
});
const body = Inter({ subsets: ["latin"], display: "swap", variable: "--font-body" });

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


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CO" className={`${display.variable} ${body.variable}`}>
      <head>
        {/* Scroll reveals ship an inline opacity:0 from framer-motion. Without JS nothing would
            ever clear it, so the page must fall back to fully visible. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="font-body">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }} />
        <Header />
        {children}
        <Footer />
        <MobileStickyBar />
      </body>
    </html>
  );
}
