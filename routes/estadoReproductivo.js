const express = require("express");
const router = express.Router();
const {
  createEstadoReproductivo,
  getActiveEstadosReproductivos,
  getAllEstadosReproductivos
} = require("../controllers/estadoReproductivoController");
const authJWTMiddleware = require("../middlewares/authJWT"); // Protección con JWT

// Middleware de autenticación para todas las rutas
router.use(authJWTMiddleware);

// Rutas protegidas
router.post("/", createEstadoReproductivo);
router.get("/activos", getActiveEstadosReproductivos);
router.get("/todos", getAllEstadosReproductivos);

module.exports = router;