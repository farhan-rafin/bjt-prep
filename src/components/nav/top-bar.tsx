"use client";
import { Logo } from "@/components/logo";
import { CommandPalette } from "@/components/search/command-palette";
import { ThemeToggle } from "@/components/theme-toggle";

export function TopBar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/90 px-4 backdrop-blur lg:px-8">
      <div className="lg:hidden">
        <Logo />
      </div>
      <div className="hidden flex-1 lg:flex">
        <CommandPalette />
      </div>
      <div className="ml-auto lg:hidden">
        <CommandPalette />
      </div>
      <div className="ml-auto hidden lg:block">
        <ThemeToggle />
      </div>
    </header>
  );
}
