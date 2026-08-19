/**
 * Furigana alignment.
 *
 * Given a sentence and its full kana reading, work out which part of the reading belongs to
 * each kanji. The kana already present in the sentence act as anchors: everything between two
 * anchors must be the reading of the kanji sitting between them.
 *
 *   今日は仕事が忙しいです。  +  きょうはしごとがいそがしいです。
 *   → 今日=きょう  仕事=しごと  忙=いそが
 *
 * This is why it beats a dictionary lookup: the reading comes from THIS sentence, so 月 gets
 * げつ in 来月 and がつ in 6月 without needing either to be a known word — and rare words like
 * 忙しい are covered without appearing in any word list.
 */

export interface FuriganaSegment {
  text: string;
  /** Undefined for kana/punctuation that needs no ruby. */
  reading?: string;
}

const KANJI = /[一-龯㐀-䶿豈-﫿々〆ヶ〇]/;
const DIGIT = /[0-9０-９]/;
const LATIN = /[A-Za-zＡ-Ｚａ-ｚ]/;

/**
 * Symbols that are SPOKEN rather than read literally, so they belong to the run they sit in:
 *   3,000円 → さんぜんえん (comma silent)   20% → にじゅっパーセント
 *   9:00 → くじ                        4月1日〜5日 → …から…
 *   ＋8% → プラスはちパーセント         W-215 → ダブリューにひゃくじゅうご
 * ー (katakana long vowel) is deliberately absent — it is literal, as in コーヒー.
 */
const SPOKEN_SYMBOL = /[,.:%％＋+〜～~\-－−]/;

/** Characters that carry a spoken reading distinct from their written form. */
function needsReading(ch: string): boolean {
  return KANJI.test(ch) || DIGIT.test(ch) || LATIN.test(ch) || SPOKEN_SYMBOL.test(ch);
}

/** Katakana → hiragana, so かな anchors match however the sentence writes them. */
export function kataToHira(s: string): string {
  return s.replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60));
}

/** Normalises a literal chunk for anchor matching: kana folded, width-variant spaces dropped. */
function normalise(s: string): string {
  return kataToHira(s).replace(/\s+/g, "");
}

interface Token {
  text: string;
  needs: boolean;
}

function tokenise(text: string): Token[] {
  const raw: Token[] = [];
  let i = 0;
  while (i < text.length) {
    const needs = needsReading(text[i]);
    let j = i;
    while (j < text.length && needsReading(text[j]) === needs) j++;
    raw.push({ text: text.slice(i, j), needs });
    i = j;
  }

  // Whitespace carries no sound, so it can't anchor anything. Where it's the only thing between
  // two kanji runs — common in schedules ("9:00 東京駅") and multi-line notices — merge them into
  // one run instead of failing on an anchor that normalises to nothing.
  const tokens: Token[] = [];
  for (const token of raw) {
    const prev = tokens[tokens.length - 1];
    const beforePrev = tokens[tokens.length - 2];
    const isBlank = !token.needs && normalise(token.text).length === 0;

    if (isBlank && prev?.needs === false) {
      prev.text += token.text; // blank run merges into the literal before it
      continue;
    }
    if (token.needs && prev && !prev.needs && normalise(prev.text).length === 0 && beforePrev?.needs) {
      beforePrev.text += prev.text + token.text;
      tokens.pop();
      continue;
    }
    tokens.push({ ...token });
  }
  return tokens;
}

/**
 * Splits `text` into segments, attaching the matching slice of `reading` to each kanji run.
 * Returns a single unannotated segment when the reading can't be aligned — a wrong reading is
 * worse than none, so ambiguity degrades to plain text rather than guessing.
 */
export function alignFurigana(text: string, reading?: string | null): FuriganaSegment[] {
  if (!reading) return [{ text }];

  const tokens = tokenise(text);
  const normReading = normalise(reading);
  const segments: FuriganaSegment[] = [];

  // Pointer into the ORIGINAL reading, kept in step with a pointer into the normalised copy.
  // Both advance together because normalise() only folds characters 1:1 and strips whitespace,
  // so we track the raw index separately to slice out un-normalised readings.
  let rawPos = 0;
  let normPos = 0;

  /** Advances rawPos so that it has consumed `count` normalised characters. */
  function advanceRaw(count: number) {
    let consumed = 0;
    while (rawPos < reading!.length && consumed < count) {
      const ch = reading![rawPos];
      rawPos++;
      if (!/\s/.test(ch)) consumed++;
    }
    normPos += count;
  }

  for (let t = 0; t < tokens.length; t++) {
    const token = tokens[t];

    if (!token.needs) {
      // Literal chunk — it must appear next in the reading.
      const literal = normalise(token.text);
      if (literal.length === 0) {
        segments.push({ text: token.text });
        continue;
      }
      const at = normReading.indexOf(literal, normPos);
      if (at !== normPos) return [{ text }]; // out of sync — bail
      advanceRaw(literal.length);
      segments.push({ text: token.text });
      continue;
    }

    // Kanji run: its reading ends where the following literal chunk begins.
    const next = tokens[t + 1];
    if (!next) {
      const rest = reading.slice(rawPos);
      if (!rest) return [{ text }];
      segments.push({ text: token.text, reading: rest });
      rawPos = reading.length;
      normPos = normReading.length;
      continue;
    }

    const anchor = normalise(next.text);
    if (anchor.length === 0) return [{ text }];

    // Each character in the run must own at least one kana, so start the search past that
    // minimum. Without this, 話は / はなしは would match は at index 0 and leave 話 empty.
    const minimum = normPos + token.text.length;
    const at = normReading.indexOf(anchor, minimum);
    if (at === -1) return [{ text }];

    const startRaw = rawPos;
    advanceRaw(at - normPos);
    const runReading = reading.slice(startRaw, rawPos);
    if (!runReading) return [{ text }];
    segments.push({ text: token.text, reading: runReading });
  }

  // Every kana in the reading must have been accounted for.
  if (normPos !== normReading.length) return [{ text }];

  return segments;
}

/** True when the reading could be fully aligned to the text. Used by the content self-check. */
export function canAlign(text: string, reading?: string | null): boolean {
  if (!reading) return false;
  const segs = alignFurigana(text, reading);
  if (segs.length === 1 && segs[0].reading === undefined && needsReadingAnywhere(text)) return false;
  return true;
}

function needsReadingAnywhere(text: string): boolean {
  return [...text].some(needsReading);
}
