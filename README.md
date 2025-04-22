# Support Ticket Dashboard

A full-stack web application for managing support tickets with features for displaying, filtering, and updating ticket status.

## Important Implementation Notes
### Date Normalization
The application includes date normalization functionality in the utils.js file. This ensures that all ticket creation dates are stored in a consistent ISO 8601 format (e.g., "2025-03-25T11:00:00Z") regardless of the input format. This normalization:
* Handles different date input formats (ISO strings, date objects, human-readable strings).
* Validates date inputs and falls back to the current date for invalid formats.
* Ensures consistent date sorting and filtering throughout the application.
* Improves the user experience by displaying dates in a uniform way.

### Status Normalization
Status values are normalized through the normalizeStatus function in utils.js. This ensures that ticket statuses are always stored in a consistent format even if they are entered with variations. The normalization:
* Converts all status strings to lowercase.
* Removes extra spaces and normalizes spacing.
* Handles variations like "O P E N" being correctly mapped to "open".
* Validates against a predefined list of allowed statuses.
* Ensures consistent filtering and status updates throughout the application.

These normalizations are applied during database seeding and whenever a ticket status is updated, ensuring data consistency throughout the application lifecycle.


## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Database](#database)

## Overview

This Support Ticket Dashboard allows users to view and manage support tickets. The application displays ticket information in a card grid layout, provides filtering capabilities by status, and allows updating ticket status via a dropdown menu.

## Features

- **Display Tickets**: View all support tickets in a responsive card grid
- **Ticket Details**: Each card shows ticket ID, title, status, priority, and creation date
- **Status Filtering**: Filter tickets by their current status (open, pending, in progress, resolved, closed)
- **Status Updates**: Change ticket status directly from the card interface
- **Responsive Design**: Adapts to different screen sizes with a mobile-first approach
- **Real-time Feedback**: Toast notifications for status updates and error messages
- **Loading States**: Visual indicators during data fetching operations

## Tech Stack

### Frontend
- React 19
- React Router DOM
- Axios for API requests
- Tailwind CSS with DaisyUI components
- React Hot Toast for notifications
- Vite as the build tool

### Backend
- Node.js with Express
- MongoDB for data storage
- Winston for logging

## Project Structure

```
project/
├── frontend/                # Frontend React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── lib/             # Utilities and services
│   │   ├── pages/           # Page components
│   │   ├── App.jsx          # Main application component
│   │   └── main.jsx         # Application entry point
│   ├── index.html
│   └── package.json
├── backend/                 # Backend Node.js application
│   ├── src/
│   │   ├── config/          # Application configuration
│   │   ├── controllers/     # Request handlers
│   │   ├── db/              # Database interactions
│   │   ├── lib/             # Utilities
│   │   ├── middleware/      # Express middleware
│   │   ├── routes/          # API route definitions
│   │   ├── services/        # Business logic
│   │   └── index.js         # Server entry point
│   └── package.json
└── docker-compose.yml       # Docker configuration for MongoDB
```

## Prerequisites

- Node.js (v18 or higher)
- npm
- Docker and Docker Compose (for MongoDB)

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd ticket-dashboard
```

### 2. Set up the backend

```bash
cd backend
npm install
```

### 3. Set up the frontend

```bash
cd ../frontend
npm install
```

## Running the Application

### 1. Start the MongoDB database

From the project root:

```bash
docker-compose up -d
```

This will start a MongoDB instance on port 27017.

### 2. Start the backend server

```bash
cd backend
npm run dev
```

The backend will run on http://localhost:5001.

### 3. Start the frontend development server

```bash
cd ../frontend
npm run dev
```

The frontend will run on http://localhost:5173 (or another port if 5173 is in use).

### 4. Access the application

Open your browser and navigate to:

```
http://localhost:5173
```

## API Endpoints

The backend provides the following REST API endpoints:

- `GET /api/tickets` - Get all tickets (optionally filtered by status)
- `GET /api/tickets/:id` - Get a specific ticket by ID
- `PUT /api/tickets/:id` - Update a ticket's status

## Database

The application uses MongoDB to store ticket data. When the backend starts, it automatically seeds the database with sample ticket data.

Each ticket has the following structure:

```json
{
  "id": "DT1",
  "title": "Server Downtime",
  "status": "open",
  "priority": "high",
  "created": "2025-03-25T11:00:00Z"
}
```

Possible status values are: "open", "pending", "resolved", and "closed".
