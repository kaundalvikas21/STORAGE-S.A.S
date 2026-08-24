"use client";
import { useSyncExternalStore } from "react";
import { intentCards } from "@/content/site";

// Shared m³ state between HeroVisualizer (moment 1) and IntentCards (moment 2).
// ponytail: module singleton, fine for the single homepage route; move to React
// context if a second route ever needs isolated calculator state.
let m3 = 9;
const subs = new Set<() => void>();

export function setM3(v: number) {
  m3 = Math.min(50, Math.max(1, Math.round(v)));
  subs.forEach((f) => f());
}

export function useM3() {
  return useSyncExternalStore(
    (cb) => {
      subs.add(cb);
      return () => subs.delete(cb);
    },
    () => m3,
    () => 9,
  );
}

/** m³ → intent profile. Boundaries mirror the intentCards ranges (1-3 / 4-8 / 9-15 / 16+). */
export function profileFor(v: number) {
  return intentCards[v <= 3 ? 0 : v <= 8 ? 1 : v <= 15 ? 2 : 3];
}
