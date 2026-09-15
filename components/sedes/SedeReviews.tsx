import Reviews from "@/components/sections/Reviews";
import type { Review } from "@/content/site";

/** Sede page block 8 (spec T5 note 7): reviews for THIS location. They come from the Google Business
 *  Profile of each physical point, which only works once the client claims those profiles. Until a
 *  server fetch passes `reviews`, the block renders nothing. Never fill it with the homepage seed reviews. */
export default function SedeReviews({ reviews = [] }: { reviews?: Review[] }) {
  return reviews.length > 0 ? <Reviews reviews={reviews} /> : null;
}
