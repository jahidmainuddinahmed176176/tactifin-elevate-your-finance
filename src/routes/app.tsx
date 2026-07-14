import { createFileRoute } from "@tanstack/react-router";
import { SpaApp } from "@/components/app/spa-app";

export const Route = createFileRoute("/app")({
  ssr: false,
  head: () => ({ meta: [{ title: "Dashboard — Tactifin" }] }),
  component: SpaApp,
});
