import Link from "next/link";
import { EnvelopeSimple, Phone, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import Reveal, { RevealItem } from "@/components/Reveal";
import { QUOTE_URL, company } from "@/content/site";

const tile =
  "group flex min-h-[72px] cursor-pointer items-center gap-4 rounded-lg border border-line bg-surface px-5 py-4 shadow-1 transition-[transform,box-shadow,border-color] duration ease-soft hover:-translate-y-0.5 hover:border-muted-2 hover:shadow-2 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

/**
 * "¿Tienes alguna duda?" band (client checklist §6, after the size cards), modelled on the
 * current site's contact block. A full-width logo-yellow tint strip, not another card grid, so it
 * reads as a pause between SizeStrip and SegmentStrip. Heading stacked above three full-width
 * channel tiles (WhatsApp, phone, email): a side-by-side grid squeezed the heading once the third
 * tile arrived. The WhatsApp tile goes through /cotizar/ (spec R4): the form hands off to WhatsApp
 * with the visitor's answers, so the channel stays and attribution survives.
 */
export default function ContactBand() {
  const channels = [
    { href: QUOTE_URL, Icon: WhatsappLogo, lead: "Cotiza y sigue por", value: "WhatsApp" },
    { href: `tel:${company.phone.replace(/\s/g, "")}`, Icon: Phone, lead: "Llámanos al", value: company.phoneLabel },
    { href: `mailto:${company.email}`, Icon: EnvelopeSimple, lead: "Escríbenos a", value: company.email },
  ];
  return (
    <section aria-labelledby="duda-title" className="order-6 border-y border-line bg-primary-soft">
      <div className="mx-auto flex max-w-site flex-col gap-8 px-5 py-10 md:px-8 md:py-12 lg:px-10">
        <Reveal>
          <h2 id="duda-title" className="font-display text-2xl font-semibold text-ink">
            ¿Tienes alguna duda?
          </h2>
          <p className="mt-2 max-w-[48ch] text-[15px] text-ink-2">Habla con un asesor en horario de atención: {company.hours}.</p>
        </Reveal>
        <Reveal group as="ul" role="list" className="grid gap-3 sm:grid-cols-3">
          {channels.map(({ href, Icon, lead, value }) => (
            <RevealItem as="li" key={href}>
              <Link href={href} className={tile}>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-brand text-on-brand">
                  <Icon size={22} weight="regular" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[13px] text-muted">{lead}</span>
                  <span className="tnum block break-words text-[17px] font-semibold text-ink transition-colors duration-fast ease-soft group-hover:text-primary-deep">
                    {value}
                  </span>
                </span>
              </Link>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
