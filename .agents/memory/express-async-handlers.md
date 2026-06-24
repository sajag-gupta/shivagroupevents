---
name: Express async handler return types
description: Express 5 async route handlers need explicit return type annotation and a specific early-exit pattern to satisfy TypeScript strict mode.
---

TypeScript strict mode complains about `TS7030: Not all code paths return a value` in Express async handlers when you mix `return res.status(x).json(y)` (which returns `Response`) with `res.json(z)` (which returns `void`).

**Why:** TypeScript sees inconsistent return types across code paths — some branches return `Response`, others implicitly return `void`. Even though Express handlers don't use the return value, TypeScript's type checker still enforces consistency.

**How to apply:**

1. Annotate the handler as `: Promise<void>` (or `: void` for sync):
   ```ts
   router.get("/path", async (req, res): Promise<void> => { ... });
   ```

2. For early exits, use the block form instead of a return expression:
   ```ts
   // WRONG (returns Response, inconsistent):
   if (!item) return res.status(404).json({ error: "Not found" });
   
   // CORRECT (returns void, consistent):
   if (!item) { res.status(404).json({ error: "Not found" }); return; }
   ```

This pattern is used across all route files in `artifacts/api-server/src/routes/`.
