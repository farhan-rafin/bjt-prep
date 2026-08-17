"use client";
import * as React from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useItemStatus } from "@/lib/hooks/use-item-status";
import { useUserTable } from "@/lib/hooks/use-user-table";
import { keigoPhrases, keigoTypeInfo, keigoSampleDialogue, whoSaysThisGame } from "@/content";
import { QuizShell, type QuizItem } from "@/components/quiz/quiz-shell";
import { Bookmark, Plus, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const types = ["teineigo", "sonkeigo", "kenjougo", "cushion"] as const;

function KeigoInner() {
  const searchParams = useSearchParams();
  const [query, setQuery] = React.useState(searchParams.get("q") ?? "");
  const { map, toggleBookmark } = useItemStatus("grammar_status", "grammar_id");
  const { upsert: upsertFlashcard } = useUserTable("flashcards");

  const filtered = keigoPhrases.filter((k) => !query || k.phrase.includes(query) || k.meaning.toLowerCase().includes(query.toLowerCase()));

  const whoSaysQuizItems: QuizItem[] = whoSaysThisGame.map((q) => ({
    id: q.id,
    prompt: q.phrase,
    options: q.options,
    correctIndex: q.correctIndex,
    explanation: q.explanation,
    category: "Keigo",
  }));

  async function addToReview(k: (typeof keigoPhrases)[number]) {
    await upsertFlashcard(
      { source_type: "keigo", source_id: k.id, front: k.phrase, back: `${k.meaning} (${k.formality})`, example: `${k.who} → ${k.toWhom}: ${k.rightSituation}` } as never,
      "user_id,source_type,source_id",
    );
    toast.success(`Added ${k.phrase} to Flashcards`);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 lg:py-10">
      <h1 className="text-2xl font-semibold">Keigo Lab <span className="jp">敬語</span></h1>
      <p className="mt-1 text-sm text-muted-foreground">Recognition first: who says what to whom.</p>

      <Card className="mt-5">
        <CardContent className="p-4">
          <p className="mb-2 text-xs font-medium text-muted-foreground">Example — customer service</p>
          {keigoSampleDialogue.map((d, i) => (
            <p key={i} className="jp text-sm">
              <span className="font-medium text-muted-foreground">{d.speaker}: </span>
              {d.line}
            </p>
          ))}
        </CardContent>
      </Card>

      <Tabs defaultValue="library" className="mt-5">
        <TabsList>
          <TabsTrigger value="library">Phrases</TabsTrigger>
          <TabsTrigger value="game">Who Says This?</TabsTrigger>
        </TabsList>
        <TabsContent value="library">
          <div className="relative mb-4 mt-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search keigo…" className="pl-9" />
          </div>
          {types.map((type) => {
            const items = filtered.filter((k) => k.type === type);
            if (items.length === 0) return null;
            return (
              <section key={type} className="mb-6">
                <div className="mb-2">
                  <h2 className="jp text-base font-semibold">
                    {keigoTypeInfo[type].label} <span className="text-sm font-normal text-muted-foreground">{keigoTypeInfo[type].romaji}</span>
                  </h2>
                  <p className="text-xs text-muted-foreground">{keigoTypeInfo[type].description}</p>
                </div>
                <div className="flex flex-col gap-2">
                  {items.map((k) => {
                    const st = map.get(k.id);
                    return (
                      <Card key={k.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="jp text-lg font-medium">{k.phrase}</p>
                              <p className="text-sm">{k.meaning}</p>
                            </div>
                            <div className="flex shrink-0 items-center gap-2">
                              <button onClick={() => toggleBookmark(k.id)} aria-label="Bookmark">
                                <Bookmark className={cn("size-4", st?.is_bookmarked ? "fill-accent text-accent" : "text-muted-foreground")} />
                              </button>
                            </div>
                          </div>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            <Badge variant="outline">{k.formality}</Badge>
                            <Badge variant="outline">{k.who} → {k.toWhom}</Badge>
                          </div>
                          <p className="mt-2 text-sm"><span className="text-muted-foreground">Right situation: </span>{k.rightSituation}</p>
                          {k.wrongSituation && <p className="text-sm text-warning"><span className="text-muted-foreground">Avoid: </span>{k.wrongSituation}</p>}
                          <button onClick={() => addToReview(k)} className="mt-2 flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                            <Plus className="size-3" /> Add to Flashcards
                          </button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </TabsContent>
        <TabsContent value="game">
          <p className="mb-4 text-sm text-muted-foreground">Who would most appropriately say this?</p>
          <QuizShell items={whoSaysQuizItems} quizType="keigo_who_says" />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function KeigoPage() {
  return (
    <Suspense fallback={null}>
      <KeigoInner />
    </Suspense>
  );
}
