"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FuriganaSentence } from "@/components/japanese-text";
import { SpeakButton } from "@/components/speak-button";
import { useUserTable } from "@/lib/hooks/use-user-table";
import { longPassages, type LongPassage } from "@/content";
import { formatClock } from "@/lib/hooks/use-study-timer";
import { cn } from "@/lib/utils";
import { Check, X, ArrowLeft, Timer } from "lucide-react";

export function LongPassageRunner() {
  const [selected, setSelected] = React.useState<LongPassage | null>(null);
  const [answers, setAnswers] = React.useState<Record<string, number>>({});
  const [elapsed, setElapsed] = React.useState(0);
  const { insert: insertAttempt } = useUserTable("quiz_attempts");
  const { insert: insertMistake } = useUserTable("mistakes");

  // A simple stopwatch so reading speed is visible without imposing a countdown.
  React.useEffect(() => {
    if (!selected) return;
    const id = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, [selected]);

  function start(p: LongPassage) {
    setSelected(p);
    setAnswers({});
    setElapsed(0);
  }

  async function choose(p: LongPassage, qId: string, i: number) {
    if (answers[qId] !== undefined) return;
    setAnswers((a) => ({ ...a, [qId]: i }));
    const q = p.questions.find((x) => x.id === qId)!;
    const isCorrect = i === q.correctIndex;
    await insertAttempt({
      quiz_type: "reading_passage",
      quiz_id: p.id,
      question_id: q.id,
      is_correct: isCorrect,
      category: "General Reading",
    } as never);
    if (!isCorrect) {
      await insertMistake({
        question_type: "総合読解 — Long passage",
        question: q.question,
        my_answer: q.options[i],
        correct_answer: q.options[q.correctIndex],
        error_category: "Reading",
        why_wrong: q.explanation,
      } as never);
    }
  }

  if (!selected) {
    return (
      <div className="flex flex-col gap-2">
        <p className="mb-1 text-sm text-muted-foreground">
          Exam-length business texts with several questions each. Read the questions first, then scan —
          that's the strategy the real 総合読解 section rewards.
        </p>
        {longPassages.map((p) => (
          <Card key={p.id} className="cursor-pointer hover:border-primary/40" onClick={() => start(p)}>
            <CardContent className="flex items-center justify-between gap-3 p-4">
              <div>
                <p className="jp font-medium">{p.title}</p>
                <p className="text-xs text-muted-foreground">{p.titleReading}</p>
                <p className="text-xs italic text-muted-foreground/80">{p.titleMeaning}</p>
              </div>
              <div className="shrink-0 text-right">
                <Badge variant="outline" className="jp">{p.category}</Badge>
                <p className="mt-1 text-xs text-muted-foreground">
                  {p.questions.length} Q · target {Math.round(p.targetSeconds / 60)} min
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const answeredAll = selected.questions.every((q) => answers[q.id] !== undefined);
  const correctCount = selected.questions.filter((q) => answers[q.id] === q.correctIndex).length;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => setSelected(null)}>
          <ArrowLeft className="size-4" /> Back
        </Button>
        <span className="flex items-center gap-1.5 font-mono text-sm tabular-nums text-muted-foreground">
          <Timer className="size-3.5" />
          {formatClock(elapsed)}
          <span className="font-sans text-xs">/ target {formatClock(selected.targetSeconds)}</span>
        </span>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="mb-3 flex items-start justify-between gap-2">
            <div>
              <p className="jp font-medium">{selected.title}</p>
              <p className="text-xs text-muted-foreground">{selected.titleReading}</p>
              <p className="text-xs italic text-muted-foreground/80">{selected.titleMeaning}</p>
            </div>
            <SpeakButton text={selected.text} rate={0.9} />
          </div>

          <div className="rounded-xl border border-border p-4">
            <p className="jp whitespace-pre-line text-sm leading-relaxed">
              <FuriganaSentence text={selected.text} reading={selected.textReading} />
            </p>
          </div>

          {answeredAll && (
            <details className="mt-3">
              <summary className="cursor-pointer text-sm font-medium text-muted-foreground">
                Show full reading and translation
              </summary>
              <p className="mt-2 whitespace-pre-line text-xs text-muted-foreground">{selected.textReading}</p>
              <p className="mt-2 whitespace-pre-line text-xs italic text-muted-foreground/80">{selected.textMeaning}</p>
            </details>
          )}
        </CardContent>
      </Card>

      <div className="mt-4 flex flex-col gap-3">
        {selected.questions.map((q, qi) => {
          const picked = answers[q.id];
          const revealed = picked !== undefined;
          return (
            <Card key={q.id}>
              <CardContent className="p-5">
                <p className="jp text-sm font-medium">
                  {qi + 1}. {q.question}
                </p>
                {revealed && (
                  <>
                    <p className="text-xs text-muted-foreground">{q.questionReading}</p>
                    <p className="text-xs italic text-muted-foreground/80">{q.questionMeaning}</p>
                  </>
                )}
                <div className="mt-3 flex flex-col gap-2">
                  {q.options.map((opt, i) => {
                    const isCorrect = i === q.correctIndex;
                    const isPicked = picked === i;
                    return (
                      <button
                        key={i}
                        disabled={revealed}
                        onClick={() => choose(selected, q.id, i)}
                        className={cn(
                          "flex items-start justify-between gap-3 rounded-lg border px-4 py-2.5 text-left text-sm transition-colors",
                          !revealed && "border-border hover:bg-surface-muted",
                          revealed && isCorrect && "border-success bg-success/10",
                          revealed && isPicked && !isCorrect && "border-danger bg-danger/10",
                          revealed && !isCorrect && !isPicked && "border-border opacity-60",
                        )}
                      >
                        <span>
                          <span className="jp">{opt}</span>
                          {revealed && (
                            <span className="mt-0.5 block text-xs italic text-muted-foreground">{q.optionMeanings[i]}</span>
                          )}
                        </span>
                        {revealed && isCorrect && <Check className="mt-0.5 size-4 shrink-0 text-success" />}
                        {revealed && isPicked && !isCorrect && <X className="mt-0.5 size-4 shrink-0 text-danger" />}
                      </button>
                    );
                  })}
                </div>
                {revealed && (
                  <p className="mt-3 rounded-lg bg-primary/5 p-3 text-xs">
                    <span className="font-medium">Why: </span>{q.explanation}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {answeredAll && (
        <Card className="mt-4">
          <CardContent className="p-5 text-center">
            <p className="text-2xl font-semibold">{correctCount} / {selected.questions.length}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Read in {formatClock(elapsed)} · target {formatClock(selected.targetSeconds)}
            </p>
            <Button className="mt-3" variant="outline" onClick={() => setSelected(null)}>
              Back to passages
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
