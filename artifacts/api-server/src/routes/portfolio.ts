import { Router } from "express";
import { db, portfolioTable } from "@workspace/db";
import { eq, desc, sql } from "drizzle-orm";

const router = Router();

router.get("/portfolio", async (req, res): Promise<void> => {
  const { category, limit = "20", offset = "0" } = req.query as Record<string, string>;
  const items = await db.select().from(portfolioTable)
    .where(eq(portfolioTable.published, true))
    .orderBy(desc(portfolioTable.createdAt))
    .limit(Number(limit))
    .offset(Number(offset));
  const filtered = category ? items.filter(i => i.category === category) : items;
  const countResult = await db.select({ count: sql<number>`count(*)` }).from(portfolioTable).where(eq(portfolioTable.published, true));
  res.json({ items: filtered, total: Number(countResult[0].count) });
});

router.get("/portfolio/featured", async (req, res): Promise<void> => {
  const items = await db.select().from(portfolioTable)
    .where(eq(portfolioTable.featured, true))
    .orderBy(desc(portfolioTable.createdAt))
    .limit(6);
  res.json(items);
});

router.get("/portfolio/:slug", async (req, res): Promise<void> => {
  const item = await db.select().from(portfolioTable).where(eq(portfolioTable.slug, req.params.slug)).limit(1);
  if (!item[0]) { res.status(404).json({ error: "Not found" }); return; }
  res.json(item[0]);
});

export default router;
