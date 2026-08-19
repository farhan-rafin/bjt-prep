"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SpeakButton } from "@/components/speak-button";
import { useSpeech } from "@/lib/hooks/use-speech";
import { useUserTable } from "@/lib/hooks/use-user-table";
import { visualItems, visualKindLabel, type VisualItem } from "@/content";
import { cn } from "@/lib/utils";
import { Check, X, Volume2, ChevronRight } from "lucide-react";

export function VisualRunner() {
  const [index, setIndex] = React.useState(0);
  const [heardAudio, setHeardAudio] = React.useState(false);
  const [answer, setAnswer] = React.useState<number | null>(null);
  const [score, setScore] = React.useState({ correct: 0, answered: 0 });
  const { speak } = useSpeech();
  const { insert: insertAttempt } = useUserTable("quiz_attempts");
  const { insert: insertMistake } = useUserTable("mistakes");

  const current = visualItems[index];

  async function choose(i: number) {
    if (answer !== null) return;
    setAnswer(i);
    const isCorrect = i === current.correctIndex;
    setScore((s) => ({ correct: s.correct + (isCorrect ? 1 : 0), answered: s.answered + 1 }));
    await insertAttempt({
      quiz_type: "visual_item",
      quiz_id: current.kind,
      question_id: current.id,
      is_correct: isCorrect,
      category: "Situational Understanding (visual)",
    } as never);
    if (!isCorrect) {
      await insertMistake({
        question_type: "場面把握（画像あり）",
        question: `${current.heading} — ${current.question}`,
        my_answer: current.options[i],
        correct_answer: current.options[current.correctIndex],
        error_category: "Listening & Reading",
        why_wrong: current.explanation,
      } as never);
    }
  }

  function next() {
    setIndex((i) => (i + 1) % visualItems.length);
    setHeardAudio(false);
    setAnswer(null);
  }

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs text-muted-foreground">
          Question {index + 1} of {visualItems.length} · 場面把握（画像あり） · 5 on the real exam
        </span>
        {score.answered > 0 && <Badge variant="outline">{score.correct} / {score.answered} correct</Badge>}
      </div>

      <Card>
        <CardContent className="p-6">
          <Badge variant="outline" className="mb-3">{visualKindLabel[current.kind]}</Badge>

          {/* The "image": a notice rendered in the page, styled to read like posted signage. */}
          <div className="overflow-hidden rounded-xl border-2 border-border bg-surface-muted">
            <div className="border-b-2 border-border bg-surface px-4 py-3 text-center">
              <p className="jp text-base font-semibold">{current.heading}</p>
              {answer !== null && (
                <>
                  <p className="text-xs text-muted-foreground">{current.headingReading}</p>
                  <p className="text-xs italic text-muted-foreground/80">{current.headingMeaning}</p>
                </>
              )}
            </div>
            <div className="divide-y divide-border">
              {current.rows.map((r, i) => (
                <div key={i} className="flex items-center justify-between gap-4 px-4 py-2.5">
                  <span className="jp text-sm font-medium">{r.label}</span>
                  <span className="jp text-sm text-right">{r.value}</span>
                </div>
              ))}
            </div>
            {current.footnote && (
              <div className="border-t-2 border-dashed border-border px-4 py-2.5">
                <p className="jp text-xs">{current.footnote}</p>
                {answer !== null && (
                  <>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">{current.footnoteReading}</p>
                    <p className="text-[11px] italic text-muted-foreground/80">{current.footnoteMeaning}</p>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="mt-4 rounded-xl border border-border p-4">
            <p className="mb-2 text-xs font-medium text-muted-foreground">Audio</p>
            {!heardAudio ? (
              <Button size="sm" onClick={() => { speak(current.audioScript, { rate: 0.85 }); setHeardAudio(true); }}>
                <Volume2 className="size-3.5" /> Play audio
              </Button>
            ) : (
              <div className="flex items-start gap-1.5">
                <div className="flex-1">
                  <p className="jp text-sm">{current.audioScript}</p>
                  {answer !== null && (
                    <>
                      <p className="mt-1 text-xs text-muted-foreground">{current.audioReading}</p>
                      <p className="mt-0.5 text-xs italic text-muted-foreground/80">{current.audioMeaning}</p>
                    </>
                  )}
                </div>
                <SpeakButton text={current.audioScript} rate={0.85} />
              </div>
            )}
          </div>

          {heardAudio && (
            <div className="mt-5">
              <p className="jp text-sm font-medium">{current.question}</p>
              {answer !== null && (
                <>
                  <p className="text-xs text-muted-foreground">{current.questionReading}</p>
                  <p className="text-xs italic text-muted-foreground/80">{current.questionMeaning}</p>
                </>
              )}
              <div className="mt-3 flex flex-col gap-2">
                {current.options.map((opt, i) => {
                  const isCorrect = i === current.correctIndex;
                  const isPicked = i === answer;
                  return (
                    <button
                      key={i}
                      disabled={answer !== null}
                      onClick={() => choose(i)}
                      className={cn(
                        "flex items-start justify-between gap-3 rounded-lg border px-4 py-2.5 text-left text-sm transition-colors",
                        answer === null && "border-border hover:bg-surface-muted",
                        answer !== null && isCorrect && "border-success bg-success/10",
                        answer !== null && isPicked && !isCorrect && "border-danger bg-danger/10",
                        answer !== null && !isPicked && !isCorrect && "border-border opacity-60",
                      )}
                    >
                      <span>
                        <span className="jp">{opt}</span>
                        {answer !== null && (
                          <span className="mt-0.5 block text-xs italic text-muted-foreground">{current.optionMeanings[i]}</span>
                        )}
                      </span>
                      {answer !== null && isCorrect && <Check className="mt-0.5 size-4 shrink-0 text-success" />}
                      {answer !== null && isPicked && !isCorrect && <X className="mt-0.5 size-4 shrink-0 text-danger" />}
                    </button>
                  );
                })}
              </div>

              {answer !== null && (
                <>
                  <p className="mt-4 rounded-lg bg-primary/5 p-3 text-sm">
                    <span className="font-medium">Why: </span>{current.explanation}
                  </p>
                  <Button className="mt-4 w-full" onClick={next}>
                    Next question <ChevronRight className="size-4" />
                  </Button>
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
