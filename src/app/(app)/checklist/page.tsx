"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useUserTable } from "@/lib/hooks/use-user-table";
import { masterChecklist } from "@/content";
import { percent } from "@/lib/utils";

const groups = ["Setup", "Skills", "Practice Volume", "Final Stretch"] as const;

export default function ChecklistPage() {
  const { rows, upsert } = useUserTable("checklist_status");
  const checkedIds = new Set(rows.filter((r) => r.is_checked).map((r) => r.item_id));
  const readiness = percent(checkedIds.size, masterChecklist.length);

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 lg:py-10">
      <h1 className="text-2xl font-semibold">J2 Readiness Checklist</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Your six-month master checklist, in one place. This tracks preparation coverage — not a probability of passing.
      </p>

      <Card className="mt-5">
        <CardContent className="p-4">
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="font-medium">J2 Readiness</span>
            <span>{readiness}%</span>
          </div>
          <Progress value={readiness} />
        </CardContent>
      </Card>

      {groups.map((g) => (
        <section key={g} className="mt-6">
          <h2 className="mb-2 text-base font-semibold">{g}</h2>
          <div className="flex flex-col gap-1">
            {masterChecklist.filter((c) => c.group === g).map((c) => (
              <label key={c.id} className="flex items-center gap-3 rounded-lg border border-border bg-surface p-3 text-sm">
                <Checkbox
                  checked={checkedIds.has(c.id)}
                  onCheckedChange={(v) => upsert({ item_id: c.id, is_checked: !!v } as never, "user_id,item_id")}
                />
                {c.label}
              </label>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
