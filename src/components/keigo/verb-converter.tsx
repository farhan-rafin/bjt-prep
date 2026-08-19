"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SpeakButton } from "@/components/speak-button";
import { useUserTable } from "@/lib/hooks/use-user-table";
import { keigoVerbPairs, keigoRegisterInfo, pairsWith, type KeigoRegister, type KeigoVerbPair } from "@/content";
import { shuffle, pickDistractors } from "@/lib/quiz-generators";
import { cn } from "@/lib/utils";
import { Check, X, ChevronRight, ArrowUp, ArrowDown } from "lucide-react";

interface DrillQuestion {
  pair: KeigoVerbPair;
  register: KeigoRegister;
  answer: string;
  options: string[];
  correctIndex: number;
}

/** Builds one conversion question: given a plain verb and a target register, pick the right form. */
function buildQuestion(): DrillQuestion {
  const register: KeigoRegister = Math.random() < 0.5 ? "sonkeigo" : "kenjougo";
  const eligible = pairsWith(register);
  const pair = eligible[Math.floor(Math.random() * eligible.length)];
  const answer = (register === "sonkeigo" ? pair.sonkeigo : pair.kenjougo)!;

  // Distractors are drawn from BOTH registers so the wrong-direction form is a live trap —
  // exactly how the real 語彙・文法 section builds its options.
  const allForms = keigoVerbPairs.flatMap((p) => [p.sonkeigo, p.kenjougo].filter(Boolean) as string[]);
  const options = shuffle([answer, ...pickDistractors(allForms, answer, 3)]);
  return { pair, register, answer, options, correctIndex: options.indexOf(answer) };
}

export function KeigoVerbConverter() {
  const [q, setQ] = React.useState<DrillQuestion>(() => buildQuestion());
  const [selected, setSelected] = React.useState<number | null>(null);
  const [score, setScore] = React.useState({ correct: 0, answered: 0 });
  const { insert: insertAttempt } = useUserTable("quiz_attempts");
  const { insert: insertMistake } = useUserTable("mistakes");

  const revealed = selected !== null;
  const info = keigoRegisterInfo[q.register];

  async function choose(i: number) {
    if (revealed) return;
    setSelected(i);
    const isCorrect = i === q.correctIndex;
    setScore((s) => ({ correct: s.correct + (isCorrect ? 1 : 0), answered: s.answered + 1 }));

    await insertAttempt({
      quiz_type: "keigo_verbs",
      quiz_id: q.register,
      question_id: `${q.pair.id}-${q.register}`,
      is_correct: isCorrect,
      category: `Keigo — ${info.en}`,
    } as never);

    if (!isCorrect) {
      await insertMistake({
        question_type: `敬語変換 — ${info.ja}`,
        question: `${q.pair.plain} → ${info.ja}?`,
        my_answer: q.options[i],
        correct_answer: q.answer,
        error_category: "Keigo",
        why_wrong: q.pair.note,
      } as never);
    }
  }

  function next() {
    setQ(buildQuestion());
    setSelected(null);
  }

  const totalConvertible = keigoVerbPairs.length * 2 - keigoVerbPairs.filter((p) => !p.sonkeigo || !p.kenjougo).length;

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs text-muted-foreground">{totalConvertible} conversions in the deck</p>
        {score.answered > 0 && <Badge variant="outline">{score.correct} / {score.answered} correct</Badge>}
      </div>
      <Progress value={score.answered ? (score.correct / score.answered) * 100 : 0} className="mb-4" />

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-3 text-center">
            <Badge
              variant={q.register === "sonkeigo" ? "default" : "accent"}
              className="gap-1"
            >
              {q.register === "sonkeigo" ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />}
              {info.ja} · {info.en}
            </Badge>
            <p className="text-xs text-muted-foreground">{info.rule}</p>

            <div className="mt-2">
              <p className="jp text-3xl font-semibold">{q.pair.plain}</p>
              <p className="mt-1 text-sm text-muted-foreground">{q.pair.plainReading}</p>
              <p className="text-sm italic text-muted-foreground/80">{q.pair.meaning}</p>
            </div>

            <p className="mt-1 text-sm font-medium">
              What is the {info.en.toLowerCase()} ({info.ja}) form?
            </p>
          </div>

          <div className="mt-5 flex flex-col gap-2">
            {q.options.map((opt, i) => {
              const isCorrect = i === q.correctIndex;
              const isPicked = selected === i;
              return (
                <button
                  key={i}
                  onClick={() => choose(i)}
                  disabled={revealed}
                  className={cn(
                    "flex items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left transition-colors",
                    !revealed && "border-border hover:bg-surface-muted",
                    revealed && isCorrect && "border-success bg-success/10",
                    revealed && isPicked && !isCorrect && "border-danger bg-danger/10",
                    revealed && !isCorrect && !isPicked && "border-border opacity-60",
                  )}
                >
                  <span className="jp text-base">{opt}</span>
                  {revealed && isCorrect && <Check className="size-4 shrink-0 text-success" />}
                  {revealed && isPicked && !isCorrect && <X className="size-4 shrink-0 text-danger" />}
                </button>
              );
            })}
          </div>

          {revealed && (
            <div className="mt-6 border-t border-border pt-5">
              <div className="grid gap-2 sm:grid-cols-3">
                <FormCell label="Plain" value={q.pair.plain} reading={q.pair.plainReading} />
                <FormCell label="尊敬語 (them)" value={q.pair.sonkeigo} reading={q.pair.sonkeigoReading} />
                <FormCell label="謙譲語 (you)" value={q.pair.kenjougo} reading={q.pair.kenjougoReading} />
              </div>

              <div className="mt-4 rounded-lg bg-surface-muted p-3">
                <div className="flex items-start justify-between gap-2">
                  <p className="jp text-sm">{q.pair.example}</p>
                  <SpeakButton text={q.pair.example} />
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{q.pair.exampleReading}</p>
                <p className="mt-0.5 text-xs italic text-muted-foreground/80">{q.pair.exampleMeaning}</p>
              </div>

              <p className="mt-3 rounded-lg bg-primary/5 p-3 text-sm">
                <span className="font-medium">Note: </span>{q.pair.note}
              </p>

              <Button className="mt-4 w-full" onClick={next}>
                Next conversion <ChevronRight className="size-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function FormCell({ label, value, reading }: { label: string; value: string | null; reading: string | null }) {
  return (
    <div className="rounded-lg border border-border p-2.5">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      {value ? (
        <>
          <p className="jp text-sm font-medium">{value}</p>
          <p className="text-[11px] text-muted-foreground">{reading}</p>
        </>
      ) : (
        <p className="text-sm text-muted-foreground">—</p>
      )}
    </div>
  );
}
