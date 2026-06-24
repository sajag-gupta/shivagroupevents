import { Router } from "express";
import { AdminLoginBody } from "@workspace/api-zod";

const router = Router();

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "shivaevents2024";

router.post("/auth/login", (req, res): void => {
  const parsed = AdminLoginBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: "Validation failed" }); return; }
  if (parsed.data.password !== ADMIN_PASSWORD) {
    res.status(401).json({ error: "Invalid credentials" }); return;
  }
  (req.session as any).admin = true;
  res.json({ authenticated: true, role: "admin" });
});

router.post("/auth/logout", (req, res): void => {
  (req.session as any).admin = false;
  res.json({ authenticated: false, role: null });
});

router.get("/auth/me", (req, res): void => {
  const isAdmin = !!(req.session as any)?.admin;
  res.json({ authenticated: isAdmin, role: isAdmin ? "admin" : null });
});

export default router;
