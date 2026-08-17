"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useUserTable } from "@/lib/hooks/use-user-table";
import { nextSrsState, type Rating } from "@/lib/srs";
import { Star, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FlashcardsPage() {
  const { rows: cards, update, loading } = useUserTable("flashcards");
  const { insert: insertReview } = useUserTable("flashcard_reviews");

  const now = new Date();
  const due = cards.filter((c) => c.due_at && new Date(c.due_at) <= now);
  const stats = {
    due: due.length,
    learned: cards.filter((c) => c.state === "mature").length,
    young: cards.filter((c) => c.state === "young").length,
    mature: cards.filter((c) => c.state === "mature").length,
    difficult: cards.filter((c) => c.state === "difficult").length,
  };

  const [queue, setQueue] = React.useState(due);
  const [idx, setIdx] = React.useState(0);
  const [flipped, setFlipped] = React.useState(false);

  React.useEffect(() => {
    if (!loading) setQueue(due);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, cards.length]);

  const current = queue[idx];

  async function rate(rating: Rating) {
    if (!current) return;
    const next = nextSrsState(
      { interval_days: current.interval_days ?? 0, ease: current.ease ?? 2.5, repetitions: current.repetitions ?? 0, state: (current.state as never) ?? "new" },
      rating,
    );
    await update(current.id, next as never);
    await insertReview({ flashcard_id: current.id, rating } as never);
    setFlipped(false);
    setIdx((i) => i + 1);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 lg:py-10">
      <h1 className="text-2xl font-semibold">Flashcards</h1>
      <p className="mt-1 text-sm text-muted-foreground">Anki-style spaced repetition across vocab, kanji, grammar, and keigo.</p>

      <div className="mt-4 grid grid-cols-4 gap-2 text-center text-xs">
        <StatChip label="Due today" value={stats.due} />
        <StatChip label="Young" value={stats.young} />
        <StatChip label="Mature" value={stats.mature} />
        <StatChip label="Difficult" value={stats.difficult} />
      </div>

      <Tabs defaultValue="review" className="mt-6">
        <TabsList>
          <TabsTrigger value="review">Review ({stats.due})</TabsTrigger>
          <TabsTrigger value="browse">Browse ({cards.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="review">
          {idx >= queue.length ? (
            <Card>
              <CardContent className="flex flex-col items-center gap-2 p-10 text-center">
                <p className="text-lg font-medium">{queue.length === 0 ? "Nothing due right now" : "All caught up 🎉"}</p>
                <p className="text-sm text-muted-foreground">
                  {queue.length === 0 ? "Add cards from Vocabulary, Kanji, Grammar, or Keigo." : "Come back when more cards are due."}
                </p>
                <Button variant="outline" className="mt-2" onClick={() => { setQueue(due); setIdx(0); }}>
                  <RotateCcw className="size-4" /> Restart queue
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div>
              <p className="mb-2 text-center text-xs text-muted-foreground">{idx + 1} / {queue.length}</p>
              <Card className="min-h-56">
                <CardContent
                  className="relative flex min-h-56 flex-col items-center justify-center gap-3 p-8 text-center cursor-pointer"
                  onClick={() => setFlipped((f) => !f)}
                >
                  <span className="absolute right-4 top-4"><Star className={cn("size-4", current.is_starred && "fill-accent text-accent")} /></span>
                  <p className="jp text-2xl font-medium">{current.front}</p>
                  {flipped && (
                    <div className="mt-2 flex flex-col gap-1">
                      <p className="jp text-lg text-primary">{current.back}</p>
                      {current.example && <p className="jp text-sm text-muted-foreground">{current.example}</p>}
                    </div>
                  )}
                  {!flipped && <p className="text-xs text-muted-foreground">Tap to show answer</p>}
                </CardContent>
              </Card>
              {!flipped ? (
                <Button className="mt-4 w-full" onClick={() => setFlipped(true)}>Show Answer</Button>
              ) : (
                <div className="mt-4 grid grid-cols-4 gap-2">
                  <Button variant="destructive" onClick={() => rate("again")}>Again</Button>
                  <Button variant="outline" onClick={() => rate("hard")}>Hard</Button>
                  <Button variant="secondary" onClick={() => rate("good")}>Good</Button>
                  <Button variant="primary" onClick={() => rate("easy")}>Easy</Button>
                </div>
              )}
            </div>
          )}
        </TabsContent>
        <TabsContent value="browse">
          <div className="flex flex-col gap-2">
            {cards.map((c) => (
              <Card key={c.id}>
                <CardContent className="flex items-center justify-between p-3">
                  <div>
                    <p className="jp text-sm font-medium">{c.front}</p>
                    <p className="jp text-xs text-muted-foreground">{c.back}</p>
                  </div>
                  <Badge variant="outline">{c.state}</Badge>
                </CardContent>
              </Card>
            ))}
            {cards.length === 0 && (
              <p className="py-10 text-center text-sm text-muted-foreground">
                No flashcards yet — add some from Vocabulary, Kanji, Grammar, or Keigo pages.
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatChip({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-2">
      <p className="text-base font-semibold">{value}</p>
      <p className="text-muted-foreground">{label}</p>
    </div>
  );
}
