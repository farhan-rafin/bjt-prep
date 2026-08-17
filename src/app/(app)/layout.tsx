import { Sidebar } from "@/components/nav/sidebar";
import { BottomNav } from "@/components/nav/bottom-nav";
import { TopBar } from "@/components/nav/top-bar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh">
      <Sidebar />
      <div className="flex min-h-svh flex-1 flex-col">
        <TopBar />
        <main className="flex-1 pb-20 lg:pb-0">{children}</main>
      </div>
      <BottomNav />
    </div>
  );
}
