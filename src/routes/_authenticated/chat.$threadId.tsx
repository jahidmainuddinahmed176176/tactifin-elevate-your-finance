import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";
import { Send, Bot, User } from "lucide-react";
import { getMessages } from "@/lib/threads.functions";
import { sendChatMessage } from "@/lib/chat.functions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/chat/$threadId")({
  component: ChatView,
});

function ChatView() {
  const { threadId } = Route.useParams();
  const qc = useQueryClient();
  const fetchMessages = useServerFn(getMessages);
  const send = useServerFn(sendChatMessage);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { data: messages = [] } = useQuery({
    queryKey: ["ai_messages", threadId],
    queryFn: () => fetchMessages({ data: { threadId } }),
  });

  const mutation = useMutation({
    mutationFn: (content: string) => send({ data: { threadId, content } }),
    onMutate: (content) => {
      qc.setQueryData<typeof messages>(["ai_messages", threadId], (old = []) => [
        ...old,
        { id: "tmp-" + Date.now(), role: "user", content, created_at: new Date().toISOString() },
      ]);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["ai_messages", threadId] });
      qc.invalidateQueries({ queryKey: ["ai_threads"] });
      inputRef.current?.focus();
    },
  });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, mutation.isPending]);

  useEffect(() => { inputRef.current?.focus(); }, [threadId]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || mutation.isPending) return;
    setInput("");
    mutation.mutate(text);
  }

  return (
    <>
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 && !mutation.isPending && (
          <div className="m-auto flex max-w-md flex-col items-center gap-2 pt-10 text-center text-muted-foreground">
            <Bot className="h-8 w-8" />
            <p>Ask about budgeting, Zakat, taxes, or whether a transaction is Shariah-compliant.</p>
          </div>
        )}
        {messages.map((m) => (
          <div key={m.id} className={cn("flex gap-3", m.role === "user" ? "justify-end" : "justify-start")}>
            {m.role !== "user" && (
              <div className="h-8 w-8 shrink-0 rounded-full bg-brand-gradient flex items-center justify-center text-background">
                <Bot className="h-4 w-4" />
              </div>
            )}
            <div className={cn(
              "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap",
              m.role === "user" ? "bg-primary text-primary-foreground" : "bg-accent text-foreground",
            )}>
              {m.content}
            </div>
            {m.role === "user" && (
              <div className="h-8 w-8 shrink-0 rounded-full bg-muted flex items-center justify-center">
                <User className="h-4 w-4" />
              </div>
            )}
          </div>
        ))}
        {mutation.isPending && (
          <div className="flex gap-3">
            <div className="h-8 w-8 shrink-0 rounded-full bg-brand-gradient flex items-center justify-center text-background">
              <Bot className="h-4 w-4" />
            </div>
            <div className="rounded-2xl bg-accent px-4 py-2.5 text-sm text-muted-foreground">Thinking…</div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={submit} className="border-t border-border p-3 flex items-end gap-2">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(e); }
          }}
          placeholder="Ask Tactifin AI..."
          rows={1}
          className="flex-1 resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
        />
        <Button type="submit" disabled={mutation.isPending || !input.trim()} size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </>
  );
}