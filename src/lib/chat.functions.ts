import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { generateText } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "./ai-gateway.server";

const SYSTEM = `You are Tactifin AI, a friendly personal-finance assistant.
You help users with budgeting, expense categorization (Food, Rent, Business, Taxi, etc.),
savings goals, Zakat calculation (2.5% on wealth above nisab), tax estimation,
and Shariah-compliance questions (flag interest/riba, gambling, alcohol).
Keep answers concise and practical. Use markdown when useful.`;

export const sendChatMessage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((d: unknown) =>
    z.object({
      threadId: z.string().uuid(),
      content: z.string().min(1).max(4000),
    }).parse(d),
  )
  .handler(async ({ context, data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Missing LOVABLE_API_KEY");

    // Save user message
    const { error: e1 } = await context.supabase.from("ai_messages").insert({
      thread_id: data.threadId,
      user_id: context.userId,
      role: "user",
      content: data.content,
    });
    if (e1) throw new Error(e1.message);

    // Load history
    const { data: history, error: e2 } = await context.supabase
      .from("ai_messages")
      .select("role,content")
      .eq("thread_id", data.threadId)
      .order("created_at", { ascending: true });
    if (e2) throw new Error(e2.message);

    const gateway = createLovableAiGatewayProvider(key);
    const result = await generateText({
      model: gateway("google/gemini-3-flash-preview"),
      system: SYSTEM,
      messages: (history ?? []).map((m) => ({
        role: m.role as "user" | "assistant" | "system",
        content: m.content,
      })),
    });

    const assistantText = result.text;
    const { error: e3 } = await context.supabase.from("ai_messages").insert({
      thread_id: data.threadId,
      user_id: context.userId,
      role: "assistant",
      content: assistantText,
    });
    if (e3) throw new Error(e3.message);

    // Touch thread updated_at + title if first message
    const title = data.content.slice(0, 60);
    await context.supabase
      .from("ai_threads")
      .update({ updated_at: new Date().toISOString(), title })
      .eq("id", data.threadId)
      .eq("title", "New chat");
    await context.supabase
      .from("ai_threads")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", data.threadId);

    return { assistant: assistantText };
  });
