import { Router } from "express";
import { db, testimonialsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";

const router = Router();

router.get("/testimonials", async (req, res) => {
  const limit = Number(req.query.limit ?? 20);
  const items = await db.select().from(testimonialsTable)
    .where(eq(testimonialsTable.published, true))
    .orderBy(desc(testimonialsTable.createdAt))
    .limit(limit);
  res.json(items);
});

export default router;
