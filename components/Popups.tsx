"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useMotionValueEvent, useScroll, useVelocity } from "framer-motion";
import { SealPercent, WarningCircle, X } from "@phosphor-icons/react/dist/ssr";
import { CtaIcon, btnClass } from "@/components/Button";
import { exitOffer, newsletter, waLink } from "@/content/site";

type Kind = "newsletter" | "exit";
const DAY = 86_400_000;
const CAP_KEY = "storage:newsletter-until";

// Web storage can throw (private mode, blocked site data): every access goes through these.
const read = (area: "local" | "session", key: string) => {
  try {
    return (area === "local" ? localStorage : sessionStorage).getItem(key);
  } catch {
    return null;
  }
};
const write = (area: "local" | "session", key: string, value: string) => {
  try {
    (area === "local" ? localStorage : sessionStorage).setItem(key, value);
  } catch {
    /* storage blocked: the pop-up may simply show again */
  }
};
const capped = () => Number(read("local", CAP_KEY)) > Date.now();

// One pop-up at a time, each at most once per session. A state updater (not a closure) decides,
// so the timer and the exit-intent listeners never need fresh dependencies.
const tryOpen = (next: Kind) => (cur: Kind | null) => (cur || read("session", `storage:popup-${next}`) ? cur : next);

const field =
  "min-h-[48px] w-full rounded-md border border-muted-2 bg-surface px-4 text-base text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
const label = "text-[14px] font-medium text-ink";
const title = "pr-10 font-display text-2xl font-semibold text-ink";

/**
 * Engagement pop-ups (client checklist §6) on a native <dialog>: focus trap, Esc and top layer
 * for free. Newsletter opens 10s after load; returning visitors who closed it skip it for
 * `capDays`, subscribers for a year. Exit intent (10% offer): the pointer leaving through the top
 * edge on desktop; a fast flick back up after reading on touch screens (framer scroll velocity,
 * no window scroll listener). Never both at once, never twice in a session.
 */
export default function Popups() {
  const ref = useRef<HTMLDialogElement>(null);
  const [kind, setKind] = useState<Kind | null>(null);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);

  useEffect(() => {
    if (capped()) return;
    const t = window.setTimeout(() => setKind(tryOpen("newsletter")), newsletter.delayMs);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const onOut = (e: MouseEvent) => {
      if (!e.relatedTarget && e.clientY <= 0) setKind(tryOpen("exit"));
    };
    document.addEventListener("mouseout", onOut);
    return () => document.removeEventListener("mouseout", onOut);
  }, []);

  useMotionValueEvent(velocity, "change", (v) => {
    if (v < -2500 && scrollY.get() > 1200 && window.matchMedia("(pointer: coarse)").matches) setKind(tryOpen("exit"));
  });

  useEffect(() => {
    if (!kind) return;
    write("session", `storage:popup-${kind}`, "1");
    ref.current?.showModal();
  }, [kind]);

  const close = () => ref.current?.close();
  const onClose = () => {
    if (kind === "newsletter" && !capped()) write("local", CAP_KEY, String(Date.now() + newsletter.capDays * DAY));
    setKind(null);
  };

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && close()}
      aria-labelledby="popup-title"
      className="m-auto w-[min(92vw,440px)] rounded-xl border border-line bg-surface p-0 text-ink shadow-3"
    >
      {kind && (
        <div className="relative p-6 md:p-8">
          <button
            type="button"
            onClick={close}
            aria-label="Cerrar"
            className="absolute right-3 top-3 flex h-11 w-11 cursor-pointer items-center justify-center rounded-md text-muted transition-colors duration-fast ease-soft hover:bg-bg hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X size={20} aria-hidden="true" />
          </button>
          {kind === "exit" ? (
            <>
              <SealPercent size={32} weight="regular" aria-hidden="true" className="text-primary-deep" />
              <h2 id="popup-title" className={`mt-4 ${title}`}>{exitOffer.title}</h2>
              <p className="mt-2 text-[15px] text-ink-2">{exitOffer.body}</p>
              <a
                href={waLink(exitOffer.message)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className={`${btnClass("primary")} mt-6 w-full`}
              >
                <CtaIcon intent="whatsapp" />
                {exitOffer.cta}
              </a>
              <p className="mt-3 text-[13px] text-muted">
                {exitOffer.terms}{" "}
                <Link href={exitOffer.termsHref} onClick={close} className="underline underline-offset-2 hover:text-ink">Ver términos</Link>
              </p>
            </>
          ) : (
            <Newsletter onSubscribed={() => write("local", CAP_KEY, String(Date.now() + 365 * DAY))} />
          )}
        </div>
      )}
    </dialog>
  );
}

function Newsletter({ onSubscribed }: { onSubscribed: () => void }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = JSON.stringify(Object.fromEntries(new FormData(e.currentTarget)));
    setState("sending");
    try {
      if (newsletter.endpoint) {
        const res = await fetch(newsletter.endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
      } else {
        // ponytail: demo mode until the client's provider endpoint lands; nothing is stored.
        console.warn("[newsletter] PENDIENTE: sin endpoint configurado, el correo no se guardó.");
      }
      onSubscribed();
      setState("done");
    } catch {
      setState("error");
    }
  };

  if (state === "done") {
    return (
      <div role="status">
        <h2 id="popup-title" className={title}>{newsletter.successTitle}</h2>
        <p className="mt-2 text-[15px] text-ink-2">{newsletter.success}</p>
      </div>
    );
  }

  return (
    <>
      <h2 id="popup-title" className={title}>{newsletter.title}</h2>
      <p className="mt-2 text-[15px] text-ink-2">{newsletter.body}</p>
      <form onSubmit={submit} className="mt-6 grid gap-4">
        <div className="grid gap-2">
          <label htmlFor="nl-name" className={label}>
            Nombre <span className="font-normal text-muted">(opcional)</span>
          </label>
          <input id="nl-name" name="name" autoComplete="given-name" className={field} />
        </div>
        <div className="grid gap-2">
          <label htmlFor="nl-email" className={label}>Correo electrónico</label>
          <input id="nl-email" name="email" type="email" required autoComplete="email" aria-describedby={state === "error" ? "nl-error" : undefined} className={field} />
        </div>
        {state === "error" && (
          <p id="nl-error" role="alert" className="flex items-center gap-2 text-[14px] text-ink">
            <WarningCircle size={18} aria-hidden="true" className="shrink-0" />
            No pudimos registrar tu correo. Intenta de nuevo.
          </p>
        )}
        <button type="submit" disabled={state === "sending"} className={`${btnClass("primary")} w-full disabled:cursor-wait disabled:opacity-70`}>
          {state !== "sending" && <CtaIcon intent="suscribir" />}
          {state === "sending" ? "Enviando" : "Suscribirme"}
        </button>
        <p className="text-[13px] text-muted">
          Al suscribirte aceptas la{" "}
          <Link href="/politica-tratamiento-de-datos/" className="underline underline-offset-2 hover:text-ink">política de tratamiento de datos</Link>. Puedes darte de baja cuando quieras.
        </p>
      </form>
    </>
  );
}
