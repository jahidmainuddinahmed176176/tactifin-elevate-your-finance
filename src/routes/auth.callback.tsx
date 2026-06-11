import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth/callback")({
  component: AuthCallback,
});

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase handles the hash fragment automatically on the client.
    // We just need to wait for the session to be established, then redirect.
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        navigate({ to: "/app", replace: true });
      } else {
        // If there's a code in the URL (PKCE flow), exchangeCodeForSession handles it.
        const url = new URL(window.location.href);
        const code = url.searchParams.get("code");
        if (code) {
          supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
            if (error) {
              console.error("OAuth callback error:", error);
              navigate({ to: "/auth", replace: true });
            } else {
              navigate({ to: "/app", replace: true });
            }
          });
        } else {
          navigate({ to: "/auth", replace: true });
        }
      }
    });
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
