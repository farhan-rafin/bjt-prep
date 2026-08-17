import { WeekRoadmap } from "./types";

// Source: Part 5 — 24-Week Plan
export const roadmap: WeekRoadmap[] = [
  { week: 1, month: 1, theme: "Foundation + Workplace Greetings", foundation: "です/ます, は/が/を", businessJp: "Greetings, self-intro", listening: "Slow dialogue: id speakers", reading: "Hiragana/katakana speed", keigo: "お疲れ様です", vocab: "Office basics 50", kanji: "Numbers/time 12", bjtPractice: "CBT demo + see format", weeklyTest: "Wk1 quiz" },
  { week: 2, month: 1, theme: "Particles + Workplace Questions", foundation: "に/で/へ, verb groups", businessJp: "Answer a simple work Q", listening: "Slow dialogue: id situation", reading: "Read a name card / sign", keigo: "お世話になっております", vocab: "Office 50", kanji: "Days/dates 12", bjtPractice: "Part I samples (watch)", weeklyTest: "Wk2" },
  { week: 3, month: 1, theme: "て-form + Instructions", foundation: "て-form, 〜ています", businessJp: "Receive an instruction", listening: "Catch a time/date", reading: "Short notice", keigo: "承知しました", vocab: "Scheduling 50", kanji: "Money/counters 12", bjtPractice: "Part I Situational x1", weeklyTest: "Wk3" },
  { week: 4, month: 1, theme: "Confirming Instructions", foundation: "past/neg, 〜たい", businessJp: "Confirm an instruction", listening: "Catch a decision", reading: "Simple schedule", keigo: "かしこまりました", vocab: "Scheduling 50", kanji: "Company/office 12", bjtPractice: "Part I Situational x2", weeklyTest: "Wk4 + Month-1 check" },
  { week: 5, month: 2, theme: "Making Requests", foundation: "〜てください", businessJp: "Ask a question at work", listening: "Normal-slow dialogue", reading: "Short email opening", keigo: "少々お待ちください", vocab: "Reports/orders 50", kanji: "Document kanji 12", bjtPractice: "Part I Conversational x1", weeklyTest: "Wk5" },
  { week: 6, month: 2, theme: "Reporting Progress", foundation: "〜ていただけますか", businessJp: "Report simple progress", listening: "Numbers under speed", reading: "Email body basics", keigo: "確認いたします", vocab: "Reports 50", kanji: "Schedule kanji 12", bjtPractice: "Part I Conversational x2", weeklyTest: "Wk6" },
  { week: 7, month: 2, theme: "Asking Permission", foundation: "〜てもいいですか", businessJp: "Ask permission at work", listening: "2 speakers, who decides", reading: "Notice with a date", keigo: "恐れ入りますが", vocab: "Deadlines 50", kanji: "Meeting kanji 12", bjtPractice: "Part I mixed set", weeklyTest: "Wk7" },
  { week: 8, month: 2, theme: "Giving & Receiving", foundation: "あげる/もらう/くれる", businessJp: "Arrange an appointment", listening: "Changed detail drill", reading: "Read appointment note", keigo: "申し訳ございません", vocab: "Appointments 50", kanji: "Transport kanji 12", bjtPractice: "Part I timed (short)", weeklyTest: "Wk8 + Month-2 check" },
  { week: 9, month: 3, theme: "Answering the Phone", foundation: "と/ば conditionals", businessJp: "Answer the phone", listening: "First monologues", reading: "Short business email", keigo: "Phone keigo set", vocab: "Telephone 60", kanji: "Phone/call kanji 14", bjtPractice: "Part III Vocab/Grammar x1", weeklyTest: "Wk9" },
  { week: 10, month: 3, theme: "Hold & Transfer", foundation: "たら/なら", businessJp: "Put caller on hold / transfer", listening: "Announcement gist", reading: "Email request", keigo: "いたします/おります", vocab: "Telephone 60", kanji: "Customer kanji 14", bjtPractice: "Part III V/G x2", weeklyTest: "Wk10" },
  { week: 11, month: 3, theme: "Taking a Message", foundation: "〜ので/〜から", businessJp: "Take a phone message", listening: "Monologue + 3 facts", reading: "Notice + detail", keigo: "伺います/参ります", vocab: "Customer svc 60", kanji: "Problem kanji 14", bjtPractice: "Part II Situational x1", weeklyTest: "Wk11" },
  { week: 12, month: 3, theme: "Apologising to a Customer", foundation: "〜ために, 〜ように", businessJp: "Apologise to a customer", listening: "Full-speed short dialogue", reading: "Price list read", keigo: "申します/おっしゃいます", vocab: "Complaints 60", kanji: "Solution kanji 14", bjtPractice: "Part II Info x1", weeklyTest: "Wk12 + Month-3 check" },
  { week: 13, month: 4, theme: "Explaining a Problem", foundation: "obligation 〜なければ", businessJp: "Explain a problem", listening: "Note-taking while listening", reading: "Timetable scan", keigo: "拝見します/ご覧に", vocab: "Meetings 60", kanji: "Sales kanji 16", bjtPractice: "Part II Info x2", weeklyTest: "Wk13" },
  { week: 14, month: 4, theme: "Giving an Opinion", foundation: "passive 〜られる", businessJp: "Give an opinion (meeting)", listening: "Part I full speed", reading: "Chart main idea", keigo: "sonkeigo verb pairs", vocab: "Meetings 60", kanji: "Delivery kanji 16", bjtPractice: "Part I timed section", weeklyTest: "Wk14" },
  { week: 15, month: 4, theme: "Agreeing & Disagreeing", foundation: "causative 〜させる", businessJp: "Agree/disagree politely", listening: "Part II combined items", reading: "Table + condition", keigo: "kenjougo verb pairs", vocab: "Sales 60", kanji: "Accounting kanji 16", bjtPractice: "Part II timed (short)", weeklyTest: "Wk15" },
  { week: 16, month: 4, theme: "Summarising a Discussion", foundation: "〜そうだ/〜ようだ/らしい", businessJp: "Summarise a discussion", listening: "Implied meaning intro", reading: "Longer notice", keigo: "mixed register drill", vocab: "Delivery 60", kanji: "Compound review 16", bjtPractice: "Part III Expression x1", weeklyTest: "Wk16 + Month-4 check" },
  { week: 17, month: 5, theme: "Reporting a Problem (Full)", foundation: "reporting 〜と言っていた", businessJp: "Report a problem (full)", listening: "Longer passages", reading: "Email thread", keigo: "cushioned bad news", vocab: "Accounting 60", kanji: "Business compounds", bjtPractice: "Part III Expression x2", weeklyTest: "Wk17" },
  { week: 18, month: 5, theme: "Call → Email Chain", foundation: "honorific request forms", businessJp: "Call → email chain", listening: "Full-speed monologue", reading: "Report skim", keigo: "polite refusal 検討します", vocab: "Set phrases 60", kanji: "Reading speed kanji", bjtPractice: "Part III General x1", weeklyTest: "Wk18" },
  { week: 19, month: 5, theme: "Full Email Structure", foundation: "formal/written grammar", businessJp: "Full email structure", listening: "Detail in long audio", reading: "Long email timed", keigo: "who-to-whom drill", vocab: "Set phrases 60", kanji: "Speed compounds", bjtPractice: "Full Reading timed", weeklyTest: "Wk19" },
  { week: 20, month: 5, theme: "First Full Mock", foundation: "consolidation", businessJp: "Meeting minutes read", listening: "Audio updates document", reading: "Minutes + audio", keigo: "mixed keigo speed", vocab: "Gap words from log", kanji: "Weak kanji repair", bjtPractice: "Full mock #1", weeklyTest: "Wk20 + Month-5 check" },
  { week: 21, month: 6, theme: "Error Repair Begins", foundation: "error repair only", businessJp: "End-to-end scenario", listening: "Exam-condition listening", reading: "Exam-speed reading", keigo: "recognition maintenance", vocab: "Weak clusters", kanji: "Recognition review", bjtPractice: "Timed Parts I+II", weeklyTest: "Wk21" },
  { week: 22, month: 6, theme: "Second Full Mock", foundation: "error repair only", businessJp: "Scenario review", listening: "Hardest passages", reading: "Charts at speed", keigo: "maintenance", vocab: "Weak clusters", kanji: "Recognition review", bjtPractice: "Full mock #2", weeklyTest: "Wk22" },
  { week: 23, month: 6, theme: "Third Full Mock", foundation: "no new material", businessJp: "Mixed scenario review", listening: "Daily exam-condition", reading: "Maintenance", keigo: "maintenance", vocab: "Review only", kanji: "Review only", bjtPractice: "Full mock #3 + review", weeklyTest: "Wk23" },
  { week: 24, month: 6, theme: "Final Mock + Exam Week", foundation: "no new material", businessJp: "Light review", listening: "Light listening", reading: "Light reading", keigo: "light review", vocab: "Light review", kanji: "Light review", bjtPractice: "Final mock #4, then EXAM", weeklyTest: "Exam week" },
];

export const monthTitles: Record<number, string> = {
  1: "Foundation + first contact with business Japanese",
  2: "Everyday workplace comprehension",
  3: "Business interaction + stronger listening/reading",
  4: "Intermediate business Japanese + question training",
  5: "Intensive BJT preparation",
  6: "Simulation + exam readiness",
};

export const monthGoals: Record<number, string> = {
  1: "Understand and produce basic polite self-introductions, recognise the 3 keigo types by name, follow very slow workplace greetings, and read numbers/dates/time in kanji.",
  2: "Follow a slow-to-normal workplace conversation, confirm an instruction, arrange a simple appointment, and answer basic Part I questions above chance.",
  3: "Handle simulated phone language, understand a short business email, read a simple schedule, and score meaningfully on Part I + Part III vocab questions.",
  4: "Process combined audio+document items, read a chart under time, recognise indirect/polite refusals, and complete a timed single section.",
  5: "Complete full timed sections at target accuracy, sit at least one full mock, and see a clear score estimate landing near/above 420.",
  6: "Reliably score in the J2 band on full mocks, manage the clock, and walk in calm. Book the exam for the end of this month.",
};

export function weeksForMonth(month: number) {
  return roadmap.filter((w) => w.month === month);
}
