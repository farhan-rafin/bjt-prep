"use client";
import * as React from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { resources, nonNegotiableResources } from "@/content";
import { ExternalLink, Search } from "lucide-react";

const badgeVariant: Record<string, "primary" | "default" | "accent"> = {
  OFFICIAL: "primary",
  CURRICULUM: "accent",
  EXTERNAL: "default",
};

function ResourcesInner() {
  const searchParams = useSearchParams();
  const [query, setQuery] = React.useState(searchParams.get("q") ?? "");
  const [tier, setTier] = React.useState("all");

  const filtered = resources.filter((r) => {
    if (tier !== "all" && r.tier !== tier) return false;
    if (query && !r.name.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 lg:py-10">
      <h1 className="text-2xl font-semibold">Resources Library</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        A deliberately small kit. If money is tight, the non-negotiables are the two official BJT books + Anki + Jisho + free YouTube listening.
      </p>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search resources…" className="pl-9" />
        </div>
        <Select value={tier} onValueChange={setTier}>
          <SelectTrigger className="sm:w-48"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All resources</SelectItem>
            <SelectItem value="essential">Essential</SelectItem>
            <SelectItem value="recommended">Strongly Recommended</SelectItem>
            <SelectItem value="optional">Optional</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-5 flex flex-col gap-2">
        {filtered.map((r) => (
          <Card key={r.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium">{r.name}</p>
                  <p className="text-sm text-muted-foreground">{r.type}</p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <Badge variant={badgeVariant[r.badge]}>{r.badge}</Badge>
                  {nonNegotiableResources.includes(r.id) && <Badge variant="success">Non-negotiable</Badge>}
                </div>
              </div>
              <div className="mt-2 grid gap-1 text-sm sm:grid-cols-2">
                <p><span className="text-muted-foreground">Level: </span>{r.level}</p>
                <p><span className="text-muted-foreground">Cost: </span>{r.cost}</p>
                <p className="sm:col-span-2"><span className="text-muted-foreground">When: </span>{r.when}</p>
                <p className="sm:col-span-2"><span className="text-muted-foreground">How: </span>{r.how}</p>
                {r.where && <p className="sm:col-span-2"><span className="text-muted-foreground">Where: </span>{r.where}</p>}
              </div>
              <a href={r.url} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-sm text-primary hover:underline">
                Open <ExternalLink className="size-3.5" />
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function ResourcesPage() {
  return (
    <Suspense fallback={null}>
      <ResourcesInner />
    </Suspense>
  );
}
