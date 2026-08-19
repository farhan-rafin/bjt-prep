import { GrammarPoint } from "./types";

// Source: Part 7 — Japanese Grammar for BJT
export const grammarPoints: GrammarPoint[] = [
  { id: "desu-masu", tier: "critical", pattern: "です / ます", meaning: "Baseline politeness", businessExampleReading: "かいぎはさんじです。", businessExample: "会議は3時です。", businessExampleMeaning: "The meeting is at 3 o'clock." },
  { id: "te-kudasai", tier: "critical", pattern: "〜てください", meaning: "Polite request", businessExampleReading: "こちらにごきにゅうください。", businessExample: "こちらにご記入ください。", businessExampleMeaning: "Please fill this in here." },
  { id: "te-itadakemasuka", tier: "critical", pattern: "〜ていただけますか", meaning: "Very polite request", whenUsed: "Asking a superior, client, or customer to do something.", simpleExampleReading: "もういちどいっていただけますか。", simpleExample: "もう一度言っていただけますか。", simpleExampleMeaning: "Could you say that one more time?", businessExampleReading: "おそれいりますが、みつもりをさいそうしていただけますか。", businessExample: "恐れ入りますが、見積もりを再送していただけますか。", businessExampleMeaning: "I'm sorry to trouble you, but could you resend the quotation?", commonMistake: "Using 〜てくれますか with a client — too casual. Upgrade to いただけますか." },
  { id: "te-mo-ii", tier: "critical", pattern: "〜てもいいですか", meaning: "Ask permission", businessExampleReading: "そうたいしてもいいですか。", businessExample: "早退してもいいですか。", businessExampleMeaning: "Is it okay if I leave work early?" },
  { id: "nakereba", tier: "critical", pattern: "〜なければなりません", meaning: "Obligation", businessExampleReading: "ほうこくしょをださなければなりません。", businessExample: "報告書を出さなければなりません。", businessExampleMeaning: "I have to submit the report." },
  { id: "node-kara", tier: "critical", pattern: "〜ので / 〜から", meaning: "Reason (ので = softer/formal)", businessExampleReading: "かいぎちゅうですので、のちほど。", businessExample: "会議中ですので、後ほど。", businessExampleMeaning: "I'm in a meeting right now, so I'll get back to you later." },
  { id: "agemorau", tier: "critical", pattern: "あげる/もらう/くれる", meaning: "Giving & receiving (+ favours)", businessExampleReading: "かくにんしていただけますか。", businessExample: "確認していただけますか。", businessExampleMeaning: "Could you check this for me?" },
  { id: "conditionals", tier: "critical", pattern: "〜たら / 〜ば / 〜と", meaning: "Conditionals", businessExampleReading: "とどいたら、ごれんらくします。", businessExample: "届いたら、ご連絡します。", businessExampleMeaning: "I'll contact you once it arrives." },
  { id: "youni-koto", tier: "important", pattern: "〜ようにする / 〜ことにする", meaning: "Make an effort / decide to", businessExampleReading: "おくれないようにします。", businessExample: "遅れないようにします。", businessExampleMeaning: "I'll make sure not to be late." },
  { id: "tame-ni", tier: "important", pattern: "〜ために", meaning: "Purpose", businessExampleReading: "かくにんのためにでんわしました。", businessExample: "確認のために電話しました。", businessExampleMeaning: "I called in order to confirm." },
  { id: "passive", tier: "important", pattern: "passive 〜られる", meaning: "Passive (formal reports)", businessExampleReading: "かいぎがえんきされました。", businessExample: "会議が延期されました。", businessExampleMeaning: "The meeting was postponed." },
  { id: "causative", tier: "important", pattern: "causative 〜させる", meaning: "Make/let someone do", businessExampleReading: "ぶかにかくにんさせます。", businessExample: "部下に確認させます。", businessExampleMeaning: "I'll have my subordinate check it." },
  { id: "sou-you-rashii", tier: "important", pattern: "〜そうだ / 〜ようだ / 〜らしい", meaning: "Appearance / hearsay", businessExampleReading: "のうきにまにあわないようです。", businessExample: "納期に間に合わないようです。", businessExampleMeaning: "It seems we won't make the delivery deadline." },
  { id: "to-itteita", tier: "important", pattern: "〜と言っていた / 〜とのこと", meaning: "Reported speech", businessExampleReading: "ほんじつやすむとのことです。", businessExample: "本日休むとのことです。", businessExampleMeaning: "I heard that he/she is off today." },
  { id: "te-oku", tier: "important", pattern: "〜ておく", meaning: "Do in advance", businessExampleReading: "しりょうをじゅんびしておきます。", businessExample: "資料を準備しておきます。", businessExampleMeaning: "I'll prepare the materials in advance." },
  { id: "te-shimau", tier: "important", pattern: "〜てしまう", meaning: "Completion / regret", businessExampleReading: "まちがえてしまいました。", businessExample: "間違えてしまいました。", businessExampleMeaning: "I ended up making a mistake." },
  { id: "nagara-tsutsu", tier: "secondary", pattern: "〜ながら, 〜つつ", meaning: "Simultaneous — recognise in reading.", businessExampleReading: "しりょうをかくにんしながらせつめいします。", businessExample: "資料を確認しながら説明します。", businessExampleMeaning: "I'll explain while checking the materials." },
  { id: "wakeda-hazuda", tier: "secondary", pattern: "〜わけだ / 〜はずだ", meaning: "Logical conclusion/expectation — recognise.", businessExampleReading: "もうとどいているはずです。", businessExample: "もう届いているはずです。", businessExampleMeaning: "It should have already arrived." },
  { id: "chigainai-kamoshirenai", tier: "secondary", pattern: "〜に違いない / 〜かもしれない", meaning: "Certainty scale — recognise.", businessExampleReading: "おくれるかもしれません。", businessExample: "遅れるかもしれません。", businessExampleMeaning: "It might be late." },
  { id: "n1-literary", tier: "secondary", pattern: "Heavy N1 literary/written-only grammar", meaning: "Skip unless it appears in a mock.", businessExample: "—" },
];

export const grammarTierInfo = {
  critical: { label: "Critical", description: "Learn first, drill until automatic." },
  important: { label: "Important", description: "Core business grammar." },
  secondary: { label: "Secondary", description: "Recognise, don't drill hard." },
};
