
export const normalizeStatus = (status) => {
  if (!status) return "unknown";
  
  // Define valid statuses
  const validStatuses = ['open', 'closed', 'pending', 'resolved', 'in progress'];
  
  // Remove extra spaces and convert to lowercase
  const normalized = status.replace(/\s+/g, ' ').trim().toLowerCase();
  
  // Remove all spaces to check for spaced letters
  const withoutSpaces = normalized.replace(/\s/g, '');
  
  // Check if the no-space version matches any valid status
  for (const validStatus of validStatuses) {
    if (validStatus.replace(/\s/g, '') === withoutSpaces) {
      return validStatus;
    }
  }
  
  // If no match found by removing spaces, return the normalized version
  return normalized;
};


export const normalizeDate = (dateStr) => {
  if (!dateStr) return new Date().toISOString();
  
  let date;
  try {
    // Try to parse the date
    date = new Date(dateStr);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      logger.warn(`Invalid date format: ${dateStr}, using current date`);
      date = new Date();
    }
  } catch (error) {
    logger.warn(`Error parsing date: ${dateStr}, using current date`);
    date = new Date();
  }
  
  return date.toISOString();
};