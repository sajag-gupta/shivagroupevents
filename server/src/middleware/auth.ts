import { Request, Response, NextFunction } from "express";

/**
 * Middleware that guards admin-only routes.
 * Checks for an active admin session set by the auth controller.
 */
export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  if (!(req.session as Record<string, unknown>)?.admin) {
    res.status(401).json({ error: "Unauthorized. Please log in as admin." });
    return;
  }
  next();
}
