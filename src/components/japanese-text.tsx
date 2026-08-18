"use client";
import * as React from "react";
import { vocabulary, kanjiItems, keigoPhrases } from "@/content";

/** Word/phrase with its own reading — shown as furigana (ruby) above the text. */
export function Furigana({ text, reading, className }: { text: string; reading?: string | null; className?: string }) {
  if (!reading) return <span className={className}>{text}</span>;
  return (
    <ruby className={className}>
      {text}
      <rt className="text-[0.55em] font-normal text-muted-foreground">{reading}</rt>
    </ruby>
  );
}

interface DictEntry {
  text: string;
  reading: string;
}

let dictionaryCache: DictEntry[] | null = null;
function buildDictionary(): DictEntry[] {
  if (dictionaryCache) return dictionaryCache;
  const entries: DictEntry[] = [];
  vocabulary.forEach((v) => entries.push({ text: v.japanese, reading: v.reading }));
  keigoPhrases.forEach((k) => entries.push({ text: k.phrase, reading: k.reading }));
  kanjiItems.forEach((k) => entries.push({ text: k.kanji, reading: k.reading.split(" / ")[0] }));
  // Longest text first so multi-character words are matched before single kanji inside them.
  entries.sort((a, b) => b.text.length - a.text.length);
  dictionaryCache = entries;
  return entries;
}

/** Renders Japanese text with furigana auto-applied over any word/kanji we have a reading for
 * (matched against the vocabulary/keigo/kanji content). Words we don't recognise render plainly —
 * partial coverage beats none, since this app has no offline dictionary for arbitrary text. */
export function JapaneseAuto({ text, className }: { text: string; className?: string }) {
  const dict = buildDictionary();
  const nodes: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  outer: while (i < text.length) {
    for (const entry of dict) {
      if (entry.text.length > 0 && text.startsWith(entry.text, i)) {
        nodes.push(<Furigana key={key++} text={entry.text} reading={entry.reading} />);
        i += entry.text.length;
        continue outer;
      }
    }
    nodes.push(text[i]);
    i += 1;
  }

  return <span className={className ? className + " jp" : "jp"}>{nodes}</span>;
}
