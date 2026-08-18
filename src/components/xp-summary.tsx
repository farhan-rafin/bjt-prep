"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useUserTable } from "@/lib/hooks/use-user-table";
import { Zap } from "lucide-react";

const XP_PER_LEVEL = 500;

export function totalXp(logs: { xp: number | null }[]) {
  return logs.reduce((sum, l) => sum + (l.xp ?? 0), 0);
}

export function levelFor(xp: number) {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
}

export function XpSummary() {
  const { rows: studyLogs } = useUserTable("study_logs");
  const xp = totalXp(studyLogs);
  const level = levelFor(xp);
  const intoLevel = xp % XP_PER_LEVEL;

  return (
    <Card>
      <CardHeader><CardTitle>XP &amp; Level</CardTitle></CardHeader>
      <CardContent className="pt-4">
        <div className="flex items-center gap-3">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
            <Zap className="size-6" />
          </span>
          <div className="flex-1">
            <p className="text-2xl font-semibold">Level {level}</p>
            <p className="text-xs text-muted-foreground">{xp.toLocaleString()} XP total</p>
          </div>
        </div>
        <Progress value={(intoLevel / XP_PER_LEVEL) * 100} className="mt-3" />
        <p className="mt-1 text-xs text-muted-foreground">{XP_PER_LEVEL - intoLevel} XP to Level {level + 1}</p>
      </CardContent>
    </Card>
  );
}
