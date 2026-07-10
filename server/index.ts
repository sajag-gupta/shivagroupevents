import app from "./src/app.js";
import { logger } from "./src/utils/logger.js";
import { seedDatabase } from "./src/config/seed.js";

const port = Number(process.env.PORT ?? 3001);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${process.env.PORT}"`);
}

app.listen(port, async (err?: Error) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }
  logger.info({ port }, `Server listening on http://localhost:${port}`);
  await seedDatabase();
});
