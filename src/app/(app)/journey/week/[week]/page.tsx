"use client";
import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUserTable } from "@/lib/hooks/use-user-table";
import { roadmap, monthGoals, daySpineLong } from "@/content";
import { weekStatus } from "@/lib/progress";
import { sessionTitle } from "@/lib/session-helpers";
import { JapaneseAuto } from "@/components/japanese-text";
import { cn } from "@/lib/utils";
import {
  SpellCheck, MessageSquareQuote, Headphones, BookOpen, BookMarked, Type, Target, ClipboardCheck, Briefcase,
  ChevronRight, CheckCircle2,
} from "lucide-react";

const cards = [
  { key: "foundation", label: "Grammar", icon: SpellCheck, color: "var(--color-skill-grammar)" },
  { key: "businessJp", label: "Business Japanese", icon: Briefcase, color: "var(--color-skill-business)" },
  { key: "listening", label: "Listening", icon: Headphones, color: "var(--color-skill-listening)" },
  { key: "reading", label: "Reading", icon: BookOpen, color: "var(--color-skill-reading)" },
  { key: "keigo", label: "Keigo", icon: MessageSquareQuote, color: "var(--color-skill-keigo)" },
  { key: "vocab", label: "Vocabulary", icon: BookMarked, color: "var(--color-skill-vocab)" },
  { key: "kanji", label: "Kanji", icon: Type, color: "var(--color-skill-kanji)" },
  { key: "bjtPractice", label: "BJT Practice", icon: Target, color: "var(--color-skill-bjt)" },
  { key: "weeklyTest", label: "Weekly Test", icon: ClipboardCheck, color: "var(--primary)" },
] as const;

export default function WeekDetailPage() {
  const params = useParams<{ week: string }>();
  const week = Number(params.week);
  const w = roadmap.find((x) => x.week === week);
  const { rows: sessions } = useUserTable("session_progress");

  if (!w) return <div className="p-8">Week not found.</div>;

  const status = weekStatus(week, sessions);

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 lg:py-10">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Week {week} · Month {w.month}</p>
      <h1 className="mt-1 text-2xl font-semibold">{w.theme}</h1>
      <p className="mt-2 text-sm text-muted-foreground">This week&apos;s mission: {monthGoals[w.month]}</p>
      <Badge variant={status === "completed" ? "success" : status === "in_progress" ? "primary" : "outline"} className="mt-3">
        {status === "completed" ? "Completed" : status === "in_progress" ? "In Progress" : "Upcoming"}
      </Badge>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Card key={c.key}>
              <CardContent className="flex items-start gap-3 p-4">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg" style={{ background: `color-mix(in srgb, ${c.color} 15%, transparent)`, color: c.color }}>
                  <Icon className="size-4.5" />
                </span>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">{c.label}</p>
                  <p className="mt-0.5 text-sm"><JapaneseAuto text={w[c.key]} /></p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <h2 className="mt-8 mb-3 text-lg font-semibold">The Four Study Days</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {([1, 2, 3, 4] as const).map((day) => {
          const s = sessions.find((x) => x.week === week && x.day === day);
          const done = s?.status === "completed";
          return (
            <Link key={day} href={`/journey/week/${week}/day/${day}`}>
              <Card className={cn("h-full transition-colors hover:border-primary/40", done && "border-success/40 bg-success/5")}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-sm">
                    <span>DAY {day} — {sessionTitle(week, day)}</span>
                    {done && <CheckCircle2 className="size-4 text-success" />}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <p className="text-xs text-muted-foreground">{daySpineLong[day]}</p>
                  <Button variant="ghost" size="sm" className="mt-3 px-0 text-primary">
                    {done ? "Review" : "Start"} <ChevronRight className="size-3.5" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
