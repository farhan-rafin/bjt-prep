import { DayNumber } from "./types";

// Source: Part 6 — Four-Day Study System
export const daySpine: Record<DayNumber, { title: string; why: string }> = {
  1: { title: "Foundation", why: "Build the raw material the other days use.", },
  2: { title: "Listening & Business Situations", why: "Your #1 weakness gets a dedicated day." },
  3: { title: "Reading & Keigo", why: "Speed + register, the two Reading-section keys." },
  4: { title: "BJT & Weekly Test", why: "Apply everything under test conditions." },
};

export const daySpineLong: Record<DayNumber, string> = {
  1: "Foundation: grammar + vocab + kanji (+ short listen)",
  2: "Listening + business situations + shadowing",
  3: "Reading + keigo + workplace communication",
  4: "BJT practice + mixed review + weekly test",
};

export type DurationOption = 2 | 3 | 4 | 5;

export interface TimeBlock {
  label: string;
  minutes: Record<DurationOption, number>;
}

// Source: Part 6 — Time-boxed versions of each day (minutes per block)
export const dayBlocks: Record<DayNumber, TimeBlock[]> = {
  1: [
    { label: "Warm-up review (Anki)", minutes: { 2: 15, 3: 20, 4: 25, 5: 30 } },
    { label: "Grammar (new patterns)", minutes: { 2: 35, 3: 45, 4: 55, 5: 70 } },
    { label: "Vocabulary (new + drill)", minutes: { 2: 30, 3: 45, 4: 55, 5: 70 } },
    { label: "Kanji recognition", minutes: { 2: 20, 3: 30, 4: 40, 5: 50 } },
    { label: "Short listening (must-do)", minutes: { 2: 20, 3: 30, 4: 35, 5: 50 } },
    { label: "Log + tomorrow prep", minutes: { 2: 0, 3: 10, 4: 10, 5: 30 } },
  ],
  2: [
    { label: "Anki listening cards", minutes: { 2: 15, 3: 20, 4: 25, 5: 30 } },
    { label: "Intensive listening", minutes: { 2: 45, 3: 60, 4: 75, 5: 90 } },
    { label: "Business-situation dialogue study", minutes: { 2: 25, 3: 35, 4: 45, 5: 60 } },
    { label: "Shadowing", minutes: { 2: 25, 3: 35, 4: 45, 5: 60 } },
    { label: "Real-life mission review", minutes: { 2: 10, 3: 10, 4: 10, 5: 30 } },
  ],
  3: [
    { label: "Anki keigo/vocab", minutes: { 2: 15, 3: 20, 4: 25, 5: 30 } },
    { label: "Reading speed drill", minutes: { 2: 35, 3: 45, 4: 55, 5: 70 } },
    { label: "Keigo situation study", minutes: { 2: 30, 3: 45, 4: 55, 5: 70 } },
    { label: "Workplace communication module", minutes: { 2: 25, 3: 35, 4: 45, 5: 60 } },
    { label: "Short listening (must-do)", minutes: { 2: 15, 3: 25, 4: 30, 5: 50 } },
  ],
  4: [
    { label: "Anki full review", minutes: { 2: 15, 3: 20, 4: 25, 5: 30 } },
    { label: "BJT question sets (by type)", minutes: { 2: 45, 3: 60, 4: 75, 5: 95 } },
    { label: "Weekly test (all skills)", minutes: { 2: 30, 3: 40, 4: 50, 5: 60 } },
    { label: "Error analysis + mistake log", minutes: { 2: 20, 3: 35, 4: 45, 5: 65 } },
    { label: "Plan next week", minutes: { 2: 10, 3: 15, 4: 15, 5: 30 } },
  ],
};

export const durationOutcomes: Record<DurationOption, { label: string; totalHours: number; outcome: string }> = {
  2: { label: "2h", totalHours: 208, outcome: "J3, maybe low J2 on a good day. Risky." },
  3: { label: "3h Recommended", totalHours: 312, outcome: "Solid J2 with disciplined listening. This is the target." },
  4: { label: "4h", totalHours: 416, outcome: "Comfortable J2, upper end of the band." },
  5: { label: "5h Intensive", totalHours: 520, outcome: "J2 secured, outside chance at low J1 if listening clicks early." },
};

export function totalMinutesForDay(day: DayNumber, duration: DurationOption) {
  return dayBlocks[day].reduce((sum, b) => sum + b.minutes[duration], 0);
}
