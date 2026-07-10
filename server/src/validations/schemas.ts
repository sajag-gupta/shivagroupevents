import { z } from "zod";

// ─── Public API Schemas ───────────────────────────────────────────────────────

export const SubmitLeadBody = z.object({
  name: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email(),
  eventType: z.string().min(1),
  location: z.string().optional(),
  eventDate: z.string().optional(),
  guestCount: z.number().int().positive().optional(),
  budgetRange: z.string().optional(),
  message: z.string().optional(),
});

// ─── Auth Schemas ─────────────────────────────────────────────────────────────

export const AdminLoginBody = z.object({
  password: z.string().min(1),
});

// ─── Admin — Lead Schemas ─────────────────────────────────────────────────────

export const AdminUpdateLeadBody = z.object({
  status: z.string().optional(),
  internalNotes: z.string().optional(),
});

// ─── Admin — Portfolio Schemas ────────────────────────────────────────────────

export const AdminCreatePortfolioBody = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  category: z.string().min(1),
  coverImage: z.string().min(1),
  images: z.array(z.string()).optional(),
  location: z.string().min(1),
  eventDate: z.string().min(1),
  description: z.string().min(1),
  story: z.string().optional(),
  clientName: z.string().optional(),
  guestCount: z.number().int().positive().optional(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
});

export const AdminUpdatePortfolioBody = z.object({
  title: z.string().optional(),
  slug: z.string().optional(),
  category: z.string().optional(),
  coverImage: z.string().optional(),
  images: z.array(z.string()).optional(),
  location: z.string().optional(),
  eventDate: z.string().optional(),
  description: z.string().optional(),
  story: z.string().optional(),
  clientName: z.string().optional(),
  guestCount: z.number().int().positive().optional(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
});

// ─── Admin — Testimonial Schemas ──────────────────────────────────────────────

export const AdminCreateTestimonialBody = z.object({
  clientName: z.string().min(1),
  designation: z.string().optional(),
  company: z.string().optional(),
  eventType: z.string().optional(),
  rating: z.number().int().min(1).max(5),
  content: z.string().min(1),
  photoUrl: z.string().optional(),
  published: z.boolean().optional(),
});

export const AdminUpdateTestimonialBody = z.object({
  clientName: z.string().optional(),
  designation: z.string().optional(),
  company: z.string().optional(),
  eventType: z.string().optional(),
  rating: z.number().int().min(1).max(5).optional(),
  content: z.string().optional(),
  photoUrl: z.string().optional(),
  published: z.boolean().optional(),
});

export const AdminCreateServiceBody = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  category: z.string().min(1),
  description: z.string().min(1),
  longDescription: z.string().optional(),
  icon: z.string().min(1),
  heroImage: z.string().optional(),
  heroVideo: z.string().optional(),
  features: z.array(z.string()).optional(),
  sortOrder: z.number().int().optional(),
});

export const AdminUpdateServiceBody = z.object({
  title: z.string().optional(),
  slug: z.string().optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  longDescription: z.string().optional(),
  icon: z.string().optional(),
  heroImage: z.string().optional(),
  heroVideo: z.string().optional(),
  features: z.array(z.string()).optional(),
  sortOrder: z.number().int().optional(),
});

// ─── Health Schema ────────────────────────────────────────────────────────────

export const HealthCheckResponse = z.object({ status: z.string() });
