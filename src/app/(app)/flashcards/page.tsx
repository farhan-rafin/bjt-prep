"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { relativeDueLabel } from "@/lib/relative-due";
import { useUserTable } from "@/lib/hooks/use-user-table";
import { useAuth } from "@/lib/auth-context";
import { createClient } from "@/lib/supabase/client";
import { nextSrsState, type Rating } from "@/lib/srs";
import { buildAllFlashcards } from "@/lib/seed-flashcards";
import { findCurrentPosition } from "@/lib/progress";
import { SpeakButton } from "@/components/speak-button";
import { useShowFurigana } from "@/lib/hooks/use-show-furigana";
import { Star, RotateCcw, RefreshCw, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Cards are seeded with back text as "reading — meaning" (see seed-flashcards.ts) so the
// reading can always be shown, even before the card is flipped — this app's flashcards assume
// the learner may not know the kanji yet.
function splitBack(back: string): [string | null, string] {
  const sep = " — ";
  const idx = back.indexOf(sep);
  if (idx === -1) return [null, back];
  return [back.slice(0, idx), back.slice(idx + sep.length)];
}

export default function FlashcardsPage() {
  const { user } = useAuth();
  const showFurigana = useShowFurigana();
  const supabase = React.useMemo(() => createClient(), []);
  const { rows: cards, update, loading, refetch } = useUserTable("flashcards");
  const { insert: insertReview } = useUserTable("flashcard_reviews");
  const { rows: sessions, loading: loadingSessions } = useUserTable("session_progress");

  const [seeding, setSeeding] = React.useState(false);
  const [browseFilter, setBrowseFilter] = React.useState("all");
  const seededRef = React.useRef(false);
  const totalDeckSize = React.useMemo(() => buildAllFlashcards(1).length, []);

  const seedDeck = React.useCallback(async () => {
    if (!user || seeding) return;
    setSeeding(true);
    const currentWeek = findCurrentPosition(sessions).week;
    const rows = buildAllFlashcards(currentWeek).map((r) => ({ ...r, user_id: user.id }));
    const chunkSize = 100;
    for (let i = 0; i < rows.length; i += chunkSize) {
      const chunk = rows.slice(i, i + chunkSize);
      const { error } = await supabase
        .from("flashcards")
        .upsert(chunk, { onConflict: "user_id,source_type,source_id", ignoreDuplicates: true });
      if (error) {
        toast.error("Couldn't build your deck: " + error.message);
        setSeeding(false);
        return;
      }
    }
    await refetch();
    setSeeding(false);
    toast.success(`Deck ready — ${rows.length} cards from your curriculum`);
  }, [user, seeding, sessions, supabase, refetch]);

  React.useEffect(() => {
    if (loading || loadingSessions || !user || seededRef.current) return;
    if (cards.length === 0) {
      seededRef.current = true;
      seedDeck();
    } else {
      seededRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, loadingSessions, user, cards.length]);

  const now = new Date();
  const due = cards.filter((c) => c.due_at && new Date(c.due_at) <= now);
  const stats = {
    due: due.length,
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
      <div className="flex items-start justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold">Flashcards</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Spaced-repetition review built into the app — no Anki install needed. Your full deck ({totalDeckSize}{" "}
            cards across vocab, kanji, grammar, and keigo) is paced to unlock as you move through the 24 weeks.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={seedDeck} disabled={seeding} className="shrink-0">
          {seeding ? <Loader2 className="size-3.5 animate-spin" /> : <RefreshCw className="size-3.5" />}
          Sync deck
        </Button>
      </div>

      {seeding && cards.length === 0 && (
        <p className="mt-3 text-xs text-muted-foreground">Building your deck for the first time — one moment…</p>
      )}

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
                  {queue.length === 0
                    ? "New cards unlock automatically as you progress through the weeks."
                    : "Come back when more cards are due."}
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
                  {(() => {
                    const [reading, rest] = splitBack(current.back);
                    return (
                      <>
                        <div className="flex items-center gap-1.5">
                          <p className="jp text-2xl font-medium">{current.front}</p>
                          <SpeakButton text={current.front} size="md" />
                        </div>
                        {reading && showFurigana && <p className="jp text-base text-muted-foreground">{reading}</p>}
                        {flipped && (
                          <div className="mt-2 flex flex-col gap-1">
                            <p className="jp text-lg text-primary">{rest}</p>
                            {current.example && <p className="jp text-sm text-muted-foreground">{current.example}</p>}
                          </div>
                        )}
                      </>
                    );
                  })()}
                  {!flipped && <p className="text-xs text-muted-foreground">Tap to show meaning</p>}
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
          <Select value={browseFilter} onValueChange={setBrowseFilter}>
            <SelectTrigger className="mb-3 w-48"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="vocab">Vocabulary</SelectItem>
              <SelectItem value="kanji">Kanji</SelectItem>
              <SelectItem value="grammar">Grammar</SelectItem>
              <SelectItem value="keigo">Keigo</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex flex-col gap-2">
            {cards
              .filter((c) => browseFilter === "all" || c.source_type === browseFilter)
              .sort((a, b) => new Date(a.due_at ?? 0).getTime() - new Date(b.due_at ?? 0).getTime())
              .map((c) => {
                const due = relativeDueLabel(c.due_at);
                return (
                  <Card key={c.id}>
                    <CardContent className="flex items-center justify-between p-3">
                      <div>
                        <p className="jp text-sm font-medium">{c.front}</p>
                        <p className="jp text-xs text-muted-foreground">{c.back}</p>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-1">
                        <Badge variant="outline">{c.state}</Badge>
                        <Badge variant={due.overdue ? "danger" : "default"}>{due.label}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            {cards.length === 0 && !seeding && (
              <p className="py-10 text-center text-sm text-muted-foreground">
                No flashcards yet — click &quot;Sync deck&quot; above to build your deck from the curriculum.
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
