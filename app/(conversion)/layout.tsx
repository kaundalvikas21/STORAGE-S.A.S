import ConversionHeader from "@/components/ConversionHeader";
import NapBand from "@/components/NapBand";
import MobileStickyBar from "@/components/MobileStickyBar";

/** Simplified checkout chrome for /cotizar/ and /calculadora-de-espacio/ (spec T7, R8): logo +
 *  phone header, NAP-band-only footer, no pop-ups. The sticky bar stays (R7) with Llamar only,
 *  since a Cotizar button here would point at the page itself or compete with the tool's CTA. */
export default function ConversionLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ConversionHeader />
      {children}
      <footer className="border-t border-line bg-surface pb-24 md:pb-0">
        <div className="mx-auto max-w-site px-5 py-10 md:px-8 lg:px-10">
          <NapBand />
        </div>
      </footer>
      <MobileStickyBar quote={false} />
    </>
  );
}
