import { Router, type IRouter } from "express";
import healthRouter from "./health";
import portfolioRouter from "./portfolio";
import servicesRouter from "./services";
import testimonialsRouter from "./testimonials";
import statsRouter from "./stats";
import leadsRouter from "./leads";
import authRouter from "./auth";
import adminRouter from "./admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use(portfolioRouter);
router.use(servicesRouter);
router.use(testimonialsRouter);
router.use(statsRouter);
router.use(leadsRouter);
router.use(authRouter);
router.use(adminRouter);

export default router;
