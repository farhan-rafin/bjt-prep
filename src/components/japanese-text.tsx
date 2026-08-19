"use client";
import * as React from "react";
import { vocabulary, keigoPhrases, keigoVerbPairs, grammarPoints, furiganaExtras } from "@/content";
import { useAuth } from "@/lib/auth-context";

/** Word/phrase with its own reading — shown as furigana (ruby) above the text.
 * Respects the learner's "Show furigana" preference (Settings) — off means Test Mode,
 * hiding readings so recognition can actually be checked. */
export function Furigana({ text, reading, className }: { text: string; reading?: string | null; className?: string }) {
  const { profile } = useAuth();
  const show = profile?.show_furigana ?? true;
  if (!reading || !show) return <span className={className}>{text}</span>;
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

/**
 * Builds the auto-furigana lookup from everything in the app that carries a verified reading.
 *
 * Deliberately MULTI-CHARACTER ONLY. A single kanji's reading shifts with the compound it sits in
 * (月 is つき alone, げつ in 来月, がつ in 6月), so falling back to per-kanji readings would print
 * confidently wrong furigana. Text we can't match with a known word is left bare instead — no
 * reading is better than a misleading one when the whole point is learning the right one.
 */
function buildDictionary(): DictEntry[] {
  if (dictionaryCache) return dictionaryCache;

  const seen = new Set<string>();
  const entries: DictEntry[] = [];
  const add = (text: string | null | undefined, reading?: string | null) => {
    if (!text || !reading) return;
    // Only multi-character entries, and only where the reading is a single unambiguous form.
    if (text.length < 2) return;
    const clean = reading.split(" / ")[0].trim();
    if (!clean || seen.has(text)) return;
    seen.add(text);
    entries.push({ text, reading: clean });
  };

  vocabulary.forEach((v) => add(v.japanese, v.reading));
  keigoPhrases.forEach((k) => add(k.phrase, k.reading));
  keigoVerbPairs.forEach((p) => {
    add(p.plain, p.plainReading);
    add(p.sonkeigo, p.sonkeigoReading);
    add(p.kenjougo, p.kenjougoReading);
  });
  grammarPoints.forEach((g) => add(g.pattern, (g as { reading?: string }).reading));
  furiganaExtras.forEach((f) => add(f.text, f.reading));

  // Longest first so 大会議室 wins over 会議室, which wins over 会議.
  entries.sort((a, b) => b.text.length - a.text.length);
  dictionaryCache = entries;
  return entries;
}

/** Exposed for coverage checks and tests. */
export function furiganaDictionarySize() {
  return buildDictionary().length;
}

/** Renders Japanese text with furigana auto-applied over any word we hold a verified reading for.
 * Unrecognised text renders plainly rather than guessing. Respects the "Show furigana" setting. */
export function JapaneseAuto({ text, className }: { text: string; className?: string }) {
  const { profile } = useAuth();
  const show = profile?.show_furigana ?? true;

  const nodes = React.useMemo(() => {
    if (!show) return null;
    const dict = buildDictionary();
    const out: React.ReactNode[] = [];
    let i = 0;
    let key = 0;
    let plain = "";

    const flush = () => {
      if (plain) {
        out.push(plain);
        plain = "";
      }
    };

    outer: while (i < text.length) {
      for (const entry of dict) {
        if (text.startsWith(entry.text, i)) {
          flush();
          out.push(<Furigana key={key++} text={entry.text} reading={entry.reading} />);
          i += entry.text.length;
          continue outer;
        }
      }
      plain += text[i];
      i += 1;
    }
    flush();
    return out;
  }, [text, show]);

  if (!show) {
    return <span className={className ? className + " jp" : "jp"}>{text}</span>;
  }

  return <span className={className ? className + " jp" : "jp"}>{nodes}</span>;
}
