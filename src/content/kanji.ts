import { KanjiItem } from "./types";

// Source: kanji explicitly named in Part 27 (Weeks 1-4 sessions) and Part 9 category tables.
// Readings/meanings/compounds are standard dictionary facts attached to the document's named kanji.
export const kanjiItems: KanjiItem[] = [
  // Numbers/time — W1D1, W1D2
  { id: "k-1", kanji: "一", reading: "いち", meaning: "one", compounds: ["一つ", "一月"], category: "Numbers / Time", week: 1 },
  { id: "k-2", kanji: "二", reading: "に", meaning: "two", compounds: ["二つ", "二月"], category: "Numbers / Time", week: 1 },
  { id: "k-3", kanji: "三", reading: "さん", meaning: "three", compounds: ["三時", "三月"], category: "Numbers / Time", week: 1 },
  { id: "k-4", kanji: "四", reading: "よん / し", meaning: "four", compounds: ["四時"], category: "Numbers / Time", week: 1 },
  { id: "k-5", kanji: "五", reading: "ご", meaning: "five", compounds: ["五時"], category: "Numbers / Time", week: 1 },
  { id: "k-6", kanji: "六", reading: "ろく", meaning: "six", compounds: ["六時"], category: "Numbers / Time", week: 1 },
  { id: "k-7", kanji: "七", reading: "なな / しち", meaning: "seven", compounds: ["七時"], category: "Numbers / Time", week: 1 },
  { id: "k-8", kanji: "八", reading: "はち", meaning: "eight", compounds: ["八時"], category: "Numbers / Time", week: 1 },
  { id: "k-9", kanji: "九", reading: "きゅう / く", meaning: "nine", compounds: ["九時"], category: "Numbers / Time", week: 1 },
  { id: "k-10", kanji: "十", reading: "じゅう", meaning: "ten", compounds: ["十時"], category: "Numbers / Time", week: 1 },
  { id: "k-hyaku", kanji: "百", reading: "ひゃく", meaning: "hundred", compounds: ["百円"], category: "Money", week: 1 },
  { id: "k-sen", kanji: "千", reading: "せん", meaning: "thousand", compounds: ["千円"], category: "Money", week: 1 },
  { id: "k-en", kanji: "円", reading: "えん", meaning: "yen / circle", compounds: ["百円", "千円"], category: "Money", week: 1 },
  { id: "k-nen", kanji: "年", reading: "ねん", meaning: "year", compounds: ["今年", "来年"], category: "Numbers / Time", week: 2 },
  { id: "k-getsu", kanji: "月", reading: "がつ / つき", meaning: "month / moon", compounds: ["来月", "先月"], category: "Numbers / Time", week: 2 },
  { id: "k-nichi", kanji: "日", reading: "にち / ひ", meaning: "day / sun", compounds: ["今日", "毎日"], category: "Numbers / Time", week: 2 },
  { id: "k-ji", kanji: "時", reading: "じ", meaning: "time / hour", compounds: ["時間", "三時"], category: "Numbers / Time", week: 2 },
  { id: "k-fun", kanji: "分", reading: "ふん / ぷん", meaning: "minute", compounds: ["十分", "五分"], category: "Numbers / Time", week: 2 },
  // Company/meeting — W1D3
  { id: "k-kai", kanji: "会", reading: "かい", meaning: "meet / association", compounds: ["会社", "会議"], category: "Companies / People", week: 3 },
  { id: "k-sha", kanji: "社", reading: "しゃ", meaning: "company / shrine", compounds: ["会社", "社員"], category: "Companies / People", week: 3 },
  { id: "k-bu", kanji: "部", reading: "ぶ", meaning: "department / part", compounds: ["部長", "部下"], category: "Companies / People", week: 3 },
  { id: "k-ka", kanji: "課", reading: "か", meaning: "section (org unit)", compounds: ["課長"], category: "Companies / People", week: 3 },
  { id: "k-gi", kanji: "議", reading: "ぎ", meaning: "discussion / deliberation", compounds: ["会議", "議題"], category: "Meetings", week: 3 },
  // Documents/report — W2D1
  { id: "k-sho", kanji: "書", reading: "しょ", meaning: "write / document", compounds: ["書類"], category: "Documents", week: 5 },
  { id: "k-rui", kanji: "類", reading: "るい", meaning: "kind / category", compounds: ["書類"], category: "Documents", week: 5 },
  { id: "k-hou", kanji: "報", reading: "ほう", meaning: "report / news", compounds: ["報告"], category: "Documents", week: 5 },
  { id: "k-koku", kanji: "告", reading: "こく", meaning: "tell / announce", compounds: ["報告"], category: "Documents", week: 5 },
  // Schedule — W2D2
  { id: "k-yo", kanji: "予", reading: "よ", meaning: "beforehand", compounds: ["予定", "予約"], category: "Schedules", week: 6 },
  { id: "k-tei", kanji: "定", reading: "てい", meaning: "fix / decide", compounds: ["予定", "決定"], category: "Schedules", week: 6 },
  { id: "k-shime", kanji: "締", reading: "しめ", meaning: "tighten / close", compounds: ["締め切り"], category: "Schedules", week: 6 },
  { id: "k-setsu", kanji: "切", reading: "せつ / きり", meaning: "cut / limit", compounds: ["締切", "大切"], category: "Schedules", week: 6 },
  // Confirm/request — W2D3
  { id: "k-kaku", kanji: "確", reading: "かく", meaning: "confirm / certain", compounds: ["確認"], category: "Documents", week: 6 },
  { id: "k-nin", kanji: "認", reading: "にん", meaning: "acknowledge / recognize", compounds: ["確認"], category: "Documents", week: 6 },
  { id: "k-i", kanji: "依", reading: "い", meaning: "depend / request", compounds: ["依頼"], category: "Instructions", week: 6 },
  { id: "k-rai", kanji: "頼", reading: "らい", meaning: "rely / ask", compounds: ["依頼"], category: "Instructions", week: 6 },
  // Phone — W3D1
  { id: "k-den", kanji: "電", reading: "でん", meaning: "electricity", compounds: ["電話", "電車"], category: "Transport", week: 9 },
  { id: "k-wa", kanji: "話", reading: "わ", meaning: "talk / speech", compounds: ["電話"], category: "Companies / People", week: 9 },
  { id: "k-ban", kanji: "番", reading: "ばん", meaning: "number / order", compounds: ["番号"], category: "Companies / People", week: 9 },
  { id: "k-gou", kanji: "号", reading: "ごう", meaning: "number / issue", compounds: ["番号"], category: "Companies / People", week: 9 },
  // Customer — W3D2
  { id: "k-kyaku", kanji: "客", reading: "きゃく", meaning: "guest / customer", compounds: ["お客様", "接客"], category: "Companies / People", week: 10 },
  { id: "k-tai", kanji: "対", reading: "たい", meaning: "face / against", compounds: ["対応", "対策"], category: "Problems", week: 10 },
  { id: "k-ou", kanji: "応", reading: "おう", meaning: "respond", compounds: ["対応"], category: "Problems", week: 10 },
  // Problem/cause — W3D3
  { id: "k-mon", kanji: "問", reading: "もん", meaning: "question / problem", compounds: ["問題"], category: "Problems", week: 11 },
  { id: "k-dai", kanji: "題", reading: "だい", meaning: "topic / subject", compounds: ["問題", "議題"], category: "Problems", week: 11 },
  { id: "k-gen", kanji: "原", reading: "げん", meaning: "origin / field", compounds: ["原因"], category: "Problems", week: 11 },
  { id: "k-in", kanji: "因", reading: "いん", meaning: "cause", compounds: ["原因"], category: "Problems", week: 11 },
  // Appointments — W4D1
  { id: "k-yaku", kanji: "約", reading: "やく", meaning: "promise / approx.", compounds: ["予約", "約束"], category: "Schedules", week: 13 },
  { id: "k-men", kanji: "面", reading: "めん", meaning: "face / surface", compounds: ["面会"], category: "Companies / People", week: 13 },
  { id: "k-hou2", kanji: "訪", reading: "ほう", meaning: "visit", compounds: ["訪問"], category: "Schedules", week: 13 },
  { id: "k-mon2", kanji: "問", reading: "もん", meaning: "ask / visit", compounds: ["訪問"], category: "Schedules", week: 13 },
  // Decision/opinion — W4D2
  { id: "k-ketsu", kanji: "決", reading: "けつ", meaning: "decide", compounds: ["決定"], category: "Meetings", week: 14 },
  { id: "k-tei2", kanji: "定", reading: "てい", meaning: "fix / decide", compounds: ["決定", "予定"], category: "Meetings", week: 14 },
  { id: "k-i2", kanji: "意", reading: "い", meaning: "mind / meaning", compounds: ["意見"], category: "Meetings", week: 14 },
  { id: "k-ken", kanji: "見", reading: "けん", meaning: "see / opinion", compounds: ["意見", "見積"], category: "Meetings", week: 14 },
  // Quantities — W4D3
  { id: "k-zou", kanji: "増", reading: "ぞう", meaning: "increase", compounds: ["増加"], category: "Quantities", week: 15 },
  { id: "k-gen2", kanji: "減", reading: "げん", meaning: "decrease", compounds: ["減少"], category: "Quantities", week: 15 },
  { id: "k-wari", kanji: "割", reading: "わり", meaning: "ratio / divide", compounds: ["割合"], category: "Quantities", week: 15 },
  { id: "k-gou2", kanji: "合", reading: "ごう", meaning: "fit / combine", compounds: ["割合", "合計"], category: "Quantities", week: 15 },
  // Additional Part 9 category kanji not yet listed
  { id: "k-youbi", kanji: "曜", reading: "よう", meaning: "day of week", compounds: ["曜日"], category: "Numbers / Time", week: 2 },
  { id: "k-kin", kanji: "金", reading: "きん", meaning: "money / gold", compounds: ["料金", "現金"], category: "Money", week: 2 },
  { id: "k-ryou", kanji: "料", reading: "りょう", meaning: "fee / material", compounds: ["料金", "資料"], category: "Money", week: 2 },
  { id: "k-hi", kanji: "費", reading: "ひ", meaning: "expense / cost", compounds: ["経費", "費用"], category: "Money", week: 17 },
  { id: "k-ka2", kanji: "価", reading: "か", meaning: "price / value", compounds: ["価格"], category: "Money", week: 17 },
  { id: "k-sei", kanji: "請", reading: "せい", meaning: "request / bill", compounds: ["請求"], category: "Money", week: 12 },
  { id: "k-shi", kanji: "支", reading: "し", meaning: "branch / pay", compounds: ["支払"], category: "Money", week: 12 },
  { id: "k-in2", kanji: "員", reading: "いん", meaning: "member / staff", compounds: ["社員", "会員"], category: "Companies / People", week: 5 },
  { id: "k-tan", kanji: "担", reading: "たん", meaning: "bear / undertake", compounds: ["担当"], category: "Companies / People", week: 5 },
  { id: "k-touchaku", kanji: "着", reading: "ちゃく", meaning: "arrive / wear", compounds: ["到着"], category: "Transport", week: 21 },
  { id: "k-shutsu", kanji: "出", reading: "しゅつ / で", meaning: "exit / leave", compounds: ["出発", "提出"], category: "Transport", week: 21 },
  { id: "k-hatsu", kanji: "発", reading: "はつ", meaning: "departure / emit", compounds: ["出発", "発注"], category: "Transport", week: 21 },
  { id: "k-chi", kanji: "遅", reading: "ち", meaning: "late / slow", compounds: ["遅延", "遅刻"], category: "Transport", week: 21 },
  { id: "k-en2", kanji: "延", reading: "えん", meaning: "extend / postpone", compounds: ["延期", "遅延"], category: "Schedules", week: 21 },
  { id: "k-keiyaku", kanji: "契", reading: "けい", meaning: "contract (part)", compounds: ["契約"], category: "Documents", week: 17 },
  { id: "k-yaku2", kanji: "約2", reading: "やく", meaning: "promise / contract (part)", compounds: ["契約", "予約"], category: "Documents", week: 17 },
  { id: "k-shiji", kanji: "指", reading: "し", meaning: "finger / point out", compounds: ["指示"], category: "Instructions", week: 6 },
  { id: "k-kyoka", kanji: "許", reading: "きょ", meaning: "permit", compounds: ["許可"], category: "Instructions", week: 7 },
  { id: "k-ka3", kanji: "可", reading: "か", meaning: "possible / permit", compounds: ["許可"], category: "Instructions", week: 7 },
  { id: "k-chuui", kanji: "注", reading: "ちゅう", meaning: "pour / attention", compounds: ["注意", "注文"], category: "Instructions", week: 9 },
  { id: "k-kin2", kanji: "禁", reading: "きん", meaning: "prohibit", compounds: ["禁止"], category: "Instructions", week: 9 },
  { id: "k-koshou", kanji: "故", reading: "こ", meaning: "reason / breakdown", compounds: ["故障"], category: "Problems", week: 11 },
  { id: "k-shou", kanji: "障", reading: "しょう", meaning: "obstacle", compounds: ["故障"], category: "Problems", week: 11 },
  { id: "k-suu", kanji: "数", reading: "すう", meaning: "number / count", compounds: ["数量"], category: "Quantities", week: 15 },
  { id: "k-ryou2", kanji: "量", reading: "りょう", meaning: "amount / quantity", compounds: ["数量", "分量"], category: "Quantities", week: 15 },
];

export const kanjiTotalTarget = 1000; // Source: Part 9 — 700-1,000 recognised in business compounds
export const kanjiWeeklyTarget = { min: 12, max: 16 }; // Source: Part 9

export function kanjiCategories() {
  return Array.from(new Set(kanjiItems.map((k) => k.category))).sort();
}
