"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { youtubeResources, bjtKeyFacts } from "@/content";
import { IntensiveListeningWorkflow } from "@/components/listening/intensive-workflow";
import { ShadowingMode } from "@/components/listening/shadowing-mode";
import { ListeningRunner } from "@/components/listening/listening-runner";
import { ExternalLink } from "lucide-react";

function ListeningInner() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("shadow") ? "shadowing" : "practice";

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 lg:py-10">
      <h1 className="text-2xl font-semibold">Listening Center</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Your highest-priority skill. {bjtKeyFacts.sections.split("·")[0]} — verified resources only.
      </p>

      <Tabs defaultValue={defaultTab} className="mt-5">
        <TabsList>
          <TabsTrigger value="practice">Practice</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="workflow">Intensive Method</TabsTrigger>
          <TabsTrigger value="shadowing">Shadowing</TabsTrigger>
        </TabsList>
        <TabsContent value="practice">
          <p className="mb-4 text-sm text-muted-foreground">
            <Badge variant="accent" className="mr-1">PRACTICE</Badge>
            Part I question types — audio plays first and the transcript stays hidden until you answer.
          </p>
          <ListeningRunner />
        </TabsContent>
        <TabsContent value="resources">
          <div className="flex flex-col gap-2">
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Official BJT sample questions</p>
                    <p className="text-sm text-muted-foreground">The only truly exam-accurate audio + format. Use monthly as a benchmark.</p>
                  </div>
                  <Badge>OFFICIAL</Badge>
                </div>
                <a href={bjtKeyFacts.officialSamples} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-sm text-primary hover:underline">
                  Open samples <ExternalLink className="size-3.5" />
                </a>
              </CardContent>
            </Card>
            {youtubeResources.map((y) => (
              <Card key={y.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium">{y.channel}</p>
                      <p className="text-sm text-muted-foreground">{y.method}</p>
                    </div>
                    <Badge variant="outline">EXTERNAL</Badge>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <Badge variant="outline">{y.difficulty}</Badge>
                    <Badge variant="outline">{y.when}</Badge>
                  </div>
                  <a href={y.url} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-sm text-primary hover:underline">
                    Open ↗
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="workflow">
          <p className="mb-4 text-sm text-muted-foreground">
            Listen once (no transcript) → identify situation → identify speakers → note key info → listen again →
            check transcript → save unknown words → shadow → answer questions → rate difficulty.
          </p>
          <IntensiveListeningWorkflow />
        </TabsContent>
        <TabsContent value="shadowing">
          <ShadowingMode />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function ListeningPage() {
  return (
    <Suspense fallback={null}>
      <ListeningInner />
    </Suspense>
  );
}
