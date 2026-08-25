import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import ZoneSelector from "@/components/sections/ZoneSelector";
import SiloDoors from "@/components/sections/SiloDoors";
import SedeGrid from "@/components/sections/SedeGrid";
import SizeStrip from "@/components/sections/SizeStrip";
import SegmentStrip from "@/components/sections/SegmentStrip";
import TrustBar from "@/components/sections/TrustBar";
import Reviews from "@/components/sections/Reviews";
import ClientLogos from "@/components/sections/ClientLogos";
import Faq from "@/components/sections/Faq";
import ClosingBand from "@/components/sections/ClosingBand";
import { faqLd } from "@/lib/jsonld";

/**
 * DOM order follows wireframe T1 (hero → calculator → silos → sedes → sizes → segments → trust → reviews → logos → faq → cta).
 * Mobile-only visual reorder (zone selector under hero) is done with CSS `order-*` on a flex column so crawl order never changes.
 */
export default function HomePage() {
  return (
    <main className="flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <div className="order-0">
        <Hero />
      </div>
      <HowItWorks />
      <ZoneSelector />
      <SiloDoors />
      <SedeGrid />
      <SizeStrip />
      <SegmentStrip />
      <TrustBar />
      <Reviews />
      <ClientLogos />
      <Faq />
      <ClosingBand />
    </main>
  );
}
