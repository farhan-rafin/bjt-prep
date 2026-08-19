import {
  listeningItems, visualItems, combinedItems, integratedItems,
  clozeQuestions, expressionItems, readingPassages, practiceQuestions,
  type VisualItem,
} from "@/content";
import { shuffle } from "@/lib/quiz-generators";

/* ────────────────────────────────────────────────────────────────────────────
 * Mock exam built to the real BJT blueprint.
 *
 * 80 questions across three timed sections, in the official proportions:
 *   Section 1 聴解      5 + 10 + 10 = 25   (~45 min)
 *   Section 2 聴読解    5 + 10 + 10 = 25   (~30 min)
 *   Section 3 読解     10 + 10 + 10 = 30   (~30 min)
 *
 * Exam conditions apply while sitting it: no furigana, no English glosses, no
 * per-question feedback. Everything is revealed together in the review afterwards.
 * ──────────────────────────────────────────────────────────────────────────── */

export type MockSection = 1 | 2 | 3;

/** How a question must be presented — each maps to a different renderer. */
export type MockQuestionKind = "audio" | "audioVisual" | "audioTable" | "audioDocument" | "text" | "textPassage";

export interface MockQuestion {
  id: string;
  section: MockSection;
  typeId: string;
  typeJa: string;
  kind: MockQuestionKind;
  /** Lines fed to TTS, in order. Present for every audio-bearing kind. */
  audioLines?: string[];
  /** Rendered as an on-screen notice for 場面把握（画像あり）. */
  visual?: VisualItem;
  /** Rendered as a table for 資料聴読解. */
  table?: { headers: string[]; rows: string[][] };
  /** Rendered as a document body for 総合聴読解 and 総合読解. */
  document?: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface SectionSpec {
  section: MockSection;
  ja: string;
  en: string;
  minutes: number;
  /** Question count per type, in exam order. */
  types: { typeId: string; typeJa: string; count: number }[];
}

export const sectionSpecs: SectionSpec[] = [
  {
    section: 1, ja: "聴解テスト", en: "Listening", minutes: 45,
    types: [
      { typeId: "situational-listening", typeJa: "場面把握", count: 5 },
      { typeId: "conversational-listening", typeJa: "発言聴解", count: 10 },
      { typeId: "general-listening", typeJa: "総合聴解", count: 10 },
    ],
  },
  {
    section: 2, ja: "聴読解テスト", en: "Listening & Reading", minutes: 30,
    types: [
      { typeId: "situational-visual", typeJa: "場面把握（画像あり）", count: 5 },
      { typeId: "info-listening-reading", typeJa: "資料聴読解", count: 10 },
      { typeId: "general-listening-reading", typeJa: "総合聴読解", count: 10 },
    ],
  },
  {
    section: 3, ja: "読解テスト", en: "Reading", minutes: 30,
    types: [
      { typeId: "vocab-grammar", typeJa: "語彙・文法", count: 10 },
      { typeId: "expression-reading", typeJa: "表現読解", count: 10 },
      { typeId: "general-reading", typeJa: "総合読解", count: 10 },
    ],
  },
];

export const TOTAL_MOCK_QUESTIONS = sectionSpecs.reduce(
  (n, s) => n + s.types.reduce((m, t) => m + t.count, 0), 0,
);
export const TOTAL_MOCK_MINUTES = sectionSpecs.reduce((n, s) => n + s.minutes, 0);

/**
 * Draws `count` items from `pool` without repeats where possible. Some banks are still
 * smaller than the exam's per-type count, so the remainder cycles a reshuffled pool
 * rather than silently shipping a short section.
 */
function draw<T>(pool: T[], count: number): T[] {
  if (pool.length === 0) return [];
  const out: T[] = [];
  let batch = shuffle(pool);
  while (out.length < count) {
    if (batch.length === 0) batch = shuffle(pool);
    out.push(batch.pop()!);
  }
  return out;
}

function buildType(typeId: string, typeJa: string, section: MockSection, count: number): MockQuestion[] {
  const tag = (id: string, i: number) => `${typeId}-${id}-${i}`;

  switch (typeId) {
    case "situational-listening":
    case "conversational-listening":
    case "general-listening": {
      const kindMap: Record<string, string> = {
        "situational-listening": "situational",
        "conversational-listening": "conversational",
        "general-listening": "general",
      };
      const pool = listeningItems.filter((i) => i.type === kindMap[typeId]);
      return draw(pool, count).map((it, i) => ({
        id: tag(it.id, i), section, typeId, typeJa, kind: "audio" as const,
        audioLines: it.lines.map((l) => l.text),
        prompt: it.question, options: it.options, correctIndex: it.correctIndex,
        explanation: it.explanation,
      }));
    }

    case "situational-visual":
      return draw(visualItems, count).map((it, i) => ({
        id: tag(it.id, i), section, typeId, typeJa, kind: "audioVisual" as const,
        audioLines: [it.audioScript], visual: it,
        prompt: it.question, options: it.options, correctIndex: it.correctIndex,
        explanation: it.explanation,
      }));

    case "info-listening-reading":
      return draw(combinedItems, count).map((it, i) => ({
        id: tag(it.id, i), section, typeId, typeJa, kind: "audioTable" as const,
        audioLines: [it.audioClue],
        table: { headers: it.tableHeaders, rows: it.tableRows },
        document: it.title,
        prompt: it.question, options: it.options, correctIndex: it.correctIndex,
        explanation: it.explanation,
      }));

    case "general-listening-reading":
      return draw(integratedItems, count).map((it, i) => ({
        id: tag(it.id, i), section, typeId, typeJa, kind: "audioDocument" as const,
        audioLines: [it.audioScript], document: it.document,
        prompt: it.question, options: it.options, correctIndex: it.correctIndex,
        explanation: it.explanation,
      }));

    case "vocab-grammar": {
      const pool = [
        ...clozeQuestions.map((q) => ({ id: q.id, prompt: q.prompt, options: q.options, correctIndex: q.correctIndex, explanation: q.explanation })),
        ...practiceQuestions
          .filter((q) => q.questionTypeId === "vocab-grammar")
          .map((q) => ({ id: q.id, prompt: q.prompt, options: q.options, correctIndex: q.correctIndex, explanation: q.explanation })),
      ];
      return draw(pool, count).map((q, i) => ({
        id: tag(q.id, i), section, typeId, typeJa, kind: "text" as const,
        prompt: q.prompt, options: q.options, correctIndex: q.correctIndex, explanation: q.explanation,
      }));
    }

    case "expression-reading":
      return draw(expressionItems, count).map((it, i) => ({
        id: tag(it.id, i), section, typeId, typeJa, kind: "textPassage" as const,
        document: it.passage,
        prompt: it.question, options: it.options, correctIndex: it.correctIndex,
        explanation: it.explanation,
      }));

    case "general-reading":
      return draw(readingPassages, count).map((it, i) => ({
        id: tag(it.id, i), section, typeId, typeJa, kind: "textPassage" as const,
        document: it.text,
        prompt: it.question, options: it.options, correctIndex: it.correctIndex,
        explanation: `正解: ${it.options[it.correctIndex]}`,
      }));

    default:
      return [];
  }
}

/** Builds one section in exam order — types are NOT shuffled together, matching the real test. */
export function buildSection(section: MockSection): MockQuestion[] {
  const spec = sectionSpecs.find((s) => s.section === section)!;
  return spec.types.flatMap((t) => buildType(t.typeId, t.typeJa, section, t.count));
}

export function buildFullMock(): MockQuestion[] {
  return sectionSpecs.flatMap((s) => buildSection(s.section));
}

/**
 * Rough raw-score → BJT scale estimate. The real exam uses Item Response Theory and weights
 * harder questions more, so this is an indicator of where you're tracking, not a predicted score.
 * Linear across the 0–800 range, which puts the J2 threshold (420) at roughly 53% correct.
 */
export function estimateBjtScore(correct: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((correct / total) * 800);
}

/** Official BJT level bands on the 0–800 scale. */
export const bjtLevels = [
  { level: "J1+", min: 600, max: 800, note: "Can handle Japanese in any business situation." },
  { level: "J1", min: 530, max: 599, note: "Communicates adequately in most business situations." },
  { level: "J2", min: 420, max: 529, note: "Communicates appropriately in limited business situations." },
  { level: "J3", min: 320, max: 419, note: "Some communication possible in limited situations." },
  { level: "J4", min: 200, max: 319, note: "Minimal business communication." },
  { level: "J5", min: 0, max: 199, note: "Little to no business communication yet." },
] as const;

export function bjtLevelForScore(score: number) {
  return bjtLevels.find((b) => score >= b.min && score <= b.max) ?? bjtLevels[bjtLevels.length - 1];
}

export const mockScoreCaveat =
  "Estimated from raw percentage. The real BJT is IRT-scaled and weights harder questions more heavily, so treat this as a direction of travel rather than a predicted score.";
