"use client";
import * as React from "react";

function playChime() {
  if (typeof window === "undefined") return;
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioContextClass();
    [880, 1108].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + i * 0.18 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.18 + 0.35);
      osc.connect(gain).connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.18);
      osc.stop(ctx.currentTime + i * 0.18 + 0.4);
    });
    setTimeout(() => ctx.close(), 1200);
  } catch {
    // Web Audio unsupported/blocked — silently skip, visual alert still shows.
  }
}

export function useStudyTimer(plannedMinutes: number) {
  const [elapsedSec, setElapsedSec] = React.useState(0);
  const [running, setRunning] = React.useState(false);
  const [justFinished, setJustFinished] = React.useState(false);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const firedRef = React.useRef(false);

  const plannedSec = plannedMinutes * 60;

  React.useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setElapsedSec((s) => {
          const next = s + 1;
          if (next >= plannedSec && !firedRef.current && plannedSec > 0) {
            firedRef.current = true;
            setJustFinished(true);
            playChime();
            if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
              new Notification("Time's up", { body: "Your study block finished — confirm or continue." });
            }
          }
          return next;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, plannedSec]);

  const remainingSec = Math.max(0, plannedSec - elapsedSec);

  return {
    elapsedSec,
    remainingSec,
    running,
    plannedSec,
    justFinished,
    dismissFinished: () => setJustFinished(false),
    start: () => setRunning(true),
    pause: () => setRunning(false),
    resume: () => setRunning(true),
    reset: () => {
      setRunning(false);
      setElapsedSec(0);
      firedRef.current = false;
      setJustFinished(false);
    },
    finishEarly: () => setRunning(false),
  };
}

export function formatClock(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
