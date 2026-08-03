import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

export function createDeepSeekProvider(apiKey: string) {
  return createOpenAICompatible({
    name: "deepseek",
    baseURL: "https://api.deepseek.com/v1",
    apiKey,
  });
}
