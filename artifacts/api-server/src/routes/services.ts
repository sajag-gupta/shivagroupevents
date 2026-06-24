import { Router } from "express";
import { db, servicesTable } from "@workspace/db";
import { eq, asc } from "drizzle-orm";

const router = Router();

router.get("/services", async (req, res): Promise<void> => {
  const items = await db.select().from(servicesTable).orderBy(asc(servicesTable.sortOrder));
  res.json(items);
});

router.get("/services/:slug", async (req, res): Promise<void> => {
  const item = await db.select().from(servicesTable).where(eq(servicesTable.slug, req.params.slug)).limit(1);
  if (!item[0]) { res.status(404).json({ error: "Not found" }); return; }
  res.json(item[0]);
});

export default router;
