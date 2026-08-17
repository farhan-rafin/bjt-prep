"use client";
import * as React from "react";

export function useStudyTimer(plannedMinutes: number) {
  const [elapsedSec, setElapsedSec] = React.useState(0);
  const [running, setRunning] = React.useState(false);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  React.useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setElapsedSec((s) => s + 1), 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const plannedSec = plannedMinutes * 60;
  const remainingSec = Math.max(0, plannedSec - elapsedSec);

  return {
    elapsedSec,
    remainingSec,
    running,
    plannedSec,
    start: () => setRunning(true),
    pause: () => setRunning(false),
    resume: () => setRunning(true),
    reset: () => {
      setRunning(false);
      setElapsedSec(0);
    },
    finishEarly: () => setRunning(false),
  };
}

export function formatClock(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
