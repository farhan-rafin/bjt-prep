// PRACTICE — 資料聴読解 (Part II question type 5, 10 questions on the real exam).
// You read a document/table, then hear a spoken constraint that filters it. The answer is never
// readable from the table alone and never audible from the audio alone — you must combine them.
// Audio plays via the Web Speech API from `audioClue`. Not official BJT material.

export interface CombinedItem {
  id: string;
  title: string;
  titleReading: string;
  titleMeaning: string;
  tableHeaders: string[];
  tableRows: string[][];
  audioClue: string;
  audioClueReading: string;
  audioClueMeaning: string;
  question: string;
  questionReading: string;
  questionMeaning: string;
  options: string[];
  optionMeanings: string[];
  correctIndex: number;
  explanation: string;
}

export const combinedItems: CombinedItem[] = [
  {
    id: "ci1",
    title: "会議室予約表", titleReading: "かいぎしつよやくひょう", titleMeaning: "Meeting room booking chart",
    tableHeaders: ["部屋", "収容人数", "9:00-11:00", "13:00-15:00", "15:00-17:00"],
    tableRows: [
      ["第一会議室", "10名", "空き", "使用中", "空き"],
      ["第二会議室", "6名", "使用中", "空き", "空き"],
      ["第三会議室", "20名", "空き", "空き", "使用中"],
    ],
    audioClue: "本日の会議は8名参加予定ですが、午後の会議室で、13時から15時に空いている部屋を予約してください。",
    audioClueReading: "ほんじつのかいぎははちめいさんかよていですが、ごごのかいぎしつで、じゅうさんじからじゅうごじにあいているへやをよやくしてください。",
    audioClueMeaning: "Today's meeting has 8 attendees planned. Please book a room that's free from 13:00-15:00 in the afternoon.",
    question: "8名で13時から15時に使える会議室はどこですか。",
    questionReading: "はちめいでじゅうさんじからじゅうごじにつかえるかいぎしつはどこですか。",
    questionMeaning: "Which meeting room can be used by 8 people from 13:00 to 15:00?",
    options: ["第一会議室", "第二会議室", "第三会議室", "空いている部屋はない"],
    optionMeanings: ["Meeting Room 1", "Meeting Room 2", "Meeting Room 3", "No room is free"],
    correctIndex: 2,
    explanation: "You need a room free at 13:00-15:00 AND seating at least 8. 第一会議室 is 使用中 at that time — excluded. 第二会議室 is free then but seats only 6 — too small. 第三会議室 is free and seats 20. The audio supplies two filters (time and headcount) and the table supplies the data; neither alone gives the answer.",
  },
  {
    id: "ci2",
    title: "出張旅費規程（抜粋）", titleReading: "しゅっちょうりょひきてい（ばっすい）", titleMeaning: "Business travel expense rules (extract)",
    tableHeaders: ["区分", "国内日帰り", "国内宿泊", "海外出張"],
    tableRows: [
      ["交通費", "実費", "実費", "実費"],
      ["日当", "2,000円", "3,000円", "5,000円"],
      ["宿泊費上限", "—", "10,000円", "15,000円"],
    ],
    audioClue: "来週、大阪へ日帰りで出張しますが、急きょ1泊することになりました。",
    audioClueReading: "らいしゅう、おおさかへひがえりでしゅっちょうしますが、きゅうきょいっぱくすることになりました。",
    audioClueMeaning: "Next week I have a same-day business trip to Osaka, but it suddenly turned into an overnight stay.",
    question: "この場合、日当はいくらになりますか。",
    questionReading: "このばあい、にっとうはいくらになりますか。",
    questionMeaning: "In this case, what is the daily allowance?",
    options: ["2,000円", "3,000円", "5,000円", "10,000円"],
    optionMeanings: ["2,000 yen", "3,000 yen", "5,000 yen", "10,000 yen"],
    correctIndex: 1,
    explanation: "急きょ ('suddenly') updates the trip from 日帰り to 国内宿泊, so the overnight per-diem of 3,000円 applies rather than the day-trip rate. When the audio revises the situation, the revised category governs — reading the table against the ORIGINAL plan is the trap.",
  },
  {
    id: "ci3",
    title: "新幹線時刻表（東京発・大阪行）", titleReading: "しんかんせんじこくひょう（とうきょうはつ・おおさかゆき）", titleMeaning: "Bullet train timetable (Tokyo to Osaka)",
    tableHeaders: ["列車", "東京発", "大阪着", "座席"],
    tableRows: [
      ["のぞみ21号", "7:00", "9:30", "満席"],
      ["のぞみ25号", "8:00", "10:30", "空席あり"],
      ["ひかり509号", "8:30", "11:40", "空席あり"],
      ["のぞみ33号", "9:00", "11:30", "空席あり"],
    ],
    audioClue: "大阪支店での打ち合わせは11時からです。10時半までには着いておきたいですね。",
    audioClueReading: "おおさかしてんでのうちあわせはじゅういちじからです。じゅうじはんまでにはついておきたいですね。",
    audioClueMeaning: "The meeting at the Osaka branch starts at 11. I'd like to arrive by 10:30.",
    question: "どの列車に乗るべきですか。",
    questionReading: "どのれっしゃにのるべきですか。",
    questionMeaning: "Which train should you take?",
    options: ["のぞみ21号", "のぞみ25号", "ひかり509号", "のぞみ33号"],
    optionMeanings: ["Nozomi 21", "Nozomi 25", "Hikari 509", "Nozomi 33"],
    correctIndex: 1,
    explanation: "Two constraints: arrive by 10:30, and a seat must be available. のぞみ21号 arrives 9:30 but is 満席 (fully booked). のぞみ25号 arrives exactly 10:30 with seats — it works. ひかり509号 (11:40) and のぞみ33号 (11:30) both arrive too late. Note that 満席 alone eliminates the otherwise-best option.",
  },
  {
    id: "ci4",
    title: "配送料金表", titleReading: "はいそうりょうきんひょう", titleMeaning: "Shipping fee table",
    tableHeaders: ["重量", "関東", "関西", "九州"],
    tableRows: [
      ["〜5kg", "800円", "1,000円", "1,300円"],
      ["〜10kg", "1,200円", "1,500円", "1,900円"],
      ["〜20kg", "1,800円", "2,200円", "2,800円"],
    ],
    audioClue: "福岡のお客様に、12キロの荷物をお送りしたいのですが、送料はいくらになりますか。",
    audioClueReading: "ふくおかのおきゃくさまに、じゅうにキロのにもつをおおくりしたいのですが、そうりょうはいくらになりますか。",
    audioClueMeaning: "I'd like to send a 12kg package to a customer in Fukuoka — how much is the shipping?",
    question: "送料はいくらですか。",
    questionReading: "そうりょうはいくらですか。",
    questionMeaning: "What is the shipping fee?",
    options: ["1,900円", "2,200円", "2,800円", "1,300円"],
    optionMeanings: ["1,900 yen", "2,200 yen", "2,800 yen", "1,300 yen"],
    correctIndex: 2,
    explanation: "Fukuoka is in 九州 — the audio names a city, not a region, so you must know the mapping. 12kg exceeds the 〜10kg band and falls in 〜20kg. 九州 × 〜20kg = 2,800円. Picking 1,900円 means you used the wrong weight band; 2,200円 means you used 関西.",
  },
  {
    id: "ci5",
    title: "社内研修一覧", titleReading: "しゃないけんしゅういちらん", titleMeaning: "In-house training list",
    tableHeaders: ["研修名", "対象", "日程", "定員"],
    tableRows: [
      ["ビジネスマナー基礎", "新入社員", "4月10日", "30名"],
      ["プレゼン実践", "入社2年目以上", "4月17日", "20名"],
      ["管理職研修", "課長以上", "4月24日", "15名"],
      ["英語研修", "全社員", "5月8日", "40名"],
    ],
    audioClue: "私は入社3年目の一般社員です。4月中に受けられる研修に申し込みたいのですが。",
    audioClueReading: "わたしはにゅうしゃさんねんめのいっぱんしゃいんです。しがつちゅうにうけられるけんしゅうにもうしこみたいのですが。",
    audioClueMeaning: "I'm a general employee in my third year. I'd like to apply for training I can take during April.",
    question: "この人が申し込める研修はどれですか。",
    questionReading: "このひとがもうしこめるけんしゅうはどれですか。",
    questionMeaning: "Which training can this person apply for?",
    options: ["ビジネスマナー基礎", "プレゼン実践", "管理職研修", "英語研修"],
    optionMeanings: ["Business Manners Basics", "Presentation Practice", "Management Training", "English Training"],
    correctIndex: 1,
    explanation: "Three filters stack: third-year (so not 新入社員), 一般社員 (so not 課長以上), and April only (so not the May English course). Only プレゼン実践 survives all three. 英語研修 is open to everyone and is the tempting wrong answer until you re-check the date.",
  },
  {
    id: "ci6",
    title: "コピー機利用料金", titleReading: "コピーきりようりょうきん", titleMeaning: "Copier usage charges",
    tableHeaders: ["枚数", "白黒", "カラー"],
    tableRows: [
      ["1〜100枚", "10円", "40円"],
      ["101〜500枚", "8円", "35円"],
      ["501枚〜", "5円", "30円"],
    ],
    audioClue: "会議用の資料を、カラーで300枚印刷してください。",
    audioClueReading: "かいぎようのしりょうを、カラーでさんびゃくまいいんさつしてください。",
    audioClueMeaning: "Please print 300 copies of the meeting materials in colour.",
    question: "1枚あたりの料金はいくらですか。",
    questionReading: "いちまいあたりのりょうきんはいくらですか。",
    questionMeaning: "What is the per-sheet charge?",
    options: ["40円", "35円", "30円", "8円"],
    optionMeanings: ["40 yen", "35 yen", "30 yen", "8 yen"],
    correctIndex: 1,
    explanation: "300 sheets sits in the 101〜500 band, and the audio specifies カラー. That gives 35円. The 8円 option is the same band read off the 白黒 column — the exam always includes the right row read from the wrong column.",
  },
  {
    id: "ci7",
    title: "展示会ブース料金", titleReading: "てんじかいブースりょうきん", titleMeaning: "Trade show booth pricing",
    tableHeaders: ["プラン", "広さ", "料金", "電源"],
    tableRows: [
      ["スタンダード", "9㎡", "150,000円", "なし"],
      ["デラックス", "18㎡", "280,000円", "あり"],
      ["プレミアム", "27㎡", "400,000円", "あり"],
    ],
    audioClue: "予算は30万円以内です。デモ機を使うので電源は必ず必要です。できるだけ広いところがいいですね。",
    audioClueReading: "よさんはさんじゅうまんえんいないです。デモきをつかうのででんげんはかならずひつようです。できるだけひろいところがいいですね。",
    audioClueMeaning: "The budget is within 300,000 yen. We're using a demo machine so power is essential. As large as possible would be good.",
    question: "どのプランを選ぶべきですか。",
    questionReading: "どのプランをえらぶべきですか。",
    questionMeaning: "Which plan should be chosen?",
    options: ["スタンダード", "デラックス", "プレミアム", "条件に合うプランはない"],
    optionMeanings: ["Standard", "Deluxe", "Premium", "No plan meets the conditions"],
    correctIndex: 1,
    explanation: "Budget ≤300,000 rules out プレミアム (400,000). Power required rules out スタンダード. デラックス satisfies both, and 'as large as possible' is a preference that only matters once the hard constraints are applied. Handle absolute conditions first, preferences last.",
  },
  {
    id: "ci8",
    title: "配達希望時間帯", titleReading: "はいたつきぼうじかんたい", titleMeaning: "Preferred delivery time slots",
    tableHeaders: ["時間帯", "月-金", "土", "日・祝"],
    tableRows: [
      ["午前中", "可", "可", "可"],
      ["14時-16時", "可", "可", "不可"],
      ["16時-18時", "可", "不可", "不可"],
      ["18時-20時", "可", "可", "可"],
    ],
    audioClue: "日曜日に受け取りたいのですが、午前中は出かけているので、夕方以降でお願いします。",
    audioClueReading: "にちようびにうけとりたいのですが、ごぜんちゅうはでかけているので、ゆうがたいこうでおねがいします。",
    audioClueMeaning: "I'd like to receive it on Sunday, but I'm out in the morning, so please make it evening or later.",
    question: "配達できる時間帯はどれですか。",
    questionReading: "はいたつできるじかんたいはどれですか。",
    questionMeaning: "Which delivery slot is possible?",
    options: ["午前中", "14時-16時", "16時-18時", "18時-20時"],
    optionMeanings: ["Morning", "14:00-16:00", "16:00-18:00", "18:00-20:00"],
    correctIndex: 3,
    explanation: "Sunday rules out 14時-16時 and 16時-18時 (both 不可). Morning is available but the speaker is out. That leaves 18時-20時, which is 可 on Sundays and matches 夕方以降. Two of the three filters come from the audio, only one from the table.",
  },
  {
    id: "ci9",
    title: "宿泊プラン比較", titleReading: "しゅくはくプランひかく", titleMeaning: "Accommodation plan comparison",
    tableHeaders: ["プラン", "料金/泊", "朝食", "キャンセル"],
    tableRows: [
      ["早割プラン", "8,000円", "なし", "不可"],
      ["スタンダード", "10,000円", "あり", "前日まで可"],
      ["フレックス", "12,000円", "あり", "当日まで可"],
    ],
    audioClue: "出張の日程がまだ確定していないので、直前に変更できるプランがいいです。朝食も付けてください。",
    audioClueReading: "しゅっちょうのにっていがまだかくていしていないので、ちょくぜんにへんこうできるプランがいいです。ちょうしょくもつけてください。",
    audioClueMeaning: "The trip dates aren't confirmed yet, so I want a plan I can change at the last minute. Please include breakfast too.",
    question: "どのプランが適していますか。",
    questionReading: "どのプランがてきしていますか。",
    questionMeaning: "Which plan is suitable?",
    options: ["早割プラン", "スタンダード", "フレックス", "どれも適さない"],
    optionMeanings: ["Early-bird plan", "Standard", "Flex", "None is suitable"],
    correctIndex: 2,
    explanation: "直前に変更できる means cancellation must be possible right up to the day — only フレックス offers 当日まで可. スタンダード allows cancellation only up to the day BEFORE, which fails 直前. Cheapness is never mentioned as a requirement, so 早割 is irrelevant despite being the best price.",
  },
  {
    id: "ci10",
    title: "健康診断日程", titleReading: "けんこうしんだんにってい", titleMeaning: "Health check-up schedule",
    tableHeaders: ["日付", "対象部署", "時間", "残り枠"],
    tableRows: [
      ["6月3日", "営業部", "9:00-12:00", "0名"],
      ["6月4日", "総務部・経理部", "9:00-12:00", "5名"],
      ["6月5日", "営業部", "13:00-16:00", "8名"],
      ["6月6日", "全部署", "9:00-12:00", "2名"],
    ],
    audioClue: "営業部の田中です。午前中は客先訪問があるので、午後の枠で予約をお願いします。",
    audioClueReading: "えいぎょうぶのたなかです。ごぜんちゅうはきゃくさきほうもんがあるので、ごごのわくでよやくをおねがいします。",
    audioClueMeaning: "This is Tanaka from Sales. I have client visits in the morning, so please book me an afternoon slot.",
    question: "田中さんはいつ健康診断を受けますか。",
    questionReading: "たなかさんはいつけんこうしんだんをうけますか。",
    questionMeaning: "When will Tanaka have the health check-up?",
    options: ["6月3日", "6月4日", "6月5日", "6月6日"],
    optionMeanings: ["June 3", "June 4", "June 5", "June 6"],
    correctIndex: 2,
    explanation: "Three filters: Sales department, afternoon, and slots remaining. June 3 is Sales but has 0 remaining. June 4 is the wrong department. June 6 is open to all but is a morning slot. June 5 is Sales, afternoon, and has 8 places — the only row satisfying all three.",
  },
];
