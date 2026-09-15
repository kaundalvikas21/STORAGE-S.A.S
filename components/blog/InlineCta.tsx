import Button from "@/components/Button";
import { CALC_URL, QUOTE_URL } from "@/content/facts";

/** Mid-article CTA (one `cta` block per post): a slim --primary-soft cell inside the 65ch column, one sentence
 *  + the site's own button for that intent. Wordings stay "Calcular mi espacio" / "Cotizar" (no new CTA intent). */
export default function InlineCta({ text, intent }: { text: string; intent: "calcular" | "cotizar" }) {
  return (
    <aside className="mb-5 mt-10 flex flex-col items-start gap-4 rounded-lg border border-line bg-primary-soft p-6 sm:flex-row sm:items-center sm:justify-between md:p-7">
      <p className="max-w-[40ch] text-[16px] font-medium leading-snug text-ink">{text}</p>
      {intent === "calcular" ? (
        <Button href={CALC_URL} intent="calcular" className="shrink-0">
          Calcular mi espacio
        </Button>
      ) : (
        <Button href={QUOTE_URL} intent="cotizar" className="shrink-0">
          Cotizar
        </Button>
      )}
    </aside>
  );
}
