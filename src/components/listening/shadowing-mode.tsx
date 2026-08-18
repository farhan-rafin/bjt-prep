"use client";
import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { scenarios } from "@/content";
import { useSpeech } from "@/lib/hooks/use-speech";
import { Check, Play, Square } from "lucide-react";

const rounds = [
  { title: "Round 1 — Listen", desc: "Play the dialogue once, just to absorb it. Transcript hidden.", showText: false },
  { title: "Round 2 — Read + speak", desc: "Read the transcript aloud, slowly, at your own pace.", showText: true },
  { title: "Round 3 — Shadow with transcript", desc: "Play each line and repeat it out loud in real time while reading along.", showText: true },
  { title: "Round 4 — Shadow without transcript", desc: "Play each line and repeat it from memory/ear only.", showText: false },
];

export function ShadowingMode() {
  const searchParams = useSearchParams();
  const requestedId = searchParams.get("shadow");
  const [scenarioId, setScenarioId] = React.useState(requestedId ?? scenarios[0].id);
  const [round, setRound] = React.useState(0);
  const [reps, setReps] = React.useState(0);
  const [playingLine, setPlayingLine] = React.useState<number | null>(null);
  const { speak, stop, speaking } = useSpeech();
  const targetReps = 3;

  React.useEffect(() => {
    if (requestedId) setScenarioId(requestedId);
  }, [requestedId]);

  const scenario = scenarios.find((s) => s.id === scenarioId) ?? scenarios[0];
  const complete = round >= rounds.length;

  async function playAll() {
    for (let i = 0; i < scenario.dialogue.length; i++) {
      setPlayingLine(i);
      await speakAndWait(scenario.dialogue[i].line);
    }
    setPlayingLine(null);
  }

  function speakAndWait(text: string): Promise<void> {
    return new Promise((resolve) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) {
        resolve();
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ja-JP";
      utterance.rate = 0.85;
      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();
      window.speechSynthesis.speak(utterance);
    });
  }

  if (complete) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-2 p-8 text-center">
          <Check className="size-8 text-success" />
          <p className="font-medium">Shadowing complete — {scenario.category}</p>
          <Button variant="outline" onClick={() => { setRound(0); setReps(0); }}>Start over</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-4">
          <p className="mb-1 text-xs text-muted-foreground">Script</p>
          <Select value={scenarioId} onValueChange={(v) => { setScenarioId(v); setRound(0); setReps(0); }}>
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              {scenarios.map((s) => (
                <SelectItem key={s.id} value={s.id}>{s.category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <p className="mb-1 text-xs text-muted-foreground">Round {round + 1} / {rounds.length}</p>
        <h3 className="font-medium">{rounds[round].title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{rounds[round].desc}</p>

        <div className="mt-4 flex flex-col gap-2 rounded-xl border border-border bg-surface-muted p-4">
          {scenario.dialogue.map((d, i) => (
            <div key={i} className="flex items-start gap-2">
              <button
                onClick={() => { setPlayingLine(i); speak(d.line, { rate: 0.85 }); }}
                className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-surface text-primary hover:bg-primary/10"
                aria-label="Play line"
              >
                <Play className="size-3" />
              </button>
              <div>
                {rounds[round].showText ? (
                  <>
                    <p className="jp text-sm"><span className="font-medium text-muted-foreground">{d.speaker}: </span>{d.line}</p>
                    <p className="jp text-xs text-muted-foreground/70">{d.reading}</p>
                    <p className="text-xs italic text-muted-foreground/80">{d.meaning}</p>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">{playingLine === i && speaking ? "🔊 Playing…" : `Line ${i + 1} (hidden)`}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-2">
          <Button size="sm" variant="secondary" onClick={playAll}>
            <Play className="size-3.5" /> Play full dialogue
          </Button>
          <Button size="sm" variant="ghost" onClick={stop}>
            <Square className="size-3.5" /> Stop
          </Button>
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
            stop();
            setRound((r) => r + 1);
            setReps(0);
          }}
        >
          Mark Round Complete
        </Button>
      </CardContent>
    </Card>
  );
}
