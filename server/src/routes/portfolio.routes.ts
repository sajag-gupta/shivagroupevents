import { Router } from "express";
import {
  listPortfolio,
  getFeaturedPortfolio,
  getPortfolioBySlug,
} from "../controllers/portfolioController.js";

const router = Router();

router.get("/portfolio", listPortfolio);
router.get("/portfolio/featured", getFeaturedPortfolio);
router.get("/portfolio/:slug", getPortfolioBySlug);

export default router;
