import { AppShellGate } from "@/components/app-shell-gate";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <AppShellGate>{children}</AppShellGate>;
}
