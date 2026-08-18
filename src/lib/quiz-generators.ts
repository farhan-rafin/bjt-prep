import { grammarPoints, vocabulary, kanjiItems, whoSaysThisGame, scenarioQuizItems, practiceQuestions, clozeQuestions } from "@/content";
import type { QuizItem } from "@/components/quiz/quiz-shell";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function buildGrammarQuiz(): QuizItem[] {
  const pool = grammarPoints.filter((g) => g.tier !== "secondary" && g.businessExample !== "—");
  return shuffle(pool)
    .slice(0, 10)
    .map((g) => {
      const distractors = shuffle(pool.filter((x) => x.id !== g.id))
        .slice(0, 3)
        .map((x) => x.pattern);
      const options = shuffle([g.pattern, ...distractors]);
      return {
        id: g.id,
        prompt: `${g.businessExample}\n\nWhich grammar pattern is used here?`,
        options,
        correctIndex: options.indexOf(g.pattern),
        explanation: `${g.pattern} — ${g.meaning}.${g.commonMistake ? ` Watch out: ${g.commonMistake}` : ""}`,
        category: "Grammar",
      };
    });
}

function buildVocabQuiz(n: number): QuizItem[] {
  const pool = shuffle(vocabulary).slice(0, n);
  return pool.map((v) => {
    const distractors = shuffle(vocabulary.filter((x) => x.id !== v.id)).slice(0, 3).map((x) => x.meaning);
    const options = shuffle([v.meaning, ...distractors]);
    return {
      id: v.id,
      prompt: `${v.japanese} (${v.reading})`,
      options,
      correctIndex: options.indexOf(v.meaning),
      explanation: `${v.japanese} means "${v.meaning}." Category: ${v.category}.`,
      category: "Vocabulary",
    };
  });
}

function buildKanjiQuizItems(n: number): QuizItem[] {
  const pool = shuffle(kanjiItems).slice(0, n);
  return pool.map((k) => {
    const distractors = shuffle(kanjiItems.filter((x) => x.id !== k.id)).slice(0, 3).map((x) => x.reading);
    const options = shuffle([k.reading, ...distractors]);
    return {
      id: k.id,
      prompt: `${k.kanji}\nWhat is the correct reading?`,
      options,
      correctIndex: options.indexOf(k.reading),
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
