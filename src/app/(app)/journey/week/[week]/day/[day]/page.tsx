import { Suspense } from "react";
import { SessionPlayer } from "@/components/session/session-player";
import type { DayNumber } from "@/content";

export default async function DaySessionPage({
  params,
}: {
  params: Promise<{ week: string; day: string }>;
}) {
  const { week, day } = await params;
  return (
    <Suspense fallback={null}>
      <SessionPlayer week={Number(week)} day={Number(day) as DayNumber} />
    </Suspense>
  );
}
