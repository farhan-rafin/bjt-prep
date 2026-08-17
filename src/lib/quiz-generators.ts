import { grammarPoints } from "@/content";
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
