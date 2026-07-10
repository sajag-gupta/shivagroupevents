import { Request, Response } from "express";
import { db } from "../config/database.js";
import { leadsTable, portfolioTable, testimonialsTable, servicesTable } from "../models/index.js";
import { eq, desc, sql } from "drizzle-orm";
import {
  AdminUpdateLeadBody,
  AdminCreatePortfolioBody,
  AdminUpdatePortfolioBody,
  AdminCreateTestimonialBody,
  AdminUpdateTestimonialBody,
  AdminCreateServiceBody,
  AdminUpdateServiceBody,
} from "../validations/schemas.js";

// ─── Dashboard ────────────────────────────────────────────────────────────────

export async function getDashboard(_req: Request, res: Response): Promise<void> {
  const [totalLeadsRes, newLeadsRes, totalPortfolioRes, totalTestimonialsRes] =
    await Promise.all([
      db.select({ count: sql<number>`count(*)` }).from(leadsTable),
      db.select({ count: sql<number>`count(*)` }).from(leadsTable).where(eq(leadsTable.status, "new")),
      db.select({ count: sql<number>`count(*)` }).from(portfolioTable),
      db.select({ count: sql<number>`count(*)` }).from(testimonialsTable),
    ]);

  const statusCounts = await db
    .select({ status: leadsTable.status, count: sql<number>`count(*)` })
    .from(leadsTable)
    .groupBy(leadsTable.status);

  const recentLeads = await db
    .select()
    .from(leadsTable)
    .orderBy(desc(leadsTable.createdAt))
    .limit(5);

  res.json({
    totalLeads: Number(totalLeadsRes[0].count),
    newLeads: Number(newLeadsRes[0].count),
    totalPortfolio: Number(totalPortfolioRes[0].count),
    totalTestimonials: Number(totalTestimonialsRes[0].count),
    leadsByStatus: statusCounts.map((s) => ({
      status: s.status,
      count: Number(s.count),
    })),
    recentLeads,
  });
}

// ─── Leads ────────────────────────────────────────────────────────────────────

export async function listLeads(req: Request, res: Response): Promise<void> {
  const { status, search, limit = "50", offset = "0" } = req.query as Record<string, string>;

  let items = await db
    .select()
    .from(leadsTable)
    .orderBy(desc(leadsTable.createdAt));

  if (status) items = items.filter((l) => l.status === status);
  if (search) {
    const s = search.toLowerCase();
    items = items.filter(
      (l) =>
        l.name.toLowerCase().includes(s) ||
        l.email.toLowerCase().includes(s) ||
        l.phone.includes(s),
    );
  }

  const total = items.length;
  const paginated = items.slice(Number(offset), Number(offset) + Number(limit));
  res.json({ items: paginated, total });
}

export async function getLeadById(req: Request, res: Response): Promise<void> {
  const [lead] = await db
    .select()
    .from(leadsTable)
    .where(eq(leadsTable.id, Number(req.params.id)))
    .limit(1);
  if (!lead) {
    res.status(404).json({ error: "Lead not found" });
    return;
  }
  res.json(lead);
}

export async function updateLead(req: Request, res: Response): Promise<void> {
  const parsed = AdminUpdateLeadBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Validation failed" });
    return;
  }
  const [updated] = await db
    .update(leadsTable)
    .set(parsed.data)
    .where(eq(leadsTable.id, Number(req.params.id)))
    .returning();
  res.json(updated);
}

// ─── Portfolio (Admin) ────────────────────────────────────────────────────────

export async function adminListPortfolio(_req: Request, res: Response): Promise<void> {
  const items = await db
    .select()
    .from(portfolioTable)
    .orderBy(desc(portfolioTable.createdAt));
  res.json({ items, total: items.length });
}

export async function adminCreatePortfolio(req: Request, res: Response): Promise<void> {
  const parsed = AdminCreatePortfolioBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Validation failed" });
    return;
  }
  const [item] = await db
    .insert(portfolioTable)
    .values({
      ...parsed.data,
      images: parsed.data.images ?? [],
      featured: parsed.data.featured ?? false,
      published: parsed.data.published ?? true,
    })
    .returning();
  res.status(201).json(item);
}

export async function adminUpdatePortfolio(req: Request, res: Response): Promise<void> {
  const parsed = AdminUpdatePortfolioBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Validation failed" });
    return;
  }
  const [updated] = await db
    .update(portfolioTable)
    .set(parsed.data)
    .where(eq(portfolioTable.id, Number(req.params.id)))
    .returning();
  res.json(updated);
}

export async function adminDeletePortfolio(req: Request, res: Response): Promise<void> {
  await db.delete(portfolioTable).where(eq(portfolioTable.id, Number(req.params.id)));
  res.json({ success: true });
}

// ─── Testimonials (Admin) ─────────────────────────────────────────────────────

export async function adminListTestimonials(_req: Request, res: Response): Promise<void> {
  const items = await db
    .select()
    .from(testimonialsTable)
    .orderBy(desc(testimonialsTable.createdAt));
  res.json(items);
}

export async function adminCreateTestimonial(req: Request, res: Response): Promise<void> {
  const parsed = AdminCreateTestimonialBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Validation failed" });
    return;
  }
  const [item] = await db
    .insert(testimonialsTable)
    .values({
      ...parsed.data,
      rating: parsed.data.rating ?? 5,
      published: parsed.data.published ?? true,
    })
    .returning();
  res.status(201).json(item);
}

export async function adminUpdateTestimonial(req: Request, res: Response): Promise<void> {
  const parsed = AdminUpdateTestimonialBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Validation failed" });
    return;
  }
  const [updated] = await db
    .update(testimonialsTable)
    .set(parsed.data)
    .where(eq(testimonialsTable.id, Number(req.params.id)))
    .returning();
  res.json(updated);
}

export async function adminDeleteTestimonial(req: Request, res: Response): Promise<void> {
  await db.delete(testimonialsTable).where(eq(testimonialsTable.id, Number(req.params.id)));
  res.json({ success: true });
}

// ─── Services (Admin) ─────────────────────────────────────────────────────────

export async function adminListServices(_req: Request, res: Response): Promise<void> {
  const items = await db
    .select()
    .from(servicesTable)
    .orderBy(servicesTable.sortOrder);
  res.json({ items, total: items.length });
}

export async function adminCreateService(req: Request, res: Response): Promise<void> {
  const parsed = AdminCreateServiceBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Validation failed" });
    return;
  }
  const [item] = await db
    .insert(servicesTable)
    .values({
      ...parsed.data,
      features: parsed.data.features ?? [],
      sortOrder: parsed.data.sortOrder ?? 0,
    })
    .returning();
  res.status(201).json(item);
}

export async function adminUpdateService(req: Request, res: Response): Promise<void> {
  const parsed = AdminUpdateServiceBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Validation failed" });
    return;
  }
  const [updated] = await db
    .update(servicesTable)
    .set(parsed.data)
    .where(eq(servicesTable.id, Number(req.params.id)))
    .returning();
  res.json(updated);
}

export async function adminDeleteService(req: Request, res: Response): Promise<void> {
  await db.delete(servicesTable).where(eq(servicesTable.id, Number(req.params.id)));
  res.json({ success: true });
}
