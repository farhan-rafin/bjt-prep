"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUserTable } from "@/lib/hooks/use-user-table";
import { readingPassages } from "@/content";
import { formatClock, useStudyTimer } from "@/lib/hooks/use-study-timer";
import { JapaneseAuto } from "@/components/japanese-text";
import { Eye, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ReadingPage() {
  const { rows: timings, insert } = useUserTable("reading_timings");
  const [selected, setSelected] = React.useState<(typeof readingPassages)[number] | null>(null);
  const [phase, setPhase] = React.useState<"question" | "reading" | "answering" | "result">("question");
  const [answer, setAnswer] = React.useState<number | null>(null);
  const timer = useStudyTimer(999);

  function start(p: (typeof readingPassages)[number]) {
    setSelected(p);
    setPhase("question");
    setAnswer(null);
    timer.reset();
  }

  function beginReading() {
    setPhase("reading");
    timer.start();
  }

  function submitAnswer(i: number) {
    setAnswer(i);
    timer.pause();
    setPhase("result");
    if (selected) {
      const seconds = timer.elapsedSec;
      const words = selected.text.length;
      insert({
        passage_id: selected.id,
        completion_seconds: seconds,
        accuracy_pct: i === selected.correctIndex ? 100 : 0,
        words_per_minute: Math.round((words / seconds) * 60),
      } as never);
    }
  }

  const previousBest = selected
    ? timings.filter((t) => t.passage_id === selected.id).sort((a, b) => a.completion_seconds - b.completion_seconds)[0]
    : null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 lg:py-10">
      <h1 className="text-2xl font-semibold">Reading Center</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Question first → scan → answer. Trains the exact strategy the Reading section rewards.
      </p>

      {!selected ? (
        <div className="mt-5 flex flex-col gap-2">
          {readingPassages.map((p) => (
            <Card key={p.id} className="cursor-pointer hover:border-primary/40" onClick={() => start(p)}>
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <p className="jp font-medium">{p.title}</p>
                  <Badge variant="outline" className="mt-1">{p.category}</Badge>
                </div>
                <Badge variant="accent">PRACTICE</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="mt-5">
          <CardContent className="p-6">
            {phase === "question" && (
              <>
                <p className="mb-3 text-xs font-medium uppercase text-muted-foreground">Read the question first</p>
                <p className="mb-6 text-lg font-medium"><JapaneseAuto text={selected.question} /></p>
                <Button onClick={beginReading}>
                  <Eye className="size-4" /> Start Timed Reading
                </Button>
              </>
            )}
            {phase === "reading" && (
              <>
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-xl tabular-nums">{formatClock(timer.elapsedSec)}</span>
                  <Badge variant="outline">Question: {selected.question}</Badge>
                </div>
                <p className="jp mb-1 whitespace-pre-line text-base leading-relaxed">{selected.text}</p>
                <p className="jp mb-6 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">{selected.textReading}</p>
                <p className="mb-2 text-sm font-medium"><JapaneseAuto text={selected.question} /></p>
                <div className="flex flex-col gap-2">
                  {selected.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => submitAnswer(i)}
                      className="rounded-lg border border-border px-4 py-2.5 text-left text-sm hover:bg-surface-muted"
                    >
                      <JapaneseAuto text={opt} />
                    </button>
                  ))}
                </div>
              </>
            )}
            {phase === "result" && answer !== null && (
              <div>
                <div className={cn("mb-4 flex items-center gap-2 rounded-lg border p-3", answer === selected.correctIndex ? "border-success/30 bg-success/5" : "border-danger/30 bg-danger/5")}>
                  {answer === selected.correctIndex ? <Check className="size-5 text-success" /> : <X className="size-5 text-danger" />}
                  <span className="text-sm font-medium">
                    {answer === selected.correctIndex ? "Correct" : `Correct answer: ${selected.options[selected.correctIndex]}`}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg border border-border p-3">
                    <p className="text-muted-foreground">Completion time</p>
                    <p className="text-lg font-semibold">{formatClock(timer.elapsedSec)}</p>
                  </div>
                  <div className="rounded-lg border border-border p-3">
                    <p className="text-muted-foreground">Previous best</p>
                    <p className="text-lg font-semibold">{previousBest ? formatClock(previousBest.completion_seconds) : "—"}</p>
                  </div>
                </div>
                <Button variant="outline" className="mt-4" onClick={() => setSelected(null)}>
                  Back to passages
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
