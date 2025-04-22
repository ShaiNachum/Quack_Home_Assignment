import React, { useState, useEffect } from "react";
import ticketService from "../lib/ticketService";
import TicketCard from "../components/TicketCard";
import TicketFilter from "../components/TicketFilter";
import { Toaster, toast } from "react-hot-toast";

const HomePage = () => {
  // State for storing tickets, loading state, and current filter
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentFilter, setCurrentFilter] = useState(null);

  // Function to fetch tickets based on filter
  const fetchTickets = async (filter = null) => {
    setIsLoading(true);
    try {
      const data = await ticketService.getAllTickets(filter);
      setTickets(data);
      setError(null);
    } catch (err) {
      setError("Failed to load tickets. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Load tickets on component mount and when filter changes
  useEffect(() => {
    fetchTickets(currentFilter);
  }, [currentFilter]);

  // Handle filter change
  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
  };

  // Handle ticket status update
  const handleStatusChange = async (ticketId, newStatus) => {
    try {
      await ticketService.updateTicketStatus(ticketId, newStatus);

      // Update the local state with the new status
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
        )
      );

      toast.success(`Ticket ${ticketId} status updated to ${newStatus}`);
    } catch (error) {
      toast.error("Failed to update ticket status");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster position="top-right" />

      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Support Ticket Dashboard</h1>
        <p className="text">Manage Support tickets</p>
      </header>

      <TicketFilter
        currentFilter={currentFilter}
        onFilterChange={handleFilterChange}
      />

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : error ? (
        <div className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      ) : tickets.length === 0 ? (
        <div className="alert alert-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>No tickets found with the current filter.</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
