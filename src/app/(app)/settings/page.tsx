"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/lib/auth-context";
import { useUserTable } from "@/lib/hooks/use-user-table";
import { durationOutcomes, type DurationOption } from "@/content";
import { Download, LogOut } from "lucide-react";
import { toast } from "sonner";

const DAYS = [
  { value: 1, label: "Monday" }, { value: 2, label: "Tuesday" }, { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" }, { value: 5, label: "Friday" }, { value: 6, label: "Saturday" }, { value: 0, label: "Sunday" },
];

export default function SettingsPage() {
  const router = useRouter();
  const { user, profile, updateProfile, signOut } = useAuth();
  const mistakesTable = useUserTable("mistakes");
  const mockTable = useUserTable("mock_tests");
  const vocabTable = useUserTable("vocab_status");
  const studyLogsTable = useUserTable("study_logs");

  if (!user || !profile) {
    return <div className="p-8 text-sm text-muted-foreground">Log in to manage settings.</div>;
  }

  function downloadJson() {
    const payload = {
      profile,
      mistakes: mistakesTable.rows,
      mock_tests: mockTable.rows,
      vocab_status: vocabTable.rows,
      study_logs: studyLogsTable.rows,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bjt-quest-backup.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Backup downloaded");
  }

  function downloadCsv(rows: Record<string, unknown>[], filename: string) {
    if (rows.length === 0) {
      toast.error("Nothing to export yet");
      return;
    }
    const headers = Object.keys(rows[0]);
    const csv = [headers.join(","), ...rows.map((r) => headers.map((h) => JSON.stringify(r[h] ?? "")).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-6 lg:py-10">
      <h1 className="text-2xl font-semibold">Settings</h1>

      <Card className="mt-5">
        <CardHeader><CardTitle>Profile</CardTitle></CardHeader>
        <CardContent className="flex flex-col gap-3 pt-4">
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">Name</label>
            <Input defaultValue={profile.name ?? ""} onBlur={(e) => updateProfile({ name: e.target.value })} />
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">Email</label>
            <Input value={user.email ?? ""} disabled />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs text-muted-foreground">Target level</label>
              <Input defaultValue={profile.target_level ?? "J2"} onBlur={(e) => updateProfile({ target_level: e.target.value })} />
            </div>
            <div>
              <label className="mb-1 block text-xs text-muted-foreground">Target score</label>
              <Input
                type="number"
                defaultValue={profile.target_score ?? 420}
                onBlur={(e) => updateProfile({ target_score: Number(e.target.value) })}
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">Exam date</label>
            <Input type="date" defaultValue={profile.exam_date ?? ""} onChange={(e) => updateProfile({ exam_date: e.target.value })} />
          </div>
        </CardContent>
      </Card>

      <Card className="mt-5">
        <CardHeader><CardTitle>Study Schedule</CardTitle></CardHeader>
        <CardContent className="flex flex-col gap-4 pt-4">
          <div>
            <p className="mb-2 text-xs text-muted-foreground">Study days (choose 4)</p>
            <div className="grid grid-cols-2 gap-2">
              {DAYS.map((d) => {
                const checked = (profile.study_days ?? []).includes(d.value);
                return (
                  <label key={d.value} className="flex items-center gap-2 text-sm">
                    <Checkbox
                      checked={checked}
                      onCheckedChange={(v) => {
                        const current = profile.study_days ?? [];
                        const next = v ? [...current, d.value] : current.filter((x) => x !== d.value);
                        updateProfile({ study_days: next });
                      }}
                    />
                    {d.label}
                  </label>
                );
              })}
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs text-muted-foreground">Default session duration</p>
            <div className="grid grid-cols-4 gap-2">
              {([2, 3, 4, 5] as DurationOption[]).map((d) => (
                <button
                  key={d}
                  onClick={() => updateProfile({ session_duration: d })}
                  className={`rounded-lg border px-2 py-2 text-xs font-medium ${profile.session_duration === d ? "border-primary bg-primary/5 text-primary" : "border-border"}`}
                >
                  {durationOutcomes[d].label}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-5">
        <CardHeader><CardTitle>Preferences</CardTitle></CardHeader>
        <CardContent className="flex flex-col gap-4 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Show furigana</p>
              <p className="text-xs text-muted-foreground">Turn off to test kanji recognition</p>
            </div>
            <Switch checked={profile.show_furigana ?? true} onCheckedChange={(v) => updateProfile({ show_furigana: v })} />
          </div>
          <div>
            <p className="mb-1 text-sm font-medium">Explanation language</p>
            <Select value={profile.explanation_language ?? "english"} onValueChange={(v) => updateProfile({ explanation_language: v })}>
              <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="japanese">Japanese</SelectItem>
                <SelectItem value="both">English + Japanese</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-5">
        <CardHeader><CardTitle>Data Export &amp; Backup</CardTitle></CardHeader>
        <CardContent className="flex flex-col gap-2 pt-4">
          <Button variant="outline" onClick={downloadJson}><Download className="size-4" /> Export full backup (JSON)</Button>
          <Button variant="outline" onClick={() => downloadCsv(mistakesTable.rows as never, "mistakes.csv")}><Download className="size-4" /> Export mistake log (CSV)</Button>
          <Button variant="outline" onClick={() => downloadCsv(mockTable.rows as never, "mock-tests.csv")}><Download className="size-4" /> Export mock tests (CSV)</Button>
          <Button variant="outline" onClick={() => downloadCsv(vocabTable.rows as never, "vocabulary-progress.csv")}><Download className="size-4" /> Export vocabulary progress (CSV)</Button>
        </CardContent>
      </Card>

      <Button
        variant="destructive"
        className="mt-6 w-full"
        onClick={async () => {
          await signOut();
          router.push("/login");
        }}
      >
        <LogOut className="size-4" /> Sign out
      </Button>
    </div>
  );
}
