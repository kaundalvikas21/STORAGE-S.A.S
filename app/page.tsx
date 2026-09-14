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
import { faq } from "@/content/site";

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

/**
 * DOM order follows wireframe T1 (hero → calculator → silos → sedes → sizes → segments → trust → reviews → logos → faq → cta),
 * plus the client checklist additions: Cómo funciona after the calculator entry, the contact band after
 * the sizes, and the social feed above the footer.
 * Mobile-only visual reorder (zone selector under hero) is done with CSS `order-*` on a flex column so crawl order never changes.
 */
export default function HomePage() {
  return (
    <main className="flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
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
