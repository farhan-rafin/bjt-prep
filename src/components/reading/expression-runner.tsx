"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { JapaneseAuto } from "@/components/japanese-text";
import { SpeakButton } from "@/components/speak-button";
import { useUserTable } from "@/lib/hooks/use-user-table";
import { expressionItems, expressionGroupInfo, type ExpressionItem } from "@/content";
import { shuffle } from "@/lib/quiz-generators";
import { cn } from "@/lib/utils";
import { Check, X, ChevronRight, Lightbulb } from "lucide-react";

type Group = ExpressionItem["group"];
type Filter = Group | "all";

export function ExpressionRunner() {
  const [filter, setFilter] = React.useState<Filter>("all");
  const [items] = React.useState<ExpressionItem[]>(() => shuffle(expressionItems));
  const [index, setIndex] = React.useState(0);
  const [selected, setSelected] = React.useState<number | null>(null);
  const [score, setScore] = React.useState({ correct: 0, answered: 0 });

  const { insert: insertAttempt } = useUserTable("quiz_attempts");
  const { insert: insertMistake } = useUserTable("mistakes");

  const pool = React.useMemo(
    () => (filter === "all" ? items : items.filter((i) => i.group === filter)),
    [items, filter],
  );
  const current = pool[index];
  const revealed = selected !== null;

  function changeFilter(f: Filter) {
    setFilter(f);
    setIndex(0);
    setSelected(null);
  }

  async function choose(i: number) {
    if (revealed || !current) return;
    setSelected(i);
    const isCorrect = i === current.correctIndex;
    setScore((s) => ({ correct: s.correct + (isCorrect ? 1 : 0), answered: s.answered + 1 }));

    await insertAttempt({
      quiz_type: "expression_reading",
      quiz_id: current.group,
      question_id: current.id,
      is_correct: isCorrect,
      category: expressionGroupInfo[current.group].label,
    } as never);

    if (!isCorrect) {
      await insertMistake({
        question_type: "表現読解 — Expression reading",
        question: current.passage,
        my_answer: current.options[i],
        correct_answer: current.options[current.correctIndex],
        error_category: expressionGroupInfo[current.group].label,
        why_wrong: current.explanation,
      } as never);
    }
  }

  function next() {
    setIndex((i) => (i + 1) % pool.length);
    setSelected(null);
  }

  if (!current) {
    return <p className="py-10 text-center text-sm text-muted-foreground">No items for this filter.</p>;
  }

  const groupInfo = expressionGroupInfo[current.group];

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Select value={filter} onValueChange={(v) => changeFilter(v as Filter)}>
          <SelectTrigger className="w-auto min-w-52"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types ({expressionItems.length})</SelectItem>
            {(Object.keys(expressionGroupInfo) as Group[]).map((g) => (
              <SelectItem key={g} value={g}>{expressionGroupInfo[g].label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {score.answered > 0 && (
          <Badge variant="outline">{score.correct} / {score.answered} correct</Badge>
        )}
      </div>

      <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
        <span>Question {index + 1} of {pool.length}</span>
        <span>表現読解 · 10 on the real exam</span>
      </div>
      <Progress value={((index + 1) / pool.length) * 100} className="mb-4" />

      <Card>
        <CardContent className="p-6">
          <p className="mb-3 text-sm text-muted-foreground">{current.context}</p>

          <div className="rounded-lg bg-surface-muted p-4">
            <div className="flex items-start justify-between gap-2">
              <p className="jp text-base"><JapaneseAuto text={current.passage} /></p>
              <SpeakButton text={current.passage} />
            </div>
            {revealed && (
              <>
                <p className="mt-1 text-xs text-muted-foreground">{current.passageReading}</p>
                <p className="mt-0.5 text-xs italic text-muted-foreground/80">{current.passageMeaning}</p>
              </>
            )}
          </div>

          <div className="mt-5">
            <p className="jp text-sm font-medium">{current.question}</p>
            {revealed && (
              <>
                <p className="text-xs text-muted-foreground">{current.questionReading}</p>
                <p className="text-xs italic text-muted-foreground/80">{current.questionMeaning}</p>
              </>
            )}
          </div>

          <div className="mt-4 flex flex-col gap-2">
            {current.options.map((opt, i) => {
              const isCorrect = i === current.correctIndex;
              const isPicked = selected === i;
              return (
                <button
                  key={i}
                  onClick={() => choose(i)}
                  disabled={revealed}
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
                      <span className="mt-0.5 block text-xs italic text-muted-foreground">{current.optionMeanings[i]}</span>
                    )}
                  </span>
                  {revealed && isCorrect && <Check className="mt-0.5 size-4 shrink-0 text-success" />}
                  {revealed && isPicked && !isCorrect && <X className="mt-0.5 size-4 shrink-0 text-danger" />}
                </button>
              );
            })}
          </div>

          {revealed && (
            <div className="mt-6 border-t border-border pt-5">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Badge variant="accent">{groupInfo.label}</Badge>
                <span className="text-xs text-muted-foreground">{groupInfo.note}</span>
              </div>

              <p className="flex items-start gap-2 rounded-lg bg-accent/10 p-3 text-sm">
                <Lightbulb className="mt-0.5 size-4 shrink-0 text-accent" />
                <span><span className="font-medium">What it really means: </span>{current.realMeaning}</span>
              </p>

              <p className="mt-3 rounded-lg bg-primary/5 p-3 text-sm">
                <span className="font-medium">Why: </span>{current.explanation}
              </p>

              <Button className="mt-4 w-full" onClick={next}>
                Next question <ChevronRight className="size-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
