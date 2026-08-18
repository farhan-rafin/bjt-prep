"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { JapaneseAuto } from "@/components/japanese-text";
import { useStudyTimer, formatClock } from "@/lib/hooks/use-study-timer";
import { buildMockExam, mockLengthConfig, type MockLength } from "@/lib/mock-exam";
import { useUserTable } from "@/lib/hooks/use-user-table";
import type { QuizItem } from "@/components/quiz/quiz-shell";
import { cn } from "@/lib/utils";
import { Check, X, Flag } from "lucide-react";
import { toast } from "sonner";

export function TimedMockRunner({ length, onExit }: { length: MockLength; onExit: () => void }) {
  const config = mockLengthConfig[length];
  const [items] = React.useState<QuizItem[]>(() => buildMockExam(length));
  const [index, setIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<(number | null)[]>(() => items.map(() => null));
  const [finished, setFinished] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const timer = useStudyTimer(config.minutes);
  const { insert: insertQuizAttempt } = useUserTable("quiz_attempts");
  const { insert: insertMistake } = useUserTable("mistakes");
  const { insert: insertMock } = useUserTable("mock_tests");

  React.useEffect(() => {
    timer.start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (timer.justFinished && !finished) {
      toast.warning("Time's up — submitting your mock exam.");
      finish();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer.justFinished]);

  function select(i: number) {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = i;
      return next;
    });
  }

  function next() {
    if (index < items.length - 1) setIndex((i) => i + 1);
    else finish();
  }

  async function finish() {
    if (finished) return;
    timer.pause();
    setFinished(true);
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const ans = answers[i];
      const isCorrect = ans === item.correctIndex;
      await insertQuizAttempt({
        quiz_type: "mock_exam", quiz_id: item.id, question_id: item.id,
        is_correct: isCorrect, category: item.category ?? null,
      } as never);
      if (ans !== null && !isCorrect) {
        await insertMistake({
          question_type: "Mock exam", question: item.prompt,
          my_answer: item.options[ans], correct_answer: item.options[item.correctIndex],
          error_category: item.category ?? "Careless mistake", why_wrong: item.explanation,
        } as never);
      }
    }
  }

  const correctCount = items.filter((it, i) => answers[i] === it.correctIndex).length;
  const answeredCount = answers.filter((a) => a !== null).length;
  const pct = Math.round((correctCount / items.length) * 100);

  async function saveAsMock() {
    await insertMock({
      score_type: "raw_percentage",
      total_score: pct,
      time_taken_minutes: Math.round(timer.elapsedSec / 60),
      notes: `Timed mock (${config.label}) — ${correctCount}/${items.length} correct.`,
    } as never);
    setSaved(true);
    toast.success("Saved to Mock Tests");
  }

  if (finished) {
    const wrongItems = items.map((it, i) => ({ item: it, answer: answers[i] })).filter((x) => x.answer !== x.item.correctIndex);
    return (
      <div>
        <Card>
          <CardContent className="flex flex-col items-center gap-2 p-8 text-center">
            <p className="text-4xl font-semibold">{pct}%</p>
            <p className="text-sm text-muted-foreground">
              {correctCount} / {items.length} correct · {answeredCount} answered · {formatClock(timer.elapsedSec)} used
            </p>
            <div className="mt-3 flex gap-2">
              <Button onClick={saveAsMock} disabled={saved}>
                <Flag className="size-4" /> {saved ? "Saved to Mock Tests" : "Save as Mock Test"}
              </Button>
              <Button variant="outline" onClick={onExit}>Back</Button>
            </div>
          </CardContent>
        </Card>

        {wrongItems.length > 0 && (
          <div className="mt-5">
            <h2 className="mb-2 text-sm font-medium text-muted-foreground">Review mistakes ({wrongItems.length})</h2>
            <div className="flex flex-col gap-2">
              {wrongItems.map(({ item, answer }, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <p className="mb-1 text-sm font-medium"><JapaneseAuto text={item.prompt} /></p>
                    <p className="text-xs text-danger">Your answer: {answer !== null ? item.options[answer] : "(no answer)"}</p>
                    <p className="text-xs text-success">Correct: {item.options[item.correctIndex]}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{item.explanation}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  const current = items[index];
  const selected = answers[index];

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <Badge variant="outline">Question {index + 1} / {items.length}</Badge>
        <span className={cn("font-mono text-lg tabular-nums", timer.remainingSec < 60 && "text-danger animate-pulse")}>
          {formatClock(timer.remainingSec)}
        </span>
      </div>
      <Progress value={(index / items.length) * 100} className="mb-4" />
      <Card>
        <CardContent className="p-6">
          {current.category && <Badge variant="outline" className="mb-2">{current.category}</Badge>}
          <p className="mb-4 whitespace-pre-line text-base font-medium"><JapaneseAuto text={current.prompt} /></p>
          <div className="flex flex-col gap-2">
            {current.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => select(i)}
                className={cn(
                  "flex items-center justify-between rounded-lg border px-4 py-2.5 text-left text-sm transition-colors",
                  selected === i ? "border-primary bg-primary/5" : "border-border hover:bg-surface-muted",
                )}
              >
                <JapaneseAuto text={opt} />
              </button>
            ))}
          </div>
          <div className="mt-6 flex justify-between">
            <Button variant="ghost" onClick={onExit}>
              <X className="size-4" /> Exit
            </Button>
            <Button onClick={next}>
              {index < items.length - 1 ? "Next" : "Finish"} <Check className="size-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
