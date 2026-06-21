# Getting Started

Follow these steps to configure and run the backend project locally on your machine.

## Prerequisites
Ensure you have the following installed:
* [Node.js](https://nodejs.org/) (Version v20+ recommended. *Note: Node v25 compatibility patches are applied*)
* [npm](https://www.npmjs.com/) (bundled with Node)

---

## 1. Installation

Clone the repository and install dependencies:
```bash
git clone https://github.com/respinoza-p/animatch-api-app.git backend
cd backend
npm install
```

---

## 2. Environment Configuration

Create a `.env` file in the root of the `backend/` directory:
```env
PORT=5001
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.gip4i.mongodb.net/animatch?appName=Cluster0
CORS_ORIGINS=http://localhost:4200
AUTH_USERNAME=admin
AUTH_PASSWORD=admin
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRATION=2h
```

> [!IMPORTANT]
> Ensure your public IP address is whitelisted in your MongoDB Atlas Security dashboard under **Network Access** before starting the database connection.

---

## 3. Launching Locally

Run the development server with automatic file reload (using `nodemon`):
```bash
npm run dev
```

The server will boot and display:
```
🚀 Servidor en http://localhost:5001
📌 Swagger en http://localhost:5001/api-docs
Conectado a MongoDB
```
