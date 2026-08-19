"use client";
import { Card, CardContent } from "@/components/ui/card";
import { SpeakButton } from "@/components/speak-button";
import { keigoVerbPairs } from "@/content";

export function KeigoVerbTable() {
  return (
    <div>
      <p className="mb-4 text-sm text-muted-foreground">
        尊敬語 raises the other person, 謙譲語 lowers you. Same event, opposite direction — mixing
        them up is the mistake the exam is built to catch.
      </p>

      {/* Wide table scrolls inside its own container rather than pushing the page sideways. */}
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="bg-surface-muted">
            <tr>
              <th className="px-3 py-2 text-left font-medium">Plain</th>
              <th className="px-3 py-2 text-left font-medium">尊敬語 — about them</th>
              <th className="px-3 py-2 text-left font-medium">謙譲語 — about you</th>
            </tr>
          </thead>
          <tbody>
            {keigoVerbPairs.map((p) => (
              <tr key={p.id} className="border-t border-border align-top">
                <td className="px-3 py-2.5">
                  <p className="jp font-medium">{p.plain}</p>
                  <p className="text-[11px] text-muted-foreground">{p.plainReading}</p>
                  <p className="text-[11px] italic text-muted-foreground/80">{p.meaning}</p>
                </td>
                <td className="px-3 py-2.5">
                  {p.sonkeigo ? (
                    <>
                      <p className="jp font-medium">{p.sonkeigo}</p>
                      <p className="text-[11px] text-muted-foreground">{p.sonkeigoReading}</p>
                    </>
                  ) : (
                    <span className="text-muted-foreground">— none</span>
                  )}
                </td>
                <td className="px-3 py-2.5">
                  {p.kenjougo ? (
                    <>
                      <p className="jp font-medium">{p.kenjougo}</p>
                      <p className="text-[11px] text-muted-foreground">{p.kenjougoReading}</p>
                    </>
                  ) : (
                    <span className="text-muted-foreground">— none</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {keigoVerbPairs.map((p) => (
          <Card key={p.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2">
                <p className="jp text-sm">{p.example}</p>
                <SpeakButton text={p.example} />
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">{p.exampleReading}</p>
              <p className="mt-0.5 text-xs italic text-muted-foreground/80">{p.exampleMeaning}</p>
              <p className="mt-2 text-xs text-muted-foreground">{p.note}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
