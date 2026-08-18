import { practiceQuestions, scenarioQuizItems, clozeQuestions, whoSaysThisGame } from "@/content";
import type { QuizItem } from "@/components/quiz/quiz-shell";
import { shuffle, buildVocabQuiz, buildKanjiQuizItems } from "@/lib/quiz-generators";

export type MockLength = "quick" | "standard" | "full";

export const mockLengthConfig: Record<MockLength, { label: string; questions: number; minutes: number }> = {
  quick: { label: "Quick (10 Q / 10 min)", questions: 10, minutes: 10 },
  standard: { label: "Standard (20 Q / 20 min)", questions: 20, minutes: 20 },
  full: { label: "Full (40 Q / 40 min)", questions: 40, minutes: 40 },
};

/** Builds a timed mock exam by drawing from every practice pool in the app — vocabulary, kanji,
 * grammar cloze, keigo, and business situations — mirroring the mix of the real BJT sections.
 * Labelled PRACTICE throughout; not official BJT content. */
export function buildMockExam(length: MockLength): QuizItem[] {
  const { questions } = mockLengthConfig[length];

  const pool: QuizItem[] = [
    ...buildVocabQuiz(25),
    ...buildKanjiQuizItems(20),
    ...clozeQuestions.map((q) => ({ id: q.id, prompt: q.prompt, options: q.options, correctIndex: q.correctIndex, explanation: q.explanation, category: "Grammar" })),
    ...whoSaysThisGame.map((q) => ({ id: q.id, prompt: q.phrase, options: q.options, correctIndex: q.correctIndex, explanation: q.explanation, category: "Keigo" })),
    ...scenarioQuizItems.map((q) => ({ id: q.id, prompt: q.prompt, options: q.options, correctIndex: q.correctIndex, explanation: q.explanation, category: "Business situation" })),
    ...practiceQuestions.map((q) => ({ id: q.id, prompt: q.prompt, options: q.options, correctIndex: q.correctIndex, explanation: q.explanation, category: "BJT questions" })),
  ];

  const shuffled = shuffle(pool);
  // Cycle through if the question count exceeds the pool size, re-shuffling each pass so repeats aren't adjacent.
  const result: QuizItem[] = [];
  let pass = 0;
  while (result.length < questions) {
    const batch = pass === 0 ? shuffled : shuffle(pool);
    for (const item of batch) {
      if (result.length >= questions) break;
      result.push({ ...item, id: `${item.id}-p${pass}` });
    }
    pass++;
  }
  return result;
}
