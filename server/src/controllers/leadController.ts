import { Request, Response } from "express";
import { db } from "../config/database.js";
import { leadsTable } from "../models/index.js";
import { SubmitLeadBody } from "../validations/schemas.js";
import { sendLeadNotification } from "../services/emailService.js";

export async function submitLead(req: Request, res: Response): Promise<void> {
  const parsed = SubmitLeadBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Validation failed", details: parsed.error.flatten() });
    return;
  }

  const [lead] = await db.insert(leadsTable).values(parsed.data).returning();

  // Fire-and-forget email notification
  sendLeadNotification(parsed.data).catch((err) => {
    console.error("Lead notification email failed:", err?.message);
  });

  res.status(201).json(lead);
}
