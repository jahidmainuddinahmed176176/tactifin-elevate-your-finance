import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { allowPublicChat } from "@/integrations/supabase/public-middleware";

const SYSTEM = `You are Tactifin AI, a helpful financial assistant specialising in personal finance, budgeting, Islamic finance, Shariah compliance, and tax questions.
Be concise, accurate, and practical. For Islamic finance questions, reference Quran/Hadith where relevant.
Respond in the same language as the user.`;

const MessageSchema = z.object({ role: z.enum(["user", "assistant"]), content: z.string() });

async function callDeepSeek(
  history: { role: string; content: string }[],
  content: string,
): Promise<string> {
  const key = process.env.VITE_AI_API_KEY ?? process.env.AI_API_KEY;
  if (!key) throw new Error("VITE_AI_API_KEY env var is missing");

  const messages = [
    { role: "system", content: SYSTEM },
    ...history.map((m) => ({ role: m.role, content: m.content })),
    { role: "user", content },
  ];

  const res = await fetch("https://api.deepseek.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({ model: "deepseek-chat", messages, max_tokens: 800, temperature: 0.7 }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`DeepSeek ${res.status}: ${errText || res.statusText}`);
  }

  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content ?? data?.choices?.[0]?.text;
  if (!text) throw new Error("Empty response from DeepSeek");
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
      const assistant = await callDeepSeek(data.history, data.content);
      return { assistant };
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      console.error("[Tactifin AI] error:", msg);
      return { assistant: `⚠️ ${msg}` };
    }
  });

export const sendPublicChatMessage = sendChatMessage;
