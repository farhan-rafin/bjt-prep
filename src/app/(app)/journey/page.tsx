"use client";
import Link from "next/link";
import { useUserTable } from "@/lib/hooks/use-user-table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { roadmap, monthTitles, weeksForMonth } from "@/content";
import { weekStatus } from "@/lib/progress";
import { cn } from "@/lib/utils";
import { CheckCircle2, Circle, Lock } from "lucide-react";

const statusMeta = {
  completed: { label: "Completed", icon: CheckCircle2, className: "text-success" },
  in_progress: { label: "In Progress", icon: Circle, className: "text-primary" },
  upcoming: { label: "Upcoming", icon: Lock, className: "text-muted-foreground" },
};

export default function JourneyPage() {
  const { rows: sessions } = useUserTable("session_progress");

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 lg:py-10">
      <h1 className="text-2xl font-semibold">24-Week Journey</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Organised by BJT readiness, not JLPT levels. Business Japanese and listening appear from Week 1.
      </p>

      {[1, 2, 3, 4, 5, 6].map((month) => (
        <section key={month} className="mt-8">
          <div className="mb-3 flex items-baseline gap-2">
            <h2 className="text-lg font-semibold">Month {month}</h2>
            <span className="text-sm text-muted-foreground">{monthTitles[month]}</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {weeksForMonth(month).map((w) => {
              const status = weekStatus(w.week, sessions);
              const meta = statusMeta[status];
              const Icon = meta.icon;
              return (
                <Link key={w.week} href={`/journey/week/${w.week}`}>
                  <Card className={cn("transition-colors hover:border-primary/40", status === "in_progress" && "border-primary/40")}>
                    <CardContent className="flex items-start justify-between gap-3 p-4">
                      <div>
                        <p className="text-sm font-medium">Week {w.week}</p>
                        <p className="text-sm text-muted-foreground">{w.theme}</p>
                      </div>
                      <Badge variant={status === "completed" ? "success" : status === "in_progress" ? "primary" : "outline"} className="shrink-0">
                        <Icon className="size-3" />
                        {meta.label}
                      </Badge>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
      {roadmap.length !== 24 && null}
    </div>
  );
}
