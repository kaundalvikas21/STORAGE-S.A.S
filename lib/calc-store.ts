"use client";
import { useSyncExternalStore } from "react";
import { intentCards } from "@/content/site";

// m³ selection behind the intent cards. Kept as a store rather than local state because
// `profileFor` is shared and the calculator deep link reads the same value.
// ponytail: module singleton, fine for the single homepage route; move to React
// context if a second route ever needs isolated calculator state.
let m3 = 18;
const subs = new Set<() => void>();

// Client size table: smallest unit 2 m³, custom spaces from 60 m³.
export function setM3(v: number) {
  m3 = Math.min(60, Math.max(2, Math.round(v)));
  subs.forEach((f) => f());
}

export function useM3() {
  return useSyncExternalStore(
    (cb) => {
      subs.add(cb);
      return () => subs.delete(cb);
    },
    () => m3,
    () => 18,
  );
}

/** m³ → intent profile. Boundaries mirror the intentCards ranges (2-5 / 6-10 / 15-20 / 25+);
 *  values in the client's gaps (11-14, 21-24) round up to the next tier. */
export function profileFor(v: number) {
  return intentCards[v <= 5 ? 0 : v <= 10 ? 1 : v <= 20 ? 2 : 3];
}
