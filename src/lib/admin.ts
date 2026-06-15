import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export async function isUserAdmin(
  supabase: SupabaseClient<Database>,
  userId: string,
): Promise<boolean> {
  const { data, error } = await supabase
    .from("user_roles")
    .select("id")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();

  if (error) {
    console.error("Admin check failed:", error.message);
    return false;
  }

  return !!data;
}
