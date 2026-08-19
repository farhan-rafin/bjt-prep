// Compounds that appear throughout the app's Japanese text but aren't entries in the
// vocabulary list. Without these, the auto-furigana engine would fall back to reading each
// kanji separately — and a single kanji's reading is usually WRONG inside a compound
// (月 is つき alone but げつ in 来月 and がつ in 6月). A wrong reading teaches the wrong thing,
// so the engine only applies furigana to multi-character entries it actually knows.

export interface FuriganaEntry {
  text: string;
  reading: string;
}

export const furiganaExtras: FuriganaEntry[] = [
  // Time
  { text: "来月", reading: "らいげつ" }, { text: "先月", reading: "せんげつ" }, { text: "今月", reading: "こんげつ" },
  { text: "来週", reading: "らいしゅう" }, { text: "先週", reading: "せんしゅう" }, { text: "今週", reading: "こんしゅう" },
  { text: "来年", reading: "らいねん" }, { text: "昨年", reading: "さくねん" }, { text: "今年", reading: "ことし" },
  { text: "本日", reading: "ほんじつ" }, { text: "翌日", reading: "よくじつ" }, { text: "前日", reading: "ぜんじつ" },
  { text: "当日", reading: "とうじつ" }, { text: "毎日", reading: "まいにち" }, { text: "初日", reading: "しょにち" },
  { text: "最終日", reading: "さいしゅうび" }, { text: "終日", reading: "しゅうじつ" }, { text: "半日", reading: "はんにち" },
  { text: "午前中", reading: "ごぜんちゅう" }, { text: "年末年始", reading: "ねんまつねんし" },
  { text: "月曜日", reading: "げつようび" }, { text: "火曜日", reading: "かようび" }, { text: "水曜日", reading: "すいようび" },
  { text: "木曜日", reading: "もくようび" }, { text: "金曜日", reading: "きんようび" }, { text: "土曜日", reading: "どようび" },
  { text: "日曜日", reading: "にちようび" }, { text: "平日", reading: "へいじつ" }, { text: "祝日", reading: "しゅくじつ" },
  { text: "期間中", reading: "きかんちゅう" }, { text: "四半期", reading: "しはんき" }, { text: "日程", reading: "にってい" },

  // Company / people
  { text: "御社", reading: "おんしゃ" }, { text: "弊社", reading: "へいしゃ" }, { text: "当社", reading: "とうしゃ" },
  { text: "本社", reading: "ほんしゃ" }, { text: "支店", reading: "してん" }, { text: "支社", reading: "ししゃ" },
  { text: "社内", reading: "しゃない" }, { text: "社外", reading: "しゃがい" }, { text: "各部署", reading: "かくぶしょ" },
  { text: "部署", reading: "ぶしょ" }, { text: "責任者", reading: "せきにんしゃ" }, { text: "管理職", reading: "かんりしょく" },
  { text: "新入社員", reading: "しんにゅうしゃいん" }, { text: "先方", reading: "せんぽう" }, { text: "各自", reading: "かくじ" },
  { text: "皆様", reading: "みなさま" }, { text: "役員", reading: "やくいん" }, { text: "役員会", reading: "やくいんかい" },
  { text: "情報システム部", reading: "じょうほうシステムぶ" }, { text: "総務部", reading: "そうむぶ" },
  { text: "経理部", reading: "けいりぶ" }, { text: "人事部", reading: "じんじぶ" }, { text: "営業部", reading: "えいぎょうぶ" },
  { text: "商品企画部", reading: "しょうひんきかくぶ" }, { text: "研修担当", reading: "けんしゅうたんとう" },

  // Places
  { text: "会議室", reading: "かいぎしつ" }, { text: "大会議室", reading: "だいかいぎしつ" },
  { text: "第一会議室", reading: "だいいちかいぎしつ" }, { text: "第二会議室", reading: "だいにかいぎしつ" },
  { text: "第三会議室", reading: "だいさんかいぎしつ" }, { text: "応接室", reading: "おうせつしつ" },
  { text: "休憩スペース", reading: "きゅうけいスペース" }, { text: "社員食堂", reading: "しゃいんしょくどう" },
  { text: "駐車場", reading: "ちゅうしゃじょう" }, { text: "非常階段", reading: "ひじょうかいだん" },
  { text: "市民会館", reading: "しみんかいかん" }, { text: "講堂", reading: "こうどう" },

  // Documents / process
  { text: "書類", reading: "しょるい" }, { text: "見積書", reading: "みつもりしょ" }, { text: "請求書", reading: "せいきゅうしょ" },
  { text: "報告書", reading: "ほうこくしょ" }, { text: "申請書", reading: "しんせいしょ" }, { text: "領収書", reading: "りょうしゅうしょ" },
  { text: "議事録", reading: "ぎじろく" }, { text: "添付", reading: "てんぷ" }, { text: "記入", reading: "きにゅう" },
  { text: "掲示", reading: "けいじ" }, { text: "通知", reading: "つうち" }, { text: "案内", reading: "あんない" },
  { text: "手続き", reading: "てつづき" }, { text: "規定", reading: "きてい" }, { text: "規則", reading: "きそく" },

  // Business actions
  { text: "移転", reading: "いてん" }, { text: "延期", reading: "えんき" }, { text: "前倒し", reading: "まえだおし" },
  { text: "訂正", reading: "ていせい" }, { text: "修正", reading: "しゅうせい" }, { text: "調整", reading: "ちょうせい" },
  { text: "検討", reading: "けんとう" }, { text: "再検討", reading: "さいけんとう" }, { text: "見送り", reading: "みおくり" },
  { text: "実施", reading: "じっし" }, { text: "開催", reading: "かいさい" }, { text: "参加", reading: "さんか" },
  { text: "申込", reading: "もうしこみ" }, { text: "受付", reading: "うけつけ" }, { text: "停止", reading: "ていし" },
  { text: "点検", reading: "てんけん" }, { text: "工事", reading: "こうじ" }, { text: "閉鎖", reading: "へいさ" },
  { text: "休業", reading: "きゅうぎょう" }, { text: "営業時間", reading: "えいぎょうじかん" },
  { text: "出社", reading: "しゅっしゃ" }, { text: "退社", reading: "たいしゃ" }, { text: "外出", reading: "がいしゅつ" },
  { text: "在宅勤務", reading: "ざいたくきんむ" }, { text: "有給休暇", reading: "ゆうきゅうきゅうか" },
  { text: "防災訓練", reading: "ぼうさいくんれん" }, { text: "健康診断", reading: "けんこうしんだん" },
  { text: "避難", reading: "ひなん" }, { text: "入荷", reading: "にゅうか" }, { text: "出荷", reading: "しゅっか" },
  { text: "在庫切れ", reading: "ざいこぎれ" }, { text: "品質", reading: "ひんしつ" }, { text: "部品", reading: "ぶひん" },
  { text: "調達", reading: "ちょうたつ" }, { text: "発売", reading: "はつばい" }, { text: "掲載", reading: "けいさい" },
  { text: "広告", reading: "こうこく" }, { text: "契約", reading: "けいやく" }, { text: "予算", reading: "よさん" },
  { text: "経費", reading: "けいひ" }, { text: "精算", reading: "せいさん" }, { text: "割引", reading: "わりびき" },
  { text: "上限", reading: "じょうげん" }, { text: "定員", reading: "ていいん" }, { text: "収容人数", reading: "しゅうようにんずう" },
  { text: "人数", reading: "にんずう" }, { text: "私物", reading: "しぶつ" }, { text: "持ち物", reading: "もちもの" },
  { text: "持参", reading: "じさん" }, { text: "補充", reading: "ほじゅう" }, { text: "用紙", reading: "ようし" },
  { text: "協力", reading: "きょうりょく" }, { text: "遠慮", reading: "えんりょ" }, { text: "都合", reading: "つごう" },
  { text: "先約", reading: "せんやく" }, { text: "一存", reading: "いちぞん" }, { text: "差し支え", reading: "さしつかえ" },
  { text: "表彰式", reading: "ひょうしょうしき" }, { text: "懇親会", reading: "こんしんかい" },
  { text: "展示会", reading: "てんじかい" }, { text: "見学", reading: "けんがく" }, { text: "訪問", reading: "ほうもん" },
  { text: "送迎バス", reading: "そうげいバス" }, { text: "新幹線", reading: "しんかんせん" },
  { text: "服装", reading: "ふくそう" }, { text: "着用", reading: "ちゃくよう" }, { text: "自由参加", reading: "じゆうさんか" },
];
