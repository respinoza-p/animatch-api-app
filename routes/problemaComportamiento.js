const express = require("express");
const router = express.Router();
const {
  createProblemaComportamiento,
  getActiveProblemasComportamiento,
  getAllProblemasComportamiento
} = require("../controllers/problemaComportamientoController");
const authJWTMiddleware = require("../middlewares/authJWT"); // Protección con JWT

// Middleware de autenticación para todas las rutas
router.use(authJWTMiddleware);

// Rutas protegidas
router.post("/", createProblemaComportamiento);
router.get("/activos", getActiveProblemasComportamiento);
router.get("/todos", getAllProblemasComportamiento);

module.exports = router;