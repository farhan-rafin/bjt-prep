// PRACTICE reading passages — generated from curriculum vocabulary/business situations (Part 94 allows this).
// Not official BJT material.
export interface ReadingPassage {
  id: string;
  category: string;
  title: string;
  text: string;
  textReading: string;
  textMeaning: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export const readingPassages: ReadingPassage[] = [
  {
    id: "rp1", category: "Notice", title: "会議室変更のお知らせ",
    text: "本日15時からの会議は、3階の第一会議室から4階の第二会議室に変更になりました。資料は各自ご持参ください。",
    textReading: "ほんじつじゅうごじからのかいぎは、さんかいのだいいちかいぎしつからよんかいのだいにかいぎしつにへんこうになりました。しりょうはかくじごじさんください。",
    textMeaning: "Today's 3pm meeting has been moved from Meeting Room 1 on the 3rd floor to Meeting Room 2 on the 4th floor. Please bring your own materials.",
    question: "会議は何階の会議室で行われますか。",
    options: ["3階", "4階", "5階", "2階"],
    correctIndex: 1,
  },
  {
    id: "rp2", category: "Email", title: "納品遅延のご連絡",
    text: "いつもお世話になっております。ご注文いただいた商品につきまして、在庫不足のため納品が3日ほど遅れる見込みです。ご迷惑をおかけし、誠に申し訳ございません。",
    textReading: "いつもおせわになっております。ごちゅうもんいただいたしょうひんにつきまして、ざいこぶそくのためのうひんがみっかほどおくれるみこみです。ごめいわくをおかけし、まことにもうしわけございません。",
    textMeaning: "Thank you for your continued support. Regarding the product you ordered, delivery is expected to be delayed by about 3 days due to a stock shortage. We sincerely apologise for the inconvenience.",
    question: "このメールの主な目的は何ですか。",
    options: ["新商品の案内", "納品遅延の謝罪連絡", "請求書の送付", "会議の招集"],
    correctIndex: 1,
  },
  {
    id: "rp3", category: "Schedule", title: "出張スケジュール",
    text: "出発：月曜日 9:00 東京駅 ／ 到着：月曜日 12:30 大阪駅 ／ 帰社予定：水曜日 18:00",
    textReading: "しゅっぱつ：げつようび くじ とうきょうえき／とうちゃく：げつようび じゅうにじさんじゅっぷん おおさかえき／きしゃよてい：すいようび じゅうはちじ",
    textMeaning: "Departure: Monday 9:00, Tokyo Station / Arrival: Monday 12:30, Osaka Station / Expected return to office: Wednesday 18:00.",
    question: "大阪駅に到着するのは何時ですか。",
    options: ["9:00", "12:30", "18:00", "水曜日"],
    correctIndex: 1,
  },
  {
    id: "rp4", category: "Notice", title: "休暇届の提出について",
    text: "休暇を取得する場合は、休暇希望日の1週間前までに休暇届を課長に提出してください。当日の申請は原則として認められません。",
    textReading: "きゅうかをしゅとくするばあいは、きゅうかきぼうびのいっしゅうかんまえまでにきゅうかとどけをかちょうにていしゅつしてください。とうじつのしんせいはげんそくとしてみとめられません。",
    textMeaning: "If you wish to take leave, please submit a leave request form to your section chief at least one week before your desired leave date. Same-day requests are not accepted in principle.",
    question: "休暇届はいつまでに提出する必要がありますか。",
    options: ["当日", "3日前", "1週間前", "1か月前"],
    correctIndex: 2,
  },
  {
    id: "rp5", category: "Notice", title: "エレベーター点検のお知らせ",
    text: "明日9時から12時まで、エレベーターの定期点検を行います。点検中は階段をご利用ください。ご不便をおかけしますが、よろしくお願いいたします。",
    textReading: "あしたくじからじゅうにじまで、エレベーターのていきてんけんをおこないます。てんけんちゅうはかいだんをごりようください。ごふべんをおかけしますが、よろしくおねがいいたします。",
    textMeaning: "Tomorrow from 9:00 to 12:00, we will carry out regular elevator inspection. Please use the stairs during the inspection. We apologise for the inconvenience and appreciate your understanding.",
    question: "点検中、社員はどうすればいいですか。",
    options: ["エレベーターで待つ", "階段を利用する", "会社を休む", "別の建物へ行く"],
    correctIndex: 1,
  },
  {
    id: "rp6", category: "Email", title: "会議日程変更のお願い",
    text: "来週水曜日に予定しておりました打ち合わせですが、急用のため木曜日の同じ時間に変更していただけないでしょうか。ご都合はいかがでしょうか。",
    textReading: "らいしゅうすいようびによていしておりましたうちあわせですが、きゅうようのためもくようびのおなじじかんにへんこうしていただけないでしょうか。ごつごうはいかがでしょうか。",
    textMeaning: "Regarding the meeting scheduled for next Wednesday — due to an urgent matter, could we change it to the same time on Thursday? Would that be convenient for you?",
    question: "このメールで何をお願いしていますか。",
    options: ["会議室の予約", "会議日程の変更", "資料の送付", "出席者の追加"],
    correctIndex: 1,
  },
  {
    id: "rp7", category: "Notice", title: "価格改定のお知らせ",
    text: "原材料費の高騰に伴い、来月1日より一部商品の価格を改定させていただきます。詳細は同封の価格表をご確認ください。",
    textReading: "げんざいりょうひのこうとうにともない、らいげつついたちよりいちぶしょうひんのかかくをかいていさせていただきます。しょうさいはどうふうのかかくひょうをごかくにんください。",
    textMeaning: "Due to rising raw material costs, we will be revising the prices of some products starting the 1st of next month. Please check the enclosed price list for details.",
    question: "価格改定はいつから始まりますか。",
    options: ["今月1日", "来月1日", "来月末", "今年末"],
    correctIndex: 1,
  },
  {
    id: "rp8", category: "Schedule", title: "研修スケジュール",
    text: "新入社員研修：4月1日〜4月5日 9:30〜17:00 ／ 会場：本社3階研修室 ／ 昼休み：12:00〜13:00",
    textReading: "しんにゅうしゃいんけんしゅう：しがつついたちからしがついつか くじさんじゅっぷんからじゅうしちじ／かいじょう：ほんしゃさんかいけんしゅうしつ／ひるやすみ：じゅうにじからじゅうさんじ",
    textMeaning: "New employee training: April 1–5, 9:30–17:00 / Venue: Head office 3rd floor training room / Lunch break: 12:00–13:00.",
    question: "研修の会場はどこですか。",
    options: ["本社1階", "本社3階", "支社2階", "貸し会議室"],
    correctIndex: 1,
  },
];
