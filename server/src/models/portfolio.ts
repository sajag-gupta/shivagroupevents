import { pgTable, text, serial, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const portfolioTable = pgTable("portfolio", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  category: text("category").notNull(),
  coverImage: text("cover_image").notNull(),
  images: text("images").array().notNull().default([]),
  location: text("location").notNull(),
  eventDate: text("event_date").notNull(),
  description: text("description").notNull(),
  story: text("story"),
  clientName: text("client_name"),
  guestCount: integer("guest_count"),
  featured: boolean("featured").notNull().default(false),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertPortfolioSchema = createInsertSchema(portfolioTable).omit({
  id: true,
  createdAt: true,
});

export type InsertPortfolio = z.infer<typeof insertPortfolioSchema>;
export type Portfolio = typeof portfolioTable.$inferSelect;
