import { grammarPoints, vocabulary, kanjiItems, whoSaysThisGame, scenarioQuizItems, practiceQuestions, clozeQuestions } from "@/content";
import type { QuizItem } from "@/components/quiz/quiz-shell";

export function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

/**
 * Picks up to `n` distractor strings that are all distinct from each other AND from `correct`.
 * Deduping by VALUE (not by item id) matters: several kanji share a reading (問/問, 定/定, 円/延),
 * and a couple of vocabulary items share an English gloss. Filtering by id alone used to let the
 * same string appear twice in one question — making it unanswerable.
 */
export function pickDistractors(pool: string[], correct: string, n = 3): string[] {
  const unique = Array.from(new Set(pool)).filter((v) => v !== correct);
  return shuffle(unique).slice(0, n);
}

/** Builds a 4-option MCQ, guaranteeing every option is unique. */
function buildOptions(correct: string, pool: string[]) {
  const options = shuffle([correct, ...pickDistractors(pool, correct)]);
  return { options, correctIndex: options.indexOf(correct) };
}

export function buildGrammarQuiz(): QuizItem[] {
  const pool = grammarPoints.filter((g) => g.tier !== "secondary" && g.businessExample !== "—");
  return shuffle(pool)
    .slice(0, 10)
    .map((g) => {
      const { options, correctIndex } = buildOptions(g.pattern, pool.map((x) => x.pattern));
      return {
        id: g.id,
        prompt: `${g.businessExample}\n\nWhich grammar pattern is used here?`,
        options,
        correctIndex,
        explanation: `${g.pattern} — ${g.meaning}.${g.commonMistake ? ` Watch out: ${g.commonMistake}` : ""}`,
        category: "Grammar",
      };
    });
}

export function buildVocabQuiz(n: number): QuizItem[] {
  const meanings = vocabulary.map((x) => x.meaning);
  return shuffle(vocabulary)
    .slice(0, n)
    .map((v) => {
      const { options, correctIndex } = buildOptions(v.meaning, meanings);
      return {
        id: v.id,
        prompt: `${v.japanese} (${v.reading})`,
        options,
        correctIndex,
        explanation: `${v.japanese} means "${v.meaning}." Category: ${v.category}.`,
        category: "Vocabulary",
      };
    });
}

export function buildKanjiQuizItems(n: number): QuizItem[] {
  const readings = kanjiItems.map((x) => x.reading);
  return shuffle(kanjiItems)
    .slice(0, n)
    .map((k) => {
      const { options, correctIndex } = buildOptions(k.reading, readings);
      return {
        id: k.id,
        prompt: `${k.kanji}\nWhat is the correct reading?`,
        options,
        correctIndex,
        explanation: `${k.kanji} (${k.reading}) — ${k.meaning}.`,
        category: "Kanji recognition",
      };
    });
}

export function buildWeeklyTestQuiz(): QuizItem[] {
  const vocab = buildVocabQuiz(4).map((q) => ({ ...q, category: "Vocabulary" }));
  const kanji = buildKanjiQuizItems(3).map((q) => ({ ...q, category: "Kanji recognition" }));
  const grammar = shuffle(clozeQuestions).slice(0, 3).map((q) => ({
    id: q.id, prompt: q.prompt, options: q.options, correctIndex: q.correctIndex, explanation: q.explanation, category: "Grammar",
  }));
  const keigo = shuffle(whoSaysThisGame).slice(0, 2).map((q) => ({
    id: q.id, prompt: q.phrase, options: q.options, correctIndex: q.correctIndex, explanation: q.explanation, category: "Keigo",
  }));
  const business = shuffle(scenarioQuizItems).slice(0, 2).map((q) => ({
    id: q.id, prompt: q.prompt, options: q.options, correctIndex: q.correctIndex, explanation: q.explanation, category: "Business situation",
  }));
  const bjt = shuffle(practiceQuestions).slice(0, 2).map((q) => ({
    id: q.id, prompt: q.prompt, options: q.options, correctIndex: q.correctIndex, explanation: q.explanation, category: "BJT questions",
  }));
  return shuffle([...vocab, ...kanji, ...grammar, ...keigo, ...business, ...bjt]);
}
