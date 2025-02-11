const express = require("express");
const router = express.Router();
const {
  createRaza,
  getActiveRazas,
  getAllRazas
} = require("../controllers/razaController");
const authJWTMiddleware = require("../middlewares/authJWT"); // Protección con JWT

// Middleware de autenticación para todas las rutas
router.use(authJWTMiddleware);

// Rutas protegidas
router.post("/", createRaza);
router.get("/activos", getActiveRazas);
router.get("/todos", getAllRazas);

module.exports = router;