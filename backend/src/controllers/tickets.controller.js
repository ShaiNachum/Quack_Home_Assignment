import { logger } from "../lib/logger.js";
import config from "../config/config.js";
import ticketService from "../services/tickets.service.js";
import { asyncHandler, APIError } from "../middleware/error.middleware.js";


export const getAllTickets = async (req, res) => {
    const filter = req.query?.filter;
    if (filter) {
        const data = await ticketService.getAllTickets(filter);
        if (!data) {
            throw new APIError("No tickets found", config.statusCode.NOT_FOUND);
        }
        res.status(config.statusCode.SUCCESS).json(data);

    } else {
        const data = await ticketService.getAllTickets();
        res.status(config.statusCode.SUCCESS).json(data);
    }
}

export const getTicketById = async (req, res) => {
  const id = req.params.id;
  const data = await ticketService.getTicketById(id);
  if (!data) {
    throw new APIError("Ticket not found", config.statusCode.NOT_FOUND);
  }
  res.status(config.statusCode.SUCCESS).json(data);
}

export const updateTicketStatus = async (req, res) => {
  const status = req.body?.status;
  const id = req.params.id;

  if (!status) {
    throw new APIError("Status is required", config.statusCode.BAD_REQUEST);
  }

  const data = await ticketService.updateTicketStatus(id, status);
  if (!data) {
    throw new APIError("Ticket not found", config.statusCode.NOT_FOUND);
  }
  res.status(config.statusCode.SUCCESS).json(data);
}