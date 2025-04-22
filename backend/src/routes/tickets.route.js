import express from "express";
import { getAllTickets, getTicketById, updateTicketStatus } from "../controllers/tickets.controller.js";

const router = express.Router();

// get all tickets with optional filter query parameter 
router.get("/", getAllTickets);

router.get("/:id", getTicketById);

router.put("/:id", updateTicketStatus);

export default router; 