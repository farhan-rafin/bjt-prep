// PRACTICE reading passages — generated from curriculum vocabulary/business situations (Part 94 allows this).
// Not official BJT material.
export interface ReadingPassage {
  id: string;
  category: string;
  title: string;
  text: string;
  textReading: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export const readingPassages: ReadingPassage[] = [
  {
    id: "rp1", category: "Notice", title: "会議室変更のお知らせ",
    text: "本日15時からの会議は、3階の第一会議室から4階の第二会議室に変更になりました。資料は各自ご持参ください。",
    textReading: "ほんじつじゅうごじからのかいぎは、さんかいのだいいちかいぎしつからよんかいのだいにかいぎしつにへんこうになりました。しりょうはかくじごじさんください。",
    question: "会議は何階の会議室で行われますか。",
    options: ["3階", "4階", "5階", "2階"],
    correctIndex: 1,
  },
  {
    id: "rp2", category: "Email", title: "納品遅延のご連絡",
    text: "いつもお世話になっております。ご注文いただいた商品につきまして、在庫不足のため納品が3日ほど遅れる見込みです。ご迷惑をおかけし、誠に申し訳ございません。",
    textReading: "いつもおせわになっております。ごちゅうもんいただいたしょうひんにつきまして、ざいこぶそくのためのうひんがみっかほどおくれるみこみです。ごめいわくをおかけし、まことにもうしわけございません。",
    question: "このメールの主な目的は何ですか。",
    options: ["新商品の案内", "納品遅延の謝罪連絡", "請求書の送付", "会議の招集"],
    correctIndex: 1,
  },
  {
    id: "rp3", category: "Schedule", title: "出張スケジュール",
    text: "出発：月曜日 9:00 東京駅 ／ 到着：月曜日 12:30 大阪駅 ／ 帰社予定：水曜日 18:00",
    textReading: "しゅっぱつ：げつようび くじ とうきょうえき／とうちゃく：げつようび じゅうにじさんじゅっぷん おおさかえき／きしゃよてい：すいようび じゅうはちじ",
    question: "大阪駅に到着するのは何時ですか。",
    options: ["9:00", "12:30", "18:00", "水曜日"],
    correctIndex: 1,
  },
  {
    id: "rp4", category: "Notice", title: "休暇届の提出について",
    text: "休暇を取得する場合は、休暇希望日の1週間前までに休暇届を課長に提出してください。当日の申請は原則として認められません。",
    textReading: "きゅうかをしゅとくするばあいは、きゅうかきぼうびのいっしゅうかんまえまでにきゅうかとどけをかちょうにていしゅつしてください。とうじつのしんせいはげんそくとしてみとめられません。",
    question: "休暇届はいつまでに提出する必要がありますか。",
    options: ["当日", "3日前", "1週間前", "1か月前"],
    correctIndex: 2,
  },
];
