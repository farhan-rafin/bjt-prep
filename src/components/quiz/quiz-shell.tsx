"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Check, X, RotateCcw } from "lucide-react";
import { useUserTable } from "@/lib/hooks/use-user-table";

export interface QuizItem {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category?: string;
}

export function QuizShell({
  items,
  quizType,
  onFinish,
  week,
}: {
  items: QuizItem[];
  quizType: string;
  onFinish?: (correct: number, total: number) => void;
  week?: number;
}) {
  const [index, setIndex] = React.useState(0);
  const [selected, setSelected] = React.useState<number | null>(null);
  const [submitted, setSubmitted] = React.useState(false);
  const [correctCount, setCorrectCount] = React.useState(0);
  const [done, setDone] = React.useState(false);
  const { insert: insertAttempt } = useUserTable("quiz_attempts");
  const { insert: insertMistake } = useUserTable("mistakes");

  const item = items[index];

  async function submit() {
    if (selected === null) return;
    setSubmitted(true);
    const isCorrect = selected === item.correctIndex;
    if (isCorrect) setCorrectCount((c) => c + 1);
    await insertAttempt({
      quiz_type: quizType,
      quiz_id: item.id,
      question_id: item.id,
      is_correct: isCorrect,
      week: week ?? null,
      category: item.category ?? null,
    } as never);
    if (!isCorrect) {
      await insertMistake({
        week: week ?? null,
        question_type: quizType,
        question: item.prompt,
        my_answer: item.options[selected],
        correct_answer: item.options[item.correctIndex],
        error_category: item.category ?? "Careless mistake",
        why_wrong: item.explanation,
      } as never);
    }
  }

  function next() {
    if (index < items.length - 1) {
      setIndex((i) => i + 1);
      setSelected(null);
      setSubmitted(false);
    } else {
      setDone(true);
      onFinish?.(correctCount, items.length);
    }
  }

  function restart() {
    setIndex(0);
    setSelected(null);
    setSubmitted(false);
    setCorrectCount(0);
    setDone(false);
  }

  if (items.length === 0) {
    return <p className="py-10 text-center text-sm text-muted-foreground">No questions available yet.</p>;
  }

  if (done) {
    const pct = Math.round((correctCount / items.length) * 100);
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-3 p-8 text-center">
          <p className="text-3xl font-semibold">{pct}%</p>
          <p className="text-sm text-muted-foreground">
            {correctCount} / {items.length} correct
          </p>
          <Button onClick={restart} variant="outline">
            <RotateCcw className="size-4" /> Retake
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <Progress value={((index + (submitted ? 1 : 0)) / items.length) * 100} className="mb-4" />
      <Card>
        <CardContent className="p-6">
          <p className="mb-1 text-xs text-muted-foreground">
            Question {index + 1} / {items.length}
          </p>
          <p className="jp mb-4 whitespace-pre-line text-base font-medium">{item.prompt}</p>
          <div className="flex flex-col gap-2">
            {item.options.map((opt, i) => {
              const isCorrect = i === item.correctIndex;
              const isSelected = i === selected;
              return (
                <button
                  key={i}
                  disabled={submitted}
                  onClick={() => setSelected(i)}
                  className={cn(
                    "jp flex items-center justify-between rounded-lg border px-4 py-2.5 text-left text-sm transition-colors",
                    !submitted && isSelected && "border-primary bg-primary/5",
                    !submitted && !isSelected && "border-border hover:bg-surface-muted",
                    submitted && isCorrect && "border-success bg-success/10",
                    submitted && isSelected && !isCorrect && "border-danger bg-danger/10",
                    submitted && !isSelected && !isCorrect && "border-border opacity-60",
                  )}
                >
                  {opt}
                  {submitted && isCorrect && <Check className="size-4 text-success" />}
                  {submitted && isSelected && !isCorrect && <X className="size-4 text-danger" />}
                </button>
              );
            })}
          </div>
          {submitted && (
            <div className={cn("mt-4 rounded-lg border p-3 text-sm", selected === item.correctIndex ? "border-success/30 bg-success/5" : "border-danger/30 bg-danger/5")}>
              <p className="font-medium">{selected === item.correctIndex ? "✓ Correct" : "Not quite"}</p>
              <p className="mt-1 text-muted-foreground">{item.explanation}</p>
            </div>
          )}
          <div className="mt-5 flex justify-end">
            {!submitted ? (
              <Button onClick={submit} disabled={selected === null}>
                Submit
              </Button>
            ) : (
              <Button onClick={next}>{index < items.length - 1 ? "Next" : "Finish"}</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
