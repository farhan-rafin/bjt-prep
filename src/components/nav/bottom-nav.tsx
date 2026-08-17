"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mobilePrimaryNav, mainNav, settingsNav } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";

export function BottomNav() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = React.useState(false);
  const moreItems = mainNav.filter((i) => !mobilePrimaryNav.some((p) => p.href === i.href));

  return (
    <>
      <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border bg-surface/95 backdrop-blur lg:hidden pb-[env(safe-area-inset-bottom)]">
        {mobilePrimaryNav.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium",
                active ? "text-primary" : "text-muted-foreground",
              )}
            >
              <Icon className="size-5" />
              {item.label}
            </Link>
          );
        })}
        <button
          onClick={() => setMoreOpen(true)}
          className="flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium text-muted-foreground"
        >
          <Menu className="size-5" />
          More
        </button>
      </nav>

      <Dialog open={moreOpen} onOpenChange={setMoreOpen}>
        <DialogContent className="bottom-0 top-auto max-h-[80vh] w-full max-w-full translate-y-0 rounded-b-none rounded-t-2xl left-0 translate-x-0 lg:hidden">
          <VisuallyHidden><DialogTitle>More</DialogTitle></VisuallyHidden>
          <div className="grid grid-cols-3 gap-3 pt-2">
            {[...moreItems, settingsNav].map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMoreOpen(false)}
                  className="flex flex-col items-center gap-2 rounded-xl border border-border p-3 text-center text-xs font-medium text-foreground hover:bg-surface-muted"
                >
                  <Icon className="size-5 text-primary" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
