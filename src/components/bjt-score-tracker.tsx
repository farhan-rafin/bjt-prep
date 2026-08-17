"use client";
import { LineChart, Line, XAxis, YAxis, ReferenceLine, Tooltip, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge";
import type { MockTestRow } from "@/lib/progress";

const scoreTypeLabel: Record<string, string> = {
  raw_percentage: "Raw %",
  estimated_bjt: "Estimated BJT",
  actual_bjt: "Actual BJT",
};

export function BjtScoreTracker({ mocks, target = 420 }: { mocks: MockTestRow[]; target?: number }) {
  const sorted = [...mocks].sort((a, b) => new Date(a.test_date).getTime() - new Date(b.test_date).getTime());
  const data = sorted.map((m, i) => ({
    name: `Mock ${i + 1}`,
    score: m.total_score ?? 0,
    scoreType: m.score_type,
    date: m.test_date,
  }));
  const last = data[data.length - 1];
  const prev = data[data.length - 2];
  const delta = last && prev ? Math.round((last.score - prev.score) * 10) / 10 : null;
  const reachedJ2 = last && last.score >= target && last.scoreType !== "raw_percentage";

  if (data.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
        No mock tests yet. Your first full mock is scheduled around Week 20 — you can log one anytime from Mock
        Tests.
      </div>
    );
  }

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-2xl font-semibold">
            {last.score}
            <span className="text-sm font-normal text-muted-foreground"> / 800</span>
          </p>
          <p className="text-xs text-muted-foreground">{scoreTypeLabel[last.scoreType] ?? last.scoreType}</p>
        </div>
        {delta !== null && (
          <Badge variant={delta >= 0 ? "success" : "danger"}>
            {delta >= 0 ? "+" : ""}
            {delta} pts since last mock
          </Badge>
        )}
        {reachedJ2 && <Badge variant="accent">🎉 J2 Territory</Badge>}
      </div>
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: -20 }}>
            <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
            <YAxis domain={[0, 800]} tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
            <ReferenceLine y={target} stroke="var(--success)" strokeDasharray="4 4" label={{ value: "J2 = 420", position: "insideTopLeft", fontSize: 10, fill: "var(--success)" }} />
            <Tooltip
              contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }}
              formatter={(value, _name, item) => [
                `${value} (${scoreTypeLabel[(item?.payload as { scoreType?: string })?.scoreType ?? ""] ?? ""})`,
                "Score",
              ]}
            />
            <Line type="monotone" dataKey="score" stroke="var(--primary)" strokeWidth={2.5} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
