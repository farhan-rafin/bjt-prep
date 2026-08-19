// PRACTICE — 総合聴読解 (Part II question type 6, 10 questions on the real exam).
// A longer business document plus a longer spoken passage. The defining mechanic: the audio
// UPDATES or REINTERPRETS the document, and where they disagree the spoken version is newer.
// Answering from the document alone is the designed failure mode.
// Not official BJT material.

export type DocumentKind = "email" | "notice" | "minutes" | "report";

export interface IntegratedItem {
  id: string;
  title: string;
  titleReading: string;
  titleMeaning: string;
  documentKind: DocumentKind;
  document: string;
  documentReading: string;
  documentMeaning: string;
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

export const documentKindLabel: Record<DocumentKind, string> = {
  email: "メール — Email",
  notice: "通知 — Notice",
  minutes: "議事録 — Minutes",
  report: "報告書 — Report",
};

export const integratedItems: IntegratedItem[] = [
  {
    id: "ii1",
    title: "打ち合わせ日程のご連絡", titleReading: "うちあわせにっていのごれんらく", titleMeaning: "Notice of meeting schedule",
    documentKind: "email",
    document: "山田様\nお世話になっております。来週の打ち合わせにつきまして、6月12日（水）14時より、弊社3階会議室にて行いたく存じます。所要時間は約1時間を予定しております。当日は新製品のサンプルもご用意いたします。",
    documentReading: "やまださま\nおせわになっております。らいしゅうのうちあわせにつきまして、ろくがつじゅうににち（すい）じゅうよじより、へいしゃさんかいかいぎしつにておこないたくぞんじます。しょようじかんはやくいちじかんをよていしております。とうじつはしんせいひんのサンプルもごようい いたします。",
    documentMeaning: "Dear Mr Yamada,\nThank you for your continued support. Regarding next week's meeting, we would like to hold it on Wednesday 12 June at 14:00 in our 3rd-floor meeting room. We expect it to take about an hour. We will also prepare samples of the new product on the day.",
    audioScript: "先ほどメールをお送りしましたが、一点訂正がございます。3階の会議室が使えなくなりましたので、場所を5階の応接室に変更させていただきます。日時は変わりません。よろしくお願いいたします。",
    audioReading: "さきほどメールをおおくりしましたが、いってんていせいがございます。さんかいのかいぎしつがつかえなくなりましたので、ばしょをごかいのおうせつしつにへんこうさせていただきます。にちじはかわりません。よろしくおねがいいたします。",
    audioMeaning: "I sent an email a moment ago, but there is one correction. The 3rd-floor meeting room has become unavailable, so we are changing the location to the 5th-floor reception room. The date and time are unchanged.",
    question: "打ち合わせはどこで行われますか。",
    questionReading: "うちあわせはどこでおこなわれますか。",
    questionMeaning: "Where will the meeting be held?",
    options: ["3階会議室", "5階応接室", "3階応接室", "5階会議室"],
    optionMeanings: ["3rd-floor meeting room", "5th-floor reception room", "3rd-floor reception room", "5th-floor meeting room"],
    correctIndex: 1,
    explanation: "The email says 3階会議室; the audio explicitly corrects it to 5階応接室 and confirms the time is unchanged. The two wrong options mix one element from each source — floor from one, room type from the other — which is exactly how this question type builds distractors.",
  },
  {
    id: "ii2",
    title: "在庫状況報告", titleReading: "ざいこじょうきょうほうこく", titleMeaning: "Stock status report",
    documentKind: "report",
    document: "商品Aの在庫は現在120個です。商品Bは45個、商品Cは在庫切れとなっております。商品Cの入荷予定は今月末です。なお、商品Aは今週中に80個の出荷が決まっております。",
    documentReading: "しょうひんエーのざいこはげんざいひゃくにじゅっこです。しょうひんビーはよんじゅうごこ、しょうひんシーはざいこぎれとなっております。しょうひんシーのにゅうかよていはこんげつまつです。なお、しょうひんエーはこんしゅうちゅうにはちじゅっこのしゅっかがきまっております。",
    documentMeaning: "Stock of Product A is currently 120 units. Product B has 45 units and Product C is out of stock. Product C is due to arrive at the end of this month. Note that 80 units of Product A are scheduled to ship this week.",
    audioScript: "報告書の件ですが、商品Cの入荷が前倒しになりまして、明後日には30個入る予定です。それから、商品Aの出荷ですが、先方の都合で来月に延期になりました。",
    audioReading: "ほうこくしょのけんですが、しょうひんシーのにゅうかがまえだおしになりまして、あさってにはさんじゅっこはいるよていです。それから、しょうひんエーのしゅっかですが、せんぽうのつごうでらいげつにえんきになりました。",
    audioMeaning: "About the report — Product C's arrival has been moved forward, and 30 units are due in the day after tomorrow. Also, Product A's shipment has been postponed to next month at the client's request.",
    question: "今週末の時点で、商品Aの在庫は何個になりますか。",
    questionReading: "こんしゅうまつのじてんで、しょうひんエーのざいこはなんこになりますか。",
    questionMeaning: "As of the end of this week, how many units of Product A will be in stock?",
    options: ["40個", "120個", "80個", "150個"],
    optionMeanings: ["40 units", "120 units", "80 units", "150 units"],
    correctIndex: 1,
    explanation: "The document implies 120 − 80 = 40, which is the trap. But the audio postpones that 80-unit shipment to next month, so nothing leaves this week and stock stays at 120. You must let the audio cancel the document's arithmetic rather than performing it.",
  },
  {
    id: "ii3",
    title: "社内会議 議事録（抜粋）", titleReading: "しゃないかいぎ ぎじろく（ばっすい）", titleMeaning: "Internal meeting minutes (extract)",
    documentKind: "minutes",
    document: "議題：新サービスの価格設定\n決定事項：月額3,000円で6月1日にリリース。初年度の目標契約数は500件。広告予算は200万円とする。次回会議は5月20日。",
    documentReading: "ぎだい：しんサービスのかかくせってい\nけっていじこう：げつがくさんぜんえんでろくがつついたちにリリース。しょねんどのもくひょうけいやくすうはごひゃっけん。こうこくよさんはにひゃくまんえんとする。じかいかいぎはごがつはつか。",
    documentMeaning: "Agenda: pricing for the new service.\nDecisions: release on 1 June at 3,000 yen per month. First-year target is 500 contracts. Advertising budget set at 2,000,000 yen. Next meeting 20 May.",
    audioScript: "議事録を確認しましたが、価格について役員会で再検討が入りました。月額3,000円では競合に対して高いという意見が出まして、2,500円に引き下げることになりました。その分、目標契約数は600件に引き上げます。リリース日は予定どおりです。",
    audioReading: "ぎじろくをかくにんしましたが、かかくについてやくいんかいでさいけんとうがはいりました。げつがくさんぜんえんではきょうごうにたいしてたかいといういけんがでまして、にせんごひゃくえんにひきさげることになりました。そのぶん、もくひょうけいやくすうはろっぴゃっけんにひきあげます。リリースびはよていどおりです。",
    audioMeaning: "I checked the minutes, but the board has reconsidered the pricing. It was felt that 3,000 yen a month is expensive against competitors, so it will be reduced to 2,500 yen. To compensate, the contract target rises to 600. The release date stands as planned.",
    question: "最終的な月額料金と目標契約数はどれですか。",
    questionReading: "さいしゅうてきなげつがくりょうきんともくひょうけいやくすうはどれですか。",
    questionMeaning: "What are the final monthly price and contract target?",
    options: ["3,000円 / 500件", "2,500円 / 600件", "2,500円 / 500件", "3,000円 / 600件"],
    optionMeanings: ["3,000 yen / 500", "2,500 yen / 600", "2,500 yen / 500", "3,000 yen / 600"],
    correctIndex: 1,
    explanation: "Both figures are revised by the audio: price down to 2,500, target up to 600. The two mixed options each keep one stale value from the minutes. When audio revises multiple numbers, update every one of them — partial updating is the commonest error here.",
  },
  {
    id: "ii4",
    title: "出張申請の手続きについて", titleReading: "しゅっちょうしんせいのてつづきについて", titleMeaning: "About business trip application procedures",
    documentKind: "notice",
    document: "出張を申請する際は、出発日の2週間前までに申請書を総務部へご提出ください。宿泊を伴う場合は、宿泊先の見積書も併せて添付してください。承認までにはおよそ3営業日かかります。",
    documentReading: "しゅっちょうをしんせいするさいは、しゅっぱつびのにしゅうかんまえまでにしんせいしょをそうむぶへごていしゅつください。しゅくはくをともなうばあいは、しゅくはくさきのみつもりしょもあわせててんぷしてください。しょうにんまでにはおよそさんえいぎょうびかかります。",
    documentMeaning: "When applying for a business trip, please submit the application to General Affairs at least two weeks before departure. If the trip involves an overnight stay, please also attach a quotation from the accommodation. Approval takes approximately three business days.",
    audioScript: "出張申請の件ですが、来月からシステムが新しくなります。申請書の紙での提出は不要になり、社内ポータルから入力していただく形になります。提出期限は2週間前から10日前に短縮されますが、見積書の添付は引き続き必要です。",
    audioReading: "しゅっちょうしんせいのけんですが、らいげつからシステムがあたらしくなります。しんせいしょのかみでのていしゅつはふようになり、しゃないポータルからにゅうりょくしていただくかたちになります。ていしゅつきげんはにしゅうかんまえからとおかまえにたんしゅくされますが、みつもりしょのてんぷはひきつづきひつようです。",
    audioMeaning: "Regarding trip applications — the system changes from next month. Paper submission will no longer be required; instead you'll enter it via the internal portal. The deadline shortens from two weeks to ten days before, but attaching a quotation is still required.",
    question: "来月以降、宿泊を伴う出張の申請について正しいものはどれですか。",
    questionReading: "らいげついこう、しゅくはくをともなうしゅっちょうのしんせいについてただしいものはどれですか。",
    questionMeaning: "From next month, which is correct about applying for a trip with an overnight stay?",
    options: [
      "10日前までにポータルから申請し、見積書を添付する",
      "2週間前までに紙で提出し、見積書を添付する",
      "10日前までにポータルから申請し、見積書は不要",
      "2週間前までにポータルから申請する",
    ],
    optionMeanings: [
      "Apply via the portal 10 days ahead, attaching a quotation",
      "Submit on paper two weeks ahead with a quotation",
      "Apply via the portal 10 days ahead; no quotation needed",
      "Apply via the portal two weeks ahead",
    ],
    correctIndex: 0,
    explanation: "Three details, and only two of them change. Deadline: 2 weeks → 10 days (changed). Method: paper → portal (changed). Quotation: still required (explicitly unchanged by 引き続き). The third option is the trap for anyone who assumes everything mentioned in the audio was revised.",
  },
  {
    id: "ii5",
    title: "納品スケジュールのご案内", titleReading: "のうひんスケジュールのごあんない", titleMeaning: "Delivery schedule notice",
    documentKind: "email",
    document: "ご注文いただいた商品につきまして、下記のとおり納品いたします。\n第1便：7月5日 200個\n第2便：7月19日 300個\n第3便：8月2日 300個\n合計800個となります。",
    documentReading: "ごちゅうもんいただいたしょうひんにつきまして、かきのとおりのうひんいたします。\nだいいちびん：しちがついつか にひゃっこ\nだいにびん：しちがつじゅうくにち さんびゃっこ\nだいさんびん：はちがつふつか さんびゃっこ\nごうけいはっぴゃっこ となります。",
    documentMeaning: "Regarding your order, we will deliver as follows.\n1st shipment: 5 July, 200 units\n2nd shipment: 19 July, 300 units\n3rd shipment: 2 August, 300 units\nTotal 800 units.",
    audioScript: "納品スケジュールの件でご相談です。生産が順調に進んでおりまして、第2便と第3便をまとめて7月19日に600個お届けすることが可能になりました。第1便は予定どおりです。いかがでしょうか。",
    audioReading: "のうひんスケジュールのけんでごそうだんです。せいさんがじゅんちょうにすすんでおりまして、だいにびんとだいさんびんをまとめてしちがつじゅうくにちにろっぴゃっこおとどけすることがかのうになりました。だいいちびんはよていどおりです。いかがでしょうか。",
    audioMeaning: "A consultation about the delivery schedule. Production is going smoothly, so we can now combine the 2nd and 3rd shipments and deliver 600 units on 19 July. The 1st shipment stays as planned. How does that sound?",
    question: "提案が受け入れられた場合、納品は何回になりますか。",
    questionReading: "ていあんがうけいれられたばあい、のうひんはなんかいになりますか。",
    questionMeaning: "If the proposal is accepted, how many deliveries will there be?",
    options: ["1回", "2回", "3回", "4回"],
    optionMeanings: ["Once", "Twice", "Three times", "Four times"],
    correctIndex: 1,
    explanation: "The document has three shipments; the audio merges the 2nd and 3rd into one, leaving the 1st untouched — so two deliveries. The total of 800 units is unchanged, which is why answering by quantity gets you nowhere. Read what the question actually asks for: the number of deliveries.",
  },
  {
    id: "ii6",
    title: "研修参加者リスト", titleReading: "けんしゅうさんかしゃリスト", titleMeaning: "Training participant list",
    documentKind: "notice",
    document: "来月の管理職研修の参加者は以下のとおりです。\n営業部：佐藤課長、鈴木課長\n総務部：高橋課長\n経理部：田中部長\n計4名。会場は本社大会議室、時間は9時から17時です。",
    documentReading: "らいげつのかんりしょくけんしゅうのさんかしゃはいかのとおりです。\nえいぎょうぶ：さとうかちょう、すずきかちょう\nそうむぶ：たかはしかちょう\nけいりぶ：たなかぶちょう\nけいよんめい。かいじょうはほんしゃだいかいぎしつ、じかんはくじからじゅうしちじです。",
    documentMeaning: "Participants in next month's management training are as follows.\nSales: Section Chief Sato, Section Chief Suzuki\nGeneral Affairs: Section Chief Takahashi\nAccounting: Department Manager Tanaka\nFour in total. Venue: head office large meeting room, 9:00 to 17:00.",
    audioScript: "参加者リストですが、営業部の鈴木課長が同じ日に出張が入ってしまいまして、代わりに山本課長が参加することになりました。それと、経理部からもう一名、伊藤課長が追加で参加します。",
    audioReading: "さんかしゃリストですが、えいぎょうぶのすずきかちょうがおなじひにしゅっちょうがはいってしまいまして、かわりにやまもとかちょうがさんかすることになりました。それと、けいりぶからもういちめい、いとうかちょうがついかでさんかします。",
    audioMeaning: "About the participant list — Section Chief Suzuki from Sales has a business trip that day, so Section Chief Yamamoto will attend instead. Also, one more person from Accounting, Section Chief Ito, will join.",
    question: "研修の参加者は何名になりますか。",
    questionReading: "けんしゅうのさんかしゃはなんめいになりますか。",
    questionMeaning: "How many people will attend the training?",
    options: ["4名", "5名", "6名", "3名"],
    optionMeanings: ["4", "5", "6", "3"],
    correctIndex: 1,
    explanation: "Two changes with different effects: Suzuki is REPLACED by Yamamoto (net zero), and Ito is ADDED (net +1). So 4 + 0 + 1 = 5. Answering 6 means you counted the replacement as an addition — the distinction between 代わりに and 追加で is the entire question.",
  },
  {
    id: "ii7",
    title: "オフィス移転のお知らせ", titleReading: "オフィスいてんのおしらせ", titleMeaning: "Office relocation notice",
    documentKind: "notice",
    document: "弊社は9月1日より下記へ移転いたします。\n新住所：東京都港区○○1-2-3\n電話番号：03-1234-5678\nFAX番号：03-1234-5679\n業務開始は9月1日午前9時からです。",
    documentReading: "へいしゃはくがつついたちよりかきへいてんいたします。\nしんじゅうしょ：とうきょうとみなとく○○いち-に-さん\nでんわばんごう：ゼロさん-いちにさんよん-ごろくななはち\nエフエーエックスばんごう：ゼロさん-いちにさんよん-ごろくななきゅう\nぎょうむかいしはくがつついたちごぜんくじからです。",
    documentMeaning: "Our company will relocate to the following from 1 September.\nNew address: 1-2-3 ○○, Minato-ku, Tokyo\nPhone: 03-1234-5678\nFax: 03-1234-5679\nOperations begin at 9:00am on 1 September.",
    audioScript: "移転のお知らせをお送りしましたが、電話番号について訂正がございます。案内に記載した番号はFAX専用となりまして、お電話は03-1234-5670におかけください。住所と移転日に変更はございません。",
    audioReading: "いてんのおしらせをおおくりしましたが、でんわばんごうについてていせいがございます。あんないにきさいしたばんごうはエフエーエックスせんようとなりまして、おでんわはゼロさん-いちにさんよん-ごろくななゼロにおかけください。じゅうしょといてんびにへんこうはございません。",
    audioMeaning: "We sent a relocation notice, but there is a correction regarding the phone number. The number listed in the notice is fax-only; for calls please dial 03-1234-5670. The address and relocation date are unchanged.",
    question: "電話をかけるときの番号はどれですか。",
    questionReading: "でんわをかけるときのばんごうはどれですか。",
    questionMeaning: "Which number should be used for phone calls?",
    options: ["03-1234-5678", "03-1234-5679", "03-1234-5670", "案内に記載されていない"],
    optionMeanings: ["03-1234-5678", "03-1234-5679", "03-1234-5670", "Not listed in the notice"],
    correctIndex: 2,
    explanation: "The audio gives a third number ending 5670 that appears nowhere in the document. All three numbers differ only in the final digit, so this rewards precise listening rather than pattern-matching. Note the notice's 'phone' number is reclassified as fax-only, making both printed numbers wrong.",
  },
  {
    id: "ii8",
    title: "四半期売上報告", titleReading: "しはんきうりあげほうこく", titleMeaning: "Quarterly sales report",
    documentKind: "report",
    document: "第3四半期の売上は以下のとおりです。\n国内：4,200万円（前期比＋8%）\n海外：2,800万円（前期比＋15%）\n合計：7,000万円\n第4四半期は合計8,000万円を目標とします。",
    documentReading: "だいさんしはんきのうりあげはいかのとおりです。\nこくない：よんせんにひゃくまんえん（ぜんきひプラスはちパーセント）\nかいがい：にせんはっぴゃくまんえん（ぜんきひプラスじゅうごパーセント）\nごうけい：ななせんまんえん\nだいよんしはんきはごうけいはっせんまんえんをもくひょうとします。",
    documentMeaning: "Q3 sales are as follows.\nDomestic: 42 million yen (+8% QoQ)\nOverseas: 28 million yen (+15% QoQ)\nTotal: 70 million yen\nThe Q4 target is 80 million yen in total.",
    audioScript: "報告書の数字ですが、海外売上に計上漏れが見つかりました。300万円を追加する必要があります。したがって第3四半期の合計は修正が必要です。なお、第4四半期の目標は変更しません。",
    audioReading: "ほうこくしょのすうじですが、かいがいうりあげにけいじょうもれがみつかりました。さんびゃくまんえんをついかするひつようがあります。したがってだいさんしはんきのごうけいはしゅうせいがひつようです。なお、だいよんしはんきのもくひょうはへんこうしません。",
    audioMeaning: "About the figures in the report — an omission was found in overseas sales. Three million yen needs to be added. Accordingly the Q3 total must be revised. The Q4 target, however, is unchanged.",
    question: "修正後の第3四半期の合計売上はいくらですか。",
    questionReading: "しゅうせいごのだいさんしはんきのごうけいうりあげはいくらですか。",
    questionMeaning: "What is the revised Q3 total sales figure?",
    options: ["7,000万円", "7,300万円", "8,000万円", "8,300万円"],
    optionMeanings: ["70 million yen", "73 million yen", "80 million yen", "83 million yen"],
    correctIndex: 1,
    explanation: "70 million + 3 million = 73 million. The 80 million figure is the Q4 TARGET, explicitly left unchanged, and it sits in the options to catch anyone who grabs the last number they heard. Requires one arithmetic step on top of correctly separating actuals from targets.",
  },
];
