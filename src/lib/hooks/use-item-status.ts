"use client";
import * as React from "react";
import { useUserTable } from "./use-user-table";

type StatusTable = "vocab_status" | "kanji_status" | "grammar_status";

export function useItemStatus(table: StatusTable, idKey: "vocab_id" | "kanji_id" | "grammar_id") {
  const { rows, upsert } = useUserTable(table);

  const map = React.useMemo(() => {
    const m = new Map<string, { status: string; is_bookmarked: boolean }>();
    rows.forEach((r) => {
      const row = r as unknown as Record<string, unknown>;
      m.set(row[idKey] as string, {
        status: (row.status as string) ?? "new",
        is_bookmarked: (row.is_bookmarked as boolean) ?? false,
      });
    });
    return m;
  }, [rows, idKey]);

  const setStatus = React.useCallback(
    async (id: string, status: string) => {
      await upsert({ [idKey]: id, status } as never, `user_id,${idKey}`);
    },
    [upsert, idKey],
  );

  const toggleBookmark = React.useCallback(
    async (id: string) => {
      const current = map.get(id)?.is_bookmarked ?? false;
      await upsert({ [idKey]: id, is_bookmarked: !current } as never, `user_id,${idKey}`);
    },
    [upsert, idKey, map],
  );

  return { map, setStatus, toggleBookmark };
}
