import { BjtQuestionType } from "./types";

// Source: Part 2 — The three sections and their question types (verbatim)
export const bjtQuestionTypes: BjtQuestionType[] = [
  {
    id: "situational-listening", part: "I", partTitle: "Listening Comprehension (~45 min)", numberInPart: 1,
    jaName: "場面把握", enName: "Situational Understanding", count: 5,
    whatIsTested: "You hear a short line and pick the response or the situation that fits.",
    japaneseAbilityNeeded: "Instant recognition of who is speaking to whom and the social register.",
    typicalSituation: "A staff member greeting a customer; a junior reporting to a boss.",
    commonTrap: "Distractors that are grammatically fine but wrong in formality (casual reply to a customer).",
    usefulClue: "Listen for keigo markers and honorific/humble verbs — they reveal the relationship.",
    eliminate: "Eliminate any option whose politeness level clashes with the speaker relationship.",
    howToPractice: "Drill short audio + snap-judgement. Say the relationship out loud before choosing.",
  },
  {
    id: "conversational-listening", part: "I", partTitle: "Listening Comprehension (~45 min)", numberInPart: 2,
    jaName: "会話聴解", enName: "Conversational Listening", count: 10,
    whatIsTested: "A short dialogue, then a comprehension question.",
    japaneseAbilityNeeded: "Following a two-person exchange at natural speed and holding key facts.",
    typicalSituation: "Colleagues arranging a meeting; a call about a delivery problem.",
    commonTrap: "Numbers/times mentioned then changed (\"actually, let's move it to 3\"). The last stated value wins.",
    usefulClue: "Track the \"so what happens next / what did they decide\" thread.",
    eliminate: "Rule out options based on the final decision, not the first thing said.",
    howToPractice: "Listen once for gist, once for the changed detail. Note times/dates as you hear them.",
  },
  {
    id: "general-listening", part: "I", partTitle: "Listening Comprehension (~45 min)", numberInPart: 3,
    jaName: "総合聴解", enName: "General Listening", count: 10,
    whatIsTested: "Longer monologue or announcement, then questions.",
    japaneseAbilityNeeded: "Sustained listening; extracting main point + specific detail from a longer stream.",
    typicalSituation: "A manager explaining a schedule change; a store announcement.",
    commonTrap: "Detail buried mid-passage while the intro/outro sound important but aren't.",
    usefulClue: "The purpose is usually stated near the start; details in the middle.",
    eliminate: "Discard options that use words you heard but in the wrong relationship.",
    howToPractice: "Shadowing + note-taking. Practise writing 3 key facts while still listening.",
  },
  {
    id: "situational-visual", part: "II", partTitle: "Listening & Reading Comprehension (~30 min)", numberInPart: 4,
    jaName: "場面把握（画像あり）", enName: "Situational Understanding (with visual)", count: 5,
    whatIsTested: "Audio plus an image/notice; pick what fits.",
    japaneseAbilityNeeded: "Linking spoken info to a visual cue quickly.",
    typicalSituation: "A poster + someone asking about it; a sign + a question.",
    commonTrap: "Visual details that look relevant but the audio points elsewhere.",
    usefulClue: "Scan the visual for numbers/labels before/while audio plays.",
    eliminate: "Cross-check: the answer must satisfy BOTH audio and image.",
    howToPractice: "Practise with schedule/notice images and a spoken question.",
  },
  {
    id: "info-listening-reading", part: "II", partTitle: "Listening & Reading Comprehension (~30 min)", numberInPart: 5,
    jaName: "情報聴解", enName: "Information Listening & Reading", count: 10,
    whatIsTested: "Audio + a data source (table, price list, timetable).",
    japaneseAbilityNeeded: "Pulling a specific value from a document under time pressure while listening.",
    typicalSituation: "Choosing a train from a timetable; picking a plan from a price table.",
    commonTrap: "Similar-looking rows; conditions in the audio (\"but not on weekends\").",
    usefulClue: "The audio adds a constraint that filters the table — catch it.",
    eliminate: "Apply the spoken constraint to eliminate rows, then read the answer.",
    howToPractice: "Timetable/price-list drills with a spoken condition. Speed matters.",
  },
  {
    id: "general-listening-reading", part: "II", partTitle: "Listening & Reading Comprehension (~30 min)", numberInPart: 6,
    jaName: "総合聴解読解", enName: "General Listening & Reading", count: 10,
    whatIsTested: "Longer audio + a longer document (email, report, minutes).",
    japaneseAbilityNeeded: "Integrating a spoken explanation with written business text.",
    typicalSituation: "A meeting recap + the agenda; a call + an email thread.",
    commonTrap: "Info that's in the text but contradicted/updated by the audio.",
    usefulClue: "Audio usually updates or interprets the document — trust the newer info.",
    eliminate: "Where text and audio disagree, the spoken update is normally correct.",
    howToPractice: "Read a short business doc, then hear a related clip; answer combining both.",
  },
  {
    id: "vocab-grammar", part: "III", partTitle: "Reading Comprehension (~30 min)", numberInPart: 7,
    jaName: "語彙・文法", enName: "Vocabulary / Grammar", count: 10,
    whatIsTested: "Fill-in-the-blank; choose the right word, particle, or form.",
    japaneseAbilityNeeded: "Business vocabulary, keigo forms, functional grammar.",
    typicalSituation: "Emails, notices, set business phrases.",
    commonTrap: "Two options both \"polite\" but only one correct register (sonkeigo vs kenjougo).",
    usefulClue: "Set phrases (お世話になっております etc.) are gifts — learn them cold.",
    eliminate: "Eliminate by register first, then by meaning.",
    howToPractice: "This is where targeted vocab/keigo/grammar decks pay off directly.",
  },
  {
    id: "expression-reading", part: "III", partTitle: "Reading Comprehension (~30 min)", numberInPart: 8,
    jaName: "表現読解", enName: "Expression Reading & Comprehension", count: 10,
    whatIsTested: "Short passage; pick the expression/interpretation that fits.",
    japaneseAbilityNeeded: "Reading implied meaning and appropriate business expression.",
    typicalSituation: "Polite refusals, indirect requests, cushioned bad news.",
    commonTrap: "The literal reading vs the intended (indirect) meaning.",
    usefulClue: "Japanese business speech is indirect — \"検討します\" often means no.",
    eliminate: "Choose the reading that matches business politeness, not literal words.",
    howToPractice: "Study indirectness patterns; collect \"what it really means\" pairs.",
  },
  {
    id: "general-reading", part: "III", partTitle: "Reading Comprehension (~30 min)", numberInPart: 9,
    jaName: "総合読解", enName: "General Reading Comprehension", count: 10,
    whatIsTested: "Longer business text; main idea + detail questions.",
    japaneseAbilityNeeded: "Reading speed and scanning under time pressure.",
    typicalSituation: "Reports, announcements, longer emails, articles.",
    commonTrap: "Detail questions that reward scanning; running out of time.",
    usefulClue: "Read the question first, then scan the text for the keyword.",
    eliminate: "Eliminate options not supported by the text; watch for \"not stated\".",
    howToPractice: "Timed reading with question-first strategy.",
  },
];

// Source: Part 2 — Key facts (verified, official)
export const bjtKeyFacts = {
  fullName: "ビジネス日本語能力テスト / Business Japanese Proficiency Test",
  administrator: "Japan Kanji Aptitude Testing Foundation (Kanken)",
  format: "Computer-based test (CBT), all multiple choice, 4 options per question",
  questions: 80,
  duration: "About 2 hours (listening ~45 min, listening+reading ~30 min, reading ~30 min)",
  scoring: "Scaled 0–800 using Item Response Theory (harder questions weigh more)",
  levels: ["J5", "J4", "J3", "J2", "J1", "J1+"],
  j2Range: [420, 529] as [number, number],
  sections: "Part I Listening · Part II Listening & Reading · Part III Reading",
  availability: "Year-round at test centers (booked online via your Kanken/Pearson account)",
  officialHub: "https://www.kanken.or.jp/bjt/english/",
  cbtDemo: "https://www.kanken.or.jp/bjt/cbt_demo/",
  officialSamples: "https://www.kanken.or.jp/bjt/english/sample/sample01.html",
};

// PRACTICE — one starter fill-in-the-blank per question type, generated from curriculum grammar/keigo/vocab (Part 94)
export interface PracticeQuestion {
  id: string;
  questionTypeId: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const practiceQuestions: PracticeQuestion[] = [
  { id: "pq-vg-1", questionTypeId: "vocab-grammar", prompt: "資料を送って＿＿＿＿か。", options: ["くれる", "いただけます", "あげる", "もらいます"], correctIndex: 1, explanation: "いただけますか is the very-polite request form for asking a superior/client to do something for you — correct register for a business email or request to a client. くれる/あげる/もらいます are all too casual or grammatically mismatched for this register." },
  { id: "pq-vg-2", questionTypeId: "vocab-grammar", prompt: "会議中です＿＿＿、後ほどお電話いたします。", options: ["から", "ので", "し", "けど"], correctIndex: 1, explanation: "ので is the softer, more formal reason marker preferred in business contexts; から is more direct/casual, し and けど don't fit this formal register." },
  { id: "pq-exp-1", questionTypeId: "expression-reading", prompt: "取引先: 「その件、検討します。」この返事が意味するのは？", options: ["すぐにやります", "ほぼ確実に断っている", "もう決まっている", "分かりません、という意味だけ"], correctIndex: 1, explanation: "検討します (\"we'll consider it\") is classic indirect Japanese — in a business refusal context it usually signals a soft \"no,\" not genuine ongoing consideration." },
  { id: "pq-gr-1", questionTypeId: "general-reading", prompt: "（通知文の目的を尋ねる問題の練習）通知の最初の文を読むとき、何を探しますか。", options: ["文章の長さ", "誰が書いたか・目的の一文", "使われている漢字の数", "文体の丁寧さだけ"], correctIndex: 1, explanation: "Question-first, skim-for-structure strategy: identify who sent it and the purpose line first — that's what most 'why was this written' questions hinge on." },
];
