import { FacebookLogo, InstagramLogo, TiktokLogo } from "@phosphor-icons/react/dist/ssr";
import Reveal, { RevealItem } from "@/components/Reveal";
import SocialGrid from "@/components/sections/SocialGrid";
import { socialPosts } from "@/content/social-posts";
import { social, type SocialNetwork } from "@/content/site";

const networkIcons: Record<SocialNetwork, typeof InstagramLogo> = { Instagram: InstagramLogo, Facebook: FacebookLogo, TikTok: TiktokLogo };

const focus = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

/**
 * "Storage en redes" (client checklist §6, approved artifact): heading + profile chips, then the
 * lazy post grid with its network filter (SocialGrid, client). The grid shows a SNAPSHOT of the
 * client's real posts (content/social-posts.ts); SocialGrid's foot line says the date. No iframes:
 * every tile is a next/image, lazy by default, so the section costs nothing at page load.
 */
export default function SocialFeed() {
  const { profiles } = social;
  if (profiles.length === 0) return null;

  return (
    <section aria-labelledby="social-title" className="order-12">
      <div className="mx-auto max-w-site px-5 py-14 md:px-8 md:py-20 lg:px-10">
        <Reveal group className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <RevealItem>
            <h2 id="social-title" className="font-display text-3xl font-semibold text-ink">
              Storage en redes
            </h2>
            <p className="mt-3 max-w-[52ch] text-[15px] text-muted">Lo que estamos guardando, moviendo y celebrando esta semana. Síguenos y escríbenos por donde prefieras.</p>
          </RevealItem>
          <RevealItem>
            <ul role="list" className="flex flex-wrap gap-2.5">
            {profiles.map(({ network, href, handle, followers }) => {
              const Icon = networkIcons[network];
              return (
                <li key={network}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex min-h-[56px] cursor-pointer items-center gap-3 rounded-md border border-line bg-surface py-2 pl-2.5 pr-4 shadow-1 transition-[transform,box-shadow,border-color] duration ease-soft hover:-translate-y-0.5 hover:border-muted-2 hover:shadow-2 ${focus}`}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-brand text-on-brand">
                      <Icon size={18} weight="regular" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[14px] font-semibold leading-tight text-ink">{handle}</span>
                      <span className="tnum block text-[12px] text-muted">{followers}</span>
                      <span className="sr-only">(se abre en una pestaña nueva)</span>
                    </span>
                  </a>
                </li>
              );
            })}
            </ul>
          </RevealItem>
        </Reveal>

        <SocialGrid posts={socialPosts} />

      </div>
    </section>
  );
}
