import { logger } from "../lib/logger.js";
import config from "../config/config.js";


/**
 * Custom API Error class that includes HTTP status code
 */
export class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}


/**
 * Wraps async route handlers to automatically catch errors
 * 
 * @param {Function} fn - The async route handler to wrap
 * @returns {Function} - The wrapped handler that forwards errors to next()
 */
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};


/**
 * Handles requests to non-existent routes
 * Always placed after all defined routes
 */
export const notFoundHandler = (req, res, next) => {
  const error = new APIError(`Not found - ${req.originalUrl}`, config.statusCode.NOT_FOUND);
  next(error);
};


/**
 * Central error handling middleware
 * Processes all errors and returns standardized responses
 */
export const errorHandler = (err, req, res, next) => {
  // Log the error
  logger.error(`Error: ${err.message}`);
  logger.error(err.stack);

  // Set appropriate status code
  const statusCode = err.statusCode || config.statusCode.INTERNAL_SERVER_ERROR;
  
  // Send error response
  res.status(statusCode).json({
    success: false,
    error: err.message || "Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
};