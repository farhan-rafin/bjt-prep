"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useStudyTimer, formatClock } from "@/lib/hooks/use-study-timer";
import { useSpeech } from "@/lib/hooks/use-speech";
import { useUserTable } from "@/lib/hooks/use-user-table";
import {
  buildFullMock, buildSection, sectionSpecs, estimateBjtScore, mockScoreCaveat,
  bjtLevelForScore, TOTAL_MOCK_QUESTIONS, TOTAL_MOCK_MINUTES,
  type MockQuestion, type MockSection,
} from "@/lib/mock-exam";
import { cn } from "@/lib/utils";
import { Volume2, Flag, X, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

export type MockScope = "full" | MockSection;

export function TimedMockRunner({ scope, onExit }: { scope: MockScope; onExit: () => void }) {
  const [items] = React.useState<MockQuestion[]>(() =>
    scope === "full" ? buildFullMock() : buildSection(scope),
  );
  const minutes = React.useMemo(
    () => (scope === "full" ? TOTAL_MOCK_MINUTES : sectionSpecs.find((s) => s.section === scope)!.minutes),
    [scope],
  );

  const [index, setIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<(number | null)[]>(() => items.map(() => null));
  const [finished, setFinished] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const [playedFor, setPlayedFor] = React.useState<Set<number>>(new Set());

  const timer = useStudyTimer(minutes);
  const { speakSequence, speaking } = useSpeech();
  const { insert: insertQuizAttempt } = useUserTable("quiz_attempts");
  const { insert: insertMistake } = useUserTable("mistakes");
  const { insert: insertMock } = useUserTable("mock_tests");

  const finishRef = React.useRef<() => void>(() => {});

  React.useEffect(() => {
    timer.start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (timer.justFinished && !finished) {
      toast.warning("Time's up — submitting.");
      finishRef.current();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer.justFinished]);

  const current = items[index];
  const correctCount = items.filter((it, i) => answers[i] === it.correctIndex).length;
  const answeredCount = answers.filter((a) => a !== null).length;
  const estimated = estimateBjtScore(correctCount, items.length);

  function select(i: number) {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = i;
      return next;
    });
  }

  function playAudio() {
    if (!current.audioLines) return;
    setPlayedFor((s) => new Set(s).add(index));
    speakSequence(current.audioLines, { rate: 0.9 });
  }

  const finish = React.useCallback(async () => {
    if (finished) return;
    timer.pause();
    setFinished(true);
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const ans = answers[i];
      const isCorrect = ans === item.correctIndex;
      await insertQuizAttempt({
        quiz_type: "mock_exam", quiz_id: `section-${item.section}`, question_id: item.id,
        is_correct: isCorrect, category: item.typeJa,
      } as never);
      if (ans !== null && !isCorrect) {
        await insertMistake({
          question_type: `Mock — ${item.typeJa}`, question: item.prompt,
          my_answer: item.options[ans], correct_answer: item.options[item.correctIndex],
          error_category: item.typeJa, why_wrong: item.explanation,
        } as never);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished, items, answers, insertQuizAttempt, insertMistake, timer]);

  finishRef.current = finish;

  async function saveResult() {
    await insertMock({
      score_type: "estimated_bjt",
      total_score: estimated,
      time_taken_minutes: Math.round(timer.elapsedSec / 60),
      notes: `${scope === "full" ? "Full mock" : `Section ${scope}`} — ${correctCount}/${items.length} correct (${Math.round((correctCount / items.length) * 100)}%).`,
    } as never);
    setSaved(true);
    toast.success("Saved to Mock Tests");
  }

  /* ── Results ─────────────────────────────────────────────────────────────── */
  if (finished) {
    const band = bjtLevelForScore(estimated);
    const byType = new Map<string, { correct: number; total: number }>();
    items.forEach((it, i) => {
      const e = byType.get(it.typeJa) ?? { correct: 0, total: 0 };
      e.total++;
      if (answers[i] === it.correctIndex) e.correct++;
      byType.set(it.typeJa, e);
    });
    const wrong = items.map((it, i) => ({ it, ans: answers[i] })).filter((x) => x.ans !== x.it.correctIndex);

    return (
      <div>
        <Card>
          <CardContent className="flex flex-col items-center gap-1 p-8 text-center">
            <p className="text-5xl font-semibold">{estimated}</p>
            <Badge variant={estimated >= 420 ? "default" : "outline"}>{band.level}</Badge>
            <p className="text-xs text-muted-foreground">{band.note}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {correctCount} / {items.length} correct · {answeredCount} answered · {formatClock(timer.elapsedSec)} used
            </p>
            <p className="mt-2 max-w-md text-xs text-muted-foreground">{mockScoreCaveat}</p>
            <div className="mt-4 flex gap-2">
              <Button onClick={saveResult} disabled={saved}>
                <Flag className="size-4" /> {saved ? "Saved" : "Save result"}
              </Button>
              <Button variant="outline" onClick={onExit}>Back</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-5">
          <CardContent className="p-5">
            <p className="mb-3 text-sm font-medium">By question type</p>
            <div className="flex flex-col gap-2">
              {[...byType.entries()].map(([type, s]) => (
                <div key={type} className="flex items-center gap-3">
                  <span className="jp w-40 shrink-0 text-sm">{type}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${(s.correct / s.total) * 100}%` }} />
                  </div>
                  <span className="w-12 shrink-0 text-right text-xs tabular-nums text-muted-foreground">
                    {s.correct}/{s.total}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {wrong.length > 0 && (
          <div className="mt-5">
            <h2 className="mb-2 text-sm font-medium text-muted-foreground">Review ({wrong.length})</h2>
            <div className="flex flex-col gap-2">
              {wrong.map(({ it, ans }, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <Badge variant="outline" className="jp mb-2">{it.typeJa}</Badge>
                    {it.document && <p className="jp mb-1 whitespace-pre-line text-xs text-muted-foreground">{it.document}</p>}
                    <p className="jp mb-1 text-sm font-medium">{it.prompt}</p>
                    <p className="text-xs text-danger">Your answer: {ans !== null ? it.options[ans] : "(none)"}</p>
                    <p className="text-xs text-success">Correct: {it.options[it.correctIndex]}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{it.explanation}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  /* ── Exam in progress — deliberately bare: no readings, no glosses, no feedback ── */
  const needsAudio = !!current.audioLines;
  const hasPlayed = playedFor.has(index);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="outline">Q{index + 1} / {items.length}</Badge>
          <Badge variant="outline" className="jp">{current.typeJa}</Badge>
        </div>
        <span className={cn("font-mono text-lg tabular-nums", timer.remainingSec < 120 && "animate-pulse text-danger")}>
          {formatClock(timer.remainingSec)}
        </span>
      </div>
      <Progress value={(index / items.length) * 100} className="mb-4" />

      <Card>
        <CardContent className="p-6">
          {/* Visual notice for 場面把握（画像あり） */}
          {current.visual && (
            <div className="mb-4 overflow-hidden rounded-xl border-2 border-border bg-surface-muted">
              <div className="border-b-2 border-border bg-surface px-4 py-2.5 text-center">
                <p className="jp text-sm font-semibold">{current.visual.heading}</p>
              </div>
              <div className="divide-y divide-border">
                {current.visual.rows.map((r, i) => (
                  <div key={i} className="flex items-center justify-between gap-4 px-4 py-2">
                    <span className="jp text-sm font-medium">{r.label}</span>
                    <span className="jp text-right text-sm">{r.value}</span>
                  </div>
                ))}
              </div>
              {current.visual.footnote && (
                <div className="border-t-2 border-dashed border-border px-4 py-2">
                  <p className="jp text-xs">{current.visual.footnote}</p>
                </div>
              )}
            </div>
          )}

          {/* Table for 資料聴読解 */}
          {current.table && (
            <div className="mb-4">
              {current.document && <p className="jp mb-2 text-sm font-medium">{current.document}</p>}
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full min-w-[420px] text-sm">
                  <thead className="bg-surface-muted">
                    <tr>{current.table.headers.map((h) => <th key={h} className="jp px-3 py-2 text-left font-medium">{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {current.table.rows.map((row, i) => (
                      <tr key={i} className="border-t border-border">
                        {row.map((cell, j) => <td key={j} className="jp px-3 py-2">{cell}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Document body for 総合聴読解 / 表現読解 / 総合読解 */}
          {current.document && !current.table && (
            <div className="mb-4 rounded-xl border border-border p-4">
              <p className="jp whitespace-pre-line text-sm leading-relaxed">{current.document}</p>
            </div>
          )}

          {needsAudio && (
            <div className="mb-4 flex flex-col items-center gap-1.5 rounded-xl border border-dashed border-border py-5">
              <Button size="sm" onClick={playAudio} disabled={speaking}>
                <Volume2 className="size-4" /> {speaking ? "Playing…" : hasPlayed ? "Play again" : "Play audio"}
              </Button>
              {!hasPlayed && <p className="text-xs text-muted-foreground">Play the audio to hear the question</p>}
            </div>
          )}

          <p className="jp mb-4 whitespace-pre-line text-base font-medium">{current.prompt}</p>

          <div className="flex flex-col gap-2">
            {current.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => select(i)}
                className={cn(
                  "jp rounded-lg border px-4 py-2.5 text-left text-sm transition-colors",
                  answers[index] === i ? "border-primary bg-primary/5" : "border-border hover:bg-surface-muted",
                )}
              >
                {opt}
              </button>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between gap-2">
            <Button variant="ghost" size="sm" onClick={onExit}>
              <X className="size-4" /> Quit
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={index === 0} onClick={() => setIndex((i) => i - 1)}>
                <ChevronLeft className="size-4" /> Back
              </Button>
              {index < items.length - 1 ? (
                <Button size="sm" onClick={() => setIndex((i) => i + 1)}>
                  Next <ChevronRight className="size-4" />
                </Button>
              ) : (
                <Button size="sm" onClick={finish}>Finish</Button>
              )}
            </div>
          </div>

          <p className="mt-3 text-center text-xs text-muted-foreground">
            {answeredCount} of {items.length} answered · answers are revealed only at the end
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export { TOTAL_MOCK_QUESTIONS };
