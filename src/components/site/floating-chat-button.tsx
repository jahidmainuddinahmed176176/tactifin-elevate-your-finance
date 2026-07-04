import { Bot, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { PublicChatInterface } from "./public-chat-interface";

export function FloatingChatButton() {
  const [path, setPath] = useState<string>("");
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPath(window.location.pathname);
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (mounted && path.startsWith("/chat") && !isOpen) return null;

  async function handleClick() {
    setLoading(true);
    try {
      // Generate a local thread ID — no server call needed
      const id = Math.random().toString(36).slice(2) + Date.now().toString(36);
      setThreadId(id);
      setIsOpen(true);
    } catch (error) {
      console.error("Failed to open chat:", error);
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
      disabled={loading}
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
