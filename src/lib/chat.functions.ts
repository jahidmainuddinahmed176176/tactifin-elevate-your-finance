import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { allowPublicChat } from "@/integrations/supabase/public-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const SYSTEM = `You are Tactifin AI, a helpful financial assistant specialising in personal finance, budgeting, Islamic finance, Shariah compliance, and tax questions.
Be concise, accurate, and practical. For Islamic finance questions, reference Quran/Hadith where relevant.
Respond in the same language as the user.`;

// Message shape passed from the client for history-based requests
const MessageSchema = z.object({ role: z.enum(["user", "assistant"]), content: z.string() });

/**
 * Public floating-chat version — no DB writes, no auth required.
 * The client passes the full conversation history so the server stays stateless.
 * Reads the Gemini key from server-side env vars only (no VITE_ prefix needed).
 */
export const sendPublicChatMessage = createServerFn({ method: "POST" })
  .middleware([allowPublicChat])
  .validator((d: unknown) =>
    z.object({
      history: z.array(MessageSchema).max(40),
      content: z.string().min(1).max(4000),
    }).parse(d),
  )
  .handler(async ({ data }) => {
    try {
      // Server-side env: GEMINI_API_KEY (set in Vercel without VITE_ prefix)
      // Also try VITE_GEMINI_API_KEY which Nitro/TanStack Start exposes on the
      // server as a literal process.env entry when defined in .env files.
      const key =
        process.env.GEMINI_API_KEY ??
        process.env.GOOGLE_GENERATIVE_AI_API_KEY ??
        process.env.VITE_GEMINI_API_KEY;

      if (!key) {
        console.error("[Tactifin AI] Missing Gemini API key — set GEMINI_API_KEY in Vercel env vars");
        return { assistant: "AI is not configured yet. Please contact support." };
      }

      // Build conversation for Gemini: previous history + current user message
      const contents = [
        ...data.history.map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        })),
        { role: "user", parts: [{ text: data.content }] },
      ];

      // Use x-goog-api-key header — works correctly with both AIza and AQ. key formats
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": key,
          },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: SYSTEM }] },
            contents,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("[Tactifin AI] Gemini API error:", JSON.stringify(errorData));
        throw new Error(`Gemini API error: ${errorData?.error?.message ?? response.statusText}`);
      }

      const result = await response.json();
      const assistantText = result.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!assistantText) throw new Error("Empty response from Gemini");

      return { assistant: assistantText };
    } catch (error) {
      console.error("[Tactifin AI] Public chat error:", error instanceof Error ? error.message : error);
      return { assistant: "Sorry, I'm having trouble responding right now. Please try again." };
    }
  });

/**
 * Authenticated in-app chat — writes to DB, requires auth middleware.
 */
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
      const key =
        process.env.GEMINI_API_KEY ??
        process.env.GOOGLE_GENERATIVE_AI_API_KEY ??
        process.env.VITE_GEMINI_API_KEY;

      if (!key) {
        console.error("[Tactifin AI] Missing API key");
        throw new Error("Missing GEMINI_API_KEY");
      }

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

      const contents = (history ?? []).map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": key,
          },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: SYSTEM }] },
            contents,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Gemini API error: ${errorData?.error?.message ?? response.statusText}`);
      }

      const result = await response.json();
      const assistantText = result.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!assistantText) throw new Error("No text in Gemini response");

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

      return { assistant: assistantText };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("[Tactifin AI] Chat handler error:", errorMessage);
      return { assistant: "Sorry, I'm having trouble responding right now. Please try again." };
    }
  });
