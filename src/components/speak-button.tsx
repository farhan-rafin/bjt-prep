"use client";
import * as React from "react";
import { Volume2 } from "lucide-react";
import { useSpeech } from "@/lib/hooks/use-speech";
import { cn } from "@/lib/utils";

export function SpeakButton({
  text,
  size = "sm",
  className,
  rate,
}: {
  text: string;
  size?: "sm" | "md";
  className?: string;
  rate?: number;
}) {
  const { speak, speaking, supported } = useSpeech();
  if (!supported) return null;

  return (
    <button
      type="button"
      aria-label={`Play pronunciation of ${text}`}
      onClick={(e) => {
        e.stopPropagation();
        speak(text, { rate });
      }}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-surface-muted hover:text-primary",
        size === "sm" ? "size-6" : "size-8",
        speaking && "text-primary",
        className,
      )}
    >
      <Volume2 className={cn(size === "sm" ? "size-3.5" : "size-4.5", speaking && "animate-pulse")} />
    </button>
  );
}
