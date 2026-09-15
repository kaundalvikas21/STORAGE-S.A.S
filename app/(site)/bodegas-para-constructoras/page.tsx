import type { Metadata } from "next";
import SegmentTemplate, { segmentMeta } from "@/components/segmento/SegmentPage";

export const metadata: Metadata = segmentMeta("bodegas-para-constructoras");

/** /bodegas-para-constructoras/ (spec T3, silo 1A): the shared segment template; copy in content/segments.ts. */
export default function Page() {
  return <SegmentTemplate slug="bodegas-para-constructoras" />;
}
