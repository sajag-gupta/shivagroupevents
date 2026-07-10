import { db } from "./database.js";
import { servicesTable } from "../models/index.js";
import { seedDatabase } from "./seed.js";

async function run() {
  try {
    console.log("Clearing old services from database...");
    await db.delete(servicesTable);
    console.log("Re-seeding updated default services...");
    await seedDatabase();
    console.log("Database reset completed successfully!");
  } catch (error) {
    console.error("Error resetting database services:", error);
  }
  process.exit(0);
}

run();
