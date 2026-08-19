// PRACTICE — 総合読解 (Part III question type 9, 10 questions on the real exam).
// The real section uses business texts of a few hundred characters with SEVERAL questions each,
// which tests scanning and time management rather than single-fact lookup. The short passages in
// reading-passages.ts stay for warm-up drills; these are the exam-length ones.
// Not official BJT material.

export interface PassageQuestion {
  id: string;
  question: string;
  questionReading: string;
  questionMeaning: string;
  options: string[];
  optionMeanings: string[];
  correctIndex: number;
  explanation: string;
}

export interface LongPassage {
  id: string;
  category: string;
  title: string;
  titleReading: string;
  titleMeaning: string;
  text: string;
  textReading: string;
  textMeaning: string;
  /** Rough reading time target in seconds, for the timed drill. */
  targetSeconds: number;
  questions: PassageQuestion[];
}

export const longPassages: LongPassage[] = [
  {
    id: "lp1", category: "社内通知",
    title: "オフィス移転に伴う業務対応について",
    titleReading: "オフィスいてんにともなうぎょうむたいおうについて",
    titleMeaning: "Handling operations during the office relocation",
    targetSeconds: 150,
    text: "社員各位\n\n先にお知らせしたとおり、本社は10月1日より新オフィスへ移転いたします。移転作業は9月28日から30日までの3日間で行います。この期間中、本社での通常業務は停止いたしますが、各支店は通常どおり営業しております。お客様からのお問い合わせは、期間中に限り大阪支店で一括して受け付けますので、名刺やウェブサイトの連絡先変更は移転完了後に順次進めてください。\n\nなお、私物の梱包は9月27日の終業時刻までに各自でお願いいたします。梱包用の段ボールは総務部にて配布しております。移転当日に残っていた私物については、責任を負いかねますのでご注意ください。\n\n新オフィスの座席表は9月20日に社内ポータルへ掲載予定です。部署ごとのレイアウトに変更がありますので、必ずご確認ください。",
    textReading: "しゃいんかくい\n\nさきにおしらせしたとおり、ほんしゃはじゅうがつついたちよりしんオフィスへいてんいたします。いてんさぎょうはくがつにじゅうはちにちからさんじゅうにちまでのみっかかんでおこないます。このきかんちゅう、ほんしゃでのつうじょうぎょうむはていしいたしますが、かくしてんはつうじょうどおりえいぎょうしております。おきゃくさまからのおといあわせは、きかんちゅうにかぎりおおさかしてんでいっかつしてうけつけますので、めいしやウェブサイトのれんらくさきへんこうはいてんかんりょうごにじゅんじすすめてください。\n\nなお、しぶつのこんぽうはくがつにじゅうななにちのしゅうぎょうじこくまでにかくじでおねがいいたします。こんぽうようのだんボールはそうむぶにてはいふしております。いてんとうじつにのこっていたしぶつについては、せきにんをおいかねますのでごちゅういください。\n\nしんオフィスのざせきひょうはくがつはつかにしゃないポータルへけいさいよていです。ぶしょごとのレイアウトにへんこうがありますので、かならずごかくにんください。",
    textMeaning: "To all staff\n\nAs previously announced, the head office will relocate to a new office from 1 October. The move itself will take place over three days, 28–30 September. During this period normal operations at head office will stop, but all branches will operate as usual. Customer inquiries will be handled centrally by the Osaka branch for that period only, so please update contact details on business cards and the website gradually after the move is complete.\n\nPlease pack your personal belongings yourself by close of business on 27 September. Packing boxes are available from General Affairs. Please note that we cannot take responsibility for personal items left behind on moving day.\n\nThe seating plan for the new office will be posted on the internal portal on 20 September. Layouts have changed by department, so please be sure to check it.",
    questions: [
      {
        id: "lp1-q1",
        question: "移転作業中、お客様からの問い合わせはどこが対応しますか。",
        questionReading: "いてんさぎょうちゅう、おきゃくさまからのといあわせはどこがたいおうしますか。",
        questionMeaning: "Who handles customer inquiries during the move?",
        options: ["本社", "大阪支店", "総務部", "すべての支店"],
        optionMeanings: ["Head office", "The Osaka branch", "General Affairs", "All branches"],
        correctIndex: 1,
        explanation: "期間中に限り大阪支店で一括して受け付けます — Osaka handles them, and only for that period. 'All branches' is wrong because the text says branches operate normally, not that they take over inquiries.",
      },
      {
        id: "lp1-q2",
        question: "私物の梱包はいつまでに終える必要がありますか。",
        questionReading: "しぶつのこんぽうはいつまでにおえるひつようがありますか。",
        questionMeaning: "By when must personal belongings be packed?",
        options: ["9月20日", "9月27日", "9月28日", "10月1日"],
        optionMeanings: ["20 September", "27 September", "28 September", "1 October"],
        correctIndex: 1,
        explanation: "9月27日の終業時刻までに — the day before the move begins on the 28th. Four dates appear in this passage, each attached to a different action; the question targets the one that's an obligation on the reader.",
      },
      {
        id: "lp1-q3",
        question: "この通知で社員に必ず確認するよう求めているものは何ですか。",
        questionReading: "このつうちでしゃいんにかならずかくにんするようもとめているものはなんですか。",
        questionMeaning: "What does the notice tell staff they must check?",
        options: ["新しい座席表", "名刺のデザイン", "大阪支店の営業時間", "段ボールの数"],
        optionMeanings: ["The new seating plan", "Business card design", "Osaka branch hours", "The number of boxes"],
        correctIndex: 0,
        explanation: "必ずご確認ください attaches specifically to 座席表 in the final paragraph. Scanning for the imperative 必ず is faster than reading the whole passage — question-first reading pays off directly here.",
      },
    ],
  },
  {
    id: "lp2", category: "ビジネス文書",
    title: "新価格体系導入のご案内",
    titleReading: "しんかかくたいけいどうにゅうのごあんない",
    titleMeaning: "Introduction of the new pricing structure",
    targetSeconds: 160,
    text: "お取引先各位\n\n平素より格別のお引き立てを賜り、厚く御礼申し上げます。\n\nさて、原材料価格および物流費の高騰が続いており、弊社といたしましても企業努力による吸収を続けてまいりましたが、現行価格の維持が困難な状況となりました。つきましては、誠に恐縮ではございますが、来年1月1日出荷分より、一部製品の価格を改定させていただきたく存じます。\n\n改定率は製品群により異なり、平均でおよそ8パーセントの引き上げとなります。ただし、長期契約をお結びいただいているお客様につきましては、契約期間満了まで現行価格を適用いたします。\n\n詳細な新価格表は11月中旬に担当営業よりお届けいたします。ご不明な点がございましたら、担当者までお問い合わせくださいますようお願い申し上げます。",
    textReading: "おとりひきさきかくい\n\nへいそよりかくべつのおひきたてをたまわり、あつくおれいもうしあげます。\n\nさて、げんざいりょうかかくおよびぶつりゅうひのこうとうがつづいており、へいしゃといたしましてもきぎょうどりょくによるきゅうしゅうをつづけてまいりましたが、げんこうかかくのいじがこんなんなじょうきょうとなりました。つきましては、まことにきょうしゅくではございますが、らいねんいちがつついたちしゅっかぶんより、いちぶせいひんのかかくをかいていさせていただきたくぞんじます。\n\nかいていりつはせいひんぐんによりことなり、へいきんでおよそはちパーセントのひきあげとなります。ただし、ちょうきけいやくをおむすびいただいているおきゃくさまにつきましては、けいやくきかんまんりょうまでげんこうかかくをてきよういたします。\n\nしょうさいなしんかかくひょうはじゅういちがつちゅうじゅんにたんとうえいぎょうよりおとどけいたします。ごふめいなてんがございましたら、たんとうしゃまでおといあわせくださいますようおねがいもうしあげます。",
    textMeaning: "To our valued business partners\n\nWe thank you sincerely for your continued patronage.\n\nRaw material prices and logistics costs have continued to rise. While we have absorbed these through internal efforts, maintaining current prices has become difficult. We therefore regret to inform you that we intend to revise the prices of some products, effective for shipments from 1 January next year.\n\nThe rate of revision varies by product group, averaging approximately an 8 percent increase. However, for customers with long-term contracts, current prices will apply until the contract expires.\n\nA detailed new price list will be delivered by your sales representative in mid-November. Please contact your representative with any questions.",
    questions: [
      {
        id: "lp2-q1",
        question: "価格改定はいつから適用されますか。",
        questionReading: "かかくかいていはいつからてきようされますか。",
        questionMeaning: "From when does the price revision apply?",
        options: ["11月中旬", "来年1月1日出荷分から", "契約満了時", "通知を受け取った日から"],
        optionMeanings: ["Mid-November", "Shipments from 1 January next year", "At contract expiry", "From receipt of this notice"],
        correctIndex: 1,
        explanation: "来年1月1日出荷分より — note 出荷分, meaning it's keyed to the shipping date, not the order date. Mid-November is when the price LIST arrives, a separate event.",
      },
      {
        id: "lp2-q2",
        question: "長期契約を結んでいる顧客はどうなりますか。",
        questionReading: "ちょうきけいやくをむすんでいるこきゃくはどうなりますか。",
        questionMeaning: "What happens for customers on long-term contracts?",
        options: [
          "契約が終わるまで今の価格のまま",
          "すぐに新価格が適用される",
          "8パーセント以上値上げされる",
          "契約を結び直す必要がある",
        ],
        optionMeanings: [
          "Current prices until the contract ends",
          "New prices apply immediately",
          "They face more than 8 percent",
          "They must renew the contract",
        ],
        correctIndex: 0,
        explanation: "ただし marks the exception, and 契約期間満了まで現行価格を適用 states it plainly. In formal business writing the exception almost always follows ただし or なお — locate those markers first.",
      },
      {
        id: "lp2-q3",
        question: "この文書が価格改定の理由として挙げているものはどれですか。",
        questionReading: "このぶんしょがかかくかいていのりゆうとしてあげているものはどれですか。",
        questionMeaning: "What reason does the document give for the revision?",
        options: ["原材料と物流費の高騰", "売上の減少", "円高の影響", "新製品の開発費"],
        optionMeanings: ["Rising raw material and logistics costs", "Falling sales", "A strong yen", "New product development costs"],
        correctIndex: 0,
        explanation: "原材料価格および物流費の高騰 is given directly. The other options are plausible business reasons that the text never mentions — 総合読解 distractors are frequently true-sounding statements simply absent from the passage.",
      },
    ],
  },
  {
    id: "lp3", category: "報告書",
    title: "顧客満足度調査の結果報告",
    titleReading: "こきゃくまんぞくどちょうさのけっかほうこく",
    titleMeaning: "Customer satisfaction survey results",
    targetSeconds: 150,
    text: "今年度の顧客満足度調査の結果をご報告いたします。調査は6月から7月にかけて実施し、有効回答数は1,240件でした。前年度の980件と比べ、回答数は大きく増加しております。\n\n総合満足度は5点満点中4.1点となり、前年度の3.8点から改善いたしました。項目別に見ますと、「製品の品質」が4.5点と最も高く、次いで「担当者の対応」が4.3点でした。一方、「納期の正確さ」は3.2点にとどまり、唯一前年度を下回る結果となっております。\n\n自由記述欄では、納期に関する指摘が全体の約3割を占めました。特に、遅延が生じた際の連絡が遅いという声が目立ちます。品質そのものへの不満はほとんど見られませんでした。\n\n以上を踏まえ、来年度は納期管理体制の見直しを最優先課題として取り組む方針です。",
    textReading: "こんねんどのこきゃくまんぞくどちょうさのけっかをごほうこくいたします。ちょうさはろくがつからしちがつにかけてじっしし、ゆうこうかいとうすうはせんにひゃくよんじゅっけんでした。ぜんねんどのきゅうひゃくはちじゅっけんとくらべ、かいとうすうはおおきくぞうかしております。\n\nそうごうまんぞくどはごてんまんてんちゅうよんてんいちてんとなり、ぜんねんどのさんてんはちてんからかいぜんいたしました。こうもくべつにみますと、「せいひんのひんしつ」がよんてんごてんともっともたかく、ついで「たんとうしゃのたいおう」がよんてんさんてんでした。いっぽう、「のうきのせいかくさ」はさんてんにてんにとどまり、ゆいいつぜんねんどをしたまわるけっかとなっております。\n\nじゆうきじゅつらんでは、のうきにかんするしてきがぜんたいのやくさんわりをしめました。とくに、ちえんがしょうじたさいのれんらくがおそいというこえがめだちます。ひんしつそのものへのふまんはほとんどみられませんでした。\n\nいじょうをふまえ、らいねんどはのうきかんりたいせいのみなおしをさいゆうせんかだいとしてとりくむほうしんです。",
    textMeaning: "Here are the results of this year's customer satisfaction survey. The survey ran from June to July, with 1,240 valid responses — a large increase on last year's 980.\n\nOverall satisfaction was 4.1 out of 5, improving on last year's 3.8. By category, 'product quality' scored highest at 4.5, followed by 'staff response' at 4.3. On the other hand, 'delivery accuracy' reached only 3.2, the only category to fall below last year.\n\nIn free-text comments, remarks about delivery accounted for around 30 percent of the total. Complaints about slow communication when delays occurred were especially noticeable. There was almost no dissatisfaction with quality itself.\n\nAccordingly, next year we plan to make reviewing delivery management our highest priority.",
    questions: [
      {
        id: "lp3-q1",
        question: "前年度より評価が下がった項目はどれですか。",
        questionReading: "ぜんねんどよりひょうかがさがったこうもくはどれですか。",
        questionMeaning: "Which category scored lower than last year?",
        options: ["製品の品質", "担当者の対応", "納期の正確さ", "総合満足度"],
        optionMeanings: ["Product quality", "Staff response", "Delivery accuracy", "Overall satisfaction"],
        correctIndex: 2,
        explanation: "唯一前年度を下回る — 唯一 ('the only one') marks 納期の正確さ unambiguously. Everything else improved, including the overall score, so scanning for 唯一 or 一方 finds the answer without reading every number.",
      },
      {
        id: "lp3-q2",
        question: "自由記述欄で最も多かった指摘は何についてですか。",
        questionReading: "じゆうきじゅつらんでもっともおおかったしてきはなにについてですか。",
        questionMeaning: "What did most free-text comments concern?",
        options: ["価格", "納期", "品質", "担当者の態度"],
        optionMeanings: ["Price", "Delivery", "Quality", "Staff attitude"],
        correctIndex: 1,
        explanation: "納期に関する指摘が全体の約3割 — the largest share. The passage explicitly says quality drew almost no complaints, which rules out that option even though quality scored highest.",
      },
      {
        id: "lp3-q3",
        question: "来年度の最優先課題は何ですか。",
        questionReading: "らいねんどのさいゆうせんかだいはなんですか。",
        questionMeaning: "What is next year's top priority?",
        options: ["回答数を増やすこと", "納期管理体制の見直し", "製品品質の向上", "担当者の研修"],
        optionMeanings: ["Increasing response numbers", "Reviewing delivery management", "Improving product quality", "Staff training"],
        correctIndex: 1,
        explanation: "The closing 以上を踏まえ ('in light of the above') always introduces the conclusion in a Japanese report — read that sentence first when the question asks about plans or priorities.",
      },
    ],
  },
  {
    id: "lp4", category: "メール",
    title: "展示会出展に関する社内連絡",
    titleReading: "てんじかいしゅってんにかんするしゃないれんらく",
    titleMeaning: "Internal message about exhibiting at a trade show",
    targetSeconds: 140,
    text: "営業部各位\n\nお疲れ様です。来月の産業展への出展について、決定事項を共有します。\n\n出展は11月12日から14日までの3日間、会場は東京ビッグサイトです。弊社ブースは西ホールの2階、小間番号はW-215となります。ブースの設営は前日11日の午後に行いますので、担当の3名は13時に現地集合でお願いします。\n\n会期中のシフトは、午前が佐藤・鈴木、午後が高橋・伊藤の2交代制とします。初日のみ、開会式があるため全員が9時に集合してください。2日目以降は各シフトの開始30分前で構いません。\n\n配布資料は500部用意しておりますが、昨年は2日目の午後に不足しました。今年は追加分を会場近くの営業所に保管しますので、残りが少なくなった時点で連絡してください。",
    textReading: "えいぎょうぶかくい\n\nおつかれさまです。らいげつのさんぎょうてんへのしゅってんについて、けっていじこうをきょうゆうします。\n\nしゅってんはじゅういちがつじゅうににちからじゅうよっかまでのみっかかん、かいじょうはとうきょうビッグサイトです。へいしゃブースはにしホールのにかい、こまばんごうはダブリューにひゃくじゅうごとなります。ブースのせつえいはぜんじつじゅういちにちのごごにおこないますので、たんとうのさんめいはじゅうさんじにげんちしゅうごうでおねがいします。\n\nかいきちゅうのシフトは、ごぜんがさとう・すずき、ごごがたかはし・いとうのにこうたいせいとします。しょにちのみ、かいかいしきがあるためぜんいんがくじにしゅうごうしてください。ふつかめいこうはかくシフトのかいしさんじゅっぷんまえでかまいません。\n\nはいふしりょうはごひゃくぶよういしておりますが、さくねんはふつかめのごごにふそくしました。ことしはついかぶんをかいじょうちかくのえいぎょうしょにほかんしますので、のこりがすくなくなったじてんでれんらくしてください。",
    textMeaning: "To the Sales Department\n\nHere are the confirmed details for next month's industry exhibition.\n\nWe exhibit for three days, 12–14 November, at Tokyo Big Sight. Our booth is on the 2nd floor of the West Hall, booth number W-215. Booth setup takes place on the afternoon of the 11th, the day before, so the three staff responsible should meet on site at 13:00.\n\nDuring the show we'll run two shifts: Sato and Suzuki in the morning, Takahashi and Ito in the afternoon. On the first day only, everyone should assemble at 9:00 because of the opening ceremony. From day two, 30 minutes before your shift starts is fine.\n\nWe have 500 handouts prepared, but last year we ran out on the afternoon of day two. This year extras will be stored at the sales office near the venue, so let us know when stock runs low.",
    questions: [
      {
        id: "lp4-q1",
        question: "設営担当者はいつ現地に集合しますか。",
        questionReading: "せつえいたんとうしゃはいつげんちにしゅうごうしますか。",
        questionMeaning: "When do the setup staff meet on site?",
        options: ["11月11日の13時", "11月12日の9時", "11月12日の13時", "11月14日の午後"],
        optionMeanings: ["13:00 on 11 November", "9:00 on 12 November", "13:00 on 12 November", "Afternoon of 14 November"],
        correctIndex: 0,
        explanation: "設営 happens 前日11日の午後, with a 13時 meeting time. The 9:00 on the 12th is the opening-day assembly for everyone — a different event, and the most attractive wrong answer.",
      },
      {
        id: "lp4-q2",
        question: "2日目に午後シフトの人は何時に集合すればいいですか。",
        questionReading: "ふつかめにごごシフトのひとはなんじにしゅうごうすればいいですか。",
        questionMeaning: "What time should afternoon-shift staff arrive on day two?",
        options: ["9時", "シフト開始の30分前", "13時", "全員一緒に朝集合"],
        optionMeanings: ["9:00", "30 minutes before their shift", "13:00", "Everyone together in the morning"],
        correctIndex: 1,
        explanation: "初日のみ applies the 9:00 rule to day one alone; 2日目以降 relaxes it to 30 minutes before each shift. The word のみ is doing all the work — miss it and you apply the 9:00 rule to every day.",
      },
      {
        id: "lp4-q3",
        question: "配布資料について、今年新たに決めたことは何ですか。",
        questionReading: "はいふしりょうについて、ことしあらたにきめたことはなんですか。",
        questionMeaning: "What is new this year regarding handouts?",
        options: [
          "追加分を近くの営業所に置いておく",
          "部数を1,000部に増やす",
          "配布をやめる",
          "2日目の午後だけ配る",
        ],
        optionMeanings: [
          "Keep extras at the nearby sales office",
          "Increase to 1,000 copies",
          "Stop distributing them",
          "Distribute only on day two afternoon",
        ],
        correctIndex: 0,
        explanation: "今年は追加分を…営業所に保管します is the new measure; the count stays at 500. The 1,000 option assumes the obvious fix to last year's shortage rather than the one the text actually describes.",
      },
    ],
  },
];

export function totalLongPassageQuestions() {
  return longPassages.reduce((n, p) => n + p.questions.length, 0);
}
