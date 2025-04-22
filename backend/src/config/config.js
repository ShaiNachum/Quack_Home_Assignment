import dotenv from "dotenv";

dotenv.config();

const config = {
  backend: {
    port: process.env.BACKEND_PORT || 5001,
  },
  mongoDB: {
    uri: process.env.MONGO_URI || "mongodb://localhost:27017/",
    database: process.env.MONGO_DB || "Ticket_Dashboard",
  },
  statusCode: {
    SUCCESS: 200,
    INTERNAL_SERVER_ERROR: 500,
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
  },
};

export default config;
