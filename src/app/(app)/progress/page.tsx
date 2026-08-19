"use client";
import * as React from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";
import { useUserTable } from "@/lib/hooks/use-user-table";
import { BjtScoreTracker } from "@/components/bjt-score-tracker";
import { Achievements } from "@/components/achievements";
import { XpSummary } from "@/components/xp-summary";
import {
  masteryEstimate, latestMock, findCurrentPosition,
  masteryProgressPct, totalItemsMastered, totalItemsAvailable,
} from "@/lib/progress";
import { monthTitles } from "@/content";

const skillMeta = [
  { key: "listening", label: "Listening" },
  { key: "reading", label: "Reading" },
  { key: "vocab", label: "Vocabulary" },
  { key: "kanji", label: "Kanji" },
  { key: "grammar", label: "Grammar" },
  { key: "keigo", label: "Keigo" },
  { key: "business", label: "Business" },
  { key: "bjt", label: "BJT Practice" },
] as const;

export default function ProgressPage() {
  const { profile } = useAuth();
  const { rows: sessions } = useUserTable("session_progress");
  const { rows: weeklyTests } = useUserTable("weekly_tests");
  const { rows: mockTests } = useUserTable("mock_tests");
  const { rows: vocabStatus } = useUserTable("vocab_status");
  const { rows: kanjiStatus } = useUserTable("kanji_status");
  const { rows: grammarStatus } = useUserTable("grammar_status");
  const { rows: attempts } = useUserTable("quiz_attempts");

  const pos = findCurrentPosition(sessions);
  const mastery = masteryEstimate({
    vocabStatus, kanjiStatus, grammarStatus, attempts,
  });

  const strongest = skillMeta.reduce((max, s) => (mastery[s.key].pct > mastery[max.key].pct ? s : max), skillMeta[0]);
  const weakest = skillMeta.reduce((min, s) => (mastery[s.key].pct < mastery[min.key].pct ? s : min), skillMeta[0]);
  const latestMockScore = latestMock(mockTests);
  const mastered = totalItemsMastered(mastery);
  const available = totalItemsAvailable(mastery);

  // Items cleared per calendar day — driven purely by what you clicked, not by time spent.
  const activityData = React.useMemo(() => {
    const byDay = new Map<string, number>();
    const add = (iso: string | null) => {
      if (!iso) return;
      const day = iso.slice(0, 10);
      byDay.set(day, (byDay.get(day) ?? 0) + 1);
    };
    attempts.filter((a) => a.is_correct).forEach((a) => add(a.created_at));
    vocabStatus.filter((v) => v.status === "learned").forEach((v) => add(v.updated_at));
    kanjiStatus.filter((k) => k.status === "learned").forEach((k) => add(k.updated_at));
    grammarStatus.filter((g) => g.status === "learned").forEach((g) => add(g.updated_at));
    return [...byDay.entries()]
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(-21)
      .map(([day, count]) => ({ day: day.slice(5), count }));
  }, [attempts, vocabStatus, kanjiStatus, grammarStatus]);

  const testData = [...weeklyTests].sort((a, b) => a.week - b.week).map((t) => ({ week: `W${t.week}`, score: Math.round(t.score_pct) }));

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 lg:py-10">
      <h1 className="text-2xl font-semibold">Progress</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Everything here counts what you cleared, not how long you sat with it.
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Items Mastered" value={`${mastered}`} sub={`of ${available}`} />
        <Stat label="Overall Progress" value={`${masteryProgressPct(mastery)}%`} />
        <Stat label="Strongest" value={strongest.label} sub={`${mastery[strongest.key].pct}%`} />
        <Stat label="Needs Work" value={weakest.label} sub={`${mastery[weakest.key].pct}%`} />
        <Stat label="Latest Mock" value={latestMockScore ? `${latestMockScore.total_score}` : "—"} />
        <Stat label="Target" value={`${profile?.target_score ?? 420}+`} />
        <Stat label="Curriculum Week" value={`${pos.week} / 24`} sub={monthTitles[Math.ceil(pos.week / 4) || 1]} />
        <Stat label="Mistakes Logged" value={`${attempts.filter((a) => !a.is_correct).length}`} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Items Cleared per Day</CardTitle></CardHeader>
          <CardContent className="h-56 pt-4">
            {activityData.length === 0 ? (
              <p className="flex h-full items-center justify-center px-6 text-center text-sm text-muted-foreground">
                Nothing yet. Mark a word learned or answer a practice question and it lands here.
              </p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="day" tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                  <YAxis allowDecimals={false} tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                  <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="count" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Weekly Test Performance</CardTitle></CardHeader>
          <CardContent className="h-56 pt-4">
            {testData.length === 0 ? (
              <p className="flex h-full items-center justify-center text-sm text-muted-foreground">No weekly tests taken yet.</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={testData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="week" tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                  <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                  <Line type="monotone" dataKey="score" stroke="var(--accent)" strokeWidth={2.5} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader><CardTitle>BJT Mock Score Progression</CardTitle></CardHeader>
        <CardContent className="pt-4">
          <BjtScoreTracker mocks={mockTests} target={profile?.target_score ?? 420} />
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader><CardTitle>Mastery by Area</CardTitle></CardHeader>
        <CardContent className="flex flex-col gap-3 pt-4">
          {skillMeta.map((s) => {
            const m = mastery[s.key];
            return (
              <div key={s.key} className="flex items-center gap-3">
                <span className="w-28 shrink-0 text-sm">{s.label}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-muted">
                  <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${m.pct}%` }} />
                </div>
                <span className="w-20 shrink-0 text-right text-xs text-muted-foreground tabular-nums">
                  {m.done}/{m.total}
                </span>
                <span className="w-10 shrink-0 text-right text-sm text-muted-foreground tabular-nums">{m.pct}%</span>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <XpSummary />
        <Achievements />
      </div>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="mt-1 text-lg font-semibold">{value}</p>
        {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
      </CardContent>
    </Card>
  );
}
