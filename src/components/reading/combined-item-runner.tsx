"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SpeakButton } from "@/components/speak-button";
import { JapaneseAuto, FuriganaSentence } from "@/components/japanese-text";
import { combinedItems } from "@/content";
import { useUserTable } from "@/lib/hooks/use-user-table";
import { useSpeech } from "@/lib/hooks/use-speech";
import { cn } from "@/lib/utils";
import { Check, X, Volume2 } from "lucide-react";

export function CombinedItemRunner() {
  const [selected, setSelected] = React.useState<(typeof combinedItems)[number] | null>(null);
  const [heardAudio, setHeardAudio] = React.useState(false);
  const [answer, setAnswer] = React.useState<number | null>(null);
  const { speak } = useSpeech();
  const { insert: insertAttempt } = useUserTable("quiz_attempts");
  const { insert: insertMistake } = useUserTable("mistakes");

  async function choose(i: number) {
    if (!selected || answer !== null) return;
    setAnswer(i);
    const isCorrect = i === selected.correctIndex;
    await insertAttempt({
      quiz_type: "combined_item",
      quiz_id: "joudai",
      question_id: selected.id,
      is_correct: isCorrect,
      category: "Information Listening & Reading",
    } as never);
    if (!isCorrect) {
      await insertMistake({
        question_type: "情報聴解 — Part II combined",
        question: selected.question,
        my_answer: selected.options[i],
        correct_answer: selected.options[selected.correctIndex],
        error_category: "Listening & Reading",
        why_wrong: selected.explanation,
      } as never);
    }
  }

  function start(item: (typeof combinedItems)[number]) {
    setSelected(item);
    setHeardAudio(false);
    setAnswer(null);
  }

  if (!selected) {
    return (
      <div className="flex flex-col gap-2">
        <p className="mb-1 text-sm text-muted-foreground">
          Part II format: pre-scan the document, then listen to an audio clue that adds a
          constraint you must apply to it — exactly what Information Listening &amp; Reading
          (情報聴解) tests.
        </p>
        {combinedItems.map((item) => (
          <Card key={item.id} className="cursor-pointer hover:border-primary/40" onClick={() => start(item)}>
            <CardContent className="flex items-center justify-between gap-3 p-4">
              <div>
                <p className="jp font-medium">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.titleReading}</p>
                <p className="text-xs italic text-muted-foreground/80">{item.titleMeaning}</p>
              </div>
              <Badge variant="accent" className="shrink-0">PRACTICE</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-3">
          <p className="jp font-medium">{selected.title}</p>
          <p className="text-xs text-muted-foreground">{selected.titleReading}</p>
          <p className="text-xs italic text-muted-foreground/80">{selected.titleMeaning}</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                {selected.tableHeaders.map((h) => <th key={h} className="jp py-2 pr-3">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {selected.tableRows.map((row, i) => (
                <tr key={i} className="border-b border-border/50">
                  {row.map((cell, j) => <td key={j} className="jp py-2 pr-3">{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 rounded-xl border border-border bg-surface-muted p-4">
          <p className="mb-2 text-xs font-medium text-muted-foreground">Audio clue</p>
          {!heardAudio ? (
            <Button size="sm" onClick={() => { speak(selected.audioClue, { rate: 0.85 }); setHeardAudio(true); }}>
              <Volume2 className="size-3.5" /> Play audio clue
            </Button>
          ) : (
            <div className="flex items-start gap-1.5">
              <div>
                <p className="jp text-sm"><FuriganaSentence text={selected.audioClue} reading={selected.audioClueReading} /></p>
                <p className="text-xs italic text-muted-foreground/80">{selected.audioClueMeaning}</p>
              </div>
              <SpeakButton text={selected.audioClue} rate={0.85} />
            </div>
          )}
        </div>

        {heardAudio && (
          <div className="mt-5">
            <p className="text-sm font-medium"><FuriganaSentence text={selected.question} reading={answer !== null ? selected.questionReading : undefined} /></p>
            {answer !== null && (
              <>
                <p className="text-xs text-muted-foreground">{selected.questionReading}</p>
                <p className="text-xs italic text-muted-foreground/80">{selected.questionMeaning}</p>
              </>
            )}
            <div className="mb-2" />
            <div className="flex flex-col gap-2">
              {selected.options.map((opt, i) => {
                const isCorrect = i === selected.correctIndex;
                const isSelected = i === answer;
                return (
                  <button
                    key={i}
                    disabled={answer !== null}
                    onClick={() => choose(i)}
                    className={cn(
                      "flex items-start justify-between gap-3 rounded-lg border px-4 py-2.5 text-left text-sm transition-colors",
                      answer === null && "border-border hover:bg-surface-muted",
                      answer !== null && isCorrect && "border-success bg-success/10",
                      answer !== null && isSelected && !isCorrect && "border-danger bg-danger/10",
                      answer !== null && !isSelected && !isCorrect && "border-border opacity-60",
                    )}
                  >
                    <span>
                      <JapaneseAuto text={opt} />
                      {answer !== null && (
                        <span className="mt-0.5 block text-xs italic text-muted-foreground">
                          {selected.optionMeanings[i]}
                        </span>
                      )}
                    </span>
                    {answer !== null && isCorrect && <Check className="size-4 shrink-0 text-success" />}
                    {answer !== null && isSelected && !isCorrect && <X className="size-4 shrink-0 text-danger" />}
                  </button>
                );
              })}
            </div>
            {answer !== null && (
              <div className={cn("mt-4 rounded-lg border p-3 text-sm", answer === selected.correctIndex ? "border-success/30 bg-success/5" : "border-danger/30 bg-danger/5")}>
                <p className="font-medium">{answer === selected.correctIndex ? "✓ Correct" : "Not quite"}</p>
                <p className="mt-1 text-muted-foreground">{selected.explanation}</p>
              </div>
            )}
          </div>
        )}

        <Button variant="outline" className="mt-5" onClick={() => setSelected(null)}>
          Back to items
        </Button>
      </CardContent>
    </Card>
  );
}
