import { MonthlyCheckpoint, WeeklyTestItem, ChecklistItem } from "./types";

// Source: Part 23 — Monthly BJT Checkpoints
export const monthlyCheckpoints: MonthlyCheckpoint[] = [
  { month: 1, listening: "~20% of easy Part I items", readingSpeed: "Read hiragana/kanji nums instantly", businessVocab: "~200 words", situations: "Follow slow greetings", mockPerformance: "Format understood (demo done)", weaknessToExpect: "Speed of everything" },
  { month: 2, listening: "~35% of Part I", readingSpeed: "Short notice in ~1 min", businessVocab: "~450 words", situations: "Confirm instructions, set appointment", mockPerformance: "Part I above chance", weaknessToExpect: "Numbers under speed" },
  { month: 3, listening: "~45% Part I; first Part III vocab points", readingSpeed: "Short email in ~1.5 min", businessVocab: "~750 words", situations: "Phone + apology handling", mockPerformance: "Part I + III vocab meaningful", weaknessToExpect: "Monologues, keigo direction" },
  { month: 4, listening: "~55% Part I; combined Part II items landing", readingSpeed: "Chart/table under time", businessVocab: "~1,050 words", situations: "Meeting + problem reporting", mockPerformance: "One timed section at target", weaknessToExpect: "Implied meaning, Part II speed" },
  { month: 5, listening: "~60–65% across sections", readingSpeed: "Full Reading section in time", businessVocab: "~1,350 words", situations: "End-to-end scenarios", mockPerformance: "Full mock estimate ≈ 420+", weaknessToExpect: "Careless errors, pacing" },
  { month: 6, listening: "J2-band accuracy on full mocks", readingSpeed: "Exam-speed, comfortable", businessVocab: "~1,600 words", situations: "All common situations", mockPerformance: "Mocks reliably in 420–529", weaknessToExpect: "Nerves/clock management" },
];

// Source: Part 22 — Weekly Testing
export const weeklyTestItems: WeeklyTestItem[] = [
  { skill: "Vocabulary", sample: "20 words from the week: JP→EN recognition." },
  { skill: "Kanji recognition", sample: "15 compounds: read them aloud / choose reading." },
  { skill: "Grammar", sample: "8 fill-in-the-blank in business sentences." },
  { skill: "Listening", sample: "5 short clips → comprehension Qs." },
  { skill: "Reading", sample: "1 email + 1 notice, timed, 4 Qs." },
  { skill: "Keigo", sample: "6 \"who says this to whom / which register\" items." },
  { skill: "Business situation", sample: "2 \"what should you say next?\" prompts." },
  { skill: "BJT questions", sample: "5–10 mixed official-style questions." },
];

export const weeklyTestBands = [
  { min: 85, max: 100, label: "Ahead of pace", action: "Ahead of pace — add harder BJT items or move faster.", tone: "success" as const },
  { min: 75, max: 84, label: "On track", action: "On track — continue as planned.", tone: "success" as const },
  { min: 65, max: 74, label: "Review weak areas", action: "Review weak areas before new material next week.", tone: "warning" as const },
  { min: 0, max: 64, label: "Remedial study", action: "Remedial: repeat the week's weakest skill; slow the new-material intake.", tone: "danger" as const },
];

export function bandForScore(pct: number) {
  return weeklyTestBands.find((b) => pct >= b.min && pct <= b.max) ?? weeklyTestBands[weeklyTestBands.length - 1];
}

// Source: Part 24 — Mock Test Program
export const mockProgram = {
  milestones: [
    { milestone: "First BJT-style questions", when: "Week 1 (format), real sets from Week 4" },
    { milestone: "Timed individual sections", when: "Month 4 (weeks 14–15)" },
    { milestone: "First full-length mock", when: "Month 5 (week 20)" },
    { milestone: "Mocks per month (M5)", when: "2" },
    { milestone: "Mocks in final 8 weeks", when: "4 full mocks (weeks 20, 22, 23, 24) + timed sections between" },
  ],
  errorCategories: [
    { type: "Vocabulary", action: "Add missed words to your Flashcards deck; drill the cluster." },
    { type: "Grammar", action: "Re-study the pattern; do 10 targeted sentences." },
    { type: "Listening", action: "Intensive-listen that clip; shadow it 5×." },
    { type: "Reading speed", action: "Redo timed with question-first method; cut translation habit." },
    { type: "Keigo", action: "Drill the directional pair; who-says-what flashcards." },
    { type: "Business context", action: "Study the matching scenario module; learn the situation's set phrases." },
    { type: "Implied meaning", action: "Add the polite→real pair to your \"indirect Japanese\" list." },
    { type: "Numbers / dates / time", action: "Number-dictation drills; note-while-listening reps." },
    { type: "Careless mistake", action: "Slow down 1 notch; re-read the question stem before answering." },
    { type: "Time management", action: "Practise per-question pacing; skip-and-return strategy." },
  ],
};

// Source: Part 25 — Final 8 Weeks
export const final8WeeksAllocation = [
  { area: "Timed BJT questions / mocks", w1720: "30%", w2124: "40%" },
  { area: "Listening", w1720: "25%", w2124: "25%" },
  { area: "Reading speed", w1720: "15%", w2124: "15%" },
  { area: "Business vocab / keigo (review)", w1720: "15%", w2124: "10%" },
  { area: "Weak-area repair (from log)", w1720: "10%", w2124: "10%" },
  { area: "New material", w1720: "5%", w2124: "0%" },
];

// Source: Part 26 — Final 30 Days
export const finalCountdown = [
  { daysOut: 30, focus: "Full mock. Rebuild the study plan around the weakest 2 error categories. Confirm exam booking + test-center logistics." },
  { daysOut: 21, focus: "Another full mock. Heavy listening daily. Keigo + business-phrase rapid review." },
  { daysOut: 14, focus: "Full mock. Timed reading every study day. Stop adding new vocab; review only." },
  { daysOut: 7, focus: "Light mock or timed sections. Re-do the official CBT demo. Sleep schedule aligned to exam time." },
  { daysOut: 3, focus: "Review mistake log + top set phrases + keigo pairs. Short listening only. No cramming." },
  { daysOut: 1, focus: "Very light: skim notes, one easy listening clip, pack ID/confirmation. Sleep early." },
  { daysOut: 0, focus: "Exam morning: Light breakfast, one warm-up listening clip on the way, arrive early, calm breathing. Trust the reps." },
];

export const examStrategyReminders = [
  "It is multiple choice with no penalty framing you should fear — never leave a question blank; eliminate and guess.",
  "Listening: predict \"what happens next\" before the question appears.",
  "Reading: question first, then scan. Do not translate every word.",
  "Part II: pre-scan the document before the audio.",
  "Pace: if stuck >~40 sec, mark your best guess and move on.",
];

// Source: BJT J2 — 6-Month Master Checklist
export const masterChecklist: ChecklistItem[] = [
  { id: "c1", group: "Setup", label: "Flashcards deck reviewed daily (built into the app)" },
  { id: "c2", group: "Setup", label: "Official BJT Guide obtained; CBT demo completed" },
  { id: "c3", group: "Setup", label: "Study calendar: 4 fixed days/week locked around Lawson shifts" },
  { id: "c4", group: "Setup", label: "Notes doc created with the 4 templates" },
  { id: "c5", group: "Skills", label: "Listening: follow normal-speed business dialogue + short monologues" },
  { id: "c6", group: "Skills", label: "~1,500–1,800 business words recognised on sight" },
  { id: "c7", group: "Skills", label: "Keigo: tell teineigo/sonkeigo/kenjougo apart + who-says-to-whom" },
  { id: "c8", group: "Skills", label: "~700–1,000 kanji recognised in business compounds" },
  { id: "c9", group: "Skills", label: "Reading: finish the Reading section in time (question-first scanning)" },
  { id: "c10", group: "Skills", label: "Charts/tables/timetables: extract a value under time" },
  { id: "c11", group: "Skills", label: "Implied meaning: read polite refusals + indirect requests" },
  { id: "c12", group: "Skills", label: "All 9 BJT question types practised and understood" },
  { id: "c13", group: "Practice Volume", label: "BJT-style questions since Week 4" },
  { id: "c14", group: "Practice Volume", label: "Timed individual sections since Month 4" },
  { id: "c15", group: "Practice Volume", label: "At least 4 full-length mocks (weeks 20, 22, 23, 24)" },
  { id: "c16", group: "Practice Volume", label: "Mistake log maintained; top category drives each week" },
  { id: "c17", group: "Practice Volume", label: "Latest mocks landing in the 420–529 band" },
  { id: "c18", group: "Final Stretch", label: "Final 8 weeks = 0% new material, all repair + rehearsal" },
  { id: "c19", group: "Final Stretch", label: "CBT demo re-done in the last week" },
  { id: "c20", group: "Final Stretch", label: "Sleep aligned to exam time; logistics/ID ready" },
  { id: "c21", group: "Final Stretch", label: "Exam booked at test center" },
];

export const mistakeErrorCategories = [
  "Vocabulary", "Grammar", "Listening", "Reading speed", "Keigo",
  "Business context", "Implied meaning", "Numbers/dates/time", "Careless mistake", "Time management",
];
