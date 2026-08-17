"use client";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex min-h-[50svh] flex-col items-center justify-center gap-3 px-4 text-center">
      <p className="text-lg font-semibold">Something went wrong</p>
      <p className="max-w-sm text-sm text-muted-foreground">{error.message || "An unexpected error occurred."}</p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
