import { Resource, YoutubeResource } from "./types";

// Source: Part 17 — Study Materials (Core Set), all URLs verbatim from the document
export const resources: Resource[] = [
  {
    id: "r-official-guide", name: "BJT公式ガイド（改訂版） — Official Guide", type: "Official BJT", tier: "essential",
    level: "All", when: "Month 1, and revisit before mocks.",
    how: "Read cover-to-cover once; use samples as first benchmark.",
    cost: "~¥1,238 +tax", where: "Kanken online shop / Amazon.co.jp / large bookstores",
    url: "https://www.kanken.or.jp/bjt/english/book/", badge: "OFFICIAL",
  },
  {
    id: "r-practice-test", name: "BJT体験テストと解説（改訂版） — Practice Test & Explanations", type: "Official BJT", tier: "essential",
    level: "All", when: "Months 4–6 for mocks.",
    how: "Use for your full-length mocks; mine the explanations.",
    cost: "~¥1,800 +tax", where: "Kanken shop / Amazon.co.jp",
    url: "https://www.kanken.or.jp/bjt/english/book/", badge: "OFFICIAL",
  },
  {
    id: "r-nippon-kaisha", name: "BJT Official Practice Test & Guide (にっぽんのカイシャ)", type: "Official BJT", tier: "essential",
    level: "All", when: "Months 3–6.",
    how: "Extra question bank + business-culture context.",
    cost: "~¥1,870", where: "Kanken shop / audiobook.jp for audio",
    url: "https://www.kanken.or.jp/bjt/english/book/", badge: "OFFICIAL",
  },
  {
    id: "r-genki", name: "Genki I & II (or Minna no Nihongo)", type: "Textbook", tier: "recommended",
    level: "N5→N4/N3", when: "Months 1–3, foundation only.",
    how: "Do only the grammar/vocab that appears in this plan; skip the rest.",
    cost: "~¥3,000 each", where: "Amazon.co.jp / any bookstore / Junkudo, Kinokuniya",
    url: "https://genki3.japantimes.co.jp/en/", badge: "EXTERNAL",
  },
  {
    id: "r-shinkanzen", name: "Shin Kanzen Master / Try! (N4→N3 grammar)", type: "Grammar", tier: "recommended",
    level: "N4→N3", when: "Months 2–4.",
    how: "Use as a lookup for the \"Important\" patterns in the Grammar Library.",
    cost: "~¥1,300–1,700", where: "Amazon.co.jp / bookstores",
    url: "https://www.3anet.co.jp/", badge: "EXTERNAL",
  },
  {
    id: "r-anki", name: "Anki (SRS app)", type: "App", tier: "essential",
    level: "All", when: "Daily, all 6 months.",
    how: "Five decks: high-frequency, business vocab, business phrases, keigo, kanji compounds.",
    cost: "Free (PC/Android) / paid iOS", where: "apps.ankiweb.net",
    url: "https://apps.ankiweb.net/", badge: "EXTERNAL",
  },
  {
    id: "r-jisho", name: "Jisho.org (dictionary)", type: "Dictionary", tier: "essential",
    level: "All", when: "Daily.",
    how: "Look up unknowns from listening/reading; grab example sentences for cards.",
    cost: "Free", where: "Web",
    url: "https://jisho.org/", badge: "EXTERNAL",
  },
  {
    id: "r-shigoto", name: "しごとの日本語 / ビジネスのための日本語 (business JP textbook)", type: "Textbook", tier: "optional",
    level: "All", when: "Months 3–5.",
    how: "Supplement business-situation modules.",
    cost: "~¥2,000", where: "Amazon.co.jp / bookstores",
    url: "https://jisho.org/", badge: "EXTERNAL",
  },
  {
    id: "r-migaku", name: "Migaku browser extension", type: "App", tier: "optional",
    level: "All", when: "Optional, months 3–6.",
    how: "Mine words from business articles/videos into Anki. Only if you enjoy reading native business articles.",
    cost: "Subscription", where: "migaku.com",
    url: "https://migaku.com/", badge: "EXTERNAL",
  },
  {
    id: "r-nhk-easy", name: "NHK NEWS WEB EASY (やさしい日本語)", type: "Listening", tier: "recommended",
    level: "All", when: "Throughout, for reading-speed/scanning practice.",
    how: "Real news rewritten simply — great for scanning practice.",
    cost: "Free", where: "Web",
    url: "https://www3.nhk.or.jp/news/easy/", badge: "EXTERNAL",
  },
];

export const nonNegotiableResources = [
  "r-official-guide", "r-practice-test", "r-anki", "r-jisho",
];

// Source: Part 12 & Part 18 — verified listening/YouTube resources
export const youtubeResources: YoutubeResource[] = [
  { id: "y-jpod101", channel: "JapanesePod101", url: "https://www.youtube.com/@JapanesePod101", difficulty: "N5 → business", when: "All months", method: "Start with beginner listening; move to business/keigo playlists by month 3. From month 3, search the channel for \"business Japanese\", \"keigo\", \"phone\"." },
  { id: "y-mori", channel: "Nihongo no Mori (日本語の森)", url: "https://www.youtube.com/@nihongonomori2013", difficulty: "N4 → N1", when: "Months 2–5", method: "Watch grammar + keigo explainers; treat the Japanese explanation as listening practice. Search within the channel for keigo / ビジネス日本語 / 電話 / 敬語." },
  { id: "y-cij", channel: "Comprehensible Japanese", url: "https://www.youtube.com/@cijapanese", difficulty: "Beginner+", when: "Months 1–2 daily", method: "Watch \"Complete Beginner\"/\"Beginner\" tier without English subs; rewatch once. Ear-training." },
  { id: "y-attain", channel: "Attain Online Japanese", url: "https://www.youtube.com/@attainonline", difficulty: "N5 → business", when: "Months 3–5", method: "Use free business-roleplay clips for workplace/phone situations; shadow them." },
  { id: "y-misa", channel: "Japanese Ammo with Misa", url: "https://www.youtube.com/@JapaneseAmmowithMisa", difficulty: "N5 → N3", when: "Months 1–3", method: "Grammar deep-dives in English; use for the \"Critical/Important\" patterns in the Grammar Library." },
  { id: "y-gamegengo", channel: "Game Gengo", url: "https://www.youtube.com/@gamegengo", difficulty: "N5 → N3", when: "Months 1–3", method: "Clear grammar summaries; quick reference for a pattern before drilling." },
  { id: "y-teppei", channel: "Nihongo con Teppei (podcast)", url: "https://nihongoconteppei.com/", difficulty: "Beginner → intermediate", when: "Daily", method: "One episode on commute/before shift; shadow favourites." },
  { id: "y-bjt-samples", channel: "Official BJT (Kanken) samples", url: "https://www.kanken.or.jp/bjt/english/sample/sample01.html", difficulty: "Exam", when: "Monthly", method: "Not YouTube, but essential audio — use as the calibration benchmark." },
];
