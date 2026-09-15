import type { Metadata } from "next";
import SizeTemplate, { sizeMeta } from "@/components/tamanos/SizePage";

export const metadata: Metadata = sizeMeta("grande");

/** /bodegas-grandes/ (spec T8, silo 1B): the shared size template, noindex until Open Item 2; copy in content/tamanos.ts. */
export default function Page() {
  return <SizeTemplate id="grande" />;
}
