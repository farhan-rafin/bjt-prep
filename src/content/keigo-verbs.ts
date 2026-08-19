// The core keigo verb conversion table — plain / 尊敬語 (raises THEM) / 謙譲語 (lowers YOU) / 丁寧語.
//
// This is the single highest-yield table in the whole exam. 語彙・文法 (Part III, 10 questions)
// leans on it constantly, and Part I uses the same forms to signal who outranks whom.
// The classic trap is a question where two options are both "polite" but only one has the
// direction right — 拝見します about your own looking, ご覧になります about theirs.

export interface KeigoVerbPair {
  id: string;
  plain: string;
  plainReading: string;
  meaning: string;
  /** 尊敬語 — used about the OTHER person's action, to raise them. Null where no special form exists. */
  sonkeigo: string | null;
  sonkeigoReading: string | null;
  /** 謙譲語 — used about YOUR OWN action, to lower yourself. Null where no special form exists. */
  kenjougo: string | null;
  kenjougoReading: string | null;
  /** 丁寧語 — the plain polite ます form, neutral as to direction. */
  teineigo: string;
  teineigoReading: string;
  example: string;
  exampleReading: string;
  exampleMeaning: string;
  /** Which register the example demonstrates. */
  exampleRegister: "sonkeigo" | "kenjougo";
  note: string;
}

export const keigoVerbPairs: KeigoVerbPair[] = [
  {
    id: "kv-miru", plain: "見る", plainReading: "みる", meaning: "to see / look at",
    sonkeigo: "ご覧になる", sonkeigoReading: "ごらんになる",
    kenjougo: "拝見する", kenjougoReading: "はいけんする",
    teineigo: "見ます", teineigoReading: "みます",
    example: "資料は拝見しました。部長はもうご覧になりましたか。",
    exampleReading: "しりょうははいけんしました。ぶちょうはもうごらんになりましたか。",
    exampleMeaning: "I've looked at the materials. Has the manager already seen them?",
    exampleRegister: "kenjougo",
    note: "The most-tested pair on the whole exam. 拝見 = your eyes, ご覧 = their eyes. Never swap them.",
  },
  {
    id: "kv-iu", plain: "言う", plainReading: "いう", meaning: "to say",
    sonkeigo: "おっしゃる", sonkeigoReading: "おっしゃる",
    kenjougo: "申す / 申し上げる", kenjougoReading: "もうす / もうしあげる",
    teineigo: "言います", teineigoReading: "いいます",
    example: "田中と申します。おっしゃる通りでございます。",
    exampleReading: "たなかともうします。おっしゃるとおりでございます。",
    exampleMeaning: "My name is Tanaka. It is exactly as you say.",
    exampleRegister: "kenjougo",
    note: "申します is how you give your own name; 申し上げる is for saying something TO a superior. おっしゃる通り is a stock agreement phrase.",
  },
  {
    id: "kv-iku", plain: "行く", plainReading: "いく", meaning: "to go",
    sonkeigo: "いらっしゃる", sonkeigoReading: "いらっしゃる",
    kenjougo: "伺う / 参る", kenjougoReading: "うかがう / まいる",
    teineigo: "行きます", teineigoReading: "いきます",
    example: "明日、御社に伺います。",
    exampleReading: "あす、おんしゃにうかがいます。",
    exampleMeaning: "I will visit your company tomorrow.",
    exampleRegister: "kenjougo",
    note: "伺う implies going TO someone you respect; 参る is humble but neutral about the destination. Both lower you.",
  },
  {
    id: "kv-kuru", plain: "来る", plainReading: "くる", meaning: "to come",
    sonkeigo: "いらっしゃる / お見えになる", sonkeigoReading: "いらっしゃる / おみえになる",
    kenjougo: "参る", kenjougoReading: "まいる",
    teineigo: "来ます", teineigoReading: "きます",
    example: "お客様がお見えになりました。",
    exampleReading: "おきゃくさまがおみえになりました。",
    exampleMeaning: "The customer has arrived.",
    exampleRegister: "sonkeigo",
    note: "いらっしゃる covers go, come AND be — context decides which. お見えになる is specifically 'has arrived' about a guest.",
  },
  {
    id: "kv-iru", plain: "いる", plainReading: "いる", meaning: "to be / exist (people)",
    sonkeigo: "いらっしゃる", sonkeigoReading: "いらっしゃる",
    kenjougo: "おる", kenjougoReading: "おる",
    teineigo: "います", teineigoReading: "います",
    example: "山田はただいま席を外しております。",
    exampleReading: "やまだはただいませきをはずしております。",
    exampleMeaning: "Yamada is away from his desk at the moment.",
    exampleRegister: "kenjougo",
    note: "On the phone you use おります for your OWN colleagues, even the president — anyone inside your company is 'lowered' toward an outsider.",
  },
  {
    id: "kv-suru", plain: "する", plainReading: "する", meaning: "to do",
    sonkeigo: "なさる", sonkeigoReading: "なさる",
    kenjougo: "いたす", kenjougoReading: "いたす",
    teineigo: "します", teineigoReading: "します",
    example: "私が確認いたします。どうなさいますか。",
    exampleReading: "わたしがかくにんいたします。どうなさいますか。",
    exampleMeaning: "I will check. What would you like to do?",
    exampleRegister: "kenjougo",
    note: "いたします attaches to countless nouns — 確認いたします, 対応いたします, ご連絡いたします. Learning this one unlocks dozens of set phrases.",
  },
  {
    id: "kv-taberu", plain: "食べる", plainReading: "たべる", meaning: "to eat",
    sonkeigo: "召し上がる", sonkeigoReading: "めしあがる",
    kenjougo: "いただく", kenjougoReading: "いただく",
    teineigo: "食べます", teineigoReading: "たべます",
    example: "どうぞ召し上がってください。",
    exampleReading: "どうぞめしあがってください。",
    exampleMeaning: "Please, help yourself.",
    exampleRegister: "sonkeigo",
    note: "召し上がる also covers 飲む. Offering food to a client and saying 食べてください instead is a register error the exam likes to test.",
  },
  {
    id: "kv-nomu", plain: "飲む", plainReading: "のむ", meaning: "to drink",
    sonkeigo: "召し上がる", sonkeigoReading: "めしあがる",
    kenjougo: "いただく", kenjougoReading: "いただく",
    teineigo: "飲みます", teineigoReading: "のみます",
    example: "コーヒーをいただきました。",
    exampleReading: "コーヒーをいただきました。",
    exampleMeaning: "I had a coffee.",
    exampleRegister: "kenjougo",
    note: "Shares its keigo forms with 食べる — one pair covers both verbs.",
  },
  {
    id: "kv-shiru", plain: "知る", plainReading: "しる", meaning: "to know",
    sonkeigo: "ご存じだ", sonkeigoReading: "ごぞんじだ",
    kenjougo: "存じる / 存じ上げる", kenjougoReading: "ぞんじる / ぞんじあげる",
    teineigo: "知っています", teineigoReading: "しっています",
    example: "その件はご存じでしょうか。私は存じません。",
    exampleReading: "そのけんはごぞんじでしょうか。わたしはぞんじません。",
    exampleMeaning: "Are you aware of that matter? I don't know of it.",
    exampleRegister: "sonkeigo",
    note: "存じ上げる is used for knowing PEOPLE; 存じる for knowing facts. ご存じ takes だ/です, not になる.",
  },
  {
    id: "kv-au", plain: "会う", plainReading: "あう", meaning: "to meet",
    sonkeigo: "お会いになる", sonkeigoReading: "おあいになる",
    kenjougo: "お目にかかる", kenjougoReading: "おめにかかる",
    teineigo: "会います", teineigoReading: "あいます",
    example: "お目にかかれて光栄です。",
    exampleReading: "おめにかかれてこうえいです。",
    exampleMeaning: "It's an honour to meet you.",
    exampleRegister: "kenjougo",
    note: "お目にかかる literally 'to be placed before your eyes' — strongly humble, used at first meetings with clients.",
  },
  {
    id: "kv-morau", plain: "もらう", plainReading: "もらう", meaning: "to receive",
    sonkeigo: null, sonkeigoReading: null,
    kenjougo: "いただく / 頂戴する", kenjougoReading: "いただく / ちょうだいする",
    teineigo: "もらいます", teineigoReading: "もらいます",
    example: "ご連絡をいただき、ありがとうございます。",
    exampleReading: "ごれんらくをいただき、ありがとうございます。",
    exampleMeaning: "Thank you for contacting me.",
    exampleRegister: "kenjougo",
    note: "No sonkeigo form exists — receiving is inherently about you, so it only humbles. 〜ていただく is the backbone of polite requests.",
  },
  {
    id: "kv-ageru", plain: "あげる", plainReading: "あげる", meaning: "to give (to someone else)",
    sonkeigo: null, sonkeigoReading: null,
    kenjougo: "差し上げる", kenjougoReading: "さしあげる",
    teineigo: "あげます", teineigoReading: "あげます",
    example: "後ほど資料をお送り差し上げます。",
    exampleReading: "のちほどしりょうをおおくりさしあげます。",
    exampleMeaning: "I will send you the materials later.",
    exampleRegister: "kenjougo",
    note: "差し上げる can sound condescending if overused — many businesses prefer お送りいたします. Recognise it, use it sparingly.",
  },
  {
    id: "kv-kureru", plain: "くれる", plainReading: "くれる", meaning: "to give (to me)",
    sonkeigo: "くださる", sonkeigoReading: "くださる",
    kenjougo: null, kenjougoReading: null,
    teineigo: "くれます", teineigoReading: "くれます",
    example: "お忙しい中、ご対応くださりありがとうございます。",
    exampleReading: "おいそがしいなか、ごたいおうくださりありがとうございます。",
    exampleMeaning: "Thank you for attending to this despite being busy.",
    exampleRegister: "sonkeigo",
    note: "The mirror of もらう: くださる has no kenjougo form because the giver is always the other person. 〜てください is its worn-down descendant.",
  },
  {
    id: "kv-kiku", plain: "聞く", plainReading: "きく", meaning: "to ask / to listen",
    sonkeigo: "お聞きになる", sonkeigoReading: "おききになる",
    kenjougo: "伺う / 拝聴する", kenjougoReading: "うかがう / はいちょうする",
    teineigo: "聞きます", teineigoReading: "ききます",
    example: "一つ伺ってもよろしいでしょうか。",
    exampleReading: "ひとつうかがってもよろしいでしょうか。",
    exampleMeaning: "May I ask you one thing?",
    exampleRegister: "kenjougo",
    note: "伺う does double duty for 行く and 聞く — context tells you which. 拝聴する is reserved for listening to a speech or performance.",
  },
  {
    id: "kv-omou", plain: "思う", plainReading: "おもう", meaning: "to think",
    sonkeigo: "お思いになる", sonkeigoReading: "おおもいになる",
    kenjougo: "存じる", kenjougoReading: "ぞんじる",
    teineigo: "思います", teineigoReading: "おもいます",
    example: "問題ないかと存じます。",
    exampleReading: "もんだいないかとぞんじます。",
    exampleMeaning: "I believe there should be no problem.",
    exampleRegister: "kenjougo",
    note: "〜かと存じます is a very soft way of stating an opinion to a client — noticeably gentler than 〜と思います.",
  },
  {
    id: "kv-matsu", plain: "待つ", plainReading: "まつ", meaning: "to wait",
    sonkeigo: "お待ちになる", sonkeigoReading: "おまちになる",
    kenjougo: "お待ちする", kenjougoReading: "おまちする",
    teineigo: "待ちます", teineigoReading: "まちます",
    example: "少々お待ちくださいませ。",
    exampleReading: "しょうしょうおまちくださいませ。",
    exampleMeaning: "Please wait a moment.",
    exampleRegister: "sonkeigo",
    note: "Regular verbs follow the pattern お＋stem＋になる (respectful) vs お＋stem＋する (humble). Learn the pattern and you can convert almost any verb.",
  },
];

/** The two directions a conversion question can run. */
export type KeigoRegister = "sonkeigo" | "kenjougo";

export const keigoRegisterInfo: Record<KeigoRegister, { ja: string; en: string; rule: string }> = {
  sonkeigo: { ja: "尊敬語", en: "Respectful", rule: "Raises the OTHER person. Use for their actions." },
  kenjougo: { ja: "謙譲語", en: "Humble", rule: "Lowers YOURSELF. Use for your own actions." },
};

export function pairsWith(register: KeigoRegister) {
  return keigoVerbPairs.filter((p) => (register === "sonkeigo" ? p.sonkeigo : p.kenjougo) !== null);
}
