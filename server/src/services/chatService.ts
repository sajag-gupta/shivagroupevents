import OpenAI from "openai";
import { CHAT_SYSTEM_PROMPT } from "../constants/index.js";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

/**
 * Sends a chat conversation to OpenAI and returns the assistant's reply.
 * Keeps the last 10 messages for context.
 */
export async function getChatReply(messages: ChatMessage[]): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw Object.assign(new Error("AI chat is not configured"), { status: 503 });
  }

  const client = new OpenAI({
    apiKey,
    baseURL: apiKey.startsWith("nvapi-") ? "https://integrate.api.nvidia.com/v1" : undefined,
  });

  const chatMessages = messages
    .filter((m) => m.role === "user" || m.role === "assistant")
    .slice(-10);

  const completion = await client.chat.completions.create({
    model: apiKey.startsWith("nvapi-") ? "openai/gpt-oss-120b" : "gpt-4o-mini",
    max_tokens: 400,
    messages: [
      { role: "system", content: CHAT_SYSTEM_PROMPT },
      ...chatMessages,
    ],
  });

  return (
    completion.choices[0]?.message?.content ??
    "I'm sorry, I couldn't process that. Please try again."
  );
}
