"use client";
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth-context";
import { useUserTable } from "@/lib/hooks/use-user-table";
import {
  daysUntil, findCurrentPosition, paceStatus, paceLabels, monthFor, completedSessionsCount, TOTAL_SESSIONS,
} from "@/lib/progress";
import { finalCountdown, final8WeeksAllocation, examStrategyReminders, monthlyCheckpoints } from "@/content";
import { cn } from "@/lib/utils";

export default function CountdownPage() {
  const { profile, updateProfile } = useAuth();
  const { rows: sessions } = useUserTable("session_progress");
  const pos = findCurrentPosition(sessions);
  const days = daysUntil(profile?.exam_date);
  const pace = paceStatus(sessions, profile?.exam_date);
  const completed = completedSessionsCount(sessions);

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 lg:py-10">
      <h1 className="text-2xl font-semibold">BJT Countdown</h1>

      <Card className="mt-5">
        <CardContent className="flex flex-col items-center gap-2 p-8 text-center">
          {days !== null ? (
            <>
              <p className="text-4xl font-semibold">{Math.max(0, days)} DAYS UNTIL BJT</p>
              <p className="text-sm text-muted-foreground">
                Week {pos.week} / 24 · {completed} / {TOTAL_SESSIONS} sessions completed
              </p>
              <Badge variant={pace === "ahead" ? "success" : pace === "on_track" ? "primary" : pace === "slightly_behind" ? "warning" : "danger"} className="mt-1">
                {paceLabels[pace]}
              </Badge>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm text-muted-foreground">No exam date set yet.</p>
              <Input
                type="date"
                className="w-48"
                onChange={(e) => updateProfile({ exam_date: e.target.value })}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {days !== null && days <= 30 && days >= 0 && (
        <Card className="mt-6 border-accent/30 bg-accent/5">
          <CardHeader><CardTitle>Final 30-Day Plan</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-2 pt-4">
            {finalCountdown.map((c) => (
              <div
                key={c.daysOut}
                className={cn(
                  "flex gap-3 rounded-lg border p-3 text-sm",
                  days <= c.daysOut + 1 && days >= c.daysOut - 1 ? "border-accent bg-accent/10" : "border-border",
                )}
              >
                <span className="w-20 shrink-0 font-medium">{c.daysOut === 0 ? "Exam day" : `${c.daysOut} days out`}</span>
                <span className="text-muted-foreground">{c.focus}</span>
              </div>
            ))}
            <div className="mt-2">
              <p className="mb-1 text-xs font-medium text-muted-foreground">Exam-strategy reminders</p>
              <ul className="list-disc pl-5 text-sm text-muted-foreground">
                {examStrategyReminders.map((r) => <li key={r}>{r}</li>)}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {pos.week >= 17 && (
        <Card className="mt-6">
          <CardHeader><CardTitle>Final 8 Weeks — Study Allocation</CardTitle></CardHeader>
          <CardContent className="pt-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs text-muted-foreground">
                    <th className="py-2">Area</th>
                    <th className="py-2">Weeks 17–20</th>
                    <th className="py-2">Weeks 21–24</th>
                  </tr>
                </thead>
                <tbody>
                  {final8WeeksAllocation.map((a) => (
                    <tr key={a.area} className="border-b border-border/50">
                      <td className="py-2">{a.area}</td>
                      <td className="py-2">{a.w1720}</td>
                      <td className="py-2">{a.w2124}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="mt-6">
        <CardHeader><CardTitle>Monthly Checkpoints</CardTitle></CardHeader>
        <CardContent className="flex flex-col gap-3 pt-4">
          {monthlyCheckpoints.map((c) => (
            <div key={c.month} className={cn("rounded-lg border p-3 text-sm", monthFor(pos.week) === c.month && "border-primary/40 bg-primary/5")}>
              <p className="mb-1 font-medium">Month {c.month} Checkpoint</p>
              <p className="text-muted-foreground">Listening: {c.listening}</p>
              <p className="text-muted-foreground">Business vocab: {c.businessVocab}</p>
              <p className="text-muted-foreground">Reading speed: {c.readingSpeed}</p>
              <p className="text-muted-foreground">Mock performance: {c.mockPerformance}</p>
              <p className="mt-1 text-warning">Expect: {c.weaknessToExpect}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
