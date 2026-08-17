"use client";
import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export function OnboardingGuard() {
  const { user, profile, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  React.useEffect(() => {
    if (loading || !user || !profile) return;
    if (!profile.onboarded && pathname !== "/onboarding") {
      router.replace("/onboarding");
    }
  }, [loading, user, profile, pathname, router]);

  return null;
}
