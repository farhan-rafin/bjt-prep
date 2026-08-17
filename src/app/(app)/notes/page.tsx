"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useUserTable } from "@/lib/hooks/use-user-table";
import { NoteDialog, type NoteTemplateType } from "@/components/notes/note-dialog";
import { Plus, Trash2 } from "lucide-react";

const types: { value: NoteTemplateType; label: string }[] = [
  { value: "general", label: "General" },
  { value: "grammar", label: "Grammar" },
  { value: "vocabulary", label: "Vocabulary" },
  { value: "phrase", label: "Business Phrase" },
];

export default function NotesPage() {
  const { rows: notes, remove } = useUserTable("notes");
  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState<NoteTemplateType>("general");

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 lg:py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Notes</h1>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">Fast, ugly, functional — use the templates.</p>

      <Tabs defaultValue="all" className="mt-5">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            {types.map((t) => <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>)}
          </TabsList>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {types.map((t) => (
            <Button key={t.value} size="sm" variant="outline" onClick={() => { setType(t.value); setOpen(true); }}>
              <Plus className="size-3.5" /> {t.label} note
            </Button>
          ))}
        </div>

        <TabsContent value="all">
          <NotesList notes={notes} remove={remove} />
        </TabsContent>
        {types.map((t) => (
          <TabsContent key={t.value} value={t.value}>
            <NotesList notes={notes.filter((n) => n.note_type === t.value)} remove={remove} />
          </TabsContent>
        ))}
      </Tabs>

      <NoteDialog open={open} onOpenChange={setOpen} noteType={type} />
    </div>
  );
}

function NotesList({ notes, remove }: { notes: { id: string; note_type: string; fields: unknown; created_at: string | null }[]; remove: (id: string) => void }) {
  if (notes.length === 0) {
    return <p className="py-10 text-center text-sm text-muted-foreground">No notes yet.</p>;
  }
  return (
    <div className="mt-4 flex flex-col gap-2">
      {notes.map((n) => {
        const fields = (n.fields ?? {}) as Record<string, string>;
        return (
          <Card key={n.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <Badge variant="outline" className="capitalize">{n.note_type}</Badge>
                <button onClick={() => remove(n.id)} aria-label="Delete note">
                  <Trash2 className="size-4 text-muted-foreground" />
                </button>
              </div>
              <div className="mt-2 flex flex-col gap-1 text-sm">
                {Object.entries(fields).filter(([, v]) => v).map(([k, v]) => (
                  <p key={k}><span className="text-muted-foreground">{k}: </span>{v}</p>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
