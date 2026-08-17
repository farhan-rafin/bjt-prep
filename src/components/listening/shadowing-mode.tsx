"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatClock, useStudyTimer } from "@/lib/hooks/use-study-timer";
import { Check } from "lucide-react";

const rounds = [
  { title: "Round 1 — Listen", desc: "Play the clip once, just to absorb it." },
  { title: "Round 2 — Read + speak", desc: "Read the transcript aloud, slowly." },
  { title: "Round 3 — Shadow with transcript", desc: "Shadow in real time while reading along." },
  { title: "Round 4 — Shadow without transcript", desc: "Shadow from memory/ear only." },
];

export function ShadowingMode() {
  const [round, setRound] = React.useState(0);
  const [reps, setReps] = React.useState(0);
  const targetReps = 3;
  const timer = useStudyTimer(10);
  const complete = round >= rounds.length;

  if (complete) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-2 p-8 text-center">
          <Check className="size-8 text-success" />
          <p className="font-medium">Shadowing complete</p>
          <Button variant="outline" onClick={() => { setRound(0); setReps(0); timer.reset(); }}>Start over</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <p className="mb-1 text-xs text-muted-foreground">Round {round + 1} / {rounds.length}</p>
        <h3 className="font-medium">{rounds[round].title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{rounds[round].desc}</p>

        <div className="mt-4 flex items-center gap-3 rounded-xl border border-border bg-surface-muted p-4">
          <span className="font-mono text-xl tabular-nums">{formatClock(timer.elapsedSec)}</span>
          <div className="ml-auto flex gap-1.5">
            {!timer.running ? (
              <Button size="sm" variant="secondary" onClick={timer.start}>Start</Button>
            ) : (
              <Button size="sm" variant="secondary" onClick={timer.pause}>Pause</Button>
            )}
            <Button size="sm" variant="ghost" onClick={timer.reset}>Reset</Button>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm">
            Repetitions: {reps} / {targetReps}
          </p>
          <Button size="sm" variant="outline" onClick={() => setReps((r) => Math.min(targetReps, r + 1))}>
            +1 rep
          </Button>
        </div>

        <Button
          className="mt-5 w-full"
          onClick={() => {
            setRound((r) => r + 1);
            setReps(0);
            timer.reset();
          }}
        >
          Mark Round Complete
        </Button>
      </CardContent>
    </Card>
  );
}
