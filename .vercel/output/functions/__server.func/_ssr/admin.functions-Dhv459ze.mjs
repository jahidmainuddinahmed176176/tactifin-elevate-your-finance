import { c as createServerRpc } from "./createServerRpc-BTan26Rg.mjs";
import { a as createServerFn } from "./server-BXa69LoB.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-8W3DX73W.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
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
async function assertAdmin(supabase, userId) {
  const {
    data,
    error
  } = await supabase.rpc("has_role", {
    _user_id: userId,
    _role: "admin"
  });
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden");
}
const listUsers_createServerFn_handler = createServerRpc({
  id: "ae1d531e1714d053869d1e069815a71e199346ef621d80ab0f46be85080718ab",
  name: "listUsers",
  filename: "src/lib/admin.functions.ts"
}, (opts) => listUsers.__executeServer(opts));
const listUsers = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(listUsers_createServerFn_handler, async ({
  context
}) => {
  await assertAdmin(context.supabase, context.userId);
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const {
    data,
    error
  } = await supabaseAdmin.auth.admin.listUsers({
    page: 1,
    perPage: 1e3
  });
  if (error) throw new Error(error.message);
  return data.users.map((u) => ({
    id: u.id,
    email: u.email ?? "",
    created_at: u.created_at
  }));
});
const deleteUser_createServerFn_handler = createServerRpc({
  id: "5f15d9c6194c3264109b1c81741c60a8654b66a5caffc1ee319315a3a983394e",
  name: "deleteUser",
  filename: "src/lib/admin.functions.ts"
}, (opts) => deleteUser.__executeServer(opts));
const deleteUser = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => input).handler(deleteUser_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertAdmin(context.supabase, context.userId);
  if (data.userId === context.userId) throw new Error("You cannot delete your own account");
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const {
    error
  } = await supabaseAdmin.auth.admin.deleteUser(data.userId);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const getMyRole_createServerFn_handler = createServerRpc({
  id: "e2507865c01468809aa67f84f243facd748d53ebf53d1a04baa0f86f26aed510",
  name: "getMyRole",
  filename: "src/lib/admin.functions.ts"
}, (opts) => getMyRole.__executeServer(opts));
const getMyRole = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(getMyRole_createServerFn_handler, async ({
  context
}) => {
  const {
    data
  } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin"
  });
  return {
    isAdmin: !!data,
    userId: context.userId
  };
});
export {
  deleteUser_createServerFn_handler,
  getMyRole_createServerFn_handler,
  listUsers_createServerFn_handler
};
