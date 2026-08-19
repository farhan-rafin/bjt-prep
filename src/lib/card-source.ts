import { vocabulary, kanjiItems, grammarPoints, keigoPhrases } from "@/content";

/**
 * Resolves a stored flashcard back to the curriculum item it was seeded from.
 *
 * Cards live in the database as plain strings (front / back / example), so a deck seeded before
 * readings existed has no kana and no separated English. Rather than migrate every row, we look
 * the source item up by `source_type` + `source_id` at render time — the content files stay the
 * single source of truth, and existing decks gain furigana the moment the content has it.
 */
export interface CardSource {
  /** Kana reading of the card front. */
  frontReading?: string;
  /** English meaning, separated from the reading rather than glued into one string. */
  meaning?: string;
  /** The Japanese example sentence, without any English appended. */
  example?: string;
  /** Kana reading of `example`, for aligned furigana. */
  exampleReading?: string;
  /** English translation of `example`. */
  exampleMeaning?: string;
  /** Compounds with their own readings (kanji cards only). */
  compounds?: { text: string; reading: string }[];
  /** Extra context line (keigo cards: who says it to whom). */
  note?: string;
}

const vocabById = new Map(vocabulary.map((v) => [v.id, v]));
const kanjiById = new Map(kanjiItems.map((k) => [k.id, k]));
const grammarById = new Map(grammarPoints.map((g) => [g.id, g]));
const keigoById = new Map(keigoPhrases.map((k) => [k.id, k]));

export function lookupCardSource(sourceType: string, sourceId: string): CardSource {
  switch (sourceType) {
    case "vocab": {
      const v = vocabById.get(sourceId);
      if (!v) return {};
      return {
        frontReading: v.reading,
        meaning: v.meaning,
        example: v.example,
        exampleReading: v.exampleReading,
        exampleMeaning: v.exampleMeaning,
      };
    }
    case "kanji": {
      const k = kanjiById.get(sourceId);
      if (!k) return {};
      return { frontReading: k.reading, meaning: k.meaning, compounds: k.compounds };
    }
    case "grammar": {
      const g = grammarById.get(sourceId);
      if (!g) return {};
      const hasExample = g.businessExample && g.businessExample !== "—";
      return {
        meaning: g.meaning,
        example: hasExample ? g.businessExample : undefined,
        exampleReading: hasExample ? g.businessExampleReading : undefined,
        exampleMeaning: hasExample ? g.businessExampleMeaning : undefined,
        note: g.whenUsed,
      };
    }
    case "keigo": {
      const k = keigoById.get(sourceId);
      if (!k) return {};
      return {
        frontReading: k.reading,
        meaning: k.meaning,
        note: `${k.who} → ${k.toWhom} · ${k.formality}`,
      };
    }
    default:
      return {};
  }
}
