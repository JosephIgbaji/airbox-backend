# Airbox Backend

## Overview

This is the backend for the Airbox Scheduling & Dashboard application. It provides APIs for user authentication, appointment scheduling, and dashboard metrics. Built with Node.js, Express, and MongoDB, it supports secure authentication, booking management, and data visualization.

## Setup Instructions

### Prerequisites

- Node.js (v18 or later)
- MongoDB (local or cloud-based, e.g., MongoDB Atlas)
- Docker (optional for containerization)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/airbox-backend.git
   cd airbox-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the project root and configure the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
4. Start the server:
   ```bash
   npm start
   ```
   The backend should now be running on `http://localhost:5000`

### Running with Docker

1. Build the Docker image:
   ```bash
   docker build -t airbox-backend .
   ```
2. Run the container:
   ```bash
   docker run -p 5000:5000 --env-file .env airbox-backend
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate and get a JWT token

### Bookings

- `POST /api/bookings/` - Create a new booking (requires authentication)
- `GET /api/bookings/` - Retrieve all bookings for a user
- `PUT /api/bookings/:id` - Update a booking
- `DELETE /api/bookings/:id` - Cancel a booking

### Metrics

- `GET /api/metrics/` - Retrieve dashboard analytics (requires authentication)

## Architecture & Design Decisions

- **Separation of Concerns:** Routes, controllers, and models are organized for maintainability.
- **Security:** Uses JWT authentication, input validation, and secure password hashing.
- **Scalability:** Follows RESTful API principles and supports containerization with Docker.

## Assumptions & Limitations

- Users must authenticate before managing bookings.
- No role-based access control (RBAC) is currently implemented beyond basic admin/user roles.
- Metrics calculations assume real-time data but can be optimized with caching for large-scale usage.

## Testing

To test the API, use tools like Postman or cURL. Ensure the server is running and make API calls as described above.

## Future Enhancements

- Implement role-based access control (RBAC).
- Add caching mechanisms for performance optimization.
- Improve rate-limiting to prevent abuse.

---

Developed by JOSEPH IGBAJI as part of the Airbox MVP assessment.
