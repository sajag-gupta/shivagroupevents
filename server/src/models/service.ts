import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const servicesTable = pgTable("services", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  longDescription: text("long_description"),
  icon: text("icon").notNull(),
  category: text("category").notNull(),
  heroImage: text("hero_image"),
  heroVideo: text("hero_video"),
  features: text("features").array().notNull().default([]),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const insertServiceSchema = createInsertSchema(servicesTable).omit({
  id: true,
});

export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof servicesTable.$inferSelect;
