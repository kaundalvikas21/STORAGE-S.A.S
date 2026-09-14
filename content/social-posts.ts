import { social } from "./engagement";

export type SocialPost = {
  network: "Instagram" | "Facebook";
  /** Post permalink. Instagram's public embed exposes none, so IG tiles open the profile until the Graph API sync runs. */
  href: string;
  src: string;
  width: number;
  height: number;
  /** First sentence of the real caption, emoji stripped. */
  caption: string;
  reel: boolean;
  /** The newest post takes the 2x2 feature cell. */
  feature?: boolean;
};

const IG = social.profiles[0].href;

// SNAPSHOT of the client's real recent posts (1 feature + 3 Instagram + 3 Facebook, no repeated
// creative), captured from the public Instagram profile embed and the Facebook Page Plugin on
// social.snapshotDate. Facebook permalinks are real; images live in public/social/. Regenerate with
// `npm run social:sync` once the client hands over Graph API credentials (scripts/fetch-social.mjs).
export const socialPosts: SocialPost[] = [
  { network: "Instagram", href: IG, src: "/social/post-1.jpg", width: 720, height: 1280, caption: "¡Espacio Seguro para tus Muebles o Mercancía!", reel: true, feature: true },
  { network: "Instagram", href: IG, src: "/social/post-4.jpg", width: 640, height: 1136, caption: "Empacamos, organizamos y trasladamos.", reel: true },
  { network: "Instagram", href: IG, src: "/social/post-5.jpg", width: 1080, height: 1350, caption: "Haz de tu hogar un lugar para celebrar y compartir.", reel: false },
  { network: "Instagram", href: IG, src: "/social/post-3.jpg", width: 1080, height: 1350, caption: "En Storage tus pertenencias están protegidas las 24 horas, con bodegas privadas y limpias.", reel: false },
  { network: "Facebook", href: "https://www.facebook.com/photo.php?fbid=1478992557216212", src: "/social/post-2.jpg", width: 1080, height: 1350, caption: "Una mudanza no todo cabe en tu nuevo lugar, pero sí en Storage.", reel: false },
  { network: "Facebook", href: "https://www.facebook.com/photo.php?fbid=1465788378536630", src: "/social/post-6.jpg", width: 1080, height: 1350, caption: "Septiembre trae cambios y nuevas etapas.", reel: false },
  { network: "Facebook", href: "https://www.facebook.com/photo.php?fbid=1464437038671764", src: "/social/post-7.jpg", width: 403, height: 504, caption: "El comedor no es un depósito.", reel: false },
];
