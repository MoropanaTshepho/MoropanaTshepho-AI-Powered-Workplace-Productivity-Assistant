import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { callAI } from "@/lib/ai";
import { MessageSquare, Send, Loader2 } from "lucide-react";

export const Route = createFileRoute("/chat")({
  head: () => ({ meta: [{ title: "AI Chat Assistant" }] }),
  component: ChatPage,
});

type Msg = { role: "user" | "assistant"; content: string };

function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const reply = await callAI({ mode: "chat", messages: next });
      setMessages([...next, { role: "assistant", content: reply }]);
    } catch (e) {
      setMessages([...next, { role: "assistant", content: `⚠️ ${e instanceof Error ? e.message : "Failed"}` }]);
    } finally { setLoading(false); }
  };

  return (
    <AppLayout>
      <div className="mx-auto max-w-4xl">
        <Card style={{ boxShadow: "var(--shadow-card)" }} className="flex h-[calc(100vh-10rem)] flex-col">
          <CardHeader className="border-b">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <CardTitle>AI Chat</CardTitle>
            </div>
            <CardDescription>Your workplace copilot. Ask anything.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col gap-3 overflow-hidden p-0">
            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4">
              {messages.length === 0 && (
                <p className="py-12 text-center text-sm text-muted-foreground">
                  Start the conversation — try "Help me draft a status update for my team."
                </p>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                      m.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {m.role === "assistant" ? (
                      <div className="prose prose-sm max-w-none text-foreground prose-headings:text-foreground prose-strong:text-foreground prose-li:my-0.5">
                        <ReactMarkdown>{m.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <span className="whitespace-pre-wrap">{m.content}</span>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl bg-muted px-4 py-2 text-sm text-muted-foreground">
                    <Loader2 className="h-3 w-3 animate-spin" /> Thinking…
                  </div>
                </div>
              )}
            </div>
            <div className="border-t p-3">
              <div className="flex gap-2">
                <Textarea
                  rows={2}
                  placeholder="Type a message... (Enter to send)"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send();
                    }
                  }}
                  className="min-h-[44px] resize-none"
                />
                <Button onClick={send} disabled={loading || !input.trim()} size="icon" className="h-auto">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="mt-2 text-center text-xs text-muted-foreground">
                ⚠️ AI-generated content may require human review.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}