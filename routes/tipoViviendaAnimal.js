const express = require("express");
const router = express.Router();
const {
  createTipoViviendaAnimal,
  getActiveTiposViviendaAnimal,
  getAllTiposViviendaAnimal
} = require("../controllers/tipoViviendaAnimalController");
const authJWTMiddleware = require("../middlewares/authJWT"); // Protección con JWT

// Middleware de autenticación para todas las rutas
router.use(authJWTMiddleware);

// Rutas protegidas
router.post("/", createTipoViviendaAnimal);
router.get("/activos", getActiveTiposViviendaAnimal);
router.get("/todos", getAllTiposViviendaAnimal);

module.exports = router;