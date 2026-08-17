export type SkillKey =
  | "listening"
  | "reading"
  | "vocab"
  | "kanji"
  | "grammar"
  | "keigo"
  | "business"
  | "bjt";

export interface WeekRoadmap {
  week: number;
  month: number;
  foundation: string;
  businessJp: string;
  listening: string;
  reading: string;
  keigo: string;
  vocab: string;
  kanji: string;
  bjtPractice: string;
  weeklyTest: string;
  theme: string;
}

export type DayNumber = 1 | 2 | 3 | 4;

export interface DetailedSession {
  week: number;
  day: DayNumber;
  title: string;
  objective: string;
  grammar: string;
  vocabulary: string;
  kanji: string;
  businessPhrases: string;
  listening: string;
  reading: string;
  bjtPractice: string;
  keigo?: string;
  shadowing: string;
  realLifeMission: string;
  anki: string;
  homework: string;
  endOfSessionTest: string;
}

export interface Day1Block {
  time: string;
  activity: string;
  minutes: number;
}

export interface GrammarPoint {
  id: string;
  tier: "critical" | "important" | "secondary";
  pattern: string;
  meaning: string;
  whenUsed?: string;
  simpleExample?: string;
  businessExample: string;
  commonMistake?: string;
}

export interface VocabItem {
  id: string;
  japanese: string;
  reading: string;
  meaning: string;
  category: string;
  month: number;
  example?: string;
}

export interface KanjiItem {
  id: string;
  kanji: string;
  reading: string;
  meaning: string;
  compounds: string[];
  category: string;
  week: number;
}

export interface KeigoPhrase {
  id: string;
  phrase: string;
  meaning: string;
  formality: string;
  who: string;
  toWhom: string;
  rightSituation: string;
  wrongSituation?: string;
  type: "teineigo" | "sonkeigo" | "kenjougo" | "cushion";
}

export interface BusinessScenario {
  id: string;
  category: string;
  dialogue: { speaker: string; line: string }[];
  note?: string;
}

export interface BjtQuestionType {
  id: string;
  part: "I" | "II" | "III";
  partTitle: string;
  numberInPart: number;
  jaName: string;
  enName: string;
  count: number;
  whatIsTested: string;
  japaneseAbilityNeeded: string;
  typicalSituation: string;
  commonTrap: string;
  usefulClue: string;
  eliminate: string;
  howToPractice: string;
}

export interface Resource {
  id: string;
  name: string;
  type: "Official BJT" | "Textbook" | "YouTube" | "Listening" | "Grammar" | "App" | "Dictionary" | "Optional";
  level: string;
  when: string;
  how: string;
  cost: string;
  where?: string;
  url: string;
  badge: "OFFICIAL" | "CURRICULUM" | "EXTERNAL";
  tier: "essential" | "recommended" | "optional";
}

export interface YoutubeResource {
  id: string;
  channel: string;
  url: string;
  difficulty: string;
  when: string;
  method: string;
}

export interface Mission {
  week: number;
  mission: string;
}

export interface MonthlyCheckpoint {
  month: number;
  listening: string;
  readingSpeed: string;
  businessVocab: string;
  situations: string;
  mockPerformance: string;
  weaknessToExpect: string;
}

export interface WeeklyTestItem {
  skill: string;
  sample: string;
}

export interface ChecklistItem {
  id: string;
  group: "Setup" | "Skills" | "Practice Volume" | "Final Stretch";
  label: string;
}
