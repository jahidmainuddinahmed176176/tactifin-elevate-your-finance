import { createFileRoute, Link, Outlet, useNavigate, useParams, useRouterState } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Plus, MessageSquare, Trash2 } from "lucide-react";
import { createThread, deleteThread, listThreads } from "@/lib/threads.functions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/chat")({
  head: () => ({ meta: [{ title: "AI Assistant — Tactifin" }] }),
  component: ChatLayout,
});

function ChatLayout() {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const list = useServerFn(listThreads);
  const create = useServerFn(createThread);
  const del = useServerFn(deleteThread);
  const path = useRouterState({ select: (r) => r.location.pathname });

  const { data: threads = [] } = useQuery({
    queryKey: ["ai_threads"],
    queryFn: () => list(),
  });

  const newThread = useMutation({
    mutationFn: () => create({ data: {} }),
    onSuccess: (t) => {
      qc.invalidateQueries({ queryKey: ["ai_threads"] });
      navigate({ to: "/chat/$threadId", params: { threadId: t.id } });
    },
  });

  const removeThread = useMutation({
    mutationFn: (id: string) => del({ data: { id } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["ai_threads"] });
      navigate({ to: "/chat" });
    },
  });

  return (
    <div className="grid h-[calc(100vh-8rem)] grid-cols-1 gap-3 md:gap-4 md:grid-cols-[260px_1fr]">
      <aside className="order-2 md:order-1 rounded-xl border border-border bg-card p-2 md:p-3 flex flex-col max-h-[200px] md:max-h-none overflow-hidden">
        <Button onClick={() => newThread.mutate()} className="w-full" size="sm">
          <Plus className="h-4 w-4" /> New chat
        </Button>
        <div className="mt-2 md:mt-3 flex-1 space-y-1 overflow-y-auto overflow-x-hidden">
          {threads.map((t) => {
            const active = path === `/chat/${t.id}`;
            return (
              <div key={t.id} className={cn("group flex items-center gap-2 rounded-md px-2 py-1.5 text-sm", active ? "bg-accent" : "hover:bg-accent/50")}>
                <Link to="/chat/$threadId" params={{ threadId: t.id }} className="flex flex-1 items-center gap-2 min-w-0">
                  <MessageSquare className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="truncate block">{t.title}</span>
                </Link>
                <button
                  onClick={(e) => { e.stopPropagation(); removeThread.mutate(t.id); }}
                  className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive shrink-0"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })}
          {threads.length === 0 && <p className="px-2 py-4 text-xs text-muted-foreground">No chats yet. Start a new one.</p>}
        </div>
      </aside>
      <section className="order-1 md:order-2 rounded-xl border border-border bg-card flex flex-col overflow-hidden min-h-[400px] md:min-h-0">
        <Outlet />
      </section>
    </div>
  );
}