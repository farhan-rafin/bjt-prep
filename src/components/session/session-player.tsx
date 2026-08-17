"use client";
import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useAuth } from "@/lib/auth-context";
import { useUserTable } from "@/lib/hooks/use-user-table";
import { useStudyTimer, formatClock } from "@/lib/hooks/use-study-timer";
import { buildSessionSteps, sessionTitle } from "@/lib/session-helpers";
import { day1Blocks, day1Links, type DayNumber, type DurationOption } from "@/content";
import { cn, formatDuration } from "@/lib/utils";
import { Play, Pause, RotateCcw, Check, ExternalLink, ChevronRight, PartyPopper } from "lucide-react";
import { toast } from "sonner";

const DURATIONS: DurationOption[] = [2, 3, 4, 5];

export function SessionPlayer({ week, day }: { week: number; day: DayNumber }) {
  const searchParams = useSearchParams();
  const essential = searchParams.get("essential") === "1";
  const { user, profile } = useAuth();
  const { rows: sessions, upsert } = useUserTable("session_progress");
  const { insert: insertLog } = useUserTable("study_logs");

  const existing = sessions.find((s) => s.week === week && s.day === day);
  const isDay1 = week === 1 && day === 1;

  const [duration, setDuration] = React.useState<DurationOption>(
    (existing?.duration_choice as DurationOption) ?? (profile?.session_duration as DurationOption) ?? 3,
  );
  const started = !!existing && (existing.actual_minutes ?? 0) > 0;

  const steps = React.useMemo(() => {
    const full = isDay1
      ? day1Blocks.map((b, i) => ({
          key: `day1-${i}`,
          label: b.stepTitle,
          minutes: b.minutes,
          description: b.activity,
          checklist: [b.stepTitle],
        }))
      : buildSessionSteps(week, day, duration);
    if (!essential) return full;
    // Essential Mode: Anki review + most important listening/BJT content, ~60 min total. Convenience shortcut, not curriculum.
    const priorityLabels = ["Anki", "listening", "Intensive listening", "BJT", "Weekly test"];
    const picked = full.filter((s) => priorityLabels.some((p) => s.label.toLowerCase().includes(p.toLowerCase())));
    return (picked.length > 0 ? picked : full.slice(0, 2)).slice(0, 3);
  }, [isDay1, week, day, duration, essential]);

  const [stepIndex, setStepIndex] = React.useState(0);
  const [completedSteps, setCompletedSteps] = React.useState<Set<number>>(new Set());
  const [checkedTasks, setCheckedTasks] = React.useState<Set<string>>(
    new Set(existing?.completed_tasks ?? []),
  );
  const [notes, setNotes] = React.useState(existing?.notes ?? "");
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [celebrate, setCelebrate] = React.useState(false);

  const currentStep = steps[stepIndex];
  const timer = useStudyTimer(currentStep?.minutes ?? 0);
  const accumulatedRef = React.useRef(existing?.actual_minutes ?? 0);

  async function persist(patch: Partial<Parameters<typeof upsert>[0]>) {
    await upsert(
      {
        week,
        day,
        status: "in_progress",
        duration_choice: duration,
        planned_minutes: steps.reduce((s, x) => s + x.minutes, 0),
        completed_tasks: Array.from(checkedTasks),
        notes,
        started_at: existing?.started_at ?? new Date().toISOString(),
        ...patch,
      } as never,
      "user_id,week,day",
    );
  }

  async function markStepDone() {
    timer.pause();
    const elapsedMin = Math.round(timer.elapsedSec / 60);
    accumulatedRef.current += elapsedMin;
    setCompletedSteps((prev) => new Set(prev).add(stepIndex));
    setCheckedTasks((prev) => {
      const next = new Set(prev);
      currentStep.checklist.forEach((c) => next.add(c));
      return next;
    });
    await persist({ actual_minutes: accumulatedRef.current });

    if (stepIndex < steps.length - 1) {
      setStepIndex((i) => i + 1);
      timer.reset();
    } else {
      setConfirmOpen(true);
    }
  }

  async function confirmComplete() {
    setConfirmOpen(false);
    const xp = 10 * steps.length + 5;
    await persist({
      status: essential ? "in_progress" : "completed",
      actual_minutes: accumulatedRef.current,
      completed_at: essential ? null : new Date().toISOString(),
      xp_earned: xp,
      notes: essential ? `${notes}\n[Partial Session — Essential Mode]`.trim() : notes,
    });
    if (user) {
      await insertLog({
        week,
        day,
        minutes: accumulatedRef.current,
        xp,
        activity_type: essential ? "essential_mode" : "study_session",
      } as never);
    }
    setCelebrate(true);
    toast.success(
      essential
        ? `Partial Session logged — ${accumulatedRef.current} min. Finish the rest anytime.`
        : `Week ${week} · Day ${day} complete — +${xp} XP`,
    );
  }

  if (celebrate) {
    const nextDay = day < 4 ? day + 1 : 1;
    const nextWeek = day < 4 ? week : week + 1;
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-20 text-center">
        <div className="relative mb-4">
          <PartyPopper className="size-12 text-accent animate-pop-in" />
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className="confetti-piece absolute left-1/2 top-1/2 size-1.5 rounded-full"
              style={{
                background: ["var(--primary)", "var(--accent)", "var(--success)"][i % 3],
                animationDelay: `${i * 60}ms`,
                left: `${50 + (i - 5) * 8}%`,
              }}
            />
          ))}
        </div>
        <h1 className="text-2xl font-semibold">{essential ? "Partial Session logged" : "Session complete"}</h1>
        <p className="mt-2 text-muted-foreground">
          Week {week} · Day {day} — {sessionTitle(week, day)}
          {essential ? " has a partial session logged" : " is done"}. {accumulatedRef.current} minutes logged.
        </p>
        {essential ? (
          <Button asChild size="lg" className="mt-6">
            <Link href={`/journey/week/${week}/day/${day}`}>
              Finish the rest later <ChevronRight />
            </Link>
          </Button>
        ) : (
          nextWeek <= 24 && (
            <Button asChild size="lg" className="mt-6">
              <Link href={`/journey/week/${nextWeek}/day/${nextDay}`}>
                Continue to Day {nextDay} <ChevronRight />
              </Link>
            </Button>
          )
        )}
        <Button variant="ghost" asChild className="mt-2">
          <Link href="/dashboard">Back to Dashboard</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 lg:py-10">
      <div className="mb-6">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Week {week} · Day {day}
        </p>
        <h1 className="text-2xl font-semibold">{sessionTitle(week, day)}</h1>
        <div className="mt-3 flex items-center gap-1.5">
          {steps.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-2 flex-1 rounded-full transition-colors",
                completedSteps.has(i) ? "bg-success" : i === stepIndex ? "bg-primary" : "bg-surface-muted",
              )}
            />
          ))}
        </div>
      </div>

      {!started && (
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">How much time do you have today?</span>
          {DURATIONS.map((d) => (
            <button
              key={d}
              onClick={() => setDuration(d)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                duration === d ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:bg-surface-muted",
              )}
            >
              {d}h{d === 3 ? " Recommended" : d === 5 ? " Intensive" : ""}
            </button>
          ))}
        </div>
      )}

      <Card>
        <CardContent className="p-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold">
              Step {stepIndex + 1} — {currentStep.label}
            </h2>
            <Badge variant="outline">{formatDuration(currentStep.minutes)}</Badge>
          </div>
          <p className="jp whitespace-pre-line text-sm leading-relaxed text-foreground/90">{currentStep.description}</p>

          {isDay1 && stepIndex === 0 && (
            <div className="mt-4 flex flex-col gap-1.5 rounded-lg border border-border bg-surface-muted p-3">
              <p className="text-xs font-medium text-muted-foreground">Links for today</p>
              {day1Links.map((l) => (
                <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs text-primary hover:underline">
                  <ExternalLink className="size-3" /> {l.label}
                </a>
              ))}
            </div>
          )}

          <div className="mt-5 flex items-center gap-3 rounded-xl border border-border bg-surface-muted p-4">
            <span className="font-mono text-2xl tabular-nums">{formatClock(timer.remainingSec)}</span>
            <span className="text-xs text-muted-foreground">remaining of {formatDuration(currentStep.minutes)}</span>
            <div className="ml-auto flex gap-1.5">
              {!timer.running ? (
                <Button size="icon" variant="secondary" onClick={timer.start} aria-label="Start timer">
                  <Play className="size-4" />
                </Button>
              ) : (
                <Button size="icon" variant="secondary" onClick={timer.pause} aria-label="Pause timer">
                  <Pause className="size-4" />
                </Button>
              )}
              <Button size="icon" variant="ghost" onClick={timer.reset} aria-label="Reset timer">
                <RotateCcw className="size-4" />
              </Button>
            </div>
          </div>

          <div className="mt-5">
            <p className="mb-2 text-sm font-medium">Checklist</p>
            {currentStep.checklist.map((c) => (
              <label key={c} className="flex items-center gap-2 py-1 text-sm">
                <Checkbox
                  checked={checkedTasks.has(c)}
                  onCheckedChange={(v) =>
                    setCheckedTasks((prev) => {
                      const next = new Set(prev);
                      if (v) next.add(c);
                      else next.delete(c);
                      return next;
                    })
                  }
                />
                {c}
              </label>
            ))}
          </div>

          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-medium text-muted-foreground">Notes for this step</summary>
            <Textarea
              className="mt-2"
              placeholder="Jot anything down…"
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value);
              }}
              onBlur={() => persist({})}
            />
          </details>

          <div className="mt-6 flex justify-end gap-2">
            <Button variant="outline" onClick={() => timer.finishEarly()}>
              Finish Early
            </Button>
            <Button onClick={markStepDone}>
              <Check className="size-4" />
              {stepIndex < steps.length - 1 ? "Mark Complete & Next" : "Finish Session"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mark this study day as complete?</DialogTitle>
            <DialogDescription>
              You logged {accumulatedRef.current} minutes across {steps.length} steps. This confirms Week {week} ·
              Day {day} as done — you can always revisit it later.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              Not yet
            </Button>
            <Button onClick={confirmComplete}>Yes, mark complete</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
