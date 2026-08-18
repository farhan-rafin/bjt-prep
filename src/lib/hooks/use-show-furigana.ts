"use client";
import { useAuth } from "@/lib/auth-context";

/** Learner's "Show furigana" preference from Settings. Off = Test Mode (hide readings). */
export function useShowFurigana() {
  const { profile } = useAuth();
  return profile?.show_furigana ?? true;
}
