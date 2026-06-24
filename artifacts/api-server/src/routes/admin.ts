import { Router, Request, Response, NextFunction } from "express";
import { db, leadsTable, portfolioTable, testimonialsTable } from "@workspace/db";
import { eq, desc, sql } from "drizzle-orm";
import {
  AdminUpdateLeadBody,
  AdminCreatePortfolioBody,
  AdminUpdatePortfolioBody,
  AdminCreateTestimonialBody,
  AdminUpdateTestimonialBody,
} from "@workspace/api-zod";

const router = Router();

function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  if (!(req.session as any)?.admin) { res.status(401).json({ error: "Unauthorized" }); return; }
  next();
}

router.use(requireAdmin);

router.get("/dashboard", async (req, res): Promise<void> => {
  const [totalLeadsRes, newLeadsRes, totalPortfolioRes, totalTestimonialsRes] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(leadsTable),
    db.select({ count: sql<number>`count(*)` }).from(leadsTable).where(eq(leadsTable.status, "new")),
    db.select({ count: sql<number>`count(*)` }).from(portfolioTable),
    db.select({ count: sql<number>`count(*)` }).from(testimonialsTable),
  ]);
  const statusCounts = await db.select({ status: leadsTable.status, count: sql<number>`count(*)` })
    .from(leadsTable).groupBy(leadsTable.status);
  const recentLeads = await db.select().from(leadsTable).orderBy(desc(leadsTable.createdAt)).limit(5);
  res.json({
    totalLeads: Number(totalLeadsRes[0].count),
    newLeads: Number(newLeadsRes[0].count),
    totalPortfolio: Number(totalPortfolioRes[0].count),
    totalTestimonials: Number(totalTestimonialsRes[0].count),
    leadsByStatus: statusCounts.map(s => ({ status: s.status, count: Number(s.count) })),
    recentLeads,
  });
});

router.get("/leads", async (req, res): Promise<void> => {
  const { status, search, limit = "50", offset = "0" } = req.query as Record<string, string>;
  let items = await db.select().from(leadsTable).orderBy(desc(leadsTable.createdAt));
  if (status) items = items.filter(l => l.status === status);
  if (search) {
    const s = search.toLowerCase();
    items = items.filter(l => l.name.toLowerCase().includes(s) || l.email.toLowerCase().includes(s) || l.phone.includes(s));
  }
  const total = items.length;
  const paginated = items.slice(Number(offset), Number(offset) + Number(limit));
  res.json({ items: paginated, total });
});

router.get("/leads/:id", async (req, res): Promise<void> => {
  const [lead] = await db.select().from(leadsTable).where(eq(leadsTable.id, Number(req.params.id))).limit(1);
  if (!lead) { res.status(404).json({ error: "Not found" }); return; }
  res.json(lead);
});

router.patch("/leads/:id", async (req, res): Promise<void> => {
  const parsed = AdminUpdateLeadBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: "Validation failed" }); return; }
  const [updated] = await db.update(leadsTable).set(parsed.data).where(eq(leadsTable.id, Number(req.params.id))).returning();
  res.json(updated);
});

router.get("/portfolio", async (req, res): Promise<void> => {
  const items = await db.select().from(portfolioTable).orderBy(desc(portfolioTable.createdAt));
  res.json({ items, total: items.length });
});

router.post("/portfolio", async (req, res): Promise<void> => {
  const parsed = AdminCreatePortfolioBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: "Validation failed" }); return; }
  const [item] = await db.insert(portfolioTable).values({
    ...parsed.data,
    images: parsed.data.images ?? [],
    featured: parsed.data.featured ?? false,
    published: parsed.data.published ?? true,
  }).returning();
  res.status(201).json(item);
});

router.patch("/portfolio/:id", async (req, res): Promise<void> => {
  const parsed = AdminUpdatePortfolioBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: "Validation failed" }); return; }
  const [updated] = await db.update(portfolioTable).set(parsed.data).where(eq(portfolioTable.id, Number(req.params.id))).returning();
  res.json(updated);
});

router.delete("/portfolio/:id", async (req, res): Promise<void> => {
  await db.delete(portfolioTable).where(eq(portfolioTable.id, Number(req.params.id)));
  res.json({ success: true });
});

router.get("/testimonials", async (req, res): Promise<void> => {
  const items = await db.select().from(testimonialsTable).orderBy(desc(testimonialsTable.createdAt));
  res.json(items);
});

router.post("/testimonials", async (req, res): Promise<void> => {
  const parsed = AdminCreateTestimonialBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: "Validation failed" }); return; }
  const [item] = await db.insert(testimonialsTable).values({
    ...parsed.data,
    rating: parsed.data.rating ?? 5,
    published: parsed.data.published ?? true,
  }).returning();
  res.status(201).json(item);
});

router.patch("/testimonials/:id", async (req, res): Promise<void> => {
  const parsed = AdminUpdateTestimonialBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: "Validation failed" }); return; }
  const [updated] = await db.update(testimonialsTable).set(parsed.data).where(eq(testimonialsTable.id, Number(req.params.id))).returning();
  res.json(updated);
});

router.delete("/testimonials/:id", async (req, res): Promise<void> => {
  await db.delete(testimonialsTable).where(eq(testimonialsTable.id, Number(req.params.id)));
  res.json({ success: true });
});

export default router;
