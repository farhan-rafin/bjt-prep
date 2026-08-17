"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserTable } from "@/lib/hooks/use-user-table";
import { vocabLearnedCount, kanjiLearnedCount } from "@/lib/progress";
import { cn } from "@/lib/utils";
import { Award } from "lucide-react";

export function Achievements() {
  const { rows: sessions } = useUserTable("session_progress");
  const { rows: vocabStatus } = useUserTable("vocab_status");
  const { rows: kanjiStatus } = useUserTable("kanji_status");
  const { rows: quizAttempts } = useUserTable("quiz_attempts");
  const { rows: mockTests } = useUserTable("mock_tests");

  const vocabLearned = vocabLearnedCount(vocabStatus);
  const kanjiLearned = kanjiLearnedCount(kanjiStatus);
  const week1Done = [1, 2, 3, 4].every((d) => sessions.some((s) => s.week === 1 && s.day === d && s.status === "completed"));
  const bestMock = mockTests.reduce((max, m) => Math.max(max, m.total_score ?? 0), 0);

  const badges = [
    { key: "first_step", label: "First Step", desc: "Complete Day 1", unlocked: sessions.some((s) => s.week === 1 && s.day === 1 && s.status === "completed") },
    { key: "week1", label: "一週間！", desc: "Complete your first week", unlocked: week1Done },
    { key: "vocab100", label: "Vocabulary 100", desc: "Learn 100 words", unlocked: vocabLearned >= 100 },
    { key: "kanji100", label: "Kanji Hunter", desc: "Recognize 100 kanji", unlocked: kanjiLearned >= 100 },
    { key: "keigo_rookie", label: "Keigo Rookie", desc: "Complete your first Keigo Lab", unlocked: quizAttempts.some((q) => q.quiz_type === "keigo_who_says") },
    { key: "vocab1000", label: "1,000 Words", desc: "Learn 1,000 business words", unlocked: vocabLearned >= 1000 },
    { key: "mock_warrior", label: "Mock Warrior", desc: "Complete first full mock", unlocked: mockTests.length >= 1 },
    { key: "j2_territory", label: "J2 Territory", desc: "Record a mock score ≥420", unlocked: bestMock >= 420 },
  ];

  return (
    <Card>
      <CardHeader><CardTitle>Achievements</CardTitle></CardHeader>
      <CardContent className="grid grid-cols-2 gap-2 pt-4 sm:grid-cols-4">
        {badges.map((b) => (
          <div
            key={b.key}
            className={cn(
              "flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center",
              b.unlocked ? "border-accent/40 bg-accent/5" : "border-border opacity-50",
            )}
          >
            <Award className={cn("size-5", b.unlocked ? "text-accent" : "text-muted-foreground")} />
            <p className="text-xs font-medium">{b.label}</p>
            <p className="text-[10px] text-muted-foreground">{b.desc}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
