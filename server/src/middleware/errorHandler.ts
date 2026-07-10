import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger.js";

/**
 * Global error handler middleware.
 * Catches unhandled errors from async route handlers.
 */
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  logger.error({ err }, "Unhandled error");

  if (res.headersSent) return;

  const status = err instanceof Error && "status" in err ? (err as { status: number }).status : 500;
  const message = err instanceof Error ? err.message : "Internal server error";

  res.status(status).json({ error: message });
}
