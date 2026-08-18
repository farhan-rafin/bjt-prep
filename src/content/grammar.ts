import { GrammarPoint } from "./types";

// Source: Part 7 — Japanese Grammar for BJT
export const grammarPoints: GrammarPoint[] = [
  { id: "desu-masu", tier: "critical", pattern: "です / ます", meaning: "Baseline politeness", businessExample: "会議は3時です。", businessExampleMeaning: "The meeting is at 3 o'clock." },
  { id: "te-kudasai", tier: "critical", pattern: "〜てください", meaning: "Polite request", businessExample: "こちらにご記入ください。", businessExampleMeaning: "Please fill this in here." },
  { id: "te-itadakemasuka", tier: "critical", pattern: "〜ていただけますか", meaning: "Very polite request", whenUsed: "Asking a superior, client, or customer to do something.", simpleExample: "もう一度言っていただけますか。", simpleExampleMeaning: "Could you say that one more time?", businessExample: "恐れ入りますが、見積もりを再送していただけますか。", businessExampleMeaning: "I'm sorry to trouble you, but could you resend the quotation?", commonMistake: "Using 〜てくれますか with a client — too casual. Upgrade to いただけますか." },
  { id: "te-mo-ii", tier: "critical", pattern: "〜てもいいですか", meaning: "Ask permission", businessExample: "早退してもいいですか。", businessExampleMeaning: "Is it okay if I leave work early?" },
  { id: "nakereba", tier: "critical", pattern: "〜なければなりません", meaning: "Obligation", businessExample: "報告書を出さなければなりません。", businessExampleMeaning: "I have to submit the report." },
  { id: "node-kara", tier: "critical", pattern: "〜ので / 〜から", meaning: "Reason (ので = softer/formal)", businessExample: "会議中ですので、後ほど。", businessExampleMeaning: "I'm in a meeting right now, so I'll get back to you later." },
  { id: "agemorau", tier: "critical", pattern: "あげる/もらう/くれる", meaning: "Giving & receiving (+ favours)", businessExample: "確認していただけますか。", businessExampleMeaning: "Could you check this for me?" },
  { id: "conditionals", tier: "critical", pattern: "〜たら / 〜ば / 〜と", meaning: "Conditionals", businessExample: "届いたら、ご連絡します。", businessExampleMeaning: "I'll contact you once it arrives." },
  { id: "youni-koto", tier: "important", pattern: "〜ようにする / 〜ことにする", meaning: "Make an effort / decide to", businessExample: "遅れないようにします。", businessExampleMeaning: "I'll make sure not to be late." },
  { id: "tame-ni", tier: "important", pattern: "〜ために", meaning: "Purpose", businessExample: "確認のために電話しました。", businessExampleMeaning: "I called in order to confirm." },
  { id: "passive", tier: "important", pattern: "passive 〜られる", meaning: "Passive (formal reports)", businessExample: "会議が延期されました。", businessExampleMeaning: "The meeting was postponed." },
  { id: "causative", tier: "important", pattern: "causative 〜させる", meaning: "Make/let someone do", businessExample: "部下に確認させます。", businessExampleMeaning: "I'll have my subordinate check it." },
  { id: "sou-you-rashii", tier: "important", pattern: "〜そうだ / 〜ようだ / 〜らしい", meaning: "Appearance / hearsay", businessExample: "納期に間に合わないようです。", businessExampleMeaning: "It seems we won't make the delivery deadline." },
  { id: "to-itteita", tier: "important", pattern: "〜と言っていた / 〜とのこと", meaning: "Reported speech", businessExample: "本日休むとのことです。", businessExampleMeaning: "I heard that he/she is off today." },
  { id: "te-oku", tier: "important", pattern: "〜ておく", meaning: "Do in advance", businessExample: "資料を準備しておきます。", businessExampleMeaning: "I'll prepare the materials in advance." },
  { id: "te-shimau", tier: "important", pattern: "〜てしまう", meaning: "Completion / regret", businessExample: "間違えてしまいました。", businessExampleMeaning: "I ended up making a mistake." },
  { id: "nagara-tsutsu", tier: "secondary", pattern: "〜ながら, 〜つつ", meaning: "Simultaneous — recognise in reading.", businessExample: "資料を確認しながら説明します。", businessExampleMeaning: "I'll explain while checking the materials." },
  { id: "wakeda-hazuda", tier: "secondary", pattern: "〜わけだ / 〜はずだ", meaning: "Logical conclusion/expectation — recognise.", businessExample: "もう届いているはずです。", businessExampleMeaning: "It should have already arrived." },
  { id: "chigainai-kamoshirenai", tier: "secondary", pattern: "〜に違いない / 〜かもしれない", meaning: "Certainty scale — recognise.", businessExample: "遅れるかもしれません。", businessExampleMeaning: "It might be late." },
  { id: "n1-literary", tier: "secondary", pattern: "Heavy N1 literary/written-only grammar", meaning: "Skip unless it appears in a mock.", businessExample: "—" },
];

export const grammarTierInfo = {
  critical: { label: "Critical", description: "Learn first, drill until automatic." },
  important: { label: "Important", description: "Core business grammar." },
  secondary: { label: "Secondary", description: "Recognise, don't drill hard." },
};
