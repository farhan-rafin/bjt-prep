"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useUserTable } from "@/lib/hooks/use-user-table";
import { missions } from "@/content";
import { findCurrentPosition } from "@/lib/progress";
import { Lock, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function MissionsPage() {
  const { rows: sessions } = useUserTable("session_progress");
  const { rows: progress, upsert } = useUserTable("mission_progress");
  const pos = findCurrentPosition(sessions);
  const [drafts, setDrafts] = React.useState<Record<number, { observation: string; japanese_heard: string }>>({});

  function draftFor(week: number) {
    const existing = progress.find((p) => p.week === week);
    return drafts[week] ?? { observation: existing?.observation ?? "", japanese_heard: existing?.japanese_heard ?? "" };
  }

  async function save(week: number, completed: boolean) {
    const d = draftFor(week);
    await upsert(
      { week, is_completed: completed, observation: d.observation, japanese_heard: d.japanese_heard, completed_at: completed ? new Date().toISOString() : null } as never,
      "user_id,week",
    );
    toast.success(`Mission ${week} saved`);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 lg:py-10">
      <h1 className="text-2xl font-semibold">Japan Missions 🇯🇵</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Real-world tasks using your life in Japan as a free business-Japanese lab.
      </p>

      <div className="mt-5 flex flex-col gap-3">
        {missions.map((m) => {
          const unlocked = m.week <= pos.week;
          const existing = progress.find((p) => p.week === m.week);
          const d = draftFor(m.week);
          return (
            <Card key={m.week} className={!unlocked ? "opacity-60" : undefined}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Week {m.week} Mission</p>
                  {!unlocked ? (
                    <Badge variant="outline"><Lock className="size-3" /> Locked</Badge>
                  ) : existing?.is_completed ? (
                    <Badge variant="success"><CheckCircle2 className="size-3" /> Completed</Badge>
                  ) : (
                    <Badge variant="outline">Available</Badge>
                  )}
                </div>
                <p className="mt-2 text-sm">{m.mission}</p>
                {unlocked && (
                  <div className="mt-3 flex flex-col gap-2">
                    <Textarea
                      placeholder="My observation"
                      value={d.observation}
                      onChange={(e) => setDrafts((prev) => ({ ...prev, [m.week]: { ...d, observation: e.target.value } }))}
                    />
                    <Textarea
                      placeholder="What Japanese did you hear?"
                      value={d.japanese_heard}
                      onChange={(e) => setDrafts((prev) => ({ ...prev, [m.week]: { ...d, japanese_heard: e.target.value } }))}
                    />
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary" onClick={() => save(m.week, false)}>Save draft</Button>
                      <Button size="sm" onClick={() => save(m.week, true)}>Mark Completed</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
