import {
  LayoutDashboard, Sunrise, Map, BookMarked, Type, SpellCheck, MessageSquareQuote,
  Headphones, BookOpen, Target, Layers, ClipboardCheck, AlertTriangle, Library,
  NotebookPen, LineChart, CalendarClock, ListChecks, Settings, Flag,
} from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
}

export const mainNav: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/today", label: "Today", icon: Sunrise },
  { href: "/journey", label: "24-Week Journey", icon: Map },
  { href: "/vocabulary", label: "Vocabulary", icon: BookMarked },
  { href: "/kanji", label: "Kanji", icon: Type },
  { href: "/grammar", label: "Grammar", icon: SpellCheck },
  { href: "/keigo", label: "Keigo Lab", icon: MessageSquareQuote },
  { href: "/listening", label: "Listening", icon: Headphones },
  { href: "/reading", label: "Reading", icon: BookOpen },
  { href: "/bjt", label: "BJT Practice", icon: Target },
  { href: "/flashcards", label: "Flashcards", icon: Layers },
  { href: "/tests", label: "Tests", icon: ClipboardCheck },
  { href: "/mock-tests", label: "Mock Tests", icon: Flag },
  { href: "/mistakes", label: "Mistake Log", icon: AlertTriangle },
  { href: "/missions", label: "Japan Missions", icon: Flag },
  { href: "/resources", label: "Resources", icon: Library },
  { href: "/notes", label: "Notes", icon: NotebookPen },
  { href: "/progress", label: "Progress", icon: LineChart },
  { href: "/countdown", label: "Exam Countdown", icon: CalendarClock },
  { href: "/checklist", label: "J2 Checklist", icon: ListChecks },
];

export const mobilePrimaryNav: NavItem[] = [
  { href: "/today", label: "Today", icon: Sunrise },
  { href: "/journey", label: "Journey", icon: Map },
  { href: "/flashcards", label: "Cards", icon: Layers },
  { href: "/progress", label: "Progress", icon: LineChart },
];

export const settingsNav: NavItem = { href: "/settings", label: "Settings", icon: Settings };
