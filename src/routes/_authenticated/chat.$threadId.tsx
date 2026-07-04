import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";
import { Send, Bot, User } from "lucide-react";
import { sendChatMessage } from "@/lib/chat.functions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/chat/$threadId")({
  component: ChatView,
});

type Message = { id: string; role: "user" | "assistant"; content: string };

function ChatView() {
  const { threadId } = Route.useParams();
  const send = useServerFn(sendChatMessage);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Reset conversation when switching threads
  useEffect(() => {
    setMessages([]);
    setInput("");
    inputRef.current?.focus();
  }, [threadId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const mutation = useMutation({
    mutationFn: async (content: string) => {
      const history = messages.map((m) => ({ role: m.role, content: m.content }));
      return send({ data: { history, content } });
    },
    onMutate: (content) => {
      setMessages((prev) => [
        ...prev,
        { id: "user-" + Date.now(), role: "user", content },
      ]);
    },
    onSuccess: (result) => {
      setMessages((prev) => [
        ...prev,
        { id: "ai-" + Date.now(), role: "assistant", content: result.assistant },
      ]);
      inputRef.current?.focus();
    },
    onError: () => {
      setMessages((prev) => [
        ...prev,
        { id: "err-" + Date.now(), role: "assistant", content: "Something went wrong. Please try again." },
      ]);
      inputRef.current?.focus();
    },
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || mutation.isPending) return;
    setInput("");
    mutation.mutate(text);
  }

  return (
    <>
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        {messages.length === 0 && !mutation.isPending && (
          <div className="m-auto flex max-w-md flex-col items-center gap-2 pt-10 text-center text-muted-foreground">
            <Bot className="h-8 w-8" />
            <p className="text-sm md:text-base">Ask about budgeting, Zakat, taxes, or whether a transaction is Shariah-compliant.</p>
          </div>
        )}
        {messages.map((m) => (
          <div key={m.id} className={cn("flex gap-2 md:gap-3", m.role === "user" ? "justify-end" : "justify-start")}>
            {m.role !== "user" && (
              <div className="h-7 w-7 md:h-8 md:w-8 shrink-0 rounded-full bg-brand-gradient flex items-center justify-center text-background">
                <Bot className="h-3.5 w-3.5 md:h-4 md:w-4" />
              </div>
            )}
            <div className={cn(
              "max-w-[85%] md:max-w-[80%] rounded-2xl px-3 py-2 md:px-4 md:py-2.5 text-sm whitespace-pre-wrap break-words",
              m.role === "user" ? "bg-primary text-primary-foreground" : "bg-accent text-foreground",
            )}>
              {m.content}
            </div>
            {m.role === "user" && (
              <div className="h-7 w-7 md:h-8 md:w-8 shrink-0 rounded-full bg-muted flex items-center justify-center">
                <User className="h-3.5 w-3.5 md:h-4 md:w-4" />
              </div>
            )}
          </div>
        ))}
        {mutation.isPending && (
          <div className="flex gap-2 md:gap-3">
            <div className="h-7 w-7 md:h-8 md:w-8 shrink-0 rounded-full bg-brand-gradient flex items-center justify-center text-background">
              <Bot className="h-3.5 w-3.5 md:h-4 md:w-4" />
            </div>
            <div className="rounded-2xl bg-accent px-3 py-2 md:px-4 md:py-2.5 text-sm text-muted-foreground">Thinking…</div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={submit} className="border-t border-border p-2 md:p-3 flex items-end gap-2">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(e); }
          }}
          placeholder="Ask Tactifin AI..."
          rows={1}
          className="flex-1 min-w-0 resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
        />
        <Button type="submit" disabled={mutation.isPending || !input.trim()} size="icon" className="shrink-0">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </>
  );
}
