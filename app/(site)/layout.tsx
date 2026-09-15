import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/MobileStickyBar";
import Popups from "@/components/Popups";

/** Full site chrome (spec R8), mounted once for every marketing route: header with mega-menu,
 *  4-column footer + NAP band, mobile sticky bar and the engagement pop-ups. The WhatsApp bubble
 *  (with back-to-top) is site-wide in app/layout.tsx. Pages in this group never re-import any of it. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <MobileStickyBar />
      <Popups />
    </>
  );
}
