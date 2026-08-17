"use client";
import * as React from "react";
import { kanjiItems } from "@/content";
import { QuizShell, type QuizItem } from "@/components/quiz/quiz-shell";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function buildQuiz(): QuizItem[] {
  const pool = shuffle(kanjiItems).slice(0, 12);
  return pool.map((k) => {
    const distractors = shuffle(kanjiItems.filter((x) => x.id !== k.id))
      .slice(0, 3)
      .map((x) => x.reading);
    const options = shuffle([k.reading, ...distractors]);
    return {
      id: k.id,
      prompt: `${k.kanji}\nWhat is the correct reading?`,
      options,
      correctIndex: options.indexOf(k.reading),
      explanation: `${k.kanji} (${k.reading}) — ${k.meaning}. Seen in: ${k.compounds.join(", ")}.`,
      category: "Kanji",
    };
  });
}

export function KanjiQuiz() {
  const [items] = React.useState(buildQuiz);
  return <QuizShell items={items} quizType="kanji_recognition" />;
}
