import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import IntentCards from "@/components/sections/IntentCards";
import ZoneSelector from "@/components/sections/ZoneSelector";
import HowItWorks from "@/components/sections/HowItWorks";
import SiloDoors from "@/components/sections/SiloDoors";
import SedeGrid from "@/components/sections/SedeGrid";
import SizeStrip from "@/components/sections/SizeStrip";
import ContactBand from "@/components/sections/ContactBand";
import SegmentStrip from "@/components/sections/SegmentStrip";
import TrustBar from "@/components/sections/TrustBar";
import Reviews from "@/components/sections/Reviews";
import ClientLogos from "@/components/sections/ClientLogos";
import Faq from "@/components/sections/Faq";
import ClosingBand from "@/components/sections/ClosingBand";
import SocialFeed from "@/components/sections/SocialFeed";
import SchemaScript from "@/components/SchemaScript";
import { faq } from "@/content/site";
import { faqPage, ogBase } from "@/lib/schema";

// Title and description come from the root layout defaults.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    ...ogBase,
    title: "Minibodegas y bodegaje en Bogotá | Storage S.A.S",
    description: "7 sedes · más de 1000 bodegas · desde 2 m³ · sin permanencia mínima.",
  },
};

/**
 * DOM order follows wireframe T1 (hero → calculator → silos → sedes → sizes → segments → trust → reviews → logos → faq → cta),
 * plus the client checklist additions: Cómo funciona after the calculator entry, the contact band after
 * the sizes, and the social feed above the footer.
 * Mobile-only visual reorder (zone selector under hero) is done with CSS `order-*` on a flex column so crawl order never changes.
 */
export default function HomePage() {
  return (
    <main id="main" tabIndex={-1} className="flex flex-col focus:outline-none">
      <SchemaScript data={faqPage(faq)} />
      <div className="order-0"><Hero /></div>
      <IntentCards />
      <HowItWorks />
      <ZoneSelector />
      <SiloDoors />
      <SedeGrid />
      <SizeStrip />
      <ContactBand />
      <SegmentStrip />
      <TrustBar />
      <Reviews />
      <ClientLogos />
      <Faq />
      <ClosingBand />
      <SocialFeed />
    </main>
  );
}
