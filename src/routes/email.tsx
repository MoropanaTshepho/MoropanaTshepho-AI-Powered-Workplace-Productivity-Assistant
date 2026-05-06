import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { AIOutput } from "@/components/AIOutput";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { callAI } from "@/lib/ai";
import { Mail, Wand2 } from "lucide-react";

export const Route = createFileRoute("/email")({
  head: () => ({ meta: [{ title: "Smart Email Generator" }] }),
  component: EmailPage,
});

function EmailPage() {
  const [tone, setTone] = useState("professional");
  const [audience, setAudience] = useState("client");
  const [brief, setBrief] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async () => {
    if (!brief.trim()) return;
    setLoading(true); setError(null); setContent("");
    try {
      const result = await callAI({
        mode: "email",
        input: `TONE: ${tone}\nAUDIENCE: ${audience}\nBRIEF:\n${brief}`,
      });
      setContent(result);
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
              <Mail className="h-5 w-5 text-primary" />
              <CardTitle>Smart Email Generator</CardTitle>
            </div>
            <CardDescription>Craft polished emails by tone and audience.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Tone</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["professional", "friendly", "formal", "persuasive", "apologetic", "assertive", "casual"].map(t => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Audience</Label>
                <Select value={audience} onValueChange={setAudience}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["client", "executive", "teammate", "manager", "vendor", "candidate", "customer"].map(a => (
                      <SelectItem key={a} value={a}>{a}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>What's the email about?</Label>
              <Textarea
                rows={8}
                placeholder="e.g. Follow up on the Q3 proposal, propose a 30-min call next week, mention pricing flexibility."
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
              />
            </div>
            <Button onClick={generate} disabled={loading || !brief.trim()} className="w-full">
              <Wand2 className="mr-2 h-4 w-4" /> Generate Email
            </Button>
          </CardContent>
        </Card>
        <AIOutput loading={loading} content={content} error={error} title="Generated Email" />
      </div>
    </AppLayout>
  );
}
