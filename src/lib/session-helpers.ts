import { getSession, roadmap, daySpine, dayBlocks, totalMinutesForDay, type DurationOption, type DayNumber } from "@/content";

export function sessionTitle(week: number, day: DayNumber) {
  const detailed = getSession(week, day);
  if (detailed) return detailed.title;
  return daySpine[day].title;
}

export function sessionObjective(week: number, day: DayNumber) {
  const detailed = getSession(week, day);
  if (detailed) return detailed.objective;
  const w = roadmap.find((x) => x.week === week);
  return w ? w.theme : daySpine[day].why;
}

export function sessionPlannedMinutes(day: DayNumber, duration: DurationOption) {
  return totalMinutesForDay(day, duration);
}

export interface SessionStep {
  key: string;
  label: string;
  minutes: number;
  description: string;
  checklist: string[];
}

const fieldByBlockLabel: Record<DayNumber, Record<string, keyof NonNullable<ReturnType<typeof getSession>>>> = {
  1: {
    "Warm-up review (Anki)": "anki",
    "Grammar (new patterns)": "grammar",
    "Vocabulary (new + drill)": "vocabulary",
    "Kanji recognition": "kanji",
    "Short listening (must-do)": "listening",
    "Log + tomorrow prep": "homework",
  },
  2: {
    "Anki listening cards": "anki",
    "Intensive listening": "listening",
    "Business-situation dialogue study": "businessPhrases",
    "Shadowing": "shadowing",
    "Real-life mission review": "realLifeMission",
  },
  3: {
    "Anki keigo/vocab": "anki",
    "Reading speed drill": "reading",
    "Keigo situation study": "keigo",
    "Workplace communication module": "businessPhrases",
    "Short listening (must-do)": "listening",
  },
  4: {
    "Anki full review": "anki",
    "BJT question sets (by type)": "bjtPractice",
    "Weekly test (all skills)": "endOfSessionTest",
    "Error analysis + mistake log": "homework",
    "Plan next week": "realLifeMission",
  },
};

const genericChecklist: Record<DayNumber, string[]> = {
  1: ["Review Anki", "Learn today's grammar pattern", "Learn new vocabulary", "Study kanji", "Watch listening clip", "Complete mini-test"],
  2: ["Review Anki listening cards", "Complete intensive listening", "Study business-situation dialogue", "Shadow the dialogue", "Log real-life mission"],
  3: ["Review Anki keigo/vocab", "Complete reading speed drill", "Study keigo situation", "Complete workplace communication module", "Complete must-do listening"],
  4: ["Clear Anki reviews", "Complete BJT question set", "Take weekly test", "Log mistakes", "Plan next week"],
};

export function buildSessionSteps(week: number, day: DayNumber, duration: DurationOption): SessionStep[] {
  const detailed = getSession(week, day);
  const blocks = dayBlocks[day];
  return blocks.map((b, i) => {
    const field = fieldByBlockLabel[day][b.label];
    const description = detailed && field ? (detailed[field] as string) || "—" : fallbackDescription(week, day, b.label);
    return {
      key: `${week}-${day}-${i}`,
      label: b.label,
      minutes: b.minutes[duration],
      description,
      checklist: [genericChecklist[day][i] ?? b.label],
    };
  });
}

function fallbackDescription(week: number, day: DayNumber, blockLabel: string) {
  const w = roadmap.find((x) => x.week === week);
  if (!w) return blockLabel;
  const map: Record<string, string> = {
    "Warm-up review (Anki)": "Clear due Anki reviews before adding anything new.",
    "Grammar (new patterns)": w.foundation,
    "Vocabulary (new + drill)": w.vocab,
    "Kanji recognition": w.kanji,
    "Short listening (must-do)": w.listening,
    "Log + tomorrow prep": "Log today's session and note tomorrow's starting point.",
    "Anki listening cards": "Review due listening/keigo cards.",
    "Intensive listening": w.listening,
    "Business-situation dialogue study": w.businessJp,
    "Shadowing": "Shadow the hardest clip from today's listening block.",
    "Real-life mission review": "Check this week's Japan Mission and log your notes.",
    "Anki keigo/vocab": "Review due keigo/vocab cards.",
    "Reading speed drill": w.reading,
    "Keigo situation study": w.keigo,
    "Workplace communication module": w.businessJp,
    "Anki full review": "Clear all due reviews across every deck.",
    "BJT question sets (by type)": w.bjtPractice,
    "Weekly test (all skills)": w.weeklyTest,
    "Error analysis + mistake log": "Log every wrong answer and tally error categories.",
    "Plan next week": "Preview next week's targets in the 24-Week Journey.",
  };
  return map[blockLabel] ?? blockLabel;
}
