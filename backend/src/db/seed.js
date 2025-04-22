import { logger } from "../lib/logger.js";
import { deleteAllDB, insertManyDB} from "./db.js";
import { normalizeStatus, normalizeDate } from "../lib/utils.js";

const dataSeed = {
  "dashboardTickets": [
    {
      "id": "DT1",
      "title": "Server Downtime",
      "status": "open",
      "priority": "high",
      "created": "2025-03-25T11:00:00Z"
    },
    {
      "id": "DT2",
      "title": "Bug in Report Generation",
      "status": "resolved",
      "priority": "medium",
      "created": "2025-03-21T14:20:00Z"
    },
    {
      "id": "DT3",
      "title": "UI Glitch",
      "status": "O P E N",
      "priority": "low",
      "created": "2025-03-22T08:50:00Z"
    },
    {
      "id": "DT4",
      "title": "Data Sync Issue",
      "status": "closed",
      "priority": "unknown",
      "created": "March 23, 2025 09:30"
    },
    {
      "id": "DT5",
      "title": "Feature Request: Export Data",
      "status": "open",
      "priority": "high",
      "created": "2025-03-26T07:45:00Z"
    },
    {
      "id": "DT6",
      "title": "Performance Lag",
      "status": "pending",
      "priority": "",
      "created": "2025-03-24T17:00:00Z"
    }
  ]
}

export const seedDB = async () => {
  try {
    // Clear existing data
    deleteAllDB("dashboardTickets");

    // Normalize status and dates before inserting
    const normalizedTickets = dataSeed.dashboardTickets.map(ticket => ({
      ...ticket,
      status: normalizeStatus(ticket.status),
      created: normalizeDate(ticket.created)
    }));

    // Insert seed data
    await insertManyDB("dashboardTickets", normalizedTickets);
    logger.info("Database seeded successfully with local data.");

  } catch (error) {
    logger.error("Error seeding database:", error);
  }
}