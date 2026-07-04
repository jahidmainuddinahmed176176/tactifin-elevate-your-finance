import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { allowPublicChat } from "@/integrations/supabase/public-middleware";
import { GoogleGenAI } from "@google/genai";

const SYSTEM = `You are Tactifin AI, a helpful financial assistant specialising in personal finance, budgeting, Islamic finance, Shariah compliance, and tax questions.
Be concise, accurate, and practical. For Islamic finance questions, reference Quran/Hadith where relevant.
Respond in the same language as the user.`;

const MessageSchema = z.object({ role: z.enum(["user", "assistant"]), content: z.string() });

async function callGemini(history: { role: string; content: string }[], content: string): Promise<string> {
  const key =
    process.env.GEMINI_API_KEY ??
    process.env.GOOGLE_API_KEY ??
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ??
    process.env.VITE_GEMINI_API_KEY;

  if (!key) {
    console.error("[Tactifin AI] Missing GEMINI_API_KEY env var");
    throw new Error("GEMINI_API_KEY is not set in environment variables");
  }

  // Use the official Google GenAI SDK — handles both AIza and AQ. key formats correctly
  const ai = new GoogleGenAI({ apiKey: key });

  const contents = [
    ...history.map((m) => ({
      role: m.role === "assistant" ? "model" : "user" as "user" | "model",
      parts: [{ text: m.content }],
    })),
    { role: "user" as const, parts: [{ text: content }] },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents,
    config: {
      systemInstruction: SYSTEM,
    },
  });

  const text = response.text;
  if (!text) throw new Error("Empty response from Gemini");
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
      return { assistant: `Sorry, the AI assistant is temporarily unavailable. (${msg})` };
    }
  });

/** Alias for public chat (floating button removed, kept for compatibility). */
export const sendPublicChatMessage = sendChatMessage;
