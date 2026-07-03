import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { allowPublicChat } from "@/integrations/supabase/public-middleware";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { generateText } from "ai";
import { createClient } from "@/integrations/supabase/client.server";

const SYSTEM = `You are Tactifin AI, a helpful financial assistant specialising in personal finance, budgeting, Islamic finance, Shariah compliance, and tax questions.
Be concise, accurate, and practical. For Islamic finance questions, reference Quran/Hadith where relevant.
Respond in the same language as the user.`;

function createGeminiProvider(apiKey: string) {
  return createOpenAICompatible({
    name: "google-gemini",
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai",
    apiKey,
  });
}

export const sendChatMessage = createServerFn({ method: "POST" })
  .middleware([allowPublicChat])
  .validator((d: unknown) =>
    z.object({
      threadId: z.string().uuid(),
      content: z.string().min(1).max(4000),
    }).parse(d),
  )
  .handler(async ({ data }) => {
    // 🔥 CRITICAL FIX: Create a fresh Supabase client for EVERY request.
    const supabase = createClient();
    let gemini;

    try {
      const key = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_GENERATIVE_AI_API_KEY ?? process.env.VITE_GEMINI_API_KEY;
      if (!key) throw new Error("Missing GEMINI_API_KEY");

      const { error: e1 } = await supabase.from("ai_messages").insert({
        thread_id: data.threadId,
        user_id: null,
        role: "user",
        content: data.content,
      });
      if (e1) throw new Error(e1.message);

      const { data: history, error: e2 } = await supabase
        .from("ai_messages")
        .select("role,content")
        .eq("thread_id", data.threadId)
        .order("created_at", { ascending: true });
      if (e2) throw new Error(e2.message);

      gemini = createGeminiProvider(key);
      const result = await generateText({
        model: gemini("gemini-2.5-flash"),
        system: SYSTEM,
        messages: (history ?? []).map((m) => ({
          role: m.role as "user" | "assistant" | "system",
          content: m.content,
        })),
      });

      const assistantText = result.text;
      const { error: e3 } = await supabase.from("ai_messages").insert({
        thread_id: data.threadId,
        user_id: null,
        role: "assistant",
        content: assistantText,
      });
      if (e3) throw new Error(e3.message);

      const title = data.content.slice(0, 60);
      await supabase
        .from("ai_threads")
        .update({ updated_at: new Date().toISOString(), title })
        .eq("id", data.threadId)
        .eq("title", "Public chat");
      await supabase
        .from("ai_threads")
        .update({ updated_at: new Date().toISOString() })
        .eq("id", data.threadId);

      return { assistant: assistantText };

    } catch (error) {
      console.error("Chat error:", error);
      return { assistant: "Sorry, I'm having trouble responding right now. Please try again." };
    }
  });

export const sendPublicChatMessage = sendChatMessage;
