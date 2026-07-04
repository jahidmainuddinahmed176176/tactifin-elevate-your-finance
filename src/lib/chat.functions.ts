import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { allowPublicChat } from "@/integrations/supabase/public-middleware";

const SYSTEM = `You are Tactifin AI, a helpful financial assistant specialising in personal finance, budgeting, Islamic finance, Shariah compliance, and tax questions.
Be concise, accurate, and practical. For Islamic finance questions, reference Quran/Hadith where relevant.
Respond in the same language as the user.`;

const MessageSchema = z.object({ role: z.enum(["user", "assistant"]), content: z.string() });

async function callGemini(
  history: { role: string; content: string }[],
  content: string,
): Promise<string> {
  const key =
    process.env.GEMINI_API_KEY ??
    process.env.GOOGLE_API_KEY ??
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ??
    process.env.VITE_GEMINI_API_KEY;

  if (!key) throw new Error("GEMINI_API_KEY env var is missing");

  const contents = [
    ...history.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    })),
    { role: "user", parts: [{ text: content }] },
  ];

  // x-goog-api-key header works with both AIza and AQ. key formats
  const res = await fetch(
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
    },
  );

  // Surface the full Gemini error so it's visible in the chat
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const msg = (err as { error?: { message?: string } })?.error?.message ?? res.statusText;
    throw new Error(`Gemini ${res.status}: ${msg}`);
  }

  const data = await res.json() as { candidates?: { content?: { parts?: { text?: string }[] } }[] };
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Empty response from Gemini");
  return text;
}

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
      console.error("[Tactifin AI] error:", msg);
      // Show the real error in the chat bubble so it's easy to diagnose
      return { assistant: `⚠️ ${msg}` };
    }
  });

export const sendPublicChatMessage = sendChatMessage;
