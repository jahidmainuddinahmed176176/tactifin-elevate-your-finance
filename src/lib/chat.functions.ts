import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { allowPublicChat } from "@/integrations/supabase/public-middleware";

const SYSTEM = `You are Tactifin AI, a helpful financial assistant specialising in personal finance, budgeting, Islamic finance, Shariah compliance, and tax questions.
Be concise, accurate, and practical. For Islamic finance questions, reference Quran/Hadith where relevant.
Respond in the same language as the user.`;

const MessageSchema = z.object({ role: z.enum(["user", "assistant"]), content: z.string() });

async function callGemini(history: { role: string; content: string }[], content: string): Promise<string> {
  const key =
    process.env.GEMINI_API_KEY ??
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ??
    process.env.VITE_GEMINI_API_KEY;

  if (!key) {
    console.error("[Tactifin AI] Missing GEMINI_API_KEY env var");
    throw new Error("GEMINI_API_KEY is not set");
  }

  const contents = [
    ...history.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    })),
    { role: "user", parts: [{ text: content }] },
  ];

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
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
    const err = await response.json().catch(() => ({}));
    console.error("[Tactifin AI] Gemini error:", JSON.stringify(err));
    throw new Error(err?.error?.message ?? response.statusText);
  }

  const result = await response.json();
  const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Empty Gemini response");
  return text;
}

/** Used by the in-app AI Assistant (authenticated users). Stateless — history passed from client. */
export const sendChatMessage = createServerFn({ method: "POST" })
  .middleware([allowPublicChat])
  .validator((d: unknown) =>
    z.object({
      history: z.array(MessageSchema).max(40),
      content: z.string().min(1).max(4000),
    }).parse(d),
  )
  .handler(async ({ data }) => {
    try {
      const assistant = await callGemini(data.history, data.content);
      return { assistant };
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      console.error("[Tactifin AI] sendChatMessage error:", msg);
      // Surface the real error so it's visible during debugging
      return { assistant: `⚠️ AI error: ${msg}` };
    }
  });

/** Used by the public floating chat (removed, kept for compatibility). */
export const sendPublicChatMessage = sendChatMessage;
