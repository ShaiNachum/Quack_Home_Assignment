import React from 'react';

const TicketCard = ({ ticket, onStatusChange }) => {
  // Define status badge color based on ticket status
  const getBadgeColor = (status) => {
    switch (status) {
      case 'open':
        return 'badge-error';
      case 'pending':
        return 'badge-warning';
      case 'resolved':
        return 'badge-success';
      case 'closed':
        return 'badge-neutral';
      default:
        return 'badge-ghost';
    }
  };

  // Handle status change when user selects a new status
  const handleStatusChange = (e) => {
    onStatusChange(ticket.id, e.target.value);
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex justify-between items-start">
          <h2 className="card-title">{ticket.title}</h2>
          <div className={`badge ${getBadgeColor(ticket.status)}`}>{ticket.status}</div>
        </div>
        
        <div className="mt-2">
          <p><span className="font-bold">ID:</span> {ticket.id}</p>
          <p><span className="font-bold">Priority:</span> {ticket.priority || 'Not set'}</p>
          <p><span className="font-bold">Created:</span> {new Date(ticket.created).toLocaleString()}</p>
        </div>
        
        <div className="card-actions justify-end mt-4">
          <select 
            className="select select-bordered select-sm w-full max-w-xs" 
            value={ticket.status}
            onChange={handleStatusChange}
          >
            <option value="open">Open</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;