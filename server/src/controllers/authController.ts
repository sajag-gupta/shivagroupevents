import { Request, Response } from "express";
import { AdminLoginBody } from "../validations/schemas.js";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "shivaevents2024";

export function login(req: Request, res: Response): void {
  const parsed = AdminLoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Validation failed" });
    return;
  }
  if (parsed.data.password !== ADMIN_PASSWORD) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }
  (req.session as any).admin = true;
  res.json({ authenticated: true, role: "admin" });
}

export function logout(req: Request, res: Response): void {
  (req.session as any).admin = false;
  res.json({ authenticated: false, role: null });
}

export function getMe(req: Request, res: Response): void {
  const isAdmin = !!(req.session as any)?.admin;
  res.json({ authenticated: isAdmin, role: isAdmin ? "admin" : null });
}
