"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SpeakButton } from "@/components/speak-button";
import { JapaneseAuto } from "@/components/japanese-text";
import { combinedItems } from "@/content";
import { cn } from "@/lib/utils";
import { Check, X, Volume2 } from "lucide-react";

export function CombinedItemRunner() {
  const [selected, setSelected] = React.useState<(typeof combinedItems)[number] | null>(null);
  const [heardAudio, setHeardAudio] = React.useState(false);
  const [answer, setAnswer] = React.useState<number | null>(null);

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
            <CardContent className="flex items-center justify-between p-4">
              <p className="jp font-medium">{item.title}</p>
              <Badge variant="accent">PRACTICE</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <p className="jp mb-3 font-medium">{selected.title}</p>
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
            <Button size="sm" onClick={() => setHeardAudio(true)}>
              <Volume2 className="size-3.5" /> Play audio clue
            </Button>
          ) : (
            <div className="flex items-start gap-1.5">
              <div>
                <p className="jp text-sm">{selected.audioClue}</p>
                <p className="jp text-xs text-muted-foreground/70">{selected.audioClueReading}</p>
                <p className="text-xs italic text-muted-foreground/80">{selected.audioClueMeaning}</p>
              </div>
              <SpeakButton text={selected.audioClue} rate={0.85} />
            </div>
          )}
        </div>

        {heardAudio && (
          <div className="mt-5">
            <p className="mb-2 text-sm font-medium"><JapaneseAuto text={selected.question} /></p>
            <div className="flex flex-col gap-2">
              {selected.options.map((opt, i) => {
                const isCorrect = i === selected.correctIndex;
                const isSelected = i === answer;
                return (
                  <button
                    key={i}
                    disabled={answer !== null}
                    onClick={() => setAnswer(i)}
                    className={cn(
                      "flex items-center justify-between rounded-lg border px-4 py-2.5 text-left text-sm transition-colors",
                      answer === null && "border-border hover:bg-surface-muted",
                      answer !== null && isCorrect && "border-success bg-success/10",
                      answer !== null && isSelected && !isCorrect && "border-danger bg-danger/10",
                      answer !== null && !isSelected && !isCorrect && "border-border opacity-60",
                    )}
                  >
                    <JapaneseAuto text={opt} />
                    {answer !== null && isCorrect && <Check className="size-4 text-success" />}
                    {answer !== null && isSelected && !isCorrect && <X className="size-4 text-danger" />}
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
