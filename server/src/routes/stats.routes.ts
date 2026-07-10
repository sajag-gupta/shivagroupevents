import { Router } from "express";
import { getSiteStats } from "../controllers/statsController.js";

const router = Router();

router.get("/stats", getSiteStats);

export default router;
