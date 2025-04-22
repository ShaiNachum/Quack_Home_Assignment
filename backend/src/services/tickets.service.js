import { fetchDB, updateStatusDB } from "../db/db.js";
import { logger } from "../lib/logger.js";


const getAllTickets = async (filter) => {

    const tickets = await fetchDB("dashboardTickets");

    if (filter) {
        logger.info(`Fetching tickets with filter: ${filter}`);
        const filteredTickets = tickets.filter(ticket => ticket.status === filter);
        return filteredTickets;
    }

    // If no filter is provided, return all tickets
    logger.info("Fetching all tickets from the database."); 
    return tickets;
};

const getTicketById = async (id) => {
    logger.info(`Fetching ticket with ID: ${id}`);
    return await fetchDB("dashboardTickets", id);
};

const updateTicketStatus = async (id, status) => {
    logger.info(`Updating ticket status for ticket ID: ${id} to ${status}`);
    return await updateStatusDB("dashboardTickets", id, status);
};

export default {
    getAllTickets,
    getTicketById,
    updateTicketStatus,
};

