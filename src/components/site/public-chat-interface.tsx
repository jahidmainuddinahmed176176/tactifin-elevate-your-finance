import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";
import { Send, Bot, User } from "lucide-react";
import { sendPublicChatMessage } from "@/lib/chat.functions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Message = { id: string; role: "user" | "assistant"; content: string };

export function PublicChatInterface({ threadId }: { threadId: string }) {
  const send = useServerFn(sendPublicChatMessage);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Reset conversation when a new thread opens
  useEffect(() => {
    setMessages([]);
    setInput("");
  }, [threadId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [threadId]);

  const mutation = useMutation({
    mutationFn: async (content: string) => {
      // Build history from current messages (exclude the optimistic user msg
      // we already appended — the server builds the full turn itself)
      const history = messages.map((m) => ({ role: m.role, content: m.content }));
      return send({ data: { history, content } });
    },
    onMutate: (content) => {
      // Optimistically add the user message
      setMessages((prev) => [
        ...prev,
        { id: "tmp-user-" + Date.now(), role: "user", content },
      ]);
    },
    onSuccess: (result) => {
      setMessages((prev) => [
        ...prev,
        { id: "tmp-ai-" + Date.now(), role: "assistant", content: result.assistant },
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

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || mutation.isPending) return;
    setInput("");
    mutation.mutate(text);
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4 scroll-smooth">
        {messages.length === 0 && !mutation.isPending && (
          <div className="m-auto flex max-w-md flex-col items-center gap-2 pt-8 md:pt-10 text-center text-muted-foreground">
            <Bot className="h-7 w-7 md:h-8 md:w-8" />
            <p className="text-xs md:text-sm">Ask about budgeting, Zakat, taxes, or whether a transaction is Shariah-compliant.</p>
          </div>
        )}
        {messages.map((m) => (
          <div key={m.id} className={cn("flex gap-2", m.role === "user" ? "justify-end" : "justify-start")}>
            {m.role !== "user" && (
              <div className="h-6 w-6 md:h-7 md:w-7 shrink-0 rounded-full bg-brand-gradient flex items-center justify-center text-background flex-shrink-0">
                <Bot className="h-3 w-3 md:h-3.5 md:w-3.5" />
              </div>
            )}
            <div className={cn(
              "rounded-2xl px-3 py-2 md:px-4 md:py-2.5 text-xs md:text-sm whitespace-pre-wrap break-words max-w-[75%] md:max-w-[70%]",
              m.role === "user"
                ? "bg-primary text-primary-foreground rounded-br-none"
                : "bg-accent text-foreground rounded-bl-none",
            )}>
              {m.content}
            </div>
            {m.role === "user" && (
              <div className="h-6 w-6 md:h-7 md:w-7 shrink-0 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <User className="h-3 w-3 md:h-3.5 md:w-3.5" />
              </div>
            )}
          </div>
        ))}
        {mutation.isPending && (
          <div className="flex gap-2">
            <div className="h-6 w-6 md:h-7 md:w-7 shrink-0 rounded-full bg-brand-gradient flex items-center justify-center text-background flex-shrink-0">
              <Bot className="h-3 w-3 md:h-3.5 md:w-3.5" />
            </div>
            <div className="rounded-2xl bg-accent px-3 py-2 md:px-4 md:py-2.5 text-xs md:text-sm text-muted-foreground rounded-bl-none">
              Thinking…
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={submit} className="border-t border-border p-2 md:p-3 flex items-end gap-2 bg-background shrink-0">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(e); }
          }}
          placeholder="Ask AI..."
          rows={1}
          className="flex-1 min-w-0 resize-none rounded-lg border border-input bg-background px-2.5 py-2 text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-ring"
        />
        <Button type="submit" disabled={mutation.isPending || !input.trim()} size="icon" className="shrink-0 h-8 w-8 md:h-9 md:w-9">
          <Send className="h-3.5 w-3.5 md:h-4 md:w-4" />
        </Button>
      </form>
    </>
  );
}
