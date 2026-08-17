"use client";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useUserTable } from "@/lib/hooks/use-user-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { findCurrentPosition } from "@/lib/progress";
import { sessionTitle, sessionObjective, sessionPlannedMinutes } from "@/lib/session-helpers";
import { daySpineLong, durationOutcomes, type DurationOption } from "@/content";
import { formatDuration, cn } from "@/lib/utils";
import { Zap, ArrowRight } from "lucide-react";
import { useState } from "react";

const DURATIONS: DurationOption[] = [2, 3, 4, 5];

export default function TodayPage() {
  const { profile, updateProfile } = useAuth();
  const { rows: sessions } = useUserTable("session_progress");
  const pos = findCurrentPosition(sessions);
  const [duration, setDuration] = useState<DurationOption>((profile?.session_duration as DurationOption) ?? 3);

  const plannedMinutes = sessionPlannedMinutes(pos.day, duration);

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 lg:py-10">
      <h1 className="text-2xl font-semibold">Today</h1>
      <p className="mt-1 text-sm text-muted-foreground">{daySpineLong[pos.day]}</p>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>How much time do you have today?</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {DURATIONS.map((d) => (
              <button
                key={d}
                onClick={() => {
                  setDuration(d);
                  updateProfile({ session_duration: d });
                }}
                className={cn(
                  "rounded-lg border px-3 py-3 text-sm font-medium transition-colors",
                  duration === d ? "border-primary bg-primary/5 text-primary" : "border-border hover:bg-surface-muted",
                )}
              >
                {durationOutcomes[d].label}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Saved as your default. Planned time today: {formatDuration(plannedMinutes)}.
          </p>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>
            Week {pos.week} · Day {pos.day} — {sessionTitle(pos.week, pos.day)}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-sm text-muted-foreground">{sessionObjective(pos.week, pos.day)}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button asChild size="lg">
              <Link href={`/journey/week/${pos.week}/day/${pos.day}`}>
                Start Session <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={`/journey/week/${pos.week}/day/${pos.day}?essential=1`}>
                <Zap className="size-4" /> Short on time? Essential Mode (~60 min)
              </Link>
            </Button>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Essential Mode is a convenience shortcut, not part of the core curriculum — it prioritises flashcard review,
            listening, and today&apos;s most important BJT task, and logs a partial session you can finish later.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
