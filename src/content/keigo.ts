import { KeigoPhrase } from "./types";

// Source: Part 10 — Keigo Master Plan (high-value expressions table + telephone/customer-service sets)
export const keigoPhrases: KeigoPhrase[] = [
  { id: "otsukaresama", type: "teineigo", phrase: "お疲れ様です", reading: "おつかれさまです", meaning: "Standard workplace greeting/acknowledgement", formality: "Neutral-polite", who: "Any colleague", toWhom: "Anyone at work", rightSituation: "Passing a coworker, ending a task", wrongSituation: "Not to customers as a greeting" },
  { id: "osewa", type: "kenjougo", phrase: "お世話になっております", reading: "おせわになっております", meaning: "\"Thank you for your continued support\"", formality: "Formal", who: "You", toWhom: "Clients/外部", rightSituation: "Opening a call/email to a client", wrongSituation: "Not to close internal colleagues" },
  { id: "shouchi", type: "kenjougo", phrase: "承知しました", reading: "しょうちしました", meaning: "\"Understood\" (humble)", formality: "Formal", who: "You (junior)", toWhom: "Superior/client", rightSituation: "Accepting an instruction", wrongSituation: "Slightly stiff among equals" },
  { id: "kashikomari", type: "kenjougo", phrase: "かしこまりました", reading: "かしこまりました", meaning: "\"Certainly\" (very humble)", formality: "Very formal", who: "Staff", toWhom: "Customer", rightSituation: "Customer service acceptance", wrongSituation: "Overkill between colleagues" },
  { id: "kakunin-itashimasu", type: "kenjougo", phrase: "確認いたします", reading: "かくにんいたします", meaning: "\"I will check\" (humble)", formality: "Formal", who: "You", toWhom: "Superior/client", rightSituation: "Promising to verify" },
  { id: "shousho", type: "teineigo", phrase: "少々お待ちください", reading: "しょうしょうおまちください", meaning: "\"Please wait a moment\"", formality: "Polite", who: "Staff", toWhom: "Customer/caller", rightSituation: "Putting someone on hold" },
  { id: "osoreirimasu", type: "cushion", phrase: "恐れ入りますが", reading: "おそれいりますが", meaning: "\"I'm sorry to trouble you, but…\"", formality: "Formal cushion", who: "You", toWhom: "Superior/customer", rightSituation: "Before a request/interruption", wrongSituation: "Not for trivial casual asks" },
  { id: "moushiwake", type: "kenjougo", phrase: "申し訳ございません", reading: "もうしわけございません", meaning: "\"I deeply apologise\"", formality: "Very formal", who: "You/staff", toWhom: "Customer/superior", rightSituation: "Apologising for a problem", wrongSituation: "Too heavy for tiny slips" },
  { id: "yoroshiku", type: "teineigo", phrase: "よろしくお願いいたします", reading: "よろしくおねがいいたします", meaning: "\"Thank you in advance / regards\"", formality: "Formal", who: "You", toWhom: "Anyone senior/external", rightSituation: "Closing emails, requests" },
  { id: "ukagaimasu", type: "kenjougo", phrase: "伺います", reading: "うかがいます", meaning: "Humble \"go/visit/ask\"", formality: "Formal", who: "You", toWhom: "Superior/client", rightSituation: "\"I'll come to your office\"", wrongSituation: "Don't use about others" },
  { id: "mairimasu", type: "kenjougo", phrase: "参ります", reading: "まいります", meaning: "Humble \"go/come\"", formality: "Formal", who: "You", toWhom: "Superior/client", rightSituation: "\"I'll be there\"", wrongSituation: "Don't use about others" },
  { id: "moushimasu", type: "kenjougo", phrase: "申します", reading: "もうします", meaning: "Humble \"say / my name is\"", formality: "Formal", who: "You", toWhom: "Anyone senior/external", rightSituation: "Self-intro on the phone", wrongSituation: "Don't use about others" },
  { id: "haiken", type: "kenjougo", phrase: "拝見します", reading: "はいけんします", meaning: "Humble \"look at / see\"", formality: "Formal", who: "You", toWhom: "Superior/client", rightSituation: "\"I'll review your document\"", wrongSituation: "Don't use about others" },
  { id: "goran", type: "sonkeigo", phrase: "ご覧になります", reading: "ごらんになります", meaning: "Respectful \"look at / see\"", formality: "Formal", who: "You (about them)", toWhom: "Superior/customer", rightSituation: "\"Please take a look\"", wrongSituation: "Don't use about yourself" },
  { id: "ossharu", type: "sonkeigo", phrase: "おっしゃいます", reading: "おっしゃいます", meaning: "Respectful \"say\"", formality: "Formal", who: "You (about them)", toWhom: "Superior/customer", rightSituation: "Referring to what a client said", wrongSituation: "Don't use about yourself" },
];

export const keigoTypeInfo = {
  teineigo: { label: "丁寧語", romaji: "Teineigo", description: "Polite (です/ます) — general politeness to anyone." },
  sonkeigo: { label: "尊敬語", romaji: "Sonkeigo", description: "Respectful — raises the OTHER person. About your superior / customer's actions." },
  kenjougo: { label: "謙譲語", romaji: "Kenjougo", description: "Humble — lowers YOURSELF. About your own actions toward a superior." },
  cushion: { label: "クッション言葉", romaji: "Cushion phrase", description: "Softens a request or interruption before it comes." },
};

// Source: Part 10 — Example dialogue (customer service)
export const keigoSampleDialogue = [
  { speaker: "客", line: "すみません、この商品はありますか。", reading: "すみません、このしょうひんはありますか。", meaning: "Excuse me, do you have this item?" },
  { speaker: "店員", line: "少々お待ちください。確認いたします。", reading: "しょうしょうおまちください。かくにんいたします。", meaning: "One moment please. I'll check for you." },
  { speaker: "店員", line: "恐れ入りますが、ただいま在庫がございません。申し訳ございません。", reading: "おそれいりますが、ただいまざいこがございません。もうしわけございません。", meaning: "I'm sorry to say we're currently out of stock. I apologise." },
];

export interface WhoSaysThisQuestion {
  id: string;
  phrase: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

// PRACTICE — generated from the keigo table above per curriculum rule (Part 94)
export const whoSaysThisGame: WhoSaysThisQuestion[] = [
  { id: "q1", phrase: "承知しました。", options: ["Customer → employee", "Employee → manager/customer", "Two close friends", "Child → sibling"], correctIndex: 1, explanation: "承知しました is kenjougo (humble) — a junior/staff member uses it toward a superior or client to accept an instruction. It lowers the speaker, so it flows employee → manager/customer." },
  { id: "q2", phrase: "かしこまりました。", options: ["Manager → new employee", "Store staff → customer", "Friend → friend", "Teacher → student"], correctIndex: 1, explanation: "かしこまりました is very-formal kenjougo used by staff accepting a customer's request — the highest-register 'certainly' in service contexts." },
  { id: "q3", phrase: "ご覧になりますか。", options: ["You, about your own action", "You, about a superior's action", "A customer, about themself", "A junior, about a colleague"], correctIndex: 1, explanation: "ご覧になります is sonkeigo (respectful) — it raises the other person's action. You'd never use it about your own action; for yourself you'd use 拝見します instead." },
  { id: "q4", phrase: "拝見します。", options: ["About your own action, to a superior", "About a superior's action", "Casual speech between friends", "About a stranger's action, neutrally"], correctIndex: 0, explanation: "拝見します is kenjougo — the humble form of 見る used about YOUR OWN action when speaking to/about a superior or client." },
  { id: "q5", phrase: "お世話になっております。", options: ["Opening line to a close friend", "Opening line to a client/external contact", "Closing line only", "Something only customers say"], correctIndex: 1, explanation: "お世話になっております is the standard formal opener for calls/emails to clients or other companies (外部) — not used with close internal colleagues." },
  { id: "q6", phrase: "少々お待ちください。", options: ["Staff/caller putting someone on hold", "A customer asking staff to wait", "Two managers chatting informally", "A text message to a friend"], correctIndex: 0, explanation: "少々お待ちください is polite teineigo directed at a customer or caller — staff say it while putting someone on hold or checking something." },
  { id: "q7", phrase: "伺います。", options: ["About someone else's visit", "About your own humble 'go/visit'", "A command to a subordinate", "A question about location"], correctIndex: 1, explanation: "伺います is kenjougo — you use it about your OWN action of going/visiting a superior or client, e.g. 'I'll come to your office.'" },
  { id: "q8", phrase: "おっしゃる通りです。", options: ["Agreeing with a superior/client's opinion", "Disagreeing with a colleague", "Apologising for a mistake", "Asking someone to repeat themselves"], correctIndex: 0, explanation: "おっしゃる通りです ('you are quite right') uses sonkeigo おっしゃる to respectfully agree with what a superior or client just said." },
];
