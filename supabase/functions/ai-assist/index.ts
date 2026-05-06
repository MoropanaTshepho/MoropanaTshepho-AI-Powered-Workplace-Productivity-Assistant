import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPTS: Record<string, string> = {
  email: `You are an expert business communication writer. Generate a polished, professional email based on the user's brief.
- Match the requested TONE precisely (formal, friendly, persuasive, apologetic, assertive, casual).
- Tailor language and vocabulary to the AUDIENCE (executive, client, teammate, vendor, candidate).
- Output format (markdown):
  **Subject:** <concise subject line>

  <email body with greeting, 1-3 short paragraphs, and a closing>
- Be clear, action-oriented, and free of filler. Do not include explanations outside the email.`,

  meeting: `You are an expert meeting analyst. Given raw meeting notes or a transcript, produce a structured summary.
Output strictly in this markdown format:

## Summary
<2-3 sentence overview>

## Key Points
- <bullet>
- <bullet>

## Action Items
- [ ] <action> — **Owner:** <name or "Unassigned"> — **Deadline:** <date or "TBD">

## Decisions
- <decision>

## Open Questions
- <question>

Be precise. Only include items grounded in the input.`,

  tasks: `You are an expert productivity coach using the Eisenhower matrix and time-blocking.
Given a list of tasks (and optional context), return a prioritized, scheduled plan.
Output in this markdown format:

## Prioritized Plan

### 🔴 Do First (Urgent + Important)
1. **<task>** — Est: <time> — Suggested slot: <time block>

### 🟡 Schedule (Important, Not Urgent)
1. **<task>** — Est: <time> — Suggested slot: <time block>

### 🔵 Delegate (Urgent, Not Important)
- <task>

### ⚪ Eliminate / Defer
- <task>

## Today's Suggested Schedule
- 09:00–10:30 — <task>
- ...

## Productivity Tip
<one sentence>`,

  research: `You are a senior research analyst. Provide a clear, well-structured briefing on the user's topic.
Output in this markdown format:

## Executive Summary
<3-4 sentences>

## Key Insights
1. **<insight title>** — <explanation>
2. ...

## Background & Context
<short paragraph>

## Opportunities & Risks
- **Opportunities:** ...
- **Risks:** ...

## Recommended Next Steps
- <action>

Be objective and concise. Note: rely on general knowledge; flag uncertainty where relevant.`,

  chat: `You are an AI Workplace Productivity Assistant. Help professionals with writing, planning, summarizing, brainstorming, and answering work-related questions. Be concise, structured (use markdown lists/headings when helpful), and action-oriented.`,
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { mode, input, messages, model } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const system = SYSTEM_PROMPTS[mode] ?? SYSTEM_PROMPTS.chat;

    const chatMessages = mode === "chat" && Array.isArray(messages)
      ? [{ role: "system", content: system }, ...messages]
      : [
          { role: "system", content: system },
          { role: "user", content: typeof input === "string" ? input : JSON.stringify(input) },
        ];

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model || "google/gemini-3-flash-preview",
        messages: chatMessages,
      }),
    });

    if (!resp.ok) {
      if (resp.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again shortly." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (resp.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits to your workspace." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await resp.text();
      console.error("AI gateway error:", resp.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await resp.json();
    const content = data.choices?.[0]?.message?.content ?? "";
    return new Response(JSON.stringify({ content }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("ai-assist error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
