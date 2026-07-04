import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { allowPublicChat } from "@/integrations/supabase/public-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const SYSTEM = `You are Tactifin AI, a helpful financial assistant specialising in personal finance, budgeting, Islamic finance, Shariah compliance, and tax questions.
Be concise, accurate, and practical. For Islamic finance questions, reference Quran/Hadith where relevant.
Respond in the same language as the user.`;

export const sendChatMessage = createServerFn({ method: "POST" })
  .middleware([allowPublicChat])
  .validator((d: unknown) =>
    z.object({
      threadId: z.string().min(1),
      content: z.string().min(1).max(4000),
    }).parse(d),
  )
  .handler(async ({ data }) => {
    const supabase = supabaseAdmin;

    try {
      const key = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_GENERATIVE_AI_API_KEY ?? process.env.VITE_GEMINI_API_KEY;
      if (!key) {
        console.error("[Tactifin AI] Missing API key");
        throw new Error("Missing GEMINI_API_KEY");
      }

      console.log("[Tactifin AI] Inserting user message to database...");
      const { error: e1 } = await supabase.from("ai_messages").insert({
        thread_id: data.threadId,
        user_id: null,
        role: "user",
        content: data.content,
      });
      if (e1) {
        console.error("[Tactifin AI] Error inserting user message:", e1.message);
        throw new Error(e1.message);
      }

      console.log("[Tactifin AI] Fetching message history...");
      const { data: history, error: e2 } = await supabase
        .from("ai_messages")
        .select("role,content")
        .eq("thread_id", data.threadId)
        .order("created_at", { ascending: true });
      if (e2) {
        console.error("[Tactifin AI] Error fetching history:", e2.message);
        throw new Error(e2.message);
      }

      console.log("[Tactifin AI] Calling Gemini API directly...");
      
      // Build messages for Gemini API
      // Gemini expects: user messages as "user", assistant messages as "model"
      const contents = (history ?? []).map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

      console.log("[Tactifin AI] Request to Gemini with contents:", JSON.stringify(contents));

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: SYSTEM }],
            },
            contents,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("[Tactifin AI] Gemini API error:", errorData);
        throw new Error(`Gemini API error: ${errorData.error?.message || response.statusText}`);
      }

      const result = await response.json();
      console.log("[Tactifin AI] Got response from Gemini");
      
      const assistantText = result.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!assistantText) {
        throw new Error("No text in Gemini response");
      }

      const { error: e3 } = await supabase.from("ai_messages").insert({
        thread_id: data.threadId,
        user_id: null,
        role: "assistant",
        content: assistantText,
      });
      if (e3) {
        console.error("[Tactifin AI] Error inserting assistant message:", e3.message);
        throw new Error(e3.message);
      }

      console.log("[Tactifin AI] Updating thread metadata...");
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

      console.log("[Tactifin AI] Chat completed successfully");
      return { assistant: assistantText };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("[Tactifin AI] Chat handler error:", errorMessage);
      console.error("[Tactifin AI] Full error:", error);
      return { assistant: "Sorry, I'm having trouble responding right now. Please try again." };
    }
  });

export const sendPublicChatMessage = sendChatMessage;
