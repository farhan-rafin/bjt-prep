// PRACTICE — true fill-in-the-blank cloze questions in the source document's own Part III
// format (see Part 26 section 94 sample: 資料を送って＿＿＿＿か). Blanks the grammar marker
// inside a real business sentence and offers register/form distractors, instead of asking
// "which pattern is this" — this is what the actual BJT Vocabulary/Grammar section tests.
export interface ClozeQuestion {
  id: string;
  patternId: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const clozeQuestions: ClozeQuestion[] = [
  {
    id: "cz-desu-masu", patternId: "desu-masu",
    prompt: "会議は3時＿＿＿＿。",
    options: ["です", "ます", "だ", "である"],
    correctIndex: 0,
    explanation: "です is the copula that attaches directly to a noun (3時です). ます attaches to a verb stem, not a noun, so it can't follow 3時 here. だ/である are plain/written register — wrong for a business sentence.",
  },
  {
    id: "cz-te-kudasai", patternId: "te-kudasai",
    prompt: "こちらにご記入＿＿＿＿。",
    options: ["ください", "くれ", "いただき", "なさい"],
    correctIndex: 0,
    explanation: "ご記入ください is the standard polite request pattern (お/ご + verb stem + ください). くれ is a blunt command; いただき is incomplete without ます/たい; なさい is a parent-to-child style command — both wrong register for a customer-facing instruction.",
  },
  {
    id: "cz-te-itadakemasuka", patternId: "te-itadakemasuka",
    prompt: "資料を送って＿＿＿＿か。",
    options: ["くれる", "いただけます", "あげる", "もらいます"],
    correctIndex: 1,
    explanation: "いただけますか is the very-polite request form for asking a superior/client to do something for you. くれる/あげる are too casual for this register; もらいます doesn't fit grammatically with か here.",
  },
  {
    id: "cz-te-mo-ii", patternId: "te-mo-ii",
    prompt: "早退して＿＿＿＿か。",
    options: ["もいいです", "もだめです", "はいけません", "でしょう"],
    correctIndex: 0,
    explanation: "〜てもいいですか asks for permission (\"is it okay if I...\"). もだめです and はいけません are negative/prohibitive forms — the opposite of what a permission question needs; でしょう doesn't form a permission request here.",
  },
  {
    id: "cz-nakereba", patternId: "nakereba",
    prompt: "報告書を出さ＿＿＿＿なりません。",
    options: ["なければ", "てもいい", "ないでください", "たら"],
    correctIndex: 0,
    explanation: "〜なければなりません expresses obligation (\"must do\"). The other options don't combine with なりません to form this fixed obligation pattern.",
  },
  {
    id: "cz-node", patternId: "node-kara",
    prompt: "会議中です＿＿＿＿、後ほどお電話いたします。",
    options: ["ので", "のに", "けど", "し"],
    correctIndex: 0,
    explanation: "ので gives a soft, formal reason — appropriate for a business explanation. のに implies contrast/complaint (\"even though\"); けど/し are casual connectors, wrong register here.",
  },
  {
    id: "cz-tara", patternId: "conditionals",
    prompt: "届い＿＿＿＿、ご連絡します。",
    options: ["たら", "なら", "と", "ば"],
    correctIndex: 0,
    explanation: "〜たら is the natural, conversational conditional for \"once X happens, I'll do Y\" and is the most common in spoken business Japanese. なら presumes the topic is already decided; と implies an automatic/mechanical result rather than a personal action — both are grammatically possible but read as slightly off here.",
  },
  {
    id: "cz-youni", patternId: "youni-koto",
    prompt: "遅れない＿＿＿＿します。",
    options: ["ように", "ことに", "ためにも", "のに"],
    correctIndex: 0,
    explanation: "〜ようにします means \"I'll make an effort to...\". ことにします means \"I've decided to...\" — a different nuance (decision, not ongoing effort). ためにも/のに don't fit this fixed pattern.",
  },
  {
    id: "cz-tameni", patternId: "tame-ni",
    prompt: "確認の＿＿＿＿電話しました。",
    options: ["ために", "ように", "のに", "せいで"],
    correctIndex: 0,
    explanation: "〜のために expresses purpose (\"in order to confirm, I called\"). ように is for effort/goal-orientation, not a simple purpose-for-noun; のに means \"even though\"; せいで blames a negative cause — wrong tone for a neutral business call.",
  },
  {
    id: "cz-passive", patternId: "passive",
    prompt: "会議が延期＿＿＿＿。",
    options: ["されました", "しました", "させました", "しています"],
    correctIndex: 0,
    explanation: "The meeting is the one being postponed (acted upon), so the passive されました (\"was postponed\") is correct. しました would mean \"I postponed [something]\" — wrong subject; させました is causative (\"made someone postpone\") — wrong meaning entirely.",
  },
  {
    id: "cz-causative", patternId: "causative",
    prompt: "部下に確認＿＿＿＿。",
    options: ["させます", "されます", "してあげます", "させられます"],
    correctIndex: 0,
    explanation: "させます is causative — \"I'll have/make my subordinate check it\" (you're directing them). されます is plain passive (wrong subject relationship); させられます is causative-passive (\"I'm made to do it\") — the opposite direction.",
  },
  {
    id: "cz-souyou", patternId: "sou-you-rashii",
    prompt: "納期に間に合わない＿＿＿＿。",
    options: ["ようです", "そうです", "らしいです", "みたいだ"],
    correctIndex: 0,
    explanation: "ようです expresses the speaker's own inference from visible evidence — fitting for a business observation. そうです here would suggest hearsay from someone else; みたいだ is too casual for a report.",
  },
  {
    id: "cz-totteita", patternId: "to-itteita",
    prompt: "本日休む＿＿＿＿です。",
    options: ["とのこと", "という", "そう", "らしい"],
    correctIndex: 0,
    explanation: "〜とのことです is the formal way to report what someone else said (\"I was told that...\"). という alone is incomplete here; そう/らしい are more casual hearsay markers, less appropriate for a formal report.",
  },
  {
    id: "cz-teoku", patternId: "te-oku",
    prompt: "資料を準備して＿＿＿＿。",
    options: ["おきます", "しまいます", "みます", "あげます"],
    correctIndex: 0,
    explanation: "〜ておきます means doing something in advance/preparation. 〜てしまいます signals completion or regret — wrong nuance; 〜てみます means \"try doing\"; 〜てあげます means doing a favour for someone else.",
  },
  {
    id: "cz-teshimau", patternId: "te-shimau",
    prompt: "間違えて＿＿＿＿。",
    options: ["しまいました", "おきました", "みました", "あげました"],
    correctIndex: 0,
    explanation: "〜てしまいました expresses regret at an unintended completed action (\"I ended up making a mistake\"). 〜ておきました (prep in advance), 〜てみました (tried it), 〜てあげました (did a favour) all carry the wrong nuance for admitting a mistake.",
  },
];
