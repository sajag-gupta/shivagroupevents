import { Router } from "express";
import { getSettings } from "../controllers/settingsController.js";

const router = Router();

router.get("/settings", getSettings);

export default router;
