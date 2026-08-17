"use client";
import { Sidebar } from "@/components/nav/sidebar";
import { BottomNav } from "@/components/nav/bottom-nav";
import { TopBar } from "@/components/nav/top-bar";
import { OnboardingGuard } from "@/components/onboarding-guard";
import { SetupNeeded } from "@/components/setup-needed";
import { useAuth } from "@/lib/auth-context";

export function AppShellGate({ children }: { children: React.ReactNode }) {
  const { loading, user, authError } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <div className="size-6 animate-spin rounded-full border-2 border-border border-t-primary" />
      </div>
    );
  }

  if (!user) {
    return <SetupNeeded message={authError ?? "Unable to start a session."} />;
  }

  return (
    <div className="flex min-h-svh">
      <OnboardingGuard />
      <Sidebar />
      <div className="flex min-h-svh flex-1 flex-col">
        <TopBar />
        <main className="flex-1 pb-20 lg:pb-0">{children}</main>
      </div>
      <BottomNav />
    </div>
  );
}
