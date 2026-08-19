"use client";
import * as React from "react";

/** Wraps the browser's built-in Web Speech API for free Japanese text-to-speech —
 * no audio files, no external service. Falls back silently where unsupported. */
export function useSpeech() {
  const [speaking, setSpeaking] = React.useState(false);
  const [supported, setSupported] = React.useState(false);

  React.useEffect(() => {
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window);
  }, []);

  const speak = React.useCallback((text: string, opts?: { rate?: number }) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    utterance.rate = opts?.rate ?? 0.9;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }, []);

  const stop = React.useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setSpeaking(false);
  }, []);

  /** Speaks several lines back-to-back with a short gap, the way a dialogue would play on the real exam. */
  const speakSequence = React.useCallback(async (texts: string[], opts?: { rate?: number; gapMs?: number }) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    setSpeaking(true);
    for (const text of texts) {
      await new Promise<void>((resolve) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "ja-JP";
        utterance.rate = opts?.rate ?? 0.9;
        utterance.onend = () => resolve();
        utterance.onerror = () => resolve();
        window.speechSynthesis.speak(utterance);
      });
      await new Promise((r) => setTimeout(r, opts?.gapMs ?? 400));
    }
    setSpeaking(false);
  }, []);

  return { speak, speakSequence, stop, speaking, supported };
}
