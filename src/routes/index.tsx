import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Mail, Github, Linkedin, ExternalLink, Code2, Sparkles, GraduationCap,
  Briefcase, Send, Moon, Sun, Download, MapPin, ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tshepho Moropana — Junior Software Developer Portfolio" },
      { name: "description", content: "Portfolio of a Junior Software Developer specializing in web development, AI integrations, and modern JavaScript stacks." },
      { property: "og:title", content: "Tshepho Moropana — Junior Software Developer" },
      { property: "og:description", content: "Projects, skills, and experience of a Junior Software Developer." },
    ],
  }),
  component: Portfolio,
});

const skills = [
  { group: "Languages", items: ["JavaScript", "TypeScript", "Python", "HTML", "CSS", "SQL"] },
  { group: "Frameworks", items: ["React", "Next.js", "Node.js", "Tailwind CSS", "Express"] },
  { group: "Tools", items: ["Git & GitHub", "REST APIs", "Supabase", "Figma", "VS Code"] },
];

const projects = [
  {
    title: "AI Workplace Productivity Assistant",
    desc: "A SaaS suite that automates emails, meeting notes, task planning and research using structured prompt engineering.",
    tech: ["React", "TanStack", "AI Gateway", "Tailwind"],
    live: "#", code: "#",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
  {
    title: "DevConnect — Developer Community",
    desc: "Social platform for developers to share snippets, follow projects, and collaborate in real time.",
    tech: ["Next.js", "Supabase", "TypeScript"],
    live: "#", code: "#",
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
  },
  {
    title: "FinTrack — Personal Finance Dashboard",
    desc: "Visualize spending, set budgets and forecast savings with interactive charts.",
    tech: ["React", "Chart.js", "Node.js"],
    live: "#", code: "#",
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
  },
  {
    title: "StudyMate — AI Study Buddy",
    desc: "Generates flashcards, quizzes and summaries from notes using LLMs.",
    tech: ["Python", "FastAPI", "OpenAI"],
    live: "#", code: "#",
    img: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80",
  },
];

const education = [
  { title: "Introduction to AI", org: "Certificate", year: "2026", desc: "Foundations of artificial intelligence concepts, capabilities, and real-world applications." },
  { title: "Maximize Productivity with AI Tools", org: "Certificate", year: "2026", desc: "Practical workflows for using AI assistants to accelerate daily work and decision-making." },
  { title: "Discover the Art of Prompting", org: "Certificate", year: "2026", desc: "Structured prompt engineering techniques for clear, reliable AI outputs." },
  { title: "Use AI Responsibly", org: "Certificate", year: "2026", desc: "Ethics, bias, privacy, and responsible deployment of AI systems." },
  { title: "Stay Ahead of the AI Curve", org: "Certificate", year: "2026", desc: "Trends, tools, and continuous-learning habits to keep pace with rapid AI developments." },
];

const experience = [
  { role: "Software Engineering Intern", org: "TechNova Studio", period: "Jun 2025 – Present", desc: "Building reusable React components and integrating REST APIs for a SaaS dashboard." },
  { role: "Freelance Web Developer", org: "Self-employed", period: "2024 – Present", desc: "Delivered responsive landing pages and small business sites for 6+ clients." },
  { role: "Hackathon Finalist — Africa Code Week", org: "AWS / UNESCO", period: "2024", desc: "Built an AI-powered tutor app in 48 hours; placed top 5 of 120 teams." },
];

function Portfolio() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Message sent! I'll get back to you soon.");
    (e.currentTarget as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <a href="#home" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="grid h-7 w-7 place-items-center rounded-md text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
              <Code2 className="h-4 w-4" />
            </span>
            Tshepho.dev
          </a>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#about" className="hover:text-foreground">About</a>
            <a href="#skills" className="hover:text-foreground">Skills</a>
            <a href="#projects" className="hover:text-foreground">Projects</a>
            <a href="#experience" className="hover:text-foreground">Experience</a>
            <a href="#contact" className="hover:text-foreground">Contact</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setDark((d) => !d)} aria-label="Toggle theme">
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button asChild size="sm" className="hidden md:inline-flex">
              <a href="#contact">Hire me</a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{ background: "radial-gradient(circle at 20% 20%, var(--primary) 0%, transparent 40%), radial-gradient(circle at 80% 60%, var(--primary-glow) 0%, transparent 45%)" }}
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 md:grid-cols-[1.2fr_1fr] md:py-28">
          <div className="animate-fade-in">
            <Badge variant="secondary" className="mb-4 gap-1">
              <Sparkles className="h-3 w-3" /> Available for internships
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              Hi, I'm <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-primary)" }}>Tshepho Moropana</span>
            </h1>
            <p className="mt-3 text-lg text-muted-foreground md:text-xl">
              Junior Software Developer · React · Python · AI
            </p>
            <p className="mt-5 max-w-xl text-base text-muted-foreground">
              I build clean, accessible web apps and love turning hard problems into simple,
              delightful user experiences. Currently focused on full-stack JavaScript and AI integrations.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" style={{ boxShadow: "var(--shadow-elegant)" }}>
                <a href="#contact"><Mail className="h-4 w-4" /> Contact me</a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#projects">View projects <ArrowRight className="h-4 w-4" /></a>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <a href="#"><Download className="h-4 w-4" /> Resume</a>
              </Button>
            </div>
            <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> Cape Town, ZA</span>
              <a className="hover:text-foreground" href="https://github.com" target="_blank" rel="noreferrer"><Github className="h-4 w-4" /></a>
              <a className="hover:text-foreground" href="https://linkedin.com" target="_blank" rel="noreferrer"><Linkedin className="h-4 w-4" /></a>
            </div>
          </div>
          <div className="relative mx-auto hidden md:block">
            <div className="absolute inset-0 rounded-3xl blur-3xl opacity-50" style={{ background: "var(--gradient-primary)" }} />
            <div className="relative aspect-square w-72 overflow-hidden rounded-3xl border border-border bg-card p-2" style={{ boxShadow: "var(--shadow-elegant)" }}>
              <div className="grid h-full w-full place-items-center rounded-2xl text-6xl font-bold text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
                TM
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <Section id="about" title="About Me" eyebrow="Who I am">
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardContent className="p-6 text-base leading-relaxed text-muted-foreground">
              I'm a passionate Junior Software Developer who fell in love with code through curiosity:
              wanting to know <em>how things work</em>. Today I build full-stack web apps with React,
              Node.js and Python, and I'm especially excited by how AI can amplify what small teams
              can ship. I value clean code, thoughtful UX, and continuous learning — every project
              is a chance to level up.
            </CardContent>
          </Card>
          <div className="grid gap-4">
            {[
              { k: "10+", v: "Projects shipped" },
              { k: "3", v: "Hackathons" },
              { k: "∞", v: "Cups of coffee" },
            ].map((s) => (
              <Card key={s.v}>
                <CardContent className="flex items-center justify-between p-4">
                  <span className="text-2xl font-bold text-primary">{s.k}</span>
                  <span className="text-sm text-muted-foreground">{s.v}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Skills */}
      <Section id="skills" title="Skills & Tools" eyebrow="My toolbox">
        <div className="grid gap-4 md:grid-cols-3">
          {skills.map((s) => (
            <Card key={s.group} className="transition-transform hover:-translate-y-1" style={{ boxShadow: "var(--shadow-card)" }}>
              <CardHeader>
                <CardTitle className="text-base">{s.group}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {s.items.map((i) => (
                  <Badge key={i} variant="secondary" className="font-mono text-xs">{i}</Badge>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects" title="Featured Projects" eyebrow="Things I've built">
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <Card key={p.title} className="group overflow-hidden transition-transform hover:-translate-y-1" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="aspect-video overflow-hidden bg-muted">
                <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <CardHeader>
                <CardTitle>{p.title}</CardTitle>
                <CardDescription>{p.desc}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {p.tech.map((t) => <Badge key={t} variant="outline" className="text-xs">{t}</Badge>)}
                </div>
                <div className="flex gap-2">
                  <Button asChild size="sm" variant="ghost"><a href={p.code}><Github className="h-4 w-4" /> Code</a></Button>
                  <Button asChild size="sm"><a href={p.live}><ExternalLink className="h-4 w-4" /> Live</a></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Education */}
      <Section id="education" title="Education & Certifications" eyebrow="Always learning" icon={GraduationCap}>
        <div className="grid gap-4 md:grid-cols-2">
          {education.map((e) => (
            <Card key={e.title}>
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="text-base">{e.title}</CardTitle>
                  <Badge variant="outline" className="shrink-0 text-xs">{e.year}</Badge>
                </div>
                <CardDescription>{e.org}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{e.desc}</CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Experience */}
      <Section id="experience" title="Experience" eyebrow="Where I've contributed" icon={Briefcase}>
        <ol className="relative space-y-6 border-l-2 border-border pl-6">
          {experience.map((x) => (
            <li key={x.role} className="relative">
              <span className="absolute -left-[31px] top-1.5 grid h-5 w-5 place-items-center rounded-full text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
                <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
              </span>
              <Card>
                <CardHeader>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <CardTitle className="text-base">{x.role} · <span className="text-muted-foreground">{x.org}</span></CardTitle>
                    <Badge variant="secondary" className="text-xs">{x.period}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{x.desc}</CardContent>
              </Card>
            </li>
          ))}
        </ol>
      </Section>

      {/* Contact */}
      <Section id="contact" title="Get in touch" eyebrow="Let's build something">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Send a message</CardTitle>
              <CardDescription>I usually reply within 24 hours.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" required maxLength={100} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required maxLength={255} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" required maxLength={1000} rows={4} />
                </div>
                <Button type="submit" className="w-full"><Send className="h-4 w-4" /> Send message</Button>
              </form>
            </CardContent>
          </Card>
          <div className="space-y-3">
            <ContactRow icon={Mail} label="Email" value="tshepho.dev@example.com" href="mailto:tshepho.dev@example.com" />
            <ContactRow icon={Linkedin} label="LinkedIn" value="linkedin.com/in/tshepho" href="https://linkedin.com" />
            <ContactRow icon={Github} label="GitHub" value="github.com/MoropanaTshepho" href="https://github.com/MoropanaTshepho" />
            <ContactRow icon={MapPin} label="Location" value="Cape Town, South Africa" />
          </div>
        </div>
      </Section>

      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-sm text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Tshepho Moropana. Built with React & Tailwind.</p>
          <div className="flex gap-3">
            <a href="https://github.com" className="hover:text-foreground"><Github className="h-4 w-4" /></a>
            <a href="https://linkedin.com" className="hover:text-foreground"><Linkedin className="h-4 w-4" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Section({
  id, title, eyebrow, icon: Icon, children,
}: { id: string; title: string; eyebrow?: string; icon?: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 md:py-24">
      <div className="mb-8">
        {eyebrow && <p className="text-sm font-medium text-primary">{eyebrow}</p>}
        <h2 className="mt-1 flex items-center gap-2 text-3xl font-bold tracking-tight md:text-4xl">
          {Icon && <Icon className="h-7 w-7 text-primary" />} {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function ContactRow({
  icon: Icon, label, value, href,
}: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; href?: string }) {
  const inner = (
    <Card className="transition-colors hover:bg-accent/40">
      <CardContent className="flex items-center gap-4 p-4">
        <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent text-accent-foreground">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
          <p className="text-sm font-medium">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
  return href ? <a href={href} target="_blank" rel="noreferrer">{inner}</a> : inner;
}
