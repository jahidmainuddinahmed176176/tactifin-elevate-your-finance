import { createFileRoute } from "@tanstack/react-router";
import { Bot } from "lucide-react";

export const Route = createFileRoute("/_authenticated/chat/")({
  component: () => (
    <div className="m-auto flex flex-col items-center gap-3 p-8 text-center text-muted-foreground">
      <Bot className="h-10 w-10" />
      <p>Start a new chat to talk with the Tactifin AI Assistant.</p>
    </div>
  ),
});