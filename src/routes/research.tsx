import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { AIOutput } from "@/components/AIOutput";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { callAI } from "@/lib/ai";
import { Search, Wand2 } from "lucide-react";

export const Route = createFileRoute("/research")({
  head: () => ({ meta: [{ title: "AI Research Assistant" }] }),
  component: ResearchPage,
});

function ResearchPage() {
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async () => {
    if (!topic.trim()) return;
    setLoading(true); setError(null); setContent("");
    try {
      setContent(await callAI({ mode: "research", input: topic }));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    } finally { setLoading(false); }
  };

  return (
    <AppLayout>
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
        <Card style={{ boxShadow: "var(--shadow-card)" }}>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              <CardTitle>AI Research Assistant</CardTitle>
            </div>
            <CardDescription>Get a structured executive briefing on any topic.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Topic or question</Label>
              <Textarea
                rows={10}
                placeholder="e.g. Trends in AI-powered customer support tools for SaaS in 2025"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            <Button onClick={generate} disabled={loading || !topic.trim()} className="w-full">
              <Wand2 className="mr-2 h-4 w-4" /> Research
            </Button>
          </CardContent>
        </Card>
        <AIOutput loading={loading} content={content} error={error} title="Research Briefing" />
      </div>
    </AppLayout>
  );
}