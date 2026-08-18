export function relativeDueLabel(dueAt: string | null): { label: string; overdue: boolean } {
  if (!dueAt) return { label: "—", overdue: false };
  const due = new Date(dueAt);
  const now = new Date();
  const diffMs = due.getTime() - now.getTime();
  const diffDays = Math.round(diffMs / 86400000);

  if (diffDays < 0) return { label: `Overdue ${Math.abs(diffDays)}d`, overdue: true };
  if (diffDays === 0) return { label: "Due today", overdue: false };
  if (diffDays === 1) return { label: "Due tomorrow", overdue: false };
  if (diffDays <= 7) return { label: `Due in ${diffDays}d`, overdue: false };
  return { label: `Due ${due.toLocaleDateString(undefined, { month: "short", day: "numeric" })}`, overdue: false };
}
