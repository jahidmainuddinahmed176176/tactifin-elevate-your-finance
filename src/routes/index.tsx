import { createFileRoute } from "@tanstack/react-router";
import { SpaApp } from "@/components/app/spa-app";

export const Route = createFileRoute("/")({
  ssr: false,
  component: SpaApp,
});
