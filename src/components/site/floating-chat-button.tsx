import { Bot, X } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { createPublicThread } from "@/lib/threads.functions";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { PublicChatInterface } from "./public-chat-interface";

export function FloatingChatButton() {
  const [path, setPath] = useState<string>("");
  const [mounted, setMounted] = useState(false);
  const create = useServerFn(createPublicThread);
  const [isOpen, setIsOpen] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Get current path on client side only
  useEffect(() => {
    const currentPath = window.location.pathname;
    setPath(currentPath);
    setMounted(true);
  }, []);

  // Don't show button on full chat page, but show it if opening modal chat
  if (mounted && path.startsWith("/chat") && !isOpen) return null;
  if (!mounted) return null; // Don't render on server

  async function handleClick() {
    // Create a new public thread and open chat modal (works without login)
    setLoading(true);
    try {
      const thread = await create({ data: {} });
      setThreadId(thread.id);
      setIsOpen(true);
    } catch (error) {
      console.error("Failed to create chat thread:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleClose() {
    setIsOpen(false);
    setThreadId(null);
  }

  if (isOpen && threadId) {
    return (
      <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 p-0 md:p-4">
        <div className="relative w-full md:w-full md:max-w-md h-[90vh] md:h-auto md:max-h-[80vh] rounded-t-2xl md:rounded-lg bg-background shadow-lg overflow-hidden flex flex-col">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 rounded-md p-1 hover:bg-muted"
            aria-label="Close chat"
          >
            <X className="h-5 w-5" />
          </button>
          <PublicChatInterface threadId={threadId} />
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50",
        "flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full",
        "bg-brand-gradient text-white shadow-lg",
        "transition-all duration-200 hover:shadow-xl hover:scale-110",
        "focus:outline-none focus:ring-2 focus:ring-brand-gradient focus:ring-offset-2",
        "active:scale-95",
        "pointer-events-auto",
      )}
      aria-label="Open AI Assistant"
      title="Open AI Assistant"
    >
      <Bot className="h-6 w-6 md:h-7 md:w-7" />
    </button>
  );
}
