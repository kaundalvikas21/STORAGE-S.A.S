import { ChatText, Clock, EnvelopeSimple, Phone } from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";
import { company, contactoPage as t } from "@/content/site";

const value = "tnum text-[17px] font-semibold text-ink";
const link = `${value} inline-flex min-h-[44px] cursor-pointer items-center break-all rounded-sm transition-colors duration-fast ease-soft hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`;

/** Beside the /contacto/ form: the page's one dark cell with the other NAP channels from facts.ts
 *  (phone, email, WhatsApp number, hours). The WhatsApp number is text, not a wa.me link (R4): the
 *  form beside it is the way in. Sticky below the site header at lg. */
export default function ContactRail() {
  const rows: { Icon: typeof Phone; label: string; body: ReactNode }[] = [
    { Icon: Phone, label: t.phone, body: <a href={`tel:${company.phone.replace(/\s/g, "")}`} className={link}>{company.phoneLabel}</a> },
    { Icon: EnvelopeSimple, label: t.email, body: <a href={`mailto:${company.email}`} className={link}>{company.email}</a> },
    {
      Icon: ChatText,
      label: t.whatsapp,
      body: (
        <>
          <span className={`${value} block`}>{company.whatsappLabel}</span>
          <span className="mt-0.5 block text-[14px] text-muted">{t.whatsappNote}</span>
        </>
      ),
    },
    { Icon: Clock, label: t.hours, body: <span className="tnum block text-[15px] font-medium text-ink">{company.hours}</span> },
  ];
  return (
    <aside aria-labelledby="rail-title" className="dark-cell rounded-lg p-6 shadow-3 md:p-8 lg:sticky lg:top-28">
      <h2 id="rail-title" className="font-display text-2xl font-semibold text-ink">{t.railTitle}</h2>
      <ul role="list" className="mt-6 grid gap-5">
        {rows.map(({ Icon, label, body }) => (
          <li key={label} className="flex items-start gap-4">
            <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-brand text-on-brand">
              <Icon size={22} />
            </span>
            <div className="min-w-0">
              <p className="text-[13px] text-muted">{label}</p>
              {body}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
