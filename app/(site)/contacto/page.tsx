import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import SchemaScript from "@/components/SchemaScript";
import ContactRail from "@/components/contacto/ContactRail";
import QuoteForm from "@/components/conversion/QuoteForm";
import SedeLocation from "@/components/sedes/SedeLocation";
import { sedePhotos } from "@/content/images";
import { contactoPage as t, sedes } from "@/content/site";
import { pageMeta, selfStorage, webPage } from "@/lib/schema";

export const metadata: Metadata = pageMeta({ title: t.metaTitle, description: t.description, path: t.path });

/** /contacto/ (spec T6: conversion + NAP consistency). Blocks: breadcrumb → h1 + direct answer + the
 *  /cotizar/ qualifying form (same component, same /api/lead/ route; `page` in the payload keeps the
 *  attribution) beside the NAP rail → the 7 sedes with map and directions. No closing band: the form is
 *  the CTA. JSON-LD: ContactPage + one SelfStorage (a LocalBusiness) per physical point, same @ids as
 *  the sede pages. `.sede-band` scopes the Leaflet styles and the card-to-pin highlight. */
export default function ContactoPage() {
  return (
    <main id="main" tabIndex={-1} className="sede-band focus:outline-none">
      <SchemaScript data={webPage({ name: t.h1, description: t.description, path: t.path, type: "ContactPage" })} />
      {sedes.map((p) => (
        <SchemaScript key={p.id} data={selfStorage(p, sedePhotos[p.id].src)} />
      ))}
      <Breadcrumb items={[{ name: t.crumb, href: t.path }]} />
      <div className="mx-auto grid max-w-site gap-8 px-5 pb-14 pt-2 md:px-8 md:pb-20 lg:grid-cols-[1.4fr_1fr] lg:items-start lg:gap-10 lg:px-10">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink">{t.h1}</h1>
          <p className="mt-3 max-w-[60ch] text-[16px] leading-relaxed text-ink-2">{t.intro}</p>
          <div className="mt-8 rounded-lg border border-line bg-surface p-5 shadow-1 md:p-8">
            <QuoteForm initial={{ sede: "", tamano: "" }} />
          </div>
        </div>
        <ContactRail />
      </div>
      <SedeLocation points={sedes} title={t.sedesTitle} />
    </main>
  );
}
