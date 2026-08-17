"use client";
import * as React from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth-context";
import type { Database } from "@/lib/supabase/database.types";

type TableName = keyof Database["public"]["Tables"];

/** Generic hook: loads all rows owned by the current user from a table, with local mutate helpers.
 * Internally untyped against the query builder (supabase-js struggles to infer generic table names);
 * the public surface stays typed via the Row/Insert/Update generics below. */
export function useUserTable<T extends TableName>(table: T) {
  const { user } = useAuth();
  const supabase = React.useMemo(() => createClient(), []);
  const db = supabase as unknown as {
    from: (t: string) => any; // eslint-disable-line @typescript-eslint/no-explicit-any
  };
  type Row = Database["public"]["Tables"][T]["Row"];
  type Insert = Database["public"]["Tables"][T]["Insert"];
  type Update = Database["public"]["Tables"][T]["Update"];
  const [rows, setRows] = React.useState<Row[]>([]);
  const [loading, setLoading] = React.useState(true);

  const refetch = React.useCallback(async () => {
    if (!user) {
      setRows([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error } = await db.from(table).select("*").eq("user_id", user.id);
    if (!error && data) setRows(data as Row[]);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, user]);

  React.useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, table]);

  const insert = React.useCallback(
    async (row: Insert) => {
      if (!user) return null;
      const { data, error } = await db
        .from(table)
        .insert({ ...row, user_id: user.id })
        .select()
        .single();
      if (!error && data) {
        setRows((prev) => [...prev, data as Row]);
        return data as Row;
      }
      return null;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [table, user],
  );

  const upsert = React.useCallback(
    async (row: Insert, conflictCols: string) => {
      if (!user) return null;
      const { data, error } = await db
        .from(table)
        .upsert({ ...row, user_id: user.id }, { onConflict: conflictCols })
        .select()
        .single();
      if (!error && data) {
        const typed = data as Row & { id: string };
        setRows((prev) => {
          const idx = prev.findIndex((r) => (r as unknown as { id: string }).id === typed.id);
          if (idx >= 0) {
            const next = [...prev];
            next[idx] = typed;
            return next;
          }
          return [...prev, typed];
        });
        return typed;
      }
      return null;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [table, user],
  );

  const update = React.useCallback(
    async (id: string, patch: Update) => {
      const { data, error } = await db.from(table).update(patch).eq("id", id).select().single();
      if (!error && data) {
        setRows((prev) => prev.map((r) => ((r as unknown as { id: string }).id === id ? (data as Row) : r)));
        return data as Row;
      }
      return null;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [table],
  );

  const remove = React.useCallback(
    async (id: string) => {
      const { error } = await db.from(table).delete().eq("id", id);
      if (!error) {
        setRows((prev) => prev.filter((r) => (r as unknown as { id: string }).id !== id));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [table],
  );

  return { rows, loading, refetch, insert, upsert, update, remove };
}
