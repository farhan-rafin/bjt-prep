// PRACTICE listening bank — Part I of the BJT (聴解問題).
// Covers all three Part I question types: 場面把握 (5 Q on the real exam),
// 発言聴解 (10 Q) and 総合聴解 (10 Q).
// Audio is produced in-browser by the Web Speech API from `lines[].text`, so no audio files are needed.
// Every line carries a full hiragana reading and an English meaning for the post-answer review screen.
// Not official BJT material.

export type ListeningType = "situational" | "conversational" | "general";

export interface ListeningLine {
  speaker: string;
  text: string;
  reading: string;
  meaning: string;
}

export interface ListeningItem {
  id: string;
  type: ListeningType;
  /** Matches an id in bjtQuestionTypes so coverage can be reported per exam section. */
  questionTypeId: string;
  /** Short English context label — revealed only after answering. */
  context: string;
  lines: ListeningLine[];
  question: string;
  questionReading: string;
  questionMeaning: string;
  options: string[];
  optionMeanings: string[];
  correctIndex: number;
  explanation: string;
}

export const listeningTypeInfo: Record<ListeningType, { ja: string; en: string; examCount: number; howTo: string }> = {
  situational: {
    ja: "場面把握", en: "Situational Understanding", examCount: 5,
    howTo: "You hear one line. Decide who is speaking to whom, and where. Keigo markers give it away.",
  },
  conversational: {
    ja: "発言聴解", en: "Conversational Listening", examCount: 10,
    howTo: "A short exchange, then a question. Watch for a detail that gets changed mid-conversation — the last value stated wins.",
  },
  general: {
    ja: "総合聴解", en: "General Listening", examCount: 10,
    howTo: "A longer announcement. The purpose is usually stated near the start; the detail you need is buried in the middle.",
  },
};

export const listeningItems: ListeningItem[] = [
  // ── 場面把握 Situational Understanding ───────────────────────────────────────
  {
    id: "ls-1", type: "situational", questionTypeId: "situational-listening",
    context: "Opening a phone call to a client company",
    lines: [{
      speaker: "話し手", text: "お世話になっております。ABC商事の田中でございます。",
      reading: "おせわになっております。エービーシーしょうじのたなかでございます。",
      meaning: "Thank you for your continued support. This is Tanaka from ABC Trading.",
    }],
    question: "この人はどんな場面で話していますか。",
    questionReading: "このひとはどんなばめんではなしていますか。",
    questionMeaning: "In what situation is this person speaking?",
    options: ["取引先に電話をかけている", "社内の同僚に話しかけている", "面接を受けている", "友達と話している"],
    optionMeanings: ["Making a phone call to a client", "Speaking to a colleague in-house", "Attending a job interview", "Chatting with a friend"],
    correctIndex: 0,
    explanation: "お世話になっております is the standard opening to someone OUTSIDE your company, and 「〜の田中でございます」 identifies your company plus your own name humbly. Both together mark an outgoing call to a client. You would never open with お世話になっております to a colleague at your own company.",
  },
  {
    id: "ls-2", type: "situational", questionTypeId: "situational-listening",
    context: "Asking a customer to wait",
    lines: [{
      speaker: "話し手", text: "恐れ入りますが、少々お待ちいただけますでしょうか。",
      reading: "おそれいりますが、しょうしょうおまちいただけますでしょうか。",
      meaning: "I'm terribly sorry, but could I ask you to wait a moment?",
    }],
    question: "誰が誰に話していますか。",
    questionReading: "だれがだれにはなしていますか。",
    questionMeaning: "Who is speaking to whom?",
    options: ["店員がお客様に", "部長が部下に", "友達同士", "子供が親に"],
    optionMeanings: ["Staff to a customer", "A manager to a subordinate", "Between friends", "A child to a parent"],
    correctIndex: 0,
    explanation: "恐れ入りますが is a cushion phrase (クッション言葉) used toward customers and clients, and いただけますでしょうか is the most deferential request form there is. That stacking of politeness only happens downward-to-upward — staff to customer. A manager speaking to a subordinate would simply say 少し待って.",
  },
  {
    id: "ls-3", type: "situational", questionTypeId: "situational-listening",
    context: "Beginning a visit to a client's office",
    lines: [{
      speaker: "話し手", text: "本日はお忙しい中、お時間をいただきありがとうございます。",
      reading: "ほんじつはおいそがしいなか、おじかんをいただきありがとうございます。",
      meaning: "Thank you for making time for me today despite how busy you are.",
    }],
    question: "この発言はいつのものですか。",
    questionReading: "このはつげんはいつのものですか。",
    questionMeaning: "When is this remark made?",
    options: ["打ち合わせの始め", "打ち合わせの終わり", "電話を切るとき", "会社を出るとき"],
    optionMeanings: ["At the start of a meeting", "At the end of a meeting", "When hanging up the phone", "When leaving the office"],
    correctIndex: 0,
    explanation: "本日は…お時間をいただきありがとうございます thanks the other party for granting the time that is about to be used — so it opens the meeting. The closing equivalent would be 本日はありがとうございました (past tense), which is the trap option here.",
  },
  {
    id: "ls-4", type: "situational", questionTypeId: "situational-listening",
    context: "Answering the phone when the requested person is away",
    lines: [{
      speaker: "話し手", text: "申し訳ございません。山田はただいま席を外しております。",
      reading: "もうしわけございません。やまだはただいませきをはずしております。",
      meaning: "I'm very sorry. Yamada is away from his desk at the moment.",
    }],
    question: "山田さんはこの会社のどんな人ですか。",
    questionReading: "やまださんはこのかいしゃのどんなひとですか。",
    questionMeaning: "What is Yamada's relationship to this company?",
    options: ["同じ会社の人", "お客様", "取引先の社長", "話し手の家族"],
    optionMeanings: ["Someone at the same company", "A customer", "The president of a client company", "The speaker's family member"],
    correctIndex: 0,
    explanation: "山田 is used with no title (no さん, no 部長) and with the humble おります. You strip honorifics from your OWN company's people when speaking to an outsider — so Yamada is an in-house colleague, however senior. If Yamada were a customer you would say 山田様はいらっしゃいません.",
  },
  {
    id: "ls-5", type: "situational", questionTypeId: "situational-listening",
    context: "Accepting a customer's request in a shop or hotel",
    lines: [{
      speaker: "話し手", text: "かしこまりました。すぐにお持ちいたします。",
      reading: "かしこまりました。すぐにおもちいたします。",
      meaning: "Certainly. I'll bring it to you right away.",
    }],
    question: "この人の立場として最も適切なものはどれですか。",
    questionReading: "このひとのたちばとしてもっともてきせつなものはどれですか。",
    questionMeaning: "Which best describes this speaker's position?",
    options: ["接客をしている店員", "商品を買う客", "会議の司会者", "新入社員を叱る上司"],
    optionMeanings: ["Staff serving a customer", "A customer buying something", "The chair of a meeting", "A boss scolding a new employee"],
    correctIndex: 0,
    explanation: "かしこまりました is the strongest form of 'certainly' and belongs almost exclusively to customer service. お持ちいたします is kenjougo (humble) about the speaker's own action of bringing something. Both point to staff serving a customer.",
  },
  {
    id: "ls-6", type: "situational", questionTypeId: "situational-listening",
    context: "Leaving the office at the end of the day",
    lines: [{
      speaker: "話し手", text: "お先に失礼します。",
      reading: "おさきにしつれいします。",
      meaning: "Excuse me for leaving before you.",
    }],
    question: "この人は今から何をしますか。",
    questionReading: "このひとはいまからなにをしますか。",
    questionMeaning: "What is this person about to do?",
    options: ["先に退社する", "会議を始める", "電話をかける", "出張に出発する"],
    optionMeanings: ["Leave the office ahead of others", "Start a meeting", "Make a phone call", "Depart on a business trip"],
    correctIndex: 0,
    explanation: "お先に失礼します is the fixed phrase for leaving the workplace while colleagues are still working. The expected reply from those staying is お疲れ様でした. Learn the pair together — the exam tests both directions.",
  },
  {
    id: "ls-7", type: "situational", questionTypeId: "situational-listening",
    context: "Entering a superior's office",
    lines: [{
      speaker: "話し手", text: "失礼いたします。田中ですが、少しよろしいでしょうか。",
      reading: "しつれいいたします。たなかですが、すこしよろしいでしょうか。",
      meaning: "Excuse me. It's Tanaka — do you have a moment?",
    }],
    question: "この人は何をしようとしていますか。",
    questionReading: "このひとはなにをしようとしていますか。",
    questionMeaning: "What is this person trying to do?",
    options: ["上司の部屋に入って話しかける", "電話を切ろうとしている", "会議室を予約している", "お客様を見送っている"],
    optionMeanings: ["Enter a superior's room and speak to them", "End a phone call", "Book a meeting room", "See a customer off"],
    correctIndex: 0,
    explanation: "失礼いたします on entering, then naming yourself, then 少しよろしいでしょうか asking permission to take up time — that sequence is the standard way to approach a superior at their desk or office.",
  },
  {
    id: "ls-8", type: "situational", questionTypeId: "situational-listening",
    context: "Thanking a long-standing client",
    lines: [{
      speaker: "話し手", text: "いつもお引き立ていただき、誠にありがとうございます。",
      reading: "いつもおひきたていただき、まことにありがとうございます。",
      meaning: "Thank you sincerely for your continued patronage.",
    }],
    question: "話し手と聞き手の関係はどれですか。",
    questionReading: "はなしてとききてのかんけいはどれですか。",
    questionMeaning: "What is the relationship between speaker and listener?",
    options: ["売る側と長く取引のある客", "同期入社の同僚", "上司と部下", "面接官と応募者"],
    optionMeanings: ["A seller and a long-term customer", "Colleagues who joined the same year", "A boss and a subordinate", "An interviewer and an applicant"],
    correctIndex: 0,
    explanation: "お引き立て means favouring a business with continued custom, so it is only ever said by the selling side to a buying side that has been around a while. 誠に intensifies the thanks to formal-written register.",
  },

  // ── 発言聴解 Conversational Listening ────────────────────────────────────────
  {
    id: "lc-1", type: "conversational", questionTypeId: "conversational-listening",
    context: "Confirming a meeting time that then changes",
    lines: [
      { speaker: "A", text: "明日の会議は10時からでよろしいですか。", reading: "あしたのかいぎはじゅうじからでよろしいですか。", meaning: "Tomorrow's meeting starts at 10, is that right?" },
      { speaker: "B", text: "すみません、部長の都合で11時に変更になりました。", reading: "すみません、ぶちょうのつごうでじゅういちじにへんこうになりました。", meaning: "Sorry — it's been moved to 11 because of the manager's schedule." },
    ],
    question: "会議は何時から始まりますか。",
    questionReading: "かいぎはなんじからはじまりますか。",
    questionMeaning: "What time does the meeting start?",
    options: ["10時", "11時", "12時", "9時"],
    optionMeanings: ["10 o'clock", "11 o'clock", "12 o'clock", "9 o'clock"],
    correctIndex: 1,
    explanation: "This is the single most common Part I trap: a time is stated, then corrected. 変更になりました marks the change. Always answer with the LAST value stated, not the first one you heard.",
  },
  {
    id: "lc-2", type: "conversational", questionTypeId: "conversational-listening",
    context: "A delivery is pushed back",
    lines: [
      { speaker: "A", text: "納品は今週の金曜日の予定でしたよね。", reading: "のうひんはこんしゅうのきんようびのよていでしたよね。", meaning: "The delivery was scheduled for this Friday, wasn't it?" },
      { speaker: "B", text: "はい。ただ、台風の影響で来週の月曜日になりそうです。", reading: "はい。ただ、たいふうのえいきょうでらいしゅうのげつようびになりそうです。", meaning: "Yes. However, because of the typhoon it looks like it'll be next Monday." },
    ],
    question: "納品はいつになりそうですか。",
    questionReading: "のうひんはいつになりそうですか。",
    questionMeaning: "When is the delivery likely to be?",
    options: ["今週の金曜日", "来週の月曜日", "来週の金曜日", "今週の月曜日"],
    optionMeanings: ["This Friday", "Next Monday", "Next Friday", "This Monday"],
    correctIndex: 1,
    explanation: "ただ signals the reversal — everything before it is the old plan. 〜になりそうです gives the new expected date. Listen for ただ / でも / ですが as the pivot word, then note whatever follows.",
  },
  {
    id: "lc-3", type: "conversational", questionTypeId: "conversational-listening",
    context: "Changing meeting rooms because numbers grew",
    lines: [
      { speaker: "A", text: "第一会議室を押さえておきました。", reading: "だいいちかいぎしつをおさえておきました。", meaning: "I've reserved Meeting Room 1." },
      { speaker: "B", text: "人数が20名に増えたので、第三会議室に変えていただけますか。", reading: "にんずうがにじゅうめいにふえたので、だいさんかいぎしつにかえていただけますか。", meaning: "The headcount has grown to 20, so could you change it to Meeting Room 3?" },
    ],
    question: "どの会議室を使うことになりますか。",
    questionReading: "どのかいぎしつをつかうことになりますか。",
    questionMeaning: "Which meeting room will be used?",
    options: ["第一会議室", "第二会議室", "第三会議室", "まだ決まっていない"],
    optionMeanings: ["Meeting Room 1", "Meeting Room 2", "Meeting Room 3", "Not decided yet"],
    correctIndex: 2,
    explanation: "押さえておきました means a booking was already made, but B's request supersedes it. 変えていただけますか is a request that the conversation treats as accepted, so the outcome is Room 3.",
  },
  {
    id: "lc-4", type: "conversational", questionTypeId: "conversational-listening",
    context: "Taking a phone call for an absent manager",
    lines: [
      { speaker: "A", text: "山田部長はいらっしゃいますか。", reading: "やまだぶちょうはいらっしゃいますか。", meaning: "Is Manager Yamada available?" },
      { speaker: "B", text: "あいにく外出しております。3時頃には戻る予定でございます。", reading: "あいにくがいしゅつしております。さんじごろにはもどるよていでございます。", meaning: "Unfortunately he's out. He's expected back around 3 o'clock." },
    ],
    question: "山田部長はいつ戻りますか。",
    questionReading: "やまだぶちょうはいつもどりますか。",
    questionMeaning: "When will Manager Yamada return?",
    options: ["もう戻っている", "3時頃", "明日", "今日は戻らない"],
    optionMeanings: ["He's already back", "Around 3 o'clock", "Tomorrow", "He won't be back today"],
    correctIndex: 1,
    explanation: "あいにく ('unfortunately') always precedes bad news in business calls — treat it as a cue to listen hard for the alternative that follows. 戻る予定でございます gives the return time.",
  },
  {
    id: "lc-5", type: "conversational", questionTypeId: "conversational-listening",
    context: "Checking whether a report has been submitted",
    lines: [
      { speaker: "A", text: "先週の報告書はもう提出しましたか。", reading: "せんしゅうのほうこくしょはもうていしゅつしましたか。", meaning: "Have you already submitted last week's report?" },
      { speaker: "B", text: "いえ、まだです。本日中には必ず出します。", reading: "いえ、まだです。ほんじつちゅうにはかならずだします。", meaning: "No, not yet. I'll definitely submit it by the end of today." },
    ],
    question: "報告書は今どうなっていますか。",
    questionReading: "ほうこくしょはいまどうなっていますか。",
    questionMeaning: "What is the current status of the report?",
    options: ["すでに提出済み", "まだ提出していない", "提出する必要がない", "上司が書いている"],
    optionMeanings: ["Already submitted", "Not yet submitted", "Doesn't need submitting", "The boss is writing it"],
    correctIndex: 1,
    explanation: "まだです answers 'not yet'. The follow-up promise 本日中には出します describes the future, not the present — a classic distractor that tempts you into choosing 'already submitted'.",
  },
  {
    id: "lc-6", type: "conversational", questionTypeId: "conversational-listening",
    context: "A volume discount changes the unit price",
    lines: [
      { speaker: "A", text: "こちらの商品は一個500円ですね。", reading: "こちらのしょうひんはいっこごひゃくえんですね。", meaning: "This product is 500 yen each, right?" },
      { speaker: "B", text: "はい。ただし、100個以上のご注文でしたら一個450円になります。", reading: "はい。ただし、ひゃっこいじょうのごちゅうもんでしたらいっこよんひゃくごじゅうえんになります。", meaning: "Yes. However, for orders of 100 or more it becomes 450 yen each." },
    ],
    question: "150個注文した場合、一個いくらですか。",
    questionReading: "ひゃくごじゅっこちゅうもんしたばあい、いっこいくらですか。",
    questionMeaning: "If you order 150 units, what is the price per unit?",
    options: ["500円", "450円", "550円", "400円"],
    optionMeanings: ["500 yen", "450 yen", "550 yen", "400 yen"],
    correctIndex: 1,
    explanation: "ただし introduces the condition. 150 satisfies 100個以上, so the discounted 450円 applies. Part I loves conditional pricing — catch the threshold number and check the question's quantity against it.",
  },
  {
    id: "lc-7", type: "conversational", questionTypeId: "conversational-listening",
    context: "Rescheduling a client visit",
    lines: [
      { speaker: "A", text: "水曜日の午後に御社に伺ってもよろしいでしょうか。", reading: "すいようびのごごにおんしゃにうかがってもよろしいでしょうか。", meaning: "Would it be all right if I visited your office on Wednesday afternoon?" },
      { speaker: "B", text: "水曜日は終日会議が入っておりまして、木曜日でしたら空いております。", reading: "すいようびはしゅうじつかいぎがはいっておりまして、もくようびでしたらあいております。", meaning: "Wednesday is full of meetings all day; Thursday would be free." },
    ],
    question: "訪問はいつになりそうですか。",
    questionReading: "ほうもんはいつになりそうですか。",
    questionMeaning: "When is the visit likely to happen?",
    options: ["水曜日の午後", "木曜日", "金曜日", "来週"],
    optionMeanings: ["Wednesday afternoon", "Thursday", "Friday", "Next week"],
    correctIndex: 1,
    explanation: "B never says 'no' outright — 終日会議が入っております IS the refusal, and 〜でしたら空いております is the counter-offer. Japanese business speech refuses by describing circumstances; the alternative offered is the real answer.",
  },
  {
    id: "lc-8", type: "conversational", questionTypeId: "conversational-listening",
    context: "Handling a wrong-item complaint",
    lines: [
      { speaker: "A", text: "注文した色と違う商品が届いたのですが。", reading: "ちゅうもんしたいろとちがうしょうひんがとどいたのですが。", meaning: "A product arrived in a different colour from what I ordered." },
      { speaker: "B", text: "大変申し訳ございません。本日中に正しい商品をお送りいたします。", reading: "たいへんもうしわけございません。ほんじつちゅうにただしいしょうひんをおおくりいたします。", meaning: "I'm extremely sorry. We'll send the correct item by the end of today." },
    ],
    question: "店はこれからどうしますか。",
    questionReading: "みせはこれからどうしますか。",
    questionMeaning: "What will the shop do next?",
    options: ["返金する", "正しい商品を送る", "何もしない", "客に返品させる"],
    optionMeanings: ["Issue a refund", "Send the correct item", "Do nothing", "Make the customer return it"],
    correctIndex: 1,
    explanation: "The remedy is stated directly: 正しい商品をお送りいたします. 返金 (refund) is never mentioned — a distractor built from what you'd assume rather than what was said. Answer only from the audio.",
  },
  {
    id: "lc-9", type: "conversational", questionTypeId: "conversational-listening",
    context: "Getting approval before acting",
    lines: [
      { speaker: "A", text: "この見積書、先方に送ってもいいですか。", reading: "このみつもりしょ、せんぽうにおくってもいいですか。", meaning: "May I send this quotation to the other party?" },
      { speaker: "B", text: "課長の承認をもらってからにしてください。", reading: "かちょうのしょうにんをもらってからにしてください。", meaning: "Please do it only after getting the section chief's approval." },
    ],
    question: "Aさんは次に何をしなければなりませんか。",
    questionReading: "エーさんはつぎになにをしなければなりませんか。",
    questionMeaning: "What must A do next?",
    options: ["すぐに見積書を送る", "課長の承認をもらう", "見積書を作り直す", "先方に電話する"],
    optionMeanings: ["Send the quotation immediately", "Get the section chief's approval", "Redo the quotation", "Call the other party"],
    correctIndex: 1,
    explanation: "〜てからにしてください sets the order of operations: approval first, sending second. Questions asking 次に何をしますか are really testing whether you caught the sequencing marker てから.",
  },
  {
    id: "lc-10", type: "conversational", questionTypeId: "conversational-listening",
    context: "Reporting a system problem",
    lines: [
      { speaker: "A", text: "システムにログインできないんですが、どうしたらいいですか。", reading: "システムにログインできないんですが、どうしたらいいですか。", meaning: "I can't log into the system — what should I do?" },
      { speaker: "B", text: "情報システム部の内線202にご連絡ください。", reading: "じょうほうシステムぶのないせんにひゃくににごれんらくください。", meaning: "Please contact the IT department at extension 202." },
    ],
    question: "Aさんはどこに連絡しますか。",
    questionReading: "エーさんはどこにれんらくしますか。",
    questionMeaning: "Where should A get in touch?",
    options: ["内線202の情報システム部", "総務部", "人事部の内線220", "自分の上司"],
    optionMeanings: ["IT department at extension 202", "General affairs", "HR at extension 220", "Their own boss"],
    correctIndex: 0,
    explanation: "Both the department and the extension number must match. The distractor 人事部の内線220 flips two digits and swaps the department — Part I regularly builds wrong options by altering exactly one detail of a correct-sounding answer.",
  },
  {
    id: "lc-11", type: "conversational", questionTypeId: "conversational-listening",
    context: "Overtime request declined politely",
    lines: [
      { speaker: "A", text: "今日、残業をお願いできませんか。", reading: "きょう、ざんぎょうをおねがいできませんか。", meaning: "Could I ask you to work overtime today?" },
      { speaker: "B", text: "申し訳ありません。本日は子供を迎えに行かなければならないんです。", reading: "もうしわけありません。ほんじつはこどもをむかえにいかなければならないんです。", meaning: "I'm sorry. Today I have to go pick up my child." },
    ],
    question: "Bさんは残業をしますか。",
    questionReading: "ビーさんはざんぎょうをしますか。",
    questionMeaning: "Will B work overtime?",
    options: ["する", "しない", "少しだけする", "明日する"],
    optionMeanings: ["Yes", "No", "Only a little", "Will do it tomorrow"],
    correctIndex: 1,
    explanation: "B never says いいえ. 申し訳ありません plus a reason with 〜なければならない is a complete refusal in Japanese. Expecting an explicit 'no' is the mistake — the apology plus obligation IS the no.",
  },

  // ── 総合聴解 General Listening ───────────────────────────────────────────────
  {
    id: "lg-1", type: "general", questionTypeId: "general-listening",
    context: "In-house announcement about an office move",
    lines: [{
      speaker: "アナウンス",
      text: "社員の皆様にお知らせいたします。来月15日より、営業部は本社ビルの5階から7階へ移転いたします。移転作業は14日の土曜日に行いますので、13日の金曜日までに私物の片付けをお願いいたします。なお、内線番号に変更はございません。",
      reading: "しゃいんのみなさまにおしらせいたします。らいげつじゅうごにちより、えいぎょうぶはほんしゃビルのごかいからななかいへいてんいたします。いてんさぎょうはじゅうよっかのどようびにおこないますので、じゅうさんにちのきんようびまでにしぶつのかたづけをおねがいいたします。なお、ないせんばんごうにへんこうはございません。",
      meaning: "An announcement to all staff. From the 15th of next month, the Sales Department will move from the 5th floor of the head office building to the 7th. The move itself takes place on Saturday the 14th, so please clear away your personal belongings by Friday the 13th. Note that extension numbers will not change.",
    }],
    question: "社員は何日までに私物を片付けなければなりませんか。",
    questionReading: "しゃいんはなんにちまでにしぶつをかたづけなければなりませんか。",
    questionMeaning: "By what date must staff clear their personal belongings?",
    options: ["13日", "14日", "15日", "7日"],
    optionMeanings: ["The 13th", "The 14th", "The 15th", "The 7th"],
    correctIndex: 0,
    explanation: "Three dates appear: the 15th (move takes effect), the 14th (moving work), the 13th (deadline for staff). The question asks for the staff deadline, so 13日 is correct. Longer announcements deliberately stack similar numbers — note what each one is FOR, not just the number.",
  },
  {
    id: "lg-2", type: "general", questionTypeId: "general-listening",
    context: "System maintenance notice",
    lines: [{
      speaker: "アナウンス",
      text: "社内システムのメンテナンスについてご案内します。今週土曜日の午後10時から翌日曜日の午前6時まで、経費申請システムをご利用いただけません。急ぎの申請がある場合は、金曜日の終業時刻までに済ませてください。メールと勤怠システムは通常どおりご利用いただけます。",
      reading: "しゃないシステムのメンテナンスについてごあんないします。こんしゅうどようびのごごじゅうじからよくにちようびのごぜんろくじまで、けいひしんせいシステムをごりよういただけません。いそぎのしんせいがあるばあいは、きんようびのしゅうぎょうじこくまでにすませてください。メールときんたいシステムはつうじょうどおりごりよういただけます。",
      meaning: "This is a notice about maintenance of our internal systems. From 10pm Saturday until 6am Sunday, the expense claim system will be unavailable. If you have an urgent claim, please complete it by close of business Friday. Email and the attendance system will be available as usual.",
    }],
    question: "メンテナンス中に使えないのはどれですか。",
    questionReading: "メンテナンスちゅうにつかえないのはどれですか。",
    questionMeaning: "Which system is unavailable during maintenance?",
    options: ["メール", "勤怠システム", "経費申請システム", "すべてのシステム"],
    optionMeanings: ["Email", "The attendance system", "The expense claim system", "All systems"],
    correctIndex: 2,
    explanation: "Only 経費申請システム goes down; the final sentence explicitly exempts email and attendance. 'All systems' is the trap for anyone who heard 'maintenance' and stopped listening before the exemption.",
  },
  {
    id: "lg-3", type: "general", questionTypeId: "general-listening",
    context: "New-employee training schedule",
    lines: [{
      speaker: "研修担当",
      text: "新入社員研修の日程をご説明します。研修は4月1日から3日間、本社の大会議室で行います。初日はビジネスマナー、2日目は自社製品の知識、最終日はグループ発表です。発表の準備は2日目の夕方から始めますので、初日の資料は必ず持参してください。",
      reading: "しんにゅうしゃいんけんしゅうのにっていをごせつめいします。けんしゅうはしがつついたちからみっかかん、ほんしゃのだいかいぎしつでおこないます。しょにちはビジネスマナー、ふつかめはじしゃせいひんのちしき、さいしゅうびはグループはっぴょうです。はっぴょうのじゅんびはふつかめのゆうがたからはじめますので、しょにちのしりょうはかならずじさんしてください。",
      meaning: "Let me explain the new-employee training schedule. Training runs for three days from April 1st in the head office's large meeting room. Day one is business manners, day two is product knowledge, and the final day is group presentations. Preparation for the presentations starts on the evening of day two, so please be sure to bring day one's materials with you.",
    }],
    question: "グループ発表があるのは何日目ですか。",
    questionReading: "グループはっぴょうがあるのはなんにちめですか。",
    questionMeaning: "On which day are the group presentations?",
    options: ["1日目", "2日目", "3日目", "4日目"],
    optionMeanings: ["Day 1", "Day 2", "Day 3", "Day 4"],
    correctIndex: 2,
    explanation: "最終日 = the final day, and the training is 3日間, so the presentations are day 3. The mention of preparation beginning on day two is there to pull you toward the wrong answer.",
  },
  {
    id: "lg-4", type: "general", questionTypeId: "general-listening",
    context: "Announcing a change to the remote-work policy",
    lines: [{
      speaker: "人事部",
      text: "在宅勤務制度の変更についてお知らせします。これまで週2日まででしたが、来月より週3日まで可能となります。ただし、チームによっては出社が必要な日が指定される場合がありますので、詳細は各部署の責任者にご確認ください。申請は前月の25日までにお願いいたします。",
      reading: "ざいたくきんむせいどのへんこうについておしらせします。これまでしゅうふつかまででしたが、らいげつよりしゅうみっかまでかのうとなります。ただし、チームによってはしゅっしゃがひつようなひがしていされるばあいがありますので、しょうさいはかくぶしょのせきにんしゃにごかくにんください。しんせいはぜんげつのにじゅうごにちまでにおねがいいたします。",
      meaning: "This is a notice about a change to the work-from-home system. Until now it was up to two days a week, but from next month up to three days will be possible. However, some teams may have designated days requiring office attendance, so please check details with your department head. Applications are due by the 25th of the preceding month.",
    }],
    question: "来月から在宅勤務は週何日まで可能ですか。",
    questionReading: "らいげつからざいたくきんむはしゅうなんにちまでかのうですか。",
    questionMeaning: "From next month, how many days per week can you work from home?",
    options: ["週2日", "週3日", "週4日", "週5日"],
    optionMeanings: ["2 days", "3 days", "4 days", "5 days"],
    correctIndex: 1,
    explanation: "これまで…でしたが marks the old rule (2 days) and 来月より the new one (3 days). Whenever you hear これまで / 従来, expect the current value to follow — and the question almost always asks for the new one.",
  },
  {
    id: "lg-5", type: "general", questionTypeId: "general-listening",
    context: "Quarterly sales results briefing",
    lines: [{
      speaker: "営業部長",
      text: "第2四半期の営業成績についてご報告します。全体の売上は前年同期比で12パーセント増加しました。特に海外向けの売上が大きく伸び、全体の35パーセントを占めています。一方、国内の店舗売上は5パーセント減少しており、次の四半期はこの立て直しが課題となります。",
      reading: "だいにしはんきのえいぎょうせいせきについてごほうこくします。ぜんたいのうりあげはぜんねんどうきひでじゅうにパーセントぞうかしました。とくにかいがいむけのうりあげがおおきくのび、ぜんたいのさんじゅうごパーセントをしめています。いっぽう、こくないのてんぽうりあげはごパーセントげんしょうしており、つぎのしはんきはこのたてなおしがかだいとなります。",
      meaning: "Here is the report on second-quarter sales performance. Overall sales rose 12 percent year on year. Overseas sales in particular grew substantially and now account for 35 percent of the total. On the other hand, domestic store sales fell 5 percent, and turning that around is the challenge for next quarter.",
    }],
    question: "次の四半期の課題は何ですか。",
    questionReading: "つぎのしはんきのかだいはなんですか。",
    questionMeaning: "What is the challenge for next quarter?",
    options: ["海外売上をさらに伸ばすこと", "国内の店舗売上を立て直すこと", "社員を増やすこと", "新商品を開発すること"],
    optionMeanings: ["Growing overseas sales further", "Turning around domestic store sales", "Hiring more staff", "Developing new products"],
    correctIndex: 1,
    explanation: "一方 flips the report from good news to bad, and 課題となります names the challenge explicitly. Three percentages are read out purely as noise for this question — identify what's being ASKED before you start tracking numbers.",
  },
  {
    id: "lg-6", type: "general", questionTypeId: "general-listening",
    context: "Building inspection notice",
    lines: [{
      speaker: "総務部",
      text: "エレベーターの定期点検についてお知らせします。今月28日の午前9時から午後1時まで、1号機と2号機が停止いたします。3号機は通常どおり運転しておりますが、混雑が予想されますので、お急ぎの方は階段のご利用をお願いいたします。ご不便をおかけしますが、ご協力をお願いいたします。",
      reading: "エレベーターのていきてんけんについておしらせします。こんげつにじゅうはちにちのごぜんくじからごごいちじまで、いちごうきとにごうきがていしいたします。さんごうきはつうじょうどおりうんてんしておりますが、こんざつがよそうされますので、おいそぎのかたはかいだんのごりようをおねがいいたします。ごふべんをおかけしますが、ごきょうりょくをおねがいいたします。",
      meaning: "This is a notice about scheduled elevator inspections. On the 28th of this month, from 9am to 1pm, elevators 1 and 2 will be out of service. Elevator 3 will run as usual, but congestion is expected, so if you are in a hurry please use the stairs. We apologise for the inconvenience and ask for your cooperation.",
    }],
    question: "点検中も使えるエレベーターはどれですか。",
    questionReading: "てんけんちゅうもつかえるエレベーターはどれですか。",
    questionMeaning: "Which elevator can still be used during the inspection?",
    options: ["1号機", "2号機", "3号機", "どれも使えない"],
    optionMeanings: ["No. 1", "No. 2", "No. 3", "None of them"],
    correctIndex: 2,
    explanation: "1号機と2号機が停止 — those two stop. 3号機は通常どおり運転 — number 3 keeps running. The question asks which one still WORKS, so listen for the exception rather than the list of what's broken.",
  },
  {
    id: "lg-7", type: "general", questionTypeId: "general-listening",
    context: "Year-end holiday schedule",
    lines: [{
      speaker: "総務部",
      text: "年末年始の休業についてご案内いたします。弊社は12月29日から1月4日まで休業とさせていただきます。この期間中、お問い合わせへの対応はお休みとなりますが、ホームページからのご注文は通常どおり承っております。なお、年内の発送は12月27日までのご注文分となります。",
      reading: "ねんまつねんしのきゅうぎょうについてごあんないいたします。へいしゃはじゅうにがつにじゅうくにちからいちがつよっかまできゅうぎょうとさせていただきます。このきかんちゅう、おといあわせへのたいおうはおやすみとなりますが、ホームページからのごちゅうもんはつうじょうどおりうけたまわっております。なお、ねんないのはっそうはじゅうにがつにじゅうななにちまでのごちゅうもんぶんとなります。",
      meaning: "This is a notice about our year-end and New Year closure. Our company will be closed from December 29th to January 4th. During this period we will not respond to inquiries, but orders through our website will be accepted as usual. Please note that shipping within this year applies to orders placed by December 27th.",
    }],
    question: "年内に発送してもらうには、いつまでに注文する必要がありますか。",
    questionReading: "ねんないにはっそうしてもらうには、いつまでにちゅうもんするひつようがありますか。",
    questionMeaning: "By when must you order to have it shipped within this year?",
    options: ["12月27日", "12月29日", "1月4日", "12月31日"],
    optionMeanings: ["December 27", "December 29", "January 4", "December 31"],
    correctIndex: 0,
    explanation: "The closure dates (29 Dec–4 Jan) are prominent, but the shipping cutoff sits in the final なお sentence — 12月27日. なお and ちなみに introduce a supplementary detail that questions love to target precisely because it sounds like an afterthought.",
  },
  {
    id: "lg-8", type: "general", questionTypeId: "general-listening",
    context: "Emergency drill instructions",
    lines: [{
      speaker: "アナウンス",
      text: "本日午後3時より、防災訓練を実施いたします。訓練開始の合図がありましたら、各自の持ち物は置いたまま、非常階段を使って1階の駐車場へ避難してください。エレベーターは使用しないでください。避難後、各部署の責任者が人数を確認いたしますので、その場でお待ちください。",
      reading: "ほんじつごごさんじより、ぼうさいくんれんをじっしいたします。くんれんかいしのあいずがありましたら、かくじのもちものはおいたまま、ひじょうかいだんをつかっていっかいのちゅうしゃじょうへひなんしてください。エレベーターはしようしないでください。ひなんご、かくぶしょのせきにんしゃがにんずうをかくにんいたしますので、そのばでおまちください。",
      meaning: "A disaster drill will be held today from 3pm. When the start signal sounds, leave your belongings where they are, use the emergency stairs and evacuate to the car park on the first floor. Do not use the elevators. After evacuating, department heads will take a headcount, so please wait where you are.",
    }],
    question: "避難するとき、持ち物はどうしますか。",
    questionReading: "ひなんするとき、もちものはどうしますか。",
    questionMeaning: "What should you do with your belongings when evacuating?",
    options: ["すべて持って行く", "置いたままにする", "受付に預ける", "カバンだけ持って行く"],
    optionMeanings: ["Take everything with you", "Leave them where they are", "Hand them to reception", "Take only your bag"],
    correctIndex: 1,
    explanation: "持ち物は置いたまま — 〜たまま means leaving something in its current state. This grammar point is worth knowing cold: it appears in both Part I audio and Part III reading, and every wrong option here is built on misreading it.",
  },
  {
    id: "lg-9", type: "general", questionTypeId: "general-listening",
    context: "Cafeteria closure notice",
    lines: [{
      speaker: "総務部",
      text: "社員食堂の一時休業についてお知らせします。設備の入れ替え工事のため、来週月曜日から水曜日までの3日間、社員食堂を閉鎖いたします。この間、2階の休憩スペースでお弁当の販売を行います。販売時間は午前11時30分から午後1時までです。木曜日からは通常どおり営業いたします。",
      reading: "しゃいんしょくどうのいちじきゅうぎょうについておしらせします。せつびのいれかえこうじのため、らいしゅうげつようびからすいようびまでのみっかかん、しゃいんしょくどうをへいさいたします。このあいだ、にかいのきゅうけいスペースでおべんとうのはんばいをおこないます。はんばいじかんはごぜんじゅういちじさんじゅっぷんからごごいちじまでです。もくようびからはつうじょうどおりえいぎょういたします。",
      meaning: "This is a notice about a temporary closure of the staff cafeteria. Due to equipment replacement work, the cafeteria will be closed for three days from next Monday to Wednesday. During this time, boxed lunches will be sold in the second-floor break area, from 11:30am to 1pm. Normal service resumes from Thursday.",
    }],
    question: "食堂が閉まっている間、昼食はどこで買えますか。",
    questionReading: "しょくどうがしまっているあいだ、ちゅうしょくはどこでかえますか。",
    questionMeaning: "Where can you buy lunch while the cafeteria is closed?",
    options: ["1階の受付", "2階の休憩スペース", "会社の外のコンビニ", "3階の会議室"],
    optionMeanings: ["Reception on floor 1", "The second-floor break area", "A convenience store outside", "Meeting room on floor 3"],
    correctIndex: 1,
    explanation: "2階の休憩スペースでお弁当の販売を行います answers it directly. Note how many numbers compete for attention — 3 days, floor 2, 11:30, 1pm. Hold the question in mind while listening so you filter for place, not time.",
  },
  {
    id: "lg-10", type: "general", questionTypeId: "general-listening",
    context: "Explaining a new expense-claim rule",
    lines: [{
      speaker: "経理部",
      text: "経費精算のルール変更についてご説明します。来月より、5000円を超える経費については領収書の原本の提出が必要となります。5000円以下の場合は、これまでどおり写真データの提出で結構です。また、申請の締め切りは毎月末日から翌月5日に変更となりますのでご注意ください。",
      reading: "けいひせいさんのルールへんこうについてごせつめいします。らいげつより、ごせんえんをこえるけいひについてはりょうしゅうしょのげんぽんのていしゅつがひつようとなります。ごせんえんいかのばあいは、これまでどおりしゃしんデータのていしゅつでけっこうです。また、しんせいのしめきりはまいつきまつじつからよくげついつかにへんこうとなりますのでごちゅういください。",
      meaning: "Let me explain a change to the expense settlement rules. From next month, expenses exceeding 5,000 yen will require submission of the original receipt. For amounts of 5,000 yen or less, photo data is still acceptable as before. Also, please note the application deadline changes from the last day of each month to the 5th of the following month.",
    }],
    question: "申請の締め切りはいつに変わりますか。",
    questionReading: "しんせいのしめきりはいつにかわりますか。",
    questionMeaning: "When does the application deadline change to?",
    options: ["毎月末日", "翌月5日", "翌月末日", "毎月15日"],
    optionMeanings: ["The last day of the month", "The 5th of the following month", "The last day of the following month", "The 15th of each month"],
    correctIndex: 1,
    explanation: "A から B に変更 means from A to B — the NEW value is the one after に. 毎月末日 is the old deadline and the most tempting wrong answer. Whenever you hear 〜から〜に変更, the answer is whatever precedes に変更.",
  },
  {
    id: "lg-11", type: "general", questionTypeId: "general-listening",
    context: "Briefing on a new product launch",
    lines: [{
      speaker: "商品企画部",
      text: "新商品の発売についてご説明します。発売日は当初6月1日を予定しておりましたが、部品の調達が遅れているため、6月15日に延期することになりました。広告の掲載開始は予定どおり6月1日ですので、問い合わせが増える可能性があります。営業部の皆様は対応の準備をお願いいたします。",
      reading: "しんしょうひんのはつばいについてごせつめいします。はつばいびはとうしょろくがつついたちをよていしておりましたが、ぶひんのちょうたつがおくれているため、ろくがつじゅうごにちにえんきすることになりました。こうこくのけいさいかいしはよていどおりろくがつついたちですので、といあわせがふえるかのうせいがあります。えいぎょうぶのみなさまはたいおうのじゅんびをおねがいいたします。",
      meaning: "Let me explain the new product launch. The release date was originally planned for June 1st, but because parts procurement is delayed it has been postponed to June 15th. Advertising still starts on June 1st as planned, so inquiries may increase. We ask the sales department to prepare to handle them.",
    }],
    question: "6月1日には何が始まりますか。",
    questionReading: "ろくがつついたちにはなにがはじまりますか。",
    questionMeaning: "What begins on June 1st?",
    options: ["新商品の発売", "広告の掲載", "部品の調達", "営業部の研修"],
    optionMeanings: ["The product launch", "The advertising campaign", "Parts procurement", "Sales department training"],
    correctIndex: 1,
    explanation: "June 1st appears twice with two different meanings: the ORIGINAL launch date (now cancelled) and the actual advertising start date (unchanged). 予定どおり confirms advertising stays put. When one date attaches to two events, the exam will ask about the one you're less likely to have tracked.",
  },
];

export function listeningItemsByType(type: ListeningType) {
  return listeningItems.filter((i) => i.type === type);
}
