"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { X } from "@phosphor-icons/react/dist/ssr";
import BackToTop from "@/components/BackToTop";
import { company } from "@/content/facts";
import { whatsappWidget } from "@/content/engagement";
import { waChatUrl } from "@/lib/lead";

const SEEN = "storage:wa-greeting";
const focus = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
const external = { target: "_blank", rel: "noopener noreferrer" } as const;

/**
 * Floating WhatsApp click-to-chat on every route (client checklist §5), mounted once in
 * app/layout.tsx. Same behaviour as the current site's widget: the bubble opens a WhatsApp chat
 * with the business number (`company.whatsapp`) and a prefilled message. The declared exception
 * to spec R4 (MASTER.md §8.18): every other CTA still goes to /cotizar/ or the calculator.
 * No bot yet; a chatbot integration comes later.
 * The greeting card slides in shortly after each page load until the visitor dismisses it (or
 * opens the chat), remembered for the session (sessionStorage); the entrance reuses the CSS
 * `.hero-fade` keyframe, instant under reduced motion. WhatsApp green (`--whatsapp`) is the one
 * non-palette colour, for channel recognition. Fixed column at z-30: above the mobile sticky bar
 * (bottom offset clears it below md), under the header (z-40) and any open <dialog>.
 */
export default function WhatsAppWidget() {
  const [greeting, setGreeting] = useState(false);
  const href = waChatUrl(company.whatsapp, whatsappWidget.message);

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
    <div className="fixed bottom-[calc(env(safe-area-inset-bottom)+5rem)] right-4 z-30 flex flex-col items-end gap-3 md:bottom-6 md:right-6">
      <BackToTop />
      <div className="flex items-end gap-3">
        {greeting && (
          <div role="status" className="hero-fade flex max-w-[min(70vw,22rem)] items-center gap-1 rounded-lg border border-line bg-surface pl-4 pr-1 shadow-2">
            <a href={href} {...external} onClick={dismiss} className={`py-3 text-[14px] font-medium leading-snug text-ink ${focus} rounded-sm`}>
              {whatsappWidget.greeting}
            </a>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Cerrar saludo"
              className={`flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted transition-colors duration-fast ease-soft hover:text-ink ${focus}`}
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>
        )}
        <a
          href={href}
          {...external}
          onClick={dismiss}
          aria-label={whatsappWidget.label}
          className={`flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center rounded-full bg-whatsapp text-surface shadow-3 transition-[transform,box-shadow,background-color] duration ease-soft hover:-translate-y-0.5 hover:bg-whatsapp-deep hover:shadow-2 active:scale-[0.98] ${focus}`}
        >
          {/* Official WhatsApp mark (Simple Icons, brand glyph), not a Phosphor approximation. */}
          <Image src="/img/whatsapp-logo.svg" alt="" width={30} height={30} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
