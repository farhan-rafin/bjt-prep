"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUserTable } from "@/lib/hooks/use-user-table";
import { QuizShell, type QuizItem } from "@/components/quiz/quiz-shell";
import { buildWeeklyTestQuiz } from "@/lib/quiz-generators";
import { findCurrentPosition } from "@/lib/progress";
import { weeklyTestItems, bandForScore } from "@/content";
import { toast } from "sonner";

export default function TestsPage() {
  const { rows: sessions } = useUserTable("session_progress");
  const { rows: weeklyTests, upsert } = useUserTable("weekly_tests");
  const pos = findCurrentPosition(sessions);
  const week = pos.week;

  const [items] = React.useState<QuizItem[]>(buildWeeklyTestQuiz);
  const [started, setStarted] = React.useState(false);
  const breakdown = React.useRef<Record<string, { correct: number; total: number }>>({});

  const previousResult = weeklyTests.find((t) => t.week === week);

  async function handleFinish(correct: number, total: number) {
    const pct = Math.round((correct / total) * 100);
    const weakest = Object.entries(breakdown.current).sort((a, b) => a[1].correct / a[1].total - b[1].correct / b[1].total)[0];
    await upsert(
      { week, score_pct: pct, band: bandForScore(pct).label, breakdown: breakdown.current } as never,
      "user_id,week",
    );
    toast.success(`Week ${week} test: ${pct}% — ${bandForScore(pct).label}${weakest ? `. Weakest: ${weakest[0]}` : ""}`);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 lg:py-10">
      <h1 className="text-2xl font-semibold">Weekly Test</h1>
      <p className="mt-1 text-sm text-muted-foreground">Week {week} test — covers every skill in ~40 minutes.</p>

      {previousResult && !started && (
        <Card className="mt-4 border-primary/30 bg-primary/5">
          <CardContent className="p-4 text-sm">
            Already taken this week: <span className="font-semibold">{Math.round(previousResult.score_pct)}%</span> — {previousResult.band}
          </CardContent>
        </Card>
      )}

      {!started ? (
        <Card className="mt-5">
          <CardContent className="p-6">
            <p className="mb-3 text-sm text-muted-foreground">This test samples:</p>
            <div className="mb-4 flex flex-col gap-1 text-sm">
              {weeklyTestItems.map((w) => (
                <p key={w.skill}>
                  <span className="font-medium">{w.skill}: </span>
                  {w.sample}
                </p>
              ))}
            </div>
            <Button onClick={() => setStarted(true)}>Start Weekly Test</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="mt-5">
          <QuizShell
            items={items}
            quizType="weekly_test"
            week={week}
            onAnswer={(item, isCorrect) => {
              const cat = item.category ?? "General";
              const b = breakdown.current[cat] ?? { correct: 0, total: 0 };
              b.total += 1;
              if (isCorrect) b.correct += 1;
              breakdown.current[cat] = b;
            }}
            onFinish={handleFinish}
          />
        </div>
      )}

      <div className="mt-8">
        <h2 className="mb-2 text-sm font-medium text-muted-foreground">Score bands</h2>
        <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
          {[
            { range: "85%+", label: "Ahead of pace", tone: "success" },
            { range: "75–84%", label: "On track", tone: "success" },
            { range: "65–74%", label: "Review weak areas", tone: "warning" },
            { range: "< 65%", label: "Remedial study", tone: "danger" },
          ].map((b) => (
            <div key={b.range} className="rounded-lg border border-border p-2">
              <Badge variant={b.tone as never}>{b.range}</Badge>
              <p className="mt-1">{b.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
