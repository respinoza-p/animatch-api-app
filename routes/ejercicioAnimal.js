const express = require("express");
const router = express.Router();
const {
  createEjercicioAnimal,
  getActiveEjerciciosAnimales,
  getAllEjerciciosAnimales
} = require("../controllers/ejercicioAnimalController");
const authJWTMiddleware = require("../middlewares/authJWT"); // Protección con JWT

// Middleware de autenticación para todas las rutas
router.use(authJWTMiddleware);

// Rutas protegidas
router.post("/", createEjercicioAnimal);
router.get("/activos", getActiveEjerciciosAnimales);
router.get("/todos", getAllEjerciciosAnimales);

module.exports = router;