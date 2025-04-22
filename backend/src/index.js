import express from "express";
import ticketsRoute from "./routes/tickets.route.js";
import config from "./config/config.js";
import { logger } from "./lib/logger.js";
import cors from "cors";
import { seedDB } from "./db/seed.js";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());
app.use(cors());

seedDB();

app.use("/api/tickets", ticketsRoute)

app.use(notFoundHandler);  // Catch 404s
app.use(errorHandler);     // Handle all error

app.listen(config.backend.port, () => {
  logger.info(`Backend is running on port ${config.backend.port}`);
});

// Handle uncaught exceptions
process.on("uncaughtException", async (error) => {
  logger.error("Uncaught Exception:", error);
  try {
    await closeDB()
    process.exit(0);
  } catch (error) {
    logger.error("Error while shutting down:", error);
    process.exit(1);
  }
});
