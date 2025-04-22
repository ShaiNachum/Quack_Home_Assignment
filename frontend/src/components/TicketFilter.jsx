import React from 'react';

const TicketFilter = ({ currentFilter, onFilterChange }) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="font-medium">Filter by status:</span>
      <div className="flex flex-wrap gap-2">
        <button 
          className={`btn btn-sm ${!currentFilter ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => onFilterChange(null)}
        >
          All
        </button>

        <button 
          className={`btn btn-sm ${currentFilter === 'open' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => onFilterChange('open')}
        >
          Open
        </button>

        <button 
          className={`btn btn-sm ${currentFilter === 'pending' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => onFilterChange('pending')}
        >
          Pending
        </button>

        <button 
          className={`btn btn-sm ${currentFilter === 'resolved' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => onFilterChange('resolved')}
        >
          Resolved
        </button>

        <button 
          className={`btn btn-sm ${currentFilter === 'closed' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => onFilterChange('closed')}
        >
          Closed
        </button>

      </div>
    </div>
  );
};

export default TicketFilter;