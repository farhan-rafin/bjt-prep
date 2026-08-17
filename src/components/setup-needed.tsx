"use client";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { useAuth } from "@/lib/auth-context";
import { AlertTriangle } from "lucide-react";

export function SetupNeeded({ message }: { message: string }) {
  const { retryAutoLogin } = useAuth();
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4 px-6 text-center">
      <Logo />
      <AlertTriangle className="size-8 text-warning" />
      <div className="max-w-md">
        <p className="font-medium">Couldn&apos;t start your session</p>
        <p className="mt-1 text-sm text-muted-foreground">{message}</p>
        <p className="mt-2 text-xs text-muted-foreground">
          In the Supabase dashboard: Authentication → Sign In / Providers → enable{" "}
          <span className="font-medium text-foreground">Anonymous Sign-ins</span>, then retry below.
        </p>
      </div>
      <Button onClick={() => retryAutoLogin()}>Retry</Button>
    </div>
  );
}
