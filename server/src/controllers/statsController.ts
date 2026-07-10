import { Request, Response } from "express";
import { COMPANY_STATS } from "../constants/index.js";

export function getSiteStats(_req: Request, res: Response): void {
  res.json(COMPANY_STATS);
}
