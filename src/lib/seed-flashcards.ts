import {
  vocabulary, kanjiItems, grammarPoints, keigoPhrases, type VocabItem, type KanjiItem, type GrammarPoint, type KeigoPhrase,
} from "@/content";

export interface SeedFlashcard {
  source_type: "vocab" | "kanji" | "grammar" | "keigo";
  source_id: string;
  front: string;
  back: string;
  example: string | null;
  due_at: string;
}

function dueForWeek(itemWeek: number, currentWeek: number): string {
  const d = new Date();
  if (itemWeek > currentWeek) {
    d.setDate(d.getDate() + (itemWeek - currentWeek) * 7);
  }
  return d.toISOString();
}

// Source: Part 8 clusters are introduced month-by-month; approximate a week within that month.
function weekForVocab(v: VocabItem, indexInMonth: number): number {
  return (v.month - 1) * 4 + 1 + (indexInMonth % 4);
}

// Kanji already carries the week it's introduced (Part 27 / Part 9 categories mapped in content/kanji.ts).
function weekForKanji(k: KanjiItem): number {
  return k.week;
}

// Source: Part 7 — critical patterns are front-loaded (weeks 1-8), important patterns follow (weeks 5-16).
function weekForGrammar(g: GrammarPoint, index: number): number {
  if (g.tier === "critical") return 1 + (index % 8);
  return 5 + (index % 12);
}

// Source: Part 10 — six-month keigo arc: teineigo/cushions first, then kenjougo, then sonkeigo, mixed drills later.
function weekForKeigo(k: KeigoPhrase, index: number): number {
  if (k.type === "teineigo" || k.type === "cushion") return 1 + (index % 8);
  if (k.type === "kenjougo") return 5 + (index % 12);
  return 9 + (index % 16);
}

/** Builds the full flashcard deck from the curriculum. Grammar's "secondary" tier is excluded —
 * the source document says to recognise it, not drill it. Due dates are staggered to roughly match
 * when each item is introduced relative to the learner's current week, so the deck behaves like a
 * paced SRS rollout instead of dumping everything as "due today." */
export function buildAllFlashcards(currentWeek: number): SeedFlashcard[] {
  const cards: SeedFlashcard[] = [];

  const vocabByMonth = new Map<number, number>();
  vocabulary.forEach((v) => {
    const idx = vocabByMonth.get(v.month) ?? 0;
    vocabByMonth.set(v.month, idx + 1);
    cards.push({
      source_type: "vocab",
      source_id: v.id,
      front: v.japanese,
      back: `${v.reading} — ${v.meaning}`,
      example: v.example ? (v.exampleMeaning ? `${v.example} (${v.exampleMeaning})` : v.example) : null,
      due_at: dueForWeek(weekForVocab(v, idx), currentWeek),
    });
  });

  kanjiItems.forEach((k) => {
    cards.push({
      source_type: "kanji",
      source_id: k.id,
      front: k.kanji,
      back: `${k.reading} — ${k.meaning}`,
      example: k.compounds.join(" · "),
      due_at: dueForWeek(weekForKanji(k), currentWeek),
    });
  });

  grammarPoints
    .filter((g) => g.tier !== "secondary")
    .forEach((g, i) => {
      cards.push({
        source_type: "grammar",
        source_id: g.id,
        front: g.pattern,
        back: g.meaning,
        example: g.businessExample !== "—" ? g.businessExample : null,
        due_at: dueForWeek(weekForGrammar(g, i), currentWeek),
      });
    });

  keigoPhrases.forEach((k, i) => {
    cards.push({
      source_type: "keigo",
      source_id: k.id,
      front: k.phrase,
      back: `${k.reading} — ${k.meaning} (${k.formality})`,
      example: `${k.who} → ${k.toWhom}: ${k.rightSituation}`,
      due_at: dueForWeek(weekForKeigo(k, i), currentWeek),
    });
  });

  return cards;
}
