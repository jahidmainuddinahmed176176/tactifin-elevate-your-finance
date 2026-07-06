import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth/callback")({
  component: AuthCallback,
});

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    async function completeSignIn() {
      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");
      const errorDescription = url.searchParams.get("error_description");

      if (errorDescription) {
        console.error("OAuth callback error:", errorDescription);
        if (!cancelled) navigate({ to: "/", replace: true });
        return;
      }

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          console.error("OAuth callback error:", error);
          if (!cancelled) navigate({ to: "/", replace: true });
          return;
        }
      }

      const { data } = await supabase.auth.getSession();
      if (!cancelled) {
        navigate({ to: data.session ? "/" : "/", replace: true });
      }
    }

    completeSignIn();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center space-y-2">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-foreground mx-auto" />
        <p className="text-sm text-muted-foreground">Completing sign in…</p>
      </div>
    </div>
  );
}
