"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { bjtQuestionTypes, bjtKeyFacts, practiceQuestions, scenarioQuizItems, clozeQuestions, whoSaysThisGame } from "@/content";
import { QuizShell, type QuizItem } from "@/components/quiz/quiz-shell";
import { ExternalLink, ChevronDown } from "lucide-react";

const parts = ["I", "II", "III"] as const;
const partTitles: Record<string, string> = {
  I: "Part I — Listening Comprehension (~45 min)",
  II: "Part II — Listening & Reading Comprehension (~30 min)",
  III: "Part III — Reading Comprehension (~30 min)",
};

export default function BjtPracticePage() {
  const [open, setOpen] = React.useState<string | null>(null);

  const quizItems: QuizItem[] = [
    ...practiceQuestions.map((q) => ({ id: q.id, prompt: q.prompt, options: q.options, correctIndex: q.correctIndex, explanation: q.explanation, category: "BJT Practice" })),
    ...scenarioQuizItems.map((q) => ({ id: q.id, prompt: q.prompt, options: q.options, correctIndex: q.correctIndex, explanation: q.explanation, category: q.category })),
    ...clozeQuestions.map((q) => ({ id: q.id, prompt: q.prompt, options: q.options, correctIndex: q.correctIndex, explanation: q.explanation, category: "Vocabulary / Grammar" })),
    ...whoSaysThisGame.map((q) => ({ id: q.id, prompt: q.phrase, options: q.options, correctIndex: q.correctIndex, explanation: q.explanation, category: "Keigo" })),
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 lg:py-10">
      <h1 className="text-2xl font-semibold">BJT Practice Center</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {bjtKeyFacts.questions} questions · {bjtKeyFacts.duration} · Scaled 0–800 · J2 = {bjtKeyFacts.j2Range[0]}–{bjtKeyFacts.j2Range[1]}
      </p>
      <a href={bjtKeyFacts.officialHub} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-sm text-primary hover:underline">
        Official BJT hub <ExternalLink className="size-3.5" />
      </a>

      <Tabs defaultValue="types" className="mt-5">
        <TabsList>
          <TabsTrigger value="types">Question Types</TabsTrigger>
          <TabsTrigger value="practice">Practice Quiz</TabsTrigger>
        </TabsList>
        <TabsContent value="types">
          {parts.map((part) => (
            <section key={part} className="mb-6">
              <h2 className="mb-2 text-base font-semibold">{partTitles[part]}</h2>
              <div className="flex flex-col gap-2">
                {bjtQuestionTypes.filter((q) => q.part === part).map((q) => (
                  <Card key={q.id}>
                    <CardContent className="p-4">
                      <button className="flex w-full items-center justify-between text-left" onClick={() => setOpen(open === q.id ? null : q.id)}>
                        <div>
                          <p className="font-medium">
                            {q.numberInPart}. <span className="jp">{q.jaName}</span> — {q.enName}
                          </p>
                          <Badge variant="outline" className="mt-1">{q.count} questions</Badge>
                        </div>
                        <ChevronDown className={`size-4 text-muted-foreground transition-transform ${open === q.id ? "rotate-180" : ""}`} />
                      </button>
                      {open === q.id && (
                        <div className="mt-3 flex flex-col gap-2 text-sm">
                          <Field label="What is being tested?" value={q.whatIsTested} />
                          <Field label="Japanese ability needed" value={q.japaneseAbilityNeeded} />
                          <Field label="Typical situation" value={q.typicalSituation} />
                          <Field label="Common trap" value={q.commonTrap} tone="warning" />
                          <Field label="Useful clue" value={q.usefulClue} />
                          <Field label="How to eliminate wrong answers" value={q.eliminate} />
                          <Field label="How to practise" value={q.howToPractice} />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </TabsContent>
        <TabsContent value="practice">
          <p className="mb-4 text-sm text-muted-foreground">
            <Badge variant="accent" className="mr-1">PRACTICE</Badge>
            Questions generated from your curriculum content — not official BJT items.
          </p>
          <QuizShell items={quizItems} quizType="bjt_practice" />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Field({ label, value, tone }: { label: string; value: string; tone?: "warning" }) {
  return (
    <p>
      <span className={`font-medium ${tone === "warning" ? "text-warning" : "text-muted-foreground"}`}>{label}: </span>
      {value}
    </p>
  );
}
