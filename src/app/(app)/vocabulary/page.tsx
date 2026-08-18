"use client";
import * as React from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useItemStatus } from "@/lib/hooks/use-item-status";
import { useUserTable } from "@/lib/hooks/use-user-table";
import { vocabulary, vocabCategories, vocabTotalTarget, vocabWeeklyTarget } from "@/content";
import { Bookmark, Plus, Check, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { JapaneseAuto } from "@/components/japanese-text";
import { SpeakButton } from "@/components/speak-button";
import { useShowFurigana } from "@/lib/hooks/use-show-furigana";

function VocabularyInner() {
  const searchParams = useSearchParams();
  const [query, setQuery] = React.useState(searchParams.get("q") ?? "");
  const [category, setCategory] = React.useState<string>("all");
  const [filter, setFilter] = React.useState<string>("all");
  const { map, setStatus, toggleBookmark } = useItemStatus("vocab_status", "vocab_id");
  const { upsert: upsertFlashcard } = useUserTable("flashcards");
  const showFurigana = useShowFurigana();

  const learnedCount = vocabulary.filter((v) => map.get(v.id)?.status === "learned").length;

  const filtered = vocabulary.filter((v) => {
    if (category !== "all" && v.category !== category) return false;
    const st = map.get(v.id);
    if (filter === "learned" && st?.status !== "learned") return false;
    if (filter === "unlearned" && st?.status === "learned") return false;
    if (filter === "difficult" && st?.status !== "difficult") return false;
    if (filter === "bookmarked" && !st?.is_bookmarked) return false;
    if (query && !(v.japanese.includes(query) || v.reading.includes(query) || v.meaning.toLowerCase().includes(query.toLowerCase()))) return false;
    return true;
  });

  async function addToReview(v: (typeof vocabulary)[number]) {
    await upsertFlashcard(
      {
        source_type: "vocab",
        source_id: v.id,
        front: v.japanese,
        back: `${v.reading} — ${v.meaning}`,
        example: v.example ?? null,
      } as never,
      "user_id,source_type,source_id",
    );
    toast.success(`Added ${v.japanese} to Flashcards`);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 lg:py-10">
      <h1 className="text-2xl font-semibold">Vocabulary Journey</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {learnedCount} / {vocabTotalTarget} learned · target {vocabWeeklyTarget.min}–{vocabWeeklyTarget.max} new words/week
      </p>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search vocabulary…" className="pl-9" />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="sm:w-48"><SelectValue placeholder="Category" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {vocabCategories().map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="sm:w-44"><SelectValue placeholder="Filter" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All words</SelectItem>
            <SelectItem value="learned">Learned</SelectItem>
            <SelectItem value="unlearned">Unlearned</SelectItem>
            <SelectItem value="difficult">Difficult</SelectItem>
            <SelectItem value="bookmarked">Bookmarked</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        {filtered.map((v) => {
          const st = map.get(v.id);
          return (
            <Card key={v.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="jp text-lg font-medium">{v.japanese}</p>
                      <SpeakButton text={v.japanese} />
                    </div>
                    {showFurigana && <p className="jp text-sm text-muted-foreground">{v.reading}</p>}
                    <p className="mt-1 text-sm">{v.meaning}</p>
                    {v.example && (
                      <div className="mt-1">
                        <p className="text-xs text-muted-foreground"><JapaneseAuto text={v.example} /></p>
                        {v.exampleMeaning && <p className="text-xs italic text-muted-foreground/80">{v.exampleMeaning}</p>}
                      </div>
                    )}
                    <Badge variant="outline" className="mt-2">{v.category}</Badge>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1.5">
                    <button onClick={() => toggleBookmark(v.id)} aria-label="Bookmark">
                      <Bookmark className={cn("size-4", st?.is_bookmarked ? "fill-accent text-accent" : "text-muted-foreground")} />
                    </button>
                    <Button size="sm" variant="ghost" className="px-1.5" onClick={() => addToReview(v)}>
                      <Plus className="size-3.5" /> Review
                    </Button>
                  </div>
                </div>
                <div className="mt-3 flex gap-1.5">
                  {["new", "learning", "learned", "difficult"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setStatus(v.id, s)}
                      className={cn(
                        "rounded-full border px-2 py-0.5 text-[11px] font-medium capitalize transition-colors",
                        st?.status === s ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:bg-surface-muted",
                      )}
                    >
                      {st?.status === s && <Check className="mr-0.5 inline size-2.5" />}
                      {s}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
        {filtered.length === 0 && (
          <p className="col-span-2 py-10 text-center text-sm text-muted-foreground">No words match these filters.</p>
        )}
      </div>
    </div>
  );
}

export default function VocabularyPage() {
  return (
    <Suspense fallback={null}>
      <VocabularyInner />
    </Suspense>
  );
}
