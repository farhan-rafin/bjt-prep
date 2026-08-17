// Simplified SM-2-style scheduler. Deliberately not a full Anki clone — see Part 21 of the brief.
export type Rating = "again" | "hard" | "good" | "easy";

export interface SrsState {
  interval_days: number;
  ease: number;
  repetitions: number;
  state: "new" | "young" | "mature" | "difficult";
}

export function nextSrsState(current: SrsState, rating: Rating): SrsState & { due_at: string } {
  let { interval_days, ease, repetitions } = current;

  if (rating === "again") {
    repetitions = 0;
    interval_days = 0.5; // ~12h
    ease = Math.max(1.3, ease - 0.2);
  } else {
    repetitions += 1;
    if (rating === "hard") ease = Math.max(1.3, ease - 0.15);
    if (rating === "easy") ease = ease + 0.15;

    if (repetitions === 1) interval_days = 1;
    else if (repetitions === 2) interval_days = 3;
    else interval_days = Math.round(interval_days * ease);
  }

  const state: SrsState["state"] =
    rating === "again" ? "difficult" : interval_days >= 21 ? "mature" : interval_days >= 1 ? "young" : "new";

  const due = new Date();
  due.setTime(due.getTime() + interval_days * 86400000);

  return { interval_days, ease, repetitions, state, due_at: due.toISOString() };
}

export const defaultSrsState: SrsState = { interval_days: 0, ease: 2.5, repetitions: 0, state: "new" };
