# Architecture & Security

This section describes the code layout, design patterns, and security filters configured to protect the Animatch API.

## MVC Directory Structure
The application follows a modular MVC design layout:
* **`/routes`**: Routes API endpoints and directs them to the controllers.
* **`/controllers`**: Processes the request payload, handles business logic, and communicates with models.
* **`/models`**: Defines the Mongoose schemas and indexes for MongoDB.
* **`/middlewares`**: Intercepts requests (e.g., validating JWT tokens).

---

## 🔒 Security Implementations

The Express server integrates three essential production security layers:

### 1. HTTP Security Headers (`helmet`)
Protects against common vulnerabilities (Clickjacking, MIME sniffing, Cross-Site Scripting) by configuring standard HTTP response headers.
* **Configuration:** Content Security Policy (CSP) is customized to preserve Swagger UI asset loading.

### 2. NoSQL Operator Injection Protection (`express-mongo-sanitize`)
Blocks database query injections by recursively stripping out request keys that start with `$` or contain `.` (which are standard MongoDB operators).
* **Benefit:** Sanitizes user inputs before passing them to Mongoose filters.

### 3. Rate Limiting (`express-rate-limit`)
Mitigates Brute-Force credentials guessing and Denial of Service (DoS) attempts by restricting the number of requests per IP.
* **Limit:** Maximum 100 requests per 15-minute window for all `/api` routes.
