"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { durationOutcomes, type DurationOption } from "@/content";
import { Loader2, Target, CalendarDays, CheckCircle2 } from "lucide-react";

const DAYS = [
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
  { value: 0, label: "Sunday" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { updateProfile } = useAuth();
  const [step, setStep] = React.useState(0);
  const [examDate, setExamDate] = React.useState("");
  const [studyDays, setStudyDays] = React.useState<number[]>([1, 3, 5, 0]);
  const [duration, setDuration] = React.useState<DurationOption>(3);
  const [saving, setSaving] = React.useState(false);

  function toggleDay(d: number) {
    setStudyDays((prev) => {
      if (prev.includes(d)) return prev.filter((x) => x !== d);
      if (prev.length >= 4) return prev;
      return [...prev, d];
    });
  }

  async function finish() {
    setSaving(true);
    await updateProfile({
      exam_date: examDate || null,
      study_days: studyDays,
      session_duration: duration,
      onboarded: true,
    });
    router.push("/journey/week/1/day/1");
  }

  const steps = [
    {
      icon: Target,
      title: "Your goal",
      content: (
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-3xl font-semibold text-primary">BJT J2 — 420+</p>
          <p className="text-sm text-muted-foreground">
            Built backwards from the exam, not from JLPT levels. Starting point: ~JLPT N5. 24 weeks, 4 study
            days/week.
          </p>
        </div>
      ),
      canNext: true,
    },
    {
      icon: CalendarDays,
      title: "When is your exam?",
      content: (
        <div className="flex flex-col gap-3">
          <input
            type="date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            className="h-10 w-full rounded-lg border border-border-strong bg-surface px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          />
          <p className="text-xs text-muted-foreground">
            Not booked yet? Leave blank — we'll default to a 24-week countdown and you can set it later in Settings.
          </p>
        </div>
      ),
      canNext: true,
    },
    {
      title: "Choose 4 study days",
      content: (
        <div className="grid grid-cols-2 gap-2">
          {DAYS.map((d) => (
            <label
              key={d.value}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm",
                studyDays.includes(d.value) ? "border-primary bg-primary/5" : "border-border",
              )}
            >
              <Checkbox
                checked={studyDays.includes(d.value)}
                onCheckedChange={() => toggleDay(d.value)}
              />
              {d.label}
            </label>
          ))}
        </div>
      ),
      canNext: studyDays.length === 4,
      hint: studyDays.length !== 4 ? `Pick exactly 4 days (${studyDays.length}/4 selected)` : undefined,
    },
    {
      title: "Daily study duration",
      content: (
        <div className="grid grid-cols-2 gap-2">
          {([2, 3, 4, 5] as DurationOption[]).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDuration(d)}
              className={cn(
                "flex flex-col gap-1 rounded-lg border px-3 py-3 text-left text-sm transition-colors",
                duration === d ? "border-primary bg-primary/5" : "border-border hover:bg-surface-muted",
              )}
            >
              <span className="font-semibold">{durationOutcomes[d].label}</span>
              <span className="text-xs text-muted-foreground">{durationOutcomes[d].outcome}</span>
            </button>
          ))}
        </div>
      ),
      canNext: true,
    },
    {
      icon: CheckCircle2,
      title: "Ready?",
      content: (
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-2xl font-semibold">24</p>
              <p className="text-muted-foreground">weeks</p>
            </div>
            <div>
              <p className="text-2xl font-semibold">96</p>
              <p className="text-muted-foreground">study sessions</p>
            </div>
            <div>
              <p className="text-2xl font-semibold">420+</p>
              <p className="text-muted-foreground">target</p>
            </div>
          </div>
        </div>
      ),
      canNext: true,
    },
  ];

  const current = steps[step];
  const Icon = current.icon;

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-background px-4 py-10">
      <Logo className="mb-8" />
      <Card className="w-full max-w-md p-8">
        <div className="mb-6 flex items-center justify-center gap-1.5">
          {steps.map((_, i) => (
            <span
              key={i}
              className={cn("h-1.5 w-6 rounded-full", i <= step ? "bg-primary" : "bg-surface-muted")}
            />
          ))}
        </div>
        {Icon && (
          <div className="mb-3 flex justify-center">
            <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icon className="size-5" />
            </span>
          </div>
        )}
        <h2 className="mb-4 text-center text-lg font-semibold">{current.title}</h2>
        {current.content}
        {current.hint && <p className="mt-2 text-center text-xs text-warning">{current.hint}</p>}
        <div className="mt-8 flex gap-2">
          {step > 0 && (
            <Button variant="outline" className="flex-1" onClick={() => setStep((s) => s - 1)}>
              Back
            </Button>
          )}
          {step < steps.length - 1 ? (
            <Button className="flex-1" disabled={!current.canNext} onClick={() => setStep((s) => s + 1)}>
              Continue
            </Button>
          ) : (
            <Button className="flex-1" disabled={saving} onClick={finish}>
              {saving && <Loader2 className="animate-spin" />}
              Start Week 1
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
