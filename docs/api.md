# API Reference

The Animatch API exposes endpoints grouped into auth, lookup metrics, human registration, and pet registration.

## Authentication Flow

1. **Request Token:** Post to `/api/auth/token` with credentials:
   ```json
   { "username": "admin", "password": "admin" }
   ```
2. **Authorize Header:** Attach the returned JWT token to all subsequent request headers:
   ```http
   Authorization: Bearer <YOUR_JWT_TOKEN>
   ```

---

## 📌 Swagger UI
Interactive documentation is available when running locally at:
👉 [http://localhost:5001/api-docs/](http://localhost:5001/api-docs/)

### Main Endpoint Groups:
* **Autenticación:** `/api/auth/token` (Public)
* **Mascotas / Animales:** `/api/registroAnimal` (Protected)
* **Adoptante:** `/api/humano/registroAdoptante` (Protected)
* **Master Lookups:** Over 40 standard GET/POST routes to list/create metrics.
