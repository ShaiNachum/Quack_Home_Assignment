import { axiosInstance } from './axios';

const ticketService = {

  getAllTickets: async (filter = null) => {
    try {
      const url = filter ? `/tickets?filter=${filter}` : '/tickets';
      const response = await axiosInstance.get(url);
      return response.data;
      
    } catch (error) {
      console.error('Error fetching tickets:', error);
      throw error;
    }
  },


  getTicketById: async (id) => {
    try {
      const response = await axiosInstance.get(`/tickets/${id}`);
      return response.data;

    } catch (error) {
      console.error(`Error fetching ticket ${id}:`, error);
      throw error;
    }
  },


  updateTicketStatus: async (id, status) => {
    try {
      const response = await axiosInstance.put(`/tickets/${id}`, { status });
      return response.data;

    } catch (error) {
      console.error(`Error updating ticket ${id}:`, error);
      throw error;
    }
  }
};

export default ticketService;