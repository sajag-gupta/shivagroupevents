import { Request, Response } from "express";
import { db } from "../config/database.js";
import { settingsTable } from "../models/index.js";
import { eq } from "drizzle-orm";
import { z } from "zod";

const DEFAULT_PHONE = process.env.CONTACT_PHONE ?? "+91 98970 15153";
const DEFAULT_EMAIL = process.env.CONTACT_EMAIL ?? "rajeev.event@gmail.com";

const UpdateSettingsBody = z.object({
  phone: z.string().min(1),
  email: z.string().email(),
});

export async function getSettings(_req: Request, res: Response): Promise<void> {
  try {
    const results = await db.select().from(settingsTable);
    const settingsMap = results.reduce((acc, row) => {
      acc[row.key] = row.value;
      return acc;
    }, {} as Record<string, string>);

    res.json({
      phone: settingsMap["phone"] ?? DEFAULT_PHONE,
      email: settingsMap["email"] ?? DEFAULT_EMAIL,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch settings" });
  }
}

export async function updateSettings(req: Request, res: Response): Promise<void> {
  try {
    const parsed = UpdateSettingsBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Validation failed" });
      return;
    }

    const { phone, email } = parsed.data;

    // Upsert phone setting
    await db
      .insert(settingsTable)
      .values({ key: "phone", value: phone })
      .onConflictDoUpdate({
        target: settingsTable.key,
        set: { value: phone },
      });

    // Upsert email setting
    await db
      .insert(settingsTable)
      .values({ key: "email", value: email })
      .onConflictDoUpdate({
        target: settingsTable.key,
        set: { value: email },
      });

    res.json({ success: true, settings: { phone, email } });
  } catch (error) {
    res.status(500).json({ error: "Failed to update settings" });
  }
}
