# DGS School System - Architecture & Integration Guide

## Overview
This document outlines the architecture for connecting the DGS School System website with its various portals (Staff, Librarian, Administration) and the database strategy.

## Authentication (JWT)
To secure communication between the main website and the portals (which are separate applications), we use **JSON Web Tokens (JWT)**.

### How it works:
1.  **Login**: User logs in via the main website.
2.  **Token Generation**: The server generates a signed JWT containing the user's role (e.g., `librarian`, `staff`) and ID.
3.  **Token Storage**: The token is stored in the client (e.g., HTTP-only cookie or local storage).
4.  **Accessing Portals**: When the user navigates to a portal (e.g., Library Portal), the token is sent in the `Authorization` header.
5.  **Validation**: The portal validates the token using a shared secret key or public key.

**Script for Testing**: A script `scripts/generateToken.js` is provided to generate tokens for testing purposes.

## Database Strategy
We use a hybrid approach to balance performance and data integrity.

### PostgreSQL (Primary Database)
-   **Purpose**: Permanent storage for all critical data.
-   **Data**: Student records, staff details, library inventory, historical data.
-   **Why**: Relational integrity, ACID compliance, complex queries.

### Redis (Cache & Session Store)
-   **Purpose**: High-speed data access and temporary storage.
-   **Data**:
    -   **User Sessions**: Storing active login sessions.
    -   **Registration Queue**: Temporarily holding student registration data before official admission.
    -   **Admitted Students Cache**: Caching the list of valid admitted students so the Library Portal can quickly verify eligibility without hitting the main database every time.
-   **Why**: Extremely fast, reduces load on PostgreSQL.

## Integration (Portals & Services)
The portals (Librarian, Staff) are separate applications (micro-frontends or separate services).

### Communication Patterns
1.  **Direct API Calls (REST)**:
    -   The main website calls the Portal APIs directly for real-time actions (e.g., "Check book availability").
    -   Secured via JWT.

2.  **Message Queue (Optional but Recommended for Scale)**:
    -   **Tools**: RabbitMQ or Redis Pub/Sub.
    -   **Use Case**: When a student is admitted in the Admin Portal, an event `STUDENT_ADMITTED` is published. The Library Portal subscribes to this event and updates its local cache or database.
    -   **Benefit**: Decouples systems. If the Library Portal is down, the message is queued and processed later.

## CI/CD Pipeline
We use **GitHub Actions** for the main website to ensure quality and deployability.
-   **Build**: Compiles the React application.
-   **Test**: Runs automated tests (to be added).
-   **Deploy**: Can be configured to deploy to Vercel, Netlify, or a custom server.
