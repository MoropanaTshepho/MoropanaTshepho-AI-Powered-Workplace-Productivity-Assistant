import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, FileText, ListTodo, Search, MessageSquare, Sparkles, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Workplace Productivity Assistant" },
      { name: "description", content: "Automate emails, meetings, tasks, and research with AI." },
    ],
  }),
  component: Index,
});

const features = [
  { to: "/email", title: "Smart Email Generator", desc: "Tone- and audience-aware drafts in seconds.", icon: Mail },
  { to: "/meetings", title: "Meeting Summarizer", desc: "Key points, action items, and deadlines.", icon: FileText },
  { to: "/tasks", title: "AI Task Planner", desc: "Prioritize and time-block your day.", icon: ListTodo },
  { to: "/research", title: "Research Assistant", desc: "Insightful, structured briefings.", icon: Search },
  { to: "/chat", title: "AI Chatbot", desc: "Your always-on workplace copilot.", icon: MessageSquare },
] as const;

function Index() {
  return (
    <AppLayout>
      <div className="mx-auto max-w-6xl space-y-8">
        <section
          className="overflow-hidden rounded-2xl p-8 text-primary-foreground md:p-12"
          style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-elegant)" }}
        >
          <div className="flex items-center gap-2 text-sm opacity-90">
            <Sparkles className="h-4 w-4" /> Workplace AI Suite
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Get more done — with AI doing the busywork.
          </h1>
          <p className="mt-3 max-w-2xl text-sm opacity-90 md:text-base">
            Draft emails, summarize meetings, plan tasks, and research topics in one
            beautifully simple workspace.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Link key={f.to} to={f.to} className="group">
              <Card
                className="h-full border-border transition-all hover:-translate-y-0.5"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="mt-3 text-lg">{f.title}</CardTitle>
                  <CardDescription>{f.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Open <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </section>
      </div>
    </AppLayout>
  );
}
