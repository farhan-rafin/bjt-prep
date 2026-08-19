"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { JapaneseAuto } from "@/components/japanese-text";
import { SpeakButton } from "@/components/speak-button";
import { useSpeech } from "@/lib/hooks/use-speech";
import { useUserTable } from "@/lib/hooks/use-user-table";
import { integratedItems, documentKindLabel, type IntegratedItem } from "@/content";
import { cn } from "@/lib/utils";
import { Check, X, Volume2, ArrowLeft } from "lucide-react";

export function IntegratedRunner() {
  const [selected, setSelected] = React.useState<IntegratedItem | null>(null);
  const [heardAudio, setHeardAudio] = React.useState(false);
  const [answer, setAnswer] = React.useState<number | null>(null);
  const { speak } = useSpeech();
  const { insert: insertAttempt } = useUserTable("quiz_attempts");
  const { insert: insertMistake } = useUserTable("mistakes");

  function start(item: IntegratedItem) {
    setSelected(item);
    setHeardAudio(false);
    setAnswer(null);
  }

  async function choose(i: number) {
    if (!selected || answer !== null) return;
    setAnswer(i);
    const isCorrect = i === selected.correctIndex;
    await insertAttempt({
      quiz_type: "integrated_item",
      quiz_id: selected.documentKind,
      question_id: selected.id,
      is_correct: isCorrect,
      category: "General Listening & Reading",
    } as never);
    if (!isCorrect) {
      await insertMistake({
        question_type: "総合聴読解 — Part II integrated",
        question: selected.question,
        my_answer: selected.options[i],
        correct_answer: selected.options[selected.correctIndex],
        error_category: "Listening & Reading",
        why_wrong: selected.explanation,
      } as never);
    }
  }

  if (!selected) {
    return (
      <div className="flex flex-col gap-2">
        <p className="mb-1 text-sm text-muted-foreground">
          総合聴読解: read the document, then hear a follow-up that changes part of it. Where the
          two disagree, the spoken version is the newer one.
        </p>
        {integratedItems.map((item) => (
          <Card key={item.id} className="cursor-pointer hover:border-primary/40" onClick={() => start(item)}>
            <CardContent className="flex items-center justify-between gap-3 p-4">
              <div>
                <p className="jp font-medium">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.titleReading}</p>
                <p className="text-xs italic text-muted-foreground/80">{item.titleMeaning}</p>
              </div>
              <Badge variant="outline" className="shrink-0">{documentKindLabel[item.documentKind]}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <Button variant="ghost" size="sm" className="mb-3" onClick={() => setSelected(null)}>
          <ArrowLeft className="size-4" /> Back
        </Button>

        <Badge variant="outline" className="mb-2">{documentKindLabel[selected.documentKind]}</Badge>
        <p className="jp font-medium">{selected.title}</p>
        <p className="text-xs text-muted-foreground">{selected.titleReading}</p>
        <p className="text-xs italic text-muted-foreground/80">{selected.titleMeaning}</p>

        <div className="mt-4 rounded-xl border border-border p-4">
          <p className="jp whitespace-pre-line text-sm leading-relaxed">
            <JapaneseAuto text={selected.document} />
          </p>
          {answer !== null && (
            <>
              <p className="mt-2 whitespace-pre-line text-xs text-muted-foreground">{selected.documentReading}</p>
              <p className="mt-1 whitespace-pre-line text-xs italic text-muted-foreground/80">{selected.documentMeaning}</p>
            </>
          )}
        </div>

        <div className="mt-4 rounded-xl border border-border bg-surface-muted p-4">
          <p className="mb-2 text-xs font-medium text-muted-foreground">Follow-up audio</p>
          {!heardAudio ? (
            <Button size="sm" onClick={() => { speak(selected.audioScript, { rate: 0.85 }); setHeardAudio(true); }}>
              <Volume2 className="size-3.5" /> Play audio
            </Button>
          ) : (
            <div className="flex items-start gap-1.5">
              <div className="flex-1">
                <p className="jp text-sm">{selected.audioScript}</p>
                {answer !== null && (
                  <>
                    <p className="mt-1 text-xs text-muted-foreground">{selected.audioReading}</p>
                    <p className="mt-0.5 text-xs italic text-muted-foreground/80">{selected.audioMeaning}</p>
                  </>
                )}
              </div>
              <SpeakButton text={selected.audioScript} rate={0.85} />
            </div>
          )}
        </div>

        {heardAudio && (
          <div className="mt-5">
            <p className="jp text-sm font-medium"><JapaneseAuto text={selected.question} /></p>
            {answer !== null && (
              <>
                <p className="text-xs text-muted-foreground">{selected.questionReading}</p>
                <p className="text-xs italic text-muted-foreground/80">{selected.questionMeaning}</p>
              </>
            )}
            <div className="mt-3 flex flex-col gap-2">
              {selected.options.map((opt, i) => {
                const isCorrect = i === selected.correctIndex;
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
                        <span className="mt-0.5 block text-xs italic text-muted-foreground">
                          {selected.optionMeanings[i]}
                        </span>
                      )}
                    </span>
                    {answer !== null && isCorrect && <Check className="mt-0.5 size-4 shrink-0 text-success" />}
                    {answer !== null && isPicked && !isCorrect && <X className="mt-0.5 size-4 shrink-0 text-danger" />}
                  </button>
                );
              })}
            </div>
            {answer !== null && (
              <p className="mt-4 rounded-lg bg-primary/5 p-3 text-sm">
                <span className="font-medium">Why: </span>{selected.explanation}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
