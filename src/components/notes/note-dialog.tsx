"use client";
import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUserTable } from "@/lib/hooks/use-user-table";
import { toast } from "sonner";

export type NoteTemplateType = "grammar" | "vocabulary" | "phrase" | "general";

const templates: Record<NoteTemplateType, string[]> = {
  grammar: ["Grammar", "Meaning", "Structure", "Example", "Business example", "Similar grammar", "Mistake to avoid"],
  vocabulary: ["Word", "Reading", "Meaning", "Example", "Business use", "Related word"],
  phrase: ["Phrase", "Meaning", "Formality", "Who can say it", "Who receives it", "Situation", "Example"],
  general: ["Note"],
};

export function NoteDialog({
  open,
  onOpenChange,
  noteType,
  linkedType,
  linkedId,
  prefill,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  noteType: NoteTemplateType;
  linkedType?: string;
  linkedId?: string;
  prefill?: Record<string, string>;
}) {
  const { insert } = useUserTable("notes");
  const [fields, setFields] = React.useState<Record<string, string>>(prefill ?? {});

  React.useEffect(() => {
    if (open) setFields(prefill ?? {});
  }, [open, prefill]);

  async function save() {
    await insert({
      note_type: noteType,
      linked_type: linkedType ?? null,
      linked_id: linkedId ?? null,
      fields,
    } as never);
    toast.success("Note saved");
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New {noteType} note</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          {templates[noteType].map((f) =>
            f === "Example" || f === "Business example" ? (
              <Textarea
                key={f}
                placeholder={f}
                value={fields[f] ?? ""}
                onChange={(e) => setFields((prev) => ({ ...prev, [f]: e.target.value }))}
              />
            ) : (
              <Input
                key={f}
                placeholder={f}
                value={fields[f] ?? ""}
                onChange={(e) => setFields((prev) => ({ ...prev, [f]: e.target.value }))}
              />
            ),
          )}
          <Button onClick={save}>Save note</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
