"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav, settingsNav } from "@/lib/nav";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-svh w-64 shrink-0 flex-col border-r border-border bg-surface lg:flex">
      <div className="p-5">
        <Logo />
      </div>
      <nav className="scrollbar-thin flex-1 overflow-y-auto px-3 pb-4">
        <ul className="flex flex-col gap-0.5">
          {mainNav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-surface-muted hover:text-foreground",
                  )}
                >
                  <Icon className="size-4 shrink-0" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="flex flex-col gap-3 border-t border-border p-3">
        <Link
          href={settingsNav.href}
          className={cn(
            "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            pathname.startsWith("/settings") ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-surface-muted hover:text-foreground",
          )}
        >
          <settingsNav.icon className="size-4" />
          Settings
        </Link>
        <div className="px-1">
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
