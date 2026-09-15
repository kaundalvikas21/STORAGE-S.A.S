import type { Metadata } from "next";
import SegmentTemplate, { segmentMeta } from "@/components/segmento/SegmentPage";

export const metadata: Metadata = segmentMeta("minibodegas-para-hogar");

/** /minibodegas-para-hogar/ (spec T3, silo 1A): the shared segment template; copy in content/segments.ts. */
export default function Page() {
  return <SegmentTemplate slug="minibodegas-para-hogar" />;
}
