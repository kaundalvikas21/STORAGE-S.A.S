// Engagement: WhatsApp bubble, pop-ups and social feed (client checklist §5 + §6). Re-exported from
// content/site.ts. Every PENDIENTE here is a client deliverable; components show honest placeholders until then.
// WhatsApp URLs are built only in lib/lead.ts (`waChatUrl`), with the number from `company.whatsapp`.

// Floating click-to-chat bubble on every page, same behaviour as the current site's widget:
// opens WhatsApp with the business number and this prefilled message. No bot yet (chatbot
// integration later; this build is for client review). PENDIENTE CONFIRMAR: greeting + message copy.
export const whatsappWidget = {
  greeting: "Estamos disponibles, chatea ahora",
  message: "Hola! Vi su web y me gustaría recibir una cotización.",
  label: "Chatear por WhatsApp (se abre en una pestaña nueva)",
  /** ms after load before the greeting card slides in beside the bubble. */
  greetingDelayMs: 1500,
};

export const newsletter = {
  delayMs: 10_000,
  /** Days a returning visitor who closed the pop-up without subscribing goes without seeing it. */
  capDays: 7,
  /** PENDIENTE: endpoint of the email provider (Brevo, Mailchimp...). Receives POST JSON {name, email}.
   *  Empty = demo mode: the form shows its success state but the address is NOT stored anywhere. */
  endpoint: "",
  title: "Promociones y novedades de Storage",
  body: "Recibe en tu correo las promociones de bodegaje y las novedades de nuestras sedes.",
  successTitle: "Listo, ya estás suscrito",
  success: "Te escribiremos cuando tengamos una promoción o una novedad para ti.",
};

// PENDIENTE CONFIRMAR con el cliente: texto de la oferta, términos y si requiere código de descuento.
export const exitOffer = {
  title: "10% de descuento en tu primer mes",
  body: "Cotiza hoy tu minibodega y te aplicamos el descuento de bienvenida.",
  cta: "Cotizar",
  terms: "Aplican términos y condiciones.",
};

export type SocialNetwork = "Instagram" | "Facebook" | "TikTok";

export type SocialProfile = {
  network: SocialNetwork;
  href: string;
  handle: string;
  /** Public follower line as read on the profile on `social.snapshotDate`. */
  followers: string;
};

// Client accounts (confirmed 2026-09-14). The feed grid (content/social-posts.ts) is a SNAPSHOT of
// their real posts; a live feed needs the client's Graph API credentials (scripts/fetch-social.mjs).
// `profiles` also feeds the Organization JSON-LD `sameAs`.
export const social: { snapshotDate: string; profiles: SocialProfile[] } = {
  snapshotDate: "14 de septiembre de 2026",
  profiles: [
    { network: "Instagram", href: "https://www.instagram.com/storages.a.s/", handle: "@storages.a.s", followers: "2.818 seguidores · 160 publicaciones" },
    { network: "Facebook", href: "https://www.facebook.com/lapaguina/", handle: "Bodegajes y Mudanzas Storage S.A.S", followers: "4 mil seguidores en Facebook" },
  ],
};
