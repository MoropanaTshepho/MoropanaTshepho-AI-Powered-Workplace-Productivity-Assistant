import { supabase } from "@/integrations/supabase/client";

export async function callAI(payload: {
  mode: "email" | "meeting" | "tasks" | "research" | "chat";
  input?: string;
  messages?: { role: "user" | "assistant"; content: string }[];
}): Promise<string> {
  const { data, error } = await supabase.functions.invoke("ai-assist", { body: payload });
  if (error) {
    const msg = (data as { error?: string } | null)?.error ?? error.message ?? "AI request failed";
    throw new Error(msg);
  }
  if (!data?.content) throw new Error("Empty response from AI");
  return data.content as string;
}
