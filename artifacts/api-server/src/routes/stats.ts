import { Router } from "express";

const router = Router();

router.get("/stats", async (req, res) => {
  res.json({
    yearsOfExperience: 12,
    eventsExecuted: 1500,
    citiesServed: 15,
    happyClients: 850,
  });
});

export default router;
