import { Router } from "express";
import healthRouter from "./health.routes.js";
import statsRouter from "./stats.routes.js";
import portfolioRouter from "./portfolio.routes.js";
import serviceRouter from "./service.routes.js";
import testimonialRouter from "./testimonial.routes.js";
import leadRouter from "./lead.routes.js";
import authRouter from "./auth.routes.js";
import adminRouter from "./admin.routes.js";
import chatRouter from "./chat.routes.js";
import settingsRouter from "./settings.routes.js";

const router = Router();

router.use(healthRouter);
router.use(statsRouter);
router.use(portfolioRouter);
router.use(serviceRouter);
router.use(testimonialRouter);
router.use(leadRouter);
router.use(authRouter);
router.use("/admin", adminRouter);
router.use(chatRouter);
router.use(settingsRouter);

export default router;
