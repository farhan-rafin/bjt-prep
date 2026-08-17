import { roadmap, vocabTotalTarget, kanjiTotalTarget } from "@/content";
import type { Tables } from "@/lib/supabase/database.types";
import { percent } from "@/lib/utils";

export type SessionProgressRow = Tables<"session_progress">;
export type VocabStatusRow = Tables<"vocab_status">;
export type KanjiStatusRow = Tables<"kanji_status">;
export type WeeklyTestRow = Tables<"weekly_tests">;
export type MockTestRow = Tables<"mock_tests">;

export const TOTAL_SESSIONS = 24 * 4;
export const TOTAL_PROGRAM_HOURS = 312; // Source: Part 1 — recommended 3h x 4 days x 24 weeks

export function findCurrentPosition(sessions: SessionProgressRow[]) {
  for (let week = 1; week <= 24; week++) {
    for (let day = 1; day <= 4; day++) {
      const s = sessions.find((x) => x.week === week && x.day === day);
      if (!s || s.status !== "completed") {
        return { week, day: day as 1 | 2 | 3 | 4 };
      }
    }
  }
  return { week: 24, day: 4 as const };
}

export function completedSessionsCount(sessions: SessionProgressRow[]) {
  return sessions.filter((s) => s.status === "completed").length;
}

export function totalStudyMinutes(sessions: SessionProgressRow[]) {
  return sessions.reduce((sum, s) => sum + (s.actual_minutes ?? 0), 0);
}

export function courseProgressPct(sessions: SessionProgressRow[]) {
  return percent(completedSessionsCount(sessions), TOTAL_SESSIONS);
}

export function vocabLearnedCount(vocabStatus: VocabStatusRow[]) {
  return vocabStatus.filter((v) => v.status === "learned").length;
}

export function kanjiLearnedCount(kanjiStatus: KanjiStatusRow[]) {
  return kanjiStatus.filter((k) => k.status === "learned").length;
}

export function latestWeeklyTest(tests: WeeklyTestRow[]) {
  if (tests.length === 0) return null;
  return [...tests].sort((a, b) => b.week - a.week)[0];
}

export function latestMock(mocks: MockTestRow[]) {
  if (mocks.length === 0) return null;
  return [...mocks].sort((a, b) => new Date(b.test_date).getTime() - new Date(a.test_date).getTime())[0];
}

export function weekStatus(week: number, sessions: SessionProgressRow[]): "completed" | "in_progress" | "upcoming" {
  const weekSessions = sessions.filter((s) => s.week === week);
  if (weekSessions.length === 4 && weekSessions.every((s) => s.status === "completed")) return "completed";
  if (weekSessions.some((s) => s.status === "completed" || s.status === "in_progress")) return "in_progress";
  return "upcoming";
}

export function daysUntil(dateStr: string | null | undefined) {
  if (!dateStr) return null;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - now.getTime()) / 86400000);
}

export function paceStatus(sessions: SessionProgressRow[], examDate: string | null | undefined) {
  const days = daysUntil(examDate);
  if (days === null) return "on_track" as const;
  const totalProgramDays = 24 * 7;
  const daysElapsed = totalProgramDays - days;
  const expectedSessions = Math.max(0, Math.min(TOTAL_SESSIONS, Math.round((daysElapsed / totalProgramDays) * TOTAL_SESSIONS)));
  const actual = completedSessionsCount(sessions);
  const diff = actual - expectedSessions;
  if (diff >= 4) return "ahead" as const;
  if (diff >= -3) return "on_track" as const;
  if (diff >= -8) return "slightly_behind" as const;
  return "behind" as const;
}

export const paceLabels: Record<ReturnType<typeof paceStatus>, string> = {
  ahead: "Ahead",
  on_track: "On Track",
  slightly_behind: "Slightly Behind",
  behind: "Behind",
};

export function monthFor(week: number) {
  return roadmap.find((w) => w.week === week)?.month ?? Math.ceil(week / 4);
}

export function skillProgressEstimate(
  sessions: SessionProgressRow[],
  vocabStatus: VocabStatusRow[],
  kanjiStatus: KanjiStatusRow[],
) {
  const coursePct = courseProgressPct(sessions);
  return {
    listening: coursePct,
    reading: coursePct,
    vocab: percent(vocabLearnedCount(vocabStatus), vocabTotalTarget),
    kanji: percent(kanjiLearnedCount(kanjiStatus), kanjiTotalTarget),
    grammar: coursePct,
    keigo: coursePct,
    business: coursePct,
    bjt: coursePct,
  };
}

export function isFinalStretch(week: number) {
  return week >= 17;
}

export function isFinal30Days(examDate: string | null | undefined) {
  const d = daysUntil(examDate);
  return d !== null && d <= 30 && d >= 0;
}
