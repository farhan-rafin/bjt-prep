import { BusinessScenario } from "./types";

// Source: Part 11 — Business Situation Training (sample dialogues, verbatim)
export const scenarios: BusinessScenario[] = [
  {
    id: "workplace-1", category: "Workplace communication",
    dialogue: [
      { speaker: "部下", line: "部長、少々よろしいでしょうか。", reading: "ぶちょう、しょうしょうよろしいでしょうか。", meaning: "Director, do you have a moment?" },
      { speaker: "部長", line: "どうぞ。", reading: "どうぞ。", meaning: "Go ahead." },
      { speaker: "部下", line: "明日の会議の資料についてご確認いただけますか。", reading: "あしたのかいぎのしりょうについてごかくにんいただけますか。", meaning: "Could you check the materials for tomorrow's meeting?" },
    ],
    note: "Receiving instructions, then confirming (〜ということでよろしいでしょうか). Reporting progress; asking permission; requesting help.",
  },
  {
    id: "telephone-1", category: "Telephone",
    dialogue: [
      { speaker: "staff", line: "はい、〇〇会社でございます。", reading: "はい、まるまるかいしゃでございます。", meaning: "Hello, this is [Company Name]." },
      { speaker: "staff", line: "恐れ入りますが、どちら様でしょうか。", reading: "おそれいりますが、どちらさまでしょうか。", meaning: "I'm sorry, but may I ask who's calling?" },
      { speaker: "staff", line: "申し訳ございません、田中はただ今席を外しております。", reading: "もうしわけございません、たなかはただいませきをはずしております。", meaning: "I'm sorry, Tanaka is away from his desk right now." },
    ],
    note: "Answering + giving company/name; asking who is calling; putting on hold; transferring; taking a message (伝言を承ります); confirming phone numbers.",
  },
  {
    id: "customer-service-1", category: "Customer service",
    dialogue: [
      { speaker: "店員", line: "いらっしゃいませ。", reading: "いらっしゃいませ。", meaning: "Welcome (to the store)." },
      { speaker: "店員", line: "かしこまりました。少々お待ちください。", reading: "かしこまりました。しょうしょうおまちください。", meaning: "Certainly. One moment please." },
      { speaker: "店員", line: "大変申し訳ございません。すぐに対応いたします。", reading: "たいへんもうしわけございません。すぐにたいおういたします。", meaning: "I'm very sorry. I'll deal with it right away." },
    ],
    note: "Greeting; handling requests; explaining; complaints; apologies; problem-solving. Register is always humble toward the customer.",
  },
  {
    id: "meetings-1", category: "Business meetings",
    dialogue: [
      { speaker: "A", line: "この案でいかがでしょうか。", reading: "このあんでいかがでしょうか。", meaning: "What do you think of this proposal?" },
      { speaker: "B", line: "確かに良い案ですが、費用が気になります。", reading: "たしかによいあんですが、ひようがきになります。", meaning: "It's certainly a good idea, but I'm concerned about the cost." },
      { speaker: "A", line: "では、費用を再検討いたします。", reading: "では、ひようをさいけんとういたします。", meaning: "Then I'll reconsider the cost." },
    ],
    note: "Agreeing (おっしゃる通りです); disagreeing politely (確かに〜ですが); giving opinions (〜と思います); asking questions; confirming; summarising.",
  },
  {
    id: "scheduling-1", category: "Scheduling",
    dialogue: [
      { speaker: "A", line: "来週の火曜日はご都合いかがでしょうか。", reading: "らいしゅうのかようびはごつごういかがでしょうか。", meaning: "Would next Tuesday be convenient for you?" },
      { speaker: "B", line: "申し訳ございませんが、その日は都合がつきません。", reading: "もうしわけございませんが、そのひはつごうがつきません。", meaning: "I'm sorry, but that day doesn't work for me." },
      { speaker: "A", line: "では、水曜日に変更させていただきます。", reading: "では、すいようびにへんこうさせていただきます。", meaning: "In that case, let's change it to Wednesday." },
    ],
    note: "Making, changing, cancelling appointments; deadlines; availability.",
  },
  {
    id: "reporting-1", category: "Reporting problems",
    dialogue: [
      { speaker: "担当者", line: "納品が遅れております。", reading: "たんとうしゃ：のうひんがおくれております。", meaning: "The delivery is running late." },
      { speaker: "担当者", line: "原因は在庫不足でございます。", reading: "げんいんはざいこぶそくでございます。", meaning: "The cause is a stock shortage." },
      { speaker: "担当者", line: "申し訳ございません。明日までに手配いたしますが、よろしいでしょうか。", reading: "もうしわけございません。あしたまでにてはいいたしますが、よろしいでしょうか。", meaning: "I apologise. I will arrange it by tomorrow — is that acceptable?" },
    ],
    note: "Explaining what happened → cause → apology → proposed solution → asking what to do.",
  },
];

// PRACTICE — "what should you say next?" quiz items generated from the module content (Part 94 allows this)
export interface ScenarioQuizItem {
  id: string;
  category: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const scenarioQuizItems: ScenarioQuizItem[] = [
  {
    id: "sq1", category: "Workplace communication",
    prompt: "上司: 「この資料、今日中に確認してもらえる？」\nあなたの返事は？",
    options: ["うん、いいよ。", "承知しました。確認いたします。", "無理です。", "後でね。"],
    correctIndex: 1,
    explanation: "Your boss is asking a favour — 承知しました + 確認いたします uses kenjougo to accept and confirm politely. The casual options (うん/後でね) clash with the workplace register; 無理です is too blunt for a superior.",
  },
  {
    id: "sq2", category: "Telephone",
    prompt: "電話が鳴りました。最初に何と言いますか。",
    options: ["もしもし、誰？", "はい、〇〇会社でございます。", "今忙しいです。", "また今度。"],
    correctIndex: 1,
    explanation: "Answering a business call always opens with company name + でございます (humble copula), never a casual もしもし on the company line.",
  },
  {
    id: "sq3", category: "Customer service",
    prompt: "お客様: 「これ、在庫ありますか？」在庫がない場合の正しい返事は？",
    options: ["ないです。", "分かりません。", "恐れ入りますが、ただいま在庫がございません。申し訳ございません。", "後で来て。"],
    correctIndex: 2,
    explanation: "Bad news to a customer needs a cushion (恐れ入りますが) plus an apology (申し訳ございません) — softening indirect Japanese, not a blunt ないです.",
  },
  {
    id: "sq4", category: "Business meetings",
    prompt: "A: 「この案でいかがでしょうか。」あなたは費用が心配です。どう答えますか。",
    options: ["だめです。", "確かに良い案ですが、費用が気になります。", "興味ないです。", "はい、はい。"],
    correctIndex: 1,
    explanation: "Polite disagreement acknowledges the good point first (確かに〜ですが) before raising your concern — direct だめです is too blunt for a meeting.",
  },
  {
    id: "sq5", category: "Scheduling",
    prompt: "相手: 「来週の火曜日はご都合いかがでしょうか。」その日は都合が悪いです。",
    options: ["だめです、無理です。", "申し訳ございませんが、その日は都合がつきません。", "火曜日は嫌いです。", "分かりません。"],
    correctIndex: 1,
    explanation: "申し訳ございませんが + 都合がつきません politely declines while leaving room to propose an alternative — a core BJT indirect-refusal pattern.",
  },
  {
    id: "sq6", category: "Reporting problems",
    prompt: "納品が遅れている理由を上司に説明した後、次に何をしますか。",
    options: ["何もしない。", "謝罪し、対応策を提案して確認を取る。", "他人のせいにする。", "話題を変える。"],
    correctIndex: 1,
    explanation: "The hō-ren-sō pattern is: what happened → cause → apology → proposed solution → ask permission/confirm — exactly what 明日までに手配いたしますが、よろしいでしょうか does.",
  },
];
