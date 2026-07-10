import { Router } from "express";
import { listServices, getServiceBySlug } from "../controllers/serviceController.js";

const router = Router();

router.get("/services", listServices);
router.get("/services/:slug", getServiceBySlug);

export default router;
