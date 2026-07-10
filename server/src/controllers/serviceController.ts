import { Request, Response } from "express";
import { db } from "../config/database.js";
import { servicesTable } from "../models/index.js";
import { eq, asc } from "drizzle-orm";

export async function listServices(_req: Request, res: Response): Promise<void> {
  const items = await db
    .select()
    .from(servicesTable)
    .orderBy(asc(servicesTable.sortOrder));
  res.json(items);
}

export async function getServiceBySlug(req: Request, res: Response): Promise<void> {
  const item = await db
    .select()
    .from(servicesTable)
    .where(eq(servicesTable.slug, req.params.slug as string))
    .limit(1);
  if (!item[0]) {
    res.status(404).json({ error: "Service not found" });
    return;
  }
  res.json(item[0]);
}
