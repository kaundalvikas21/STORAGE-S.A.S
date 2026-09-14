"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { X } from "@phosphor-icons/react/dist/ssr";
import { waLink, whatsappWidget } from "@/content/site";

const SEEN = "storage:wa-greeting";
const focus = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

/**
 * Floating WhatsApp click-to-chat (client checklist §5): a round bubble bottom-right on every
 * page, plus a dismissible greeting card that slides in shortly after load. Opens wa.me with the
 * prefilled message; no bot, no further integration. Sits above the mobile sticky bar (z-30,
 * bottom offset clears it below md) and under the header (z-40) and any open <dialog>.
 * Greeting shows once per session (sessionStorage); the entrance reuses the CSS `.hero-fade`
 * keyframe, so it is instant under reduced motion. The bubble is WhatsApp green (`--whatsapp`),
 * the one non-palette colour on the page, so visitors recognise the channel at a glance.
 */
export default function WhatsAppWidget() {
  const [greeting, setGreeting] = useState(false);
  const href = waLink(whatsappWidget.message);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SEEN)) return;
    } catch {
      /* storage blocked: greeting simply shows again next load */
    }
    const t = window.setTimeout(() => setGreeting(true), whatsappWidget.greetingDelayMs);
    return () => window.clearTimeout(t);
  }, []);

  const dismiss = () => {
    setGreeting(false);
    try {
      sessionStorage.setItem(SEEN, "1");
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="fixed bottom-[calc(env(safe-area-inset-bottom)+5rem)] right-4 z-30 flex items-end gap-3 md:bottom-6 md:right-6">
      {greeting && (
        <div role="status" className="hero-fade flex max-w-[min(70vw,22rem)] items-center gap-1 rounded-lg border border-line bg-surface pl-4 pr-1 shadow-2">
          <a href={href} target="_blank" rel="noopener noreferrer" onClick={dismiss} className={`py-3 text-[14px] font-medium leading-snug text-ink ${focus} rounded-sm`}>
            {whatsappWidget.greeting}
          </a>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Cerrar"
            className={`flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted transition-colors duration-fast ease-soft hover:text-ink ${focus}`}
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>
      )}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={dismiss}
        aria-label="Chatear por WhatsApp (se abre en una pestaña nueva)"
        className={`flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center rounded-full bg-whatsapp text-surface shadow-3 transition-[transform,box-shadow,background-color] duration ease-soft hover:-translate-y-0.5 hover:bg-whatsapp-deep hover:shadow-2 active:scale-[0.98] ${focus}`}
      >
        {/* Official WhatsApp mark (Simple Icons, brand glyph), not a Phosphor approximation. */}
        <Image src="/img/whatsapp-logo.svg" alt="" width={30} height={30} aria-hidden="true" />
      </a>
    </div>
  );
}
