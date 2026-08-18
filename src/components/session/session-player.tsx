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
import { JapaneseAuto } from "@/components/japanese-text";
import { useAuth } from "@/lib/auth-context";
import { useUserTable } from "@/lib/hooks/use-user-table";
import { useStudyTimer, formatClock } from "@/lib/hooks/use-study-timer";
import { buildSessionSteps, sessionTitle } from "@/lib/session-helpers";
import { day1Blocks, day1Links, type DayNumber, type DurationOption } from "@/content";
import { cn, formatDuration } from "@/lib/utils";
import { Play, Pause, RotateCcw, Check, ExternalLink, ChevronRight, PartyPopper, Cloud, CloudCheck } from "lucide-react";
import { toast } from "sonner";

const DURATIONS: DurationOption[] = [2, 3, 4, 5];
const AUTOSAVE_INTERVAL_MS = 5000;

export function SessionPlayer({ week, day }: { week: number; day: DayNumber }) {
  const searchParams = useSearchParams();
  const essential = searchParams.get("essential") === "1";
  const { user, profile } = useAuth();
  const { rows: sessions, loading: sessionsLoading, upsert } = useUserTable("session_progress");
  const { insert: insertLog } = useUserTable("study_logs");

  const existing = sessions.find((s) => s.week === week && s.day === day);
  const isDay1 = week === 1 && day === 1;

  const [duration, setDuration] = React.useState<DurationOption>(
    (profile?.session_duration as DurationOption) ?? 3,
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
    // Essential Mode: flashcard review + most important listening/BJT content, ~60 min total. Convenience shortcut, not curriculum.
    const priorityLabels = ["Flashcard", "listening", "Intensive listening", "BJT", "Weekly test"];
    const picked = full.filter((s) => priorityLabels.some((p) => s.label.toLowerCase().includes(p.toLowerCase())));
    return (picked.length > 0 ? picked : full.slice(0, 2)).slice(0, 3);
  }, [isDay1, week, day, duration, essential]);

  const [stepIndex, setStepIndex] = React.useState(0);
  const [completedSteps, setCompletedSteps] = React.useState<Set<number>>(new Set());
  const [checkedTasks, setCheckedTasks] = React.useState<Set<string>>(new Set());
  const [notes, setNotes] = React.useState("");
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [celebrate, setCelebrate] = React.useState(false);
  const [saveState, setSaveState] = React.useState<"idle" | "saving" | "saved">("idle");

  const currentStep = steps[stepIndex];
  const timer = useStudyTimer(currentStep?.minutes ?? 0);
  const accumulatedRef = React.useRef(0);

  React.useEffect(() => {
    if (timer.justFinished) {
      toast.info("⏰ Time's up for this step — confirm below when you're ready to move on.", { duration: 6000 });
      timer.dismissFinished();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer.justFinished]);

  // Hydrate from the database once session_progress has loaded — restores step position,
  // checked tasks, notes, and elapsed minutes if the learner navigated away and came back.
  const hydratedRef = React.useRef(false);
  React.useEffect(() => {
    if (sessionsLoading || hydratedRef.current) return;
    hydratedRef.current = true;
    if (existing) {
      if (existing.duration_choice) setDuration(existing.duration_choice as DurationOption);
      const savedIndex = Math.min(existing.current_step_index ?? 0, Math.max(0, steps.length - 1));
      setStepIndex(savedIndex);
      setCompletedSteps(new Set(Array.from({ length: savedIndex }, (_, i) => i)));
      setCheckedTasks(new Set(existing.completed_tasks ?? []));
      setNotes(existing.notes ?? "");
      accumulatedRef.current = existing.actual_minutes ?? 0;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionsLoading]);

  // Keep latest values in refs so the autosave heartbeat and unload handler always read
  // current state without needing to be recreated on every keystroke/toggle.
  const latestRef = React.useRef({ checkedTasks, notes, stepIndex, duration });
  React.useEffect(() => {
    latestRef.current = { checkedTasks, notes, stepIndex, duration };
  }, [checkedTasks, notes, stepIndex, duration]);

  const persist = React.useCallback(
    async (patch: Record<string, unknown>) => {
      setSaveState("saving");
      const { checkedTasks: ct, notes: n, stepIndex: si, duration: d } = latestRef.current;
      await upsert(
        {
          week,
          day,
          status: "in_progress",
          duration_choice: d,
          current_step_index: si,
          planned_minutes: steps.reduce((s, x) => s + x.minutes, 0),
          completed_tasks: Array.from(ct),
          notes: n,
          started_at: existing?.started_at ?? new Date().toISOString(),
          ...patch,
        } as never,
        "user_id,week,day",
      );
      setSaveState("saved");
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [week, day, existing?.started_at, steps.length],
  );

  // Heartbeat autosave: every few seconds, persist wherever things stand (checklist, notes,
  // current step, and time spent so far on the in-progress step) so nothing is lost by
  // navigating away mid-step.
  React.useEffect(() => {
    if (!hydratedRef.current) return;
    const id = setInterval(() => {
      const liveMinutes = accumulatedRef.current + Math.round(timer.elapsedSec / 60);
      persist({ actual_minutes: liveMinutes });
    }, AUTOSAVE_INTERVAL_MS);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [persist, timer.elapsedSec]);

  // Best-effort save on tab hide / unmount.
  React.useEffect(() => {
    function onVisibility() {
      if (document.visibilityState === "hidden") {
        const liveMinutes = accumulatedRef.current + Math.round(timer.elapsedSec / 60);
        persist({ actual_minutes: liveMinutes });
      }
    }
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      onVisibility();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [persist]);

  // Debounced save whenever the checklist or notes change (in addition to the heartbeat).
  const debounceRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  function scheduleAutosave(delayMs = 600) {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => persist({}), delayMs);
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

    if (stepIndex < steps.length - 1) {
      const nextIndex = stepIndex + 1;
      setStepIndex(nextIndex);
      timer.reset();
      await persist({ actual_minutes: accumulatedRef.current, current_step_index: nextIndex });
    } else {
      await persist({ actual_minutes: accumulatedRef.current });
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
      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Week {week} · Day {day}
          </p>
          <h1 className="text-2xl font-semibold">{sessionTitle(week, day)}</h1>
        </div>
        <span className="mt-1 flex shrink-0 items-center gap-1 text-xs text-muted-foreground" aria-live="polite">
          {saveState === "saving" ? (
            <><Cloud className="size-3.5 animate-pulse" /> Saving…</>
          ) : saveState === "saved" ? (
            <><CloudCheck className="size-3.5 text-success" /> Saved</>
          ) : null}
        </span>
      </div>
      <div className="-mt-4 mb-6 flex items-center gap-1.5">
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

      {!started && (
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">How much time do you have today?</span>
          {DURATIONS.map((d) => (
            <button
              key={d}
              onClick={() => {
                setDuration(d);
                scheduleAutosave(0);
              }}
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
          <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/90">
            <JapaneseAuto text={currentStep.description} />
          </p>

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
            <span className={cn("font-mono text-2xl tabular-nums", timer.remainingSec === 0 && "text-danger animate-pulse")}>{formatClock(timer.remainingSec)}</span>
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
                  onCheckedChange={(v) => {
                    setCheckedTasks((prev) => {
                      const next = new Set(prev);
                      if (v) next.add(c);
                      else next.delete(c);
                      return next;
                    });
                    scheduleAutosave(300);
                  }}
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
                scheduleAutosave();
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
