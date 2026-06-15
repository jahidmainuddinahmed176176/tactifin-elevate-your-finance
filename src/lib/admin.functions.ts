import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { isUserAdmin } from "@/lib/admin";

async function assertAdmin(supabase: Parameters<typeof isUserAdmin>[0], userId: string) {
  const ok = await isUserAdmin(supabase, userId);
  if (!ok) throw new Error("Forbidden");
}

export const listUsers = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1000 });
    if (error) throw new Error(error.message);
    return data.users.map((u) => ({
      id: u.id,
      email: u.email ?? "",
      created_at: u.created_at,
    }));
  });

export const deleteUser = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: { userId: string }) => input)
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    if (data.userId === context.userId) throw new Error("You cannot delete your own account");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.auth.admin.deleteUser(data.userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const getMyRole = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const isAdmin = await isUserAdmin(context.supabase, context.userId);
    return { isAdmin, userId: context.userId };
  });
