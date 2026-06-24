import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

export default defineConfig(async ({ command }) => {
  const { tanstackStart } = await import("@tanstack/react-start/plugin/vite");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const plugins: any[] = [
    tailwindcss(),
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({ server: { entry: "server" } }),
    react(),
  ];

  if (command === "build") {
    const { nitro } = await import("nitro/vite");
    plugins.push(nitro({ preset: "vercel" }));
  }

  return {
    plugins,
    css: { transformer: "lightningcss" },
    resolve: {
      alias: { "@": `${process.cwd()}/src` },
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core",
      ],
    },
    server: { host: "::", port: 8080 },
  };
});
