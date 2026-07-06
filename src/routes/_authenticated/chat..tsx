import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendChatMessage } from "@/lib/chat.functions";
import { getMessages } from "@/lib/threads.functions";
import { Loader2, Send } from "lucide-react";

export const Route = createFileRoute("/_authenticated/chat/$threadId")({
  component: ChatView,
});

function ChatView() {
  const { threadId } = Route.useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["messages", threadId],
    queryFn: () => getMessages({ threadId }),
  });

  const sendMessage = useServerFn(sendChatMessage);
  const mutation = useMutation({
    mutationFn: (content: string) =>
      sendMessage({ data: { threadId, content } }),
    onSuccess: (data) => {
      // Message already added via query invalidation
    },
  });

  useEffect(() => {
    // Scroll to bottom when messages change
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || mutation.isPending) return;
    mutation.mutate(input.trim());
    setInput("");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b p-4">
        <Button variant="ghost" size="sm" onClick={() => navigate({ to: "/chat" })}>
          ← Back to threads
        </Button>
      </div>

      {/* Message container with ID for scrolling */}
      <div
        ref={containerRef}
        id="chat-messages"
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="border-t p-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={mutation.isPending}
            className="flex-1"
          />
          <Button type="submit" disabled={mutation.isPending || !input.trim()}>
            {mutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}