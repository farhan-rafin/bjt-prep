"use client";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useUserTable } from "@/lib/hooks/use-user-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BjtScoreTracker } from "@/components/bjt-score-tracker";
import {
  findCurrentPosition, completedSessionsCount, TOTAL_SESSIONS, totalStudyMinutes, TOTAL_PROGRAM_HOURS,
  vocabLearnedCount, kanjiLearnedCount, latestWeeklyTest, latestMock, daysUntil, skillProgressEstimate,
  isFinalStretch,
} from "@/lib/progress";
import { sessionTitle, sessionObjective, sessionPlannedMinutes } from "@/lib/session-helpers";
import { vocabTotalTarget, kanjiTotalTarget, bandForScore, type DurationOption } from "@/content";
import { percent, formatDuration } from "@/lib/utils";
import { ArrowRight, Flame, Sparkles } from "lucide-react";

const skillMeta = [
  { key: "listening", label: "Listening", color: "var(--color-skill-listening)" },
  { key: "reading", label: "Reading", color: "var(--color-skill-reading)" },
  { key: "vocab", label: "Business Vocabulary", color: "var(--color-skill-vocab)" },
  { key: "kanji", label: "Kanji Recognition", color: "var(--color-skill-kanji)" },
  { key: "grammar", label: "Grammar", color: "var(--color-skill-grammar)" },
  { key: "keigo", label: "Keigo", color: "var(--color-skill-keigo)" },
  { key: "business", label: "Business Situations", color: "var(--color-skill-business)" },
  { key: "bjt", label: "BJT Practice", color: "var(--color-skill-bjt)" },
] as const;

export default function DashboardPage() {
  const { profile } = useAuth();
  const { rows: sessions } = useUserTable("session_progress");
  const { rows: vocabStatus } = useUserTable("vocab_status");
  const { rows: kanjiStatus } = useUserTable("kanji_status");
  const { rows: weeklyTests } = useUserTable("weekly_tests");
  const { rows: mockTests } = useUserTable("mock_tests");
  const { rows: mistakes } = useUserTable("mistakes");
  const { rows: flashcards } = useUserTable("flashcards");

  const name = profile?.name || "there";
  const targetScore = profile?.target_score ?? 420;
  const duration = (profile?.session_duration ?? 3) as DurationOption;

  const pos = findCurrentPosition(sessions);
  const currentSession = sessions.find((s) => s.week === pos.week && s.day === pos.day);
  const plannedMinutes = currentSession?.planned_minutes ?? sessionPlannedMinutes(pos.day, duration);
  const actualMinutes = currentSession?.actual_minutes ?? 0;
  const sessionPct = percent(actualMinutes, plannedMinutes);
  const remaining = Math.max(0, plannedMinutes - actualMinutes);

  const completed = completedSessionsCount(sessions);
  const coursePct = percent(completed, TOTAL_SESSIONS);
  const studyHours = Math.round((totalStudyMinutes(sessions) / 60) * 10) / 10;
  const vocabLearned = vocabLearnedCount(vocabStatus);
  const kanjiLearned = kanjiLearnedCount(kanjiStatus);
  const latestTest = latestWeeklyTest(weeklyTests);
  const latestMockScore = latestMock(mockTests);
  const skills = skillProgressEstimate(sessions, vocabStatus, kanjiStatus);
  const examDays = daysUntil(profile?.exam_date);
  const dueFlashcards = flashcards.filter((f) => f.due_at && new Date(f.due_at) <= new Date()).length;
  const unresolvedMistakes = mistakes.filter((m) => !m.is_resolved).length;

  // perfect weeks streak: consecutive completed weeks counted back from current
  let streak = 0;
  for (let w = pos.week - 1; w >= 1; w--) {
    const weekSessions = sessions.filter((s) => s.week === w);
    if (weekSessions.length === 4 && weekSessions.every((s) => s.status === "completed")) streak++;
    else break;
  }

  const weakestSkill = skillMeta.reduce((min, s) => (skills[s.key] < skills[min.key] ? s : min), skillMeta[0]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 lg:px-8 lg:py-8">
      <div className="mb-6 flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          こんにちは、{name} <span className="align-middle">👋</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          Week {pos.week} · Day {pos.day}
          {examDays !== null && <> · {examDays >= 0 ? `${examDays} days until BJT` : "Exam date passed — update it in Settings"}</>}
          {" · "}Target: {profile?.target_level ?? "J2"} · {targetScore}+
        </p>
      </div>

      {isFinalStretch(pos.week) && (
        <Card className="mb-6 border-accent/30 bg-accent/5">
          <CardContent className="flex items-center gap-3 py-4">
            <Sparkles className="size-5 shrink-0 text-accent" />
            <p className="text-sm">
              <span className="font-semibold">Final 8 Weeks.</span> Your mistake log is now your syllabus — new
              material tapers off, timed BJT practice and mock exams take over.
            </p>
          </CardContent>
        </Card>
      )}

      <Card className="mb-6 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Continue Today&apos;s Study</p>
              <h2 className="mt-1 text-xl font-semibold">
                Week {pos.week} · Day {pos.day} — {sessionTitle(pos.week, pos.day)}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">{sessionObjective(pos.week, pos.day)}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {remaining > 0 ? `${formatDuration(remaining)} remaining` : "Ready to begin"} · {sessionPct}% complete
              </p>
              <Progress value={sessionPct} className="mt-2 max-w-xs" />
            </div>
            <Button asChild size="lg">
              <Link href={`/journey/week/${pos.week}/day/${pos.day}`}>
                {actualMinutes > 0 ? "Continue Session" : "Start Session"}
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        <StatTile label="Course progress" value={`${coursePct}%`} />
        <StatTile label="Study sessions" value={`${completed} / ${TOTAL_SESSIONS}`} />
        <StatTile label="Study time" value={`${studyHours} / ~${TOTAL_PROGRAM_HOURS} hrs`} />
        <StatTile label="Vocabulary" value={`${vocabLearned} / ${vocabTotalTarget}`} />
        <StatTile label="Kanji" value={`${kanjiLearned} / ${kanjiTotalTarget}`} />
        <StatTile
          label="Current weekly test"
          value={latestTest ? `${Math.round(latestTest.score_pct)}%` : "—"}
          hint={latestTest ? bandForScore(latestTest.score_pct).label : "Not taken yet"}
        />
        <StatTile
          label="Latest BJT mock"
          value={latestMockScore ? `${latestMockScore.total_score}` : "—"}
          hint={`Target ${targetScore}+`}
        />
        <StatTile label="Streak" value={`${streak} perfect wks`} icon={<Flame className="size-3.5 text-accent" />} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Skill Progress</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 pt-4">
            {skillMeta.map((s) => (
              <div key={s.key}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium">{s.label}</span>
                  <span className="text-muted-foreground">{skills[s.key]}%</span>
                </div>
                <Progress value={skills[s.key]} barClassName="" size="sm" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Review Weak Areas</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 pt-4">
            <p className="text-sm text-muted-foreground">
              Weakest skill right now: <span className="font-medium text-foreground">{weakestSkill.label}</span>
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
                <span>Flashcards due</span>
                <Badge variant={dueFlashcards > 0 ? "warning" : "default"}>{dueFlashcards}</Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
                <span>Unresolved mistakes</span>
                <Badge variant={unresolvedMistakes > 0 ? "danger" : "default"}>{unresolvedMistakes}</Badge>
              </div>
            </div>
            <Button variant="secondary" asChild className="mt-1">
              <Link href="/flashcards">Start Review</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>BJT Score Progress</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <BjtScoreTracker mocks={mockTests} target={targetScore} />
        </CardContent>
      </Card>
    </div>
  );
}

function StatTile({ label, value, hint, icon }: { label: string; value: string; hint?: string; icon?: React.ReactNode }) {
  return (
    <Card>
      <CardContent className="p-4">
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          {icon}
          {label}
        </p>
        <p className="mt-1 text-xl font-semibold">{value}</p>
        {hint && <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>}
      </CardContent>
    </Card>
  );
}
