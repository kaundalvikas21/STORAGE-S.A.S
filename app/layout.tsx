import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileStickyBar from "@/components/MobileStickyBar";
import { SITE_URL } from "@/content/site";
import { company } from "@/lib/company";
import { siteLd } from "@/lib/jsonld";

const display = Instrument_Sans({ subsets: ["latin"], display: "swap", variable: "--font-display" });

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
    <html lang="es-CO" className={display.variable}>
      <body className="font-body">
        {/* Motion primitives SSR their hidden state; with JS off this rule makes every block visible. */}
        <noscript>
          <style>{`[data-motion]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLd) }} />
        <Header />
        {children}
        <Footer />
        <MobileStickyBar />
      </body>
    </html>
  );
}
