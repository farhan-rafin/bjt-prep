"use client";
import * as React from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useItemStatus } from "@/lib/hooks/use-item-status";
import { kanjiItems, kanjiCategories, kanjiTotalTarget, kanjiWeeklyTarget } from "@/content";
import { SpeakButton } from "@/components/speak-button";
import { useShowFurigana } from "@/lib/hooks/use-show-furigana";
import { Bookmark, Check, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { KanjiQuiz } from "@/components/kanji/kanji-quiz";

function KanjiInner() {
  const searchParams = useSearchParams();
  const [query, setQuery] = React.useState(searchParams.get("q") ?? "");
  const [category, setCategory] = React.useState("all");
  const [filter, setFilter] = React.useState("all");
  const { map, setStatus, toggleBookmark } = useItemStatus("kanji_status", "kanji_id");
  const showFurigana = useShowFurigana();

  const learnedCount = kanjiItems.filter((k) => map.get(k.id)?.status === "learned").length;

  const filtered = kanjiItems.filter((k) => {
    if (category !== "all" && k.category !== category) return false;
    const st = map.get(k.id);
    if (filter === "learned" && st?.status !== "learned") return false;
    if (filter === "unlearned" && st?.status === "learned") return false;
    if (filter === "difficult" && st?.status !== "difficult") return false;
    if (filter === "bookmarked" && !st?.is_bookmarked) return false;
    if (query && !(k.kanji.includes(query) || k.reading.includes(query) || k.meaning.toLowerCase().includes(query.toLowerCase()))) return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 lg:py-10">
      <h1 className="text-2xl font-semibold">Kanji Recognition</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {learnedCount} / {kanjiTotalTarget} recognised · {kanjiWeeklyTarget.min}–{kanjiWeeklyTarget.max} new/week ·
        recognition &amp; reading speed matter — not handwriting.
      </p>

      <Tabs defaultValue="browse" className="mt-5">
        <TabsList>
          <TabsTrigger value="browse">Browse</TabsTrigger>
          <TabsTrigger value="quiz">Quiz Me</TabsTrigger>
        </TabsList>
        <TabsContent value="browse">
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search kanji…" className="pl-9" />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="sm:w-48"><SelectValue placeholder="Category" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {kanjiCategories().map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="sm:w-44"><SelectValue placeholder="Filter" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All kanji</SelectItem>
                <SelectItem value="learned">Learned</SelectItem>
                <SelectItem value="unlearned">Unlearned</SelectItem>
                <SelectItem value="difficult">Difficult</SelectItem>
                <SelectItem value="bookmarked">Bookmarked</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {filtered.map((k) => {
              const st = map.get(k.id);
              return (
                <Card key={k.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="jp text-3xl font-medium">{k.kanji}</p>
                          <SpeakButton text={k.kanji} />
                        </div>
                        {showFurigana && <p className="jp mt-1 text-sm text-muted-foreground">{k.reading}</p>}
                        <p className="text-sm">{k.meaning}</p>
                        <p className="jp mt-1 text-xs text-muted-foreground">{k.compounds.join(" · ")}</p>
                        <Badge variant="outline" className="mt-2">{k.category} · Week {k.week}</Badge>
                      </div>
                      <button onClick={() => toggleBookmark(k.id)} aria-label="Bookmark">
                        <Bookmark className={cn("size-4", st?.is_bookmarked ? "fill-accent text-accent" : "text-muted-foreground")} />
                      </button>
                    </div>
                    <div className="mt-3 flex gap-1.5">
                      {["new", "learning", "learned", "difficult"].map((s) => (
                        <button
                          key={s}
                          onClick={() => setStatus(k.id, s)}
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
          </div>
        </TabsContent>
        <TabsContent value="quiz">
          <KanjiQuiz />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function KanjiPage() {
  return (
    <Suspense fallback={null}>
      <KanjiInner />
    </Suspense>
  );
}
