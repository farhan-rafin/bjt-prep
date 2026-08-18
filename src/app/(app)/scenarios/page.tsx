"use client";
import * as React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { scenarios } from "@/content";
import { SpeakButton } from "@/components/speak-button";
import { Mic } from "lucide-react";

export default function ScenariosPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-6 lg:py-10">
      <h1 className="text-2xl font-semibold">Business Situations</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Scripted workplace dialogues. Read the situation, listen to each line, then shadow it —
        each one links straight into Shadowing Mode.
      </p>

      <div className="mt-5 flex flex-col gap-4">
        {scenarios.map((s) => (
          <Card key={s.id}>
            <CardContent className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <Badge variant="outline">{s.category}</Badge>
                <Button asChild size="sm" variant="secondary">
                  <Link href={`/listening?shadow=${s.id}`}>
                    <Mic className="size-3.5" /> Shadow this
                  </Link>
                </Button>
              </div>
              <div className="flex flex-col gap-2">
                {s.dialogue.map((d, i) => (
                  <div key={i}>
                    <p className="flex items-start gap-1.5 text-sm">
                      <span className="mt-0.5 shrink-0 font-medium text-muted-foreground">{d.speaker}:</span>
                      <span className="jp">{d.line}</span>
                      <SpeakButton text={d.line} />
                    </p>
                    <p className="jp pl-[3.2rem] text-xs text-muted-foreground/70">{d.reading}</p>
                    <p className="pl-[3.2rem] text-xs italic text-muted-foreground/80">{d.meaning}</p>
                  </div>
                ))}
              </div>
              {s.note && <p className="mt-3 text-xs text-muted-foreground">{s.note}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
