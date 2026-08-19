"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { JapaneseAuto } from "@/components/japanese-text";
import { useSpeech } from "@/lib/hooks/use-speech";
import { useUserTable } from "@/lib/hooks/use-user-table";
import { listeningItems, listeningTypeInfo, type ListeningItem, type ListeningType } from "@/content";
import { shuffle } from "@/lib/quiz-generators";
import { cn } from "@/lib/utils";
import { Play, Volume2, RotateCcw, Check, X, ChevronRight } from "lucide-react";

type Filter = ListeningType | "all";

export function ListeningRunner() {
  const [filter, setFilter] = React.useState<Filter>("all");
  const [items, setItems] = React.useState<ListeningItem[]>(() => shuffle(listeningItems));
  const [index, setIndex] = React.useState(0);
  const [selected, setSelected] = React.useState<number | null>(null);
  const [revealed, setRevealed] = React.useState(false);
  const [plays, setPlays] = React.useState(0);
  const [score, setScore] = React.useState({ correct: 0, answered: 0 });

  const { speak, speakSequence, stop, speaking, supported } = useSpeech();
  const { insert: insertAttempt } = useUserTable("quiz_attempts");
  const { insert: insertMistake } = useUserTable("mistakes");

  const pool = React.useMemo(
    () => (filter === "all" ? items : items.filter((i) => i.type === filter)),
    [items, filter],
  );
  const current = pool[index];

  function resetQuestionState() {
    setSelected(null);
    setRevealed(false);
    setPlays(0);
    stop();
  }

  function changeFilter(f: Filter) {
    setFilter(f);
    setIndex(0);
    resetQuestionState();
  }

  function play() {
    if (!current) return;
    setPlays((p) => p + 1);
    if (current.lines.length === 1) speak(current.lines[0].text);
    else speakSequence(current.lines.map((l) => l.text));
  }

  async function choose(i: number) {
    if (revealed || !current) return;
    setSelected(i);
    setRevealed(true);
    stop();
    const isCorrect = i === current.correctIndex;
    setScore((s) => ({ correct: s.correct + (isCorrect ? 1 : 0), answered: s.answered + 1 }));

    await insertAttempt({
      quiz_type: "listening",
      quiz_id: current.type,
      question_id: current.id,
      is_correct: isCorrect,
      category: listeningTypeInfo[current.type].en,
    } as never);

    if (!isCorrect) {
      await insertMistake({
        question_type: `Listening — ${listeningTypeInfo[current.type].ja}`,
        question: current.lines.map((l) => l.text).join(" "),
        my_answer: current.options[i],
        correct_answer: current.options[current.correctIndex],
        error_category: "Listening",
        why_wrong: current.explanation,
      } as never);
    }
  }

  function next() {
    setIndex((i) => (i + 1) % pool.length);
    resetQuestionState();
  }

  if (!current) {
    return <p className="py-10 text-center text-sm text-muted-foreground">No items for this filter.</p>;
  }

  const info = listeningTypeInfo[current.type];

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Select value={filter} onValueChange={(v) => changeFilter(v as Filter)}>
          <SelectTrigger className="w-auto min-w-52"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Part I types ({listeningItems.length})</SelectItem>
            {(Object.keys(listeningTypeInfo) as ListeningType[]).map((t) => (
              <SelectItem key={t} value={t}>
                {listeningTypeInfo[t].ja} — {listeningTypeInfo[t].en}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {score.answered > 0 && (
          <Badge variant="outline">
            {score.correct} / {score.answered} correct
          </Badge>
        )}
      </div>

      <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
        <span>Question {index + 1} of {pool.length}</span>
        <span>{info.ja} · {info.examCount} on the real exam</span>
      </div>
      <Progress value={((index + 1) / pool.length) * 100} className="mb-4" />

      <Card>
        <CardContent className="p-6">
          <p className="mb-4 text-xs text-muted-foreground">{info.howTo}</p>

          {/* Audio-first: the script stays hidden until the question is answered. */}
          <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-border py-8">
            {supported ? (
              <>
                <Button size="lg" onClick={play} disabled={speaking}>
                  {plays === 0 ? <Play className="size-4" /> : <RotateCcw className="size-4" />}
                  {speaking ? "Playing…" : plays === 0 ? "Play audio" : "Play again"}
                </Button>
                <p className="text-xs text-muted-foreground">
                  {plays === 0
                    ? current.lines.length > 1 ? `Dialogue · ${current.lines.length} lines` : "One line"
                    : `Played ${plays}×  ·  the real exam plays once`}
                </p>
              </>
            ) : (
              <p className="px-6 text-center text-sm text-muted-foreground">
                Your browser has no Japanese speech voice. The script is shown below instead.
              </p>
            )}
          </div>

          {!supported && !revealed && (
            <div className="mt-4 rounded-lg bg-surface-muted p-4">
              {current.lines.map((l, i) => (
                <p key={i} className="jp text-sm">
                  {current.lines.length > 1 && <span className="mr-2 text-muted-foreground">{l.speaker}:</span>}
                  {l.text}
                </p>
              ))}
            </div>
          )}

          <div className="mt-6">
            <p className="jp mb-1 text-base font-medium">{current.question}</p>
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
                  disabled={revealed || plays === 0}
                  className={cn(
                    "flex items-start justify-between gap-3 rounded-lg border px-4 py-2.5 text-left text-sm transition-colors",
                    !revealed && "border-border hover:bg-surface-muted disabled:opacity-50 disabled:hover:bg-transparent",
                    revealed && isCorrect && "border-success bg-success/10",
                    revealed && isPicked && !isCorrect && "border-danger bg-danger/10",
                    revealed && !isCorrect && !isPicked && "border-border opacity-60",
                  )}
                >
                  <span>
                    <span className="jp">{opt}</span>
                    {revealed && (
                      <span className="mt-0.5 block text-xs italic text-muted-foreground">
                        {current.optionMeanings[i]}
                      </span>
                    )}
                  </span>
                  {revealed && isCorrect && <Check className="mt-0.5 size-4 shrink-0 text-success" />}
                  {revealed && isPicked && !isCorrect && <X className="mt-0.5 size-4 shrink-0 text-danger" />}
                </button>
              );
            })}
          </div>

          {plays === 0 && !revealed && (
            <p className="mt-3 text-center text-xs text-muted-foreground">Play the audio before answering.</p>
          )}

          {/* Study layer — only after answering, so it never leaks the answer. */}
          {revealed && (
            <div className="mt-6 border-t border-border pt-5">
              <div className="mb-3 flex items-center gap-2">
                <Badge variant="outline">{current.context}</Badge>
              </div>
              <p className="mb-2 text-sm font-medium">Transcript</p>
              <div className="flex flex-col gap-3">
                {current.lines.map((l, i) => (
                  <div key={i} className="rounded-lg bg-surface-muted p-3">
                    <div className="flex items-start gap-2">
                      {current.lines.length > 1 && (
                        <span className="mt-0.5 shrink-0 text-xs font-medium text-muted-foreground">{l.speaker}</span>
                      )}
                      <div className="flex-1">
                        <p className="jp text-sm"><JapaneseAuto text={l.text} /></p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{l.reading}</p>
                        <p className="mt-0.5 text-xs italic text-muted-foreground/80">{l.meaning}</p>
                      </div>
                      <button
                        onClick={() => speak(l.text)}
                        className="shrink-0 rounded p-1 text-muted-foreground hover:bg-surface hover:text-foreground"
                        aria-label="Replay this line"
                      >
                        <Volume2 className="size-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-4 rounded-lg bg-primary/5 p-3 text-sm">
                <span className="font-medium">Why: </span>
                {current.explanation}
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
