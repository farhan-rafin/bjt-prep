"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useUserTable } from "@/lib/hooks/use-user-table";
import { mistakeErrorCategories } from "@/content";
import { Plus, Trash2, Pencil } from "lucide-react";
import { toast } from "sonner";

const emptyForm = {
  question_type: "", question: "", my_answer: "", correct_answer: "",
  error_category: mistakeErrorCategories[0], why_wrong: "", what_learned: "", review_again_on: "",
};

export default function MistakesPage() {
  const { rows: mistakes, insert, update, remove } = useUserTable("mistakes");
  const [open, setOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [form, setForm] = React.useState(emptyForm);
  const [categoryFilter, setCategoryFilter] = React.useState("all");
  const [showResolved, setShowResolved] = React.useState(true);

  const now = new Date();
  const thisMonth = mistakes.filter((m) => m.created_at && new Date(m.created_at).getMonth() === now.getMonth());
  const tally: Record<string, number> = {};
  thisMonth.forEach((m) => { tally[m.error_category] = (tally[m.error_category] ?? 0) + 1; });
  const topWeakness = Object.entries(tally).sort((a, b) => b[1] - a[1])[0];

  const filtered = mistakes.filter((m) => {
    if (categoryFilter !== "all" && m.error_category !== categoryFilter) return false;
    if (!showResolved && m.is_resolved) return false;
    return true;
  });

  function openNew() {
    setForm(emptyForm);
    setEditingId(null);
    setOpen(true);
  }

  function openEdit(m: (typeof mistakes)[number]) {
    setForm({
      question_type: m.question_type ?? "", question: m.question ?? "", my_answer: m.my_answer ?? "",
      correct_answer: m.correct_answer ?? "", error_category: m.error_category, why_wrong: m.why_wrong ?? "",
      what_learned: m.what_learned ?? "", review_again_on: m.review_again_on ?? "",
    });
    setEditingId(m.id);
    setOpen(true);
  }

  async function save() {
    if (editingId) {
      await update(editingId, form as never);
    } else {
      await insert(form as never);
    }
    setOpen(false);
    toast.success("Mistake logged");
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 lg:py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Mistake Log</h1>
        <Button onClick={openNew}><Plus className="size-4" /> Log mistake</Button>
      </div>

      {topWeakness && (
        <Card className="mt-4 border-warning/30 bg-warning/5">
          <CardContent className="p-4 text-sm">
            <span className="font-semibold">Top Weakness This Month:</span> {topWeakness[0]} — {topWeakness[1]} mistakes
          </CardContent>
        </Card>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {mistakeErrorCategories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <Checkbox checked={showResolved} onCheckedChange={(v) => setShowResolved(!!v)} /> Show resolved
        </label>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {filtered.map((m) => (
          <Card key={m.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <Badge variant="danger">{m.error_category}</Badge>
                    {m.question_type && <Badge variant="outline">{m.question_type}</Badge>}
                    {m.is_resolved && <Badge variant="success">Resolved</Badge>}
                  </div>
                  {m.question && <p className="jp mt-2 text-sm font-medium">{m.question}</p>}
                  {(m.my_answer || m.correct_answer) && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      Your answer: {m.my_answer} → Correct: {m.correct_answer}
                    </p>
                  )}
                  {m.why_wrong && <p className="mt-1 text-sm">{m.why_wrong}</p>}
                  {m.what_learned && <p className="mt-1 text-sm text-muted-foreground">Learned: {m.what_learned}</p>}
                </div>
                <div className="flex shrink-0 gap-1">
                  <button onClick={() => openEdit(m)} aria-label="Edit"><Pencil className="size-4 text-muted-foreground" /></button>
                  <button onClick={() => remove(m.id)} aria-label="Delete"><Trash2 className="size-4 text-muted-foreground" /></button>
                </div>
              </div>
              <button
                className="mt-2 text-xs font-medium text-primary hover:underline"
                onClick={() => update(m.id, { is_resolved: !m.is_resolved } as never)}
              >
                {m.is_resolved ? "Mark unresolved" : "Mark resolved"}
              </button>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <p className="py-10 text-center text-sm text-muted-foreground">
            No mistakes logged yet. Once you start quizzes, incorrect answers will appear here so you know exactly
            what to repair.
          </p>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editingId ? "Edit mistake" : "Log a mistake"}</DialogTitle></DialogHeader>
          <div className="flex flex-col gap-3">
            <Input placeholder="Question type" value={form.question_type} onChange={(e) => setForm((f) => ({ ...f, question_type: e.target.value }))} />
            <Textarea placeholder="Question" value={form.question} onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))} />
            <Input placeholder="My answer" value={form.my_answer} onChange={(e) => setForm((f) => ({ ...f, my_answer: e.target.value }))} />
            <Input placeholder="Correct answer" value={form.correct_answer} onChange={(e) => setForm((f) => ({ ...f, correct_answer: e.target.value }))} />
            <Select value={form.error_category} onValueChange={(v) => setForm((f) => ({ ...f, error_category: v }))}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {mistakeErrorCategories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
            <Textarea placeholder="Why I got it wrong" value={form.why_wrong} onChange={(e) => setForm((f) => ({ ...f, why_wrong: e.target.value }))} />
            <Textarea placeholder="What I learned" value={form.what_learned} onChange={(e) => setForm((f) => ({ ...f, what_learned: e.target.value }))} />
            <Input type="date" value={form.review_again_on} onChange={(e) => setForm((f) => ({ ...f, review_again_on: e.target.value }))} />
            <Button onClick={save}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
