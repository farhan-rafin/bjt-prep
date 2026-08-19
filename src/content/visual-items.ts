// PRACTICE — 場面把握（画像あり） (Part II question type 4, 5 questions on the real exam).
// The real exam shows a sign, poster, floor guide or notice on screen alongside audio.
// Rather than ship image files, each visual here is described structurally and rendered as
// a styled notice in the browser — same reading task, no assets, and it stays legible in both themes.
// The answer must satisfy BOTH the visual and the audio. Not official BJT material.

export type VisualKind = "floorGuide" | "sign" | "poster" | "priceBoard" | "schedule";

export interface VisualRow {
  label: string;
  value: string;
}

export interface VisualItem {
  id: string;
  kind: VisualKind;
  /** Headline shown at the top of the rendered notice. */
  heading: string;
  headingReading: string;
  headingMeaning: string;
  rows: VisualRow[];
  /** Small print under the notice — this is where the exception that decides the answer usually hides. */
  footnote?: string;
  footnoteReading?: string;
  footnoteMeaning?: string;
  audioScript: string;
  audioReading: string;
  audioMeaning: string;
  question: string;
  questionReading: string;
  questionMeaning: string;
  options: string[];
  optionMeanings: string[];
  correctIndex: number;
  explanation: string;
}

export const visualKindLabel: Record<VisualKind, string> = {
  floorGuide: "フロア案内 — Floor guide",
  sign: "掲示 — Sign",
  poster: "ポスター — Poster",
  priceBoard: "料金表 — Price board",
  schedule: "時刻表 — Schedule",
};

export const visualItems: VisualItem[] = [
  {
    id: "vi1", kind: "floorGuide",
    heading: "本社ビル フロア案内", headingReading: "ほんしゃビル フロアあんない", headingMeaning: "Head office building floor guide",
    rows: [
      { label: "7階", value: "役員室・応接室" },
      { label: "5階", value: "営業部" },
      { label: "4階", value: "総務部・経理部" },
      { label: "3階", value: "大会議室" },
      { label: "1階", value: "受付・ロビー" },
    ],
    audioScript: "経理部の伊藤さんに書類をお渡ししたいのですが、何階に行けばよろしいでしょうか。",
    audioReading: "けいりぶのいとうさんにしょるいをおわたししたいのですが、なんかいにいけばよろしいでしょうか。",
    audioMeaning: "I'd like to hand documents to Ito from Accounting — which floor should I go to?",
    question: "何階に行けばいいですか。",
    questionReading: "なんかいにいけばいいですか。",
    questionMeaning: "Which floor should they go to?",
    options: ["3階", "4階", "5階", "7階"],
    optionMeanings: ["3rd floor", "4th floor", "5th floor", "7th floor"],
    correctIndex: 1,
    explanation: "経理部 shares the 4th floor with 総務部. The trap is 営業部 on 5 — a department name you hear far more often in business audio, so it pulls attention. Match the exact department named in the audio to the guide, not the most familiar one.",
  },
  {
    id: "vi2", kind: "sign",
    heading: "営業時間のご案内", headingReading: "えいぎょうじかんのごあんない", headingMeaning: "Business hours notice",
    rows: [
      { label: "平日", value: "9:00 - 19:00" },
      { label: "土曜", value: "10:00 - 17:00" },
      { label: "日曜・祝日", value: "休業" },
    ],
    footnote: "※ 第3土曜日は休業とさせていただきます。",
    footnoteReading: "※ だいさんどようびはきゅうぎょうとさせていただきます。",
    footnoteMeaning: "* We are closed on the third Saturday of each month.",
    audioScript: "今度の土曜日、ちょうど第3土曜日なんですが、窓口は開いていますか。",
    audioReading: "こんどのどようび、ちょうどだいさんどようびなんですが、まどぐちはあいていますか。",
    audioMeaning: "This coming Saturday happens to be the third Saturday — will the counter be open?",
    question: "その日、窓口は開いていますか。",
    questionReading: "そのひ、まどぐちはあいていますか。",
    questionMeaning: "Will the counter be open that day?",
    options: ["10時から17時まで開いている", "9時から19時まで開いている", "休業している", "午前中のみ開いている"],
    optionMeanings: ["Open 10:00-17:00", "Open 9:00-19:00", "Closed", "Open mornings only"],
    correctIndex: 2,
    explanation: "The main table says Saturdays are 10:00-17:00, but the footnote closes the third Saturday specifically — and the audio names exactly that day. Part II visuals almost always carry an exception in the small print; read the ※ line before answering.",
  },
  {
    id: "vi3", kind: "poster",
    heading: "ビジネス日本語セミナー", headingReading: "ビジネスにほんごセミナー", headingMeaning: "Business Japanese Seminar",
    rows: [
      { label: "日時", value: "7月20日（土）13:00-16:00" },
      { label: "会場", value: "市民会館 3階 講堂" },
      { label: "参加費", value: "一般 3,000円 / 学生 1,500円" },
      { label: "定員", value: "80名（要事前申込）" },
    ],
    footnote: "※ 当日申込は受け付けておりません。",
    footnoteReading: "※ とうじつもうしこみはうけつけておりません。",
    footnoteMeaning: "* Same-day registration is not accepted.",
    audioScript: "このセミナー、面白そうですね。当日会場に行って、直接申し込めばいいですか。学生なので1,500円ですよね。",
    audioReading: "このセミナー、おもしろそうですね。とうじつかいじょうにいって、ちょくせつもうしこめばいいですか。がくせいなのでせんごひゃくえんですよね。",
    audioMeaning: "This seminar looks interesting. Can I just go to the venue on the day and sign up directly? I'm a student, so it's 1,500 yen, right?",
    question: "この人の考えについて正しいものはどれですか。",
    questionReading: "このひとのかんがえについてただしいものはどれですか。",
    questionMeaning: "Which is correct about what this person thinks?",
    options: [
      "料金は正しいが、当日申込はできない",
      "料金も申込方法も正しい",
      "料金が間違っているが、当日申込はできる",
      "料金も申込方法も間違っている",
    ],
    optionMeanings: [
      "The price is right but same-day sign-up isn't possible",
      "Both price and method are correct",
      "The price is wrong but same-day sign-up works",
      "Both price and method are wrong",
    ],
    correctIndex: 0,
    explanation: "Two claims are made in the audio and you must judge each separately. Student price 1,500円 — correct per the poster. Same-day registration — ruled out by the footnote. Questions that bundle a right claim with a wrong one are common here; check every assertion rather than the first one.",
  },
  {
    id: "vi4", kind: "sign",
    heading: "エレベーター運転状況", headingReading: "エレベーターうんてんじょうきょう", headingMeaning: "Elevator operating status",
    rows: [
      { label: "1号機", value: "点検中（終日停止）" },
      { label: "2号機", value: "通常運転" },
      { label: "3号機", value: "5階以上のみ停止" },
    ],
    footnote: "※ お急ぎの方は非常階段をご利用ください。",
    footnoteReading: "※ おいそぎのかたはひじょうかいだんをごりようください。",
    footnoteMeaning: "* If you are in a hurry, please use the emergency stairs.",
    audioScript: "3階の大会議室まで上がりたいのですが、どのエレベーターを使えばいいですか。",
    audioReading: "さんかいのだいかいぎしつまであがりたいのですが、どのエレベーターをつかえばいいですか。",
    audioMeaning: "I want to go up to the large meeting room on the 3rd floor — which elevator should I use?",
    question: "使えるエレベーターはどれですか。",
    questionReading: "つかえるエレベーターはどれですか。",
    questionMeaning: "Which elevators can be used?",
    options: ["2号機のみ", "2号機と3号機", "3号機のみ", "すべて使えない"],
    optionMeanings: ["Only No. 2", "No. 2 and No. 3", "Only No. 3", "None available"],
    correctIndex: 1,
    explanation: "1号機 is out all day. 3号機 only stops from the 5th floor UP — the destination is the 3rd floor, so it still serves that stop. Both 2 and 3 work. Reading 5階以上のみ停止 as 'unavailable' rather than 'unavailable above 5' is the intended slip.",
  },
  {
    id: "vi5", kind: "priceBoard",
    heading: "会議室 利用料金", headingReading: "かいぎしつ りようりょうきん", headingMeaning: "Meeting room usage fees",
    rows: [
      { label: "A室（10名）", value: "1時間 2,000円" },
      { label: "B室（20名）", value: "1時間 3,500円" },
      { label: "C室（40名）", value: "1時間 6,000円" },
    ],
    footnote: "※ 3時間以上のご利用で20%割引。",
    footnoteReading: "※ さんじかんいじょうのごりようでにじゅっパーセントわりびき。",
    footnoteMeaning: "* 20% discount for bookings of 3 hours or more.",
    audioScript: "15名の研修で、4時間ほど使いたいのですが、料金はいくらになりますか。",
    audioReading: "じゅうごめいのけんしゅうで、よじかんほどつかいたいのですが、りょうきんはいくらになりますか。",
    audioMeaning: "For a training session with 15 people, we'd like to use it for about 4 hours — what's the cost?",
    question: "料金はいくらになりますか。",
    questionReading: "りょうきんはいくらになりますか。",
    questionMeaning: "How much will it cost?",
    options: ["11,200円", "14,000円", "8,000円", "19,200円"],
    optionMeanings: ["11,200 yen", "14,000 yen", "8,000 yen", "19,200 yen"],
    correctIndex: 0,
    explanation: "15 people won't fit in A室 (10), so B室 at 3,500/hr. Four hours = 14,000, and 4 hours triggers the 20% discount: 14,000 × 0.8 = 11,200. The 14,000 option is the undiscounted figure — the footnote is doing the real work again.",
  },
  {
    id: "vi6", kind: "schedule",
    heading: "送迎バス 時刻表（駅→工場）", headingReading: "そうげいバス じこくひょう（えき→こうじょう）", headingMeaning: "Shuttle bus timetable (station to factory)",
    rows: [
      { label: "便1", value: "7:30 発 / 8:00 着" },
      { label: "便2", value: "8:15 発 / 8:45 着" },
      { label: "便3", value: "9:00 発 / 9:30 着" },
      { label: "便4", value: "10:30 発 / 11:00 着" },
    ],
    footnote: "※ 便2は平日のみ運行。",
    footnoteReading: "※ びんには へいじつのみうんこう。",
    footnoteMeaning: "* Service 2 runs on weekdays only.",
    audioScript: "土曜日に工場を見学します。9時までに着いていないといけないのですが、どの便に乗ればいいでしょうか。",
    audioReading: "どようびにこうじょうをけんがくします。くじまでについていないといけないのですが、どのびんにのればいいでしょうか。",
    audioMeaning: "We're touring the factory on Saturday. We need to arrive by 9:00 — which service should we take?",
    question: "どの便に乗るべきですか。",
    questionReading: "どのびんにのるべきですか。",
    questionMeaning: "Which service should they take?",
    options: ["便1", "便2", "便3", "便4"],
    optionMeanings: ["Service 1", "Service 2", "Service 3", "Service 4"],
    correctIndex: 0,
    explanation: "Arrive by 9:00 leaves services 1 (08:00) and 2 (08:45). But it's Saturday and service 2 is weekdays only, so service 1 is the only option. Two filters — one from the audio's time constraint, one from the footnote's day restriction.",
  },
  {
    id: "vi7", kind: "sign",
    heading: "駐車場ご利用案内", headingReading: "ちゅうしゃじょうごりようあんない", headingMeaning: "Parking lot usage guide",
    rows: [
      { label: "最初の1時間", value: "無料" },
      { label: "以降30分ごと", value: "200円" },
      { label: "1日上限", value: "1,500円" },
    ],
    footnote: "※ 店舗で2,000円以上お買い上げの方は、2時間無料。",
    footnoteReading: "※ てんぽでにせんえんいじょうおかいあげのかたは、にじかんむりょう。",
    footnoteMeaning: "* Customers spending 2,000 yen or more in store get 2 hours free.",
    audioScript: "3時間停めました。店で3,000円買い物をしたのですが、駐車料金はいくらですか。",
    audioReading: "さんじかんとめました。みせでさんぜんえんかいものをしたのですが、ちゅうしゃりょうきんはいくらですか。",
    audioMeaning: "I parked for 3 hours. I spent 3,000 yen in the store — what's the parking fee?",
    question: "駐車料金はいくらですか。",
    questionReading: "ちゅうしゃりょうきんはいくらですか。",
    questionMeaning: "What is the parking fee?",
    options: ["400円", "800円", "1,200円", "0円"],
    optionMeanings: ["400 yen", "800 yen", "1,200 yen", "0 yen"],
    correctIndex: 0,
    explanation: "Spending 3,000円 clears the 2,000円 threshold, so 2 hours are free — that supersedes the standard 1 free hour rather than stacking with it. One chargeable hour remains: two 30-minute blocks at 200円 = 400円. Adding the free hour on top gives 200円; ignoring the footnote gives 800円.",
  },
  {
    id: "vi8", kind: "poster",
    heading: "社内表彰式のご案内", headingReading: "しゃないひょうしょうしきのごあんない", headingMeaning: "Internal awards ceremony notice",
    rows: [
      { label: "日時", value: "12月15日（金）17:30-19:00" },
      { label: "場所", value: "本社 3階 大会議室" },
      { label: "対象", value: "全社員（自由参加）" },
      { label: "服装", value: "スーツ着用" },
    ],
    footnote: "※ 懇親会は19:00より同会場にて。参加希望者は12月8日までに総務部へ。",
    footnoteReading: "※ こんしんかいはじゅうくじよりどうかいじょうにて。さんかきぼうしゃはじゅうにがつようかまでにそうむぶへ。",
    footnoteMeaning: "* The reception starts at 19:00 in the same venue. Those wishing to attend should notify General Affairs by 8 December.",
    audioScript: "表彰式のあとの懇親会にも出たいのですが、何か手続きは必要ですか。",
    audioReading: "ひょうしょうしきのあとのこんしんかいにもでたいのですが、なにかてつづきはひつようですか。",
    audioMeaning: "I'd like to attend the reception after the ceremony too — is any procedure required?",
    question: "この人は何をする必要がありますか。",
    questionReading: "このひとはなにをするひつようがありますか。",
    questionMeaning: "What does this person need to do?",
    options: [
      "12月8日までに総務部に申し出る",
      "12月15日に会場で受付をする",
      "何も必要ない、自由参加である",
      "上司の許可を取る",
    ],
    optionMeanings: [
      "Notify General Affairs by 8 December",
      "Register at the venue on 15 December",
      "Nothing — attendance is free",
      "Get their manager's permission",
    ],
    correctIndex: 0,
    explanation: "自由参加 in the main table applies to the CEREMONY, not the reception — the footnote adds a registration deadline for the reception specifically. Carrying a rule from one part of a notice to another is the misread being tested here.",
  },
];
