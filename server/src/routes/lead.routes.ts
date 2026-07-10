import { Router } from "express";
import { submitLead } from "../controllers/leadController.js";

const router = Router();

router.post("/leads", submitLead);

export default router;
