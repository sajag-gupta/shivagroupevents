import { Router } from "express";
import { requireAdmin } from "../middleware/auth.js";
import {
  getDashboard,
  listLeads,
  getLeadById,
  updateLead,
  adminListPortfolio,
  adminCreatePortfolio,
  adminUpdatePortfolio,
  adminDeletePortfolio,
  adminListTestimonials,
  adminCreateTestimonial,
  adminUpdateTestimonial,
  adminDeleteTestimonial,
  adminListServices,
  adminCreateService,
  adminUpdateService,
  adminDeleteService,
} from "../controllers/adminController.js";
import { updateSettings } from "../controllers/settingsController.js";

const router = Router();

router.use(requireAdmin);

// Dashboard
router.get("/dashboard", getDashboard);

// Settings
router.post("/settings", updateSettings);

// Leads
router.get("/leads", listLeads);
router.get("/leads/:id", getLeadById);
router.patch("/leads/:id", updateLead);

// Services
router.get("/services", adminListServices);
router.post("/services", adminCreateService);
router.patch("/services/:id", adminUpdateService);
router.delete("/services/:id", adminDeleteService);

// Portfolio
router.get("/portfolio", adminListPortfolio);
router.post("/portfolio", adminCreatePortfolio);
router.patch("/portfolio/:id", adminUpdatePortfolio);
router.delete("/portfolio/:id", adminDeletePortfolio);

// Testimonials
router.get("/testimonials", adminListTestimonials);
router.post("/testimonials", adminCreateTestimonial);
router.patch("/testimonials/:id", adminUpdateTestimonial);
router.delete("/testimonials/:id", adminDeleteTestimonial);

export default router;
