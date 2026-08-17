"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUserTable } from "@/lib/hooks/use-user-table";
import { Check } from "lucide-react";
import { toast } from "sonner";

const steps = [
  { id: "listen1", title: "Listen without transcript", type: "confirm" },
  { id: "situation", title: "Identify the situation", type: "text", placeholder: "What is happening?" },
  { id: "speakers", title: "Identify speakers", type: "text", placeholder: "Who is speaking to whom?" },
  { id: "keyinfo", title: "Write key information", type: "keyinfo" },
  { id: "listen2", title: "Listen again", type: "confirm" },
  { id: "transcript", title: "Check transcript", type: "confirm" },
  { id: "unknown", title: "Save unknown words", type: "text", placeholder: "Words to add to your Flashcards deck…" },
  { id: "shadow", title: "Shadow", type: "confirm" },
  { id: "questions", title: "Answer questions", type: "confirm" },
  { id: "rate", title: "Rate difficulty", type: "rate" },
] as const;

export function IntensiveListeningWorkflow({ resourceId, week }: { resourceId?: string; week?: number }) {
  const { insert } = useUserTable("listening_workflow_logs");
  const [i, setI] = React.useState(0);
  const [situation, setSituation] = React.useState("");
  const [speakers, setSpeakers] = React.useState("");
  const [keyInfo, setKeyInfo] = React.useState({ time: "", date: "", decision: "", action: "" });
  const [unknown, setUnknown] = React.useState("");
  const [difficulty, setDifficulty] = React.useState<"Easy" | "Medium" | "Hard" | null>(null);
  const [done, setDone] = React.useState(false);

  const step = steps[i];

  async function finish(diff: "Easy" | "Medium" | "Hard") {
    setDifficulty(diff);
    await insert({
      resource_id: resourceId ?? null,
      week: week ?? null,
      situation_notes: situation,
      speaker_notes: speakers,
      key_info: keyInfo,
      unknown_words: unknown,
      difficulty: diff,
    } as never);
    setDone(true);
    toast.success("Listening workflow logged");
  }

  if (done) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-2 p-8 text-center">
          <Check className="size-8 text-success" />
          <p className="font-medium">Logged as {difficulty}</p>
          <Button variant="outline" onClick={() => { setI(0); setDone(false); }}>Do another</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-4 flex items-center gap-1.5">
          {steps.map((s, idx) => (
            <span key={s.id} className={`h-1.5 flex-1 rounded-full ${idx <= i ? "bg-primary" : "bg-surface-muted"}`} />
          ))}
        </div>
        <p className="mb-1 text-xs text-muted-foreground">Step {i + 1} / {steps.length}</p>
        <h3 className="mb-3 font-medium">{step.title}</h3>

        {step.type === "confirm" && <p className="mb-4 text-sm text-muted-foreground">Do this now, then continue.</p>}
        {step.id === "situation" && (
          <Input className="mb-4" placeholder={step.placeholder} value={situation} onChange={(e) => setSituation(e.target.value)} />
        )}
        {step.id === "speakers" && (
          <Input className="mb-4" placeholder={step.placeholder} value={speakers} onChange={(e) => setSpeakers(e.target.value)} />
        )}
        {step.id === "keyinfo" && (
          <div className="mb-4 grid grid-cols-2 gap-2">
            <Input placeholder="Time" value={keyInfo.time} onChange={(e) => setKeyInfo((k) => ({ ...k, time: e.target.value }))} />
            <Input placeholder="Date" value={keyInfo.date} onChange={(e) => setKeyInfo((k) => ({ ...k, date: e.target.value }))} />
            <Input placeholder="Decision" value={keyInfo.decision} onChange={(e) => setKeyInfo((k) => ({ ...k, decision: e.target.value }))} />
            <Input placeholder="Action" value={keyInfo.action} onChange={(e) => setKeyInfo((k) => ({ ...k, action: e.target.value }))} />
          </div>
        )}
        {step.id === "unknown" && (
          <Textarea className="mb-4" placeholder={step.placeholder} value={unknown} onChange={(e) => setUnknown(e.target.value)} />
        )}
        {step.type === "rate" ? (
          <div className="flex gap-2">
            {(["Easy", "Medium", "Hard"] as const).map((d) => (
              <Button key={d} variant="outline" onClick={() => finish(d)}>{d}</Button>
            ))}
          </div>
        ) : (
          <Button onClick={() => setI((x) => x + 1)}>Continue</Button>
        )}
      </CardContent>
    </Card>
  );
}
