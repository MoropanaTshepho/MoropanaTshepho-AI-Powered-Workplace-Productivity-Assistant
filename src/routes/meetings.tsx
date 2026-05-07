import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { AIOutput } from "@/components/AIOutput";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { callAI } from "@/lib/ai";
import { FileText, Wand2 } from "lucide-react";

export const Route = createFileRoute("/meetings")({
  head: () => ({ meta: [{ title: "Meeting Notes Summarizer" }] }),
  component: MeetingsPage,
});

function MeetingsPage() {
  const [notes, setNotes] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async () => {
    if (!notes.trim()) return;
    setLoading(true); setError(null); setContent("");
    try {
      setContent(await callAI({ mode: "meeting", input: notes }));
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
              <FileText className="h-5 w-5 text-primary" />
              <CardTitle>Meeting Notes Summarizer</CardTitle>
            </div>
            <CardDescription>Paste raw notes or a transcript to extract key points, actions, and deadlines.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Meeting notes / transcript</Label>
              <Textarea
                rows={14}
                placeholder="Paste your meeting notes here..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
            <Button onClick={generate} disabled={loading || !notes.trim()} className="w-full">
              <Wand2 className="mr-2 h-4 w-4" /> Summarize
            </Button>
          </CardContent>
        </Card>
        <AIOutput loading={loading} content={content} error={error} title="Meeting Summary" />
      </div>
    </AppLayout>
  );
}