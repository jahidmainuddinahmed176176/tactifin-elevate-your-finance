import { c as createServerRpc } from "./createServerRpc-BTan26Rg.mjs";
import { a as createServerFn } from "./server-BXa69LoB.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-8W3DX73W.mjs";
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
const listThreads_createServerFn_handler = createServerRpc({
  id: "ebbbc99857ac917fa22c2b1d438323ae8fd03205b61e4f2e84e349f57ca98c3c",
  name: "listThreads",
  filename: "src/lib/threads.functions.ts"
}, (opts) => listThreads.__executeServer(opts));
const listThreads = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(listThreads_createServerFn_handler, async ({
  context
}) => {
  const {
    data,
    error
  } = await context.supabase.from("ai_threads").select("id,title,updated_at").order("updated_at", {
    ascending: false
  });
  if (error) throw new Error(error.message);
  return data ?? [];
});
const createThread_createServerFn_handler = createServerRpc({
  id: "67dca520864171111cdf48efef1043d4a0da2d685a1c0b4280bd5013be4b79c9",
  name: "createThread",
  filename: "src/lib/threads.functions.ts"
}, (opts) => createThread.__executeServer(opts));
const createThread = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  title: stringType().min(1).max(120).optional()
}).parse(d)).handler(createThread_createServerFn_handler, async ({
  context,
  data
}) => {
  const {
    data: row,
    error
  } = await context.supabase.from("ai_threads").insert({
    user_id: context.userId,
    title: data.title ?? "New chat"
  }).select("id,title,updated_at").single();
  if (error) throw new Error(error.message);
  return row;
});
const deleteThread_createServerFn_handler = createServerRpc({
  id: "568557aff3b98c509b2e18e3b33bc94e0f42eaf3bf5efa80b0f9c8e64ed87602",
  name: "deleteThread",
  filename: "src/lib/threads.functions.ts"
}, (opts) => deleteThread.__executeServer(opts));
const deleteThread = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(deleteThread_createServerFn_handler, async ({
  context,
  data
}) => {
  const {
    error
  } = await context.supabase.from("ai_threads").delete().eq("id", data.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const getMessages_createServerFn_handler = createServerRpc({
  id: "47486d30f097d8c063c6524c7acf474c3dc33bde29bc270e20e66c205643db72",
  name: "getMessages",
  filename: "src/lib/threads.functions.ts"
}, (opts) => getMessages.__executeServer(opts));
const getMessages = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  threadId: stringType().uuid()
}).parse(d)).handler(getMessages_createServerFn_handler, async ({
  context,
  data
}) => {
  const {
    data: rows,
    error
  } = await context.supabase.from("ai_messages").select("id,role,content,created_at").eq("thread_id", data.threadId).order("created_at", {
    ascending: true
  });
  if (error) throw new Error(error.message);
  return rows ?? [];
});
export {
  createThread_createServerFn_handler,
  deleteThread_createServerFn_handler,
  getMessages_createServerFn_handler,
  listThreads_createServerFn_handler
};
