import { c as createServerRpc } from "./createServerRpc-BTan26Rg.mjs";
import { a as createServerFn } from "./server-BXa69LoB.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-8W3DX73W.mjs";
import { g as generateText } from "../_libs/ai.mjs";
import { c as createOpenAICompatible } from "../_libs/ai-sdk__openai-compatible.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/ai-sdk__provider-utils.mjs";
import "../_libs/ai-sdk__provider.mjs";
import "../_libs/nanoid.mjs";
import "../_libs/secure-json-parse.mjs";
import "../_libs/ai-sdk__ui-utils.mjs";
import "../_libs/zod-to-json-schema.mjs";
import "../_libs/opentelemetry__api.mjs";
function createLovableAiGatewayProvider(apiKey) {
  return createOpenAICompatible({
    name: "lovable",
    baseURL: "https://ai.gateway.lovable.dev/v1",
    headers: { "Lovable-API-Key": apiKey }
  });
}
const SYSTEM = `You are Tactifin AI, a friendly personal-finance assistant.
You help users with budgeting, expense categorization (Food, Rent, Business, Taxi, etc.),
savings goals, Zakat calculation (2.5% on wealth above nisab), tax estimation,
and Shariah-compliance questions (flag interest/riba, gambling, alcohol).
Keep answers concise and practical. Use markdown when useful.`;
const sendChatMessage_createServerFn_handler = createServerRpc({
  id: "abb0f390d0d9d5c002c238029f7d6ac7eceb5f795c2ff0103d4fb2cfd687a422",
  name: "sendChatMessage",
  filename: "src/lib/chat.functions.ts"
}, (opts) => sendChatMessage.__executeServer(opts));
const sendChatMessage = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  threadId: stringType().uuid(),
  content: stringType().min(1).max(4e3)
}).parse(d)).handler(sendChatMessage_createServerFn_handler, async ({
  context,
  data
}) => {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("Missing LOVABLE_API_KEY");
  const {
    error: e1
  } = await context.supabase.from("ai_messages").insert({
    thread_id: data.threadId,
    user_id: context.userId,
    role: "user",
    content: data.content
  });
  if (e1) throw new Error(e1.message);
  const {
    data: history,
    error: e2
  } = await context.supabase.from("ai_messages").select("role,content").eq("thread_id", data.threadId).order("created_at", {
    ascending: true
  });
  if (e2) throw new Error(e2.message);
  const gateway = createLovableAiGatewayProvider(key);
  const result = await generateText({
    model: gateway("google/gemini-3-flash-preview"),
    system: SYSTEM,
    messages: (history ?? []).map((m) => ({
      role: m.role,
      content: m.content
    }))
  });
  const assistantText = result.text;
  const {
    error: e3
  } = await context.supabase.from("ai_messages").insert({
    thread_id: data.threadId,
    user_id: context.userId,
    role: "assistant",
    content: assistantText
  });
  if (e3) throw new Error(e3.message);
  const title = data.content.slice(0, 60);
  await context.supabase.from("ai_threads").update({
    updated_at: (/* @__PURE__ */ new Date()).toISOString(),
    title
  }).eq("id", data.threadId).eq("title", "New chat");
  await context.supabase.from("ai_threads").update({
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  }).eq("id", data.threadId);
  return {
    assistant: assistantText
  };
});
export {
  sendChatMessage_createServerFn_handler
};
