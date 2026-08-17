import { Sidebar } from "@/components/nav/sidebar";
import { BottomNav } from "@/components/nav/bottom-nav";
import { TopBar } from "@/components/nav/top-bar";
import { OnboardingGuard } from "@/components/onboarding-guard";

export default function AppLayout({ children }: { children: React.ReactNode }) {
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
