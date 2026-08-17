"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import {
  vocabulary, kanjiItems, grammarPoints, keigoPhrases, roadmap, resources,
} from "@/content";

interface Result {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  href: string;
}

function buildIndex(): Result[] {
  const results: Result[] = [];
  vocabulary.forEach((v) =>
    results.push({ id: v.id, title: `${v.japanese} (${v.reading})`, subtitle: v.meaning, type: "Vocabulary", href: `/vocabulary?q=${encodeURIComponent(v.japanese)}` }),
  );
  kanjiItems.forEach((k) =>
    results.push({ id: k.id, title: k.kanji, subtitle: `${k.reading} — ${k.meaning}`, type: "Kanji", href: `/kanji?q=${encodeURIComponent(k.kanji)}` }),
  );
  grammarPoints.forEach((g) =>
    results.push({ id: g.id, title: g.pattern, subtitle: g.meaning, type: "Grammar", href: `/grammar?q=${encodeURIComponent(g.pattern)}` }),
  );
  keigoPhrases.forEach((k) =>
    results.push({ id: k.id, title: k.phrase, subtitle: k.meaning, type: "Keigo", href: `/keigo?q=${encodeURIComponent(k.phrase)}` }),
  );
  roadmap.forEach((w) =>
    results.push({ id: `wk-${w.week}`, title: `Week ${w.week} — ${w.theme}`, subtitle: `Month ${w.month}`, type: "Week", href: `/journey/week/${w.week}` }),
  );
  resources.forEach((r) =>
    results.push({ id: r.id, title: r.name, subtitle: r.type, type: "Resource", href: `/resources?q=${encodeURIComponent(r.name)}` }),
  );
  return results;
}

const INDEX = buildIndex();

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const results = React.useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return INDEX.filter((r) => r.title.toLowerCase().includes(q) || r.subtitle.toLowerCase().includes(q)).slice(0, 20);
  }, [query]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex h-9 w-full max-w-xs items-center gap-2 rounded-full border border-border bg-surface-muted px-3 text-sm text-muted-foreground transition-colors hover:border-border-strong"
      >
        <Search className="size-4" />
        Search…
        <kbd className="ml-auto rounded border border-border bg-surface px-1.5 py-0.5 text-[10px] font-medium">⌘K</kbd>
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="top-[20%] max-w-lg translate-y-0 p-0">
          <VisuallyHidden><DialogTitle>Search</DialogTitle></VisuallyHidden>
          <div className="flex items-center gap-2 border-b border-border px-4">
            <Search className="size-4 text-muted-foreground" />
            <Input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search vocabulary, kanji, grammar, keigo, weeks, resources…"
              className="h-12 border-0 shadow-none focus-visible:ring-0"
            />
          </div>
          <div className="max-h-80 overflow-y-auto p-2">
            {results.length === 0 && query && (
              <p className="p-4 text-center text-sm text-muted-foreground">No results.</p>
            )}
            {results.map((r) => (
              <button
                key={r.type + r.id}
                onClick={() => {
                  setOpen(false);
                  setQuery("");
                  router.push(r.href);
                }}
                className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-surface-muted"
              >
                <div>
                  <p className="jp text-sm font-medium">{r.title}</p>
                  <p className="text-xs text-muted-foreground">{r.subtitle}</p>
                </div>
                <Badge variant="outline">{r.type}</Badge>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
