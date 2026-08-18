"use client";
import * as React from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useItemStatus } from "@/lib/hooks/use-item-status";
import { grammarPoints, grammarTierInfo } from "@/content";
import { buildGrammarQuiz } from "@/lib/quiz-generators";
import { QuizShell } from "@/components/quiz/quiz-shell";
import { NoteDialog } from "@/components/notes/note-dialog";
import { JapaneseAuto } from "@/components/japanese-text";
import { SpeakButton } from "@/components/speak-button";
import { Check, Bookmark, NotebookPen, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const tiers = ["critical", "important", "secondary"] as const;

function GrammarInner() {
  const searchParams = useSearchParams();
  const [query, setQuery] = React.useState(searchParams.get("q") ?? "");
  const { map, setStatus, toggleBookmark } = useItemStatus("grammar_status", "grammar_id");
  const [noteFor, setNoteFor] = React.useState<(typeof grammarPoints)[number] | null>(null);
  const quizItems = React.useMemo(() => buildGrammarQuiz(), []);

  const filtered = grammarPoints.filter(
    (g) => !query || g.pattern.includes(query) || g.meaning.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 lg:py-10">
      <h1 className="text-2xl font-semibold">Grammar Library</h1>
      <p className="mt-1 text-sm text-muted-foreground">Business-first grammar for BJT — critical patterns first.</p>

      <Tabs defaultValue="library" className="mt-5">
        <TabsList>
          <TabsTrigger value="library">Library</TabsTrigger>
          <TabsTrigger value="quiz">Quiz Me</TabsTrigger>
        </TabsList>
        <TabsContent value="library">
          <div className="relative mb-4 mt-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search grammar…" className="pl-9" />
          </div>
          {tiers.map((tier) => {
            const items = filtered.filter((g) => g.tier === tier);
            if (items.length === 0) return null;
            return (
              <section key={tier} className="mb-6">
                <div className="mb-2 flex items-baseline gap-2">
                  <h2 className="text-base font-semibold">{grammarTierInfo[tier].label}</h2>
                  <span className="text-xs text-muted-foreground">{grammarTierInfo[tier].description}</span>
                </div>
                <div className="flex flex-col gap-2">
                  {items.map((g) => {
                    const st = map.get(g.id);
                    return (
                      <Card key={g.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-base font-medium"><JapaneseAuto text={g.pattern} /></p>
                              <p className="text-sm text-muted-foreground">{g.meaning}</p>
                            </div>
                            <button onClick={() => toggleBookmark(g.id)} aria-label="Bookmark">
                              <Bookmark className={cn("size-4", st?.is_bookmarked ? "fill-accent text-accent" : "text-muted-foreground")} />
                            </button>
                          </div>
                          {g.whenUsed && <p className="mt-2 text-sm"><span className="text-muted-foreground">When used: </span>{g.whenUsed}</p>}
                          {g.simpleExample && (
                            <div className="mt-1 text-sm">
                              <span className="text-muted-foreground not-italic">Example: </span>
                              <JapaneseAuto text={g.simpleExample} />
                              <SpeakButton text={g.simpleExample} className="ml-1" />
                              {g.simpleExampleMeaning && <p className="mt-0.5 text-xs italic text-muted-foreground/80">{g.simpleExampleMeaning}</p>}
                            </div>
                          )}
                          <div className="mt-1 text-sm">
                            <span className="text-muted-foreground">Business: </span>
                            <JapaneseAuto text={g.businessExample} />
                            <SpeakButton text={g.businessExample} className="ml-1" />
                            {g.businessExampleMeaning && <p className="mt-0.5 text-xs italic text-muted-foreground/80">{g.businessExampleMeaning}</p>}
                          </div>
                          {g.commonMistake && (
                            <p className="mt-1 text-sm text-warning"><span className="text-muted-foreground">Common mistake: </span>{g.commonMistake}</p>
                          )}
                          <div className="mt-3 flex flex-wrap items-center gap-1.5">
                            <button
                              onClick={() => setStatus(g.id, st?.status === "learned" ? "new" : "learned")}
                              className={cn(
                                "rounded-full border px-2 py-0.5 text-[11px] font-medium transition-colors",
                                st?.status === "learned" ? "border-success bg-success/10 text-success" : "border-border text-muted-foreground hover:bg-surface-muted",
                              )}
                            >
                              {st?.status === "learned" && <Check className="mr-0.5 inline size-2.5" />}
                              {st?.status === "learned" ? "Learned" : "Mark learned"}
                            </button>
                            <Button size="sm" variant="ghost" onClick={() => setNoteFor(g)}>
                              <NotebookPen className="size-3.5" /> Add note
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </TabsContent>
        <TabsContent value="quiz">
          <QuizShell items={quizItems} quizType="grammar" />
        </TabsContent>
      </Tabs>

      {noteFor && (
        <NoteDialog
          open={!!noteFor}
          onOpenChange={(v) => !v && setNoteFor(null)}
          noteType="grammar"
          linkedType="grammar"
          linkedId={noteFor.id}
          prefill={{ Grammar: noteFor.pattern, Meaning: noteFor.meaning, "Business example": noteFor.businessExample }}
        />
      )}
    </div>
  );
}

export default function GrammarPage() {
  return (
    <Suspense fallback={null}>
      <GrammarInner />
    </Suspense>
  );
}
