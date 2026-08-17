"use client";
import * as React from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";
import { useUserTable } from "@/lib/hooks/use-user-table";
import { BjtScoreTracker } from "@/components/bjt-score-tracker";
import {
  skillProgressEstimate, latestMock, findCurrentPosition, courseProgressPct,
} from "@/lib/progress";
import { weeksForMonth, monthTitles } from "@/content";

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
  const { rows: studyLogs } = useUserTable("study_logs");
  const { rows: weeklyTests } = useUserTable("weekly_tests");
  const { rows: mockTests } = useUserTable("mock_tests");
  const { rows: vocabStatus } = useUserTable("vocab_status");
  const { rows: kanjiStatus } = useUserTable("kanji_status");

  const pos = findCurrentPosition(sessions);
  const skills = skillProgressEstimate(sessions, vocabStatus, kanjiStatus);
  const strongest = skillMeta.reduce((max, s) => (skills[s.key] > skills[max.key] ? s : max), skillMeta[0]);
  const weakest = skillMeta.reduce((min, s) => (skills[s.key] < skills[min.key] ? s : min), skillMeta[0]);
  const latestMockScore = latestMock(mockTests);

  const weekTimeData = Array.from({ length: 24 }, (_, i) => {
    const week = i + 1;
    const minutes = studyLogs.filter((l) => l.week === week).reduce((s, l) => s + l.minutes, 0);
    return { week: `W${week}`, minutes };
  }).filter((d, i) => i < pos.week + 1);

  const testData = [...weeklyTests].sort((a, b) => a.week - b.week).map((t) => ({ week: `W${t.week}`, score: Math.round(t.score_pct) }));

  const thisWeekSessions = sessions.filter((s) => s.week === pos.week && s.status === "completed").length;
  const thisWeekMinutes = studyLogs.filter((l) => l.week === pos.week).reduce((s, l) => s + l.minutes, 0);

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 lg:py-10">
      <h1 className="text-2xl font-semibold">Progress</h1>
      <p className="mt-1 text-sm text-muted-foreground">Month {weeksForMonth(Math.ceil(pos.week / 4)).length ? Math.ceil(pos.week / 4) : 1}: {monthTitles[Math.ceil(pos.week / 4) || 1]}</p>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="This Week" value={`${thisWeekSessions} / 4 sessions`} />
        <Stat label="Study Hours (wk)" value={`${Math.round((thisWeekMinutes / 60) * 10) / 10}h`} />
        <Stat label="Strongest Skill" value={strongest.label} />
        <Stat label="Weakest Skill" value={weakest.label} />
        <Stat label="Course Progress" value={`${courseProgressPct(sessions)}%`} />
        <Stat label="Current BJT Mock" value={latestMockScore ? `${latestMockScore.total_score}` : "—"} />
        <Stat label="Target" value={`${profile?.target_score ?? 420}+`} />
        <Stat label="Week" value={`${pos.week} / 24`} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Weekly Study Time</CardTitle></CardHeader>
          <CardContent className="h-56 pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weekTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="week" tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                <YAxis tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="minutes" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
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
        <CardHeader><CardTitle>Skill Breakdown</CardTitle></CardHeader>
        <CardContent className="flex flex-col gap-3 pt-4">
          {skillMeta.map((s) => (
            <div key={s.key} className="flex items-center gap-3">
              <span className="w-32 shrink-0 text-sm">{s.label}</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-muted">
                <div className="h-full rounded-full bg-primary" style={{ width: `${skills[s.key]}%` }} />
              </div>
              <span className="w-10 shrink-0 text-right text-sm text-muted-foreground">{skills[s.key]}%</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="mt-1 text-lg font-semibold">{value}</p>
      </CardContent>
    </Card>
  );
}
