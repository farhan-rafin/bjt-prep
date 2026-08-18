// PRACTICE — Part II style items: a document/chart the learner reads, plus a spoken
// constraint (played via TTS) that filters it. Mirrors "Information Listening & Reading"
// (情報聴解) — the BJT question type the source document flags as commonly neglected.
export interface CombinedItem {
  id: string;
  title: string;
  tableHeaders: string[];
  tableRows: string[][];
  audioClue: string;
  audioClueReading: string;
  audioClueMeaning: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const combinedItems: CombinedItem[] = [
  {
    id: "ci1",
    title: "会議室予約表",
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
    options: ["第一会議室", "第二会議室", "第三会議室", "空いている部屋はない"],
    correctIndex: 2,
    explanation: "You need a room free at 13:00-15:00 AND seating at least 8. 第一会議室 is 使用中 (in use) at that time — excluded. 第二会議室 is free then, but only seats 6 — too small. 第三会議室 is free 13:00-15:00 and seats 20 — the only room satisfying both the audio constraint (time + headcount) and the table. This is the classic Part II trap: the audio adds a condition (headcount + time) that you must apply to the table yourself.",
  },
  {
    id: "ci2",
    title: "出張旅費規程（抜粋）",
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
    options: ["2,000円", "3,000円", "5,000円", "10,000円"],
    correctIndex: 1,
    explanation: "The audio updates the plan from day-trip to overnight (国内宿泊) — so the applicable 日当 (per diem) is the overnight-domestic rate, 3,000円, not the day-trip rate. When audio and the original plan conflict, the spoken update wins.",
  },
];
