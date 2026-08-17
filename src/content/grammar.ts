import { GrammarPoint } from "./types";

// Source: Part 7 — Japanese Grammar for BJT
export const grammarPoints: GrammarPoint[] = [
  { id: "desu-masu", tier: "critical", pattern: "です / ます", meaning: "Baseline politeness", businessExample: "会議は3時です。" },
  { id: "te-kudasai", tier: "critical", pattern: "〜てください", meaning: "Polite request", businessExample: "こちらにご記入ください。" },
  { id: "te-itadakemasuka", tier: "critical", pattern: "〜ていただけますか", meaning: "Very polite request", whenUsed: "Asking a superior, client, or customer to do something.", simpleExample: "もう一度言っていただけますか。", businessExample: "恐れ入りますが、見積もりを再送していただけますか。", commonMistake: "Using 〜てくれますか with a client — too casual. Upgrade to いただけますか." },
  { id: "te-mo-ii", tier: "critical", pattern: "〜てもいいですか", meaning: "Ask permission", businessExample: "早退してもいいですか。" },
  { id: "nakereba", tier: "critical", pattern: "〜なければなりません", meaning: "Obligation", businessExample: "報告書を出さなければなりません。" },
  { id: "node-kara", tier: "critical", pattern: "〜ので / 〜から", meaning: "Reason (ので = softer/formal)", businessExample: "会議中ですので、後ほど。" },
  { id: "agemorau", tier: "critical", pattern: "あげる/もらう/くれる", meaning: "Giving & receiving (+ favours)", businessExample: "確認していただけますか。" },
  { id: "conditionals", tier: "critical", pattern: "〜たら / 〜ば / 〜と", meaning: "Conditionals", businessExample: "届いたら、ご連絡します。" },
  { id: "youni-koto", tier: "important", pattern: "〜ようにする / 〜ことにする", meaning: "Make an effort / decide to", businessExample: "遅れないようにします。" },
  { id: "tame-ni", tier: "important", pattern: "〜ために", meaning: "Purpose", businessExample: "確認のために電話しました。" },
  { id: "passive", tier: "important", pattern: "passive 〜られる", meaning: "Passive (formal reports)", businessExample: "会議が延期されました。" },
  { id: "causative", tier: "important", pattern: "causative 〜させる", meaning: "Make/let someone do", businessExample: "部下に確認させます。" },
  { id: "sou-you-rashii", tier: "important", pattern: "〜そうだ / 〜ようだ / 〜らしい", meaning: "Appearance / hearsay", businessExample: "納期に間に合わないようです。" },
  { id: "to-itteita", tier: "important", pattern: "〜と言っていた / 〜とのこと", meaning: "Reported speech", businessExample: "本日休むとのことです。" },
  { id: "te-oku", tier: "important", pattern: "〜ておく", meaning: "Do in advance", businessExample: "資料を準備しておきます。" },
  { id: "te-shimau", tier: "important", pattern: "〜てしまう", meaning: "Completion / regret", businessExample: "間違えてしまいました。" },
  { id: "nagara-tsutsu", tier: "secondary", pattern: "〜ながら, 〜つつ", meaning: "Simultaneous — recognise in reading.", businessExample: "資料を確認しながら説明します。" },
  { id: "wakeda-hazuda", tier: "secondary", pattern: "〜わけだ / 〜はずだ", meaning: "Logical conclusion/expectation — recognise.", businessExample: "もう届いているはずです。" },
  { id: "chigainai-kamoshirenai", tier: "secondary", pattern: "〜に違いない / 〜かもしれない", meaning: "Certainty scale — recognise.", businessExample: "遅れるかもしれません。" },
  { id: "n1-literary", tier: "secondary", pattern: "Heavy N1 literary/written-only grammar", meaning: "Skip unless it appears in a mock.", businessExample: "—" },
];

export const grammarTierInfo = {
  critical: { label: "Critical", description: "Learn first, drill until automatic." },
  important: { label: "Important", description: "Core business grammar." },
  secondary: { label: "Secondary", description: "Recognise, don't drill hard." },
};
