"use client";
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useUserTable } from "@/lib/hooks/use-user-table";
import { useAuth } from "@/lib/auth-context";
import { BjtScoreTracker } from "@/components/bjt-score-tracker";
import { TimedMockRunner, type MockScope } from "@/components/mock-exam/timed-mock-runner";
import { sectionSpecs, TOTAL_MOCK_QUESTIONS, TOTAL_MOCK_MINUTES } from "@/lib/mock-exam";
import { Plus, Timer } from "lucide-react";
import { toast } from "sonner";

const scoreTypes = [
  { value: "raw_percentage", label: "Raw practice percentage" },
  { value: "estimated_bjt", label: "Estimated BJT score" },
  { value: "actual_bjt", label: "Actual BJT score" },
];

export default function MockTestsPage() {
  const { profile } = useAuth();
  const { rows: mocks, insert } = useUserTable("mock_tests");
  const [open, setOpen] = React.useState(false);
  const [activeScope, setActiveScope] = React.useState<MockScope | null>(null);
  const [form, setForm] = React.useState({
    test_date: new Date().toISOString().slice(0, 10),
    score_type: "estimated_bjt",
    total_score: "",
    part1_score: "",
    part2_score: "",
    part3_score: "",
    time_taken_minutes: "",
    notes: "",
  });

  async function save() {
    if (!form.total_score) {
      toast.error("Total score is required");
      return;
    }
    await insert({
      test_date: form.test_date,
      score_type: form.score_type,
      total_score: Number(form.total_score),
      part1_score: form.part1_score ? Number(form.part1_score) : null,
      part2_score: form.part2_score ? Number(form.part2_score) : null,
      part3_score: form.part3_score ? Number(form.part3_score) : null,
      time_taken_minutes: form.time_taken_minutes ? Number(form.time_taken_minutes) : null,
      notes: form.notes || null,
    } as never);
    setOpen(false);
    toast.success("Mock test recorded");
  }

  if (activeScope !== null) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-6 lg:py-10">
        <TimedMockRunner scope={activeScope} onExit={() => setActiveScope(null)} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 lg:py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Mock Tests</h1>
        <Button onClick={() => setOpen(true)}>
          <Plus className="size-4" /> Log Mock
        </Button>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">Target: {profile?.target_score ?? 420}+</p>

      <Card className="mt-5">
        <CardHeader><CardTitle>Sit a Mock</CardTitle></CardHeader>
        <CardContent className="pt-2">
          <p className="mb-3 text-sm text-muted-foreground">
            Real exam conditions: no furigana, no translations, no feedback until you finish.
            Sit a single section when you only have half an hour, or the full paper when you don't.
          </p>
          <button
            onClick={() => setActiveScope("full")}
            className="mb-2 flex w-full items-center gap-3 rounded-lg border border-primary/40 bg-primary/5 p-4 text-left transition-colors hover:bg-primary/10"
          >
            <Timer className="size-5 shrink-0 text-primary" />
            <span>
              <span className="block font-medium">Full mock</span>
              <span className="block text-xs text-muted-foreground">
                {TOTAL_MOCK_QUESTIONS} questions · {TOTAL_MOCK_MINUTES} min · all three sections
              </span>
            </span>
          </button>
          <div className="grid gap-2 sm:grid-cols-3">
            {sectionSpecs.map((spec) => (
              <button
                key={spec.section}
                onClick={() => setActiveScope(spec.section)}
                className="flex flex-col items-start gap-0.5 rounded-lg border border-border p-4 text-left transition-colors hover:bg-surface-muted"
              >
                <span className="jp font-medium">{spec.ja}</span>
                <span className="text-xs text-muted-foreground">{spec.en}</span>
                <span className="text-xs text-muted-foreground">
                  {spec.types.reduce((n, t) => n + t.count, 0)} Q · {spec.minutes} min
                </span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-5">
        <CardHeader><CardTitle>Score Progress</CardTitle></CardHeader>
        <CardContent className="pt-4">
          <BjtScoreTracker mocks={mocks} target={profile?.target_score ?? 420} />
        </CardContent>
      </Card>

      <div className="mt-5 flex flex-col gap-2">
        {[...mocks].sort((a, b) => new Date(b.test_date).getTime() - new Date(a.test_date).getTime()).map((m) => (
          <Card key={m.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="font-medium">{m.test_date}</p>
                <Badge variant="outline">{scoreTypes.find((s) => s.value === m.score_type)?.label}</Badge>
              </div>
              <p className="mt-1 text-2xl font-semibold">{m.total_score}</p>
              <div className="mt-1 flex gap-3 text-xs text-muted-foreground">
                {m.part1_score !== null && <span>Part I: {m.part1_score}</span>}
                {m.part2_score !== null && <span>Part II: {m.part2_score}</span>}
                {m.part3_score !== null && <span>Part III: {m.part3_score}</span>}
                {m.time_taken_minutes && <span>{m.time_taken_minutes} min</span>}
              </div>
              {m.notes && <p className="mt-2 text-sm text-muted-foreground">{m.notes}</p>}
            </CardContent>
          </Card>
        ))}
        {mocks.length === 0 && (
          <p className="py-10 text-center text-sm text-muted-foreground">
            No mock tests yet. Your first full mock is scheduled later in the program — log one anytime.
          </p>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Log a mock test</DialogTitle></DialogHeader>
          <div className="flex flex-col gap-3">
            <Input type="date" value={form.test_date} onChange={(e) => setForm((f) => ({ ...f, test_date: e.target.value }))} />
            <Select value={form.score_type} onValueChange={(v) => setForm((f) => ({ ...f, score_type: v }))}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {scoreTypes.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
              </SelectContent>
            </Select>
            <Input placeholder="Total score" type="number" value={form.total_score} onChange={(e) => setForm((f) => ({ ...f, total_score: e.target.value }))} />
            <div className="grid grid-cols-3 gap-2">
              <Input placeholder="Part I" type="number" value={form.part1_score} onChange={(e) => setForm((f) => ({ ...f, part1_score: e.target.value }))} />
              <Input placeholder="Part II" type="number" value={form.part2_score} onChange={(e) => setForm((f) => ({ ...f, part2_score: e.target.value }))} />
              <Input placeholder="Part III" type="number" value={form.part3_score} onChange={(e) => setForm((f) => ({ ...f, part3_score: e.target.value }))} />
            </div>
            <Input placeholder="Time taken (minutes)" type="number" value={form.time_taken_minutes} onChange={(e) => setForm((f) => ({ ...f, time_taken_minutes: e.target.value }))} />
            <Textarea placeholder="Notes" value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} />
            <Button onClick={save}>Save mock test</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
