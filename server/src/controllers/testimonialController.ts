import { Request, Response } from "express";
import { db } from "../config/database.js";
import { testimonialsTable } from "../models/index.js";
import { eq, desc } from "drizzle-orm";

export async function listTestimonials(req: Request, res: Response): Promise<void> {
  const limit = Number(req.query.limit ?? 20);
  const items = await db
    .select()
    .from(testimonialsTable)
    .where(eq(testimonialsTable.published, true))
    .orderBy(desc(testimonialsTable.createdAt))
    .limit(limit);
  res.json(items);
}
