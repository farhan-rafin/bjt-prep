"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export function Progress({
  value,
  className,
  barClassName,
  size = "md",
}: {
  value: number;
  className?: string;
  barClassName?: string;
  size?: "sm" | "md" | "lg";
}) {
  const h = size === "sm" ? "h-1.5" : size === "lg" ? "h-3" : "h-2";
  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn("w-full overflow-hidden rounded-full bg-surface-muted", h, className)}
    >
      <div
        className={cn("h-full rounded-full bg-primary transition-all duration-500", barClassName)}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
