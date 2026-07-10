import { Request, Response } from "express";
import { getChatReply } from "../services/chatService.js";

export async function chat(req: Request, res: Response): Promise<void> {
  const { messages } = req.body;

  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: "messages array is required" });
    return;
  }

  try {
    const reply = await getChatReply(messages);
    res.json({ reply });
  } catch (err: unknown) {
    const status = err instanceof Error && "status" in err
      ? (err as { status: number }).status
      : 500;
    const message = err instanceof Error ? err.message : "Unknown error";
    res.status(status).json({ error: message });
  }
}
